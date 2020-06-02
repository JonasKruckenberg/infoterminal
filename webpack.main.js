const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { DefinePlugin } = require('webpack')
const production = process.env.NODE_ENV === 'production'
const { resolve } = require('path')

module.exports = {
  entry: './src/main/index.ts',
  mode: production ? 'production' : 'development',
  resolve: {
    extensions: ['.js', '.ts', '.yaml', '.json'],
    alias: {
      '@': resolve('./src/app')
    }
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
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new DefinePlugin({
      MODE: production ? '"production"' : '"development"'
    })
  ]
}
