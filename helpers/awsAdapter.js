var AWS = require("aws-sdk");
AWS.config.update({region: "us-west-2", endpoint: "https://dynamodb.us-west-2.amazonaws.com"});
var docClient = new AWS.DynamoDB.DocumentClient();
var table = "ShortenedURL";
var shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

var AwsAdapter = function() {
  this.getUrlData = function(id){
    var params = {
      TableName: table,
      Key:{
        "webid": id
      }
    };

    return docClient.get(params, function(err, data) {
      if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("GetItem succeeded:", data);
      }
    });
  }

  this.saveUrlData = function(url){
    var id = shortid.generate()
    var params = {
      TableName:table,
      Item:{
        "webid": id,
        "url": url
      }
    };
    return docClient.put(params, function(err, data) {
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
      }
    });
  }
}

module.exports = new AwsAdapter()
