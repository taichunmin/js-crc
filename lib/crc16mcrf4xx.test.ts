import crc16mcrf4xx from './crc16mcrf4xx'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: 'FFFF', hex: '' },
  { crc: '2F8D', hex: '31' },
  { crc: 'F444', hex: '48656C6C6F20576F726C6421' },
  { crc: '6F91', hex: '313233343536373839' },
])('crc16mcrf4xx(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc16mcrf4xx(u8arr)).toBe(parseInt(crc, 16))
})

test.each([
  { crc: 'F444', hex: '48656C6C6F20576F726C6421' },
  { crc: '6F91', hex: '313233343536373839' },
])('crc16mcrf4xx(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc16mcrf4xx(u8arr.subarray(0, 1))
  expect(crc16mcrf4xx(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
})
