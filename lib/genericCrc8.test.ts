import * as sut from './genericCrc8'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

describe('crc8', () => {
  test.each([
    { crc: '00', hex: '' },
    { crc: '97', hex: '31' },
    { crc: '1C', hex: '48656C6C6F20576F726C6421' },
    { crc: 'F4', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc8.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc8autosar', () => {
  test.each([
    { crc: '00', hex: '' },
    { crc: '4F', hex: '31' },
    { crc: '37', hex: '48656C6C6F20576F726C6421' },
    { crc: 'DF', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc8autosar.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc8cdma2000', () => {
  test.each([
    { crc: 'FF', hex: '' },
    { crc: 'B6', hex: '31' },
    { crc: '23', hex: '48656C6C6F20576F726C6421' },
    { crc: 'DA', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc8cdma2000.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc8darc', () => {
  test.each([
    { crc: '00', hex: '' },
    { crc: 'DA', hex: '31' },
    { crc: '3E', hex: '48656C6C6F20576F726C6421' },
    { crc: '15', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc8darc.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc8dvbs2', () => {
  test.each([
    { crc: '00', hex: '' },
    { crc: '23', hex: '31' },
    { crc: '29', hex: '48656C6C6F20576F726C6421' },
    { crc: 'BC', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc8dvbs2.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc8ebu', () => {
  test.each([
    { crc: 'FF', hex: '' },
    { crc: '7E', hex: '31' },
    { crc: '07', hex: '48656C6C6F20576F726C6421' },
    { crc: '97', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc8ebu.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc8icode', () => {
  test.each([
    { crc: 'FD', hex: '' },
    { crc: 'A9', hex: '31' },
    { crc: '51', hex: '48656C6C6F20576F726C6421' },
    { crc: '7E', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc8icode.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc8itu', () => {
  test.each([
    { crc: '55', hex: '' },
    { crc: 'C2', hex: '31' },
    { crc: '49', hex: '48656C6C6F20576F726C6421' },
    { crc: 'A1', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc8itu.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc8maxim', () => {
  test.each([
    { crc: '00', hex: '' },
    { crc: 'E0', hex: '31' },
    { crc: '9E', hex: '48656C6C6F20576F726C6421' },
    { crc: 'A1', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc8maxim.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc8rohc', () => {
  test.each([
    { crc: 'FF', hex: '' },
    { crc: '7A', hex: '31' },
    { crc: '4C', hex: '48656C6C6F20576F726C6421' },
    { crc: 'D0', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc8rohc.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc8saej1850', () => {
  test.each([
    { crc: '00', hex: '' },
    { crc: '6c', hex: '31' },
    { crc: '01', hex: '48656C6C6F20576F726C6421' },
    { crc: '4B', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc8saej1850.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc8saej1850zero', () => {
  test.each([
    { crc: '00', hex: '' },
    { crc: '57', hex: '31' },
    { crc: 'B2', hex: '48656C6C6F20576F726C6421' },
    { crc: '37', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc8saej1850zero.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc8wcdma', () => {
  test.each([
    { crc: '00', hex: '' },
    { crc: 'CB', hex: '31' },
    { crc: '75', hex: '48656C6C6F20576F726C6421' },
    { crc: '25', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc8wcdma.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

test('#dumpPoly()', () => {
  const lines = [
    '0x00, 0x07, 0x0E, 0x09, 0x1C, 0x1B, 0x12, 0x15,\n',
    '0x38, 0x3F, 0x36, 0x31, 0x24, 0x23, 0x2A, 0x2D,\n',
    '0x70, 0x77, 0x7E, 0x79, 0x6C, 0x6B, 0x62, 0x65,\n',
    '0x48, 0x4F, 0x46, 0x41, 0x54, 0x53, 0x5A, 0x5D,\n',
    '0xE0, 0xE7, 0xEE, 0xE9, 0xFC, 0xFB, 0xF2, 0xF5,\n',
    '0xD8, 0xDF, 0xD6, 0xD1, 0xC4, 0xC3, 0xCA, 0xCD,\n',
    '0x90, 0x97, 0x9E, 0x99, 0x8C, 0x8B, 0x82, 0x85,\n',
    '0xA8, 0xAF, 0xA6, 0xA1, 0xB4, 0xB3, 0xBA, 0xBD,\n',
    '0xC7, 0xC0, 0xC9, 0xCE, 0xDB, 0xDC, 0xD5, 0xD2,\n',
    '0xFF, 0xF8, 0xF1, 0xF6, 0xE3, 0xE4, 0xED, 0xEA,\n',
    '0xB7, 0xB0, 0xB9, 0xBE, 0xAB, 0xAC, 0xA5, 0xA2,\n',
    '0x8F, 0x88, 0x81, 0x86, 0x93, 0x94, 0x9D, 0x9A,\n',
    '0x27, 0x20, 0x29, 0x2E, 0x3B, 0x3C, 0x35, 0x32,\n',
    '0x1F, 0x18, 0x11, 0x16, 0x03, 0x04, 0x0D, 0x0A,\n',
    '0x57, 0x50, 0x59, 0x5E, 0x4B, 0x4C, 0x45, 0x42,\n',
    '0x6F, 0x68, 0x61, 0x66, 0x73, 0x74, 0x7D, 0x7A,\n',
    '0x89, 0x8E, 0x87, 0x80, 0x95, 0x92, 0x9B, 0x9C,\n',
    '0xB1, 0xB6, 0xBF, 0xB8, 0xAD, 0xAA, 0xA3, 0xA4,\n',
    '0xF9, 0xFE, 0xF7, 0xF0, 0xE5, 0xE2, 0xEB, 0xEC,\n',
    '0xC1, 0xC6, 0xCF, 0xC8, 0xDD, 0xDA, 0xD3, 0xD4,\n',
    '0x69, 0x6E, 0x67, 0x60, 0x75, 0x72, 0x7B, 0x7C,\n',
    '0x51, 0x56, 0x5F, 0x58, 0x4D, 0x4A, 0x43, 0x44,\n',
    '0x19, 0x1E, 0x17, 0x10, 0x05, 0x02, 0x0B, 0x0C,\n',
    '0x21, 0x26, 0x2F, 0x28, 0x3D, 0x3A, 0x33, 0x34,\n',
    '0x4E, 0x49, 0x40, 0x47, 0x52, 0x55, 0x5C, 0x5B,\n',
    '0x76, 0x71, 0x78, 0x7F, 0x6A, 0x6D, 0x64, 0x63,\n',
    '0x3E, 0x39, 0x30, 0x37, 0x22, 0x25, 0x2C, 0x2B,\n',
    '0x06, 0x01, 0x08, 0x0F, 0x1A, 0x1D, 0x14, 0x13,\n',
    '0xAE, 0xA9, 0xA0, 0xA7, 0xB2, 0xB5, 0xBC, 0xBB,\n',
    '0x96, 0x91, 0x98, 0x9F, 0x8A, 0x8D, 0x84, 0x83,\n',
    '0xDE, 0xD9, 0xD0, 0xD7, 0xC2, 0xC5, 0xCC, 0xCB,\n',
    '0xE6, 0xE1, 0xE8, 0xEF, 0xFA, 0xFD, 0xF4, 0xF3,\n',
  ]
  expect(sut.crc8.dumpPoly()).toBe(lines.join(''))
})
