/* Copyright (c) Tomas Kulhanek
 * All rights reserved.
 *
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

parser grammar PDSLParser;
options { tokenVocab = PDSLLexer; }


document
   : testdefinition ((configsection+ comment* screensection*) | screensection+ )
   ;

/* parser */
testdefinition
   : TEST description
   ;

description
   : DESCRIPTION
   ;

configsection
   : (BASE | RANDOMSTIMULI | RANDOMTASK | RANDOMSCREEN | RANDOMINTUPLE | INCLUDE (IDENT)+ | type | comment )
   ;

type
  : TYPE (educational | NOPREVIOUSBUTTON )+
  ;

educational
   : EDUCATIONAL (WS)? (LB INT RB)?
   ;

screensection
   : screenconfig* (screen2 | screen1 | screen ) itemrow+
   ;

screenconfig
   : ( RANDOMSCREEN | RANDOMINTUPLE | RANDOMPAIRS| RANDOMTASK| RANDOMSTIMULI | comment)
   ;

screen2
   : SCREEN2 description?
   ;

screen1
   : SCREEN1 description?
   ;

screen
   : SCREEN description?
   ;

comment
   : COMMENT description?
   ;

itemrow
   : (text | stimulus | task | taskforstimuli | ranking1d | ranking2d | style | styleform | stylebutton | comment | panel | newrow )
   ;

panel
   : PANEL description?
   ;

style
   : STYLE description
   ;

styleform
   : STYLEFORM description
   ;

stylebutton
   : STYLEBUTTON description
   ;

text
   : TEXT description?
   ;

newrow
  : NEWROW
  ;

stimulus
   : STIMULUS field (COMMA field)*
   ;

task
   : TASK description? valuerow*
   ;

taskforstimuli
   : TASKFORSTIMULI description valuerow*
   ;

ranking1d
   : RANKING1D description
   ;

ranking2d
   : RANKING2D rfield SEMICOLON (rfield)?
   ;

field
   : STRING | ITEM
   ;
rfield
   : STRING2 | ITEM2
   ;

valuerow
   : (values|valuesr|valuesc|valuescr|scalevalues|scale|edit)
   ;

values
   : VALUES field (COMMA field)*
   ;

valuesr
   :VALUESONROW description
   ;

valuesc
   :CHECKBOXVALUES description
   ;

valuescr
   :CHECKBOXVALUESONROW description
   ;

scalevalues
   : SCALEVALUES description
   ;

scale
   : SCALE description
   ;

edit
   : EDIT
   ;



