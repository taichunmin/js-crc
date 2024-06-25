import crc16en13757 from './crc16en13757'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: 'FFFF', hex: '' },
  { crc: '4DFE', hex: '31' },
  { crc: '07C0', hex: '48656C6C6F20576F726C6421' },
  { crc: 'C2B7', hex: '313233343536373839' },
])('crc16en13757(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc16en13757(u8arr)).toBe(parseInt(crc, 16))
})

test.each([
  { crc: '07C0', hex: '48656C6C6F20576F726C6421' },
  { crc: 'C2B7', hex: '313233343536373839' },
])('crc16en13757(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc16en13757(u8arr.subarray(0, 1))
  expect(crc16en13757(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
})
