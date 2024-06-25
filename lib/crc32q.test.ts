import crc32q from './crc32q'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: '00000000', hex: '' },
  { crc: 'A96974CB', hex: '31' },
  { crc: '007C2675', hex: '48656C6C6F20576F726C6421' },
  { crc: '3010BF7F', hex: '313233343536373839' },
])('crc32q(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc32q(u8arr)).toBe(~~parseInt(crc, 16))
})

test.each([
  { crc: '007C2675', hex: '48656C6C6F20576F726C6421' },
  { crc: '3010BF7F', hex: '313233343536373839' },
])('crc32q(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc32q(u8arr.subarray(0, 1))
  expect(crc32q(u8arr.subarray(1), prev)).toBe(~~parseInt(crc, 16))
})
