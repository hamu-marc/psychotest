import 'ace-builds';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/snippets/text.js';
import './pdsl-mode';
//slider for scale
import '../viewer/jquery-global';
import '../viewer/jquery-label';
import {json} from 'aurelia-fetch-client';
import {PsychoApi} from '../components/psychoapi';
import {inject} from 'aurelia-framework';
import {Interpreter} from '../components/interpreter';
import jQuery from 'jquery';
import { PsychotestInterpreter } from '../struct/testscreenelement.js';

@inject(PsychoApi)
export  class Edittest {
  virtualfolder = [];
  currentsource='';
  currentfolder='';
  constructor(api) {
    this.api = api;
    this.showfiles = false;
    this.uploadfiles = false;
    this.previewtype = 'thiswindow';
    this.preview2 = false;
    this.mydefinition2 = {'number': 1, 'of': 5, rows: [
      {'isstimulus': true, 'iswaveform': true, 'src': 'stimuli/1.wav', 'id': 'audio0', 'type': 'audio/wav'},
      {'isstimulus': true, 'iscontrols': true, 'src': 'stimuli/2.wav', 'id': 'audio1', 'type': 'audio/wav'},
      {'isstimulus': true, 'iswaveform': true, 'src': 'stimuli/3.wav', 'id': 'audio2', 'type': 'audio/wav'}
    ]};
    this.previewinnerHTML = '';
  }

  activate(params, routeConfig) {
    this.okmessage = '';
    this.errormessage = '';
    //console.log('activated testdefinition:', this.api.testdefinition);
    this.testid = params.id;
    this.testsource = params.source;
    this.testpath = params.path;
    this.testdefinition = params.testdef;
    console.log('activated with params', params.id, params.source, params.path, params.testdef);
    //this.editor.focus();
    //set cursor on row 1
    //this.editor.
    //read test definition if all params are defined
    //this.screentemplate = this.api.encodeGjs();
    //console.log('screentemplate',this.screentemplate);
  }

  logerror(message) {
    let date = new Date().toLocaleTimeString();
    this.okmessage2 = this.okmessage;
    this.okmessage = ''; this.errormessage = date + ': ' + message;
  }
  logok(message) {
    let date = new Date().toLocaleTimeString();
    this.okmessage2 = this.okmessage;
    this.okmessage = date + ': ' + message;
  }
  logempty() {
    this.okmessage2 = '';
    this.okmessage = ''; this.errormessage = '';
  }

  attached() {
    window.$ = window.jQuery = jQuery;
    //console.log('attached 2');
    //console.log('attached 2 testdefinition:', this.api.testdefinition);
    //console.log('attached 3 testdefinition:', this.api.testdefinition);
    ace.require('ace/ext/language_tools');
    this.editor = ace.edit('editor', {
      mode: 'ace/mode/pdsl',
      theme: 'ace/theme/dracula',
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: false,
      showPrintMargin: false,
      wrap: true,
      maxLines: 30,
      minLines: 30,
      fontSize: 16
    });
    //enable folding on design
    // Define a custom fold style for lines starting with 'design' keyword
    this.editor.session.foldStyle = "markbegin";

    // Call the custom fold matching function initially and whenever the content changes
    this.editor.on("change", this.foldMatchingLines.bind(this));
    this.foldMatchingLines();

    //rest
    if (this.api.testdefinition) { //previous content was saved
      //and current editor is empty, set previous content
      //console.log('editor value length:', this.editor.getValue().length);
      if (this.editor.getValue().length === 0) {
        this.editor.setValue(this.api.testdefinition);
        this.editor.gotoLine(1,0,true);
      }
    }
    if (this.testid && this.testsource) {
      this.logok('Načítání souboru ...' + this.testid); this.loading = true; this.backuptestid = this.testid;
      this.api.initLocalStorage()
        .then(() =>{
          this.api.getTestDefinition(this.testid, this.testsource, this.testpath)
            .then(data =>{
              if (this.editor) {
                this.editor.setValue(data);
                this.editor.gotoLine(1,0,true);
              }
              else this.api.testdefinition = data;
              this.api.baseurl = this.api.getStimuliBaseUrl(this.testid, this.testsource, this.testpath);
              this.logok('Nahrán soubor ' + this.testid);
              this.loading = false;
            })
            .catch(error=>{
              console.log('edittest activate error,', error);
              this.loading = false;
              //if it does not exist - expect the first line of testdef sent in params
              if (this.testdefinition) {
                if (this.editor) { 
                  this.editor.setValue(this.testdefinition);
                  this.editor.gotoLine(1,0,true);
                }
                else this.api.testdefinition = this.testdefinition;
                this.api.baseurl = this.api.getStimuliBaseUrl(this.testid, this.testsource, this.testpath);
                this.api.putTestDefinition(this.testid, this.testsource, this.testpath, this.testdefinition)
                  .then(x=>{
                    console.log('put result:', x);
                    this.logok('Vytvořen soubor ' + this.testid + '.');
                  })
                  .catch(e=>{
                    console.log('put result:', e);
                    this.logerror('Chyba při vytváření souboru ' + this.testid + ' v datovém uložišti ' + this.testsource + '.');
                  });
              } else {
                console.log('error', error);
                //alert('Error retrieving test id:' + this.testid + ' from source:' + this.testsource + ' path:' + this.testpath);
                this.logerror('Chyba při otvírání/vytváření souboru ' + this.testid);
              }
            });
        });
    }
    const stimulifileregexp = /\.[Ww][Aa][Vv]|\.[Mm][Pp][34]|\.[Jj][Pp][Gg]|.[Pp][Nn][Gg]|\.[Oo][Gg][Gg]|\.[Tt][Xx][Tt]/;
    if (this.api.cachedtests) {this.files = this.api.cachedtests.filter(item2 => (stimulifileregexp.test(item2._id)));} else {
      this.api.initLocalStorage()
        .then(x =>{
          this.api.getTests(this.testsource, this.testpath)
            .then(data => {
              //this.firstupdir();
              this.files = [];
              this.files.push.apply(this.files, data.filter(item2 => (item2.isdir || stimulifileregexp.test(item2._id))));
              this.api.cachedtests = data;
            });
        });
    }    
    this.editor.focus();
    this.editor.gotoLine(1,0,true);
  }

  detached() {
    console.log('edittest.detached()');
    this.api.testdefinition = this.editor.getValue().slice();
    //console.log('testdefinition:', this.api.testdefinition);
    this.editor.destroy();
  }

      // Create a custom fold matching function
   foldMatchingLines() {
        let session = this.editor.session;
        if (session) {
        let lines = session.getLines(0, session.getLength());
    
        // Loop through all lines
        for (let i = 0; i < lines.length; i++) {
          let line = lines[i];
      
          // Check if the line starts with the 'design' keyword
          if (line.trim().startsWith("design")) {
            // Fold the line
            //session.foldall(i, i,'markbegin');
            session.addFold("...", new ace.Range(i, line.indexOf('design')+7, i, Infinity));
          }
        }
        }
      }
    
    findScreenDesign() {
      let session = this.editor.session;
      if (session) {
      let lines = session.getLines(0, session.getLength());
  
      // Loop through all lines
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
    
        // Check if the line starts with the 'design' keyword
        if (line.trim().startsWith("design")) {
          // Fold the line
          //session.foldall(i, i,'markbegin');
          session.addFold("...", new ace.Range(i, line.indexOf('design')+7, i, Infinity));
        }
      }
      }

    }  
  

  generatepreview() {
    //take cursor position, extract what is between previous screen and next screen
    this.showpreview = true; this.showstimuli = false; this.showreference = false; this.showurl = false;
    this.showpreview2 = false;
    let range = this.extractScreenInCursor();
    //and render everything in the range
    this.itp = new Interpreter(this);
    //    this.hideNonAnswered();
    this.itp.initTest(range);
    // fix baseurl for preview
    this.itp.setBase(this.api.baseurl);

    if (this.previewtype === 'popup') {
      this.popup = window.open('', 'msgwindow', 'toolbar=no,scrollbars=yes,resizable=yes,top=100,left=100,width=1024,height=768');
      this.popup.document.write(this.itp.nextpage());
      //TODO is evaluatescripts needed???
      this.popup.document.onload = function() {
        console.log('evaluating popup window scripts');
        let codes = document.getElementsByTagName('script');
        for (let i = 0; i < codes.length; i++) {
          eval(codes[i].text);
        }
      };
    } else {
      //this.preview.innerHTML = this.itp.nextpage();//parser.currentTest);
      this.previewinnerHTML = this.itp.nextpage();//parser.currentTest);
      this.mydefinition = this.itp.nt;
      //console.log(document.getElementById('preview').innerHTML);
      this.itp.evaluateScripts();
    }
  }

  extractScreenInCursor() {
    this.api.testdefinition = this.editor.getValue().slice();
    let cursor = this.editor.getCursorPosition();
    console.log('generatepreview()', cursor);
    let lines = this.editor.session.getDocument();
    let maxrows = lines.getLength();
    let rangestart = 0;
    for (let i = cursor.row; i > 0; i--) {
      let line = lines.getLine(i).slice();
      if (line.trim().startsWith('screen')) {
        rangestart = i;
        break;
      }
    }
    let rangestop = maxrows;
    for (let i = cursor.row + 1; i < maxrows; i++) {
      let line = lines.getLine(i).slice();
      if (line.trim().startsWith('screen')) {
        rangestop = i;
        break;
      }
    }
    return 'test preview \n' + lines.getLines(rangestart, rangestop - 1).join('\n');
  }

  viewtest() {
    let encid = this.api.getTestEncId(this.testid, this.testsource, this.testpath);
    console.log('viewtest enc,testid,testsource,testpath:', encid, this.testid, this.testsource, this.testpath);
    this.popup = window.open('index.html#/performtest/mode/debug/' + encid, 'msgwindow', 'toolbar=no,scrollbars=yes,resizable=yes,top=100,left=100,width=1024,height=768');
  }

  //needs to be implemented by itp
  firstPage() {}
  lastNoPrevPage() {}

  /**
   * Saves currently edited document to API
   */
  save() {
    //this.api.testdefinition = this.editor.getValue().slice();
    //replace testid on the first row
    let line1 = this.editor.session.getDocument().getLine(0);
    let name = line1.slice(5).trimEnd();
    if (name !== this.testid) {
      //replace testid on the first row
      this.editor.session.replace(new ace.Range(0, 0, 0, line1.length), 'test ' + this.testid);
    }
    //let rows = this.testdefinition.split('\n');
    //rows[0] = 'test ' + this.testid;
    //this.testdefinition = rows.join('\n');
    //let name = this.editor.session.getDocument().getLine(0).slice(5);
    this.testdefinition = this.editor.getValue();
    //save to storage
    this.api.putTestDefinition(this.testid, this.testsource, this.testpath, this.testdefinition)
      .then(x=> {this.logok('Soubor ' + this.testid + ' uložen.');})
      //on error restore old file-name - testid from backup variable
      .catch(e=>{this.logerror('Chyba při ukládání ' + this.testid + ' soubor neuložen'); this.testid = this.backuptestid;});
    //this.api.saveTest(this.editor.getValue(), name);
    //.then(x=> {console.log('saved succesfully');});
  }

  saveas() {
    let filename = prompt('File name (*.ptest):', this.testid);
    if (filename) {
      this.backuptestid = this.testid;
      this.testid = filename;

      this.save();
    }
  }

  upload() {
    this.uploadfiles = !this.uploadfiles;
    //console.log('uploading files:', this.uploadfiles);
  }
  download() {
    if (this.showfiles) {
      this.showfiles = false;
      return;
    }
    let definition = this.editor.getValue();
    //console.log('line1', this.editor.session.getDocument().getLine(0));
    let name = this.editor.session.getDocument().getLine(0).slice(5);
    let data = new Blob([definition], {type: 'text/plain'});
    this.downloadtxt = window.URL.createObjectURL(data);
    this.nametxt = name + '.ptest';
    let datajson = new Blob([
      json({id: this.api.testid, name: name, definition: definition})
    ], {type: 'application/json'});
    this.downloadjson = window.URL.createObjectURL(datajson);
    this.namejson = name + '.json';
    this.showfiles = true;
  }

  downloadcomplete() {
    this.showfiles = false;
    return true;
  }

  dragNdrop(event) {
    //const self = this;
    //let fileName = URL.createObjectURL(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = this.handleFileLoad;
    reader.readAsText(event.target.files[0]);
  }

  handleFileLoad(event) {
    this.editor.setValue(event.target.result);
    this.uploadfiles = false;
  }

  drag() {
    const self = this;
    self.isDragging = true;
  }

  drop(event) {
    const self = this;
    self.isDragging = false;
    self.dragNdrop(event);
  }

  create() {
    let d = new Date();
    let s = '-' + d.getFullYear() + '-' + d.getMonth() + '-' + d.getDay() + '-' + d.getMilliseconds();
    this.testid = 'new' + s + '.ptest';
    //this.api.source = '';
    this.api.testdefinition = 'test [name]';
    this.editor.setValue(this.api.testdefinition);
  }

  generatepreview2() { //generate new preview
    let range = this.extractScreenInCursor();//
    console.log('generatepreview2 for ', range);
    this.showpreview2 = true;
    this.showpreview = false;
    this.mydefinition = range;
  }

  quickhelp() {
    this.showpreview = false; this.showstimuli = false; this.showreference = true; this.showurl = false;
  }
  showstimulilist() {
    this.showpreview = false; this.showstimuli = true; this.showreference = false; this.showurl = false;
  }
  openstimuli(filename) {
    this.editor.insert('  stimulus ' + this.currentsource + this.currentfolder + filename + '\n');
  }

  showtesturl() {
    this.showpreview = false; this.showstimuli = false; this.showreference = false; this.showurl = true;
    //this.testurl=
    let encid = this.api.getTestEncId(this.testid, this.testsource, this.testpath);
    let urlpart = window.location.href.substring(0, window.location.href.indexOf('editor.html'));
    this.testurl = urlpart + '#/performtest/' + encid; //index.html redundant
    this.directtesturl = urlpart + '#/directtest/' + encid; //index.html redundant
  }

  copyurlclipboard() {
    if (this.testurlinput) {
      this.testurlinput.select();
      this.testurlinput.setSelectionRange(0, 9999);
      document.execCommand('copy');
    }
  }

  copydirecturlclipboard() {
    if (this.directtesturlinput) {
      this.directtesturlinput.select();
      this.directtesturlinput.setSelectionRange(0, 9999);
      document.execCommand('copy');
    }
  }


  rootdir() {
    this.files = [];
    //console.log('dashboard rootdir()');
  }

  firstupdir() {
    this.files = [];
    this.files.push({
      isdir: true,
      name: '..',
      snippet: '',
      _id: '..',
      _updated: '',
      source: '',
      size: 'UP-DIR'
    });
  }

  opendir(item) {
    this.isloading = true;
    if (item.name === '..') {//updir
      let current = this.virtualfolder.pop();
      this.isRoot = this.virtualfolder.length === 0;
      if (!this.isRoot) {
        //take the last folder
        this.currentfolder = this.virtualfolder[this.virtualfolder.length - 1].fullPath;
        this.currentsource = this.virtualfolder[0].name;
        current = this.virtualfolder[this.virtualfolder.length - 1];
        this.firstupdir();
        //read updir
        this.loadDirectoryContent(current);
      } else {
        this.currentfolder = '';
        this.currentsource = '';
        this.rootdir();
        item.fullPath = '';
        this.loadDirectoryContent(item);
        //this.isloading=false;
      }
    } else { //downdir
      item.fullPath = this.virtualfolder.length > 0 ? this.virtualfolder[this.virtualfolder.length - 1].fullPath + '/' + item.name : '';
      this.virtualfolder.push(item);
      this.isRoot = this.virtualfolder.length === 0;
      this.currentfolder = (this.virtualfolder.length > 0) ? item.fullPath : '';
      this.currentsource = this.virtualfolder[0].name;
      this.firstupdir();
      //read downdir
      this.loadDirectoryContent(item);
    }
  }

  loadDirectoryContent(item) {
    const stimulifileregexp = /\.[Ww][Aa][Vv]|\.[Mm][Pp][34]|\.[Jj][Pp][Gg]|.[Pp][Nn][Gg]|\.[Oo][Gg][Gg]|\.[Tt][Xx][Tt]/;
    this.api.getTests(this.testsource, this.virtualfolder[0] ? this.virtualfolder[0].name : '' + item.fullPath)
      .then(data => {
        //if not root - then add ..
        if (this.virtualfolder[0]) this.firstupdir();
        this.files.push.apply(this.files, data.filter(item2 => (item2.isdir || stimulifileregexp.test(item2._id))));
        //this.numberresults = data.filter(x => x.name.endsWith('.presult')).length;
        this.api.cachedtests = data;
      })
      .finally(() => {
        this.isloading = false;
        //console.log('dashboard tests:',this.tests)
      });
  }

  refresh() {
    if (this.virtualfolder.length > 0) {
      this.isloading = true;
      let current = this.virtualfolder[this.virtualfolder.length - 1];
      this.loadDirectoryContent(current);
    }
  }

  addtemplate() {
    const template = this.api.encodeGjs();
    /*if (template) {
      this.editor.insert('\n  design ' + template);
      let cursor = this.editor.getCursorPosition();
      //add folds for design
      this.addfold(cursor);  
      this.editor.insert('\n');
    }
    else this.logerror('empty design, create first in Design Tab');
    */
  }

  addfold(cursor) {
    this.editor.session.addFold("...", new ace.Range(cursor.row,9,cursor.row,Infinity));
  }
  addfolds() {
    //go through all lines and add folds to "design"
    let cursor = this.editor.getCursorPosition();
  }
  togglewrap(){
    this.editor.session.setOption("wrap",!this.editor.session.getUseWrapMode());
    this.editor.renderer.scrollCursorIntoView();
  }

  designrow ='';
  emptyDesign = 'DwIw9gJgngBAlhAvAIjgawMZ2QPmAenGhyA=';
  emptyDesign2 = 'DwIw9gJgngfMD05oyA==';

  pi = new PsychotestInterpreter();
  test = null;
  testscreens = [];
  currentScreen = null;

  showgrapesjs(){
    //detect design in current screen
    this.api.testdefinition = this.editor.getValue().slice();
    let cursor = this.editor.getCursorPosition();
    let lines = this.editor.session.getDocument();
    this.test = this.pi.parseTestDefinition(lines.getAllLines());
    this.testscreens =this.test.screens;

    //current position of cursor 
    //cursor.row;
    
    let myscreen = this.pi.findScreenByCursor(cursor.row);
    if (myscreen) {
      myscreen.selected = true;
      let designrow = myscreen.getDesign();
      this.grapesjsview = true;
      //let myscreen = this.pi.findScreenByCursor(cursor.row);
      this.currentScreen = null;
      if (myscreen) this.showgrapesjsScreen(myscreen)
      //designrowcopy = this.designrow.trim().slice(7); //remove 'design '
      //if (designrow) this.api.decodeGjs(designrow);    //will decode and set gjs the html content 
      //else this.api.decodeGjs(this.emptyDesign);
    } else {
      this.api.decodeGjs(this.emptyDesign);
    }
    
    return    
  }

  showgrapesjsScreen(screen){
    let gjsel = document.querySelector('.gjs-cv-canvas')
    if (gjsel) gjsel.style.pointerEvents = 'auto';
    //if some previous screen was selected, then encode it to 'design' row
    if (this.currentScreen) {
      this.currentScreen.selected = false;
      if (!this.currentScreen.grapesjsreadonly) {
        const template = this.api.encodeGjs();
        if ((template != this.emptyDesign) && (template !==this.emptyDesign2)) this.currentScreen.setDesign(template)
      }
    }
    //this.currentScreen = this.pi.findScreenByCursor(cursor.row);
    this.currentScreen = screen;
    //if screen is defined, then get design row and definition or generate preview    
    if (this.currentScreen) {
      this.currentScreen.selected = true;
      let designrow = this.currentScreen.getDesign();
      //designrowcopy = this.designrow.trim().slice(7); //remove 'design '
      if (designrow) {
        this.api.decodeGjs(designrow);    //will decode and set gjs the html content 
        //this.grapesjsreadonly = false;
        this.currentScreen.grapesjsreadonly = false;
        this.removeReadOnlyNotification();
      } else {
        //empty design row, try to render preview
        let preview = this.currentScreen.getPreview();
        //detect empty questions
        const emptypreview = preview.includes("<div class='task' id='questions'>\n</div>");
        //nothing is defined in text mode
        if (emptypreview) {
          this.api.decodeGjs(this.emptyDesign);
          //this.grapesjsreadonly = false;
          this.currentScreen.grapesjsreadonly = false;
          this.removeReadOnlyNotification();        
        } else {
          //something is defined in text mode
          //it is read only - show preview of text definition
          this.api.setGjsHtml(preview);
          document.querySelector('.gjs-cv-canvas').style.pointerEvents = 'none';
          //this.grapesjsreadonly = true;
          this.currentScreen.grapesjsreadonly = true;
          // To change the background color of the canvas to gray
          document.querySelector('.gjs-cv-canvas').style.backgroundColor = 'lightgray';
          this.addReadOnlyNotification();
          //this.grapesjsreadonly = true;
        }
      }
    } else {
      this.api.decodeGjs(this.emptyDesign);
      this.currentScreen.grapesjsreadonly = false;
      this.removeReadOnlyNotification();        
}
    this.grapesjsview = true;  
  }
  addReadOnlyNotification() {
    const editorContainer = document.querySelector('.gjs-editor'); // Adjust selector as needed
    let notificationBar = document.getElementById('gjs-read-only-notification');
    if (!notificationBar) {
      const notificationBar = document.createElement('div');
      notificationBar.setAttribute('id', 'gjs-read-only-notification');
      notificationBar.textContent = 'Design defined in text mode. Showing preview only.'//'Navrh definovan v textovem modu. Pouze nahled.';
      notificationBar.style.cssText = 'background-color: #ffcc00; color: black; text-align: center; padding: 10px; position: absolute; width: 100%; z-index: 9999;';
      editorContainer.prepend(notificationBar);
    }
  }
  
  removeReadOnlyNotification() {
    let notificationBar = document.getElementById('gjs-read-only-notification');
    if (notificationBar) {
      notificationBar.parentElement.removeChild(notificationBar);
      //notificationBar.remove();
    }
  }  

  hidegrapesjs(){
    this.grapesjsview = false;
    if (!this.currentScreen) return; // no screen is selected
    
    //sets only current screen
    const template = this.api.encodeGjs();
    if (!this.currentScreen.grapesjsreadonly && ((template !== this.emptyDesign) && (template !==this.emptyDesign2))) this.currentScreen.setDesign(template)

    this.editor.setValue(this.pi.createTestDefinition());    
    this.editor.focus();    
    //else this.logerror('empty design, create first in Design Tab');    
  }
}
