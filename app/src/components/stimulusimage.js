import {bindable} from 'aurelia-framework';

export class Stimulusimage {
  @bindable src;
  @bindable ranges;
  @bindable base='';
  @bindable edu; //TODO implement
  defaultwidthheight = [300, 0];
  //ipoints =[];
  points = [];
  pointsarchive =[];

  constructor() {
    this.handleShowPoints = e => {
      this.showPoints(e);
    };
  }


  bind() {
    //console.log('stimulusimage bind() base,src', this.base, this.src);
    this.sources = [];
    if (this.src) {
      //filenames in array list
      //this.sources = this.src.split('|');
      //get sources into array
      let sources1 = this.src.split('|');
      //get ranges into array
      let ranges1 = [];
      if (this.ranges && this.ranges.length > 0) { //ranges are split by |, min max are split by comma , no particular range is ||
        let rangesarr = this.ranges.split('|');
        for (let i = 0; i < rangesarr.length; i++) {
          let x;
          if (rangesarr[i].length === 0) x = this.defaultwidthheight; //default range
          else x = rangesarr[i].split(',');
          ranges1.push(x);
        }
      }
      //merge source and reanges into structure
      for (let i = 0; i < sources1.length; i++) {
        this.sources.push({src: sources1[i], id: this.hashCode(sources1[i]), width: ranges1[i] ? ranges1[i][0] : this.defaultwidthheight[0], height: ranges1[i] ? ranges1[i][1] : this.defaultwidthheight[1]});
      }
      console.log('stimulusimage bind() sources:', this.sources);
    }
  }

  attached() {
    this.cp = null;
    this.qp = null;

    //remove height attribute from all img with height=0; to preserve aspect ratio
    for (let source of this.sources) {
      // eslint-disable-next-line eqeqeq
      if (!source.height || source.height == 0 ) {
        let el = document.getElementById(source.id);
        if (el) el.removeAttribute('height');
      }
    }
    this.createEduPoints();
    document.addEventListener('showpoints', this.handleShowPoints);
  }

  detached() {
    document.removeEventListener('showpoints', this.handleShowPoints);
  }

  eduChanged(newValue,oldValue) {
    console.log('stimulusimage edupoint change to',newValue);
    this.createEduPoints();
  }

  createEduPoints() {
        //create edupoints
        this.edupoints = [];
        let ci = 0;
        if (this.edu && this.edu.length > 0) {
          let edu1 = this.edu.split('|'); //points
          for (let edu2 of edu1) {
            ci++;
            let educ = edu2.split('/');
            for (let edui of educ) {
              let eduitem = edui.split(':'); //TODO same color - split by ; and then by , x;y;... x;y;r1;r2
              let point = {
                iconx: eduitem[0],
                icony: eduitem[1],
                diameter: eduitem.length > 2 ? eduitem[2] : 0,
                color: this.selectColor(ci)
              };
              this.edupoints.push(point);
            }
          }
        }    
  }

  hashCode(str) {
    let hash = 0; let i = 0; let len = str.length;
    while ( i < len ) {
      hash  = ((hash << 5) - hash + str.charCodeAt(i++)) << 0;
    }
    return 'img' + hash;
  }


  updateAnswer() {
    if (window.ri && this.cp) {window.ri.setAnswer(this.cp, this.qp, this.points);}
    //update only if cp is set
  }

  showPoints(event) {
    if (window.psychotestCp) {
      //first show in this task
      if (this.cp) {//store current points
        this.pointsarchive[this.qp] = this.points.slice();
        this.points = (this.pointsarchive[window.psychotestQp]) ? this.pointsarchive[window.psychotestQp] : [];
      }
            //set it to this image
            this.cp = window.psychotestCp;
            this.qp = window.psychotestQp;
            this.color = this.selectColor(this.qp);
            this.symbolwidth = window.psychotestsymbolwidth;
      
      //if event contains details - then take it
      if (event.detail.points) {
        //create edupoints
        this.edupoints = [];
        let ci = 0;
        this.edu = event.detail.points
        if (this.edu && this.edu.length > 0) {
          let edu1 = this.edu.split('|'); //points
          for (let edu2 of edu1) {
            //ci++;
            let educ = edu2.split('/');
            for (let edui of educ) {
              let eduitem = edui.split(':'); //TODO same color - split by ; and then by , x;y;... x;y;r1;r2
              let point = {
                iconx: eduitem[0],
                icony: eduitem[1],
                diameter: eduitem.length > 2 ? eduitem[2] : 0,
                color: this.color
              };
              this.edupoints.push(point);
            }
          }
        }
      }
      //null global variable
      window.psychotestCp = null;
      window.psychotestQp = null;
      window.psychotestsymbolwidth = 0;
      //set type
      window.psychotestPointType = event.detail.type;
    }
  }

  addPoint(event) {
    //console.log('taskimage.addpoint() event:', event);
    if (window.psychotestCp) {
      if (this.cp) {//store current points
        this.pointsarchive[this.qp] = this.points.slice();
        this.points = (this.pointsarchive[window.psychotestQp]) ? this.pointsarchive[window.psychotestQp] : [];
      }
      //set it to this image
      this.cp = window.psychotestCp;
      this.qp = window.psychotestQp;
      this.color = this.selectColor(this.qp);
      this.symbolwidth = window.psychotestsymbolwidth;
      //null global variable
      window.psychotestCp = null;
      window.psychotestQp = null;
      window.psychotestsymbolwidth = 0;
    }
    if (this.cp) {
      let rect = event.target.getBoundingClientRect();
      let x = event.clientX - rect.left; //x position within the element.
      let y = event.clientY - rect.top;  //y position within the element.
      let relx = x * 100 / rect.width;
      let rely = y * 100 / rect.height;
      let point = {x: x, y: y, iconx: relx, icony: rely};
      if (this.videoref) {
        point.videotime = this.videoref.currentTime;
      }
      if ((window.psychotestPointType === 'multipoint') || (window.psychotestPointType === 'multipointline')) this.points.push(point);
      else { //default single point
        if (this.points.length > 0) this.points.pop();
        this.points.push(point);
      }
      /*      //calculate ipoint - icon position - is moved to half x and half y of icon size - so center of icon is at the point
      let ipoint = {iconx: (x - this.symbolwidth - 1), icony: (y - this.symbolwidth - 2)};
      this.ipoints.push(ipoint);*/
      //add answer to global results
      this.updateAnswer();
      //console.log('added point:', point);
    }
  }

  removePoint(event) {
    //console.log('taskimage.removepoint() event:', event);
    if (this.cp) {
      if (this.points.length > 0) {
        this.points.pop();
        //this.ipoints.pop(); // should be sync
        this.updateAnswer();
      }
    }
    return false;
  }
  /**
   * Returns unique color per index- neighbouring colors are different using golden angle approximation
   * @param index
   * @returns {string} usable by CSS or DOM elements
   */
  //  const hue = (i - 1) * 137.508; // use golden angle approximation
  //  var color = `hsl(${hue},85%,91%)`;
  selectColor(index, saturation = 55, lightness = 55) {
    const hue = (index - 2) * 137.508; // use golden angle approximation
    return `hsl(${hue},${saturation}%,${lightness}%)`;
  }
}
