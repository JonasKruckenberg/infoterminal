import nanoid from 'nanoid'

export function newSession() {
  window.location.hash = '#/'
  window.$analytics.setUserId(nanoid(16))
  window.$analytics.logEvent('reset state')
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
