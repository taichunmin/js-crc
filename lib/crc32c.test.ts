import crc32c from './crc32c'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: '00000000', hex: '' },
  { crc: '90F599E3', hex: '31' },
  { crc: 'FE6CF1DC', hex: '48656C6C6F20576F726C6421' },
  { crc: 'E3069283', hex: '313233343536373839' },
])('crc32c(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc32c(u8arr)).toBe(parseInt(crc, 16))
})

test.each([
  { crc: 'FE6CF1DC', hex: '48656C6C6F20576F726C6421' },
  { crc: 'E3069283', hex: '313233343536373839' },
])('crc32c(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc32c(u8arr.subarray(0, 1))
  expect(crc32c(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
})
