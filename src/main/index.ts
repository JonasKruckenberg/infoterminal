import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import execa from 'execa';
import createWindow from './createWindow';
import debug from 'electron-debug';
import { isFirstAppLaunch } from 'electron-util';

declare const CONTROL_WINDOW_WEBPACK_ENTRY: string;
declare const CONTROL_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
declare const DISPLAY_WINDOW_WEBPACK_ENTRY: string;
declare const DISPLAY_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let controlWin: BrowserWindow, displayWin: BrowserWindow;

debug();

app.on('ready', async () => {
	// if (isFirstAppLaunch()) {
	// 	const { default: setup } = await import('./setup');
	// 	setup();
	// }
	controlWin = createWindow(CONTROL_WINDOW_WEBPACK_ENTRY + '#/categories', {
		webPreferences: {
			preload: CONTROL_WINDOW_PRELOAD_WEBPACK_ENTRY
		}
	});

	displayWin = createWindow(DISPLAY_WINDOW_WEBPACK_ENTRY + '#/display', {
		webPreferences: {
			preload: DISPLAY_WINDOW_PRELOAD_WEBPACK_ENTRY
		}
	});

	/**
	 * This registers a custom url scheme that is used to resolve the media files,
	 * as specified by the media store's `thumbnail`and `media` values
	 */
	// if (MODE === 'development') {
	protocol.registerFileProtocol('file', (request, cb) => {
		const pathname = request.url.replace('file:///', '');
		cb(pathname);
	});
	// }

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
	ipcMain.handle('main.display.id', () => {
		return displayWin.webContents.id;
	});
	ipcMain.handle('main.authorize', async (e, password: string) => {
		return password === settings.get('adminPassword');
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
