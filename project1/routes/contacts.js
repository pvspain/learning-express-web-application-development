var express = require('express');
var router = express.Router();

/* GET contacts page. */
router.get('/', function(req, res) {
  res.send('GET worked!');
});

router.post('/', function(req, res) {
    res.semd('POST worked!');
});

router.route('/:contact_id')
.all(function(req, res, next) {
    contact_id = req.params.contact_id;
    next();
})
.get(function(req, res) {
    res.send('GET for contact '+contact_id)
})
.post(function(req, res) {
    res.send('POST for contact '+contact_id)
})
.put(function(req, res) {
    res.send('PUT for contact '+contact_id)
})
.delete(function(req, res) {
    res.send('DELETE for contact '+contact_id)
})


module.exports = router;
