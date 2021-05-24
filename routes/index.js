var express = require('express');
var router = express.Router();
const file = "../private/resources/carlist.json";

var carlist = JSON.parse(fs.readFileSync(file));
console.log(carlist.cars[0].make);

router.get('/', function(req, res, next) {
  res.render('index', {title: 'Route Planner'})
});

module.exports = router;