//import grapesjs from 'grapesjs';
import grapesjs from "grapesjs/dist/grapes.min";
import $ from 'jquery';
import {grbasgjs} from './grapesjs-plugin-grbas';
import {rankinggjs} from './grapesjs-plugin-ranking2d';
//import {scalegjs} from './grapesjs-plugin-scale';
import {taskscalegjs} from './grapesjs-plugin-taskscale';
import {taskvaluesgjs} from './grapesjs-plugin-taskvalues';
import {taskeditgjs} from './grapesjs-plugin-edit';
import {stimuligjs} from './grapesjs-plugin-stimuli';
import {stimulicgjs} from './grapesjs-plugin-stimulicontainer';
//import plugintabs from 'grapesjs-tabs';
import plugingpw from 'grapesjs-preset-webpage';
import plugingbb from 'grapesjs-blocks-basic';
//import plugingpf from 'grapesjs-plugin-forms';
//import plugintyped from 'grapesjs-typed';
import {PsychoApi} from '../components/psychoapi';
import {inject} from 'aurelia-framework';
//import {Psychoapifirebase} from '../components/psychoapifirebase';

@inject(PsychoApi)
export class Editscreen {
        constructor(api) {
          this.api = api;
        }
      
  attached() {
    this.api.gjs = this;
  }

  initEditor(content){
    this.editor = grapesjs.init({
      container : this.editscreendiv,
      components: content,
      allowScripts:1,
      canvas: {
        scripts: ['jquery.min.js']
        // The same would be for external styles          
      },
      plugins: [
        grbasgjs,
        rankinggjs,
        taskscalegjs,
        taskvaluesgjs,
        taskeditgjs,
        plugingpw,
        plugingbb,
        stimuligjs
        //stimulicgjs,
        //plugingpf,
        //plugintabs
          
      ],
      pluginsOpts: {
        [taskscalegjs]: { someField:"someValue" },
        [stimuligjs]: { psychoapi:this.api },
        [grbasgjs]: { someField:"someValue" },
        [rankinggjs]: { someField:"someValue" },
        [plugingpw]: { /* options */ },
        [plugingbb]: {
        blocksBasicOpts: {
              showStylesOnChange: true,
              collapsed: true
        }
        },
//            [plugingpf]: { /* options */ },          
//            [plugintabs]: { /* options */ }            
      }
  });    
  // Function to inject the CSS into the iframe

// Listen for the canvas:ready event
this.editor.on('canvas:ready', () => {
  this.addStylesToIframe();
});

// Ensure that styles are re-applied when the content is re-rendered
this.editor.on('component:mount', () => {
  this.addStylesToIframe();
});

  //enable view components by default
  this.editor.Panels.getButton('options', 'sw-visibility').set('active', true);     
  }

  addStylesToIframe() {
    const iframe = this.editor.Canvas.getFrameEl();
    const iframeHead = iframe.contentDocument.head;
    const linkElement = iframe.contentDocument.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'w3.css'; // URL to the local static w3.css file
    iframeHead.appendChild(linkElement);
    const linkElement2 = iframe.contentDocument.createElement('link');
    linkElement2.rel = 'stylesheet';
    linkElement2.href = 'heads.css'; // URL to the local static w3.css file
    iframeHead.appendChild(linkElement);
  }
  

  getHtml(){
    if (!this.editor) this.initEditor(''); //TODO this will set base url for gjs first time test
    return this.editor.getHtml();
  }
  getCss() {
    if (!this.editor) this.initEditor(''); //TODO this will set base url for gjs first time test
    return this.editor.getCss();
  }

  setComponents(content){
    //console.log('gjs editor set content:',content);
    if (!this.editor) this.initEditor(content); //TODO this will set base url for gjs first time test    
    else this.editor.setComponents(content);
  }
  setStyle(style){
    if (!this.editor) this.initEditor(''); //TODO this will set base url for gjs first time test    
    else this.editor.setStyle(style);
  }
}