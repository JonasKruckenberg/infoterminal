import { app, BrowserWindow, ipcMain } from 'electron'

declare const MAIN_WINDOW_WEBPACK_ENTRY: any
declare const SECOND_WINDOW_WEBPACK_ENTRY: any

import Config from '../config'
import usb from 'usb'
import checkDrives from './checkDrives'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit()
}

let controlWindow, displayWindow

// @ts-ignore
global.Config = Config

usb.on('attach', async () => {
  // do something when a usb device gets attached
})
usb.on('detach', () => {
 // do something when the device is removed
})

const createDisplayWindow = () => {
  displayWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      // @ts-ignore
      webSecurity: MODE === 'production'
    }
  })
  displayWindow.loadURL(SECOND_WINDOW_WEBPACK_ENTRY)
  displayWindow.webContents.openDevTools()
  const contents = displayWindow.webContents
  // @ts-ignore
  global.displayId = contents.id
}
const createControlWindow = () => {
  controlWindow = new BrowserWindow({
    height: 600,
    width: 800,
    //kiosk: true,
    //frame: false,
    webPreferences: {
      //devTools: false,
      nodeIntegration: true,
      // @ts-ignore
      webSecurity: MODE === 'production'
    }
  })
  BrowserWindow.addDevToolsExtension(
    //'C:\\Users\\Jonas\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\5.3.3_0'
   'C:\\Users\\Space\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\5.3.3_0'
  )
  controlWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
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
  app.quit()
  return
})
ipcMain.handle('check-drives', async () => {
  return checkDrives()
})
