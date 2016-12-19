var express = require('express');
var router = express.Router();

var awsAdapter = require('../helpers/awsAdapter')
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MiniLinx' });
});

router.get('/details/:id', function(req, res, next) {
  var webid = req.params.id;
  awsAdapter.getUrlData(webid).on('success', function(response) {
    console.log(response.data.Item.webid);

    res.render('details', { title: 'MiniLinx', webid: response.data.Item.webid, url: response.data.Item.url});
  }).on('error', function(response) {
    res.status(404)
  })
});

router.get('/:id', function(req, res, next) {
  var webid = req.params.id;
  awsAdapter.getUrlData(webid).on('success', function(response) {
    res.redirect(response.data.Item.url);
  }).on('error', function(response) {
    res.status(404)
  })
});

router.post('/', function (req, res) {
  awsAdapter.saveUrlData(req.body.url).on('success', function(response) {
    console.log(response.request.params.Item.webid.S)
    res.redirect('/details/' + response.request.params.Item.webid.S)
  }).on('error', function(response) {
    res.status(404)
  })
})

module.exports = router;
