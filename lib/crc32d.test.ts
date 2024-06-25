import crc32d from './crc32d'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: '00000000', hex: '' },
  { crc: '9B1D1DFB', hex: '31' },
  { crc: 'D9C5B0CD', hex: '48656C6C6F20576F726C6421' },
  { crc: '87315576', hex: '313233343536373839' },
])('crc32d(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc32d(u8arr)).toBe(~~parseInt(crc, 16))
})

test.each([
  { crc: 'D9C5B0CD', hex: '48656C6C6F20576F726C6421' },
  { crc: '87315576', hex: '313233343536373839' },
])('crc32d(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc32d(u8arr.subarray(0, 1))
  expect(crc32d(u8arr.subarray(1), prev)).toBe(~~parseInt(crc, 16))
})
