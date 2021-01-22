const execa = require('execa')
const path = require('path')
const copyfiles = require('copyfiles')
const { promisify } = require('util')
const { promises: fs } = require('fs')

const copy = promisify(copyfiles)

;(async () => {
  await fs.rmdir('./dist', { recursive: true, force: true })

  try {
    console.log('building the display app...')

    const { stderr: appErr } = await execa('yarn', ['build'], {
      cwd: path.join(process.cwd(), 'display')
    })
    if (appErr) console.error(appErr)

    console.log('app done')
  } catch (e) {
    console.error('Building the app failed with error', e.message)
  }

  try {
    console.log('building the api server...')

    const { stderr: serverErr } = await execa('yarn', ['build'], {
      cwd: path.join(process.cwd(), 'api')
    })
    if (serverErr) console.error(serverErr)
  } catch (e) {
    console.error('Building the server failed with error', e.message)
  }

  await copy(['./display/dist/**', './api/dist/**', path.join(process.cwd())], {
    up: 1
  })
  console.log('done')
})()
