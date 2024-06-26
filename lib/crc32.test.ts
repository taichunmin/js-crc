import crc32 from './crc32'
import crc32bzip2 from './crc32bzip2'
import crc32c from './crc32c'
import crc32d from './crc32d'
import crc32jamcrc from './crc32jamcrc'
import crc32mpeg2 from './crc32mpeg2'
import crc32posix from './crc32posix'
import crc32q from './crc32q'
import crc32sata from './crc32sata'
import crc32xfer from './crc32xfer'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

describe('crc32', () => {
  test.each([
    { crc: '00000000', hex: '' },
    { crc: '83DCEFB7', hex: '31' },
    { crc: '1C291CA3', hex: '48656C6C6F20576F726C6421' },
    { crc: 'CBF43926', hex: '313233343536373839' },
  ])('crc32(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc32(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '1C291CA3', hex: '48656C6C6F20576F726C6421' },
    { crc: 'CBF43926', hex: '313233343536373839' },
  ])('crc32(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc32(u8arr.subarray(0, 1))
    expect(crc32(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc32bzip2', () => {
  test.each([
    { crc: '00000000', hex: '' },
    { crc: '6104306C', hex: '31' },
    { crc: '6B1A7CAE', hex: '48656C6C6F20576F726C6421' },
    { crc: 'FC891918', hex: '313233343536373839' },
  ])('crc32bzip2(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc32bzip2(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '6B1A7CAE', hex: '48656C6C6F20576F726C6421' },
    { crc: 'FC891918', hex: '313233343536373839' },
  ])('crc32bzip2(Buffer.from("$hex", "hex"), prev) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc32bzip2(u8arr.subarray(0, 1))
    expect(crc32bzip2(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc32c', () => {
  test.each([
    { crc: '00000000', hex: '' },
    { crc: '90F599E3', hex: '31' },
    { crc: 'FE6CF1DC', hex: '48656C6C6F20576F726C6421' },
    { crc: 'E3069283', hex: '313233343536373839' },
  ])('crc32c(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc32c(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: 'FE6CF1DC', hex: '48656C6C6F20576F726C6421' },
    { crc: 'E3069283', hex: '313233343536373839' },
  ])('crc32c(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc32c(u8arr.subarray(0, 1))
    expect(crc32c(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc32d', () => {
  test.each([
    { crc: '00000000', hex: '' },
    { crc: '9B1D1DFB', hex: '31' },
    { crc: 'D9C5B0CD', hex: '48656C6C6F20576F726C6421' },
    { crc: '87315576', hex: '313233343536373839' },
  ])('crc32d(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc32d(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: 'D9C5B0CD', hex: '48656C6C6F20576F726C6421' },
    { crc: '87315576', hex: '313233343536373839' },
  ])('crc32d(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc32d(u8arr.subarray(0, 1))
    expect(crc32d(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc32jamcrc', () => {
  test.each([
    { crc: 'FFFFFFFF', hex: '' },
    { crc: '7C231048', hex: '31' },
    { crc: 'E3D6E35C', hex: '48656C6C6F20576F726C6421' },
    { crc: '340BC6D9', hex: '313233343536373839' },
  ])('crc32jamcrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc32jamcrc(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: 'E3D6E35C', hex: '48656C6C6F20576F726C6421' },
    { crc: '340BC6D9', hex: '313233343536373839' },
  ])('crc32jamcrc(Buffer.from("$hex", "hex"), prev) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc32jamcrc(u8arr.subarray(0, 1))
    expect(crc32jamcrc(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc32mpeg2', () => {
  test.each([
    { crc: 'FFFFFFFF', hex: '' },
    { crc: '9EFBCF93', hex: '31' },
    { crc: '94E58351', hex: '48656C6C6F20576F726C6421' },
    { crc: '0376E6E7', hex: '313233343536373839' },
  ])('crc32mpeg2(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc32mpeg2(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '94E58351', hex: '48656C6C6F20576F726C6421' },
    { crc: '0376E6E7', hex: '313233343536373839' },
  ])('crc32mpeg2(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc32mpeg2(u8arr.subarray(0, 1))
    expect(crc32mpeg2(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc32posix', () => {
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
})

describe('crc32q', () => {
  test.each([
    { crc: '00000000', hex: '' },
    { crc: 'A96974CB', hex: '31' },
    { crc: '007C2675', hex: '48656C6C6F20576F726C6421' },
    { crc: '3010BF7F', hex: '313233343536373839' },
  ])('crc32q(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc32q(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '007C2675', hex: '48656C6C6F20576F726C6421' },
    { crc: '3010BF7F', hex: '313233343536373839' },
  ])('crc32q(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc32q(u8arr.subarray(0, 1))
    expect(crc32q(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc32sata', () => {
  test.each([
    { crc: '52325032', hex: '' },
    { crc: '93B6D24E', hex: '31' },
    { crc: '5B5496E4', hex: '48656C6C6F20576F726C6421' },
    { crc: 'CF72AFE8', hex: '313233343536373839' },
  ])('crc32sata(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc32sata(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '5B5496E4', hex: '48656C6C6F20576F726C6421' },
    { crc: 'CF72AFE8', hex: '313233343536373839' },
  ])('crc32sata(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc32sata(u8arr.subarray(0, 1))
    expect(crc32sata(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc32xfer', () => {
  test.each([
    { crc: '00000000', hex: '' },
    { crc: '00001FBF', hex: '31' },
    { crc: '8456EBB6', hex: '48656C6C6F20576F726C6421' },
    { crc: 'BD0BE338', hex: '313233343536373839' },
  ])('crc32xfer(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc32xfer(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '8456EBB6', hex: '48656C6C6F20576F726C6421' },
    { crc: 'BD0BE338', hex: '313233343536373839' },
  ])('crc32xfer(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc32xfer(u8arr.subarray(0, 1))
    expect(crc32xfer(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})
