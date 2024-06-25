import crc16x25 from './crc16x25'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: '0000', hex: '' },
  { crc: 'D072', hex: '31' },
  { crc: '0BBB', hex: '48656C6C6F20576F726C6421' },
  { crc: '906E', hex: '313233343536373839' },
])('crc16x25(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc16x25(u8arr)).toBe(parseInt(crc, 16))
})

test.each([
  { crc: '0BBB', hex: '48656C6C6F20576F726C6421' },
  { crc: '906E', hex: '313233343536373839' },
])('crc16x25(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc16x25(u8arr.subarray(0, 1))
  expect(crc16x25(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
})
