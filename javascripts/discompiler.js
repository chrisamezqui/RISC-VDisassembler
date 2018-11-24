var parser = require('./rvparser');

var discompiler = function() {

  /* Default all registers to contain no variable represented by null */
  var registers = new Array(32);
  for (var i = 0; i < 32; i++) {
    registers.push(null);
  }

  var memory = [];
  var varCount = 0;

  var variable = function(name, value, addr) {
    this.name = name;
    this.val = value;
    this.addr = addr;

    this.toMem = function(addr) {
      this.addr = addr;
    }

    this.toReg = function(reg) {
      registers[reg] = this;
    }
  };

  /* stack pointer */
  registers[2] = new variable('stack pointer', 2048, null);




  /* r1 = r2 + r3 */
  //this.add = function(r1, r2, r3) {

  //}

  function handleLi(args) {
    var r1 = args[0];
    var val = args[1];
    if (registers[r1] == null) {
      varCount += 1;
      var newName = 'var' + varCount.toString();
      registers[r1] = new variable(newName, val, null);
    } else {
      registers[r1].val = val;
    }
    var conversion = 'int ' + registers[r1].name + ' = ' + val + ';';
    return conversion;
  }

  this.discompile = function(assembly) {
    console.log('discompiling..');
    var output = [];
    var tokens = parser.tokenize(assembly);
    for (var i = 0; i < tokens.length; i++) {
      switch(tokens[i].instruction) {
        case 'li' :
          output.push(handleLi(tokens[i].args));
          break;
      }
    }
    return output;
  }
};

module.exports = new discompiler();
