import crc32posix from './crc32posix'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: 'FFFFFFFF', hex: '' },
  { crc: '2F0C8FD8', hex: '31' },
  { crc: '6286288F', hex: '48656C6C6F20576F726C6421' },
  { crc: '765E7680', hex: '313233343536373839' },
])('crc32posix(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc32posix(u8arr)).toBe(parseInt(crc, 16))
})

test.each([
  { crc: '6286288F', hex: '48656C6C6F20576F726C6421' },
  { crc: '765E7680', hex: '313233343536373839' },
])('crc32posix(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc32posix(u8arr.subarray(0, 1))
  expect(crc32posix(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
})
