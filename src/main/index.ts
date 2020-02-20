import { app, BrowserWindow } from 'electron'
declare const MAIN_WINDOW_WEBPACK_ENTRY: any
import fse from 'fs-extra'
import path from 'path'
import staticServer from 'node-static'
import http from 'http'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const fileServer = new staticServer.Server(path.resolve(__dirname,'../renderer/main_window'))
http.createServer(function (request, response) {
    request.addListener('end', function () {
        // @ts-ignore
        fileServer.serve(request, response, (e, res) => {
            if (e && (e.status === 404)) { // If the file wasn't found
              fileServer.serveFile('/index.html', 200, {}, request, response);
            }
        });
    }).resume();
}).listen(8080)


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
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY + '/#/control')
  mainWindow.webContents.openDevTools()
}

app.on('ready', () => {
  //createDisplayWindow()
  createControlWindow()
})

app.on('window-all-closed', async () => {
  app.quit()
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
