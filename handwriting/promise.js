const pending = 0;
const resolved = 1;
const rejected = 2;

const invokeHandler = (p1, p2) => {
  const handler = p1.status === 1 ? p2.onFulfilled : p2.onRejected

  if (handler == null) {
    settlePromise(p2, resolved, p1.value)
    return
  }

  let x

  try {
    x = handler(p1.value)
  } catch(e) {
    settlePromise(p2, rejected, e)
    return
  }

  resolveValue(p2, x)
}

const settlePromise = (p, status, value) => {
  if (p.status !== pending) return
    
  p.status = status
  p.value = value

  p.handlers.forEach(handler => invokeHandler(p, handler))
  
  return p
}

const resolveValue = (p, x) => {
  if (p === x && x) {
    settlePromise(p, rejected, new TypeError())
    return
  }

  if (x != null && (typeof x === 'function' || typeof x === 'object')) {
    let xthen
    try {
      x = x.then
    } catch(e) {
      settlePromise(p, rejected, e)
    }
    if (typeof xthen === 'function') {
      resolvePromise(p, xthen)
    } else {
      settlePromise(p, resolved, x)
    }
  } else {
    settlePromise(p, resolved, x)
  }
}

const resolvePromise = (p, handler) => {
  let called = false

  try {
    handler.call(p, function onFulfilled(y) {
      if (called) return
      called = true
      resolveValue(p, y)
    }, function onRejected(reason) {
      if (called) return
      called = true

      settlePromise(p, rejected, reason)
    })
  } catch(e) {
    if (called) return
    called = true

    settlePromise(p, rejected, e)
  }
}

class Word {
  status = pending

  value = undefined

  handlers = []

  constructor(executor) {
    const p = this;
    
    executor(function onFulfilled(val) {
      return settlePromise(p, resolved, val)
    }, function onRejected(reason) {
      return settlePromise(p, rejected, reason)
    })
  }

  then(onFulfilled, onRejected) {
    const p = new Word(() => {})
    if (typeof onFulfilled === 'function') p.onFulfilled = onFulfilled
    if (typeof onRejected === 'function') p.onRejected = onRejected

    if (this.status === pending) {
      this.handlers.push(p)
    } else {
      invokeHandler(this, p)
    }

    return p
  }
}

new Word((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
}).then(console.log)

// new Promise((resolve, reject) => {
//   if (xx) {
//     resolve(true)
//   } else {
//     reject('xxx')
//   }
// }).then((x) => {
//   return x; // or not
// }).catch(reason => {

// }).finally(() => {

// })