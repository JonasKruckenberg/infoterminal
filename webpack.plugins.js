const { DefinePlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = [
	new ForkTsCheckerWebpackPlugin(),
	new VueLoaderPlugin(),
	new DefinePlugin({
		MODE: JSON.stringify(process.env.NODE_ENV)
	})
];
