import {PDSLParserListener} from '../editor/parser/PDSLParserListener';

export class PDSLInterpretListener extends PDSLParserListener {
  constructor(res) {
    super();
    this.res = res;
    this.res.of = 0;
    this.res.rows = [];
    this.currentnode = {};
  }

  enterDocument(ctx) {
    console.log('enterDocument, ctx', ctx);
    this.res.testdescription = this.currentnode;
  }

  exitDocument(ctx) {
    console.log('exitDocument, ctx', ctx);
    this.res.title = this.res.testdescription.options;
  }

  enterScreen(ctx) {
    //increase number of screens
    this.res.of++;
  }

  exitStreen(ctx) {
    if (!this.res.screens) {
      this.res.screennumber = 1;
      this.res.screens = [];
    }
    else {
      this.res.screennumber++;
    }
    let screen = {'number': this.res.screennumber, 'rows': [], description: this.currentdescription }
    this.screens.push(screen);
  }

  enterText(ctx) {
    console.log('enterText, ctx', ctx);
    let row = {'istext': true};
    this.currentnode = row;
    this.res.rows.push(row);
  }

  enterStimulus(ctx) {
    console.log('enterStimulus, ctx', ctx);
    let row = {'isstimulus': true, 'iswaveform': true, 'src': 'stimuli/1.wav', 'id': 'audio0', 'type': 'audio/wav'};
    this.currentnode = row;
    this.res.rows.push(row);
  }

  enterEdit(ctx) {
    let row = {'isedit': true};
    this.currentnode = row;
    this.res.rows.push(row);
  }
  enterComment(ctx) {
    let row = {'iscomment': true};
    this.currentnode = row;
    this.res.rows.push(row);
  }
  enterTask(ctx) {
    let row = {'istask': true};
    this.currentnode = row;
    this.res.rows.push(row);
  }

  enterDescription(ctx) {
    console.log('enterDescription, ctx', ctx);
    //this.currentnode.options = ctx;
    let start = ctx.start.start;
    let stop = ctx.start.stop;
    this.currentdescription = ctx.start.source[1].strdata.slice(start, stop + 1);
    console.log('description:', this.currentdescription);
  }
  exitDescription(ctx) {
    //console.log('exitDescription, ctx, ctx.DESCRIPTION()', ctx.DESCRIPTION());
    //this.currentnode.options = ctx.DESCRIPTION().getText();
  }
}
