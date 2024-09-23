import {bindable, inject} from 'aurelia-framework';
import Peaks from '@hamu-marc/peaks.js';
import {PsychoApi} from "./psychoapi";

/**
 * Mimics old stimulus element
 * - src="1.wav|2.wav|3.wav|4.wav" creates playable audio with sources
 * - ranges = "x1,d2|x2,d2||x4,d4" plays only part of the audio from x ms with duration d ms, x3,d3 is not defined
 */
@inject(PsychoApi)
export class Stimulusaudio {
  @bindable src;
  @bindable ranges;
  @bindable base='';
  @bindable type;
  @bindable label='play';
  @bindable groupnum;
  @bindable edu; //TODO implement
  playonce = false;
  sources = [];
  showbutton=true;
  showcontrols=false;
  shownum=false;
  playonce_played=false;
  play_disabled=false;

  constructor(api) {
    window.psychoapi = api;
    window.psychostimulusaudio = this;
  }


  bind() {
    //console.log('stimulusaudio bind() base,src,ranges', this.base, this.src, this.ranges);
    if (this.groupnum && typeof this.groupnum === 'string') {
      this.groupnum = parseInt(this.groupnum, 10);
    }
    if (this.src) {
      //filenames in array list
      this.sources = this.src.split('|');
      //generate unique ids
      this.ids = this.sources.map(x => this.hashCode(x));
      this.zoomids = this.ids.map(x => 'zoom-' + x);
      this.overviewids = this.ids.map(x => 'overview-' + x);
      //get file extension for type of source in audio, default wav
      this.types = this.sources.map(x=> {let extension = x.split('.')[1]; return extension ? extension : 'wav';});
    }
    if (this.ranges && this.ranges.length > 0) { //ranges are split by |, min max are split by comma , no particular range is ||
      this.rangesarr = this.ranges.split('|');
      this.rangesminmax = {};
      for (let i = 0; i < this.rangesarr.length; i++) {
        let x;
        if (this.rangesarr[i].length === 0) x = null;
        else x = this.rangesarr[i].split(',');
        this.rangesminmax[this.ids[i]] = x;
      }
    }
    if (this.type) {
      this.showbutton = (this.type.startsWith('button')); //starts with button
      this.shownum = this.type.endsWith('1'); //if endswith 1 small number in button
      //if button contains en,cz,sk,de suffix then the button will have localized label
      if (this.showbutton) {
        if (this.type.startsWith('buttonen')) this.label = 'play';
        if (this.type.startsWith('buttoncz')) this.label = 'přehrát';
        if (this.type.startsWith('buttonsk')) this.label = 'prehrať';
        if (this.type.startsWith('buttonde')) this.label = 'spielen';        
      }
      this.showcontrols = (this.type === 'controls' || this.type === 'waveform');
      this.showpeaks = (this.type === 'waveform');
      if (this.type.endsWith('-playonce')) this.playonce=true;
    }
    if (typeof this.playonce === 'string' ) this.playonce = this.playonce == 'true'
  }

  attached() {
    if (this.showpeaks) {
      const audioContext = new AudioContext();
      const options = {
        containers: {
          'zoomview': document.getElementById('zoom-' + this.ids[0]),
          'overview': document.getElementById('overview-' + this.ids[0])
        },
        mediaElement: document.getElementById(this.ids[0]),
        webAudio: {
          audioContext: audioContext,
          audioProxyHandler: this.audioFetchProxyHandler
        },
        //      dataUri: {
        //        arraybuffer: "TOL_6min_720p_download.dat",
        //        json: "TOL_6min_720p_download.json"
        //    },
        zoomLevels: [256, 512, 1024, 2048, 4096],
        keyboard: true
        /*segments: [
          {
            startTime: 44.0,
            endTime: 52.5,
            editable: true,
            color: '#E7003E',
            labelText: '1 sloka'
          }
        ]*/
      };
      //console.log('Peaks demo. Peaks struct:', Peaks);
      Peaks.init(options, function(err, peaks) {
        window.psychoapi.peaks = peaks;
        document.getElementById('zoomIn').addEventListener('click', function() {
          peaks.zoom.zoomIn();
        });

        document.getElementById('zoomOut').addEventListener('click', function() {
          peaks.zoom.zoomOut();
        });
/* moved to task waveform
        document.getElementById('segment').addEventListener('click', function() {
          let startTime = peaks.player.getCurrentTime();
          let endTime = startTime + 10;

          peaks.segments.add({
            startTime: startTime,
            endTime: endTime,
            editable: true
          });
        });

        document.getElementById('point').addEventListener('click', function() {
          let time = peaks.player.getCurrentTime();

          peaks.points.add({
            time: time,
            editable: true,
            color: '#006EB0'
          });
        });

 */
      });
    }
  }

  audioFetchProxyHandler(callback) {
    window.psychoapi.getFileContentFromLastEnc(window.psychostimulusaudio.sources[0])
      .then(data => callback(data));
  }

  play(aid) {
    if (this.playonce){
      if (!this.playonce_played) {
        this.playonce_played = true;
        this.play_disabled = true;
      } else {
        return;
      }
    }
    //console.log('stimulusaudio play() id', aid);
    window.ri.setPlayedStimulus(aid);
    if (this.rangesminmax && this.rangesminmax[aid]) {
      this.playAudioPart(document.getElementById(aid), this.rangesminmax[aid][0], this.rangesminmax[aid][1]);
    } else {
      document.getElementById(aid).play();
    }
  }

  playAudioPart(audio, start, duration) {
    audio.currentTime = start / 1000; //in seconds
    audio.play();
    setTimeout(this.stopAudio, duration, audio); //in milliseconds
  }

  stopAudio(audio) {
    audio.pause();
  }

  hashCode(str) {
    /*let hash = 0; let i = 0; let len = str.length;
    while ( i < len ) {
      hash  = ((hash << 5) - hash + str.charCodeAt(i++)) << 0;
    }*/
    return 'audio-' + str;
  }
}
