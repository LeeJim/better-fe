const parallel = function(actions, limit) {
  const ret = []
  let count = 0
  let queue = []

  const run = (action, resolve, reject) => {
    if (count < limit) {
      count++
      action().then(resolve).catch(reject).finally(() => {
        count--
        if (queue.length > 0) {
          const runer = queue.shift()
          typeof runer === 'function' && runer()
        }
      })
    } else {
      queue.push(() => run(action, resolve, reject))
    }
  }
  
  actions.forEach(action => {
    const p = new Promise((resolve, reject) => run(action, resolve, reject))
    ret.push(p)
  })

  return Promise.all(ret)
}

const asyncFuncGenerator = (wait) => {
  return () => new Promise((resolve) => setTimeout(() => {
    console.log(wait);
    resolve(wait)
  }, wait))
}

parallel([1000,2000,1000,5000,3000].map(item => asyncFuncGenerator(item)), 2).then(res => {
  console.log('res', res)
})