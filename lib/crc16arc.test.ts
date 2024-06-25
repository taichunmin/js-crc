import crc16arc from './crc16arc'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: '0000', hex: '' },
  { crc: 'D4C1', hex: '31' },
  { crc: '57BE', hex: '48656C6C6F20576F726C6421' },
  { crc: 'BB3D', hex: '313233343536373839' },
])('crc16arc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc16arc(u8arr)).toBe(parseInt(crc, 16))
})

test.each([
  { crc: '57BE', hex: '48656C6C6F20576F726C6421' },
  { crc: 'BB3D', hex: '313233343536373839' },
])('crc16arc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc16arc(u8arr.subarray(0, 1))
  expect(crc16arc(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
})
