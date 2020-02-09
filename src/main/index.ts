import { app, BrowserWindow } from 'electron'
declare const MAIN_WINDOW_WEBPACK_ENTRY: any
import fse from 'fs-extra'
import path from 'path'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createDisplayWindow = () => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })
  console.log(mainWindow.webContents.id)
  console.log(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY + '/#/display')
  mainWindow.webContents.openDevTools()
}
const createControlWindow = () => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })
  console.log(mainWindow.webContents.id)
  console.log(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY + '/#/control')
  mainWindow.webContents.openDevTools()
}

app.on('ready', () => {
  createDisplayWindow()
  createControlWindow()
})

app.on('window-all-closed', () => {
  app.quit();
});

async function getMedia() {
  const folder = app.getPath('documents')
  const mediaPath = path.join(folder, './infot-media')
  await fse.ensureDir(mediaPath)
  const main = await fse.readJson(path.join(mediaPath,'package.json'))
  main.folders.forEach( (el: any) => {
    el.icon = path.resolve(mediaPath, el.icon)
    el.path = path.resolve(mediaPath, el.path)
  });
  return main

}
// @ts-ignore
global.getMedia = getMedia
