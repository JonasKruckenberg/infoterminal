import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import merge from 'deepmerge'

/**
 * This function creates new windows and returns them.
 */
export default (entry: string, options: BrowserWindowConstructorOptions = {}) => {
  const defaults: BrowserWindowConstructorOptions = {
    show: false
  }
  const win = new BrowserWindow(merge(defaults, options))
  win.loadURL(entry)
  win.on('ready-to-show', () => {
    win.show()
  })

  if (MODE === 'development') win.webContents.openDevTools()

  return win
}
