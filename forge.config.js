const { default: WebpackPlugin } = require('@electron-forge/plugin-webpack')

module.exports = {
  plugins: [
    new WebpackPlugin({
      mainConfig: './webpack.main.js',
      renderer: {
        config: './webpack.renderer.js',
        entryPoints: [
          {
            html: './src/app/template.html',
            js: './src/app/index.ts',
            name: 'control_window',
            preload: {
              js: './src/app/preload.ts'
            }
          }
        ]
      }
    })
  ]
}
