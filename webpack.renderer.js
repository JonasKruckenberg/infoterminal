const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')
const { resolve } = require('path')

const production = process.env.NODE_ENV === 'production'

module.exports = {
	mode: production ? 'production' : 'development',
	resolve: {
		mainFields: ['main', 'browser'],
		alias: {
			'@': resolve('./src/app')
		},
		extensions: ['.js', '.ts', '.vue', '.css', '.scss', '.json']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: true
					}
				}
			},
			{
				test: /\.vue$/,
				use: [
					{
						loader: 'vue-loader',
						options: {
							compilerOptions: {
								preserveWhitespace: true
							}
						}
					},
					'vue-svg-inline-loader'
				]
			},
			{
				test: /\.scss$/,
				use: ['vue-style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.svg$/,
				loader: 'file-loader'
			}
		]
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin(),
		new VueLoaderPlugin(),
		new DefinePlugin({
			MODE: production ? '"production"' : '"development"'
		})
	]
}
