import {bindable} from 'aurelia-framework';
//import * as Peaks from 'peaks.js';
export class Stimulus {
  @bindable options;
  @bindable index;

  constructor() {

  }

  attached() {
  }

  play() {
    document.getElementById( this.options.id).play();
  }
}
