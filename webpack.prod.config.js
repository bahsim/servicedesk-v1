'use strict';

var path = require('path')
var webpack = require('webpack')

module.exports = {
  
  mode: 'production',
  
	entry: {
		user: __dirname + '/frontend/user'
	},
  
  output: {
    path: __dirname + '/frontend/dist',
    filename: '[name].js',
    publicPath: '/'
  },
	
	plugins: [],
  
	module: {
    rules: [
			{
				test: /\.js$/,
				loaders: ['babel-loader'],
				exclude: /node_modules/
			}
		]
  }
	
}
