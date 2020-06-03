import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import execa from 'execa';
import createWindow from './createWindow';
import { setContentSecurityPolicy } from 'electron-util';
import debug from 'electron-debug';
import { resolve } from 'path';

declare const CONTROL_WINDOW_WEBPACK_ENTRY: string;
declare const CONTROL_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let controlWin: BrowserWindow, displayWin: BrowserWindow;

debug();

// setContentSecurityPolicy(`
// default-src 'self' http://localhost:;
// script-src 'self' 'unsafe-eval' http://localhost:8098;
// connect-src 'self' data: file: devtools: https://localhost:8098;
// style-src 'unsafe-inline';
// img-src data: file: https: 'self' media: ;
// media-src file:;
// `);

app.on('ready', async () => {
	const url = process.argv[2] || CONTROL_WINDOW_WEBPACK_ENTRY + '#/categories';

	controlWin = createWindow(url, {
		webPreferences: {
			preload: CONTROL_WINDOW_PRELOAD_WEBPACK_ENTRY
		}
	});

	/**
	 * This registers a custom url scheme that is used to resolve the media files,
	 * as specified by the media store's `thumbnail`and `media` values
	 */
	protocol.registerFileProtocol('media', (request, cb) => {
		const root = 'C:/Users/Space/Documents/Github/infoterminal-media/dist';
		const pathname = request.url.split('//')[1];
		cb(resolve(root, pathname));
	});

	const { default: settings } = await import('./settings');
	const { default: media } = await import('./media');
	/**
	 * This IPC call shuts down the app and the device.
	 * Can be called to safely close the system.
	 */
	ipcMain.handle('main.restart', () => {
		app.relaunch({
			args: process.argv.slice(1).concat([controlWin.webContents.getURL()])
		});
		app.exit(0);
	});
	ipcMain.handle('main.shutdown', async () => {
		const { stdout } = await execa('shutdown -s -t 5');
		console.log(stdout);
		app.quit();
	});

	/**
	 * All settings related IPC calls
	 */
	ipcMain.handle('settings.set', (e, key: string, value: any) => {
		return settings.set(key, value);
	});
	ipcMain.handle('settings.get', (e, key: string) => {
		return settings.get(key);
	});
	ipcMain.handle('settings.has', (e, key: string) => {
		return settings.has(key);
	});
	ipcMain.handle('settings.delete', (e, key: string) => {
		return settings.delete(key);
	});

	/**
	 * All media related IPC calls
	 */
	ipcMain.handle('media.set', (e, key: string, value: any) => {
		return media.set(key, value);
	});
	ipcMain.handle('media.get', (e, key: string) => {
		return media.get(key);
	});
	ipcMain.handle('media.has', (e, key: string) => {
		return media.has(key);
	});
	ipcMain.handle('media.delete', (e, key: string) => {
		return media.delete(key);
	});
});

app.on('window-all-closed', () => {
	app.quit();
});
