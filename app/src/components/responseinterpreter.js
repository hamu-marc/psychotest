//var ri;

export class Responseinterpreter {
  /**
   * Created by tomaton on 10/21/2015.
   */

  constructor(parent) {
    this.answers = [];
    this.stimulusplayed = [];
    this.lastotazka = '';
    this.lasttask = '';
    this.lastqcase = '';
    this.parser = parent;

  }

  resetLast() {
    this.lastqcase = '';
    this.lastotazka = '';
    this.lasttask = '';
    this.lastoptions = '';
  }

  addCase(qcase) {
    this.lastqcase += (this.lastqcase.length===0) ? qcase : '|'+qcase; //first without |, other with | separator
  }

  setFullAnswer(pageNum, questionNum, qcase, question, answer, qtask, qoptions = '') {
    //test if exists
    //console.log("setanswer " + pageNum + " " + questionNum+" "+qcase+" "+question+":", answer);
    if (!this.answers[pageNum - 1]) this.answers[pageNum - 1] = []; //some workaround probably not needed more
    if (!this.answers[pageNum - 1][questionNum - 1]) this.answers[pageNum - 1][questionNum - 1] = {};
    this.answers[pageNum - 1][questionNum - 1] =
      {case: qcase,
        task: question,
        options: qoptions};
    this.setAnswer(pageNum, questionNum, answer);
  }

  setPlayedStimulus(audioid){
    this.stimulusplayed.push({case:this.lastqcase,task:audioid,date:new Date()});
  }


  //sets default answer
  /*Responses.prototype.setDefaultAnswer = function (pageNum, questionNum) {
      return this.setDefaultAnswer(pageNum,questionNum,"");
      // if (!this.answers[pageNum - 1] || !this.answers[pageNum - 1][questionNum - 1]) this.setFullAnswer(pageNum, questionNum, this.lastqcase,this.lastotazka,"N/A");
  };

  //sets default answer
  Responses.prototype.setDefaultOptionalAnswer = function(pageNum, questionNum) {
      return setDetaultOptionalAnswer(pageNum,questionNum,"");
      //    if (!this.answers[pageNum - 1] || !this.answers[pageNum - 1][questionNum - 1]) this.setFullAnswer(pageNum, questionNum, this.lastqcase, this.lastotazka, "");
  };*/

  //sets default answer
  setDefaultAnswer(pageNum, questionNum, suffix, options = '') {
    let mysuffix = (suffix) ? suffix : '';
    if (!this.answers[pageNum - 1] || !this.answers[pageNum - 1][questionNum - 1]) this.setFullAnswer(pageNum, questionNum, this.lastqcase, this.lastotazka + mysuffix, 'N/A', this.lasttask, options);
  }

  //sets default answer
  setDefaultOptionalAnswer(pageNum, questionNum, suffix, options = '') {
    let mysuffix = (suffix) ? suffix : '';
    if (!this.answers[pageNum - 1] || !this.answers[pageNum - 1][questionNum - 1]) this.setFullAnswer(pageNum, questionNum, this.lastqcase, this.lastotazka + mysuffix, '[no answer]', this.lasttask, options);
  }


  /* executable function, can be called from html element*/
  setAnswer(pageNum, questionNum, answer) {
    //set for preview
    if (! this.parser.result.answers[pageNum - 1]) this.parser.result.answers[pageNum - 1] = []
    if (! this.parser.result.answers[pageNum - 1][questionNum - 1]) this.parser.result.answers[pageNum - 1][questionNum - 1] = {}

    //if value attribute is set - it's the answer
    if (answer.value) this.parser.result.answers[pageNum - 1][questionNum - 1].answer = answer.value;
    //else no value attribute - set all struct as answer
    else this.parser.result.answers[pageNum - 1][questionNum - 1].answer = answer;
    this.parser.result.answers[pageNum - 1][questionNum - 1].date = new Date();
  }

  setAnnotation(audiosrc, pagenum,questionnum,value) {
    //create default empty annotation structure if it doesn't exist for audioid
    if (!this.parser.result.answers[pagenum-1][questionnum-1].annotation) {
      this.parser.result.answers[pagenum - 1][questionnum - 1].annotation = {};
      this.parser.result.answers[pagenum - 1][questionnum - 1].annotation[audiosrc]=value;
    } else {
      this.parser.result.answers[pagenum - 1][questionnum - 1].annotation[audiosrc]=value;
    }
    /*if (! this.parser.result.answers[audiosrc])  this.parser.result.answers[audiosrc] = {};
    this.parser.result.answers[audiosrc].annotation = value;
    console.log('setannotation', audiosrc, value);*/
  }

  getAnnotation(audiosrc,pagenum,questionnum) {
    //create default empty annotation structure if it doesn't exist for audioid
    if (this.parser.result.answers[pagenum-1][questionnum-1].annotation && this.parser.result.answers[pagenum-1][questionnum-1].annotation[audiosrc])
      return this.parser.result.answers[pagenum-1][questionnum-1].annotation[audiosrc]
    else return false;
    /*console.log('getannotation', audiosrc, this.parser.result.answers[audiosrc]);
    if (this.parser.result.answers[audiosrc]) return this.parser.result.answers[audiosrc].annotation;
    return false;*/
  }

  setCheckAnswer(pageNum, questionNum, answer) {
    if (answer.value) {
      if (!this.parser.result.answers[pageNum - 1][questionNum - 1].hasOwnProperty('checkedvalues')) this.parser.result.answers[pageNum - 1][questionNum - 1].checkedvalues = [];
      if (answer.checked) this.parser.result.answers[pageNum - 1][questionNum - 1].checkedvalues[answer.value] = answer.value;
      else if (this.parser.result.answers[pageNum - 1][questionNum - 1].checkedvalues.hasOwnProperty(answer.value)) delete this.parser.result.answers[pageNum - 1][questionNum - 1].checkedvalues[answer.value];
      let currentanswer = '';
      let checkedvalues = this.parser.result.answers[pageNum - 1][questionNum - 1].checkedvalues;
      for (let item of Object.keys(checkedvalues)) {
        if (checkedvalues[item]) currentanswer += item + ';';
      }
      this.parser.result.answers[pageNum - 1][questionNum - 1].answer = currentanswer;
    }
    //    else answers[pageNum - 1][questionNum - 1].answer = answer;
    this.parser.result.answers[pageNum - 1][questionNum - 1].date = new Date();
  }

  setDefaultAnswerById(id,mycase,mytask,myoptions){
    //window.psychotestScreenPage = this.currentPage;
    const pageid = 's.'+window.psychotestScreenPage + '.t.'+id;
    this.answers[pageid] = {
      answer:'N/A',
      annotation:{},
      case:mycase,
      task:mytask,
      options:myoptions
    }
  }
  setAnswerById(id,answer){
    const pageid = 's.'+window.psychotestScreenPage + '.t.'+id;
    if (this.answers[pageid]){
      this.answers[pageid].answer = answer;
      this.answers[pageid].date = new Date();
    }
    else console.warn('answer default not yet set for id:'+id);
  }
}
