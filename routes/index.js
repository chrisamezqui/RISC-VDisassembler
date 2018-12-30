var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET code page. */
router.get('/code', function(req, res) {
  res.render('code', {title: 'Simple RISC-V Disassembler'});
});

module.exports = router;
