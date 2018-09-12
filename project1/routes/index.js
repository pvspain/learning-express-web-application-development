var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Implement a counter for page views using session middleware
  // Any serialisable object can be added to MongoStore
  //  - persisiting a db connection is a bad idea!
  if (!req.session.views) {
    req.session.views = 0;
  }
  req.session.views++;
  res.render('index', { 
    title: 'Express', 
    user: req.user,
    views: req.session.views
   });
});

module.exports = router;
