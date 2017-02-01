const webpack = require('webpack'),
path = require('path'),
BundleTracker = require('webpack-bundle-tracker');
utils = require('./build/utils')

module.exports = {
	
	context: __dirname,

	entry: utils.compileEntry('./build/src/**/*.*'),

	output: {
		path: path.join(__dirname, 'rhinorun/static'),
		filename: '[name]-[hash].js',
		publicPath: '/static/'
	},

	module: {
		rules: [
		{
			test: /\.js$/,
			use: [{
				loader: 'babel-loader',
				options: { presets: ['es2015'] }
			}],
		},
		],
	},

	plugins: [
		new BundleTracker({filename: './webpack-stats.json'})
	]

}
