import crc32bzip2 from './crc32bzip2'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: '00000000', hex: '' },
  { crc: '6104306C', hex: '31' },
  { crc: '6B1A7CAE', hex: '48656C6C6F20576F726C6421' },
  { crc: 'FC891918', hex: '313233343536373839' },
])('crc32bzip2(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  expect(crc32bzip2(u8arr)).toBe(~~parseInt(crc, 16))
})

test.each([
  { crc: '6B1A7CAE', hex: '48656C6C6F20576F726C6421' },
  { crc: 'FC891918', hex: '313233343536373839' },
])('crc32bzip2(Buffer.from("$hex", "hex"), prev) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc32bzip2(u8arr.subarray(0, 1))
  expect(crc32bzip2(u8arr.subarray(1), prev)).toBe(~~parseInt(crc, 16))
})
