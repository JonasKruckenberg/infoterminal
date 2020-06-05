import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import merge from 'deepmerge';

/**
 * This function creates new windows and returns them.
 */
export default (
	entry: string,
	options: BrowserWindowConstructorOptions = {}
) => {
	const defaults: BrowserWindowConstructorOptions = {
		height: 600,
		width: 800,
		backgroundColor: '#242428',
		show: false,
		webPreferences: {
			// webSecurity: false
			webSecurity: MODE === 'production',
			sandbox: false
		}
	};
	const win = new BrowserWindow(merge(defaults, options));
	win.loadURL(entry);
	win.on('ready-to-show', () => {
		win.show();
	});
	return win;
};
