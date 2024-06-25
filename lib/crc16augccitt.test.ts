import crc16augccitt from './crc16augccitt'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: '1D0F', hex: '' },
  { crc: 'EAEE', hex: '31' },
  { crc: 'A5B9', hex: '48656C6C6F20576F726C6421' },
  { crc: 'E5CC', hex: '313233343536373839' },
])('crc16augccitt(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc16augccitt(u8arr)).toBe(parseInt(crc, 16))
})

test.each([
  { crc: 'A5B9', hex: '48656C6C6F20576F726C6421' },
  { crc: 'E5CC', hex: '313233343536373839' },
])('crc16augccitt(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc16augccitt(u8arr.subarray(0, 1))
  expect(crc16augccitt(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
})
