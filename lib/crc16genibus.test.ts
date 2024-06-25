import crc16genibus from './crc16genibus'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: '0000', hex: '' },
  { crc: '387D', hex: '31' },
  { crc: '77D5', hex: '48656C6C6F20576F726C6421' },
  { crc: 'D64E', hex: '313233343536373839' },
])('crc16genibus(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc16genibus(u8arr)).toBe(parseInt(crc, 16))
})

test.each([
  { crc: '77D5', hex: '48656C6C6F20576F726C6421' },
  { crc: 'D64E', hex: '313233343536373839' },
])('crc16genibus(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc16genibus(u8arr.subarray(0, 1))
  expect(crc16genibus(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
})
