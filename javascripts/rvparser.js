var rvparser = function() {
  this.tokenize = function(assembly) {
    console.log('tokenizing..');

    var lines = assembly.split('\n');
    var tokens = [];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].split(' ');
      var token = {
        type : 'normal',
        instruction : line[0]
        //args: line.slice(1)
      };
      var args = line.slice(1);
      token.args = [];
      for (var j = 0; j < args.length; j++) {
        if (args[j].charAt(0) == 'x') {
          token.args.push(args[j].charAt(1));
        } else {
          token.args.push(args[j]);
        }
      }
      tokens.push(token);

    }
    return tokens;
  }
};

module.exports = new rvparser();
