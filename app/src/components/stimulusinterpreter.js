import {Interpreter} from './interpreter';
import {Dsl} from './dsl';
//import * as Peaks from 'peaks.js';

export class Stimulusinterpreter {
  /**
   * Created by tomaton on 10/21/2015.
   */
  //main object

  constructor(parent, _sounddir = 'stimuli/') {
    this.navelement = false;
    this.divelement = false;
    this.audioid = 0;
    this.SOUNDDIR = _sounddir;//'stimuli/';
    this.parentinterpretter = parent;
    //this.sloupce = false;
    this.lastnumsources = 0;
  }

  setSounddir(_sounddir, _proxysounddir) {
    this.SOUNDDIR = (_sounddir.endsWith('/') ? _sounddir : _sounddir + '/');
    this.PROXYSOUNDDIR = _proxysounddir;
  }

  /* separates non-stimulus part of test */
  translateNonZvuk(row) {
    if (this.navelement) {
      this.navelement = false;
      this.divelement = true;
      return "</nav><div class='task' id='questions'>\n";
    }
    if (!this.divelement) {
      this.divelement = true;
      return "<div class='task' id='questions'>\n";
    }
    return '';
  }

  /* close unclosed <div>*/
  closeQuestionDiv() {
    if (this.divelement) {
      this.divelement = false;
      //removed empty p class footer
      return "</div>";
    } return '';
  }

  resetStimuli() {
    this.lastnumsources = 0;
  }

  translateZvuk(rowsplitted, poradivnticinahodne, result, sloupce) {
    //stimulus obr1.jp obr2.jpg 400 300
    //stimulus 1.wav 2.wav 3.wav
    //let tagtype = rowsplitted[1].slice(rowsplitted[j].length - 3, rowsplitted[j].length).toLowerCase();// || rowsplitted[j].startsWith('v_');
    let filetype = rowsplitted[1].split('.')[1].toLowerCase();
    if (filetype) {
      switch (filetype) {
      case 'mp4': return this.createVideo(rowsplitted, poradivnticinahodne, result, sloupce);
      case 'png':
      case 'jpg': return this.createImage(rowsplitted, poradivnticinahodne, result, sloupce);
      case 'txt': return this.createText(rowsplitted, poradivnticinahodne, result, sloupce);
      default:
        return this.createAudio(rowsplitted, poradivnticinahodne, result, sloupce);
      }
    }
  }
  //TODO parovy test neni zatim podporovan

  createAudio(rowsplitted, poradivnticinahodne, result, sloupce) {
    //all rowsplitted is sound
    let {sources, ranges, presentationtype, numsources,edupoints } = this.extractSourcesRanges(rowsplitted, poradivnticinahodne);
    //console.log('stimulusinterpreter createAudio() sources, ranges:', sources, ranges);
    //add case information into the initial result structure
    result.addCase(sources.replace(this.SOUNDDIR, ''));
    let presentationdef = ''; if (presentationtype && presentationtype.length > 0) presentationdef = 'type="' + presentationtype + '"';
    //edupoints
    let edupointsdef = ''; if (edupoints && edupoints.length > 0) edupointsdef = 'edu="' + edupoints + '"';
    //workaround - peaks needs proxy for cors - otherwise will not generate waveform
    let sounddir = this.SOUNDDIR;//presentationtype === 'peaks' ? this.PROXYSOUNDDIR : this.SOUNDDIR;
    //count index of sound stimuli from begining of screen, any other stimuli will add value of lastnumsources
    if (this.lastnumsources === 0) this.audioindex = 1; else this.audioindex += this.lastnumsources;
    this.lastnumsources = numsources;
    return '<stimulusaudio ' +
      'src="' + sources + '" ' +
      'ranges="' + ranges + '" ' +
      'base="' + sounddir + '" ' +
      'groupnum="' + this.audioindex + '" ' +
      presentationdef +
      edupointsdef + '></stimulusaudio>';
  }


  createVideo(rowsplitted, poradivnticinahodne, result, sloupce) {
    let {sources, ranges, presentationtype, numsources, edupoints} = this.extractSourcesRanges(rowsplitted);
    //let sources = rowsplitted.slice(1).join('|');
    result.addCase(sources.replace(this.SOUNDDIR, ' '));
    //edupoints
    let edupointsdef = ''; if (edupoints && edupoints.length > 0) edupointsdef = ' edu="' + edupoints + '"';
    return '<stimulusvideo src="' + sources + '" ranges="' + ranges + '" base="' + this.SOUNDDIR + '"' + edupointsdef + '></stimulusvideo>';
  }
  createImage(rowsplitted, poradivnticinahodne, result, sloupce) {
    let {sources, ranges, presentationtype, numsources, edupoints} = this.extractSourcesRanges(rowsplitted);
    result.addCase(sources.replace(this.SOUNDDIR, ''));
    //edupoints
    let edupointsdef = ''; if (edupoints && edupoints.length > 0) edupointsdef = ' edu="' + edupoints + '"';
    return '<stimulusimage src="' + sources + '" ranges="' + ranges + '" base="' + this.SOUNDDIR + '"' + edupointsdef + '></stimulusimage>';
  }
  createText(rowsplitted, poradivnticinahodne, result, sloupce) {
    let sources = rowsplitted.slice(1).join('|');
    result.addCase(sources.replace(this.SOUNDDIR, ''));
    return '<stimulustext src="' + sources + '" base="' + this.SOUNDDIR + '"></stimulustext>';
  }


  /**
   * From the array of tokens in a stimulus row extracts sources (files) and ranges (in square brackets) and type (in round bracket)
   * @param rowsplitted
   * @param poradivnticinahodne
   * @returns {{sources: *, ranges: string}}
   */
  extractSourcesRanges(rowsplitted, poradivnticinahodne) {
    //sources are strings in row - not [] {}
    let sources1 = rowsplitted.slice(1).filter(x => !(x.startsWith('[') || x.endsWith(']') || x.startsWith('{') || x.endsWith('}')));
    let numsources = sources1.length;
    let sources = sources1.join('|'); //will be separated by '|'
    //extract sourcetype, if exists
    let presentationtype1 = rowsplitted.find(x => Dsl.stimuliType(x));
    let presentationtype = presentationtype1 ? Dsl.stimuliType(presentationtype1)[1] : null;
    //filter ranges - all with [ or ] is range definition
    let ranges1 = rowsplitted.slice(1).filter(x => (x.startsWith('[') || x.endsWith(']'))); //get only ranges - delimited by []
    let edupoints2 = rowsplitted.slice(1).filter(x => (x.startsWith('{') || x.endsWith('}'))); //get only edupoints - delimited by []
    let edupoints = edupoints2.map(x => x.slice(1,-1)).join('|'); //remove first { and last } and join them with |
    //TODO shuffle edupoints2 if random in couple - or do not support
    //construct min and max separated by comma or empty string
    let ranges;
    if (ranges1.length === 0) {
      ranges = '';
      if (poradivnticinahodne) {
        sources1 = this.shuffle1array(sources1);
        sources = sources1.join('|');
      }
    } else {
      let ranges2 = [];
      let i = 0; //i< ranges1.length;i+=2) {
      do {
        if (ranges1[i] === '[]') {
          ranges2.push('');
          i++;
        } else {
          let min = ranges1[i].substring(1);
          let max = ranges1[i + 1].substring(0, ranges1[i + 1].length - 1);
          ranges2.push(min + ',' + max);
          i += 2;
        }
      } while (i < ranges1.length);
      if (poradivnticinahodne) {
        //fill ranges with empty values;
        let rl = ranges2.length;
        for (let j = rl; j < sources1.length; i++) ranges2.push('');
        this.shuffle2array(sources1, ranges2);
        sources = sources1.join('|'); //will be separated by '|'
        //ranges2 = ranges3;
      }
      ranges = ranges2.join('|');
    }
    return {sources, ranges, presentationtype, numsources, edupoints};
  }
  //shuffle randomly the array
  shuffle1array(arr) {
    let i = arr.length; let j; let temp;
    if (i === 0) return arr;
    while (--i) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  shuffle2array(arr1, arr2) {
    let i = arr1.length; let j; let temp1; let temp2;
    if (i === 0 || (arr1.length != arr2.length)) return {arr1, arr2};
    while (--i) {
      j = Math.floor(Math.random() * (i + 1));
      temp1 = arr1[i]; temp2 = arr2[i];
      arr1[i] = arr1[j]; arr2[i] = arr2[j];
      arr1[j] = temp1; arr2[j] = temp2;
    }
    return {arr1, arr2};
  }
  /** FOLLOWING DEPRECATED **/

  /* same name different extension => <audio> with different sources, different names => different <audios>
   * translates "zvuk [filename2.wav] [filename2.ogg]" to HTML representation of sound player to one or both formats wav, ogg
   * translates "zvuk [file1.wav] [file1.ogg] [file2.wav] [file3.wav] into tuple of buttons file1 has 2 sources with ogg and wav, file2 and file3 has one source with wav
   */

  openAudio(sloupce, sounddef) {
    if (!sloupce && !this.navelement) {
      this.navelement = true;
      switch (this.tagtype) {
      case 'mp4':
        this.tags.push("<nav class='stimulus videos'>"); //video takes more space
        break;
      case 'png':
      case 'jpg':
        this.tags.push("<nav class='stimulus pictures'>"); //image takes variable space
        break;
      case 'txt':
        this.tags.push("<nav class='stimulus txts'>"); //text takes more space
        break;
      default:
        this.tags.push("<nav class='stimulus sounds'>"); //audio on left 10 % column
      }
    }

    switch (this.tagtype) {
    case 'mp4':
      this.currentTag.push("<video style='max-width:100%;' id='video" + (this.audioid++) + "' width='480' height='360' controls>");
      break;
    case 'png':
    case 'jpg':
      this.currentTag.push("<img style='width:100%;' id='image" + (this.audioid++) + "'"); //imageo takes more space
      //this.currentTag.push('<taskimage src="' + baseurl + rowsplitted[1] + '" height="' + rowsplitted[2] + '" width="' + rowsplitted[3] + '" cp="' + this.currentPage + '" qp="' + this.questionPage + '"></taskimage>');
      break;
    case 'txt':
      this.currentTag.push("<p id='text" + (this.audioid++) + "'>"); //text takes more space
      break;
    default:
      this.inputindex = this.currentTag.length;
      let soundtype = Dsl.stimuliType(sounddef);
      if (soundtype ) {
        if (soundtype[1] === 'button') this.currentTag.push("<input class='sound-button' type='button' onclick='document.getElementById(\"audio" + this.audioid + "\").play();' value='play'/> <audio id='audio" + (this.audioid++) + "'>");
        else if (soundtype[1] === 'controls') this.currentTag.push("<audio controls id='audio" + (this.audioid++) + "'> ");
        else if (soundtype[1] === 'waveform') {this.initPeaks(this.audioid); this.currentTag.push(this.peakhtml + "<audio controls id='audio" + (this.audioid++) + "'> ");}
      } else {this.currentTag.push("<input class='sound-button' type='button' onclick='document.getElementById(\"audio" + this.audioid + "\").play();' value='play'/> <audio id='audio" + (this.audioid++) + "'>");}
      break;
    }
  }

  //add range playing of sound
  repairLastAudio(rowsplitted) {
    //preserve that
    switch (this.tagtype) {
    case 'mp4':
    case 'png':
    case 'jpg':
    case 'txt':
      console.log('Error, expected audio for range playing');
      break;
    default:
      let re2 = /[\[\],]/; // fix feature bug #240, coma ',' is used to separate interval numbers
      let rowsplitted2 = rowsplitted.split(re2);
      let starttime = rowsplitted2[1]; //[10,10] is separates as [0] is empty, [1] is 10, [2] is 10 [3] is empty
      let duration = rowsplitted2[2];
      this.audioid--; //will repair the last audio
      this.currentTag[this.inputindex] = "<input type='button' onclick='playAudioPart(document.getElementById(\"audio" + this.audioid + '"),' + starttime + ',' + duration + ");' value='play'/><audio id='audio" + (this.audioid++) + "'>";
    }
  }

  //close <audio> tag
  closeAudio() {
    switch (this.tagtype) {
    case 'mp4':
      this.currentTag.push('Your browser does not support the video element.</video>\n');
      break;
    case 'png':
    case 'jpg':
      this.currentTag.push('/>');
      break;
    case 'txt':
      this.currentTag.push('</p>');
      break;
    default:
      this.currentTag.push('Your browser does not support the audio element.</audio>\n');
    }
    //adds copy of current tag to the array of tags dedicated to unique stimulus
    this.tags.push(this.currentTag.join(''));
    //nulls the current tag so new content audio/video can be inserted
    this.currentTag = [];
  }

  //add <source> of the <audio> <video and src of the image
  addSource() {
    switch (this.tagtype) {
    case 'mp4':
      this.currentTag.push("<source src='" + this.SOUNDDIR + this.currentsound[0] + '.' + this.currentsound[1] + "' type='audio/"); //+rowsplitted[j+1]+"'>';
      this.currentTag.push("mpeg'>");
      break;
    case 'png':
    case 'jpg':
      this.currentTag.push(" src='" + this.SOUNDDIR + this.currentsound[0] + '.' + this.currentsound[1] + "'");
      break;
    case 'txt': //loads the content of the txt file
      this.currentTag.push("<span src='" + this.SOUNDDIR + this.currentsound[0] + '.' + this.currentsound[1] + "'/>"); //to hold the source
      this.currentTag.push("</p><script>$('#text" + (this.audioid - 1) + "').load('" + this.SOUNDDIR + this.currentsound[0] + '.' + this.currentsound[1] + "')</script>");
      break;
    default:
      this.currentTag.push("<source src='" + this.SOUNDDIR + this.currentsound[0] + '.' + this.currentsound[1] + "' type='audio/"); //+rowsplitted[j+1]+"'>';
      this.currentTag.push(this.currentsound[1] + "'>");
    }

    this.lastsoundname = this.currentsound[0];
  }
  /*
  Stimulus.prototype.firstscreenaudioid= function()
  {
  //    this.audioid = 0
  //    this.firstscreenaudioid = this.audioid;
  }
  */

  translateZvukOld(rowsplitted, poradivnticinahodne, result, sloupce) {
    let j = 1;
    this.lastsoundname = '';
    this.tagtype = rowsplitted[j].slice(rowsplitted[j].length - 3, rowsplitted[j].length).toLowerCase();// || rowsplitted[j].startsWith('v_');

    this.tags = [];
    this.currentTag = [];
    this.currentsound = [];
    this.inputindex = 0;

    //sloupce - used ofr pair test
    if (sloupce) this.currentTag.push("<td class='stimulus'>");
    /* open initial tag */
    this.openAudio(sloupce, rowsplitted[0]);

    while (j < rowsplitted.length) {
      this.currentsound = rowsplitted[j].split('.');
      //if (!quotes)
      if ((this.lastsoundname === '') || (this.lastsoundname === this.currentsound[0])) {
        //add only new source type (wav,ogg), if soundname is same and only extension differs
        this.addSource();
        j++;
      } else if (rowsplitted[j].startsWith('[')) {
        //interval of previous sound
        this.repairLastAudio(rowsplitted[j]);
        j++; //skip the interval in [..]
      } else {//add new audio, different sound and it's source if different name
        this.closeAudio();
        this.openAudio(sloupce, rowsplitted[0]);
        this.addSource();
        j++;
      }
      //bug in feature #235, must randomize also the case order
      //lastqcase += rowsplitted[j] + "." + rowsplitted[j + 1] + " "; //adds sound to qcase structure
    }
    /* close last tag*/
    this.closeAudio();

    /* shuffle if needed */
    if (poradivnticinahodne) {
      //keep first <nav>,
      let mytag = this.tags.shift();
      //shuffle
      this.tags.shuffle();
      //adds first <nav>
      this.tags.unshift(mytag);
    }
    //gets filenames from the tags to keep order of cases in result, fix of feature #235, for starts from 1, 0 is <nav>, if sloupce then starts from 0 (no <nav> element
    //added sloupce?0:1 and parser.result.addCase() fix bug #284
    for (let k = sloupce ? 0 : 1; k < this.tags.length; k++) this.parentinterpretter.result.addCase(Interpreter.extract(this.tags[k].match(/src='([^']*)'/)[1], this.SOUNDDIR) + ' ');
    //translatedRows = tags.join
    return this.tags.join(' ');
  }

  /* executive part of the audio
   playing part of the audio,
   audio element is expected as the calling argument,
   e.g. document.getElementById('myAudio') */
  stopAudio(audio) {
    audio.pause();
  }

  /* starts playing at "start" position and stops after specified duration
   "start" and "duration" in milliseconds
   */
  playAudioPart(audio, start, duration) {
    audio.currentTime = start / 1000; //in seconds
    audio.play();
    setTimeout(stopAudio, duration, audio); //in milliseconds
  }
}
