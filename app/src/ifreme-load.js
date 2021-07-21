HTMLIFrameElement.prototype.load = function (url, callback) {
  try {
    this.src = url + "?rnd=" + Math.random().toString().substring(2)
  } catch (error) {
    if(!callback) {
      return new Promise((resolve, reject) => {
        reject(error)
      })
    } else {
      callback(error)
    }
  }

  const maxTime = 60000
  const interval = 200
  let timerCount = 0

  if(!callback) {
    return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        timerCount++
        if (this.contentDocument.readyState === 'complete') {
          clearInterval(timer)
          resolve()
        } else if (timerCount*interval > maxTime) {
          reject(new Error("Loading fail!"))
        }
      }, interval)
    })
  }

}