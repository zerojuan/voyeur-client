var AWS = require( 'aws-sdk' );
var async = require( 'async' );
var cfSign = require( 'aws-cloudfront-sign' );

var dynamodb = new AWS.DynamoDB({
  region: 'ap-northeast-1'
});

exports.handler = function( event, context ) {
  console.log( 'Executing handler' );
  // context.succeed( event.key1 );
  var params = {
    TableName: 'bulaga-cam',
    Key: {
      id: {
        S: 'latest'
      }
    }
  };
  async.waterfall([
    function getLatestFromDB( done ) {
      dynamodb.getItem( params, done );
    },
    function signURL( data, done ) {
      var item = 'http://d16rnfarbxjbfx.cloudfront.net/' + data.Item.filename.S;
      var options = {
        keypairId: 'APKAJFRK2P45U3UPDJMQ',
        privateKeyPath: __dirname + '/secret.pem'
      };
      var signedUrl = cfSign.getSignedUrl( item, options );
      done( null, signedUrl );
    }
  ], function( err, data ) {
    console.log( 'This is the result : ', data );
    context.succeed( data );
  });

};
