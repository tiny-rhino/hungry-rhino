const webpack = require('webpack'),
path = require('path'),
BundleTracker = require('webpack-bundle-tracker');
utils = require('./build/utils')

let entry = utils.compileEntry('./build/src/**/*.*', './web/static/')

console.log(entry);

module.exports = {
	context: __dirname,

	entry,

	output: {
		path: path.join(__dirname, 'rhinorun/static'),
		filename: '[name]-[hash].js'
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
