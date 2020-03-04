const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { resolve } = require('path')

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});
rules.push({
  test: /\.scss$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    {
      loader: 'sass-loader',
      options: {
        implementation: require('node-sass'),
        sourceMap: true
      }
    }
  ]
})
rules.push({
  test: /\.(png|jpeg|jpg)$/,
  loader: 'file-loader'
})
rules.push({
  test: /\.vue$/,
  use: [
    {
      loader: 'vue-loader',
      options: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    },
    {
      loader: 'vue-svg-inline-loader'
    }
  ]
})
rules.push({
  test: /\.svg$/,
  loader: 'file-loader'
})
plugins.push(new VueLoaderPlugin())

module.exports = {
  module: {
    rules,
  },
  node: {
    __dirname: false
  },
  plugins: plugins,
  resolve: {
    mainFields: [ 'main', 'browser' ],
    alias: {
      '@': resolve('./src/app')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx','.css','.scss','.json','.vue']
  },
};
