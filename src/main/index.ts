import { app, BrowserWindow } from 'electron'
declare const MAIN_WINDOW_WEBPACK_ENTRY: any
import fse from 'fs-extra'
import path from 'path'
import Config from '../config'
import resolveTree from './resolveTree'
import usb from 'usb'
import * as drivelist from 'drivelist'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit()
}

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
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY + '/#/display')
  mainWindow.webContents.openDevTools()
}
const createControlWindow = () => {
  const mainWindow = new BrowserWindow({
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
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  mainWindow.webContents.openDevTools()
}

app.on('ready', () => {
  //createDisplayWindow()
  createControlWindow()
})

app.on('window-all-closed', async () => {
  app.quit()
})

async function main() {
  await fse.ensureDir(Config.root)
  const main = await fse.readJson(path.join(Config.root,'package.json'))
  const tree = await resolveTree( Config.root, main.elemente )
  // @ts-ignore
  global.Media = tree
}
main()
