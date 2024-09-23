import {Taskimage} from './taskimage';
import {bindable} from 'aurelia-framework';


export class Taskvideo extends Taskimage {
  @bindable type='video/mp4';
  @bindable step=0.5;
  constructor() {
    super();
  }

  addPoint(event) {
    console.log('taskvideo.addpoint() event:', event);
    let rect = event.target.getBoundingClientRect();
    let x = event.clientX - rect.left; //x position within the element.
    let y = event.clientY - rect.top;  //y position within the element.
    //different from taskimage - adding also time in video
    let point = {x: x, y: y, time: this.media.currentTime};

    this.points.push(point);
    //calculate ipoint - icon position - is moved to half x and half y of icon size - so center of icon is at the point
    let ipoint = {iconx: (x - this.symbolwidth - 1), icony: (y - this.symbolwidth - 2)};
    this.ipoints.push(ipoint);
    this.updateAnswer();
    console.log('added point:', point);
  }


  play() {
    this.media.play();
  }

  pause() {
    this.media.pause();
  }

  stop() {
    this.media.pause();
    this.media.currentTime = 0;
  }

  back() {
    this.media.pause();
    this.media.currentTime = this.media.currentTime - this.step;
  }
  forward() {
    this.media.pause();
    this.media.currentTime = this.media.currentTime + this.step;
  }
}
