const { default: WebpackPlugin } = require('@electron-forge/plugin-webpack');

module.exports = {
	// packagerConfig: {
	// 	asar: true,
	// 	icon: 'src/icons/Nabu-logo.ico',
	// 	ignore: [/src/, /out/, /node_modules/]
	// },
	makers: [
		{
			name: '@electron-forge/maker-appx',
			config: {
				packageName: 'NabuTerminal',
				packageDisplayName: 'Nabu Infoterminal',
				packageDescription: 'A infoterminal for the nabu woldenhof',
				publisher: 'CN=jonaskruckenbg.de'
			}
		}
	],
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
					},
					{
						html: './src/app/template.html',
						js: './src/app/index.ts',
						name: 'display_window',
						preload: {
							js: './src/app/preload.ts'
						}
					}
				]
			}
		})
	]
};
