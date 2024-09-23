import {bindable} from "aurelia-framework";

export class Taskwaveform {
  @bindable cp; //currentpage
  @bindable qp; //questionpage
  @bindable segment; //if segments or (default) points to be added

  registered = false;

  constructor() {
    this.handleDrag = e => {
      console.log('taskwaveform handledrag, e',e);
      //do update only on same colored pointts
      if (e.color === this.color) this.updateAnswer(e.time);
    }
    this.handleDragSegment = e => {
      console.log('taskwaveform handledrag, e',e);
      ///do update only on same colored segments
      if (e.color === this.color ) this.updateAnswer2(e.startTime,e.endTime)
    }
  }

  attached() {
    if (window.psychoapi.peakspointindex) window.psychoapi.peakspointindex++; else window.psychoapi.peakspointindex=1;
    this.color = this.selectColor(window.psychoapi.peakspointindex-1);
    if (this.segment && (typeof this.segment === 'string')) this.segment = this.segment === 'true';
  }

  detached() {
    window.psychoapi.peakspointindex--;
  }

  /**
   * Returns unique color per index- neighbouring colors are different using golden angle approximation
   * @param index
   * @returns {string} usable by CSS or DOM elements
   */
  //  const hue = (i - 1) * 137.508; // use golden angle approximation
  //  var color = `hsl(${hue},85%,91%)`;
  selectColor(index, saturation = 85, lightness = 75) {
    const hue = (index - 1) * 137.508; // use golden angle approximation
    return `hsl(${hue},${saturation}%,${lightness}%)`;
  }



  addpoint() {
    let peaks = window.psychoapi.peaks;
    if (peaks) {
      let time = peaks.player.getCurrentTime();
      //find points
      let points = peaks.points.getPoints();
      //if already there - update time
      let mypoint = points.find(x => x.color === this.color);
      //if not there - add
      if (!mypoint) {
        this.updateAnswer(time)
        peaks.points.add({
          time: time,
          editable: true,
          color: this.color
        });
        if (!this.registered) {
          this.registered=true;
          peaks.on('points.dragend',this.handleDrag.bind(this))
        }
      } else {
        this.updateAnswer(time);
        mypoint.update({time:time,color:this.color,editable:true});
      }
    }
  }

  addsegment() {
    let peaks = window.psychoapi.peaks;
    if (peaks) {
      let time = peaks.player.getCurrentTime();
      //find points
      let segments = peaks.segments.getSegments();
      //if already there - update time
      let mypoint = segments.find(x => x.color === this.color);
      //if not there - add
      if (!mypoint) {
        this.updateAnswer2(time,time+1)
        peaks.segments.add({
          startTime: time,
          endTime: (time+1),
          editable: true,
          color: this.color
        });
        if (!this.registered) {
          this.registered=true;
          peaks.on('segments.dragend',this.handleDragSegment.bind(this))
        }
      } else {
        this.updateAnswer2(time, time+1);
        mypoint.update({startTime:time,endTime:(time+1),color:this.color,editable:true});
      }
    }
  }

  //answer is either single time point or starttime-endtime
  updateAnswer(pointtime) {
      if (window.ri && this.cp) {window.ri.setAnswer(this.cp, this.qp, pointtime);}
    //update only if cp is set
  }

  updateAnswer2(pointtime, pointtime2){
      if (window.ri && this.cp) {
        window.ri.setAnswer(this.cp, this.qp, pointtime+'-'+pointtime2);
      }
    }

  removepoint() {
    let peaks = window.psychoapi.peaks;
    if (peaks) {
      peaks.points.removeAll();
    }
  }

}
