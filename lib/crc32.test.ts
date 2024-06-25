import crc32 from './crc32'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: '00000000', hex: '' },
  { crc: '83DCEFB7', hex: '31' },
  { crc: '1C291CA3', hex: '48656C6C6F20576F726C6421' },
  { crc: 'CBF43926', hex: '313233343536373839' },
])('crc32(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc32(u8arr)).toBe(~~parseInt(crc, 16))
})

test.each([
  { crc: '1C291CA3', hex: '48656C6C6F20576F726C6421' },
  { crc: 'CBF43926', hex: '313233343536373839' },
])('crc32(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc32(u8arr.subarray(0, 1))
  expect(crc32(u8arr.subarray(1), prev)).toBe(~~parseInt(crc, 16))
})
