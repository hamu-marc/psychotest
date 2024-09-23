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

lexer grammar PDSLLexer;

/* lexer */

TEST
   : 'test' -> mode(COMMENT_MODE)
   ;

BASE
   : 'base' -> mode(COMMENT_MODE)
   ;
SCREEN
   : 'screen' -> mode(COMMENT_MODE)
   ;

SCREEN1
   : 'screen per 1' -> mode(COMMENT_MODE)
   ;

SCREEN2
    : 'screen per 2' -> mode(COMMENT_MODE)
    ;

STYLEBUTTON
    : '#stylebutton' -> mode(COMMENT_MODE)
    ;

STYLEFORM
    : '#styleform' -> mode(COMMENT_MODE)
    ;

STYLE
    : '#style' -> mode(COMMENT_MODE)
    ;

COMMENT
   : ( '#'|'//') -> mode(COMMENT_MODE)
   ;

INCLUDE
  : 'include'
  ;

RANDOMSTIMULI
   : 'randomstimuli'
   ;

RANDOMTASK
   : 'randomtask'
   ;

RANDOMINTUPLE
    : 'randomintuple'
    ;

RANDOMSCREEN
    : 'randomscreen'
    ;

RANDOMPAIRS
    : 'randompairs'
    ;

TYPE
    : 'type'
    ;

EDUCATIONAL
    : 'educational'
    ;

NEWROW
    : 'newrow'
    ;

NOPREVIOUSBUTTON
    : 'nopreviousbutton'
    ;

PANEL
    :  'panel' -> mode(COMMENT_MODE)
    ;

TEXT
   : 'text' -> mode(COMMENT_MODE)
   ;

TASK
   : 'task' -> mode(COMMENT_MODE)
   ;

TASKFORSTIMULI
   : 'taskforstimuli' -> mode(COMMENT_MODE)
   ;

STIMULUS
   : 'stimulus'  -> mode(PARAM_MODE)
   ;

VALUES
   : 'values' -> mode(PARAM_MODE)
   ;

SELECT
   : 'select' ->mode(PARAM_MODE)
   ;

VALUESONROW
   : 'valuesonrow' -> mode(COMMENT_MODE)
   ;

CHECKBOXVALUES
   : 'checkboxvalues' -> mode(COMMENT_MODE)
   ;

CHECKBOXVALUESONROW
   : 'checkboxvaluesonrow' -> mode(COMMENT_MODE)
   ;

SCALEVALUES
   : 'scalevalues' -> mode(COMMENT_MODE)
   ;

SCALE
   : 'scale' -> mode(COMMENT_MODE)
   ;

EDIT
   : 'edit'  -> mode(PARAM_MODE)
   ;

RANKING2D
   : 'ranking2d' -> mode(PARAM2_MODE)
   ;

RANKING1D
   : 'ranking1d' -> mode(COMMENT_MODE)
   ;

WS
   : (' '|'\t')+ -> skip
   ;

EOL1
   : [\r\n] -> skip, mode(DEFAULT_MODE)
   ;

LB
    : '('
    ;
RB
    : ')'
    ;

INT
    :[0-9]+
    ;

COMMA1
   : ',' -> skip
   ;

IDENT
   :[A-Za-z][A-Za-z_.0-9]*
   ;

mode PARAM_MODE;

ITEM
   : NONCOMASPACEWS (NONCOMAWS)* //~(','|'\n'|'\r')+
   ;

STRING
   : '"' ('""' | ~'"') '"'
   ;

//REFERENCE
//   : '(' ~('('|')') ')'
//   ;

COMMA
   : ','
   ;

SPACE
   : ' ' -> skip
   ;

WS3
   : (' '|'\t')+ -> skip
   ;

EOL3
   : [\r\n] -> skip, mode(DEFAULT_MODE)
   ;

mode PARAM2_MODE;

ITEM2
   : NONSEMISPACEWS (NONSEMIWS)* //~(','|'\n'|'\r')+
   ;

STRING2
   : '"' ('""' | ~'"') '"'
   ;

SEMICOLON
   : ';'
   ;

SPACE2
   : ' ' -> skip
   ;

WS4
   : (' '|'\t')+ -> skip
   ;

EOL4
   : [\r\n] -> skip, mode(DEFAULT_MODE)
   ;

mode COMMENT_MODE;

fragment NONCOMASPACEWS
   : ~(' '|','|'\n'|'\r')+
   ;

fragment NONCOMAWS
   : ~(','|'\n'|'\r')+
   ;

fragment NONSEMISPACEWS
   : ~(' '|';'|'\n'|'\r')+
   ;
fragment NONSEMIWS
   : ~(';'|'\n'|'\r')+
   ;

fragment NONWS
   : ~(' '|'\t'|'\r'|'\n')
   ;

fragment ANY_CHAR
   : ~('\r'|'\n')
   ;

WS2
   : (' '|'\t')+ -> skip
   ;

DESCRIPTION
   : NONWS (ANY_CHAR)*
   ;

EOL2
   : [\r\n] -> skip, mode(DEFAULT_MODE)
   ;


