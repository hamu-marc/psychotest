import {PsychoApi} from '../components/psychoapi';
import {Interpreter} from '../components/interpreter';
import {inject} from 'aurelia-framework';
import './jquery-global';
import './jquery-label';
import {saveAs} from 'file-saver';

@inject(PsychoApi)
export class Performtest {
  templatestyle = '';
  styles = {
  'default':'',  
  'fixedscreenM':'max-width: 768px;margin: auto !important;',
  'fixedscreenS':'max-width: 375px;margin: auto !important;',
  'fixedscreenL':'max-width: 1024px;margin: auto !important;'
  }
  constructor(pa) {
    this.api = pa;
    //this.interpreter = itp;
    //console.log('performtest()');
    this.previewinnerHTML = '';
    //event handlers needs to be registered this way
    this.handleCompiled = e => {
      //console.log('Performtest.handleCompiled()', e);
      if (this.itp) this.itp.evaluateScripts();
    };
  }

  attached() {
    //this.state = 1; //1==start, 2==test is performing, 3==test ended, 4==paused test, 5 ==resume test
    if (this.resumeid && this.resumeid !== '' ) this.state = 5; else this.state = 1;
    this.showstart = true;
    this.shownext = false;
    this.showprev = false;
    this.showsubmit = false;
    this.showpause = false;
    //console.log('performtest attached id,source,resumeid', this.testid,this.testsource,this.resumeid);
    if (!this.testid) this.testid = '';
    if (!this.resumeid) this.resumeid = '';
    //console.log('performtest attached id,source,resumeid', this.testid, this.testsource, this.resumeid);
    //listen to custom 'compiled' event
    document.getElementById('testdiv').addEventListener('compiled', this.handleCompiled);
  }

  detached() {
    if (document.getElementById('testdiv')) document.getElementById(this.preview).removeEventListener('compiled', this.handleCompiled);
  }

  activate(params, routeConfig) {
    this.testid = params.encid;
    //TODO add testdef in URL params - it may be encoded as zip
    //this.testdef = params.encdef;
    this.resumeid = params.resumeid;
    this.showmode = params.showmode;
    //this.encid; in params
    if (this.showmode) {
      if (this.showmode === 'debug') {
        window.psychotestDoNotCheckAnswers = true;
      }
    } else {
      window.psychotestDoNotCheckAnswers = false;
    }

    //console.log('performtest activated id,source,resumeid', params.id, params.source, params.resumeid);
    if (!this.resumeid || (this.resumeid === '') ) this.resumeid = '';
    else { this.state = 5; this.showstart = true; }

    if (!this.testid) this.testid = '';
    console.log('performtest activate() id,source,resumeid,showmode', this.testid, this.testsource, this.resumeid, this.showmode);
  }


  /**
   * Starts test - shows first screen
   */
  starttest() {
    //get user info of currently logged user, this will be stored as test user at the end of test
    //console.log('starttest resumeid:"' + this.resumeid + '" id:"' + this.testid + '" source:' + this.testsource);
    if (this.api.isLogged) {
      this.testUser = this.api.userinfo;
      if (this.state === 5 ) this.startTestFromResume();
      else this.startTestFromBegining();
    } else {
      this.testUser = {id: 'guest', name: 'Anonymous Guest'};
      this.startTestFromBegining();
    }
  }

  startTestFromResume() {
    this.state = 2;
    this.showprev = true;
    this.shownext = true;
    //do resume from screen
    this.api.getPausedTest(this.resumeid)
      .then(data => {
        console.log('resuming test', data);
        this.itp = new Interpreter(this);        
        this.hideNonAnswered();
        this.testid = data.testid;
        this.testsource = data.testsource;
        this.itp.resumeTest(data.rawtestdefinition, data.screennumber, data.temporalresults, this.resumeid);
        //TODO set base url for resumed test
        this.previewinnerHTML = this.itp.nextpage();//parser.currentTest);
        //console.log(document.getElementById('preview').innerHTML);

        //commented out, evaluated in handleCompiled handler now
        //this.itp.evaluateScripts();
      });
  }

  getStyle(templatename) {
    console.log('getStyle',templatename)
    if (this.styles.hasOwnProperty(templatename)) return this.styles[templatename];
    return this.styles.default;
  }

  startTestFromBegining() {
    this.state = 2;
    this.showprev = false;
    this.shownext = true;
    this.loading = true;
    this.api.getEncTestDefinition(this.testid)
      .then(data => {
        //console.log('startTestFromBegining testdefinition:', data);
        let currentRawTest = data;
        //if (typeof editor !== "undefined") currentRawTest = editor.getValue();
        //this.parser = new Interpreter();
        //this.parser.initTest(currentRawTest);
        this.itp = new Interpreter(this);        
        this.hideNonAnswered();
        this.itp.initTest(currentRawTest);
        let {base, baseproxy} = this.api.getEncBaseUrl(this.testid);
        console.log('startTestFromBeginning() base,baseproxy', base, baseproxy);
        this.itp.setBase(base, baseproxy);        
        this.previewinnerHTML = this.itp.nextpage();//parser.currentTest);
        this.templatestyle = this.getStyle(this.itp.templateStyle);
        //console.log(document.getElementById('preview').innerHTML);

        //commented out, evaluated in handleCompiled handler now
        //this.itp.evaluateScripts();
        //educational mode
        if (this.itp.eduid !== '') {
          console.log('reading eduid:', this.itp.eduid);
          this.api.getEduResults(this.itp.eduid)
            .then(eduresults => {this.itp.eduresults = eduresults;});
        }
        this.loading = false;
      })
      .catch(e =>{
        this.loading = false;
        console.log('error', e);
      });
  }

  hideNonAnswered() {
  }

  evaluateScripts() {
  }


  previtem() {
    this.itp.previouspage();
  }

  nextitem() {
    if (this.itp.checkAnswers()) { //check whether all mandatory questions are answered - set to non-default value
      if (this.itp.highlightEducation()) {
        this.previewinnerHTML = this.itp.nextpage();
        this.itp.highlighted = false;
        //commented out, evaluated in handleCompiled handler now
        //this.itp.evaluateScripts();
        this.itp.hideNonAnswered();
      } else {
        //not highlighted
      }
    } else {
      this.itp.highlightNonAnswered();
    }
  }

  pausetest() {
    this.state = 4;
    //TODO continue implementation
    let pausedtestResult = {};
    //    let testResult = {name: /*parser*/this.itp.testName, user: this.testUser.name, resultItems: answers2};
    pausedtestResult.testname = this.itp.testName;//{ get; set; }
    pausedtestResult.testid = this.testid;
    pausedtestResult.testsource = this.testsource;
    pausedtestResult.screennumber = this.itp.currentPage;//{ get; set; }
    pausedtestResult.rawtestdefinition = this.itp.currentTest;//{ get; set; }
    pausedtestResult.owner = this.testUser.id;
    //pausedtestResult.loginname = prompt("Enter your unique ID, e.g. email address");
    pausedtestResult.temporalresults = JSON.stringify(this.itp.result.answers);
    if (this.resumeid > 0) {
      this.api.putPausedTest(this.resumeid, pausedtestResult)
        .then(data => {
          this.resumeid = data._id;
          this.pausedtesturl = '#/resumetest/' + this.resumeid;
        });
    } else {
      this.api.postPausedTest(pausedtestResult)
        .then(data => {
          this.resumeid = data._id;
          this.pausedtesturl = '#/resumetest/' + this.resumeid;
        });
    }
    return true;
  }

  startPage() {
    this.showstart = true;
    this.shownext = false;
    this.showprev = false;
    this.showsubmit = false;
    this.showpause = false;
  }

  lastPage() {
    this.showstart = false;
    this.showpause = false;
    this.shownext = false;
    this.showprev = true;
    this.showsubmit = true;
  }

  lastNoPrevPage() {
    this.showstart = false;
    this.showpause = false;
    this.shownext = false;
    this.showprev = false;
    this.showsubmit = true;
  }

  firstPage() {
    this.showstart = false;
    this.showpause = false;
    this.shownext = true;
    this.showprev = false;
  }

  middlePage() {
    this.shownext = true;
    this.showprev = true;
    this.showpause = true;
  }

  //            document.getElementById('next').style.visibility = 'visible';
  //            switchvisibility(allowprev, 'previous');
  /*this.switchvisibility(false, 'resume');
  this.switchvisibility(true, 'next2');
  this.switchvisibility(this.allowprev, 'previous2');
  this.switchvisibility(true, 'pause2');
  */

  //TODO move communication to another class

  postAnswerCallback(data) {
    console.log('saved. Response:', data);
    //OK to delete resume
    /*
    if (this.resumeid && this.resumeid > 0) {
      this.pa.deletePausedTest(this.resumeid)
        .then(data2 => {
          if (data2.ok) {
            this.resumeid = 0;
          }
        });
    }
    */

    /*   $.ajax({
        type: 'DELETE',
        url: PsychoTestPauseUrl + this.resumeid,
        contentType: 'application/json',
        dataType: 'json',
        success: function(data2) {
          this.resumeid = 0;
        }, //pausetestcallback,
        error: function(data2) {
          console.log('error during deleting paused test');
          console.log(data2);
        }//postAnswerErrorCallback
      });
    }*/
    // TODO move to api
    // this.updateResultList();
    return data;//initializeAll();
  }

  postAnswerErrorCallback(data) {
    console.log('performtest post callback data', data);
    if (data.status === 302 || data.ok ) {
      //nothing to do
    } else {
      console.log('error:');
      console.log(data);

      //ask for filename
      let filename = prompt('Při ukládání výsledků tohoto testu došlo k chybě\n Zadejte jméno souboru (*.presult):', 'vysledektestu.presult');

      if (filename) {
        //adds csv as extension
        if (!filename.endsWith('.presult')) filename = filename.concat('.presult');
        //labels first row
        //let content = this.data.join(',');//'Time,' + this.labels + '\n';
        //transpose each row = variable in specific time
        //let content = this.csvcontent();
        let blob = new Blob([JSON.stringify(this.result.answers)], {type: 'application/json;charset=utf-8;'});
        saveAs(blob, filename);
      }
    }
    /*let psychoTestIndex;
    if (!localStorage.getItem('psychoTestIndex')) {
      localStorage.setItem('psychoTestIndex', 0);
      psychoTestIndex = 0;
    } else {
      let b = localStorage.getItem('psychoTestIndex');
      psychoTestIndex = parseInt(b, 10);
      psychoTestIndex++;

    }*/
    //if (!localStorage.psychoTestResults) localStorage.psychoTestResults = [];
    //localStorage.setItem('psychoTestResults' + psychoTestIndex, JSON.stringify(this.result.answers));
    //if (psychoTestIndex>10) localStorage.removeItem('psychotestResult'+(psychoTestIndex-10));
  }

  postAnswers(callback, errorcallback) {
    let answers2 = [];
    /*parser*/

    //delete checkedValues from answers
    //this.itp.result.answers.forEach(function(item) {
    console.log('answers',this.itp.result.answers);
    for (let item of this.itp.result.answers) {
      console.log('answer item',item);
      if (item) {
        for (let subitem in item) {
          //item.forEach(function (subitem) {
          if (item[subitem].hasOwnProperty('checkedvalues')) delete item[subitem].checkedvalues;
          if (typeof item[subitem] === 'object' && item[subitem] !== null) answers2.push(item[subitem]);
        }
      }
    }
    for (let item in this.itp.result.answers) {
      console.log('answer item',item);
      if (typeof this.itp.result.answers[item] === 'object') {
        if (this.itp.result.answers[item].hasOwnProperty('answer'))
          {
            answers2.push(this.itp.result.answers[item])
          }
        
      }
    }
    //});
    //transform answers2 ranking2d, fix #64
    let additional = [];
    for (let a2 of answers2) {
      if (a2.options && a2.options.startsWith('ranking2d')) {
        //do transform 1.wav|2.wav|5.wav
        try {
          let cases = a2.case.split('|'); //1.wav,2.wav,3.wav
          if (cases.length<2) cases = a2.case.split(' '); //split by space
          let answers = a2.answer.split('|'); //audio[3],audio[1],audio[2]
          let tasks = a2.options.slice(10).split(';'); //removes ranking2d and split by ;
          for (let auindex of answers) {
            let re = /audio\[([0-9]+)\]([0-9]+),([0-9]+)/g;
            let resplit = re.exec(auindex); //gets 1 x y from audio[1]x,y
            let index = parseInt(resplit[1]) - 1; //audio[1] is [0]
            let answer1 = resplit[2];
            let answer2 = resplit[3];
            let row1 = {case: cases[index], task: tasks[0], answer: answer1, date: a2.date}; //creates row with task1 and answer1
            let row2 = {case: cases[index], task: tasks[1], answer: answer2, date: a2.date}; //creates row with task2 and answer2
            additional.push(row1);
            additional.push(row2);
          }
        } catch (e) {
          console.warn('ranking2d result error matching result row', a2, e);
        }
      }
      if (a2.annotation) {
        //for each annotation generate extra row
        try {
          for (let audiosrc in a2.annotation) {
            let row3 = {case: audiosrc, task: 'annotation in screen with ' + a2.case, answer: a2.annotation[audiosrc], date: a2.date};
            additional.push(row3);
          }
        } catch (e) {
          console.warn('ranking2d result error matching result row', a2, e);
        }
      }
    }
    //add recognized user which performed the test
    //let testUser = document.getElementById('loginname') ? document.getElementById('loginname').value : 'administrator';
    if (additional.length > 0) answers2.push(...additional);
    if (this.itp.result.stimulusplayed.length >0 ) answers2.push(...this.itp.result.stimulusplayed);
    let testResult = {name: /*parser*/this.itp.testName, user: this.testUser.name, resultItems: answers2};
    // store in localstorage
    //this.storeLocalStorage(testResult);

    //console.log('testresult:',testResult);
    //console.log('result struct:',this.itp.result)
    /*$.ajax({
      type: 'POST',
      url: this.PsychoResultUrl,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(testResult),
      processData: false,
      success: callback,
      error: errorcallback
    });*/
    this.api.localStore({'name':this.testid,'date':new Date().toLocaleString(),'result':testResult});
    this.api.postResults(testResult, this.testid)
      .then(data => {
        console.log('performtest post callback data', data);
        if (data.status === 302 || data.ok ) {
          this.api.lastResultSaved = true;
        } else {
          console.log('error:');
          console.log(data);
          this.api.lastResultSaved = false;
        }
        //callback;
        this.api.releasePausedTest();
      })
      .catch(error =>{
        console.log('error:', error);
        this.api.lastResultSaved = false;
      });
    //.catch(errorcallback); //TODO test whether to catch error in then or catch
  }


  /*  storeLocalStorage(testResult) {
    let psychoTestIndex = 0;
    //store in localStorage

    if (!localStorage.getItem('psychoTestIndex')) {
      localStorage.setItem('psychoTestIndex', 0);
      psychoTestIndex = 0;
    } else {
      psychoTestIndex = parseInt(localStorage.getItem('psychoTestIndex'), 10);
      psychoTestIndex++;
      localStorage.setItem('psychoTestIndex', psychoTestIndex);
    }
    //if (!localStorage.getItem('psychoTestResults') localStorage.psychoTestResults = [];
    localStorage.setItem('psychoTestResults' + psychoTestIndex, JSON.stringify(testResult));
    if (psychoTestIndex >= 20) localStorage.removeItem('psychoTestResults' + (psychoTestIndex - 20));
  }
  */


  submittest() {
    if (this.itp.checkAnswers()) { //check whether all mandatory questions are answered - set to non-default value
      if (!this.itp.highlightEducation()) {
        return false;
      }
      this.state = 3;
      console.log('performtest submittest()');

      //this.showButtonsStart();
      this.showstart = true;
      this.shownext = false;
      this.showprev = false;
      this.showsubmit = false;
      this.showpause = false;

      this.postAnswers(this.postAnswerCallback, this.postAnswerErrorCallback);
      return true;
      //$.post("../psychotestResults", ,null,"json");
    }
    this.itp.highlightNonAnswered();
    return false;
  }
}

