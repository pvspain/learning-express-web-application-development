var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('list', {});
});

router.post('/', function(req, res) {
  res.send('Post worked!');
});

router.get('/add', function(req, res) {
  res.render('add', {});
});

router.route('/:contact_id')
  .all(function(req, res, next) {
    contact_id = req.params.contact_id;
    next();
  })
  .get(function(req, res) {
    res.render('edit', {});
  })
  .post(function(req, res) {
    res.send('Post for contact '+contact_id);
  })
  .put(function(req, res) {
    res.send('Put for contact '+contact_id);
  })
  .delete(function(req, res) {
    res.send('Delete for contact '+contact_id);
  });

module.exports = router;
