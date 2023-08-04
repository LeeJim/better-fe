const myStringify = (val) => {
  const checkCyclic = (item, set = new Set()) => {
    if (Array.isArray(item)) {
      return item.some(item => typeof item === 'object' && checkCyclic(item))
    } else if (typeof item === 'object' && item) {
      if (set.has(item)) return true
      set.add(item)
      return Object.keys(item).some(key => checkCyclic(item[key], set))
    }
    return false
  }
  if (typeof val === 'object' && val && checkCyclic(val)) throw new TypeError(' Converting circular structure to JSON')
  const _stringify = (val) => {
    const valType = typeof val
    if (valType === 'bigint') {
      throw new TypeError('Do not know how to serialize a BigInt')
    }
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
        else ans.push(_stringify(item))
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
            ans.push(`"${key}":${_stringify(val)}`)
          }
        }
      })

      return `{${ans.join(',')}}`
    }
  }
  return _stringify(val)
}

module.exports = myStringify;
