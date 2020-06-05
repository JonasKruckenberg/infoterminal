import Store from 'electron-store';
import yaml from 'js-yaml';
import { resolve } from 'path';

export default new Store({
	name: 'media',
	fileExtension: 'yaml',
	cwd: MODE === 'development' ? resolve(__dirname, './data') : null,
	serialize: yaml.safeDump,
	deserialize: yaml.safeLoad
});
