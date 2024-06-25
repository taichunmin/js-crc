import crc16dnp from './crc16dnp'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: 'FFFF', hex: '' },
  { crc: '5265', hex: '31' },
  { crc: '8A5A', hex: '48656C6C6F20576F726C6421' },
  { crc: 'EA82', hex: '313233343536373839' },
])('crc16dnp(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc16dnp(u8arr)).toBe(parseInt(crc, 16))
})

test.each([
  { crc: '8A5A', hex: '48656C6C6F20576F726C6421' },
  { crc: 'EA82', hex: '313233343536373839' },
])('crc16dnp(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc16dnp(u8arr.subarray(0, 1))
  expect(crc16dnp(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
})
