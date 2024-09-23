// Generated from PDSLParser.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var PDSLParserListener = require('./PDSLParserListener').PDSLParserListener;
var grammarFileName = "PDSLParser.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003:\u0118\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014\t",
    "\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017\u0004",
    "\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a\u0004\u001b\t",
    "\u001b\u0004\u001c\t\u001c\u0004\u001d\t\u001d\u0004\u001e\t\u001e\u0004",
    "\u001f\t\u001f\u0004 \t \u0004!\t!\u0004\"\t\"\u0004#\t#\u0003\u0002",
    "\u0003\u0002\u0006\u0002I\n\u0002\r\u0002\u000e\u0002J\u0003\u0002\u0007",
    "\u0002N\n\u0002\f\u0002\u000e\u0002Q\u000b\u0002\u0003\u0002\u0007\u0002",
    "T\n\u0002\f\u0002\u000e\u0002W\u000b\u0002\u0003\u0002\u0006\u0002Z",
    "\n\u0002\r\u0002\u000e\u0002[\u0005\u0002^\n\u0002\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0006\u0005l",
    "\n\u0005\r\u0005\u000e\u0005m\u0003\u0005\u0003\u0005\u0005\u0005r\n",
    "\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0006\u0006w\n\u0006\r\u0006",
    "\u000e\u0006x\u0003\u0007\u0003\u0007\u0005\u0007}\n\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0005\u0007\u0082\n\u0007\u0003\b\u0007\b\u0085",
    "\n\b\f\b\u000e\b\u0088\u000b\b\u0003\b\u0003\b\u0003\b\u0005\b\u008d",
    "\n\b\u0003\b\u0006\b\u0090\n\b\r\b\u000e\b\u0091\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0003\t\u0005\t\u009a\n\t\u0003\n\u0003\n\u0005\n",
    "\u009e\n\n\u0003\u000b\u0003\u000b\u0005\u000b\u00a2\n\u000b\u0003\f",
    "\u0003\f\u0005\f\u00a6\n\f\u0003\r\u0003\r\u0005\r\u00aa\n\r\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0005\u000e",
    "\u00b8\n\u000e\u0003\u000f\u0003\u000f\u0005\u000f\u00bc\n\u000f\u0003",
    "\u0010\u0003\u0010\u0003\u0010\u0003\u0011\u0003\u0011\u0003\u0011\u0003",
    "\u0012\u0003\u0012\u0003\u0012\u0003\u0013\u0003\u0013\u0005\u0013\u00c9",
    "\n\u0013\u0003\u0014\u0003\u0014\u0003\u0015\u0003\u0015\u0003\u0015",
    "\u0003\u0015\u0007\u0015\u00d1\n\u0015\f\u0015\u000e\u0015\u00d4\u000b",
    "\u0015\u0003\u0016\u0003\u0016\u0005\u0016\u00d8\n\u0016\u0003\u0016",
    "\u0007\u0016\u00db\n\u0016\f\u0016\u000e\u0016\u00de\u000b\u0016\u0003",
    "\u0017\u0003\u0017\u0003\u0017\u0007\u0017\u00e3\n\u0017\f\u0017\u000e",
    "\u0017\u00e6\u000b\u0017\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0019",
    "\u0003\u0019\u0003\u0019\u0003\u0019\u0005\u0019\u00ef\n\u0019\u0003",
    "\u001a\u0003\u001a\u0003\u001b\u0003\u001b\u0003\u001c\u0003\u001c\u0003",
    "\u001c\u0003\u001c\u0003\u001c\u0003\u001c\u0003\u001c\u0005\u001c\u00fc",
    "\n\u001c\u0003\u001d\u0003\u001d\u0003\u001d\u0003\u001d\u0007\u001d",
    "\u0102\n\u001d\f\u001d\u000e\u001d\u0105\u000b\u001d\u0003\u001e\u0003",
    "\u001e\u0003\u001e\u0003\u001f\u0003\u001f\u0003\u001f\u0003 \u0003",
    " \u0003 \u0003!\u0003!\u0003!\u0003\"\u0003\"\u0003\"\u0003#\u0003#",
    "\u0003#\u0002\u0002$\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014",
    "\u0016\u0018\u001a\u001c\u001e \"$&(*,.02468:<>@BD\u0002\u0004\u0003",
    "\u0002,-\u0003\u000223\u0002\u012c\u0002F\u0003\u0002\u0002\u0002\u0004",
    "_\u0003\u0002\u0002\u0002\u0006b\u0003\u0002\u0002\u0002\bq\u0003\u0002",
    "\u0002\u0002\ns\u0003\u0002\u0002\u0002\fz\u0003\u0002\u0002\u0002\u000e",
    "\u0086\u0003\u0002\u0002\u0002\u0010\u0099\u0003\u0002\u0002\u0002\u0012",
    "\u009b\u0003\u0002\u0002\u0002\u0014\u009f\u0003\u0002\u0002\u0002\u0016",
    "\u00a3\u0003\u0002\u0002\u0002\u0018\u00a7\u0003\u0002\u0002\u0002\u001a",
    "\u00b7\u0003\u0002\u0002\u0002\u001c\u00b9\u0003\u0002\u0002\u0002\u001e",
    "\u00bd\u0003\u0002\u0002\u0002 \u00c0\u0003\u0002\u0002\u0002\"\u00c3",
    "\u0003\u0002\u0002\u0002$\u00c6\u0003\u0002\u0002\u0002&\u00ca\u0003",
    "\u0002\u0002\u0002(\u00cc\u0003\u0002\u0002\u0002*\u00d5\u0003\u0002",
    "\u0002\u0002,\u00df\u0003\u0002\u0002\u0002.\u00e7\u0003\u0002\u0002",
    "\u00020\u00ea\u0003\u0002\u0002\u00022\u00f0\u0003\u0002\u0002\u0002",
    "4\u00f2\u0003\u0002\u0002\u00026\u00fb\u0003\u0002\u0002\u00028\u00fd",
    "\u0003\u0002\u0002\u0002:\u0106\u0003\u0002\u0002\u0002<\u0109\u0003",
    "\u0002\u0002\u0002>\u010c\u0003\u0002\u0002\u0002@\u010f\u0003\u0002",
    "\u0002\u0002B\u0112\u0003\u0002\u0002\u0002D\u0115\u0003\u0002\u0002",
    "\u0002F]\u0005\u0004\u0003\u0002GI\u0005\b\u0005\u0002HG\u0003\u0002",
    "\u0002\u0002IJ\u0003\u0002\u0002\u0002JH\u0003\u0002\u0002\u0002JK\u0003",
    "\u0002\u0002\u0002KO\u0003\u0002\u0002\u0002LN\u0005\u0018\r\u0002M",
    "L\u0003\u0002\u0002\u0002NQ\u0003\u0002\u0002\u0002OM\u0003\u0002\u0002",
    "\u0002OP\u0003\u0002\u0002\u0002PU\u0003\u0002\u0002\u0002QO\u0003\u0002",
    "\u0002\u0002RT\u0005\u000e\b\u0002SR\u0003\u0002\u0002\u0002TW\u0003",
    "\u0002\u0002\u0002US\u0003\u0002\u0002\u0002UV\u0003\u0002\u0002\u0002",
    "V^\u0003\u0002\u0002\u0002WU\u0003\u0002\u0002\u0002XZ\u0005\u000e\b",
    "\u0002YX\u0003\u0002\u0002\u0002Z[\u0003\u0002\u0002\u0002[Y\u0003\u0002",
    "\u0002\u0002[\\\u0003\u0002\u0002\u0002\\^\u0003\u0002\u0002\u0002]",
    "H\u0003\u0002\u0002\u0002]Y\u0003\u0002\u0002\u0002^\u0003\u0003\u0002",
    "\u0002\u0002_`\u0007\u0003\u0002\u0002`a\u0005\u0006\u0004\u0002a\u0005",
    "\u0003\u0002\u0002\u0002bc\u00079\u0002\u0002c\u0007\u0003\u0002\u0002",
    "\u0002dr\u0007\u0004\u0002\u0002er\u0007\r\u0002\u0002fr\u0007\u000e",
    "\u0002\u0002gr\u0007\u0010\u0002\u0002hr\u0007\u000f\u0002\u0002ik\u0007",
    "\f\u0002\u0002jl\u0007+\u0002\u0002kj\u0003\u0002\u0002\u0002lm\u0003",
    "\u0002\u0002\u0002mk\u0003\u0002\u0002\u0002mn\u0003\u0002\u0002\u0002",
    "nr\u0003\u0002\u0002\u0002or\u0005\n\u0006\u0002pr\u0005\u0018\r\u0002",
    "qd\u0003\u0002\u0002\u0002qe\u0003\u0002\u0002\u0002qf\u0003\u0002\u0002",
    "\u0002qg\u0003\u0002\u0002\u0002qh\u0003\u0002\u0002\u0002qi\u0003\u0002",
    "\u0002\u0002qo\u0003\u0002\u0002\u0002qp\u0003\u0002\u0002\u0002r\t",
    "\u0003\u0002\u0002\u0002sv\u0007\u0012\u0002\u0002tw\u0005\f\u0007\u0002",
    "uw\u0007\u0015\u0002\u0002vt\u0003\u0002\u0002\u0002vu\u0003\u0002\u0002",
    "\u0002wx\u0003\u0002\u0002\u0002xv\u0003\u0002\u0002\u0002xy\u0003\u0002",
    "\u0002\u0002y\u000b\u0003\u0002\u0002\u0002z|\u0007\u0013\u0002\u0002",
    "{}\u0007%\u0002\u0002|{\u0003\u0002\u0002\u0002|}\u0003\u0002\u0002",
    "\u0002}\u0081\u0003\u0002\u0002\u0002~\u007f\u0007\'\u0002\u0002\u007f",
    "\u0080\u0007)\u0002\u0002\u0080\u0082\u0007(\u0002\u0002\u0081~\u0003",
    "\u0002\u0002\u0002\u0081\u0082\u0003\u0002\u0002\u0002\u0082\r\u0003",
    "\u0002\u0002\u0002\u0083\u0085\u0005\u0010\t\u0002\u0084\u0083\u0003",
    "\u0002\u0002\u0002\u0085\u0088\u0003\u0002\u0002\u0002\u0086\u0084\u0003",
    "\u0002\u0002\u0002\u0086\u0087\u0003\u0002\u0002\u0002\u0087\u008c\u0003",
    "\u0002\u0002\u0002\u0088\u0086\u0003\u0002\u0002\u0002\u0089\u008d\u0005",
    "\u0012\n\u0002\u008a\u008d\u0005\u0014\u000b\u0002\u008b\u008d\u0005",
    "\u0016\f\u0002\u008c\u0089\u0003\u0002\u0002\u0002\u008c\u008a\u0003",
    "\u0002\u0002\u0002\u008c\u008b\u0003\u0002\u0002\u0002\u008d\u008f\u0003",
    "\u0002\u0002\u0002\u008e\u0090\u0005\u001a\u000e\u0002\u008f\u008e\u0003",
    "\u0002\u0002\u0002\u0090\u0091\u0003\u0002\u0002\u0002\u0091\u008f\u0003",
    "\u0002\u0002\u0002\u0091\u0092\u0003\u0002\u0002\u0002\u0092\u000f\u0003",
    "\u0002\u0002\u0002\u0093\u009a\u0007\u0010\u0002\u0002\u0094\u009a\u0007",
    "\u000f\u0002\u0002\u0095\u009a\u0007\u0011\u0002\u0002\u0096\u009a\u0007",
    "\u000e\u0002\u0002\u0097\u009a\u0007\r\u0002\u0002\u0098\u009a\u0005",
    "\u0018\r\u0002\u0099\u0093\u0003\u0002\u0002\u0002\u0099\u0094\u0003",
    "\u0002\u0002\u0002\u0099\u0095\u0003\u0002\u0002\u0002\u0099\u0096\u0003",
    "\u0002\u0002\u0002\u0099\u0097\u0003\u0002\u0002\u0002\u0099\u0098\u0003",
    "\u0002\u0002\u0002\u009a\u0011\u0003\u0002\u0002\u0002\u009b\u009d\u0007",
    "\u0007\u0002\u0002\u009c\u009e\u0005\u0006\u0004\u0002\u009d\u009c\u0003",
    "\u0002\u0002\u0002\u009d\u009e\u0003\u0002\u0002\u0002\u009e\u0013\u0003",
    "\u0002\u0002\u0002\u009f\u00a1\u0007\u0006\u0002\u0002\u00a0\u00a2\u0005",
    "\u0006\u0004\u0002\u00a1\u00a0\u0003\u0002\u0002\u0002\u00a1\u00a2\u0003",
    "\u0002\u0002\u0002\u00a2\u0015\u0003\u0002\u0002\u0002\u00a3\u00a5\u0007",
    "\u0005\u0002\u0002\u00a4\u00a6\u0005\u0006\u0004\u0002\u00a5\u00a4\u0003",
    "\u0002\u0002\u0002\u00a5\u00a6\u0003\u0002\u0002\u0002\u00a6\u0017\u0003",
    "\u0002\u0002\u0002\u00a7\u00a9\u0007\u000b\u0002\u0002\u00a8\u00aa\u0005",
    "\u0006\u0004\u0002\u00a9\u00a8\u0003\u0002\u0002\u0002\u00a9\u00aa\u0003",
    "\u0002\u0002\u0002\u00aa\u0019\u0003\u0002\u0002\u0002\u00ab\u00b8\u0005",
    "$\u0013\u0002\u00ac\u00b8\u0005(\u0015\u0002\u00ad\u00b8\u0005*\u0016",
    "\u0002\u00ae\u00b8\u0005,\u0017\u0002\u00af\u00b8\u0005.\u0018\u0002",
    "\u00b0\u00b8\u00050\u0019\u0002\u00b1\u00b8\u0005\u001e\u0010\u0002",
    "\u00b2\u00b8\u0005 \u0011\u0002\u00b3\u00b8\u0005\"\u0012\u0002\u00b4",
    "\u00b8\u0005\u0018\r\u0002\u00b5\u00b8\u0005\u001c\u000f\u0002\u00b6",
    "\u00b8\u0005&\u0014\u0002\u00b7\u00ab\u0003\u0002\u0002\u0002\u00b7",
    "\u00ac\u0003\u0002\u0002\u0002\u00b7\u00ad\u0003\u0002\u0002\u0002\u00b7",
    "\u00ae\u0003\u0002\u0002\u0002\u00b7\u00af\u0003\u0002\u0002\u0002\u00b7",
    "\u00b0\u0003\u0002\u0002\u0002\u00b7\u00b1\u0003\u0002\u0002\u0002\u00b7",
    "\u00b2\u0003\u0002\u0002\u0002\u00b7\u00b3\u0003\u0002\u0002\u0002\u00b7",
    "\u00b4\u0003\u0002\u0002\u0002\u00b7\u00b5\u0003\u0002\u0002\u0002\u00b7",
    "\u00b6\u0003\u0002\u0002\u0002\u00b8\u001b\u0003\u0002\u0002\u0002\u00b9",
    "\u00bb\u0007\u0016\u0002\u0002\u00ba\u00bc\u0005\u0006\u0004\u0002\u00bb",
    "\u00ba\u0003\u0002\u0002\u0002\u00bb\u00bc\u0003\u0002\u0002\u0002\u00bc",
    "\u001d\u0003\u0002\u0002\u0002\u00bd\u00be\u0007\n\u0002\u0002\u00be",
    "\u00bf\u0005\u0006\u0004\u0002\u00bf\u001f\u0003\u0002\u0002\u0002\u00c0",
    "\u00c1\u0007\t\u0002\u0002\u00c1\u00c2\u0005\u0006\u0004\u0002\u00c2",
    "!\u0003\u0002\u0002\u0002\u00c3\u00c4\u0007\b\u0002\u0002\u00c4\u00c5",
    "\u0005\u0006\u0004\u0002\u00c5#\u0003\u0002\u0002\u0002\u00c6\u00c8",
    "\u0007\u0017\u0002\u0002\u00c7\u00c9\u0005\u0006\u0004\u0002\u00c8\u00c7",
    "\u0003\u0002\u0002\u0002\u00c8\u00c9\u0003\u0002\u0002\u0002\u00c9%",
    "\u0003\u0002\u0002\u0002\u00ca\u00cb\u0007\u0014\u0002\u0002\u00cb\'",
    "\u0003\u0002\u0002\u0002\u00cc\u00cd\u0007\u001a\u0002\u0002\u00cd\u00d2",
    "\u00052\u001a\u0002\u00ce\u00cf\u0007.\u0002\u0002\u00cf\u00d1\u0005",
    "2\u001a\u0002\u00d0\u00ce\u0003\u0002\u0002\u0002\u00d1\u00d4\u0003",
    "\u0002\u0002\u0002\u00d2\u00d0\u0003\u0002\u0002\u0002\u00d2\u00d3\u0003",
    "\u0002\u0002\u0002\u00d3)\u0003\u0002\u0002\u0002\u00d4\u00d2\u0003",
    "\u0002\u0002\u0002\u00d5\u00d7\u0007\u0018\u0002\u0002\u00d6\u00d8\u0005",
    "\u0006\u0004\u0002\u00d7\u00d6\u0003\u0002\u0002\u0002\u00d7\u00d8\u0003",
    "\u0002\u0002\u0002\u00d8\u00dc\u0003\u0002\u0002\u0002\u00d9\u00db\u0005",
    "6\u001c\u0002\u00da\u00d9\u0003\u0002\u0002\u0002\u00db\u00de\u0003",
    "\u0002\u0002\u0002\u00dc\u00da\u0003\u0002\u0002\u0002\u00dc\u00dd\u0003",
    "\u0002\u0002\u0002\u00dd+\u0003\u0002\u0002\u0002\u00de\u00dc\u0003",
    "\u0002\u0002\u0002\u00df\u00e0\u0007\u0019\u0002\u0002\u00e0\u00e4\u0005",
    "\u0006\u0004\u0002\u00e1\u00e3\u00056\u001c\u0002\u00e2\u00e1\u0003",
    "\u0002\u0002\u0002\u00e3\u00e6\u0003\u0002\u0002\u0002\u00e4\u00e2\u0003",
    "\u0002\u0002\u0002\u00e4\u00e5\u0003\u0002\u0002\u0002\u00e5-\u0003",
    "\u0002\u0002\u0002\u00e6\u00e4\u0003\u0002\u0002\u0002\u00e7\u00e8\u0007",
    "$\u0002\u0002\u00e8\u00e9\u0005\u0006\u0004\u0002\u00e9/\u0003\u0002",
    "\u0002\u0002\u00ea\u00eb\u0007#\u0002\u0002\u00eb\u00ec\u00054\u001b",
    "\u0002\u00ec\u00ee\u00074\u0002\u0002\u00ed\u00ef\u00054\u001b\u0002",
    "\u00ee\u00ed\u0003\u0002\u0002\u0002\u00ee\u00ef\u0003\u0002\u0002\u0002",
    "\u00ef1\u0003\u0002\u0002\u0002\u00f0\u00f1\t\u0002\u0002\u0002\u00f1",
    "3\u0003\u0002\u0002\u0002\u00f2\u00f3\t\u0003\u0002\u0002\u00f35\u0003",
    "\u0002\u0002\u0002\u00f4\u00fc\u00058\u001d\u0002\u00f5\u00fc\u0005",
    ":\u001e\u0002\u00f6\u00fc\u0005<\u001f\u0002\u00f7\u00fc\u0005> \u0002",
    "\u00f8\u00fc\u0005@!\u0002\u00f9\u00fc\u0005B\"\u0002\u00fa\u00fc\u0005",
    "D#\u0002\u00fb\u00f4\u0003\u0002\u0002\u0002\u00fb\u00f5\u0003\u0002",
    "\u0002\u0002\u00fb\u00f6\u0003\u0002\u0002\u0002\u00fb\u00f7\u0003\u0002",
    "\u0002\u0002\u00fb\u00f8\u0003\u0002\u0002\u0002\u00fb\u00f9\u0003\u0002",
    "\u0002\u0002\u00fb\u00fa\u0003\u0002\u0002\u0002\u00fc7\u0003\u0002",
    "\u0002\u0002\u00fd\u00fe\u0007\u001b\u0002\u0002\u00fe\u0103\u00052",
    "\u001a\u0002\u00ff\u0100\u0007.\u0002\u0002\u0100\u0102\u00052\u001a",
    "\u0002\u0101\u00ff\u0003\u0002\u0002\u0002\u0102\u0105\u0003\u0002\u0002",
    "\u0002\u0103\u0101\u0003\u0002\u0002\u0002\u0103\u0104\u0003\u0002\u0002",
    "\u0002\u01049\u0003\u0002\u0002\u0002\u0105\u0103\u0003\u0002\u0002",
    "\u0002\u0106\u0107\u0007\u001d\u0002\u0002\u0107\u0108\u0005\u0006\u0004",
    "\u0002\u0108;\u0003\u0002\u0002\u0002\u0109\u010a\u0007\u001e\u0002",
    "\u0002\u010a\u010b\u0005\u0006\u0004\u0002\u010b=\u0003\u0002\u0002",
    "\u0002\u010c\u010d\u0007\u001f\u0002\u0002\u010d\u010e\u0005\u0006\u0004",
    "\u0002\u010e?\u0003\u0002\u0002\u0002\u010f\u0110\u0007 \u0002\u0002",
    "\u0110\u0111\u0005\u0006\u0004\u0002\u0111A\u0003\u0002\u0002\u0002",
    "\u0112\u0113\u0007!\u0002\u0002\u0113\u0114\u0005\u0006\u0004\u0002",
    "\u0114C\u0003\u0002\u0002\u0002\u0115\u0116\u0007\"\u0002\u0002\u0116",
    "E\u0003\u0002\u0002\u0002\u001fJOU[]mqvx|\u0081\u0086\u008c\u0091\u0099",
    "\u009d\u00a1\u00a5\u00a9\u00b7\u00bb\u00c8\u00d2\u00d7\u00dc\u00e4\u00ee",
    "\u00fb\u0103"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'test'", "'base'", "'screen'", "'screen per 1'", 
                     "'screen per 2'", "'#stylebutton'", "'#styleform'", 
                     "'#style'", null, "'include'", "'randomstimuli'", "'randomtask'", 
                     "'randomintuple'", "'randomscreen'", "'randompairs'", 
                     "'type'", "'educational'", "'newrow'", "'nopreviousbutton'", 
                     "'panel'", "'text'", "'task'", "'taskforstimuli'", 
                     "'stimulus'", "'values'", "'select'", "'valuesonrow'", 
                     "'checkboxvalues'", "'checkboxvaluesonrow'", "'scalevalues'", 
                     "'scale'", "'edit'", "'ranking2d'", "'ranking1d'", 
                     null, null, "'('", "')'", null, null, null, null, null, 
                     null, null, null, null, null, null, "';'" ];

var symbolicNames = [ null, "TEST", "BASE", "SCREEN", "SCREEN1", "SCREEN2", 
                      "STYLEBUTTON", "STYLEFORM", "STYLE", "COMMENT", "INCLUDE", 
                      "RANDOMSTIMULI", "RANDOMTASK", "RANDOMINTUPLE", "RANDOMSCREEN", 
                      "RANDOMPAIRS", "TYPE", "EDUCATIONAL", "NEWROW", "NOPREVIOUSBUTTON", 
                      "PANEL", "TEXT", "TASK", "TASKFORSTIMULI", "STIMULUS", 
                      "VALUES", "SELECT", "VALUESONROW", "CHECKBOXVALUES", 
                      "CHECKBOXVALUESONROW", "SCALEVALUES", "SCALE", "EDIT", 
                      "RANKING2D", "RANKING1D", "WS", "EOL1", "LB", "RB", 
                      "INT", "COMMA1", "IDENT", "ITEM", "STRING", "COMMA", 
                      "SPACE", "WS3", "EOL3", "ITEM2", "STRING2", "SEMICOLON", 
                      "SPACE2", "WS4", "EOL4", "WS2", "DESCRIPTION", "EOL2" ];

var ruleNames =  [ "document", "testdefinition", "description", "configsection", 
                   "type", "educational", "screensection", "screenconfig", 
                   "screen2", "screen1", "screen", "comment", "itemrow", 
                   "panel", "style", "styleform", "stylebutton", "text", 
                   "newrow", "stimulus", "task", "taskforstimuli", "ranking1d", 
                   "ranking2d", "field", "rfield", "valuerow", "values", 
                   "valuesr", "valuesc", "valuescr", "scalevalues", "scale", 
                   "edit" ];

function PDSLParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

PDSLParser.prototype = Object.create(antlr4.Parser.prototype);
PDSLParser.prototype.constructor = PDSLParser;

Object.defineProperty(PDSLParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

PDSLParser.EOF = antlr4.Token.EOF;
PDSLParser.TEST = 1;
PDSLParser.BASE = 2;
PDSLParser.SCREEN = 3;
PDSLParser.SCREEN1 = 4;
PDSLParser.SCREEN2 = 5;
PDSLParser.STYLEBUTTON = 6;
PDSLParser.STYLEFORM = 7;
PDSLParser.STYLE = 8;
PDSLParser.COMMENT = 9;
PDSLParser.INCLUDE = 10;
PDSLParser.RANDOMSTIMULI = 11;
PDSLParser.RANDOMTASK = 12;
PDSLParser.RANDOMINTUPLE = 13;
PDSLParser.RANDOMSCREEN = 14;
PDSLParser.RANDOMPAIRS = 15;
PDSLParser.TYPE = 16;
PDSLParser.EDUCATIONAL = 17;
PDSLParser.NEWROW = 18;
PDSLParser.NOPREVIOUSBUTTON = 19;
PDSLParser.PANEL = 20;
PDSLParser.TEXT = 21;
PDSLParser.TASK = 22;
PDSLParser.TASKFORSTIMULI = 23;
PDSLParser.STIMULUS = 24;
PDSLParser.VALUES = 25;
PDSLParser.SELECT = 26;
PDSLParser.VALUESONROW = 27;
PDSLParser.CHECKBOXVALUES = 28;
PDSLParser.CHECKBOXVALUESONROW = 29;
PDSLParser.SCALEVALUES = 30;
PDSLParser.SCALE = 31;
PDSLParser.EDIT = 32;
PDSLParser.RANKING2D = 33;
PDSLParser.RANKING1D = 34;
PDSLParser.WS = 35;
PDSLParser.EOL1 = 36;
PDSLParser.LB = 37;
PDSLParser.RB = 38;
PDSLParser.INT = 39;
PDSLParser.COMMA1 = 40;
PDSLParser.IDENT = 41;
PDSLParser.ITEM = 42;
PDSLParser.STRING = 43;
PDSLParser.COMMA = 44;
PDSLParser.SPACE = 45;
PDSLParser.WS3 = 46;
PDSLParser.EOL3 = 47;
PDSLParser.ITEM2 = 48;
PDSLParser.STRING2 = 49;
PDSLParser.SEMICOLON = 50;
PDSLParser.SPACE2 = 51;
PDSLParser.WS4 = 52;
PDSLParser.EOL4 = 53;
PDSLParser.WS2 = 54;
PDSLParser.DESCRIPTION = 55;
PDSLParser.EOL2 = 56;

PDSLParser.RULE_document = 0;
PDSLParser.RULE_testdefinition = 1;
PDSLParser.RULE_description = 2;
PDSLParser.RULE_configsection = 3;
PDSLParser.RULE_type = 4;
PDSLParser.RULE_educational = 5;
PDSLParser.RULE_screensection = 6;
PDSLParser.RULE_screenconfig = 7;
PDSLParser.RULE_screen2 = 8;
PDSLParser.RULE_screen1 = 9;
PDSLParser.RULE_screen = 10;
PDSLParser.RULE_comment = 11;
PDSLParser.RULE_itemrow = 12;
PDSLParser.RULE_panel = 13;
PDSLParser.RULE_style = 14;
PDSLParser.RULE_styleform = 15;
PDSLParser.RULE_stylebutton = 16;
PDSLParser.RULE_text = 17;
PDSLParser.RULE_newrow = 18;
PDSLParser.RULE_stimulus = 19;
PDSLParser.RULE_task = 20;
PDSLParser.RULE_taskforstimuli = 21;
PDSLParser.RULE_ranking1d = 22;
PDSLParser.RULE_ranking2d = 23;
PDSLParser.RULE_field = 24;
PDSLParser.RULE_rfield = 25;
PDSLParser.RULE_valuerow = 26;
PDSLParser.RULE_values = 27;
PDSLParser.RULE_valuesr = 28;
PDSLParser.RULE_valuesc = 29;
PDSLParser.RULE_valuescr = 30;
PDSLParser.RULE_scalevalues = 31;
PDSLParser.RULE_scale = 32;
PDSLParser.RULE_edit = 33;

function DocumentContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_document;
    return this;
}

DocumentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DocumentContext.prototype.constructor = DocumentContext;

DocumentContext.prototype.testdefinition = function() {
    return this.getTypedRuleContext(TestdefinitionContext,0);
};

DocumentContext.prototype.screensection = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ScreensectionContext);
    } else {
        return this.getTypedRuleContext(ScreensectionContext,i);
    }
};

DocumentContext.prototype.configsection = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ConfigsectionContext);
    } else {
        return this.getTypedRuleContext(ConfigsectionContext,i);
    }
};

DocumentContext.prototype.comment = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(CommentContext);
    } else {
        return this.getTypedRuleContext(CommentContext,i);
    }
};

DocumentContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterDocument(this);
	}
};

DocumentContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitDocument(this);
	}
};




PDSLParser.DocumentContext = DocumentContext;

PDSLParser.prototype.document = function() {

    var localctx = new DocumentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, PDSLParser.RULE_document);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 68;
        this.testdefinition();
        this.state = 91;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
        switch(la_) {
        case 1:
            this.state = 70; 
            this._errHandler.sync(this);
            var _alt = 1;
            do {
            	switch (_alt) {
            	case 1:
            		this.state = 69;
            		this.configsection();
            		break;
            	default:
            		throw new antlr4.error.NoViableAltException(this);
            	}
            	this.state = 72; 
            	this._errHandler.sync(this);
            	_alt = this._interp.adaptivePredict(this._input,0, this._ctx);
            } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
            this.state = 77;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input,1,this._ctx)
            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if(_alt===1) {
                    this.state = 74;
                    this.comment(); 
                }
                this.state = 79;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input,1,this._ctx);
            }

            this.state = 83;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << PDSLParser.SCREEN) | (1 << PDSLParser.SCREEN1) | (1 << PDSLParser.SCREEN2) | (1 << PDSLParser.COMMENT) | (1 << PDSLParser.RANDOMSTIMULI) | (1 << PDSLParser.RANDOMTASK) | (1 << PDSLParser.RANDOMINTUPLE) | (1 << PDSLParser.RANDOMSCREEN) | (1 << PDSLParser.RANDOMPAIRS))) !== 0)) {
                this.state = 80;
                this.screensection();
                this.state = 85;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            break;

        case 2:
            this.state = 87; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 86;
                this.screensection();
                this.state = 89; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << PDSLParser.SCREEN) | (1 << PDSLParser.SCREEN1) | (1 << PDSLParser.SCREEN2) | (1 << PDSLParser.COMMENT) | (1 << PDSLParser.RANDOMSTIMULI) | (1 << PDSLParser.RANDOMTASK) | (1 << PDSLParser.RANDOMINTUPLE) | (1 << PDSLParser.RANDOMSCREEN) | (1 << PDSLParser.RANDOMPAIRS))) !== 0));
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function TestdefinitionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_testdefinition;
    return this;
}

TestdefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TestdefinitionContext.prototype.constructor = TestdefinitionContext;

TestdefinitionContext.prototype.TEST = function() {
    return this.getToken(PDSLParser.TEST, 0);
};

TestdefinitionContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

TestdefinitionContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterTestdefinition(this);
	}
};

TestdefinitionContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitTestdefinition(this);
	}
};




PDSLParser.TestdefinitionContext = TestdefinitionContext;

PDSLParser.prototype.testdefinition = function() {

    var localctx = new TestdefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, PDSLParser.RULE_testdefinition);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 93;
        this.match(PDSLParser.TEST);
        this.state = 94;
        this.description();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function DescriptionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_description;
    return this;
}

DescriptionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DescriptionContext.prototype.constructor = DescriptionContext;

DescriptionContext.prototype.DESCRIPTION = function() {
    return this.getToken(PDSLParser.DESCRIPTION, 0);
};

DescriptionContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterDescription(this);
	}
};

DescriptionContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitDescription(this);
	}
};




PDSLParser.DescriptionContext = DescriptionContext;

PDSLParser.prototype.description = function() {

    var localctx = new DescriptionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, PDSLParser.RULE_description);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 96;
        this.match(PDSLParser.DESCRIPTION);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ConfigsectionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_configsection;
    return this;
}

ConfigsectionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ConfigsectionContext.prototype.constructor = ConfigsectionContext;

ConfigsectionContext.prototype.BASE = function() {
    return this.getToken(PDSLParser.BASE, 0);
};

ConfigsectionContext.prototype.RANDOMSTIMULI = function() {
    return this.getToken(PDSLParser.RANDOMSTIMULI, 0);
};

ConfigsectionContext.prototype.RANDOMTASK = function() {
    return this.getToken(PDSLParser.RANDOMTASK, 0);
};

ConfigsectionContext.prototype.RANDOMSCREEN = function() {
    return this.getToken(PDSLParser.RANDOMSCREEN, 0);
};

ConfigsectionContext.prototype.RANDOMINTUPLE = function() {
    return this.getToken(PDSLParser.RANDOMINTUPLE, 0);
};

ConfigsectionContext.prototype.INCLUDE = function() {
    return this.getToken(PDSLParser.INCLUDE, 0);
};

ConfigsectionContext.prototype.type = function() {
    return this.getTypedRuleContext(TypeContext,0);
};

ConfigsectionContext.prototype.comment = function() {
    return this.getTypedRuleContext(CommentContext,0);
};

ConfigsectionContext.prototype.IDENT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(PDSLParser.IDENT);
    } else {
        return this.getToken(PDSLParser.IDENT, i);
    }
};


ConfigsectionContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterConfigsection(this);
	}
};

ConfigsectionContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitConfigsection(this);
	}
};




PDSLParser.ConfigsectionContext = ConfigsectionContext;

PDSLParser.prototype.configsection = function() {

    var localctx = new ConfigsectionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, PDSLParser.RULE_configsection);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 111;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case PDSLParser.BASE:
            this.state = 98;
            this.match(PDSLParser.BASE);
            break;
        case PDSLParser.RANDOMSTIMULI:
            this.state = 99;
            this.match(PDSLParser.RANDOMSTIMULI);
            break;
        case PDSLParser.RANDOMTASK:
            this.state = 100;
            this.match(PDSLParser.RANDOMTASK);
            break;
        case PDSLParser.RANDOMSCREEN:
            this.state = 101;
            this.match(PDSLParser.RANDOMSCREEN);
            break;
        case PDSLParser.RANDOMINTUPLE:
            this.state = 102;
            this.match(PDSLParser.RANDOMINTUPLE);
            break;
        case PDSLParser.INCLUDE:
            this.state = 103;
            this.match(PDSLParser.INCLUDE);
            this.state = 105; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 104;
                this.match(PDSLParser.IDENT);
                this.state = 107; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===PDSLParser.IDENT);
            break;
        case PDSLParser.TYPE:
            this.state = 109;
            this.type();
            break;
        case PDSLParser.COMMENT:
            this.state = 110;
            this.comment();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function TypeContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_type;
    return this;
}

TypeContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TypeContext.prototype.constructor = TypeContext;

TypeContext.prototype.TYPE = function() {
    return this.getToken(PDSLParser.TYPE, 0);
};

TypeContext.prototype.educational = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(EducationalContext);
    } else {
        return this.getTypedRuleContext(EducationalContext,i);
    }
};

TypeContext.prototype.NOPREVIOUSBUTTON = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(PDSLParser.NOPREVIOUSBUTTON);
    } else {
        return this.getToken(PDSLParser.NOPREVIOUSBUTTON, i);
    }
};


TypeContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterType(this);
	}
};

TypeContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitType(this);
	}
};




PDSLParser.TypeContext = TypeContext;

PDSLParser.prototype.type = function() {

    var localctx = new TypeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, PDSLParser.RULE_type);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 113;
        this.match(PDSLParser.TYPE);
        this.state = 116; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 116;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case PDSLParser.EDUCATIONAL:
                this.state = 114;
                this.educational();
                break;
            case PDSLParser.NOPREVIOUSBUTTON:
                this.state = 115;
                this.match(PDSLParser.NOPREVIOUSBUTTON);
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 118; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===PDSLParser.EDUCATIONAL || _la===PDSLParser.NOPREVIOUSBUTTON);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function EducationalContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_educational;
    return this;
}

EducationalContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EducationalContext.prototype.constructor = EducationalContext;

EducationalContext.prototype.EDUCATIONAL = function() {
    return this.getToken(PDSLParser.EDUCATIONAL, 0);
};

EducationalContext.prototype.WS = function() {
    return this.getToken(PDSLParser.WS, 0);
};

EducationalContext.prototype.LB = function() {
    return this.getToken(PDSLParser.LB, 0);
};

EducationalContext.prototype.INT = function() {
    return this.getToken(PDSLParser.INT, 0);
};

EducationalContext.prototype.RB = function() {
    return this.getToken(PDSLParser.RB, 0);
};

EducationalContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterEducational(this);
	}
};

EducationalContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitEducational(this);
	}
};




PDSLParser.EducationalContext = EducationalContext;

PDSLParser.prototype.educational = function() {

    var localctx = new EducationalContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, PDSLParser.RULE_educational);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 120;
        this.match(PDSLParser.EDUCATIONAL);
        this.state = 122;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===PDSLParser.WS) {
            this.state = 121;
            this.match(PDSLParser.WS);
        }

        this.state = 127;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===PDSLParser.LB) {
            this.state = 124;
            this.match(PDSLParser.LB);
            this.state = 125;
            this.match(PDSLParser.INT);
            this.state = 126;
            this.match(PDSLParser.RB);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ScreensectionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_screensection;
    return this;
}

ScreensectionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ScreensectionContext.prototype.constructor = ScreensectionContext;

ScreensectionContext.prototype.screen2 = function() {
    return this.getTypedRuleContext(Screen2Context,0);
};

ScreensectionContext.prototype.screen1 = function() {
    return this.getTypedRuleContext(Screen1Context,0);
};

ScreensectionContext.prototype.screen = function() {
    return this.getTypedRuleContext(ScreenContext,0);
};

ScreensectionContext.prototype.screenconfig = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ScreenconfigContext);
    } else {
        return this.getTypedRuleContext(ScreenconfigContext,i);
    }
};

ScreensectionContext.prototype.itemrow = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ItemrowContext);
    } else {
        return this.getTypedRuleContext(ItemrowContext,i);
    }
};

ScreensectionContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterScreensection(this);
	}
};

ScreensectionContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitScreensection(this);
	}
};




PDSLParser.ScreensectionContext = ScreensectionContext;

PDSLParser.prototype.screensection = function() {

    var localctx = new ScreensectionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, PDSLParser.RULE_screensection);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 132;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << PDSLParser.COMMENT) | (1 << PDSLParser.RANDOMSTIMULI) | (1 << PDSLParser.RANDOMTASK) | (1 << PDSLParser.RANDOMINTUPLE) | (1 << PDSLParser.RANDOMSCREEN) | (1 << PDSLParser.RANDOMPAIRS))) !== 0)) {
            this.state = 129;
            this.screenconfig();
            this.state = 134;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 138;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case PDSLParser.SCREEN2:
            this.state = 135;
            this.screen2();
            break;
        case PDSLParser.SCREEN1:
            this.state = 136;
            this.screen1();
            break;
        case PDSLParser.SCREEN:
            this.state = 137;
            this.screen();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this.state = 141; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 140;
        		this.itemrow();
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 143; 
        	this._errHandler.sync(this);
        	_alt = this._interp.adaptivePredict(this._input,13, this._ctx);
        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ScreenconfigContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_screenconfig;
    return this;
}

ScreenconfigContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ScreenconfigContext.prototype.constructor = ScreenconfigContext;

ScreenconfigContext.prototype.RANDOMSCREEN = function() {
    return this.getToken(PDSLParser.RANDOMSCREEN, 0);
};

ScreenconfigContext.prototype.RANDOMINTUPLE = function() {
    return this.getToken(PDSLParser.RANDOMINTUPLE, 0);
};

ScreenconfigContext.prototype.RANDOMPAIRS = function() {
    return this.getToken(PDSLParser.RANDOMPAIRS, 0);
};

ScreenconfigContext.prototype.RANDOMTASK = function() {
    return this.getToken(PDSLParser.RANDOMTASK, 0);
};

ScreenconfigContext.prototype.RANDOMSTIMULI = function() {
    return this.getToken(PDSLParser.RANDOMSTIMULI, 0);
};

ScreenconfigContext.prototype.comment = function() {
    return this.getTypedRuleContext(CommentContext,0);
};

ScreenconfigContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterScreenconfig(this);
	}
};

ScreenconfigContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitScreenconfig(this);
	}
};




PDSLParser.ScreenconfigContext = ScreenconfigContext;

PDSLParser.prototype.screenconfig = function() {

    var localctx = new ScreenconfigContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, PDSLParser.RULE_screenconfig);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 151;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case PDSLParser.RANDOMSCREEN:
            this.state = 145;
            this.match(PDSLParser.RANDOMSCREEN);
            break;
        case PDSLParser.RANDOMINTUPLE:
            this.state = 146;
            this.match(PDSLParser.RANDOMINTUPLE);
            break;
        case PDSLParser.RANDOMPAIRS:
            this.state = 147;
            this.match(PDSLParser.RANDOMPAIRS);
            break;
        case PDSLParser.RANDOMTASK:
            this.state = 148;
            this.match(PDSLParser.RANDOMTASK);
            break;
        case PDSLParser.RANDOMSTIMULI:
            this.state = 149;
            this.match(PDSLParser.RANDOMSTIMULI);
            break;
        case PDSLParser.COMMENT:
            this.state = 150;
            this.comment();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Screen2Context(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_screen2;
    return this;
}

Screen2Context.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Screen2Context.prototype.constructor = Screen2Context;

Screen2Context.prototype.SCREEN2 = function() {
    return this.getToken(PDSLParser.SCREEN2, 0);
};

Screen2Context.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

Screen2Context.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterScreen2(this);
	}
};

Screen2Context.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitScreen2(this);
	}
};




PDSLParser.Screen2Context = Screen2Context;

PDSLParser.prototype.screen2 = function() {

    var localctx = new Screen2Context(this, this._ctx, this.state);
    this.enterRule(localctx, 16, PDSLParser.RULE_screen2);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 153;
        this.match(PDSLParser.SCREEN2);
        this.state = 155;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===PDSLParser.DESCRIPTION) {
            this.state = 154;
            this.description();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Screen1Context(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_screen1;
    return this;
}

Screen1Context.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Screen1Context.prototype.constructor = Screen1Context;

Screen1Context.prototype.SCREEN1 = function() {
    return this.getToken(PDSLParser.SCREEN1, 0);
};

Screen1Context.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

Screen1Context.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterScreen1(this);
	}
};

Screen1Context.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitScreen1(this);
	}
};




PDSLParser.Screen1Context = Screen1Context;

PDSLParser.prototype.screen1 = function() {

    var localctx = new Screen1Context(this, this._ctx, this.state);
    this.enterRule(localctx, 18, PDSLParser.RULE_screen1);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 157;
        this.match(PDSLParser.SCREEN1);
        this.state = 159;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===PDSLParser.DESCRIPTION) {
            this.state = 158;
            this.description();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ScreenContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_screen;
    return this;
}

ScreenContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ScreenContext.prototype.constructor = ScreenContext;

ScreenContext.prototype.SCREEN = function() {
    return this.getToken(PDSLParser.SCREEN, 0);
};

ScreenContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

ScreenContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterScreen(this);
	}
};

ScreenContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitScreen(this);
	}
};




PDSLParser.ScreenContext = ScreenContext;

PDSLParser.prototype.screen = function() {

    var localctx = new ScreenContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, PDSLParser.RULE_screen);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 161;
        this.match(PDSLParser.SCREEN);
        this.state = 163;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===PDSLParser.DESCRIPTION) {
            this.state = 162;
            this.description();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function CommentContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_comment;
    return this;
}

CommentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
CommentContext.prototype.constructor = CommentContext;

CommentContext.prototype.COMMENT = function() {
    return this.getToken(PDSLParser.COMMENT, 0);
};

CommentContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

CommentContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterComment(this);
	}
};

CommentContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitComment(this);
	}
};




PDSLParser.CommentContext = CommentContext;

PDSLParser.prototype.comment = function() {

    var localctx = new CommentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, PDSLParser.RULE_comment);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 165;
        this.match(PDSLParser.COMMENT);
        this.state = 167;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===PDSLParser.DESCRIPTION) {
            this.state = 166;
            this.description();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ItemrowContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_itemrow;
    return this;
}

ItemrowContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ItemrowContext.prototype.constructor = ItemrowContext;

ItemrowContext.prototype.text = function() {
    return this.getTypedRuleContext(TextContext,0);
};

ItemrowContext.prototype.stimulus = function() {
    return this.getTypedRuleContext(StimulusContext,0);
};

ItemrowContext.prototype.task = function() {
    return this.getTypedRuleContext(TaskContext,0);
};

ItemrowContext.prototype.taskforstimuli = function() {
    return this.getTypedRuleContext(TaskforstimuliContext,0);
};

ItemrowContext.prototype.ranking1d = function() {
    return this.getTypedRuleContext(Ranking1dContext,0);
};

ItemrowContext.prototype.ranking2d = function() {
    return this.getTypedRuleContext(Ranking2dContext,0);
};

ItemrowContext.prototype.style = function() {
    return this.getTypedRuleContext(StyleContext,0);
};

ItemrowContext.prototype.styleform = function() {
    return this.getTypedRuleContext(StyleformContext,0);
};

ItemrowContext.prototype.stylebutton = function() {
    return this.getTypedRuleContext(StylebuttonContext,0);
};

ItemrowContext.prototype.comment = function() {
    return this.getTypedRuleContext(CommentContext,0);
};

ItemrowContext.prototype.panel = function() {
    return this.getTypedRuleContext(PanelContext,0);
};

ItemrowContext.prototype.newrow = function() {
    return this.getTypedRuleContext(NewrowContext,0);
};

ItemrowContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterItemrow(this);
	}
};

ItemrowContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitItemrow(this);
	}
};




PDSLParser.ItemrowContext = ItemrowContext;

PDSLParser.prototype.itemrow = function() {

    var localctx = new ItemrowContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, PDSLParser.RULE_itemrow);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 181;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case PDSLParser.TEXT:
            this.state = 169;
            this.text();
            break;
        case PDSLParser.STIMULUS:
            this.state = 170;
            this.stimulus();
            break;
        case PDSLParser.TASK:
            this.state = 171;
            this.task();
            break;
        case PDSLParser.TASKFORSTIMULI:
            this.state = 172;
            this.taskforstimuli();
            break;
        case PDSLParser.RANKING1D:
            this.state = 173;
            this.ranking1d();
            break;
        case PDSLParser.RANKING2D:
            this.state = 174;
            this.ranking2d();
            break;
        case PDSLParser.STYLE:
            this.state = 175;
            this.style();
            break;
        case PDSLParser.STYLEFORM:
            this.state = 176;
            this.styleform();
            break;
        case PDSLParser.STYLEBUTTON:
            this.state = 177;
            this.stylebutton();
            break;
        case PDSLParser.COMMENT:
            this.state = 178;
            this.comment();
            break;
        case PDSLParser.PANEL:
            this.state = 179;
            this.panel();
            break;
        case PDSLParser.NEWROW:
            this.state = 180;
            this.newrow();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function PanelContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_panel;
    return this;
}

PanelContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PanelContext.prototype.constructor = PanelContext;

PanelContext.prototype.PANEL = function() {
    return this.getToken(PDSLParser.PANEL, 0);
};

PanelContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

PanelContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterPanel(this);
	}
};

PanelContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitPanel(this);
	}
};




PDSLParser.PanelContext = PanelContext;

PDSLParser.prototype.panel = function() {

    var localctx = new PanelContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, PDSLParser.RULE_panel);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 183;
        this.match(PDSLParser.PANEL);
        this.state = 185;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===PDSLParser.DESCRIPTION) {
            this.state = 184;
            this.description();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StyleContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_style;
    return this;
}

StyleContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StyleContext.prototype.constructor = StyleContext;

StyleContext.prototype.STYLE = function() {
    return this.getToken(PDSLParser.STYLE, 0);
};

StyleContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

StyleContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterStyle(this);
	}
};

StyleContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitStyle(this);
	}
};




PDSLParser.StyleContext = StyleContext;

PDSLParser.prototype.style = function() {

    var localctx = new StyleContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, PDSLParser.RULE_style);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 187;
        this.match(PDSLParser.STYLE);
        this.state = 188;
        this.description();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StyleformContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_styleform;
    return this;
}

StyleformContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StyleformContext.prototype.constructor = StyleformContext;

StyleformContext.prototype.STYLEFORM = function() {
    return this.getToken(PDSLParser.STYLEFORM, 0);
};

StyleformContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

StyleformContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterStyleform(this);
	}
};

StyleformContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitStyleform(this);
	}
};




PDSLParser.StyleformContext = StyleformContext;

PDSLParser.prototype.styleform = function() {

    var localctx = new StyleformContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, PDSLParser.RULE_styleform);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 190;
        this.match(PDSLParser.STYLEFORM);
        this.state = 191;
        this.description();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StylebuttonContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_stylebutton;
    return this;
}

StylebuttonContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StylebuttonContext.prototype.constructor = StylebuttonContext;

StylebuttonContext.prototype.STYLEBUTTON = function() {
    return this.getToken(PDSLParser.STYLEBUTTON, 0);
};

StylebuttonContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

StylebuttonContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterStylebutton(this);
	}
};

StylebuttonContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitStylebutton(this);
	}
};




PDSLParser.StylebuttonContext = StylebuttonContext;

PDSLParser.prototype.stylebutton = function() {

    var localctx = new StylebuttonContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, PDSLParser.RULE_stylebutton);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 193;
        this.match(PDSLParser.STYLEBUTTON);
        this.state = 194;
        this.description();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function TextContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_text;
    return this;
}

TextContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TextContext.prototype.constructor = TextContext;

TextContext.prototype.TEXT = function() {
    return this.getToken(PDSLParser.TEXT, 0);
};

TextContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

TextContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterText(this);
	}
};

TextContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitText(this);
	}
};




PDSLParser.TextContext = TextContext;

PDSLParser.prototype.text = function() {

    var localctx = new TextContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, PDSLParser.RULE_text);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 196;
        this.match(PDSLParser.TEXT);
        this.state = 198;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===PDSLParser.DESCRIPTION) {
            this.state = 197;
            this.description();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function NewrowContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_newrow;
    return this;
}

NewrowContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NewrowContext.prototype.constructor = NewrowContext;

NewrowContext.prototype.NEWROW = function() {
    return this.getToken(PDSLParser.NEWROW, 0);
};

NewrowContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterNewrow(this);
	}
};

NewrowContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitNewrow(this);
	}
};




PDSLParser.NewrowContext = NewrowContext;

PDSLParser.prototype.newrow = function() {

    var localctx = new NewrowContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, PDSLParser.RULE_newrow);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 200;
        this.match(PDSLParser.NEWROW);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StimulusContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_stimulus;
    return this;
}

StimulusContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StimulusContext.prototype.constructor = StimulusContext;

StimulusContext.prototype.STIMULUS = function() {
    return this.getToken(PDSLParser.STIMULUS, 0);
};

StimulusContext.prototype.field = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FieldContext);
    } else {
        return this.getTypedRuleContext(FieldContext,i);
    }
};

StimulusContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(PDSLParser.COMMA);
    } else {
        return this.getToken(PDSLParser.COMMA, i);
    }
};


StimulusContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterStimulus(this);
	}
};

StimulusContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitStimulus(this);
	}
};




PDSLParser.StimulusContext = StimulusContext;

PDSLParser.prototype.stimulus = function() {

    var localctx = new StimulusContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, PDSLParser.RULE_stimulus);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 202;
        this.match(PDSLParser.STIMULUS);
        this.state = 203;
        this.field();
        this.state = 208;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===PDSLParser.COMMA) {
            this.state = 204;
            this.match(PDSLParser.COMMA);
            this.state = 205;
            this.field();
            this.state = 210;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function TaskContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_task;
    return this;
}

TaskContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TaskContext.prototype.constructor = TaskContext;

TaskContext.prototype.TASK = function() {
    return this.getToken(PDSLParser.TASK, 0);
};

TaskContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

TaskContext.prototype.valuerow = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ValuerowContext);
    } else {
        return this.getTypedRuleContext(ValuerowContext,i);
    }
};

TaskContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterTask(this);
	}
};

TaskContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitTask(this);
	}
};




PDSLParser.TaskContext = TaskContext;

PDSLParser.prototype.task = function() {

    var localctx = new TaskContext(this, this._ctx, this.state);
    this.enterRule(localctx, 40, PDSLParser.RULE_task);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 211;
        this.match(PDSLParser.TASK);
        this.state = 213;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===PDSLParser.DESCRIPTION) {
            this.state = 212;
            this.description();
        }

        this.state = 218;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(((((_la - 25)) & ~0x1f) == 0 && ((1 << (_la - 25)) & ((1 << (PDSLParser.VALUES - 25)) | (1 << (PDSLParser.VALUESONROW - 25)) | (1 << (PDSLParser.CHECKBOXVALUES - 25)) | (1 << (PDSLParser.CHECKBOXVALUESONROW - 25)) | (1 << (PDSLParser.SCALEVALUES - 25)) | (1 << (PDSLParser.SCALE - 25)) | (1 << (PDSLParser.EDIT - 25)))) !== 0)) {
            this.state = 215;
            this.valuerow();
            this.state = 220;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function TaskforstimuliContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_taskforstimuli;
    return this;
}

TaskforstimuliContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TaskforstimuliContext.prototype.constructor = TaskforstimuliContext;

TaskforstimuliContext.prototype.TASKFORSTIMULI = function() {
    return this.getToken(PDSLParser.TASKFORSTIMULI, 0);
};

TaskforstimuliContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

TaskforstimuliContext.prototype.valuerow = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ValuerowContext);
    } else {
        return this.getTypedRuleContext(ValuerowContext,i);
    }
};

TaskforstimuliContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterTaskforstimuli(this);
	}
};

TaskforstimuliContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitTaskforstimuli(this);
	}
};




PDSLParser.TaskforstimuliContext = TaskforstimuliContext;

PDSLParser.prototype.taskforstimuli = function() {

    var localctx = new TaskforstimuliContext(this, this._ctx, this.state);
    this.enterRule(localctx, 42, PDSLParser.RULE_taskforstimuli);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 221;
        this.match(PDSLParser.TASKFORSTIMULI);
        this.state = 222;
        this.description();
        this.state = 226;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(((((_la - 25)) & ~0x1f) == 0 && ((1 << (_la - 25)) & ((1 << (PDSLParser.VALUES - 25)) | (1 << (PDSLParser.VALUESONROW - 25)) | (1 << (PDSLParser.CHECKBOXVALUES - 25)) | (1 << (PDSLParser.CHECKBOXVALUESONROW - 25)) | (1 << (PDSLParser.SCALEVALUES - 25)) | (1 << (PDSLParser.SCALE - 25)) | (1 << (PDSLParser.EDIT - 25)))) !== 0)) {
            this.state = 223;
            this.valuerow();
            this.state = 228;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Ranking1dContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_ranking1d;
    return this;
}

Ranking1dContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Ranking1dContext.prototype.constructor = Ranking1dContext;

Ranking1dContext.prototype.RANKING1D = function() {
    return this.getToken(PDSLParser.RANKING1D, 0);
};

Ranking1dContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

Ranking1dContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterRanking1d(this);
	}
};

Ranking1dContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitRanking1d(this);
	}
};




PDSLParser.Ranking1dContext = Ranking1dContext;

PDSLParser.prototype.ranking1d = function() {

    var localctx = new Ranking1dContext(this, this._ctx, this.state);
    this.enterRule(localctx, 44, PDSLParser.RULE_ranking1d);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 229;
        this.match(PDSLParser.RANKING1D);
        this.state = 230;
        this.description();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Ranking2dContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_ranking2d;
    return this;
}

Ranking2dContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Ranking2dContext.prototype.constructor = Ranking2dContext;

Ranking2dContext.prototype.RANKING2D = function() {
    return this.getToken(PDSLParser.RANKING2D, 0);
};

Ranking2dContext.prototype.rfield = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(RfieldContext);
    } else {
        return this.getTypedRuleContext(RfieldContext,i);
    }
};

Ranking2dContext.prototype.SEMICOLON = function() {
    return this.getToken(PDSLParser.SEMICOLON, 0);
};

Ranking2dContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterRanking2d(this);
	}
};

Ranking2dContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitRanking2d(this);
	}
};




PDSLParser.Ranking2dContext = Ranking2dContext;

PDSLParser.prototype.ranking2d = function() {

    var localctx = new Ranking2dContext(this, this._ctx, this.state);
    this.enterRule(localctx, 46, PDSLParser.RULE_ranking2d);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 232;
        this.match(PDSLParser.RANKING2D);
        this.state = 233;
        this.rfield();
        this.state = 234;
        this.match(PDSLParser.SEMICOLON);
        this.state = 236;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===PDSLParser.ITEM2 || _la===PDSLParser.STRING2) {
            this.state = 235;
            this.rfield();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function FieldContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_field;
    return this;
}

FieldContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FieldContext.prototype.constructor = FieldContext;

FieldContext.prototype.STRING = function() {
    return this.getToken(PDSLParser.STRING, 0);
};

FieldContext.prototype.ITEM = function() {
    return this.getToken(PDSLParser.ITEM, 0);
};

FieldContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterField(this);
	}
};

FieldContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitField(this);
	}
};




PDSLParser.FieldContext = FieldContext;

PDSLParser.prototype.field = function() {

    var localctx = new FieldContext(this, this._ctx, this.state);
    this.enterRule(localctx, 48, PDSLParser.RULE_field);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 238;
        _la = this._input.LA(1);
        if(!(_la===PDSLParser.ITEM || _la===PDSLParser.STRING)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function RfieldContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_rfield;
    return this;
}

RfieldContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RfieldContext.prototype.constructor = RfieldContext;

RfieldContext.prototype.STRING2 = function() {
    return this.getToken(PDSLParser.STRING2, 0);
};

RfieldContext.prototype.ITEM2 = function() {
    return this.getToken(PDSLParser.ITEM2, 0);
};

RfieldContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterRfield(this);
	}
};

RfieldContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitRfield(this);
	}
};




PDSLParser.RfieldContext = RfieldContext;

PDSLParser.prototype.rfield = function() {

    var localctx = new RfieldContext(this, this._ctx, this.state);
    this.enterRule(localctx, 50, PDSLParser.RULE_rfield);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 240;
        _la = this._input.LA(1);
        if(!(_la===PDSLParser.ITEM2 || _la===PDSLParser.STRING2)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ValuerowContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_valuerow;
    return this;
}

ValuerowContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ValuerowContext.prototype.constructor = ValuerowContext;

ValuerowContext.prototype.values = function() {
    return this.getTypedRuleContext(ValuesContext,0);
};

ValuerowContext.prototype.valuesr = function() {
    return this.getTypedRuleContext(ValuesrContext,0);
};

ValuerowContext.prototype.valuesc = function() {
    return this.getTypedRuleContext(ValuescContext,0);
};

ValuerowContext.prototype.valuescr = function() {
    return this.getTypedRuleContext(ValuescrContext,0);
};

ValuerowContext.prototype.scalevalues = function() {
    return this.getTypedRuleContext(ScalevaluesContext,0);
};

ValuerowContext.prototype.scale = function() {
    return this.getTypedRuleContext(ScaleContext,0);
};

ValuerowContext.prototype.edit = function() {
    return this.getTypedRuleContext(EditContext,0);
};

ValuerowContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterValuerow(this);
	}
};

ValuerowContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitValuerow(this);
	}
};




PDSLParser.ValuerowContext = ValuerowContext;

PDSLParser.prototype.valuerow = function() {

    var localctx = new ValuerowContext(this, this._ctx, this.state);
    this.enterRule(localctx, 52, PDSLParser.RULE_valuerow);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 249;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case PDSLParser.VALUES:
            this.state = 242;
            this.values();
            break;
        case PDSLParser.VALUESONROW:
            this.state = 243;
            this.valuesr();
            break;
        case PDSLParser.CHECKBOXVALUES:
            this.state = 244;
            this.valuesc();
            break;
        case PDSLParser.CHECKBOXVALUESONROW:
            this.state = 245;
            this.valuescr();
            break;
        case PDSLParser.SCALEVALUES:
            this.state = 246;
            this.scalevalues();
            break;
        case PDSLParser.SCALE:
            this.state = 247;
            this.scale();
            break;
        case PDSLParser.EDIT:
            this.state = 248;
            this.edit();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ValuesContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_values;
    return this;
}

ValuesContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ValuesContext.prototype.constructor = ValuesContext;

ValuesContext.prototype.VALUES = function() {
    return this.getToken(PDSLParser.VALUES, 0);
};

ValuesContext.prototype.field = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FieldContext);
    } else {
        return this.getTypedRuleContext(FieldContext,i);
    }
};

ValuesContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(PDSLParser.COMMA);
    } else {
        return this.getToken(PDSLParser.COMMA, i);
    }
};


ValuesContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterValues(this);
	}
};

ValuesContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitValues(this);
	}
};




PDSLParser.ValuesContext = ValuesContext;

PDSLParser.prototype.values = function() {

    var localctx = new ValuesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 54, PDSLParser.RULE_values);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 251;
        this.match(PDSLParser.VALUES);
        this.state = 252;
        this.field();
        this.state = 257;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===PDSLParser.COMMA) {
            this.state = 253;
            this.match(PDSLParser.COMMA);
            this.state = 254;
            this.field();
            this.state = 259;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ValuesrContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_valuesr;
    return this;
}

ValuesrContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ValuesrContext.prototype.constructor = ValuesrContext;

ValuesrContext.prototype.VALUESONROW = function() {
    return this.getToken(PDSLParser.VALUESONROW, 0);
};

ValuesrContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

ValuesrContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterValuesr(this);
	}
};

ValuesrContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitValuesr(this);
	}
};




PDSLParser.ValuesrContext = ValuesrContext;

PDSLParser.prototype.valuesr = function() {

    var localctx = new ValuesrContext(this, this._ctx, this.state);
    this.enterRule(localctx, 56, PDSLParser.RULE_valuesr);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 260;
        this.match(PDSLParser.VALUESONROW);
        this.state = 261;
        this.description();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ValuescContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_valuesc;
    return this;
}

ValuescContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ValuescContext.prototype.constructor = ValuescContext;

ValuescContext.prototype.CHECKBOXVALUES = function() {
    return this.getToken(PDSLParser.CHECKBOXVALUES, 0);
};

ValuescContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

ValuescContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterValuesc(this);
	}
};

ValuescContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitValuesc(this);
	}
};




PDSLParser.ValuescContext = ValuescContext;

PDSLParser.prototype.valuesc = function() {

    var localctx = new ValuescContext(this, this._ctx, this.state);
    this.enterRule(localctx, 58, PDSLParser.RULE_valuesc);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 263;
        this.match(PDSLParser.CHECKBOXVALUES);
        this.state = 264;
        this.description();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ValuescrContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_valuescr;
    return this;
}

ValuescrContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ValuescrContext.prototype.constructor = ValuescrContext;

ValuescrContext.prototype.CHECKBOXVALUESONROW = function() {
    return this.getToken(PDSLParser.CHECKBOXVALUESONROW, 0);
};

ValuescrContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

ValuescrContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterValuescr(this);
	}
};

ValuescrContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitValuescr(this);
	}
};




PDSLParser.ValuescrContext = ValuescrContext;

PDSLParser.prototype.valuescr = function() {

    var localctx = new ValuescrContext(this, this._ctx, this.state);
    this.enterRule(localctx, 60, PDSLParser.RULE_valuescr);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 266;
        this.match(PDSLParser.CHECKBOXVALUESONROW);
        this.state = 267;
        this.description();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ScalevaluesContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_scalevalues;
    return this;
}

ScalevaluesContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ScalevaluesContext.prototype.constructor = ScalevaluesContext;

ScalevaluesContext.prototype.SCALEVALUES = function() {
    return this.getToken(PDSLParser.SCALEVALUES, 0);
};

ScalevaluesContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

ScalevaluesContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterScalevalues(this);
	}
};

ScalevaluesContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitScalevalues(this);
	}
};




PDSLParser.ScalevaluesContext = ScalevaluesContext;

PDSLParser.prototype.scalevalues = function() {

    var localctx = new ScalevaluesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 62, PDSLParser.RULE_scalevalues);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 269;
        this.match(PDSLParser.SCALEVALUES);
        this.state = 270;
        this.description();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ScaleContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_scale;
    return this;
}

ScaleContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ScaleContext.prototype.constructor = ScaleContext;

ScaleContext.prototype.SCALE = function() {
    return this.getToken(PDSLParser.SCALE, 0);
};

ScaleContext.prototype.description = function() {
    return this.getTypedRuleContext(DescriptionContext,0);
};

ScaleContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterScale(this);
	}
};

ScaleContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitScale(this);
	}
};




PDSLParser.ScaleContext = ScaleContext;

PDSLParser.prototype.scale = function() {

    var localctx = new ScaleContext(this, this._ctx, this.state);
    this.enterRule(localctx, 64, PDSLParser.RULE_scale);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 272;
        this.match(PDSLParser.SCALE);
        this.state = 273;
        this.description();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function EditContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PDSLParser.RULE_edit;
    return this;
}

EditContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EditContext.prototype.constructor = EditContext;

EditContext.prototype.EDIT = function() {
    return this.getToken(PDSLParser.EDIT, 0);
};

EditContext.prototype.enterRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.enterEdit(this);
	}
};

EditContext.prototype.exitRule = function(listener) {
    if(listener instanceof PDSLParserListener ) {
        listener.exitEdit(this);
	}
};




PDSLParser.EditContext = EditContext;

PDSLParser.prototype.edit = function() {

    var localctx = new EditContext(this, this._ctx, this.state);
    this.enterRule(localctx, 66, PDSLParser.RULE_edit);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 275;
        this.match(PDSLParser.EDIT);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.PDSLParser = PDSLParser;
