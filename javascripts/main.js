// var parser = require('node-c-parser'); For use with future implementation of C to RISC-V compiler
var discompiler = require('./discompiler');

/* Implement code mirror textarea. */
var textbox = document.getElementById('code');
var cm = CodeMirror.fromTextArea(textbox, {
  value : "Hello World",
  mode : "C-like",
  lineNumbers : true,
  lineWrapping : true
});
cm.setSize(800,550);

/* On page load, assign event listeners. */
$(function() {
  document.getElementById('codeform').addEventListener('submit', processCode);
});



function processCode(e) {
  let input = document.getElementById('codeform').elements['code'].value;
  try {
    let output = discompiler.discompile(input);
    console.log(output);
  } catch(e) {
    console.log(e);
  }


  /*place holder */
  /*try {
    var output = discompiler.discompile(input);
    var margin = 0;
    var htmloutput = 'int main(args[]) {<br><div style=\'margin-left:40px\'>';
    for (var i = 0; i < output.length; i++) {
      if (output[i] != null) {
        htmloutput += output[i] + '<br>';
      }
    }
    htmloutput += 'return 0;</div>};';
  } catch(e) {
    //Placeholder
    var htmloutput = 'Error 100: Something went wrong.';
  }

  document.getElementById('codeoutput').innerHTML = htmloutput;
  */

}


/*
EXAMPLE CODE FOR FUTURE IMPLEMENTATION OF C-PARSER/COMPIILER
var input = document.getElementById('codeform').elements['code'].value;
console.log(input);
var tokens = parser.lexer.lexUnit.tokenize(input);
console.log(tokens);
var parse_tree = parser.parse(tokens);
console.log(parse_tree);
*/
