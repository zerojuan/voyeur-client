var AWS = require( 'aws-sdk' );
var async = require( 'async' );
var qs = require( 'querystring' );
var cfSign = require( 'aws-cloudfront-sign' );

var dynamodb = new AWS.DynamoDB({
  region: 'ap-northeast-1'
});

exports.handler = function( event, context ) {
  // TODO: save facebook name and userId, increment the view count
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
      var file = data.Item.filename.S.split( '/' );

      var escaped = qs.escape( file[ 1 ] );
      var item = 'http://d16rnfarbxjbfx.cloudfront.net/' +
          file[ 0 ] + '/' + escaped;
      var options = {
        expireTime: new Date().getTime() + 30000,
        keypairId: 'APKAI4Z5RDMEA3F7P3KQ',
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
