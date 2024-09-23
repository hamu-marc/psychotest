import {bindable} from 'aurelia-framework';
import noUiSlider from 'nouislider';
//import 'nouislider/dist/nouislider.min.css';  // Import the CSS for noUiSlider


export class Taskscale {
  @bindable id;
  @bindable min;
  @bindable max;  
  @bindable step;
  @bindable annotations;
  @bindable title;
  @bindable labels;
  @bindable color='';
  value='';

  constructor() {

  }

  bind() {
    if (typeof this.min === 'string') this.min = parseFloat(this.min)
    if (typeof this.max === 'string') this.max = parseFloat(this.max)
    if (typeof this.step === 'string') this.step = parseFloat(this.step)
    //this.value= this.min;
    if (this.labels) {
      // Split the string into an array of pairs
      const pairs = this.labels.split(';');
    
      // Create an empty object to hold the map
      this.labelMap = {};

      // Iterate over each pair
      pairs.forEach(pair => {
        // Split the pair into key and value
        const [key, value] = pair.split(',');

        // Add the key-value pair to the labelMap
        this.labelMap[key.trim()] = value.trim();
      });      
    }
  }

  attached() {
    //this.slider    
  let that=this;
    this.slider = noUiSlider.create(this.slider,{
      range: {
        min: [this.min],
        max: [this.max],
        
      },
      step:this.step,
      start: [this.min],
      pips: {
        mode: 'steps',
        stepped: true,
        density: 10,
        format: {
            to: function(value) {
                let label = that.labelMap[value];
                return label?label:''; // Return the label corresponding to the value
            }
        }
      }
    })
    
    this.slider.on('update', (values, handle) => {
      let value = parseFloat(values[handle]);
      that.value = value;
      if (window.ri) {window.ri.setAnswerById(that.id,that.value)}
      /*this.element.dispatchEvent(new CustomEvent('change', {
        bubbles: true,
        detail: { value }
      }));*/
    });
    //set default answer
    if (window.ri) {
      //this.parent.result.setDefaultAnswer(pagenum, questionnum, '','ranking2d ' + row); //update #198 and #64
        let stimulusaudios = document.getElementsByTagName('stimulusaudio'); //determine audios in screen
        let mycase = ''
        for (let i of stimulusaudios) {
          mycase+= i.getAttribute('src')+' ';
        }
        let mytask = this.title;
        let myoptions = 'scale '+this.labels; //add tasks to options
        window.ri.setDefaultAnswerById(this.id, mycase,mytask,myoptions);        
      }
  }

  oldattached() {
    //this.slider;
    /*$('#slider1').labeledslider({
      min: -6,
      max: 8,
      tickArray: [-6, -3, 0, 3, 6, 8],
      tickLabels: {
        '-6': 'mirne',
        '-3': 'stredni',
        0: 'velke',
        3: 'vetsi',
        6: 'nejvetsi',
        8: 'NA'
      }
    });*/
    //    static makeVASlider(sliderId, sliderMin, sliderMax, myQuestionPage, sliderStep = 1) {
    //console.log("VAslider");
    //TODO set default answer for static content    
    if (window.ri) {
    window.ri.setDefaultAnswer(/*parser*/window.ii.currentPage, this.qp);
    let sliderKeysstr = Object.keys(/*parser*/window.ii.sliderValues[this.id]);
    //console.log('makeVASlider keysstr', sliderKeysstr);
    let sliderKeys = sliderKeysstr.map(Number); //fix bug #269 new version of labeledslider requires numbers
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
      tickLabels: /*parser*/window.ii.sliderValues[sliderId]
    });
  }
  }
}

