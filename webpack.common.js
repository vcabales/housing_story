const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.js'
	},

	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			hash: true,
			title: 'CA Housing Crisis',
			filename: './dist/index.html'
		})
	],
	module: {
	rules: [
	{
		test: /\.css$/,
		use: [
			'style-loader',
			'css-loader'
			]
	},
	{
		test: /\.(png|svg|jpg|gif)$/,
		use: [
			'file-loader'
		]
	},
	{
		test: /\.mp3$/,
		loader: 'file-loader'
	},
	{
		test: /\.wav$/,
		use: [
			'file-loader'
		]
	},
	{
		test: /\.(woff|woff2|eot|ttf|otf)$/,
		use: [
			'file-loader'
		]
	},
	{
		test: /\.(csv|tsv)$/,
		use: [
			'csv-loader'
		]
	},
	{
		test: /\.xml$/,
		use: [
			'xml-loader'
		]
	}
	]
	}
};
