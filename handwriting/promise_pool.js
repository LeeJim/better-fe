async function promisePool (functions, n) {
  const ret = []
  const executing = new Set()
  for (let func of functions) {
    const p = Promise.resolve().then(() => func())
    ret.push(p)
    executing.add(p)
    const clean = () => executing.delete(p)
    p.then(clean).catch(clean)
    if (executing.size >= n) {
      await Promise.race(executing)
    }
  }

  return Promise.all(ret)
}

const pre = Date.now();
promisePool([
  () => new Promise(resolve => setTimeout(resolve, 1000)),
  () => new Promise(resolve => setTimeout(resolve, 2000)),
  () => new Promise(resolve => setTimeout(resolve, 1000)),
  () => new Promise(resolve => setTimeout(resolve, 400)),
  () => new Promise(resolve => setTimeout(resolve, 500))
], 3).then(res => console.log(Date.now() - pre))