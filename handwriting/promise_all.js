const myPromiseAll = (actions) => {
  let count = 0
  const len = actions.length
  const ans = []

  return new Promise((resolve, reject) => {
    actions.forEach((action, index) => {
      action.then((val) => {
        ans[index] = val
        if (++count === len) {
          resolve(ans)
        }
      }).catch((e) => {
        reject(e)
      })
    })
  })
}

const a = new Promise(resolve => setTimeout(() => resolve('a'), 1000))
const b = new Promise(resolve => setTimeout(() => resolve('b'), 2000))
const w = Promise.reject('w')

const pre = Date.now()

myPromiseAll([a, b, w]).then((v) => {
  console.log(Date.now() - pre);
  console.log(v);
}).catch(console.warn)