
import {Dsl} from './dsl';
import {Interpreter} from './interpreter';
//splice array into array
Array.prototype.spliceArray = function(index, n, array) {
  return Array.prototype.splice.apply(this, [index, n].concat(array));
};

let TestState = { UND: 0, OBR: 1, PAR: 2, KAT: 3,  END: 4, START: 5, EXT: 6, STIMGR: 7, REPSTIM: 8, REPGRP: 9 };

export class Preprocesor {
  /**
   * Created by tomaton on 10/22/2015.
   */
  constructor(parent) {
    this.currentCursor = 0;
    this.state = TestState.UND;// getState(this.splitted, currentCursor++);
    this.tstate = {};
    this.myTest = '';
    this.expandedTest = [];
    this.expandedGroup = [];
    this.replaceableStimuli = [];
    this.tempTest = '';
    this.parent = parent; //expects parser
  }
  //console.log(this.splitted);
  getState() {
    //console.log("getState() "+currentCursor);
    //console.log(this.splitted[currentCursor]);
    if (this.currentCursor >= this.splitted.length) return TestState.END;
    if (Dsl.isParovy(this.splitted[this.currentCursor])) return TestState.PAR;
    if (Dsl.isKategorie(this.splitted[this.currentCursor])) return TestState.KAT;
    if (Dsl.isObrazovka(this.splitted[this.currentCursor])) return TestState.OBR;
    if (Dsl.isExtends(this.splitted[this.currentCursor])) return TestState.EXT;
    if (Dsl.isStimuliGroup(this.splitted[this.currentCursor])) return TestState.STIMGR;
    //        if (Dsl.isReplaceStimuli(this.splitted[this.currentCursor])) return TestState.REPSTIM;
    //        if (Dsl.isReplaceGroup(this.splitted[this.currentCursor])) return TestState.REPGRP;
    if (Dsl.isRandomPairs(this.splitted[this.currentCursor])) { this.tstate.randompairs = true; return TestState.UND;}
    if (Dsl.isPoradiVNtici(this.splitted[this.currentCursor])) { this.tstate.poradivnticinahodne = true; return TestState.UND;}
    if (Dsl.isPoradiZvuku(this.splitted[this.currentCursor])) { this.tstate.poradizvukunahodne = true; return TestState.UND;}
    if (Dsl.isPoradiCase(this.splitted[this.currentCursor])) { this.tstate.poradicasenahodne = true; return TestState.UND;}
    if (Dsl.isType(this.splitted[this.currentCursor])) this.parent.translateType(this.splitted[this.currentCursor]); // feature #208, type in the beginning of test definition
    return TestState.UND;
  }

  copyTest() {
    this.currentCursor++;
    this.myTest += this.splitted[this.currentCursor - 1] + '\n'; //copy of row with obrazovka or test ...
    while (this.getState() === TestState.UND) this.myTest += this.splitted[this.currentCursor++] + '\n'; //copy of rows
  }

  //all after the cursor will be shuffled per screens
  shuffleTest() {
    //readalltestToArray
    let tempcursor = this.currentCursor++;
    let testArray = [];
    while (this.getState() !== TestState.END) {
      this.tempTest = this.splitted[this.currentCursor - 1] + '\n';
      while (this.getState() === TestState.UND) this.tempTest += this.splitted[this.currentCursor++] + '\n'; //copy of rows
      testArray.push(this.tempTest); //each item is a screen
      this.currentCursor++;
    }
    //shuffle screens
    testArray.shuffle();

    //expandArrayToText
    this.currentCursor = tempcursor;
    let testCase = [];
    for (let i = 0; i < testArray.length; i++) {
      testCase = testArray[i].split('\n');
      for (let j = 0; j < testCase.length; j++) this.splitted[this.currentCursor++] = testCase[j];
    }
    //console.log("test after shuffle", this.splitted);    //this.splitted[this.currentCursor]
    this.currentCursor = tempcursor;
  }

  collectSounds() {
    let zvuks = [];
    while (Dsl.startsWithZvuk(this.splitted[this.currentCursor])) {
      zvuks.push(this.splitted[this.currentCursor++]);
    }
    if (this.tstate.poradizvukunahodne) {
      zvuks.shuffle();
      //console.log("zvuks after random shuffling:", zvuks);
    }
    return zvuks;
  }

  foreachSoundGenerateObrazovka(zvuks, title) {
    let obrazovkacontent = [];
    while (this.getState() === TestState.UND) {
      obrazovkacontent.push(this.splitted[this.currentCursor++]);
    }
    for (let i = 0; i < zvuks.length; i++) {
      this.myTest += 'screen ' + Interpreter.extract(title,'screen per 1') + '\n' + zvuks[i] + '\n';
      for (let j = 0; j < obrazovkacontent.length; j++) {
        this.myTest += obrazovkacontent[j] + '\n';
      }
    }
  }

  expandKategorie() {
    let title = this.splitted[this.currentCursor++]; //skip over the row defining the kategory test
    while (Dsl.startsWithComment(this.splitted[this.currentCursor])) {//skip over comments - there might be some styling
      title += '\n' + this.splitted[this.currentCursor++];
    }
    let zvuks = this.collectSounds();
    this.foreachSoundGenerateObrazovka(zvuks, title);
  }

  makePairs(zvuks) {
    let combinations = [];
    //recursive generation of all possib/le pairs
    var getpairs = function(active, rest) {
      //console.log("iteration");
      //console.log(active);
      //console.log(rest)
      if (rest.length === 0) {
        if (active.length === 2) {
          combinations.push(active);
          //console.log("found:");
          //console.log(active);
        }
      } else {
        let active1 = active.slice();
        active.push(rest[0]);
        getpairs(active, rest.slice(1));
        getpairs(active1, rest.slice(1));
      }
    };
    getpairs([], zvuks);
    return combinations;
  }

  foreachPairofSoundsGenerateObrazovka(pairs, title) {
    let obrazovkacontent = [];
    while (this.getState() === TestState.UND) {
      obrazovkacontent.push(this.splitted[this.currentCursor++]);
    }
    for (let i = 0; i < pairs.length; i++) {
      this.myTest += 'screen ' + Interpreter.extract(title,'screen per 2') + '\n' + 'column\n' + pairs[i][0] + '\n' + pairs[i][1] + '\n';
      for (let j = 0; j < obrazovkacontent.length; j++) {
        this.myTest += obrazovkacontent[j] + '\n';
      }
      /*myTest += "sloupec\n" + pairs[i][1] + "\n";
       for (var j = 0; j < obrazovkacontent.length; j++) {
       myTest += obrazovkacontent[j] + "\n";
       }*/
    }
    //fix bug ranodm in tuple
  }

  expandParovy() {
    let title = this.splitted[this.currentCursor++]; //skip row defining par test
    let zvuks = this.collectSounds();
    let pairs = this.makePairs(zvuks);
    if (this.tstate.poradicasenahodne || this.tstate.randompairs) pairs.shuffle();
    if (pairs.length === 0) console.log('Expected more rows with stimulus to generate pairs, but no pairs generated.');
    this.foreachPairofSoundsGenerateObrazovka(pairs, title);
  }


  //expands inherited test - read definition into separated array.
  expandInheritance() {
    let parentrow = this.splitted[this.currentCursor].split(/[ ;,]+/); //each inherited test is separated
    //for (var i=indexofnames;i<parentrow.lengt h;i++){ //
    //extends [0] test [1] withstimuli [2] a,b,c,d [3,4,5,6]
    let parent = parentrow[1];
    //gets from url test definition
    let myurl = PsychoTest2Url + parent;
    $.ajax({
      dataType: 'json',
      url: myurl,
      data: null,
      success: function(testdto) {
        if (parser.prep.expandedTest[parent]) console.log('expandInheritance, Warning: test definition already exists for ' + parent);
        parser.prep.expandedTest[parent] = testdto[0].definition;
      },
      error: function(jq, status, error) {
        console.log('expandInheritance, Error: When loading data for the test definition ' + myurl + ' ' + error);
      },
      async: false
    });
    if (parentrow.length > 3) { //extends with replacement of stimuli
      if (Dsl.isWithStimuli(parentrow[2])) {
        let stimuli = parentrow.slice(3); //stimuli names without previous -- TODO parse with apostrophes
        //this.replaceStimuli(parent,stimuli);//replace stimuli with new one from array
        //inserts a extended test with replaced stimuli
        this.splitted.spliceArray(this.currentCursor, 1, this.replaceStimuli(this.expandedTest[parent], stimuli));
      } else if (Dsl.isWithStimuligroup(parentrow[2])) {
        let parent2 = parentrow[3];
        myurl = PsychoTest2Url + parent2;
        $.ajax({
          dataType: 'json',
          url: myurl,
          data: null,
          success: function(testdto) {
            if (parser.prep.expandedGroup[parent2]) console.log('expandGroup, Warning: test definition already loaded for ' + parent2);
            parser.prep.expandedGroup[parent2] = testdto[0].definition;
          },
          error: function(jq, status, error) {
            console.log('expandGroup, Error: When loading data for the test definition ' + myurl + ' ' + error);
          },
          async: false
        });
        if (this.expandedTest[parent]) {
          if (this.expandedGroup[parent2]) this.splitted.spliceArray(this.currentCursor, 1, this.replaceStimuliGroup(this.expandedTest[parent], this.expandedGroup[parent2]));
          else {
            console.log('expandinheritance: Info, nothing to replace from group');
            this.splitted.spliceArray(this.currentCursor, 1, this.expandedTest[parent]);
          }
        } else console.log('expandinheritance: Info, nothing to expand');
      } else console.log('expandinheritance: Warning unrecognized extend attribute:' + parentrow[2]);
    } else { //extends without replacement
      if (this.expandedTest[parent]) {
        console.log('expandinheritance: Info, nothing to replace from group');
        this.splitted.spliceArray(this.currentCursor, 1, this.splitExtendTestDefinition(this.expandedTest[parent]));
      } else console.log('expandinheritance: Info, nothing to expand');
    }
    this.currentCursor++;
  }

  //expands stimuligroup into the current test - reads all stimulus in a group into separate array
  expandStimuliGroup() {
    let parentrow = this.splitted[this.currentCursor].split(/[ ;,]+/); //each expanded group is split
    //for (var i=indexofnames;i<parentrow.lengt h;i++){ //
    //stimuligroup [0] [groupname] [1...]
    let parent = parentrow[1];
    //gets from url test definition
    let myurl = PsychoTest2Url + parent;
    //TODO move ajax call to shared class
    $.ajax({
      dataType: 'json',
      url: myurl,
      data: null,
      success: function(testdto) {
        if (this.expandedGroup[parent]) console.log('expandGroup, Warning: test definition already loaded for ' + parent);
        this.expandedGroup[parent] = testdto[0].definition;
      },
      error: function(jq, status, error) {
        console.log('expandGroup, Error: When loading data for the test definition ' + myurl + ' ' + error);
      },
      async: false
    });
    if (this.expandedGroup[parent]) {
      this.splitted.spliceArray(this.currentCursor, 1, this.splitStimuliDefinition(this.expandedGroup[parent]));
    } else console.log('expandGroup: Info, nothing to expand from stimuligroup.');
    //this.currentCursor++;
  }

  //splits only stimulus from group definition into array
  splitExtendTestDefinition(testdefinition) {
    let rawtest = testdefinition.split('\n');
    //rawtest.shift(); //removes first row -- usually definition of test name
    rawtest[0] = '# ' + rawtest[0]; //comments out the first row -- usually definition of test name
    return rawtest;
  }

  //splits only stimulus from group definition into array
  splitStimuliDefinition(groupdefinition) {
    let rawstimuli = groupdefinition.split('\n');
    let stimuli = [];
    //    var newrows = [];
    for (let i = 1; i < rawstimuli.length; i++) { //step over first row
      let mystimuli = rawstimuli[i].trim();
      if (mystimuli.length > 0) {stimuli.push('stimulus ' + rawstimuli[i]);}
    } //adds only rows with stimulus prefix
    return stimuli;
  }

  //replace each occurence of stimuli with a stimulus row from group definition,
  // if some stimulus remains, it is inserted at the last position of stimulus in definition
  replaceStimuliGroup(definition, groupdefinition) {
    let defrows = definition.split('\n'); //splits per row
    let stimuli = this.splitStimuliDefinition(groupdefinition);
    let laststimulusindex = 0;
    for (let i = 0; i < defrows.length; i++) { //parse each row
      if (Dsl.isZvuk(defrows[i])) {
        if (stimuli.length > 0) {laststimulusindex = i; defrows[i] = stimuli.shift();} //stimulus keyword with new stimulus from array
        else console.log('replaceStimuli: Warning not enough stimuli for replacement.');
      }
    }
    if (stimuli.length > 0) {
      console.log('replaceStimuli: Info adding remaining stimuli after last stimulus in extended test');
      defrows.spliceArray(laststimulusindex, 0, stimuli);
    }
    return defrows;
  }

  //replace each occurence of stimuli with a stimulus row from group definition,
  // if some stimulus remains, it is inserted at the last position of stimulus in definition
  replaceStimuli(definition, stimuli) {
    let defrows = definition.split('\n'); //splits per row
    defrows[0] = '# ' + defrows[0]; //comment out first row of definition --usually testname
    //    var newrows = [];
    let laststimulusindex = 0;
    for (let i = 0; i < stimuli.length; i++) {stimuli[i] = 'stimulus ' + stimuli[i];} //adds stimulus keyword as prefix
    for (let i = 0; i < defrows.length; i++) { //parse each row
      if (Dsl.isZvuk(defrows[i])) {
        if (stimuli.length > 0) {laststimulusindex = i; defrows[i] = stimuli.shift();} //stimulus keyword with new stimulus from array
        else console.log('replaceStimuli: Warning not enough stimuli for replacement.');
      }
    }
    if (stimuli.length > 0) {
      console.log('replaceStimuli: Info adding remaining stimuli after last stimulus in extended test');
      defrows.spliceArray(laststimulusindex + 1, 0, stimuli);
    }
    return defrows;
  }


  //preprocessing
  //copy everything before first state
  //this.currentCursor++;
  preprocessTest(rawTest) {
    this.currentCursor = 0;
    this.splitted = rawTest.split('\n'); //split to rows and parse rows
    this.state = TestState.UND;// getState(this.splitted, currentCursor++);
    this.tstate = {};
    this.myTest = '';
    this.tempTest = '';

    //copy between test and first screen
    this.copyTest();

    if (this.tstate.poradicasenahodne) this.shuffleTest();

    //console.log("cursor " + this.currentCursor + " row " + this.splitted[this.currentCursor]);
    this.state = this.getState();
    while (this.state !== TestState.END) {
      if (this.state === TestState.OBR) this.copyTest();
      else if (this.state === TestState.KAT) this.expandKategorie();
      else if (this.state === TestState.PAR) this.expandParovy();
      else if (this.state === TestState.EXT)  this.expandInheritance();
      else if (this.state === TestState.STIMGR) this.expandStimuliGroup();
      //        else if (this.state == TestState.REPSTIM) this.replaceStimuli();
      //        else if (this.state == TestState.REPGRP) this.replaceStimuliGroup();
      else {
        //console.log("Parse error. " + this.state + ". Not expected state. Line " + this.currentCursor + " row:" + this.splitted[this.currentCursor++]);
        this.myTest += this.splitted[this.currentCursor++] + '\n'; //probably extension - copy test.
      }
      this.state = this.getState();
      //if (this.currentCursor<this.splitted.length) console.log("cursor " + this.currentCursor + " row " + this.splitted[this.currentCursor]);
    }
    //return coppiedTest;
    return this.myTest;
  }
  //flatenize inheritance
  //TODO continue with recursive - flatenize, remove statement from preprocess and add them to recursive call, or use ajax(async:false)

  //flatenize -- collect artefacts
  flatenizeTest(rawTest) {
    this.splitted = rawTest.split('\n');
    let i = 0; let j = 0;
    let artefacts = [];
    for (i = 0; i < this.splitted.length; i++) {
      if (Dsl.isExtends(this.splitted[i]) || isStimuliGroup(this.splitted[i])) {
        let parentrow = this.splitted[i].split(/[ ;,]+/);
        for (j = 1; j < parentrow.length; j++) {
          artefacts.push(parentrow[j]); //add artefact names that will be recursively obtained from server
        }
      }
    }
  }

  loadTestDefinition(row) {
    let parentrow = this.splitted[this.currentCursor++].split(' ');
    for (let i = 1; i < parentrow.length; i++) {
      let parent = parentrow[i];
      this.myTest += this.getTestDefinition(parent); //gets test definition by name, skip first row with test name and copy&paste to
    }
  }
}
