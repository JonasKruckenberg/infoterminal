import Store from 'electron-store'
import yaml from 'js-yaml'

export default new Store({
  name: 'media',
  fileExtension: 'yaml',
  cwd: MODE === 'development' ? process.cwd() + '/store' : undefined,
  serialize: yaml.safeDump,
  deserialize: yaml.safeLoad
})
