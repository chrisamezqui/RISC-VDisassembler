var parser = require('./rvparser');

var discompiler = function() {

  /* Default all registers to contain no variable represented by null */
  var registers = new Array(32);

  /* Maps tag symbol to code line. */
  var refTable = new Map();

  /* Each elements is: ['jump start', 'jump destination', 'instruction type']. */
  var jumpTable = [];

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
    if (r2 != 0 && registers[r2] == null) {
      throw "Error: a register requires assignment."
    }
    //var sum = parseInt(registers[r2].val) + parseInt(val);
    var out = '';
    if (registers[r1] == null) {
      registers[r1] = createStdVar();
      out += 'int ';
    }
    if (r2 == 0) {
      out += registers[r1].name + ' = ' + val + ';';
    } else {
      out += registers[r1].name + ' = ' + registers[r2].name + ' + ' + val + ';';
    }
    return out;
  }

  //Assumption: return address is always stored in x1 register. there shouldn't be arithmetic with it.
  function handleJal(args, line) {
    //var rd = args[0];
    var symbol = args[1];
    jumpTable.push([line, symbol, 'jal']);
  }

  function handleTag(symbol, lineNum) {
    refTable.set(symbol.slice(0,-1), lineNum);
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
    refTable = new Map();
    jumpTable = [];
    var lineNum = 0; // Corresponds to the line in transalated code, not assembly input.

    /* Initialize stack pointer */
    registers[2] = new variable('stack pointer', 2048, null);


    var output = [];
    var tokens = parser.tokenize(assembly);
    for (var i = 0; i < tokens.length; i++) {
      switch(tokens[i].instruction) {
        case 'li' :
          output.push(handleLi(tokens[i].args));
          lineNum+=1;
          break;
        case 'addi':
          output.push(handleAddi(tokens[i].args));
          lineNum+=1;
          break;
        case 'jal':
          handleJal(tokens[i].args, lineNum);
          break;
        default:
          handleTag(tokens[i].instruction, lineNum);
      }
    }
    //console.log(refTable);
    //console.log(jumpTable);
    return output;
  }

  //Todo: function to format loops, if statements and ponters.. */
  this.format = function(code) {
    return null;
  }
};

module.exports = new discompiler();
