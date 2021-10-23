const path = require('path');

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		static: './dist',
		hot: true,
		open: true,
	},
	entry: './src/app.ts',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './dist'),
	},
};
