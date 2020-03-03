import { app, BrowserWindow } from 'electron'

declare const MAIN_WINDOW_WEBPACK_ENTRY: any
declare const SECOND_WINDOW_WEBPACK_ENTRY: any

import Config from '../config'
import usb from 'usb'
import * as drivelist from 'drivelist'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit()
}

let controlWindow, displayWindow

// @ts-ignore
global.Config = Config

usb.on('attach', async device => {
  try {
    device.open()
    device.getCapabilities( (err, caps) => {
      if (err) return console.error(err)
      console.log(caps)
    })
    device.close()
    const drives = await drivelist.list()
    console.log(drives)
  } catch ( err ) {
    console.log(err)
  }
})
usb.on('detach', device => {
 console.log(device)
})

const createDisplayWindow = () => {
  displayWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true
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
      nodeIntegration: true
    }
  })
  BrowserWindow.addDevToolsExtension(
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
