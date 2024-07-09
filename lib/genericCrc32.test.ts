import * as sut from './genericCrc32'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

describe('crc32', () => {
  test.each([
    { crc: '00000000', hex: '' },
    { crc: '83DCEFB7', hex: '31' },
    { crc: '1C291CA3', hex: '48656C6C6F20576F726C6421' },
    { crc: 'CBF43926', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc32.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc32autosar', () => {
  test.each([
    { crc: '00000000', hex: '' },
    { crc: '2DE7AF5E', hex: '31' },
    { crc: '4B1CD472', hex: '48656C6C6F20576F726C6421' },
    { crc: '1697D06A', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc32autosar.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc32bzip2', () => {
  test.each([
    { crc: '00000000', hex: '' },
    { crc: '6104306C', hex: '31' },
    { crc: '6B1A7CAE', hex: '48656C6C6F20576F726C6421' },
    { crc: 'FC891918', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc32bzip2.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc32c', () => {
  test.each([
    { crc: '00000000', hex: '' },
    { crc: '90F599E3', hex: '31' },
    { crc: 'FE6CF1DC', hex: '48656C6C6F20576F726C6421' },
    { crc: 'E3069283', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc32c.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc32cdromedc', () => {
  test.each([
    { crc: '00000000', hex: '' },
    { crc: '8B913101', hex: '31' },
    { crc: 'F9058BB0', hex: '48656C6C6F20576F726C6421' },
    { crc: '6EC2EDC4', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc32cdromedc.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc32d', () => {
  test.each([
    { crc: '00000000', hex: '' },
    { crc: '9B1D1DFB', hex: '31' },
    { crc: 'D9C5B0CD', hex: '48656C6C6F20576F726C6421' },
    { crc: '87315576', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc32d.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc32jamcrc', () => {
  test.each([
    { crc: 'FFFFFFFF', hex: '' },
    { crc: '7C231048', hex: '31' },
    { crc: 'E3D6E35C', hex: '48656C6C6F20576F726C6421' },
    { crc: '340BC6D9', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc32jamcrc.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc32mef', () => {
  test.each([
    { crc: 'FFFFFFFF', hex: '' },
    { crc: '040AB65E', hex: '31' },
    { crc: '97E5CD47', hex: '48656C6C6F20576F726C6421' },
    { crc: 'D2C22F51', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc32mef.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc32mpeg2', () => {
  test.each([
    { crc: 'FFFFFFFF', hex: '' },
    { crc: '9EFBCF93', hex: '31' },
    { crc: '94E58351', hex: '48656C6C6F20576F726C6421' },
    { crc: '0376E6E7', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc32mpeg2.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc32posix', () => {
  test.each([
    { crc: 'FFFFFFFF', hex: '' },
    { crc: '2F0C8FD8', hex: '31' },
    { crc: '6286288F', hex: '48656C6C6F20576F726C6421' },
    { crc: '765E7680', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc32posix.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc32q', () => {
  test.each([
    { crc: '00000000', hex: '' },
    { crc: 'A96974CB', hex: '31' },
    { crc: '007C2675', hex: '48656C6C6F20576F726C6421' },
    { crc: '3010BF7F', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc32q.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc32sata', () => {
  test.each([
    { crc: '52325032', hex: '' },
    { crc: '93B6D24E', hex: '31' },
    { crc: '5B5496E4', hex: '48656C6C6F20576F726C6421' },
    { crc: 'CF72AFE8', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc32sata.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc32xfer', () => {
  test.each([
    { crc: '00000000', hex: '' },
    { crc: '00001FBF', hex: '31' },
    { crc: '8456EBB6', hex: '48656C6C6F20576F726C6421' },
    { crc: 'BD0BE338', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc32xfer.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

test('#dumpPoly()', () => {
  const lines = [
    '0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3,\n',
    '0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91,\n',
    '0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7,\n',
    '0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5,\n',
    '0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B,\n',
    '0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59,\n',
    '0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F,\n',
    '0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924, 0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D,\n',
    '0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433,\n',
    '0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01,\n',
    '0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457,\n',
    '0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65,\n',
    '0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB,\n',
    '0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9,\n',
    '0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F,\n',
    '0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD,\n',
    '0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683,\n',
    '0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1,\n',
    '0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7,\n',
    '0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5,\n',
    '0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B,\n',
    '0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79,\n',
    '0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F,\n',
    '0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D,\n',
    '0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713,\n',
    '0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21,\n',
    '0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777,\n',
    '0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45,\n',
    '0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB,\n',
    '0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9,\n',
    '0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF,\n',
    '0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D,\n',
  ]
  expect(sut.crc32.dumpPoly()).toBe(lines.join(''))
})

test('exportCrcFn', () => {
  expect(sut.crc32.exportCrcFn().trim().length).toBeGreaterThan(0)
  expect(sut.crc32mpeg2.exportCrcFn().trim().length).toBeGreaterThan(0)
})

test('exportTest1', () => {
  const snapshot = `
describe('crc32', () => {
  test.each([
    { crc: '00000000', hex: '' },
    { crc: '83DCEFB7', hex: '31' },
    { crc: '1C291CA3', hex: '48656C6C6F20576F726C6421' },
    { crc: 'CBF43926', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc32.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})
`
  expect(sut.crc32.exportTest1().trim()).toBe(snapshot.trim())
})

test('exportTest2', () => {
  const snapshot = `
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
`
  expect(sut.crc32.exportTest2().trim()).toBe(snapshot.trim())
})
