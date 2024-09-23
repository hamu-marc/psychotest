import { initializeApp } from "firebase/app";
import { PsychoApi } from "../components/psychoapi";

const STIMULIJS = `<stimulusaudio src="1.wav" type="controls" base="baseurl"></stimulusaudio>`; 
const STIMULIPREVIEWCONTROLS =`
<audio id.bind="$parent.ids[i]" controls.bind="showcontrols" class="au-target" au-target-id="13" id="audio-1.wav" controls="">
  <source class="au-target" au-target-id="14" src="https://owncloud.cesnet.cz/index.php/s/WzHVYwrX8qUdUPs/download?path=&amp;files=/1.wav" type="audio/wav">
</audio>        
`
const STIMULIPREVIEWBUTTON = `<button class="sound-button au-target" click.delegate="play($parent.ids[i])" show.bind="showbutton" au-target-id="9">play <span class="w3-tiny au-target aurelia-hide" show.bind="shownum" au-target-id="11">1</span></button>`
let baseurl;

 export const stimuligjs = (editor, options) => {
  
  baseurl = options.psychoapi.baseurl;
  console.log('grapesjs options:',options);
  console.log('grapesjs options apiurl:',options.psychoapi.apiurl);
  console.log('grapesjs baseurl:',options.psychoapi.baseurl);
  editor.DomComponents.addType('stimuli', {
    // Make the editor understand when to bind `my-input-type`
  isComponent: el => el.tagName === 'STIMULUSAUDIO',
  model: {
    init() {
      // Set up your listener here
      this.on('change:attributes', () => {
        console.log('Attributes have changed');
        this.view.render();
      });
    },
    defaults: {
      // The tag name that will be used in the final code
      tagName: 'stimulusaudio',
      droppable:false,
      attributes: { 
        src: '1.wav',
        type: 'controls',
        base: baseurl
      },
      // You would use traits to customize custom properties
      traits: [
        'src',
        'base',
        {
          type: 'select', // Type of the trait
          label: 'Type', // The label you will see in Settings
          name: 'type', // The name of the attribute/property to use on component
          options: [
            { id: 'controls', name: 'controls'},
            { id: 'button', name: 'button'}
          ]
        }        
      ]
    }
  },
  view: {
    // eg. You can customize the tag in the canvas
    // By default, the view will use the same tag of the model
    tagName: 'div',
    onRender() {
      // What the user see in the canvas is totally up to you
      // it can be a simple image as a placeholder or
      // you can make it as much close to the original markup
      const attrs = this.model.getAttributes();
      switch (attrs['type']) {
        case "controls" :
          this.el.innerHTML = STIMULIPREVIEWCONTROLS;
          break;
        case "buttons" :
          this.el.innerHTML = STIMULIPREVIEWBUTTON;
          break;
        default:
          console.warn('unknown stimulus audio type');
          this.el.innerHTML = STIMULIPREVIEWBUTTON;
      }      
    }
  }
});   

        editor.BlockManager.add('stimulusaudio', {
          label: 'STIMULUSAUDIO',
          category: 'PAVE',
          content: STIMULIJS.replace('baseurl',baseurl),
        }, {at:0});
      }
