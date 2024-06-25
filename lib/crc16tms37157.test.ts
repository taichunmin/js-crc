import crc16tms37157 from './crc16tms37157'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: '3791', hex: '' },
  { crc: 'A53D', hex: '31' },
  { crc: '6601', hex: '48656C6C6F20576F726C6421' },
  { crc: '26B1', hex: '313233343536373839' },
])('crc16tms37157(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc16tms37157(u8arr)).toBe(parseInt(crc, 16))
})

test.each([
  { crc: '6601', hex: '48656C6C6F20576F726C6421' },
  { crc: '26B1', hex: '313233343536373839' },
])('crc16tms37157(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc16tms37157(u8arr.subarray(0, 1))
  expect(crc16tms37157(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
})
