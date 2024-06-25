import crc32sata from './crc32sata'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

test.each([
  { crc: '52325032', hex: '' },
  { crc: '93B6D24E', hex: '31' },
  { crc: '5B5496E4', hex: '48656C6C6F20576F726C6421' },
  { crc: 'CF72AFE8', hex: '313233343536373839' },
])('crc32sata(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
  expect(crc32sata(u8arr)).toBe(~~parseInt(crc, 16))
})

test.each([
  { crc: '5B5496E4', hex: '48656C6C6F20576F726C6421' },
  { crc: 'CF72AFE8', hex: '313233343536373839' },
])('crc32sata(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
  const u8arr = hexToU8Arr(hex)
  const prev = crc32sata(u8arr.subarray(0, 1))
  expect(crc32sata(u8arr.subarray(1), prev)).toBe(~~parseInt(crc, 16))
})
