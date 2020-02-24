import { resolve } from 'path'
import { app } from 'electron'
export default {
  root: resolve(app.getPath('documents'), 'infoterminal-data'),
  password: 'Test'
}
