import * as sut from './common1'

test.each([
  { a: '00', b: '00' },
  { a: 'FF', b: 'FF' },
  { a: '03', b: 'C0' },
])('reflect8(0x$a) = 0x$b', ({ a, b }) => {
  const num = parseInt(a, 16)
  expect(sut.reflect.u8(num)).toBe(parseInt(b, 16))
})

test.each([
  { a: '0000', b: '0000' },
  { a: 'FFFF', b: 'FFFF' },
  { a: 'C6C6', b: '6363' },
])('relect16(0x$a) = 0x$b', ({ a, b }) => {
  const num = parseInt(a, 16)
  expect(sut.reflect.u16(num)).toBe(parseInt(b, 16))
})

test.each([
  { num: 1, hex: '00000001' },
  { num: 0, hex: '00000000' },
  { num: -1, hex: 'FFFFFFFF' },
])('u32ToHex($num) = 0x$hex', ({ num, hex }) => {
  expect(sut.u32ToHex(num)).toBe(`0x${hex}`)
})

test.each([
  { num: 1, hex: '0001' },
  { num: 0, hex: '0000' },
  { num: -1, hex: 'FFFF' },
])('u16ToHex($num) = 0x$hex', ({ num, hex }) => {
  expect(sut.u16ToHex(num)).toBe(`0x${hex}`)
})
