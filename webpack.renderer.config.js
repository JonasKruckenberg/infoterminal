const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
	test: /\.ts$/,
	use: {
		loader: 'ts-loader',
		options: {
			transpileOnly: true
		}
	}
});

rules.push({
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
});

rules.push({
	test: /\.s?css$/,
	use: ['vue-style-loader', 'css-loader', 'sass-loader']
});

rules.push({
	test: /\.svg$/,
	loader: 'file-loader'
});

module.exports = {
	module: {
		rules
	},
	plugins: plugins,
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.vue']
	}
};
