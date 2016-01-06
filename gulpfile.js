'use strict';

var gulp = require('gulp');
var gutil = require( 'gulp-util' );
var watch = require('gulp-watch');
var less = require('gulp-less');
var gls = require( 'gulp-live-server' );
var webpack = require( 'webpack' );
var WebpackDevServer = require( 'webpack-dev-server' );
var webpackConfig = require( './webpack.config.js' );
// var webpackProductionConfig = require( './webpack.production.config.js' );

var map = require( 'map-stream' );

var $ = require( 'gulp-load-plugins' )();

var devServer = {};
gulp.task( 'webpack-dev-server', [ ], function( callback ) {

  devServer = new WebpackDevServer( webpack(webpackConfig), {
    contentBase: './public',
    hot: true,
    watchOptions: {
      aggregateTimeout: 100
    },
    inline: true,
    noInfo: false
  });
  devServer.listen( 8080, '0.0.0.0', function( err ) {
    if ( err ) {
      throw new gutil.PluginError( 'webpack-dev-server', err );
    }
    gutil.log( '[webpack-dev-server]', 'http://localhost:8080' );
    return callback();
  });

});


gulp.task( 'default', function() {
  gulp.start( 'build' );
});

gulp.task( 'build', [ 'webpack:build' ]);

gulp.task( 'watch', [ 'webpack-dev-server' ], function(){

});
