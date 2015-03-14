ace.define("ace/mode/sh",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/sh_highlight_rules","ace/range","ace/mode/folding/cstyle","ace/mode/behaviour/cstyle"],function(e,t,n){var r=e("../lib/oop"),o=e("./text").Mode,i=e("./sh_highlight_rules").ShHighlightRules,s=e("../range").Range,a=e("./folding/cstyle").FoldMode,u=e("./behaviour/cstyle").CstyleBehaviour,l=function(){this.HighlightRules=i,this.foldingRules=new a,this.$behaviour=new u};r.inherits(l,o),function(){this.lineCommentStart="#",this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),o=this.getTokenizer().getLineTokens(t,e),i=o.tokens;if(i.length&&"comment"==i[i.length-1].type)return r;if("start"==e){var s=t.match(/^.*[\{\(\[\:]\s*$/);s&&(r+=n)}return r};var e={pass:1,"return":1,raise:1,"break":1,"continue":1};this.checkOutdent=function(t,n,r){if("\r\n"!==r&&"\r"!==r&&"\n"!==r)return!1;var o=this.getTokenizer().getLineTokens(n.trim(),t).tokens;if(!o)return!1;do var i=o.pop();while(i&&("comment"==i.type||"text"==i.type&&i.value.match(/^\s+$/)));return i?"keyword"==i.type&&e[i.value]:!1},this.autoOutdent=function(e,t,n){n+=1;var r=this.$getIndent(t.getLine(n)),o=t.getTabString();r.slice(-o.length)==o&&t.remove(new s(n,r.length-o.length,n,r.length))},this.$id="ace/mode/sh"}.call(l.prototype),t.Mode=l}),ace.define("ace/mode/sh_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){var r=e("../lib/oop"),o=e("./text_highlight_rules").TextHighlightRules,i=t.reservedKeywords="!|{|}|case|do|done|elif|else|esac|fi|for|if|in|then|until|while|&|;|export|local|read|typeset|unset|elif|select|set",s=t.languageConstructs="[|]|alias|bg|bind|break|builtin|cd|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|source|suspend|test|times|trap|type|ulimit|umask|unalias|wait",a=function(){var e=this.createKeywordMapper({keyword:i,"support.function.builtin":s,"invalid.deprecated":"debugger"},"identifier"),t="(?:(?:[1-9]\\d*)|(?:0))",n="(?:\\.\\d+)",r="(?:\\d+)",o="(?:(?:"+r+"?"+n+")|(?:"+r+"\\.))",a="(?:(?:"+o+"|"+r+"))",u="(?:"+a+"|"+o+")",l="(?:&"+r+")",c="[a-zA-Z_][a-zA-Z0-9_]*",d="(?:(?:\\$"+c+")|(?:"+c+"=))",g="(?:\\$(?:SHLVL|\\$|\\!|\\?))",h="(?:"+c+"\\s*\\(\\))";this.$rules={start:[{token:"constant",regex:/\\./},{token:["text","comment"],regex:/(^|\s)(#.*)$/},{token:"string",regex:'"',push:[{token:"constant.language.escape",regex:/\\(?:[$abeEfnrtv\\'"]|x[a-fA-F\d]{1,2}|u[a-fA-F\d]{4}([a-fA-F\d]{4})?|c.|\d{1,3})/},{token:"constant",regex:/\$\w+/},{token:"string",regex:'"',next:"pop"},{defaultToken:"string"}]},{token:"variable.language",regex:g},{token:"variable",regex:d},{token:"support.function",regex:h},{token:"support.function",regex:l},{token:"string",start:"'",end:"'"},{token:"constant.numeric",regex:u},{token:"constant.numeric",regex:t+"\\b"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|~|<|>|<=|=>|=|!="},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"}]},this.normalizeRules()};r.inherits(a,o),t.ShHighlightRules=a}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){var r=e("../../lib/oop"),o=e("../../range").Range,i=e("./fold_mode").FoldMode,s=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};r.inherits(s,i),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(e,t,n,r){var o=e.getLine(n),i=o.match(this.foldingStartMarker);if(i){var s=i.index;if(i[1])return this.openingBracketBlock(e,i[1],n,s);var a=e.getCommentFoldRange(n,s+i[0].length,1);return a&&!a.isMultiLine()&&(r?a=this.getSectionRange(e,n):"all"!=t&&(a=null)),a}if("markbegin"!==t){var i=o.match(this.foldingStopMarker);if(i){var s=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],n,s):e.getCommentFoldRange(n,s,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),r=n.search(/\S/),i=t,s=n.length;t+=1;for(var a=t,u=e.getLength();++t<u;){n=e.getLine(t);var l=n.search(/\S/);if(-1!==l){if(r>l)break;var c=this.getFoldWidgetRange(e,"all",t);if(c){if(c.start.row<=i)break;if(c.isMultiLine())t=c.end.row;else if(r==l)break}a=t}}return new o(i,s,a,e.getLine(a).length)}}.call(s.prototype)}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t,n){var r=e("../../lib/oop"),o=e("../behaviour").Behaviour,i=e("../../token_iterator").TokenIterator,s=e("../../lib/lang"),a=["text","paren.rparen","punctuation.operator"],u=["text","paren.rparen","punctuation.operator","comment"],l,c={},d=function(e){var t=-1;return e.multiSelect&&(t=e.selection.id,c.rangeCount!=e.multiSelect.rangeCount&&(c={rangeCount:e.multiSelect.rangeCount})),c[t]?l=c[t]:void(l=c[t]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""})},g=function(){this.add("braces","insertion",function(e,t,n,r,o){var i=n.getCursorPosition(),a=r.doc.getLine(i.row);if("{"==o){d(n);var u=n.getSelectionRange(),c=r.doc.getTextRange(u);if(""!==c&&"{"!==c&&n.getWrapBehavioursEnabled())return{text:"{"+c+"}",selection:!1};if(g.isSaneInsertion(n,r))return/[\]\}\)]/.test(a[i.column])||n.inMultiSelectMode?(g.recordAutoInsert(n,r,"}"),{text:"{}",selection:[1,1]}):(g.recordMaybeInsert(n,r,"{"),{text:"{",selection:[1,1]})}else if("}"==o){d(n);var h=a.substring(i.column,i.column+1);if("}"==h){var f=r.$findOpeningBracket("}",{column:i.column+1,row:i.row});if(null!==f&&g.isAutoInsertedClosing(i,a,o))return g.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==o||"\r\n"==o){d(n);var m="";g.isMaybeInsertedClosing(i,a)&&(m=s.stringRepeat("}",l.maybeInsertedBrackets),g.clearMaybeInsertedClosing());var h=a.substring(i.column,i.column+1);if("}"===h){var p=r.findMatchingBracket({row:i.row,column:i.column+1},"}");if(!p)return null;var b=this.$getIndent(r.getLine(p.row))}else{if(!m)return void g.clearMaybeInsertedClosing();var b=this.$getIndent(a)}var v=b+r.getTabString();return{text:"\n"+v+"\n"+b+m,selection:[1,v.length,1,v.length]}}g.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"{"==i){d(n);var s=r.doc.getLine(o.start.row),a=s.substring(o.end.column,o.end.column+1);if("}"==a)return o.end.column++,o;l.maybeInsertedBrackets--}}),this.add("parens","insertion",function(e,t,n,r,o){if("("==o){d(n);var i=n.getSelectionRange(),s=r.doc.getTextRange(i);if(""!==s&&n.getWrapBehavioursEnabled())return{text:"("+s+")",selection:!1};if(g.isSaneInsertion(n,r))return g.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(")"==o){d(n);var a=n.getCursorPosition(),u=r.doc.getLine(a.row),l=u.substring(a.column,a.column+1);if(")"==l){var c=r.$findOpeningBracket(")",{column:a.column+1,row:a.row});if(null!==c&&g.isAutoInsertedClosing(a,u,o))return g.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"("==i){d(n);var s=r.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if(")"==a)return o.end.column++,o}}),this.add("brackets","insertion",function(e,t,n,r,o){if("["==o){d(n);var i=n.getSelectionRange(),s=r.doc.getTextRange(i);if(""!==s&&n.getWrapBehavioursEnabled())return{text:"["+s+"]",selection:!1};if(g.isSaneInsertion(n,r))return g.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if("]"==o){d(n);var a=n.getCursorPosition(),u=r.doc.getLine(a.row),l=u.substring(a.column,a.column+1);if("]"==l){var c=r.$findOpeningBracket("]",{column:a.column+1,row:a.row});if(null!==c&&g.isAutoInsertedClosing(a,u,o))return g.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"["==i){d(n);var s=r.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if("]"==a)return o.end.column++,o}}),this.add("string_dquotes","insertion",function(e,t,n,r,o){if('"'==o||"'"==o){d(n);var i=o,s=n.getSelectionRange(),a=r.doc.getTextRange(s);if(""!==a&&"'"!==a&&'"'!=a&&n.getWrapBehavioursEnabled())return{text:i+a+i,selection:!1};var u=n.getCursorPosition(),l=r.doc.getLine(u.row),c=l.substring(u.column-1,u.column);if("\\"==c)return null;for(var h=r.getTokens(s.start.row),f=0,m,p=-1,b=0;b<h.length&&(m=h[b],"string"==m.type?p=-1:0>p&&(p=m.value.indexOf(i)),!(m.value.length+f>s.start.column));b++)f+=h[b].value.length;if(!m||0>p&&"comment"!==m.type&&("string"!==m.type||s.start.column!==m.value.length+f-1&&m.value.lastIndexOf(i)===m.value.length-1)){if(!g.isSaneInsertion(n,r))return;return{text:i+i,selection:[1,1]}}if(m&&"string"===m.type){var v=l.substring(u.column,u.column+1);if(v==i)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==i||"'"==i)){d(n);var s=r.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if(a==i)return o.end.column++,o}})};g.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new i(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||"text",a)){var o=new i(t,n.row,n.column+1);if(!this.$matchTokenType(o.getCurrentToken()||"text",a))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",u)},g.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},g.recordAutoInsert=function(e,t,n){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isAutoInsertedClosing(r,o,l.autoInsertedLineEnd[0])||(l.autoInsertedBrackets=0),l.autoInsertedRow=r.row,l.autoInsertedLineEnd=n+o.substr(r.column),l.autoInsertedBrackets++},g.recordMaybeInsert=function(e,t,n){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isMaybeInsertedClosing(r,o)||(l.maybeInsertedBrackets=0),l.maybeInsertedRow=r.row,l.maybeInsertedLineStart=o.substr(0,r.column)+n,l.maybeInsertedLineEnd=o.substr(r.column),l.maybeInsertedBrackets++},g.isAutoInsertedClosing=function(e,t,n){return l.autoInsertedBrackets>0&&e.row===l.autoInsertedRow&&n===l.autoInsertedLineEnd[0]&&t.substr(e.column)===l.autoInsertedLineEnd},g.isMaybeInsertedClosing=function(e,t){return l.maybeInsertedBrackets>0&&e.row===l.maybeInsertedRow&&t.substr(e.column)===l.maybeInsertedLineEnd&&t.substr(0,e.column)==l.maybeInsertedLineStart},g.popAutoInsertedClosing=function(){l.autoInsertedLineEnd=l.autoInsertedLineEnd.substr(1),l.autoInsertedBrackets--},g.clearMaybeInsertedClosing=function(){l&&(l.maybeInsertedBrackets=0,l.maybeInsertedRow=-1)},r.inherits(g,o),t.CstyleBehaviour=g});