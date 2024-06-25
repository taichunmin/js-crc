import crc16kermit from './crc16kermit'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: '0000', hex: '' },
  { crc: '200A', hex: '31' },
  { crc: '6B65', hex: '48656C6C6F20576F726C6421' },
  { crc: '2189', hex: '313233343536373839' },
])('crc16kermit(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc16kermit(u8arr)).toBe(parseInt(crc, 16))
})

test.each([
  { crc: '6B65', hex: '48656C6C6F20576F726C6421' },
  { crc: '2189', hex: '313233343536373839' },
])('crc16kermit(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc16kermit(u8arr.subarray(0, 1))
  expect(crc16kermit(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
})
