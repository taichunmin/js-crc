import * as sut from './common2'

describe('setObject', () => {
  test('should set property values', () => {
    const oldValue = 1
    const object = { a: oldValue }
    const actual = sut.setObject(object, ['a'], 2)

    expect(actual).toBe(object)
    expect(object.a).toBe(2)
  })

  test('should set deep property values', () => {
    const oldValue = 1
    const object = { a: { b: oldValue } }
    const actual = sut.setObject(object, ['a', 'b'], 2)

    expect(actual).toBe(object)
    expect(object.a.b).toBe(2)
  })

  test('should set a key over a path', () => {
    const oldValue = 1
    const object = { 'a.b': oldValue }
    const actual = sut.setObject(object, ['a.b'], 2)

    expect(actual).toBe(object)
    expect(object).toEqual({ 'a.b': 2 })
  })

  test('should handle empty paths', () => {
    const object = {}
    const actual = sut.setObject(object, [] as any, 2)

    expect(actual).toBe(object)
    expect(object).toEqual({})
  })

  test('should handle empty string paths', () => {
    const object = { '': 1 }
    const actual = sut.setObject(object, [''], 2)

    expect(actual).toBe(object)
    expect(object).toEqual({ '': 2 })
  })

  test('should create parts of `path` that are missing', () => {
    const object = {}
    const actual = sut.setObject(object, ['a', 'b', 'c'], 2)

    expect(actual).toBe(object)
    expect(object).toEqual({ a: { b: { c: 2 } } })
  })

  test('should overwrite primitives in the path', () => {
    const object = { a: '' }
    const actual = sut.setObject(object, ['a', 'b'], 2)

    expect(actual).toBe(object)
    expect(object).toEqual({ a: { b: 2 } })
  })

  test.each([
    { expected: null },
    { expected: undefined },
  ])('should not error when `parent` is $expected', ({ expected }) => {
    const object = expected
    const actual = sut.setObject(object as any, ['a', 'b'], 2)

    expect(actual).toBe(object)
    expect(object).toEqual(expected)
  })
})
