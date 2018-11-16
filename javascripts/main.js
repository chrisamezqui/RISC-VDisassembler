var parser = require('node-c-parser');

$(function() {
  var textbox = document.getElementById('code');
  var cm = CodeMirror.fromTextArea(textbox, {
    value : "Hello World",
    mode : "C-like",
    lineNumbers : true,
    lineWrapping : true
  });
  document.getElementById('codeform').addEventListener('submit', processCode);
});

function processCode(e) {
  var input = document.getElementById('codeform').elements['code'].value;
  console.log(input);
}
