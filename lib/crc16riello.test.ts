import crc16riello from './crc16riello'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: '554D', hex: '' },
  { crc: 'B9BE', hex: '31' },
  { crc: '014E', hex: '48656C6C6F20576F726C6421' },
  { crc: '63D0', hex: '313233343536373839' },
])('crc16riello(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc16riello(u8arr)).toBe(parseInt(crc, 16))
})

test.each([
  { crc: '014E', hex: '48656C6C6F20576F726C6421' },
  { crc: '63D0', hex: '313233343536373839' },
])('crc16riello(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc16riello(u8arr.subarray(0, 1))
  expect(crc16riello(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
})
