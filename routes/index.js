var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");
var shortid = require('shortid');

var docClient = new AWS.DynamoDB.DocumentClient();
AWS.config.update({endpoint: "https://dynamodb.us-west-2.amazonaws.com"});
var table = "ShortenedURL";

router.get('/', function(req, res, next) {
  res.render('index', { title: 'MiniLinx' });
});

router.post('/', function (req, res) {
  var id = shortid.generate()
  res.send('URL id = ' + id)
  var params = {
    TableName:table,
    Item:{
      "webid": id,
      "url":"test"
    }
  };
  docClient.put(params, function(err, data) {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
    }
  });
})

module.exports = router;
