import { app, BrowserWindow, ipcMain } from 'electron'
import execa from 'execa'
import createWindow from './createWindow'

declare const CONTROL_WINDOW_WEBPACK_ENTRY: string
declare const CONTROL_WINDOW_PRELOAD_WEBPACK_ENTRY: string

let controlWin: BrowserWindow, displayWin: BrowserWindow

app.on('ready', async () => {
  controlWin = createWindow(CONTROL_WINDOW_WEBPACK_ENTRY + '#/control', {
    webPreferences: {
      preload: CONTROL_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  const { default: settings } = await import('./settings')
  const { default: media } = await import('./media')

  console.log(media.store.categories)

  /**
   * This IPC call shuts down the app and the device.
   * Can be called to safely close the system.
   */
  ipcMain.handle('device.shutdown', async () => {
    const { stdout } = await execa('shutdown -s -t 5')
    console.log(stdout)
    app.quit()
  })

  /**
   * All settings related IPC calls
   */
  ipcMain.handle('settings.set', (e, key: string, value: any) => {
    return settings.set(key, value)
  })
  ipcMain.handle('settings.get', (e, key: string) => {
    return settings.get(key)
  })
  ipcMain.handle('settings.has', (e, key: string) => {
    return settings.has(key)
  })
  ipcMain.handle('settings.delete', (e, key: string) => {
    return settings.delete(key)
  })

  /**
   * All media related IPC calls
   */
  ipcMain.handle('media.set', (e, key: string, value: any) => {
    return media.set(key, value)
  })
  ipcMain.handle('media.get', (e, key: string) => {
    return media.get(key)
  })
  ipcMain.handle('media.has', (e, key: string) => {
    return media.has(key)
  })
  ipcMain.handle('media.delete', (e, key: string) => {
    return media.delete(key)
  })
})

app.on('window-all-closed', () => {
  app.quit()
})
