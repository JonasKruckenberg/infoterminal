import Store from 'electron-store';
import yaml from 'js-yaml';

export default new Store({
	name: 'settings',
	fileExtension: 'yaml',
	cwd: process.cwd() + '/store',
	serialize: yaml.safeDump,
	deserialize: yaml.safeLoad
});
