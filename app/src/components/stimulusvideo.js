import {Stimulusimage} from './stimulusimage';
import {bindable} from 'aurelia-framework';

export class Stimulusvideo extends Stimulusimage {
  @bindable src;
  @bindable ranges;
  @bindable showcontrols = true;
  @bindable base='';
  videoref;
  progressvalue=0;
  videocontainer;
  fsbutton;
  controlclass='videocontrols';
  playing = false;

  constructor() {
    super();
    this.handleMetadata = e => {
      if (this.progress) this.progress.setAttribute('max',this.videoref.duration)
    }
    this.handleTimeUpdate = e => {
      //if (this.progress.getAttribute('max')) progress.setAttribute('max',this.videoref.duration);
      this.progressvalue=this.videoref.currentTime/this.videoref.duration * 100;
      //this.progressbar.style.width = Math.floor((this.videoref.currentTime / this.videoref.duration)*100) + '%';
    }
    this.handleClick = e => {
      let pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
      window.videoref.currentTime = pos * window.videoref.duration;
    }
  }

  bind() {
    super.bind();
    if (this.showcontrols && (typeof this.showcontrols === 'string')) {
      this.showcontrols = this.showcontrols === ' true';
    }
  }

  attached() {
    super.attached();
    console.log('stimulusvideo')
    this.videoref.addEventListener('loadedmetadata',this.handleMetadata.bind(this));
    this.videoref.addEventListener('timeupdate',this.handleTimeUpdate.bind(this));
    //this.videoref.addEventListener()
    //window.videoref = this.videoref;
    //if (!this.progress) this.progress = document.getElementById('myprogress');
    //if (this.progress) this.progress.addEventListener('click',this.handleClick); //not bind to this - bind to default event
  }

  play(){
    if (this.videoref) {
      console.log('videoref:', this.videoref)
      this.playing = true;
      this.videoref.play();
    }
  }
  pause() {
    if (this.videoref) {
      this.playing = false;
      this.videoref.pause();
    }
  }
  stop() {
    if (this.videoref) {
      this.videoref.pause()
      this.videoref.currentTime=0;
    }
  }

  back(){
    if (this.videoref) {
      let backtime = this.videoref.currentTime - 2; //bakc 1 second
      this.videoref.currentTime = backtime;
     // this.videoref.play()
    }
  }
  forward(){
    if (this.videoref) {
      let backtime = this.videoref.currentTime + 2; //bakc 1 second
      this.videoref.currentTime = backtime;
      // this.videoref.play()
    }
  }
  nicetime(num){
    return num.toFixed(0);
  }

  setPosition(e) {
    //console.log('simulusvideo setposition, event',e.layerX);
    let pos = e.layerX;
    let max = e.target.offsetWidth;
    let min = e.target.offsetLeft;
    let relpos = (pos - min)/max;
    console.log('simulusvideo setposition, event',e,relpos);
    this.videoref.currentTime = this.videoref.duration * relpos;
  }

  // Checks if the document is currently in fullscreen mode
  isFullScreen(){
    return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
  }

  setFullscreenData(state) {
    this.videocontainer.setAttribute('data-fullscreen', !!state);
    // Set the fullscreen button's 'data-state' which allows the correct button image to be set via CSS
    this.fsbutton.setAttribute('data-state', !!state ? 'cancel-fullscreen' : 'go-fullscreen');
  }

  fullscreen(){
      // If fullscreen mode is active...
      if (this.isFullScreen()) {
        // ...exit fullscreen mode
        // (Note: this can only be called on document)
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        this.setFullscreenData(false);
        this.controlclass='videocontrols';
      }
      else {
        // ...otherwise enter fullscreen mode
        // (Note: can be called on document, but here the specific element is used as it will also ensure that the element's children, e.g. the custom controls, go fullscreen also)
        if (this.videocontainer.requestFullscreen) this.videocontainer.requestFullscreen();
        else if (this.videocontainer.mozRequestFullScreen) this.videocontainer.mozRequestFullScreen();
        else if (this.videocontainer.webkitRequestFullScreen) {
          // Safari 5.1 only allows proper fullscreen on the video element. This also works fine on other WebKit browsers as the following CSS (set in styles.css) hides the default controls that appear again, and
          // ensures that our custom controls are visible:
          // figure[data-fullscreen=true] video::-webkit-media-controls { display:none !important; }
          // figure[data-fullscreen=true] .controls { z-index:2147483647; }
          this.videoref.webkitRequestFullScreen();
        }
        else if (this.videocontainer.msRequestFullscreen) this.videocontainer.msRequestFullscreen();
        this.setFullscreenData(true);
        this.controlclass='videocontrolsfull';
      }
  }

/*  bind() {
    super.bind();
  }

  attached() {
    super.attached();
  }

 */
}
