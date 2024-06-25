import crc16a from './crc16a'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: '6363', hex: '' },
  { crc: '71F4', hex: '31' },
  { crc: '4167', hex: '48656C6C6F20576F726C6421' },
  { crc: 'BF05', hex: '313233343536373839' },
])('crc16a(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc16a(u8arr)).toBe(parseInt(crc, 16))
})

test.each([
  { crc: '4167', hex: '48656C6C6F20576F726C6421' },
  { crc: 'BF05', hex: '313233343536373839' },
])('crc16a(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc16a(u8arr.subarray(0, 1))
  expect(crc16a(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
})
