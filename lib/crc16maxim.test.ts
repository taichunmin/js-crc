import crc16maxim from './crc16maxim'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: 'FFFF', hex: '' },
  { crc: '2B3E', hex: '31' },
  { crc: 'A841', hex: '48656C6C6F20576F726C6421' },
  { crc: '44C2', hex: '313233343536373839' },
])('crc16maxim(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc16maxim(u8arr)).toBe(parseInt(crc, 16))
})

test.each([
  { crc: 'A841', hex: '48656C6C6F20576F726C6421' },
  { crc: '44C2', hex: '313233343536373839' },
])('crc16maxim(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc16maxim(u8arr.subarray(0, 1))
  expect(crc16maxim(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
})
