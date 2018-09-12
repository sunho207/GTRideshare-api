/*
Common Application Routes
*/

var express = require('express');
var router = express.Router();

/* Mailing Route */
// To access: {url}/common/mail
router.post('/mail', function(req, res, next) {
  res.send('Mail sent');
});

module.exports = router;