import nanoid from 'nanoid'
const { ipcRenderer } = window

export function newSession() {
  window.location.hash = '#/'
  // window.$analytics.setUserId(nanoid(16))
  // window.$analytics.logEvent('reset state')
  // const displayId = remote.getGlobal('displayId')
  // start default video or something
  // ipcRenderer.sendTo(displayId,'start',{ media: 'file:///C:/Users/Space/Documents/infoterminal-data/404.png', mime: 'image/png' })
}

export function checkIdle () {
  let t: number
  window.onmousemove = resetTimer
  window.onmousedown = resetTimer
  window.onclick = resetTimer
  window.onscroll = resetTimer
  window.onkeypress = resetTimer
  window.ontouchstart = resetTimer


  function resetTimer() {
    window.clearTimeout(t)
    t = window.setTimeout(newSession, 600000)
  }
}
