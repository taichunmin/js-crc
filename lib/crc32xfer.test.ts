import crc32xfer from './crc32xfer'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: '00000000', hex: '' },
  { crc: '00001FBF', hex: '31' },
  { crc: '8456EBB6', hex: '48656C6C6F20576F726C6421' },
  { crc: 'BD0BE338', hex: '313233343536373839' },
])('crc32xfer(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc32xfer(u8arr)).toBe(~~parseInt(crc, 16))
})

test.each([
  { crc: '8456EBB6', hex: '48656C6C6F20576F726C6421' },
  { crc: 'BD0BE338', hex: '313233343536373839' },
])('crc32xfer(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc32xfer(u8arr.subarray(0, 1))
  expect(crc32xfer(u8arr.subarray(1), prev)).toBe(~~parseInt(crc, 16))
})
