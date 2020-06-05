import { copyFile } from 'fs-extra';
import { app } from 'electron';
import { resolve } from 'path';

export default async function() {
	console.log('setting up');
	await copyFile(
		resolve(__dirname, './data/media.yaml'),
		resolve(app.getPath('userData'), 'media.yaml')
	);
	await copyFile(
		resolve(__dirname, './data/settings.yaml'),
		resolve(app.getPath('userData'), 'settings.yaml')
	);
}
