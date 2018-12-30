var parser = require('./rvparser');

var discompiler = function() {

  /* Default all registers to contain no variable represented by null */
  var registers = new Array(32);


  var memory = [];
  var varCount = 0;

  var variable = function(name, addr) {
    this.name = name;
    //this.val = value;
    this.addr = addr;

    this.toMem = function(addr) {
      this.addr = addr;
    }

    this.toReg = function(reg) {
      registers[reg] = this;
    }
  };

  function createStdVar() {
    varCount += 1;
    var newName = 'var' + varCount.toString();
    return new variable(newName, null);
  }

  /* Load val into register r1. */
  function handleLi(args) {
    var r1 = args[0];
    var val = args[1];
    if (registers[r1] == null) {
      /*varCount += 1;
      var newName = 'var' + varCount.toString();
      registers[r1] = new variable(newName, val, null);*/
      registers[r1] = createStdVar();
      return 'int ' + registers[r1].name + ' = ' + val + ';';
    } else {
      //registers[r1].val = val;
      return registers[r1].name + ' = ' + val + ';';
    }
  }

  /* Add val to r2 and store in r1. */
  function handleAddi(args) {
    var r1 = args[0];
    var r2 = args[1];
    var val = args[2];
    if (registers[r2] == null) {
      throw "Error: a register requires assignment."
    }
    //var sum = parseInt(registers[r2].val) + parseInt(val);
    if (registers[r1] == null) {
      registers[r1] = createStdVar();
      return 'int ' + registers[r1].name + ' = ' + registers[r2].name + ' + ' + val + ';';
    } else {
      //registers[r1].val = sum;
      return registers[r1].name + ' = ' + registers[r2].name + ' + ' + val + ';';
    }
  }

  function handleJal(args) {
    
  }

  this.discompile = function(assembly) {
    console.log('discompiling..');

    /* Initialize environment */
    varCount = 0;
    registers = new Array(32);
    for (var i = 0; i < 32; i++) {
      registers.push(null);
    }
    memory = [];
    /* Initialize stack pointer */
    registers[2] = new variable('stack pointer', 2048, null);


    var output = [];
    var tokens = parser.tokenize(assembly);
    for (var i = 0; i < tokens.length; i++) {
      switch(tokens[i].instruction) {
        case 'li' :
          output.push(handleLi(tokens[i].args));
          break;
        case 'addi':
          output.push(handleAddi(tokens[i].args));
          break;
        case 'jal':
          break;
        default:
          //is a tag
      }
    }
    return output;
  }

  //Todo: function to format loops, if statements and ponters.. */
  this.format = function(code) {
    return null;
  }
};

module.exports = new discompiler();
