//import 'jquery';
import {Stimulusinterpreter} from './stimulusinterpreter';
import {Responseinterpreter} from './responseinterpreter';
//import {Ranking2dinterpreter} from './ranking2dinterpreter';
import {Preprocesor} from './preprocesor';
import {Dsl} from './dsl';

//shuffle randomly the array
Array.prototype.shuffle = function() {
  let i = this.length; let j; let temp;
  if (i == 0) return this;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
};

//make prototype function startsWith - if it does not exist
if (typeof String.prototype.startsWith !== 'function') {
  String.prototype.startsWith = function(str) {
    return this.slice(0, str.length) == str;
  };
}

if (typeof String.prototype.endsWith !== 'function') {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}

String.prototype.extract = function(subs) {
  return this.substring(this.indexOf(subs) + subs.length);
};

String.prototype.contains = function(str) {
  return this.indexOf(str) !== -1;
};


export class Interpreter {
  constructor(controller) {
    this.controller = controller; //is used to notify first or last page of test and to control test page flow
    this.currentCursor = 0;
    this.currentPage = 0;
    window.psychotestScreenPage = this.currentPage;
    this.maxPages = 0;
    this.templateStyle = 'default';
    this.questionPage = 0;
    this.sliderValues = [];
    this.testName = '';
    this.currentTest = '';
    this.sloupce = false;
    this.sliderId = 0;
    this.previoustoken = ''; //holds previous token - for distinguishing states during interpretation
    this.previousrow = '';//holds previous row
    this.tstate = {}; //holds structure of state variables
    //keep the last question and values for answer
    this.allowprev = true;
    this.educational = false;
    this.highlighted = false;
    this.eduid = 0;
    this.eduresults = {};//new Responses();
    this.resumeid = 0; //id of paused test; for future update

    this.hodnoty = [];
    this.hodnotySetted = true;
    //    this.columnnumber = 0;
    this.lastformid = '';
    this.lastformidescaped = '';
    this.pausedtestid = 0;
    this.parovaotazka = false;

    this.result = new Responseinterpreter(this);
    window.ri = this.result;
    window.ii = this;
    this.stimul = new Stimulusinterpreter(this);
    //this.ranking2d = new Ranking2dinterpreter(this);
    this.base = '';
  }

  static extract(s, subs) {
    return s.substring(s.indexOf(subs) + subs.length);
  }

  static endsWith(s, suffix) {
    return s.indexOf(suffix, s.length - suffix.length) !== -1;
  }

  translateObrazovka(row) {
    this.result.resetLast();
    this.sloupce = false;
    let translatedRow = "<span class='lefthead'>" + this.currentPage + '. ' + Interpreter.extract(row, 'screen') + " </span><span class='righthead'>" + this.testName + "</span><p style='clear:both;margin:20px;'></p>\n";
    this.previoustoken = 'screen';
    //set title of the document - title visible in tab
    document.title = this.testName + ' ' + this.currentPage;
    return translatedRow;
  }

  translateText(row) {
    let output = '';
    if (this.sloupce) output += "<tr><td colspan='2'>";
    let rawtext = Interpreter.extract(row, 'text');
    //replacer to add baseurl between p1 and p2 if not absolute url
    let base = this.base;
    function replacer(match, p1, p2, p3, offset, string) { if (!p2.match(/http/)) return p1 + base + '/' + p2 + p3; return match;}
    //replace links in src="..." adds baseurl prefix - if the url is relative (do not start with 'http')
    let imgsrc = rawtext.replace(/(src=")([^"]*)(")/g, replacer);
    output += '<p>' + imgsrc + '</p>';

    if (this.sloupce) output += '</td></tr>';
    return output;
  }

  translateCSS(row) {
    return '<style>' + Interpreter.extract(row, '#css') + '</style>';
  }
  //used multipletimes
  generateHtmlOtazkaRow(suffix) {
    this.lastformid = 'q' + this.currentPage + '.' + this.questionPage;
    this.lastformidescaped = 'q' + this.currentPage + '\\\\.' + this.questionPage;
    let mysuffix = '';
    if (suffix) mysuffix = suffix;
    return "<form id='" + this.lastformid + "' name='q" + this.currentPage + '.' + this.questionPage + "'><fieldset><legend>" + this.result.lastotazka + mysuffix + ' </legend>';
  }

  generateEditHeaderRow() {
    this.lastformid = 'q' + this.currentPage + '.' + this.questionPage;
    this.lastformidescaped = 'q' + this.currentPage + '\\\\.' + this.questionPage;
    return "<form id='" + this.lastformid + "' name='q" + this.currentPage + '.' + this.questionPage + "'><fieldset><legend>" + this.result.lastotazka + '</legend>';
  }

  translateTaskForStimuli(row) {
    this.parovaotazka = false;
    if (row.startsWith('task')) {this.result.lastotazka = Interpreter.extract(row, 'taskforstimuli ');} //adds to the #1 to the question
    this.hodnotySetted = false;
    this.questionPage++;
    //var mytable = "";
    //mytable += this.generateHtmlOtazkaRow();
    //if (this.sloupce) { //make row of table
    //        var mytable =  + mytable;//  + "</td>"; //
    //}
    return "<tr><td class='task'>" + this.generateHtmlOtazkaRow(' #1');
  }

  /*
   *	translates "task ..." to the HTML form
   */
  translateOtazka(row) {
    this.parovaotazka = false;
    if (row.startsWith('task')) {this.result.lastotazka = Interpreter.extract(row, 'task ');}
    //console.log('translateOtazka() task row:', row, this.result.lastotazka);
    this.hodnotySetted = false;
    this.questionPage++;
    return this.generateHtmlOtazkaRow();
  }
  //mytableend = "</td>";
  //if (columnnumber == 1) mytableend += "</tr>";
  //TODO finish otazka and parovaotazka in table with 2 columns
  /*
   *	translates "parovaotazka ... " to the HTML form with 2 sounds each in 1 column and each row has the same question
   */
  translateParovaOtazka(row) {
    //lastotazka = row.substring("otazka".length);
    //hodnotySetted = false;
    this.parovaotazka = true;
    this.questionPage++;
    if (row.startsWith('task')) {this.result.lastotazka = Interpreter.extract(row, 'task ');}
    //console.log('translateParovaOtazka() task row:', row, this.result.lastotazka);
    this.lastformid = 'q' + this.currentPage + '.' + this.questionPage;
    this.lastformidescaped = 'q' + this.currentPage + '\\\\.' + this.questionPage;
    return "<tr><td colspan='2'><form id='" + this.lastformid + "'><fieldset><legend>" + this.result.lastotazka + '</legend>';
  }
  /*
   *	translates "hondoty ..." to the opened HTML form, interprets as allowed values to be chosen by user
   */
  /*function translateHodnoty(rowsplitted) {
   return translateHodnoty(rowsplitted, true,false);
   }
   */

  hashCode(s) {
    return s.split('').reduce(function(a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
  }

  generateHtmlRow(rowsplitted, radiobuttons, taskindex) {
    let translatedRow = '';
    for (let j = 1; j < rowsplitted.length; j++) {
      let mybr = '<br />';
      let myvalue = rowsplitted[j];
      let myid = this.hashCode(this.lastformid + 'v' + myvalue);
      if (this.parovaotazka || this.valuesonrow) mybr = '&nbsp; &nbsp;'; //don't make new line in parova otazka or when values on row
      if (radiobuttons) {
        translatedRow += "<input id='"
          + myid
          + "'type='radio' name='otazka' value='"
          + myvalue
          + "' onclick='ri.setAnswer(" + this.currentPage + ',' + this.questionPage +
          ",this)'/><label for='"
          + myid
          + "' class='answer'><span><span></span></span>"
          + myvalue
          + '</label>'
          + mybr;
      } else {
        translatedRow +=
            "<input id='"
            + myid
            + "' type='checkbox' name='otazka' value='"
            + myvalue
            + "' onclick='ri.setCheckAnswer(" + this.currentPage + ',' + this.questionPage
            + ",this)'/><label for='"
            + myid
            + "'span class='answer'><span></span>"
            + myvalue
            + '</label>'
            + mybr;
      }
    }
    this.result.setDefaultAnswer(this.currentPage, this.questionPage, taskindex, rowsplitted.join(' '));
    return translatedRow;
  }

  translateHodnoty(rowsplitted) {
    let radiobuttons = ! Dsl.isCheckboxvalues(rowsplitted[0]);
    this.valuesonrow = Dsl.isCheckboxvaluesOnRow(rowsplitted[0]) || Dsl.isValuesOnRow(rowsplitted[0]);
    let translatedRow = '';
    let taskindex = ''; if (this.sloupce && !this.parovaotazka) taskindex = ' #1';
    translatedRow += this.generateHtmlRow(rowsplitted, radiobuttons, taskindex);
    translatedRow += '</fieldset></form>\n';
    if (this.sloupce) {//coppies the same task and values to the second collumn of the pairs
      if (this.parovaotazka) {
        translatedRow += '</td></tr>';
      } else {//close the column, duplicate question to second column and close the row
        this.questionPage++;
        taskindex = ' #2';
        translatedRow += "</fieldset></form></td><td class='task'>" + this.generateHtmlOtazkaRow(taskindex); //fix bug#249 added closing form tag
        translatedRow += this.generateHtmlRow(rowsplitted, radiobuttons, taskindex);
        translatedRow += '</fieldset></form></td></tr>';
      }
    }
    //will remember the values of last question - it is not needed to repeat them
    this.hodnoty[this.result.lastotazka] = rowsplitted;
    this.hodnotySetted = true;
    return translatedRow;
  }

  splitValues(row) {
    let re1 = /[ ;,]+/; // fix feature bug #240, coma ',' is used to separate interval numbers
    if (!row.contains('"')) return row.split(re1);
    let rowsplitted = [];
    let quote = false;
    let currentitem = '';
    for (let i = 0; i < row.length; i++) {
      if (!quote) //normal split
      {
        if (/[\"]/.test(row[i])) quote = true;
        else if (/[, ;]/.test(row[i])) {
          if (currentitem.length > 0) rowsplitted.push(currentitem);
          currentitem = '';
        } else {
          currentitem += row[i];
        }
      } else { //quotes add everything between quotes
        if (/[\"]/.test(row[i])) {
          rowsplitted.push(currentitem);
          currentitem = '';
          quote = false;
        } else {
          currentitem += row[i];
        }
      }
    }
    if (currentitem.length > 0) rowsplitted.push(currentitem);
    return rowsplitted;
  }

  translateScale(previousrow, rowsplitted) {
    if (this.sloupce && ! this.parovaotazka) { //makes two coppies of the task for each stimulus in pair
      let translated = '\n' + this.translateSkalovaci() + this.translateSkalovaciHodnoty(rowsplitted, ' #1');
      this.questionPage++;
      translated += '</fieldset></form></td><td>' + this.generateHtmlOtazkaRow(' #2') + this.translateSkalovaci() + this.translateSkalovaciHodnoty(rowsplitted, ' #2') + '</fieldset></form></tr></td>\n';
      return translated;
    }
    return this.translateSkalovaci(previousrow) + this.translateSkalovaciHodnoty(rowsplitted);
  }

  translateVAScale(previousrow, rowsplitted) {
    if (this.sloupce && ! this.parovaotazka) {//makes two coppies of the task for each stimulus in pair
      let translated = '\n' + this.translateSkalovaci() + this.translateSkalovaciVAHodnoty(rowsplitted, ' #1');
      this.questionPage++;
      translated += '</fieldset></form></td><td>' + this.generateHtmlOtazkaRow(' #2') + this.translateSkalovaci() + this.translateSkalovaciVAHodnoty(rowsplitted, ' #2') + '</fieldset></form></tr></td>\n';
      return translated;
    }
    return this.translateSkalovaci(previousrow) + this.translateSkalovaciVAHodnoty(rowsplitted);
  }

  /*  translateSkalovaciHodnoty(rowsplitted) {
    return this.translateSkalovaciHodnoty(rowsplitted,"");
  };
*/
  translateSkalovaciHodnoty(rowsplitted, taskindex = '') {
    //moved to translateSkalovaci questionPage++; //increase index of answer
    this.result.setDefaultAnswer(this.currentPage, this.questionPage, taskindex, rowsplitted.join(' ')); //fix bug # 198
    //var rowsplitted = splitValues(row);
    let translatedRow = '';
    this.sliderValues[this.sliderId] = rowsplitted.slice(1);
    translatedRow += '<script>Interpreter.makeSlider(0, 0,' + (this.sliderValues[this.sliderId].length - 1) + ', 1, ' + this.sliderId + ',' + this.questionPage + ');</script>';
    //    if (this.sloupce)
    //        if (this.parovaotazka) {
    //            translatedRow += "</td></tr>";
    /*        } else {
                this.questionPage++;
                this.sliderId++;
                this.sliderValues[this.sliderId] = rowsplitted.slice(1);
                this.result.setDefaultAnswer(this.currentPage, this.questionPage); //fix bug # 198
                translatedRow += "<script>makeSlider(0, 0," + (this.sliderValues[this.sliderId].length-1) + ", 1, " + this.sliderId + "," + this.questionPage + ");</script>";
            }*/
    //} else {
    //    this.questionPage++;
    //    this.sliderId++;
    //    this.result.setDefaultAnswer(this.currentPage, this.questionPage); //fix bug # 198
    //    //var rowsplitted = splitValues(row);
    //    //translatedRow = "";
    //    this.sliderValues[this.sliderId] = rowsplitted.slice(1);
    //    translatedRow += "<td><tr><script>makeSlider(0, 0," + (this.sliderValues[this.sliderId].length-1) + ", 1, " + this.sliderId + "," + this.questionPage + ");</script>";
    //}
    return translatedRow;
  }

  /* translateSkalovaciVAHodnoty(rowsplitted) {
    return this.translateSkalovaciVAHodnoty(rowsplitted,"");
  };

  */

  translateSkalovaciVAHodnoty(rowsplitted, taskindex = '') {
    //moved to translateSkalovaci questionPage++; //increase index of answer
    this.result.setDefaultAnswer(this.currentPage, this.questionPage, taskindex, rowsplitted.join(' ')); //fix bug #198
    let translatedRow = '';
    let mySliderValues = [];
    //console.log("translateSkalocavi rowsplitted:");
    //console.log(rowsplitted)
    /*for (var i = 3; i < rowsplitted.length;i=i+2 ) {
     mySliderValues[parseInt(rowsplitted[i])]= rowsplitted[i+1];
     }
     sliderValues[sliderId] = mySliderValues;
     */
    if (rowsplitted[2].indexOf('(') > 0) { //fix bug #269 scale 0 100(0.5) will be translated as 0 100 with step 0.5
      let maxstep = rowsplitted[2].split(/[\(\)]/);
      //console.log("maxstep");
      //console.log(maxstep)
      for (let i = 3; i < rowsplitted.length; i = i + 2) {
        //mySliderValues[Math.floor(parseInt(rowsplitted[i])/maxstep[1] - rowsplitted[1])] = rowsplitted[i + 1];//fix bug #269 add correct indices to ticks -100 100(0.5) will make -200 200
        mySliderValues[parseFloat(rowsplitted[i])] = rowsplitted[i + 1]; //fix bug #269 new version of labeled, changed to parsefloat
        //mySliderValues[rowsplitted[i]] = rowsplitted[i + 1]; //fix bug #minus float values not determined??
      }
      this.sliderValues[this.sliderId] = mySliderValues;

      translatedRow += '<script>Interpreter.makeVASlider(' + this.sliderId + ',' + rowsplitted[1] + ',' + maxstep[0] + ', ' + this.questionPage + ',' + maxstep[1] + ');</script>';
    } else {
      for (let i = 3; i < rowsplitted.length; i = i + 2) {
        mySliderValues[parseInt(rowsplitted[i], 10)] = rowsplitted[i + 1];
      }
      this.sliderValues[this.sliderId] = mySliderValues;
      translatedRow += '<script>Interpreter.makeVASlider(' + this.sliderId + ',' + rowsplitted[1] + ',' + rowsplitted[2] + ', ' + this.questionPage + ');</script>';
    }
    //console.log("va hodnoty js:" + translatedRow);

    return translatedRow;
  }


  translateSkalovaci(row) {
    let translatedRow = '';//"<br />";
    this.sliderId++;
    if (row.startsWith('task')) this.result.lastotazka = Interpreter.extract(row, 'task ');  //fix bug #198
    //console.log('translateOtazka() task row: lastotazka:', row, this.result.lastotazka);
    //move to task questionPage++; //moved from skalovaci??hodnoty
    //fix #212    translatedRow += "<p id='q" + currentPage + "." + questionPage + "' class='label'><input class='sliderlabel' readonly='true' type='text' id='slider" + sliderId + "Value'></p>";
    translatedRow += "<p class='label'><input class='sliderlabel' readonly='true' type='text' id='slider" + this.sliderId + "Value'></p>";
    translatedRow += "<div id='slider" + this.sliderId + "'></div>";
    //translatedRow += "<br /><br />";
    //console.log("translateSkalovaci " + sliderId);
    //move it to skalovacihodnoty
    return translatedRow;
  }


  translatePopis(row) {
    let taskindex = ''; if (this.sloupce && !this.parovaotazka) taskindex = ' #1';
    if (Interpreter.endsWith(row, '?')) this.result.setDefaultOptionalAnswer(this.currentPage, this.questionPage, taskindex);
    else this.result.setDefaultAnswer(this.currentPage, this.questionPage, taskindex, row);
    let translatedrow = "<textarea rows='1' onkeyup='window.ri.setAnswer(" + this.currentPage + ',' + this.questionPage + ",this)'></textarea>";
    if (this.sloupce) {
      if (this.parovaotazka) {
        translatedrow += '</fieldset></form></td></tr>';
      } else {
        this.questionPage++;
        taskindex = ' #2';
        translatedrow += '</fieldset></form></td><td>' + this.generateHtmlOtazkaRow(taskindex); //fix bug#249 added closing form tag
        if (Interpreter.endsWith(row, '?')) this.result.setDefaultOptionalAnswer(this.currentPage, this.questionPage, ' #2');
        else this.result.setDefaultAnswer(this.currentPage, this.questionPage, taskindex, row);
        translatedrow += "<textarea rows='1' onkeyup='window.ri.setAnswer(" + this.currentPage + ',' + this.questionPage + ",this)'></textarea>";
      }
    }
    return translatedrow;
  }

  //if the question is not closed put values from previously defined question with values
  closeOtazka() {
    if (!this.hodnotySetted) {
      //console.log("closeOtazka() last values not set");
      //console.log(hodnoty);
      //console.log(lastotazka);\
      this.hodnotySetted = true;
      if (this.hodnoty[this.result.lastotazka]) {
        //console.log("setting from last values");
        return this.translateHodnoty(this.hodnoty[this.result.lastotazka]);
      } return '</fieldset></form>\n';
    } return '';
  }
  /*
   *	"sloupce" command initiate the HTML output to be generate into the HTML table with 2 collumns
   */
  translateSloupce() {
    if (!this.sloupce) {
      this.sloupce = true;
      //return "<table><thead><tr><th class='tablefirst'/><th class='tablesecond'/></thead><tbody><tr>";
      return '<table><tr>';
    } return '';
  }

  closeSloupce() {
    if (this.sloupce) {
      this.sloupce = false;
      return '</tr></tbody></table>';
    } return '';
  }

  //select generates select menu
  translateSelect(rowsplitted) {
    //fix bug ... indicate that the element was answered by changing the background
    let row = "<select onclick='this.style.background=\"lightblue\"; window.ri.setAnswer(" + this.currentPage + ',' + this.questionPage + ",this);' onchange='window.ri.setAnswer(" + this.currentPage + ',' + this.questionPage + ",this);'>";
    for (let i = 1; i < rowsplitted.length; i++) {
      row += "<option value='" + rowsplitted[i] + "'>" + rowsplitted[i] + '</option>';
    }
    row += '</select>';
    this.result.setDefaultAnswer(this.currentPage, this.questionPage, '', rowsplitted.join(' ')); //fix bug # 198
    return row;
  }

  translateStyle(previoustoken, row) {
    let firsttoken = row.trim().split(' ', 2)[0]; //gets #style or #stylebutton or #styleform
    let styledefinition = Interpreter.extract(row, firsttoken); //extract the previously obtained token
    if (Dsl.isObrazovka(previoustoken)) {return "\n<script>document.body.style='" + styledefinition + "'</script>\n";} //style of body e.g.:max-width:40em
    if (Dsl.isZvuk(previoustoken)) {return "\n<script>$('.stimulus').attr('style','" + styledefinition + "');</script>\n";} //style of all stimulus attribute e.g.: width:10%;
    if (previoustoken === 'button') {return "\n<script>$('.sound-button').attr('style','" + styledefinition + "');</script>\n";}
    if (Dsl.isOtazka(previoustoken)) {return "\n<script>$('.task').attr('style','" + styledefinition + "');</script>\n";}
    if (previoustoken === 'form') {
      return '\n<script>' +
        //"console.log('" +lastformidescaped+"');"+ //logs
        "$('#" + this.lastformidescaped + "').attr('style','" + styledefinition + "');" + //sets style for the form element with last formid
        "$('#" + this.lastformidescaped + " ~ form').attr('style','" + styledefinition + "');" + //and sets style for all other sibling forms
        '</script>\n';
    }
    //fix #212, 248
    //return "\n<script>$('.task').children('form').attr('style','" + styledefinition + "');</script>\n";
    return '';
  }


  translateType(row) {
    //translates type - educational mode, previous button allowed/notallowed etc.
    if (row.contains('nopreviousbutton')) this.allowprev = false;
    if (row.contains('yespreviousbutton')) this.allowprev = true;
    if (row.contains('educational')) this.educational = true;
    if (this.educational) {
      this.eduid = row.slice(row.indexOf('educational') + 12); //everything after educational is filename
      this.eduresults = [];
      //if (this.eduid !== '') this.getEduResults();
    } //indexOf("educational")+1
  }

  getEduResults() {
    //TODO reimplement using new API

    /*
    $.getJSON(PsychoResultIdUrl + this.eduid, null, function(data) {
      //console.log("retrieved educational raw results");
      //console.log(data);
      this.eduresults = {};
      data[0].resultItems.forEach(function(item) {
        //console.log("parsing item:");
        //console.log(item);
        let itemobj = RepairJSONResultItem(item);
        if (!this.eduresults[itemobj.case]) this.eduresults[itemobj.case] = {};
        if (!this.eduresults[itemobj.case].answer) this.eduresults[itemobj.case].answer = [];
        this.eduresults[itemobj.case].answer[itemobj.question.trim()] = itemobj.answer;
        if (!this.eduresults[itemobj.case].note) this.eduresults[itemobj.case].note = [];
        if (!itemobj.note) this.eduresults[itemobj.case].note[itemobj.question.trim()] = itemobj.date; //TODO new collumn for note, current workaround, note into date collumn
        else this.eduresults[itemobj.case].note[itemobj.question.trim()] = itemobj.note;
      });
      //console.log("retrieved educational results");
      //console.log(eduresults);
    });
     */
  }
  //translate one row
  translateTestItems(row) {
    let translatedRow = '';
    row = row.trim();
    console.log('test item:', row);
    /*var re1 = /[ ;,]+/; // fix feature bug #240, coma ',' is used to separate interval numbers
     var rowsplitted = row.split(re1);*/
    let rowsplitted = this.splitValues(row); //fix bug, comas and spaces in quotes
    if (rowsplitted.length === 0) return translatedRow;

    if (Dsl.isZvuk(rowsplitted[0])) translatedRow += this.stimul.translateZvuk(rowsplitted, this.tstate.poradivnticinahodne, this.result, this.sloupce);
    else if (!Dsl.startsWithComment(rowsplitted[0])) translatedRow += this.stimul.translateNonZvuk(row); //do separation between stimuli and other elements

    if (Dsl.isZvuk(rowsplitted[0])) {} // already done in previous call, no action
    else if (Dsl.isText(rowsplitted[0])) translatedRow += this.translateText(row);
    else if (Dsl.isSloupce(rowsplitted[0])) translatedRow += this.translateSloupce();
    /*else if (Dsl.isParovaOtazka(rowsplitted[0])) { //priority over Dsl.isOtazka
        translatedRow += this.closeOtazka();
        translatedRow += this.translateParovaOtazka(row);
    } //else if (Dsl.isSkalovaci(rowsplitted[0])) translatedRow += translateSkalovaci(row); //priority over Dsl.isOtazka
    */
    else if (Dsl.isTaskForStimuli(rowsplitted[0])) {
      translatedRow += this.closeOtazka();
      if (this.sloupce) translatedRow += this.translateTaskForStimuli(row);
      else Console.log("Warning: unexpected token 'taskforstimuli' not in pair ");
    } else if (Dsl.isOtazka(rowsplitted[0])) {
      translatedRow += this.closeOtazka();
      //if (! this.firsttaskdefined) {this.firsttaskdefined = true; translatedRow += '<div style="clear:both"></div>';}
      if (this.sloupce) translatedRow += this.translateParovaOtazka(row);
      else translatedRow += this.translateOtazka(row);
    } else if (Dsl.isPanel(rowsplitted[0])) {
      translatedRow += this.closeOtazka();
    } else if (Dsl.isHodnoty(rowsplitted[0]) || Dsl.isCheckboxvalues(rowsplitted[0])) translatedRow += this.translateHodnoty(rowsplitted); //will match also valuesonrow and checkboxvaluesonrow
    // move decDsl.ision on type of hodnoty on function translateValues else if (Dsl.isHodnoty(rowsplitted[0])) translatedRow += translateHodnoty(rowsplitted,true);
    //else if (Dsl.isCheckboxvalues(rowsplitted[0])) translatedRow += translateHodnoty(rowsplitted, false);

    else if (Dsl.isSkalovaciHodnoty(rowsplitted[0])) translatedRow += this.translateScale(this.previousrow, rowsplitted);
    else if (Dsl.isSkala(rowsplitted[0])) translatedRow += this.translateVAScale(this.previousrow, rowsplitted);
    else if (Dsl.isPopis(rowsplitted[0])) translatedRow += this.translatePopis(row);
    else if (Dsl.isSerad2d(rowsplitted[0])) translatedRow += this.translateRanking(row.slice('ranking2d'.length), this.stimul.audioindex, this.currentPage, this.questionPage++);
    else if (Dsl.isSelect(rowsplitted[0])) translatedRow += this.translateSelect(rowsplitted);
    else if (Dsl.isStyleButton(rowsplitted[0])) translatedRow += this.translateStyle('button', row);
    else if (Dsl.isStyleForm(rowsplitted[0])) translatedRow += this.translateStyle('form', row);
    else if (Dsl.isStyle(rowsplitted[0])) translatedRow += this.translateStyle(this.previoustoken, row);
    else if (Dsl.isCSS(rowsplitted[0])) translatedRow += this.translateCSS(row);
    else if (Dsl.isType(rowsplitted[0])) this.translateType(row);
    //ADD taskimage and taskvideo
    else if (Dsl.isImagePoint(rowsplitted[0])) translatedRow += this.translateImage(rowsplitted); //dsl.isimage this.translateimage
    else if (Dsl.isImageMultipoint(rowsplitted[0])) translatedRow += this.translateImageMulti(rowsplitted); //dsl.isimage this.translateimage
    else if (Dsl.isVideoMultipoint(rowsplitted[0])) translatedRow += this.translateVideoMulti(rowsplitted); //dsl.isimage this.translateimage
    else if (Dsl.isVideoPoint(rowsplitted[0])) translatedRow += this.translateVideo(rowsplitted); //dsl.isimage this.translateimage
    else if (Dsl.isWaveform(rowsplitted[0])) translatedRow += this.translateWaveform(rowsplitted); //dsl.isimage this.translateimage
    else if (Dsl.isWaveformsegment(rowsplitted[0])) translatedRow += this.translateWaveformsegment(rowsplitted); //dsl.isimage this.translateimage
    else if (Dsl.isBase(rowsplitted[0])) this.translateBase(rowsplitted);
    else if (Dsl.isNewRow(rowsplitted[0])) translatedRow += this.translateNewRow(rowsplitted);
    else if (Dsl.isDesign(rowsplitted[0])) translatedRow += this.translateDesign(rowsplitted);
    this.previoustoken = rowsplitted[0];
    if (!Dsl.startsWithComment(rowsplitted[0])) this.previousrow = row;
    console.log('translatedRow:', translatedRow);
    return translatedRow;
  }

  translateNewRow(rowsplitted) { return '<div style="clear:both"></div>';}

  footerPageNumber() {
    return "<p align='center' class='footer'>" + this.currentPage + '/' + this.maxPages + '.</p>';
  }

  //shuffle randomly the array
  shuffle() {
    let i = this.length; let j; let temp;
    // eslint-disable-next-line eqeqeq
    if (i == 0) return this;
    while (--i) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this[i];
      this[i] = this[j];
      this[j] = temp;
    }
    return this;
  }


  /*
   *	this script will preprocess the test - make combination of screens etc. before it is interpretted
   * e.g. "parovytest", there are made pairs from the sounds within this test and generated screens,
   *      for 2 sound there is 1 pair, for 3 sounds there are 3 pair combination [1,2][1,3][2,3], ...
   */
  //    this.prep = new Preprocesor(this); //backward reference
  isZvuk;

  //reset all values
  initTest(currentRawTest) {
    /*this.tstate.poradivnticinahodne = false;
    this.tstate.poradizvukunahodne = false;
    this.tstate.poradicasenahodne = false;*/
    this.educational = false;
    this.highlighted = false;
    this.prep = new Preprocesor(this);

    this.currentTest = this.prep.preprocessTest(currentRawTest); //preprocess from currentRawTest to currentTest
    this.tstate = this.prep.tstate;
    //console.log(currentTest);
    this.maxPages = this.currentTest.match(/\n[\s]*screen/ig).length;
    this.testName = Interpreter.extract(this.currentTest.match(/test .*/i).toString(), 'test ');

    this.currentCursor = 0;
    this.currentPage = 0;
    window.psychotestScreenPage = this.currentPage;
    this.resumeid = 0;

    this.result.answers = [];//reset answers TODO check
    this.sliderValues = [];//reset slider values
    //this.translateBase()
  }

  resumeTest(currentRawTest, page, answers, resumeid) {
    this.educational = false; //TODO persist
    this.highlighted = false; //TODO persist
    this.sliderValues = [];//TODO persist?
    this.resumeid = resumeid;
    this.prep = new Preprocesor(this);

    this.currentTest = currentRawTest; //a;ready preprocessed
    this.tstate = this.prep.tstate;
    //console.log(currentTest);
    this.maxPages = this.currentTest.match(/\n[\s]*screen/ig).length;
    this.testName = Interpreter.extract(this.currentTest.match(/test .*/i).toString(), 'test ');

    this.currentCursor = 0;
    this.currentPage = 0;
    window.psychotestScreenPage = this.currentPage;
    //    this.currentPage = page; //persistent
    if (page > 0) {
      page--;
      while (this.currentPage < page) this.nextpage();
    } else {
      console.log('weird paused at page 0; or 1;');
    }

    this.result.answers = answers;//reset answers
  }

  findPreviousObrazovka(testDSL) {
    let splitted = testDSL.split('\n');
    this.currentCursor--;
    this.currentPage -= 2;
    while ((this.currentCursor > 0) && (!splitted[this.currentCursor].startsWith('screen'))) this.currentCursor--;
    if (this.currentCursor > 0) this.currentCursor--; //step over the curent item
    while ((this.currentCursor > 0) && (!splitted[this.currentCursor].startsWith('screen'))) this.currentCursor--;
  }

  /*nextpage(){
    return "<p>some demo test</p>";
  }*/

  //TODO add options - values in slider
  static makeSlider(sliderVal, sliderMin, sliderMax, sliderStep, sliderId, myQuestionPage) {
    //console.log("slider");
    window.ri.setDefaultAnswer(/*parser*/window.ii.currentPage, myQuestionPage);
    let myslider = $('#slider' + sliderId);
    myslider.labeledslider({
      value: sliderVal, min: sliderMin, max: sliderMax, step: sliderStep, slide: function(event, ui) {
        $('#slider' + sliderId + 'Value').val(/*parser*/window.ii.sliderValues[sliderId][ui.value]);
        //ui.handle.style.backgroundColor = "lightblue";//css("background-color","lightblue"); jquery ui
        //this is relative to jquery myslider
        if (this) this.style.background = 'lightblue';
        window.ri.setAnswer(/*parser*/window.ii.currentPage, myQuestionPage, /*parser*/window.ii.sliderValues[sliderId][ui.value]);
      },
      start: function(event, ui) {
        $('#slider' + sliderId + 'Value').val(/*parser*/window.ii.sliderValues[/*parser*/window.ii.sliderId][ui.value]);
        //ui.handle.style.backgroundColor = "lightblue";
        //this is relative to jquery myslider
        if (this) this.style.background = 'lightblue';
        window.ri.setAnswer(/*parser*/window.ii.currentPage, myQuestionPage, /*parser*/window.ii.sliderValues[/*parser*/window.ii.sliderId][ui.value]);
      },
      tickLabels: /*parser*/window.ii.sliderValues[sliderId]
    });
    let width = myslider.width() / (/*parser*/window.ii.sliderValues[/*parser*/window.ii.sliderId].length - 1);
  }

  static makeVASlider(sliderId, sliderMin, sliderMax, myQuestionPage, sliderStep = 1) {
    //console.log("VAslider");
    //TODO set default answer for static content
    window.ri.setDefaultAnswer(/*parser*/window.ii.currentPage, myQuestionPage);
    // Convert the object into an array of key-value pairs
    const sortedEntries = Object.entries(window.ii.sliderValues[sliderId]).sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));

    // Convert the sorted array back to an object (optional)
    const sortedObj = Object.fromEntries(sortedEntries);
    // Create a Map from the sorted entries
    const sortedMap = new Map(sortedEntries);

    // Retrieve the sorted keys
    const sortedKeys = Array.from(sortedMap.keys());

    //let sliderKeysstr = sortedKeys;
    //console.log('makeVASlider keysstr', sliderKeysstr);
    let sliderKeys = sortedKeys.map(Number); //fix bug #269 new version of labeledslider requires numbers
    //console.log('makeVASlider keys', sliderKeys);
    //console.log('makeVASlider values', window.ii.sliderValues[sliderId]);
    $('#slider' + sliderId).labeledslider({
      value: sliderMin, min: sliderMin, max: sliderMax, step: sliderStep, slide: function(event, ui) {
        $('#slider' + sliderId + 'Value').val(ui.value);
        //this is relative to jquery myslider
        if (this) this.style.background = 'lightblue';
        window.ri.setAnswer(/*parser*/window.ii.currentPage, myQuestionPage, ui.value);
      },
      start: function(event, ui) {
        $('#slider' + sliderId + 'Value').val(ui.value);
        //this is relative to jquery myslider
        if (this) this.style.background = 'lightblue';
        //$("#slider" + sliderId).css("background","lightblue");
        window.ri.setAnswer(/*parser*/window.ii.currentPage, myQuestionPage, ui.value);
      },
      //tickInterval:sliderStep,
      tickArray: sliderKeys,
      tickLabels: /*parser*/sortedObj
    });
  }

  starttest() {
    $('#tab2help').hide();//.fadeOut(500); TODO html specific
    let currentRawTest = this.selectedTestDefinition;
    if (typeof this.editor !== 'undefined') currentRawTest = this.editor.getValue();
    //    parser = new Interpreter();
    this.initTest(currentRawTest);
    this.hideNonAnswered();
    this.controller.previewinnerHTML = this.nextpage();///*parser*/this.currentTest);
    //console.log(this.controller.preview.innerHTML);
    this.evaluateScripts();
  }

  resumetest() {
    $('#tab2help').hide();//.fadeOut(500); TODO html specific
    //var currentRawTest = selectedTestDefinition;
    //if (typeof editor !== "undefined") currentRawTest = editor.getValue();
    //parser = new Interpreter();
    this.resumeTest(this.selectedTestDefinition, this.selectedTestScreennumber, this.selectedTestAnswers, this.selectedTestId);
    this.hideNonAnswered();
    this.controller.previewinnerHTML = this.nextpage();///*parser*/this.currentTest);
    //console.log(this.controller.preview.innerHTML);
    this.evaluateScripts();
  }


  nextpage() {
    let testDSL = this.currentTest;
    //this.firsttaskdefined=false;
    this.currentPage++;
    window.psychotestScreenPage = this.currentPage;
    this.questionPage = 0;
    this.stimul.audioid = 0; //reset audioid
    this.stimul.resetStimuli();
    //console.log('next page', this.currentPage);
    if (this.currentPage >= this.maxPages) {
      if (this.currentPage === 1) {if (this.controller) this.controller.lastNoPrevPage();}
      else {if (this.controller) this.controller.lastPage();}
    } else if (this.currentPage === 1) {if (this.controller) this.controller.firstPage();}
    else {if (this.controller) this.controller.middlePage();}
    let translatedheader = '';

    let splitted = testDSL.split('\n');
    //go from cursor to the first "screen" which will be start of interpretation
    while ((/*parser*/this.currentCursor < splitted.length) && (!Dsl.isObrazovka(splitted[/*parser*/this.currentCursor]))) /*parser*/{
      //interpret base
      if (Dsl.isBase(splitted[this.currentCursor])) this.translateBase(splitted[this.currentCursor].trim().split(' '));
      if (Dsl.isTemplate(splitted[this.currentCursor])) this.translateTemplate(splitted[this.currentCursor].trim().split(' '));
      //interpret random
      //else if (Dsl.isPoradiVNtici(splitted[this.currentCursor])) this.translate();
      this.currentCursor++;
    }
    this.nt = [];
    //translate obrazovka row
    if (/*parser*/this.currentCursor < splitted.length) {
      translatedheader += /*parser*/this.translateObrazovka(splitted[/*parser*/this.currentCursor]);
      this.nt.push(this.newTrans(splitted[this.currentCursor]));
      /*parser*/this.currentCursor++;
    }

    //interpret everything until next 'obrazovka or end'
    while ((/*parser*/this.currentCursor < splitted.length) && (!Dsl.isObrazovka(splitted[/*parser*/this.currentCursor]))) {
      translatedheader += /*parser*/this.translateTestItems(splitted[/*parser*/this.currentCursor]);
      this.nt.push(this.newTrans(splitted[this.currentCursor]));
      /*parser*/this.currentCursor++;
    }
    //console.log("translated 0:" + translatedheader);
    translatedheader += /*parser*/this.closeOtazka(); //close open questions without values
    translatedheader += /*parser*/this.closeSloupce();

    translatedheader += /*parser*/this.stimul.closeQuestionDiv();
    translatedheader += /*parser*/this.footerPageNumber();
    //    console.log('translated header:', translatedheader);
    return translatedheader;
  }

  traversetest(definition, callback, errorcallback) {
    /*parser*/this.initTest(definition);
    while (/*parser*/this.currentPage < /*parser*/this.maxPages) this.nextpage();
    //evaluateScripts(); //there are no scripts, only innerhtml
    this.postAnswers(callback, errorcallback);
  }

  //TODO check if needed - remove
  cleartest() {
    this.controller.previewinnerHTML = '';
    //this.showButtonsStart();
    this.controller.startPage();
  }

  //TODO check if needed - remove
  previoustestitem() {
    /*parser*/this.findPreviousObrazovka(/*parser*/this.currentTest);
    this.controller.previewinnerHTML = this.nextpage();
    this.evaluateScripts();
  }

  //TODO violation of separation, mixed parser-interpreter and content
  checkAnswersInScreen() {
    let foundNA = false;
    let item;
    if (this.result.answers[this.currentPage - 1]) { //array of answers in currentpage is there
      for (let i = 0; i < this.result.answers[this.currentPage - 1].length; i++) { //loop over this array
        //particular answer exist
        if (this.result.answers[this.currentPage - 1][i] && this.result.answers[this.currentPage - 1][i].answer) {
          //check default 'N/A' value - indicated that user did not set other value
          if (this.result.answers[this.currentPage - 1][i].answer === 'N/A') {
          //highlight - /*parser*/this.result
            console.log('checkAnswersinscreen found N/A: ' + 'q' + /*parser*/this.currentPage + '.' + (i + 1));
            item = document.getElementById('q' + /*parser*/this.currentPage + '.' + (i + 1)).getElementsByTagName('fieldset');//document.getElementById('q' + /*parser*/this.currentPage + '.' + (i + 1));
            if (!item.length) item = document.getElementById('q' + /*parser*/this.currentPage + '\\.' + (i + 1));
            //if (item.length)
            item[0].style.backgroundColor = '#ffdddd';
            foundNA = true;
          } else {
            console.log('checkAnswersinscreen: ' + 'q' + /*parser*/this.currentPage + '.' + (i + 1));
            item = document.getElementById('q' + /*parser*/this.currentPage + '.' + (i + 1)).getElementsByTagName('fieldset');//document.getElementById('q' + /*parser*/this.currentPage + '.' + (i + 1));
            if (!item.length) item = document.getElementById('q' + /*parser*/this.currentPage + '\\.' + (i + 1));
            if (item.length) item[0].style.backgroundColor = '#ffffff';
          //if (item) item.style.backgroundColor = "#ffffff";
          }
        }
      }
    }
    return foundNA;
  }


  /* returns true if all questions are answered, false if at least one answer is not*/
  checkAnswers() {
    //for each answers[pagenum-1] answer!= N/A
    //var foundNA = false;
    let dontcheckanswers = document.getElementById('dontcheckanswers');
    if (dontcheckanswers && dontcheckanswers.prop('checked')) return true; //don't check in editor mode
    if (window.psychotestDoNotCheckAnswers) return true;
    let foundNA = this.checkAnswersInScreen();
    return !foundNA;
  }

  highlightNonAnswered() {
    let item = document.getElementById('#notification');
    if (item) {
      item.css('background-color', '#fdd');
      item.html(' Pro pokračování, prosím, vyplňte vyznačené otázky!');
    }
  }

  hideNonAnswered() {
    document.getElementById('notification').innerHTML = '';
  }

  nexttestitem() {
    if (this.checkAnswers()) { //check whether all mandatory questions are answered - set to non-default value
      if (this.highlightEducation()) {
        this.controller.previewinnerHTML = this.nextpage();
        /*parser*/this.highlighted = false;
        this.evaluateScripts();
        this.hideNonAnswered();
      } else {
        //not highlighted
      }
    } else {
      this.highlightNonAnswered();
    }
  }

  highlightEducation() {
    //not educational - can continue
    if (!this.educational) return true;
    //educational already shown return true
    if (this.highlighted) return true;
    //educational not shown - set this.highlighted
    this.highlighted = true;
    //1.match educational result with current case and task
    //let i=0;
    let matchresult = null;
    //array of cases in screen
    let currentcasesa = Array.from(document.getElementsByTagName('stimulusaudio')).map(x=> x.getAttribute('src'));
    let currentcasesv = Array.from(document.getElementsByTagName('stimulusvideo')).map(x=> x.getAttribute('src'));
    let currentcasesi = Array.from(document.getElementsByTagName('stimulusimage')).map(x=> x.getAttribute('src'));
    let screencases = (currentcasesa.concat(currentcasesv)).concat(currentcasesi);
    //TODO consider to sort screencases if there are shown in different order
    //now have it, match cases with results
    let screentasks = Array.from(document.getElementsByTagName('fieldset')).map(x=>  x.children[0].textContent.trim());
    //filter only results, where case match
    let screencasesString = screencases.join('|');
    //TODO consider to sort names in x.case, if they are shown in different order
    let caseresults = this.eduresults.filter(x => x.case === screencasesString);
    //now within the caseresult loop and show task
    for (let caseresult of caseresults) {
      for (let screentask of screentasks) {
        if (screentask === caseresult.task) {
          //found case and task match, highlight this task and show ideal result
          this.highlightValue(screentask, caseresult.answer);
          matchresult = true;
        }
      }
    }
    //no result found to visualise - go further
    if (!matchresult) return true;
    //2.visualise educational results
    return false;
  }

  /***
   * Highlights DOM element under 'task' with value
   * @param task text in `legend`
   * @param value to be highlighted
   */
  highlightValue(task, value, min, max) {
    let domtask = Array.from(document.getElementsByTagName('fieldset')).find(x => x.children[0].textContent.trim() === task);
    console.log('highlightvalue dom', domtask);
    //warn if not found
    if (!domtask) {console.warn('highlightValue() edu task not found', task); return;}
    //based on the type inside fieldset, set highlighted value
    let elementh = Array.from(domtask.getElementsByTagName('input')).find(x => (x.getAttribute('value') === value));
    if (elementh) {
      this.highlightInput(elementh);
      return;
    }
    //highlight ranking 2d 
    /*let svgranking = domtask.querySelector('svg');
    if (svgranking) {
      this.highlightSvg(svgranking,value);
      return;
    }*/
    let ranking2del = domtask.querySelector('ranking2d');
    if (ranking2del) {
      this.highlightRanking(ranking2del,value);
      return;
    }
    //highlight taskimage
    let taskimage = domtask.querySelector('taskimage');
    if (taskimage) {
       this.highlightImage(value);
       return;
    }
    let taskvideo = domtask.querySelector('taskimage');
    if (taskvideo) {
      this.higlightVideo(value);
      return;
    }
    //highlight slider
    let uisliderdom = domtask.querySelector('.ui-slider');
    if (uisliderdom) {
      this.highlightSlider(uisliderdom, value);
      //no return - will show also the value
    } 

    //elementh input is not there, show tooltip in fieldset
    domtask.style = 'position:relative';
    let tooltip = document.createElement('div');
    tooltip.classList.add('eduresult');
    tooltip.append(value);
    domtask.append(tooltip);
  }

  highlightSvg(dom,value) {
    let audios = value.split('|');
    let audiostr = []
    for (let a of audios) {
      let aitem = a.split(/[\[\],]/g); //separator is reg expression [],
      audiostr.push({index:aitem[1],x:aitem[2],y:this.ranking2d.ymax - aitem[3]}); //FIX y: maxy - aitem[3]
    }
    const svgels = '<g xmlns="http://www.w3.org/2000/svg">'+this.ranking2d.generateSoundBall(audiostr.length,0,0,audiostr)+'</g>';
    //console.log('highlightsvg:',svgels);
    let eduballs = new DOMParser().parseFromString(svgels,"image/svg+xml");
    dom.appendChild(eduballs.documentElement);
    
  }
  highlightRanking(dom,value) {
    //const element = document.querySelector('ranking2d'); // Selects the custom component
    dom.setAttribute('edu', value); // Adds the 'edu' attribute with the specified content
    //manually trigger action on custom element
    // Manually trigger the change handler
    if (dom.au && dom.au.controller && dom.au.controller.viewModel) {
      const viewModel = dom.au.controller.viewModel;
      viewModel.eduChanged(value, null); // Replace 'null' with the old value if available
    }
  }    
  

  highlightSlider(uisliderdom, value) {
    //show in uislider
    let uisliderid = uisliderdom.getAttribute('id');
    let uislider = $('#' + uisliderid);
    console.log('slider to hightlight:', uislider);
    //var idhitem = hitem.prop("id");
    let currentvalue = uislider.labeledslider('value'); //keep current value
    let sliderid = uislider.prop('id');
    let slidernum = parseFloat(Interpreter.extract(sliderid, 'slider'), 10);
    let eduanswerint = parseFloat(value, 10);
    let eduanswerindex = /*parser*/this.sliderValues[slidernum].indexOf(eduanswerint);
    //moves slider handle to educational value
    if (eduanswerindex > -1) //move to edu value from sequence
    {
      //console.log("slidervalue:" + sliderValues[slidernum][eduanswerindex]);
      uislider.labeledslider('value', /*parser*/this.sliderValues[slidernum][eduanswerindex]);
    } else //move to edu value
    {
      //console.log("normal value:" + eduanswerint);
      uislider.labeledslider('value', eduanswerint); //move to edu value
    }
    //var handle = item.find(".ui-slider-handle");
    let oldhandle = uislider.find('.ui-slider-handle');
    let newhandle = uislider.find('.ui-slider-handle').clone(); //.appendTo(hitem); //clone the handle
    //slider already has some style - position, whihc must be preserved
    uislider.labeledslider('value', currentvalue); //return to current value - the clone will remain on the edu value
    let oldstyle = oldhandle.attr('style') + 'border:solid 2px blue;';
    let newstyle = newhandle.attr('style') + 'background:lightgreen;';
    newhandle.attr('style', newstyle);
    oldhandle.attr('style', oldstyle);
    uislider.labeledslider('disable');
    newhandle.appendTo(uislider);
    //hitem.find(".ui-slider-handle").last().attr("style", "background:green");
  }

  highlightInput(elementh) {
    console.log('element to hightlight:', elementh);
    elementh.nextSibling.style = 'background-color: lightgreen';
  }

  highlightImage(value) {
//find image <stimulusimage
    const siel = document.getElementsByTagName('stimulusimage');
    let eduattr = siel.getAttribute('edu');
    if (!eduattr) eduattr = "[]";
    //1.deserialize 
    let edustruct = JSON.parse(eduattr);
    //2.add new value
    const eduvalue = JSON.parse(value);
    //3.serialize
    for (let p of eduvalue) {
      edustruct.push({x:p.iconx,y:p.icony});      
    }
    
    siel.setAttribute('edu',value);
//show the edu value
  }

  highlightVideo(value){

  }

// TODO convert $ to aurelia based html processing
  highlightEducationOld() {
    //workaround - remove after reimplementation
    return true;
    //TODO reimplement
    let atleastoneeduanswer = false;
    if (/*parser*/this.educational) {
      if (! /*parser*/this.result.answers[/*parser*/this.currentPage - 1]) return true;
      if (/*parser*/this.highlighted) {
        document.getElementById('notification').innerHTML = '';
        return true;
      }
      /*parser*/this.highlighted = true;
      if (/*parser*/this.result.answers[/*parser*/this.currentPage - 1]) {
        for (let i = 0; i < /*parser*/this.result.answers[/*parser*/this.currentPage - 1].length; i++) {
          if (/*parser*/this.result.answers[/*parser*/this.currentPage - 1][i] && ('answer' in /*parser*/this.result.answers[/*parser*/this.currentPage - 1][i])) {//fix bug 268
            var item = document.getElementById('q' + /*parser*/this.currentPage + '\\.' + (i + 1)); //document.getElementById('q' + currentPage + '.' + (i + 1));
            //disable editing the subelement within this form
            item.find('input').prop('disabled', true);
            item.find('option').prop('disabled', true);
            item.find('.ui-slider').labeledslider('disable');

            //console.log("#q" + currentPage + "\\." + (i + 1));
            //if (item) item.style.backgroundColor = "#eeffee";
            let aquestion = /*parser*/this.result.answers[/*parser*/this.currentPage - 1][i].question.trim();
            let acase = /*parser*/this.result.answers[/*parser*/this.currentPage - 1][i].case;
            let answer = /*parser*/this.result.answers[/*parser*/this.currentPage - 1][i].answer;
            //var myeduanswer;
            if (/*parser*/this.eduresults[acase]) {
              let myeduanswer = /*parser*/this.eduresults[acase].answer[aquestion];
              console.log('eduanswer');
              console.log(/*parser*/this.eduresults[acase]);
              console.log("'" + aquestion + "'");
              console.log(Object.keys(/*parser*/this.eduresults[acase].answer));
              console.log(myeduanswer);
              if (myeduanswer) {
                atleastoneeduanswer = true;
                //creating tooltip div
                $("<div class='tooltipContent'>" + /*parser*/this.eduresults[acase].note[aquestion] + '</div>').appendTo(item);
                //adding tooltip class to the form
                item.addClass('tooltip');
                //process all eduanswers;
                let eduanswermulti = myeduanswer.split(';'); //show multiple values delimited by ;
                eduanswermulti.forEach(function(eduanswer) {
                  let hitem = item.find("[value|='" + eduanswer + "']"); //selects <input>
                  if (hitem.length > 0) {
                    let nexthitem = hitem.next(); //selects related <label>
                    //console.log("item:" + item.prop('nodeName') + " hitem:" + hitem.prop('nodeName') + " nexthitem:" + nexthitem.prop('nodeName'));

                    if (nexthitem.is('label')) {nexthitem.attr('style', 'background-color: lightgreen');} else if (hitem.is('option')) {hitem.attr('style', 'background-color: lightgreen;border:solid 2px green');}
                  } else { // show in slider handle
                    hitem = item.find('.ui-slider');
                    if (hitem.length > 0) {
                      //var idhitem = hitem.prop("id");
                      let currentvalue = hitem.labeledslider('value'); //keep current value
                      let sliderid = hitem.prop('id');
                      let slidernum = parseInt(Interpreter.extract(sliderid, 'slider'), 10);
                      let eduanswerint = parseInt(eduanswer, 10);
                      let eduanswerindex = /*parser*/this.sliderValues[slidernum].indexOf(eduanswerint);
                      //moves slider handle to educational value
                      if (eduanswerindex > -1) //move to edu value from sequence
                      {
                        //console.log("slidervalue:" + sliderValues[slidernum][eduanswerindex]);
                        hitem.labeledslider('value', /*parser*/this.sliderValues[slidernum][eduanswerindex]);
                      } else //move to edu value
                      {
                        //console.log("normal value:" + eduanswerint);
                        hitem.labeledslider('value', eduanswerint); //move to edu value
                      }
                      //var handle = item.find(".ui-slider-handle");
                      let oldhandle = hitem.find('.ui-slider-handle');
                      let newhandle = hitem.find('.ui-slider-handle').clone(); //.appendTo(hitem); //clone the handle
                      //slider already has some style - position, whihc must be preserved
                      hitem.labeledslider('value', currentvalue); //return to current value - the clone will remain on the edu value
                      let oldstyle = oldhandle.attr('style') + 'border:solid 2px blue;';
                      let newstyle = newhandle.attr('style') + 'background:lightgreen;';
                      newhandle.attr('style', newstyle);
                      oldhandle.attr('style', oldstyle);
                      hitem.labeledslider('disable');
                      newhandle.appendTo(hitem);
                      //hitem.find(".ui-slider-handle").last().attr("style", "background:green");
                    } else {
                      //select

                    }
                  }
                });
              }
            }
          }
        }
        //allanswers highlighted, enable tooltip
        $('.tooltip').hover(function() {
          let tooltip = $('> div', this).show();
          let pos = tooltip.offset();
          tooltip.hide();
          let right = pos.left + tooltip.width();
          let pageWidth = $(document).width();
          if (pos.left < 0) {
            tooltip.css('marginLeft', '+=' + (-pos.left) + 'px');
          } else if (right > pageWidth) {
            tooltip.css('marginLeft', '-=' + (right - pageWidth));
          }
          tooltip.fadeIn();
        }, function() {
          $('> div', this).fadeOut(function() { $(this).css('marginLeft', ''); });
        });
      }
      if (atleastoneeduanswer) {
        let item2 = $('#notification');
        item2.css('background-color', 'lightgreen');
        item2.html('Vyznačeny jsou průměrné, nejvíce vybírané hodnoty na uvedené otázky.');
      } else /*parser*/this.highlighted = false;
      return (!atleastoneeduanswer);
    }
    return true;
  }


  //TODO add PsychoTestPauseUrl, construct pausedtestresult, implement resumetest(), add a select box with tests to resume into HTML, after selection load raw test, load results and go into the last screen,
  pausetest() {
    if (!confirm('Do you want to postpone the test execution? Postponed test can be resumed later from the current screen.')) return;
    //store results, raw test and screen number into server
    let pausedtestResult = {};
    pausedtestResult.testname = /*parser*/this.testName;//{ get; set; }
    pausedtestResult.screennumber = /*parser*/this.currentPage;//{ get; set; }
    pausedtestResult.rawtestdefinition = /*parser*/this.currentTest;//{ get; set; }

    //pausedtestResult.loginname = prompt("Enter your unique ID, e.g. email address");
    pausedtestResult.temporalresults = JSON.stringify(/*parser*/this.result.answers);
    let METHOD = 'PUT';
    if (/*parser*/this.resumeid > 0) {pausedtestResult.id = /*parser*/this.resumeid; METHOD = 'POST';}
    $.ajax({
      type: METHOD,
      url: PsychoTestPauseUrl,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(pausedtestResult),
      processData: false,
      success: this.pausetestcallback,
      error: this.postAnswerErrorCallback
    });
    //console.log("TODO, not yet implemented pausetest()");
  }

  pausetestcallback(data) {
    console.log('saved paused test. Response:');
    //console.log(data)
    pausedtestid = data.id;
    this.focusPaused(); //calling back to focus the paused Tab
  }

  evaluateScripts() {
    //evaluate graphs and sliders
    let codes = this.controller.preview.getElementsByTagName('script');
    //document.getElementById('preview').getElementsByTagName('script');
    //console.log('Interpreter evaluatescripts() codes:', codes);
    //console.log(codes);
    for (let i = 0; i < codes.length; i++) {
      eval(codes[i].text);
    }
  }

  newTrans(row) {
    let tr = {'raw': row};
    if (Dsl.isZvuk(row)) {
      let soundtype = Dsl.stimuliType(row);
      if (soundtype ) {
        if (soundtype[1] === 'waveform') {
          tr = {'isstimulus': true, 'iswaveform': true, 'src': 'stimuli/3.wav', 'id': 'audio2', 'type': 'audio/wav', 'raw': row};
        }
      }
    }
    //    console.log('new translation row,tr:', row, tr);
    return tr;
  }

  translateImage(rowsplitted) {
    //update behavior - image only shows button user to indicate that answer is in image stimulus - points
    this.result.setDefaultAnswer(this.currentPage, this.questionPage, '', rowsplitted.join(' '));
    return '<taskimage cp="' + this.currentPage + '" qp="' + this.questionPage + '" type="point"></taskimage>';
    /*    let baseurl = this.base.endsWith('/') ? this.base : this.base + '/';
    this.result.setDefaultAnswer(this.currentPage, this.questionPage, '', rowsplitted.join(' '));
    return '<taskimage src="' + baseurl + rowsplitted[1] + '" height="' + rowsplitted[2] + '" width="' + rowsplitted[3] + '" cp="' + this.currentPage + '" qp="' + this.questionPage + '"></taskimage>';*/
  }

  translateImageMulti(rowsplitted) {
    //update behavior - image only shows button user to indicate that answer is in image stimulus - points
    this.result.setDefaultAnswer(this.currentPage, this.questionPage, '', rowsplitted.join(' '));
    return '<taskimage cp="' + this.currentPage + '" qp="' + this.questionPage + '" type="multipoint"></taskimage>';
    /*    let baseurl = this.base.endsWith('/') ? this.base : this.base + '/';
    this.result.setDefaultAnswer(this.currentPage, this.questionPage, '', rowsplitted.join(' '));
    return '<taskimage src="' + baseurl + rowsplitted[1] + '" height="' + rowsplitted[2] + '" width="' + rowsplitted[3] + '" cp="' + this.currentPage + '" qp="' + this.questionPage + '"></taskimage>';*/
  }
  translateVideo(rowsplitted) {
    this.result.setDefaultAnswer(this.currentPage, this.questionPage, '', rowsplitted.join(' '));
    return '<taskvideo cp="' + this.currentPage + '" qp="' + this.questionPage + '"></taskvideo>';
  }
  translateVideoMulti(rowsplitted) {
    this.result.setDefaultAnswer(this.currentPage, this.questionPage, '', rowsplitted.join(' '));
    return '<taskvideo cp="' + this.currentPage + '" qp="' + this.questionPage + '" type="multipoint"></taskvideo>';
  }
  translateWaveform(rowsplitted) {
    //update behavior - video only shows button user to indicate that answer is in image stimulus - points
    this.result.setDefaultAnswer(this.currentPage, this.questionPage, '', rowsplitted.join(' '));
    return '<taskwaveform cp="' + this.currentPage + '" qp="' + this.questionPage + '"></taskwaveform>';
  }
  translateWaveformsegment(rowsplitted) {
    //update behavior - video only shows button user to indicate that answer is in image stimulus - points
    this.result.setDefaultAnswer(this.currentPage, this.questionPage, '', rowsplitted.join(' '));
    return '<taskwaveform cp="' + this.currentPage + '" qp="' + this.questionPage + '" segment="true"></taskwaveform>';
  }

  translateBase(rowsplitted) {
    this.setBase(rowsplitted[1]);
    //this.stimul.setSounddir(this.base);
  }

  translateTemplate(rowsplitted) {
    this.templateStyle = rowsplitted[1];
    console.debug('templateStyle ',rowsplitted,this.templateStyle);
  }

  translateDesign(rowsplitted) {
    let encodeddesign = rowsplitted[1];
    let design = this.controller.api.decodeGjs(encodeddesign);
    return design;
  }

  setBase(baseurl, proxybaseurl) {
    this.base = baseurl;
    this.proxybase = proxybaseurl;
    this.stimul.setSounddir(this.base, this.proxybase);
  }
  translateRanking(row, audioindex,currentPage,questionPage){
    //<ranking2d random="true" audios="" xlabel="x axis" ylabel="y axis">RANKING2D</ranking2d>
    let labels = row.split(';')
    let xaxis = labels[0].trim();
    let yaxis = labels[1].trim();
    let id = 'id'+currentPage+questionPage;
    let widthattr;
    if (labels.length>2) 
      widthattr = ' width="'+parseFloat(labels[2],10)+'"';
    else 
      widthattr='';
    return '<ranking2d id="'+id+'" xlabel="'+xaxis+'" ylabel="'+yaxis+'" '+widthattr+'></ranking2d>'
   // row.slice('ranking2d'.length), this.stimul.audioindex, this.currentPage, this.questionPage++);
  }
}
