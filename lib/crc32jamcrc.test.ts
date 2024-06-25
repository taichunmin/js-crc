import crc32jamcrc from './crc32jamcrc'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: 'FFFFFFFF', hex: '' },
  { crc: '7C231048', hex: '31' },
  { crc: 'E3D6E35C', hex: '48656C6C6F20576F726C6421' },
  { crc: '340BC6D9', hex: '313233343536373839' },
])('crc32jamcrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc32jamcrc(u8arr)).toBe(~~parseInt(crc, 16))
})

test.each([
  { crc: 'E3D6E35C', hex: '48656C6C6F20576F726C6421' },
  { crc: '340BC6D9', hex: '313233343536373839' },
])('crc32jamcrc(Buffer.from("$hex", "hex"), prev) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc32jamcrc(u8arr.subarray(0, 1))
  expect(crc32jamcrc(u8arr.subarray(1), prev)).toBe(~~parseInt(crc, 16))
})
