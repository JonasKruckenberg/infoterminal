import { app, BrowserWindow, ipcMain } from 'electron'
import resolveTree from './resolveTree'
import { readJson, ensureDir } from 'fs-extra'
import { join } from 'path'
import Config from '../config'
import execa from 'execa'

declare const CONTROL_WINDOW_WEBPACK_ENTRY:string
declare const CONTROL_WINDOW_PRELOAD_WEBPACK_ENTRY:string
declare const DISPLAY_WINDOW_WEBPACK_ENTRY:string
declare const DISPLAY_WINDOW_PRELOAD_WEBPACK_ENTRY:string

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit()
}

let controlWindow:BrowserWindow, displayWindow:BrowserWindow


const createDisplayWindow = () => {
  displayWindow = new BrowserWindow({
    height: 600,
    width: 800,
    backgroundColor: '#242428',
    show: false,
    webPreferences: {
      preload: DISPLAY_WINDOW_PRELOAD_WEBPACK_ENTRY,
      // @ts-ignore
      webSecurity: MODE === 'production'
    }
  })
  displayWindow.once('ready-to-show', () => {
    displayWindow.show()
  })
  displayWindow.loadURL(DISPLAY_WINDOW_WEBPACK_ENTRY)
  displayWindow.webContents.openDevTools()
  const contents = displayWindow.webContents
  // @ts-ignore
  global.displayId = contents.id
}
const createControlWindow = () => {
  controlWindow = new BrowserWindow({
    height: 600,
    width: 800,
    backgroundColor: '#242428',
    show: false,
    //kiosk: true,
    //frame: false,
    webPreferences: {
      //devTools: false,
      preload: CONTROL_WINDOW_PRELOAD_WEBPACK_ENTRY,
      // @ts-ignore
      webSecurity: MODE === 'production'
    }
  })
  controlWindow.once('ready-to-show', () => {
    controlWindow.show()
  })
  BrowserWindow.addDevToolsExtension(
    //'C:\\Users\\Jonas\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\5.3.3_0'
   'C:\\Users\\Space\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\5.3.3_0'
  )
  controlWindow.loadURL(CONTROL_WINDOW_WEBPACK_ENTRY)
  controlWindow.webContents.openDevTools()
}

app.on('ready', () => {
  createDisplayWindow()
  createControlWindow()
})

app.on('window-all-closed', async () => {
  app.quit()
})

// handler for stuff
ipcMain.handle('close-app', async () => {
  const { stdout } = await execa('shutdown -s -t 5')
  console.log(stdout)
  app.quit()
  return
})
ipcMain.handle('fetch-categories', async () => {
  await ensureDir(Config.root)
  const main = await readJson(join(Config.root,'package.json'))
  return resolveTree(Config.root, main.elemente,{})
})
ipcMain.handle('get-display-id', () => {
  return displayWindow.webContents.id
})
