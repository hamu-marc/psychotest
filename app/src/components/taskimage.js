import {bindable} from 'aurelia-framework';

export class Taskimage {
  @bindable cp; //currentpage
  @bindable qp; //questionpage
  @bindable type; //'point' or 'multipoint'
  evaluating = false;
  activestyle = 'border-color:red;border-style:solid';
  passivestyle = 'border-color:white';
  points = [];
  ipoints = [];

  constructor() {
    this.handleShowpoints = e => {
        this.evaluating = e.detail.id === this.cp+';'+this.qp;
    }
  }

  attached() {
    //this.symbolelement;
    console.log('taskimage.attached() symbolemenet', this.symbolelement);
    this.symbolwidth = Math.floor(this.symbolelement.clientWidth / 2);
    //this.points = [];
    //if (window.psychoapi.peakspointindex) window.psychoapi.peakspointindex++; else window.psychoapi.peakspointindex=1;
    this.color = this.selectColor(this.qp);
    this.activestyle = 'border-color:'+this.selectColor(this.qp,65,87)+';border-style:solid';
    document.addEventListener('showpoints',this.handleShowpoints.bind(this));
  }

  detached() {
    window.psychoapi.peakspointindex--;
    document.removeEventListener('showpoints',this.handleShowpoints);
  }

  /**
   * Returns unique color per index- neighbouring colors are different using golden angle approximation
   * @param index
   * @returns {string} usable by CSS or DOM elements
   */
  //  const hue = (i - 1) * 137.508; // use golden angle approximation
  //  var color = `hsl(${hue},85%,91%)`;
  selectColor(index, saturation = 85, lightness = 75) {
    const hue = (index - 2) * 137.508; // use golden angle approximation
    return `hsl(${hue},${saturation}%,${lightness}%)`;
  }

  evaluateTask() {

    //set global cp and qp
    window.psychotestCp = this.cp;
    window.psychotestQp = this.qp;
    window.psychotestsymbolwidth = this.symbolwidth;

    //fire event to show points
    let event = new CustomEvent('showpoints',{ detail: {id:this.cp+';'+this.qp,type:this.type} });
    document.dispatchEvent(event);
    //first click on image will
    /*if (window.ri && this.cp)
      window.ri.setAnswer(this.cp,this.qp,this.points);
*/
  }

}
