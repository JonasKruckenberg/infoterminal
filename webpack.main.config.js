const { DefinePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { resolve } = require('path');

module.exports = {
	/**
	 * This is the main entry point for your application, it's the first file
	 * that runs in the main process.
	 */
	entry: './src/main/index.ts',
	// Put your normal webpack config below here
	module: {
		rules: require('./webpack.rules')
	},
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json']
	},
	plugins: [
		new DefinePlugin({
			MODE: JSON.stringify(process.env.NODE_ENV)
		})
		// new CopyWebpackPlugin({
		// 	patterns: [
		// 		{
		// 			from: resolve(__dirname, 'src/data'),
		// 			to: 'data'
		// 		}
		// 	]
		// })
	]
};
