var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var carlist = req.app.get('carlist');
  var package = { title : 'Route Planner', carlist }
  res.render('index', package)
});

module.exports = router;