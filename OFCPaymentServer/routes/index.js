var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  console.log("Request cought");
  makePayment(req.body);
  res.redirect('/');
});

module.exports = router;

function makePayment(req) {
  console.log("MakePayment request" + JSON.stringify(req));
}
