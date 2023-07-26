const myStringify = require('./stringify')

const { stringify } = JSON

test('number', () => {
  const number = 1
  const numberObj = new Number(1)

  expect(myStringify(number)).toBe(stringify(number))
  expect(myStringify(numberObj)).toBe(stringify(numberObj))
})

test('string', () => {
  const str = 'abc'
  const strObj = new String('false')

  expect(myStringify(str)).toBe(stringify(str))
  expect(myStringify(strObj)).toBe(stringify(strObj))
})

test('boolean', () => {
  const trueObj = new Boolean(true)
  const falseObj = new Boolean(false)

  expect(myStringify(true)).toBe(stringify(true))
  expect(myStringify(false)).toBe(stringify(false))

  expect(myStringify(trueObj)).toBe(stringify(trueObj))
  expect(myStringify(falseObj)).toBe(stringify(falseObj))
})

test('undefined', () => {
  expect(myStringify(undefined)).toBe(stringify(undefined))
});

test('null', () => {
  expect(myStringify(null)).toBe(stringify(null))
})

test('date', () => {
  const today = new Date()
  expect(myStringify(today)).toBe(stringify(today))
})

describe('array', () => {
  const primitive = [1, '1', false, true, undefined, null]
  const primitiveObj = [new Number(3), new String("false"), new Boolean(false)]
  const complex = [() => {}, Symbol(), new Date(), NaN, Infinity]
  
  test('empty', () => {
    const empty = [];
    expect(myStringify(empty)).toBe(stringify(empty))
  })
  
  test('primitive', () => {
    expect(myStringify(primitive)).toBe(stringify(primitive))
  })

  test('complex', () => {
    expect(myStringify(complex)).toBe(stringify(complex))
  })

  test('nested', () => {
    const arr = [primitive, complex, ...primitive, ...complex, primitiveObj]
    
    expect(myStringify(arr)).toBe(stringify(arr))
  })
  
  test('string-keyed', () => {
    const arr = ["foo", "bar"];
    arr["baz"] = "quux";
    expect(myStringify(arr)).toBe(stringify(arr))
  })
  
  test('typed', () => {
    const intArr = [new Int8Array([1]), new Int16Array([1]), new Int32Array([1])]
    const unitArr = [
      new Uint8Array([1]),
      new Uint8ClampedArray([1]),
      new Uint16Array([1]),
      new Uint32Array([1]),
    ]
    const floatArr = [new Float32Array([1]), new Float64Array([1])]

    expect(myStringify(intArr)).toBe(stringify(intArr))
    expect(myStringify(unitArr)).toBe(stringify(unitArr))
    expect(myStringify(floatArr)).toBe(stringify(floatArr))
  })
})

describe('object', () => {
  const simple = { x: 1, y: '2', z: false, a: true }
  const complex = { x: [10, undefined, function () {}, Symbol("")], n: undefined, o: Object }

  test('empty', () => {
    expect(myStringify({})).toBe(stringify({}))
  })

  test('base', () => {
    expect(myStringify(simple)).toBe(stringify(simple))
  })
  
  test('cyclic', () => {})
  
  test('complex', () => {
    expect(myStringify(complex)).toBe(stringify(complex))
  })
  
  test('with toJSON method', () => {
    const obj = {
      x: 5,
      y: 6,
      toJSON() {
        return this.x + this.y;
      },
    }
    expect(myStringify(obj)).toBe(stringify(obj))
  })
  
  test('non-enumerable properties', () => {
    const obj = Object.create(null, {
      x: { value: "x", enumerable: false },
      y: { value: "y", enumerable: true },
    })
    expect(myStringify(obj)).toBe(stringify(obj))
  })
})

test('set and map', () => {
  const arr = [
    new Set([1]),
    new Map([[1, 2]]),
    new WeakSet([{ a: 1 }]),
    new WeakMap([[{ a: 1 }, 2]]),
  ]
  expect(myStringify(arr)).toBe(stringify(arr))
})

test('symbols', () => {
  const s = Symbol()
  const s1 = { x: undefined, y: Object, z: Symbol("") }
  const s2 = { [Symbol("foo")]: "foo" }
  const s3 = { [Symbol.for("foo")]: "foo" }
  
  expect(myStringify(s)).toBe(stringify(s))
  expect(myStringify(s1)).toBe(stringify(s1))
  expect(myStringify(s2)).toBe(stringify(s2))
  expect(myStringify(s3)).toBe(stringify(s3))
})

test('bigint', () => {

})