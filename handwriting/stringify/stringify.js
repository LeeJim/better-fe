const myStringify = (val) => {
  const valType = typeof val
  if (val === null) {
    return 'null'
  }
  if (valType === 'number' || val instanceof Number) {
    return val.toString()
  }
  if (valType === 'string'|| val instanceof String) {
    return `"${val}"`
  }
  if (valType === 'boolean' || val instanceof Boolean) {
    return val.valueOf() ? 'true' : 'false' // 注意：Boolean(false) == true
  }
  if (val instanceof Date) { // Date 类型特殊处理
    return `"${val.toJSON()}"`
  }
  if (valType === 'object' && typeof val.toJSON === 'function') {
    return `${val.toJSON()}`
  }
  if (Array.isArray(val)) {
    let ans = []
    
    for (let item of val) {
      const itemType = typeof item

      if (['undefined', 'function', 'symbol'].includes(itemType) || item == null) ans.push('null')
      else if (itemType === 'number') ans.push(Number.isNaN(item) || item === Infinity ? 'null' : item)
      else ans.push(myStringify(item))
    }
    return `[${ans.join(',')}]`
  }
  if (valType === 'object') {
    let ans = []

    Object.entries(val).forEach(([key, val]) => {
      const valType = typeof val

      if (!['undefined', 'function', 'symbol'].includes(valType)) {
        if (valType === 'number') {
          ans.push(`"${key}":${isNaN(val) || val === Infinity ? null : val}`)
        } else {
          ans.push(`"${key}":${myStringify(val)}`)
        }
      }
    })

    return `{${ans.join(',')}}`
  }
  // todo: 对象循环引用
}

module.exports = myStringify;
