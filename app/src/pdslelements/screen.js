import {bindable} from 'aurelia-framework';
//import {PDSLLexer} from '../editor/parser/PDSLLexer';
//import {PDSLParser} from '../editor/parser/PDSLParser';
import {PDSLInterpretListener} from './PDSLInterpretListener';
//import {index} from 'antlr4';

import { InputStream, CommonTokenStream, tree} from 'antlr4/index';
import { PDSLLexer} from '../editor/parser/PDSLLexer';
import { PDSLParser} from '../editor/parser/PDSLParser';

export class Screen {
  @bindable definition;
  constructor() {
    /*this.definition = {'number': 1, 'of': 5, rows: [
      {'isstimulus': true, 'iswaveform': true, 'src': 'stimuli/1.wav', 'id': 'audio0', 'type': 'audio/wav'},
      {'isstimulus': true, 'iscontrols': true, 'src': 'stimuli/2.wav', 'id': 'audio1', 'type': 'audio/wav'}
    ]};*/
    //this.rows = this.definition.rows;
    //this.antlr4 = index;
    this.parsed = {};
  }

  bind() {
    console.log('bind', this.definition);
    //this.rows = this.definition.rows;
    /*
    let input = this.definition; // Load string content
    let lexer = new PDSLLexer(new InputStream(input));
    let parser = new PDSLParser(new CommonTokenStream(lexer));
    let result = new MyVisitor().visit(parser.myStartRule());
     */


    //let chars = ;
    let lexer = new PDSLLexer(new InputStream(this.definition));
    let parser = new PDSLParser(new CommonTokenStream(lexer));
    parser.buildParseTrees = true;
    //let tree = parser.start();
    let listener = new PDSLInterpretListener(this.parsed);
    let mytree = parser.document(); // only repeated here for reference
    tree.ParseTreeWalker.DEFAULT.walk(listener, mytree);
  }

  attached() {
    console.log('attached screen', this.parsed);
  }

  detached() {

  }
}
