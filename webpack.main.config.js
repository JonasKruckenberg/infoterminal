const webpack = require('webpack')
const plugins = []

plugins.push(new webpack.DefinePlugin({
  MODE: process.env.MODE.trim() === 'development' ? JSON.stringify('development') : JSON.stringify('production')
}))

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main/index.ts',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json']
  },
  plugins
};
