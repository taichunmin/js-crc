import crc16modbus from './crc16modbus'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: 'FFFF', hex: '' },
  { crc: '947E', hex: '31' },
  { crc: '55DA', hex: '48656C6C6F20576F726C6421' },
  { crc: '4B37', hex: '313233343536373839' },
])('crc16modbus(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc16modbus(u8arr)).toBe(parseInt(crc, 16))
})

test.each([
  { crc: '55DA', hex: '48656C6C6F20576F726C6421' },
  { crc: '4B37', hex: '313233343536373839' },
])('crc16modbus(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc16modbus(u8arr.subarray(0, 1))
  expect(crc16modbus(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
})
