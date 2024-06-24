import crc32mpeg2 from './crc32mpeg2'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: 'FFFFFFFF', hex: '' },
  { crc: '9EFBCF93', hex: '31' },
  { crc: '94E58351', hex: '48656C6C6F20576F726C6421' },
  { crc: '0376E6E7', hex: '313233343536373839' },
])('crc32mpeg2(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  expect(crc32mpeg2(u8arr)).toBe(~~parseInt(crc, 16))
})

test.each([
  { crc: '94E58351', hex: '48656C6C6F20576F726C6421' },
  { crc: '0376E6E7', hex: '313233343536373839' },
])('crc32mpeg2(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc32mpeg2(u8arr.subarray(0, 1))
  expect(crc32mpeg2(u8arr.subarray(1), prev)).toBe(~~parseInt(crc, 16))
})
