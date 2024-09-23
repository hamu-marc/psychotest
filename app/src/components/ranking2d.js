import {bindable,observable} from 'aurelia-framework';
//import {bindable} from 'aurelia-framework';

//window.psychotestresult  - store global results
//window.psychotest - store test configuration

export class Ranking2d {  
  audiocount = 0;
  @bindable title='ranking';
  @bindable random = false;
  @bindable width;
  @bindable xlabel = 'x axis';
  @bindable ylabel = 'y axis';
  @bindable id;
  @observable edu; //string in form [audio1]10,5|[audio2]5,10|[audio3]2,2
  xy; //array of position of educational values to show in form xy =[{x: 10,y:20},..]
  //@bindable elementwidth;
  maxaudioid=0;
  ELEMENTWIDTH = 50;
  ymax = 400;

  constructor() {
  }

  bind(){
//??    this.parent = parent;
    this.ymax = 400; //max of y in "serad" svg graph
    this.audiocount = document.getElementsByTagName('audio').length; //determine audios in screen
    this.maxaudioid = this.audiocount;
   
    window.ranking2d = this;
  /*if (this.audiocount) {
      this.maxaudioid = parseInt(this.audiocount,10);
    }*/

    if (typeof this.random === 'string') {
      this.random = (this.random === 'true')    
    } else {
      //TODO detect random from previous setting
      //(window.psychotest.poradivnticinahodne || window.psychotest.poradizvukunahodne)
    }
    if (typeof this.width === 'string') {
      this.ELEMENTWIDTH = parseInt(this.width,10);
    }
    this.inited = false;
    this.ymax = this.maxaudioid * this.ELEMENTWIDTH + 20;
    //this.result = window.result;
    if (!this.xy && this.random) this.mapaudio = this.generateRandomArray(this.maxaudioid);
    else this.mapaudio = this.generateNonRandomArray(this.maxaudioid);
    //initialize audioinfo - rendered in screen
    this.audioinfo = [];
    for (let i=0;i<this.maxaudioid;i++){
      let myaudio = {
        x:0,
        y:i*this.ELEMENTWIDTH,
        title:'audio '+(i+1),
        id:this.mapaudio[i],
        textindex:i+1,
        index:i}
      this.audioinfo.push(myaudio);
    }
    //educational balls
    this.edaudioinfo = []
    if (this.edu && this.edu.length>0) {   
      //parse xy
      let xy =this.parsexy(this.edu)
      for (let i=0;i<this.maxaudioid;i++){
        if (i<xy.length) {
        let myaudio = {
          x:xy[i].x,
          y:this.ymax - xy[i].y, //i*this.ELEMENTWIDTH,
          title:'audio '+(i+1),
          id:this.mapaudio[i],
          textindex:(i+1),
          index:xy[i].index}
        this.edaudioinfo.push(myaudio);
        }
      }
    }
  }

  eduChanged(newValue, oldValue) {
    // This function will be triggered whenever the 'edu' attribute changes
    console.log('edu changed from', oldValue, 'to', newValue);
    //this.someFunction(newValue); // Call your desired function
    //educational balls
    this.edaudioinfo = []
    if (newValue && newValue.length>0) {   
      //parse xy
      let xy =this.parsexy(newValue)
      for (let i=0;i<this.maxaudioid;i++){
        if (i<xy.length) {
        let myaudio = {
          x:xy[i].x,
          y:this.ymax - xy[i].y, //i*this.ELEMENTWIDTH,
          title:'audio '+(i+1),
          textindex:(i+1),
          id:this.mapaudio[i],
          index:xy[i].index}
        this.edaudioinfo.push(myaudio);
        }
      }
    }
  }

  parsexy(value) {
    let audios = value.split('|');
    let audiostr = [] //audiostructure with position
    for (let a of audios) {
      let aitem = a.split(/[\[\],]/g); //separator is reg expression [],
      audiostr.push({index:aitem[1],x:aitem[2],y:aitem[3]}); //FIX y: maxy - aitem[3]
    }
    return audiostr; 
    //const svgels = '<g xmlns="http://www.w3.org/2000/svg">'+this.ranking2d.generateSoundBall(audiostr.length,0,0,audiostr)+'</g>';
    //console.log('highlightsvg:',svgels);
    //let eduballs = new DOMParser().parseFromString(svgels,"image/svg+xml");
    //dom.appendChild(eduballs.documentElement);
    
  }


  attached(){
    if (window.ri) {
    //this.parent.result.setDefaultAnswer(pagenum, questionnum, '','ranking2d ' + row); //update #198 and #64
      let stimulusaudios = document.getElementsByTagName('stimulusaudio'); //determine audios in screen
      let mycase = ''
      for (let i of stimulusaudios) {
        mycase+= i.getAttribute('src')+' ';
      }
      let mytask = this.title;
      let myoptions = 'ranking2d '+this.xlabel+';'+this.ylabel; //add tasks to options
      window.ri.setDefaultAnswerById(this.id, mycase,mytask,myoptions);
      
    }
    console.log('ranking2d.attached() ref', this.rankingel);      
  }

  generateNonRandomArray(n) {
    let a = [];
    for (let i = 0; i < n; i++) {
      a[i] = i;
    }
    return a;
  }
  
  generateRandomArray(n) {
    let a = this.generateNonRandomArray(n);
    let b = [];
    for (let j = 0; j < n; j++) {
      let k = Math.floor(Math.random() * (n - j));
      b[j] = a[k];
      a.splice(k, 1);
    }
    return b;
  }//returns a[0] ..a[1-n] = k where k from 0 to 1-n
  
  play(aid){
    console.log('playing ',aid)
    document.getElementsByTagName('audio')[aid].play();
  }

  /*mouseMove(evt){
  }

  mouseUp(evt){
  }*/

  /*contextMenu(evt,aid) {
    return false;
  }*/

/*
    defaultSVG1 = `<div id="rankingmodal" class="w3-modal w3-small" oncontextmenu="return false;">
    <div class="w3-modal-content w3-small">
     <header class="w3-container w3-teal">
        <span onclick="document.getElementById('rankingmodal').style.display='none'"
        class="w3-display-topright w3-btn w3-padding-4">&times;</span>
        <span onclick="ranking2d.submitAnnotation(); document.getElementById('rankingmodal').style.display='none'"
        class="w3-display-bottomright w3-btn w3-padding-4">submit</span>
        <b>anotace stimulu <span id="annotationtitle">...</span></b>
      </header>
      <div class="w3-container">
        <textarea class="w3-input w3-border" id="annotationcontent"></textarea>
      </div>
    </div>
  </div><div oncontextmenu="return false;"><svg width="100%" height="100%" version="1.1" viewBox="-10 0 800 200" style="border-style:solid;border-width:1px;"
  xmlns="http://www.w3.org/2000/svg" 
  xmlns:xlink="http://www.w3.org/1999/xlink"
  onload="ranking2d.init('ball',1)"`;
    defaultSVG11 = `
  onmouseup="ranking2d.mouseUp(evt,1,1)"
  onmousemove="ranking2d.mouseMove(evt)" 
  >
  `;
    defaultSVGball1 = `
  <g id="ball0" dragy="0"
  dragx="0" onmouseup="ranking2d.contextMenu(evt);return false;" onmouseover="ranking2d.highlight(0)"`
    defaultSVGball11 = `
  transform="translate(0,0)">
  <rect style="opacity:0.50000000000000000;fill:#acd8e6;stroke:#000000;stroke-width:2;fill-opacity:1;stroke-opacity:1"
  height="18"
  width="40"
  ry="9"
  rx="9"
  id="ball"
  x="0"
  y="0" 
  />`;
    defaultSVGball2= `
  <path style="fill:#c0c0c0;fill-opacity:1;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 21,3 l 15,5 -15,5 0,-10 z" id="path3792" onclick="document.getElementsByTagName('audio')[0].play();" />
  <title>audio[0]</title><text x="4" y="11" font-size="10" fill="black" style="pointer-events: none;">label[0]</text> 
  </g>  `;
    defaultSVG2 = `
  <text id="descx" x="0" y="149" font-size="16" fill="black" style="pointer-events: none;">&#8594; descX &#8594;</text>
  <text id="descy" x="0" y="141" font-size="16" fill="black" style="pointer-events: none;" transform="rotate(270,0,141)">&#8594; descY &#8594;</text>
  </svg></div>`
  */
    ELEMENTWIDTH = 50;
  
    /*constructor(parent) {
      this.parent = parent;
      this.ymax = 400; //max of y in "serad" svg graph
      window.ranking2d = this;
    }*/
    //create inner SVG element, where each sound is presented as a draggable icon, recounts size in contrast to default svg
    /*translateSerad2d(row, maxaudioid, pagenum, questionnum) {    
  
      let rowsplitted = row.split(/[;]+/);
      if (rowsplitted.length>2) this.ELEMENTWIDTH = parseFloat(rowsplitted[2],10);
      this.inited = false;
      //let audios = document.getElementsByTagName(('audio'));
      //let maxaudioid = audios.length;
      this.maxaudioid = maxaudioid;
      this.ymax = maxaudioid * this.ELEMENTWIDTH + 20;
      this.parent.result.setDefaultAnswer(pagenum, questionnum, '','ranking2d ' + row); //update #198 and #64
      let svgsuffix = rowsplitted.length > 1 ? this.defaultSVG2.replace('descX', rowsplitted[0]).replace('descY', rowsplitted[1]) : this.defaultSVG2;
      let svgsuffix2 = svgsuffix.replace('y="149"', 'y="' + (this.ymax - 2) + '"').replace(/141/g, (this.ymax - 9));
      return this.defaultSVG1.replace('ranking2d.init(\'ball\',1)', 'ranking2d.init(\'ball\',' + maxaudioid + ')').replace('viewBox="-10 0 800 200"', 'viewBox="-10 0 800 ' + (this.ymax) + '"')
        + this.defaultSVG11.replace('ranking2d.mouseUp(evt,1,1)', 'ranking2d.mouseUp(evt,' + pagenum + ',' + questionnum + ')')
        + this.generateSoundBall(maxaudioid,pagenum,questionnum)
        + svgsuffix2;//rowsplitted.length>1 ? this.defaultSVG2.replace("descX",rowsplitted[1]).replace("descY",rowsplitted[2]) : this.defaultSVG2;
    }*/
  
    generateNonRandomArray(n) {
      let a = [];
      for (let i = 0; i < n; i++) {
        a[i] = i;
      }
      return a;
    }
  
    generateRandomArray(n) {
      let a = this.generateNonRandomArray(n);
      let b = [];
      for (let j = 0; j < n; j++) {
        let k = Math.floor(Math.random() * (n - j));
        b[j] = a[k];
        a.splice(k, 1);
      }
      return b;
    }//returns a[0] ..a[1-n] = k where k from 0 to 1-n
  
    //for each sound generates an interactive SVG element
/*    generateSoundBall(maxaudioid,pagenum,questionnum,xy) {
      //console.log('maxaudioid:' + maxaudioid);
      let soundBall = '';
      this.mapaudio = [];
      //let maxaudioid = audios.length;
      //fix #64 randomstimuli + randomintupple should cause random mapping
      if (!xy && (this.parent.tstate.poradivnticinahodne || this.parent.tstate.poradizvukunahodne)) this.mapaudio = this.generateRandomArray(maxaudioid);
      else this.mapaudio = this.generateNonRandomArray(maxaudioid);
  
  
      for (let i = 0; i < maxaudioid; i++) {
        if (!xy) {
          soundBall += this.defaultSVGball1.replace('id="ball0" dragy="0"', 'id="ball' + i + '" dragy="' + i * this.ELEMENTWIDTH + '"').replace('contextMenu(evt)','contextMenu(evt,'+pagenum+','+questionnum+')').replace('ranking2d.highlight(0)','ranking2d.highlight('+(this.mapaudio[i])  +')');
        } else {
          soundBall += this.defaultSVGball1.replace('id="ball0" dragy="0"', 'id="balle' + i + '" dragy="' + i * this.ELEMENTWIDTH + '"').replace('ranking2d.highlight(0)','ranking2d.highlight('+(this.mapaudio[i])  +')');  
        }
        //if (ns) soundBall += 'xmlns="http://www.w3.org/2000/svg"'
        if (xy) {
          soundBall += this.defaultSVGball11.replace('translate(0,0)', 'translate('+xy[i].x+','+xy[i].y+ ')').replace('#acd8e6','#ffeeaa');
        } else {
          soundBall += this.defaultSVGball11.replace('translate(0,0)', 'translate(0,' + i * this.ELEMENTWIDTH + ')');
        }
        soundBall += this.defaultSVGball2.replace(/\[0\]\.play/g, '[' + (this.mapaudio[i]) + '].play')
                                         .replace(/audio\[0\]/g, 'stimul[' + (this.mapaudio[i]+1) + ']')
                                         .replace(/label\[0\]/g, '' + (this.mapaudio[i]+1) + '');
        //fix #64 - title stimul_1 ..stimul_n, but playing audio[0] .. audio[n-1]
      }
      return soundBall;
    }
*/
  
    //draggable part inspired by http://www.codedread.com/dragtest2.svg
    inspect(obj) {
      let str = new Array();
      let element = null;
      for (element in obj) { str[str.length] = element; }
      str.sort();
      alert(obj + ':' + str.join(' '));
    }
  
    draggingElement = null;
    nMouseOffsetX = 0;
    nMouseOffsetY = 0;
  
    mouseDown(evt,aui) {
      //let target = evt.currentTarget;
      this.draggingElement = aui;
      console.log('ranking2d mousedown', aui,evt);
      
        let p = document.getElementsByTagName('svg')[0].createSVGPoint();
        p.x = evt.clientX;
        p.y = evt.clientY;
  
        let m = this.getScreenCTM(document.getElementsByTagName('svg')[0]);
  
        p = p.matrixTransform(m.inverse());
        this.nMouseOffsetX = p.x - (parseInt(aui.x, 10) || 0);
        this.nMouseOffsetY = p.y - (parseInt(aui.y, 10) || 0);
        if (this.nMouseOffsetX > 61 && this.nMouseOffsetX < 91) this.play(aui.id);
      
    }
  
    getDraggablePositions() {
      let positions = '';
      let draggable = this.rankingel.getElementsByTagName('g');
      for (let i = 0; i < draggable.length; i++) {
        positions += ('audio['+(this.mapaudio[i]+1)+']'+
          Math.round(parseFloat(draggable[i].dragx)) + ',' +
          Math.round(this.ymax - parseFloat(draggable[i].dragy))) +
          (((i+1) < draggable.length)?'|':'');
          //FIXED x = dragx, inverted y = ymax - dragy 
      }
  
      return positions;
    }
  
    mouseUp(evt, pageNum, questionNum) {
      console.log('ranking2d mouseup', pageNum, questionNum)
      this.draggingElement = null;
      let value = this.getDraggablePositions();
      //sets value
      if (window.ri)
        //window.ri.(pageNum, questionNum, value);
        window.ri.setAnswerById(this.id, value); //update #198 and #64
  
      this.nMouseOffsetX = 0;
      this.nMouseOffsetY = 0;
    }
  
    mouseMove(evt) {
      /*if (!ranking2d.draggingElement) {
        //try to init
        ranking2d.init('ball', ranking2d.maxaudioid);
      }*/
      let p = document.getElementsByTagName('svg')[0].createSVGPoint();
      p.x = evt.clientX;
      p.y = evt.clientY;
  
      let m = this.getScreenCTM(document.getElementsByTagName('svg')[0]);
  
      p = p.matrixTransform(m.inverse());
      p.x -= this.nMouseOffsetX;
      p.y -= this.nMouseOffsetY;
      //console.log('ranking2d mousemove dragging:', ranking2d.draggingElement);
      if (this.draggingElement) {
        //console.log('ranking2d mousemove position:', p.x, p.y);
        if (p.x < 0) p.x = 0; else if (p.x > 800) p.x = 800 - this.ELEMENTWIDTH; //on borders keep 0
        if (p.y < 0) p.y = 0; else if (p.y > this.ymax - this.ELEMENTWIDTH) p.y = this.ymax - this.ELEMENTWIDTH;
        this.draggingElement.x = p.x;//.setAttribute('dragx', p.x);
        this.draggingElement.y = p.y;//setAttribute('dragy', p.y);
        //this.draggingElement.setAttribute('transform', 'translate(' + p.x + ',' + p.y + ')');
      }
    }
  
    displayCoords(x, y, extra) {
      let xNode = document.getElementById('xpos');
      let yNode = document.getElementById('ypos');
      if (xNode && yNode) {
        xNode.firstChild.nodeValue = parseInt(x, 10) + extra;
        yNode.firstChild.nodeValue = parseInt(y, 10) + extra;
      }
    }
  
    displayRawText(text) {
      let textNode = document.getElementById('raw');
      if (textNode) {
        textNode.firstChild.nodeValue = text;
      }
    }
  
    //TODO no init needed, add mousedown to ball directly
    init(prefix, count) {
      //call only once
      if (ranking2d.inited) return;
      ranking2d.inited = true;
      //console.log('ranking2d init');
      for (let i = 0; i < count; i++) {
        let ball = document.getElementById(prefix + i);
        if (ball) ball.addEventListener('mousedown', ranking2d.mouseDown, false);
      }
      //hide nav class with sounds bug #9
      //DO NOT HIDE sound buttons by default
      //let soundsnav = document.querySelector('.sounds');
      //soundsnav.style.display = 'none';
  
      /*var ball = document.getElementById("ball");
      var square = document.getElementById("square");
      var logo = document.getElementById("cd_logo");
      //var feed = document.getElementById("feed_icon");
      if(ball && square && logo) {
          ball.addEventListener("mousedown", mouseDown, false);
          square.addEventListener("mousedown", mouseDown, false);
          logo.addEventListener("mousedown", mouseDown, false);
          //feed.addEventListener("mousedown", mouseDown, false);
      }
      //displayRawText("Drag stuff around");
      */
    }
  
    displayMatrix(matrix) {
      this.displayRawText(matrix.a + ', ' + matrix.b + ', ' + matrix.c + ', '
        + matrix.d + ', ' + matrix.e + ', ' + matrix.f);
    }
  
    // Following is from Holger Will since ASV3 and O9 do not support getScreenTCM()
    // See http://groups.yahoo.com/group/svg-developers/message/50789
    /*  parX;
    parY;
    ma;
    mos;
    w;
    h;
    sx;
    sy;
    s;*/
    getScreenCTM(doc) {
      if (doc.getScreenCTM) { return doc.getScreenCTM(); }
  
      let root = document.getElementsByTagName('svg')[0];//doc
      let sCTM = root.createSVGMatrix();
  
      let tr = root.createSVGMatrix();
      let par = root.getAttribute('preserveAspectRatio');
      if (par === null || par === '') par = 'xMidYMid meet';//setting to default value
      let parX = par.substring(0, 4); //xMin;xMid;xMax
      let parY = par.substring(4, 8);//YMin;YMid;YMax;
      let ma = par.split(' ');
      let mos = ma[1]; //meet;slice
  
      //get dimensions of the viewport
      sCTM.a = 1;
      sCTM.d = 1;
      sCTM.e = 0;
      sCTM.f = 0;
  
  
      let w = root.getAttribute('width');
      if (w === null || w === '') w = innerWidth;
  
      let h = root.getAttribute('height');
      if (h === null || h === '') h = innerHeight;
  
      // Jeff Schiller:  Modified to account for percentages - I'm not
      // absolutely certain this is correct but it works for 100%/100%
      if (w.substr(w.length - 1, 1) === '%') {
        w = (parseFloat(w.substr(0, w.length - 1)) / 100.0) * innerWidth;
      }
      if (h.substr(h.length - 1, 1) === '%') {
        h = (parseFloat(h.substr(0, h.length - 1)) / 100.0) * innerHeight;
      }
  
      // get the ViewBox
      let vba = root.getAttribute('viewBox');
      if (vba === null) vba = '0 0 ' + w + ' ' + h;
      let vb = vba.split(' ');//get the viewBox into an array
  
      //--------------------------------------------------------------------------
      //create a matrix with current user transformation
      tr.a = root.currentScale;
      tr.d = root.currentScale;
      tr.e = root.currentTranslate.x;
      tr.f = root.currentTranslate.y;
  
  
      //scale factors
      let sx = w / vb[2];
      let sy = h / vb[3];
  
      let s;
      //meetOrSlice
      if (mos === 'slice') {
        s = (sx > sy ? sx : sy);
      } else {
        s = (sx < sy ? sx : sy);
      }
  
      //preserveAspectRatio="none"
      if (par === 'none') {
        sCTM.a = sx;//scaleX
        sCTM.d = sy;//scaleY
        sCTM.e = - vb[0] * sx; //translateX
        sCTM.f = - vb[0] * sy; //translateY
        sCTM = tr.multiply(sCTM);//taking user transformations into acount
  
        return sCTM;
      }
  
  
      sCTM.a = s; //scaleX
      sCTM.d = s;//scaleY
      //-------------------------------------------------------
      switch (parX) {
      case 'xMid':
        sCTM.e = ((w - vb[2] * s) / 2) - vb[0] * s; //translateX
  
        break;
      case 'xMin':
        sCTM.e = - vb[0] * s;//translateX
        break;
      case 'xMax':
        sCTM.e = (w - vb[2] * s) - vb[0] * s; //translateX
        break;
      }
      //------------------------------------------------------------
      switch (parY) {
      case 'YMid':
        sCTM.f = (h - vb[3] * s) / 2 - vb[1] * s; //translateY
        break;
      case 'YMin':
        sCTM.f = - vb[1] * s;//translateY
        break;
      case 'YMax':
        sCTM.f = (h - vb[3] * s) - vb[1] * s; //translateY
        break;
      }
      sCTM = tr.multiply(sCTM);//taking user transformations into acount
  
      return sCTM;
    }

    contextMenuVoid(){
      return false;
    }

    closeContextMenu(){
      this.showcontextmenu=false;
    }
  
    contextMenu(evt,aui) {
      //let evt= window.event;
      if (evt.which === 3 ) {
        //console.log('context menu triggered', evt);
        this.showcontextmenu = true;
        this.contextmenutitle = aui.title;
        //let target = evt.currentTarget;
        //console.log('context menu current target', target);
        //document.getElementById('rankingmodal').style.display = 'block';
        //get id of audio being tagged
        //let id = target.getElementsByTagName('title')[0].innerHTML;
        //document.getElementById('annotationtitle').innerHTML = id;
        //get content already stored for audio
        //let idnumstr = id.match(/\[(.*?)\]/)[1];
        //let idnum = parseInt(idnumstr) - 1 ; //titles indexed from 1, array from 0
        let idnum = aui.id;
        this.audiosrc = document.getElementsByTagName('audio')[idnum].getAttribute('id').slice(6);
        this.currentpagenum=0//pagenum;
        this.currentquestionnum=idnum//questionnum;
        let mycontent = window.ri.getAnnotation(this.audiosrc,this.currentpagenum,this.currentquestionnum);
        this.content = mycontent? mycontent : '';
        //document.getElementById('annotationcontent').value = content ? content : '';
        //document.getElementById('annotationcontent').focus();
        //get stored annotation info
        return false;
      }
    }
  
    highlight(aui) {
      let num ;
      if (aui !== undefined && aui.id !== undefined) 
        num = aui.id
      else 
        num = aui;
      //will highlight audio with num
      let els = document.getElementsByTagName('audio')
      for (let i=0;i<els.length;i++){
        if (i===num) els[i].style.opacity=1;
        else els[i].style.opacity=0.5;
      }
    }
  
    submitAnnotation() {
      this.closeContextMenu();
      //let content = document.getElementById('annotationcontent').value;
      //get audiosrc
      //let id = document.getElementById('annotationtitle').innerHTML;
      //let idnumstr = id.match(/\[(.*?)\]/)[1];
      //let idnum = parseInt(idnumstr) - 1 ; //titles indexed from 1, array from 0
      //let audiosrc = document.getElementsByTagName('audio')[idnum].getAttribute('id').slice(6); //slice audio-1.wav to 1.wav
      window.ri.setAnnotation(this.audiosrc,this.currentpagenum,this.currentquestionnum, this.content);
    }
  }
  

