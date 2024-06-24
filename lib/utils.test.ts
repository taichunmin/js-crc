import * as sut from './utils'

test.each([
  { a: '00', b: '00' },
  { a: 'FF', b: 'FF' },
  { a: '03', b: 'C0' },
])('reflect8(0x$a) = 0x$b', ({ a, b }) => {
  const num = parseInt(a, 16)
  expect(sut.reflect.u8(num)).toBe(parseInt(b, 16))
})
