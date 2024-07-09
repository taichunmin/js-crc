import * as sut from './genericCrc16'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

describe('crc16a', () => {
  test.each([
    { crc: '6363', hex: '' },
    { crc: '71F4', hex: '31' },
    { crc: '4167', hex: '48656C6C6F20576F726C6421' },
    { crc: 'BF05', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16a.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16arc', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: 'D4C1', hex: '31' },
    { crc: '57BE', hex: '48656C6C6F20576F726C6421' },
    { crc: 'BB3D', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16arc.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16augccitt', () => {
  test.each([
    { crc: '1D0F', hex: '' },
    { crc: 'EAEE', hex: '31' },
    { crc: 'A5B9', hex: '48656C6C6F20576F726C6421' },
    { crc: 'E5CC', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16augccitt.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16buypass', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: '80A5', hex: '31' },
    { crc: '42E5', hex: '48656C6C6F20576F726C6421' },
    { crc: 'FEE8', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16buypass.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16ccittfalse', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: 'C782', hex: '31' },
    { crc: '882A', hex: '48656C6C6F20576F726C6421' },
    { crc: '29B1', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16ccittfalse.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16cdma2000', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: 'CD4F', hex: '31' },
    { crc: 'EABF', hex: '48656C6C6F20576F726C6421' },
    { crc: '4C06', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16cdma2000.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16cms', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: '7DA7', hex: '31' },
    { crc: '64A5', hex: '48656C6C6F20576F726C6421' },
    { crc: 'AEE7', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16cms.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16dds110', () => {
  test.each([
    { crc: '800D', hex: '' },
    { crc: '0EA6', hex: '31' },
    { crc: '9765', hex: '48656C6C6F20576F726C6421' },
    { crc: '9ECF', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16dds110.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16dectr', () => {
  test.each([
    { crc: '0001', hex: '' },
    { crc: 'EC38', hex: '31' },
    { crc: '23FE', hex: '48656C6C6F20576F726C6421' },
    { crc: '007E', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16dectr.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16dectx', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: 'EC39', hex: '31' },
    { crc: '23FF', hex: '48656C6C6F20576F726C6421' },
    { crc: '007F', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16dectx.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16dnp', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: '5265', hex: '31' },
    { crc: '8A5A', hex: '48656C6C6F20576F726C6421' },
    { crc: 'EA82', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16dnp.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16en13757', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: '4DFE', hex: '31' },
    { crc: '07C0', hex: '48656C6C6F20576F726C6421' },
    { crc: 'C2B7', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16en13757.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16genibus', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: '387D', hex: '31' },
    { crc: '77D5', hex: '48656C6C6F20576F726C6421' },
    { crc: 'D64E', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16genibus.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16gsm', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: 'D98D', hex: '31' },
    { crc: 'F32C', hex: '48656C6C6F20576F726C6421' },
    { crc: 'CE3C', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16gsm.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16iclass', () => {
  test.each([
    { crc: 'EBD1', hex: '' },
    { crc: '18BA', hex: '31' },
    { crc: 'CA51', hex: '48656C6C6F20576F726C6421' },
    { crc: '56C7', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16iclass.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16kermit', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: '200A', hex: '31' },
    { crc: '6B65', hex: '48656C6C6F20576F726C6421' },
    { crc: '2189', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16kermit.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16lj1200', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: '0E2B', hex: '31' },
    { crc: 'F77A', hex: '48656C6C6F20576F726C6421' },
    { crc: 'BDF4', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16lj1200.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16m17', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: '5498', hex: '31' },
    { crc: '835A', hex: '48656C6C6F20576F726C6421' },
    { crc: '772B', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16m17.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16maxim', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: '2B3E', hex: '31' },
    { crc: 'A841', hex: '48656C6C6F20576F726C6421' },
    { crc: '44C2', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16maxim.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16mcrf4xx', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: '2F8D', hex: '31' },
    { crc: 'F444', hex: '48656C6C6F20576F726C6421' },
    { crc: '6F91', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16mcrf4xx.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16modbus', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: '947E', hex: '31' },
    { crc: '55DA', hex: '48656C6C6F20576F726C6421' },
    { crc: '4B37', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16modbus.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16nrsc5', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: '083E', hex: '31' },
    { crc: '7554', hex: '48656C6C6F20576F726C6421' },
    { crc: 'A066', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16nrsc5.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16opensafetya', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: '188C', hex: '31' },
    { crc: '1091', hex: '48656C6C6F20576F726C6421' },
    { crc: '5D38', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16opensafetya.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16opensafetyb', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: 'CBE5', hex: '31' },
    { crc: '8162', hex: '48656C6C6F20576F726C6421' },
    { crc: '20FE', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16opensafetyb.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16philips', () => {
  test.each([
    { crc: 'C592', hex: '' },
    { crc: '9754', hex: '31' },
    { crc: '861C', hex: '48656C6C6F20576F726C6421' },
    { crc: 'B842', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16philips.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16profibus', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: 'C5D2', hex: '31' },
    { crc: 'D5C0', hex: '48656C6C6F20576F726C6421' },
    { crc: 'A819', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16profibus.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16riello', () => {
  test.each([
    { crc: '554D', hex: '' },
    { crc: 'B9BE', hex: '31' },
    { crc: '014E', hex: '48656C6C6F20576F726C6421' },
    { crc: '63D0', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16riello.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16t10dif', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: '76E0', hex: '31' },
    { crc: '9744', hex: '48656C6C6F20576F726C6421' },
    { crc: 'D0DB', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16t10dif.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16teledisk', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: 'D192', hex: '31' },
    { crc: 'B69F', hex: '48656C6C6F20576F726C6421' },
    { crc: '0FB3', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16teledisk.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16tms37157', () => {
  test.each([
    { crc: '3791', hex: '' },
    { crc: 'A53D', hex: '31' },
    { crc: '6601', hex: '48656C6C6F20576F726C6421' },
    { crc: '26B1', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16tms37157.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16usb', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: '6B81', hex: '31' },
    { crc: 'AA25', hex: '48656C6C6F20576F726C6421' },
    { crc: 'B4C8', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16usb.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16x25', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: 'D072', hex: '31' },
    { crc: '0BBB', hex: '48656C6C6F20576F726C6421' },
    { crc: '906E', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16x25.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

describe('crc16xmodem', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: '2672', hex: '31' },
    { crc: '0CD3', hex: '48656C6C6F20576F726C6421' },
    { crc: '31C3', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16xmodem.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})

test('#dumpPoly()', () => {
  const lines = [
    '0x0000, 0x1189, 0x2312, 0x329B, 0x4624, 0x57AD, 0x6536, 0x74BF,\n',
    '0x8C48, 0x9DC1, 0xAF5A, 0xBED3, 0xCA6C, 0xDBE5, 0xE97E, 0xF8F7,\n',
    '0x1081, 0x0108, 0x3393, 0x221A, 0x56A5, 0x472C, 0x75B7, 0x643E,\n',
    '0x9CC9, 0x8D40, 0xBFDB, 0xAE52, 0xDAED, 0xCB64, 0xF9FF, 0xE876,\n',
    '0x2102, 0x308B, 0x0210, 0x1399, 0x6726, 0x76AF, 0x4434, 0x55BD,\n',
    '0xAD4A, 0xBCC3, 0x8E58, 0x9FD1, 0xEB6E, 0xFAE7, 0xC87C, 0xD9F5,\n',
    '0x3183, 0x200A, 0x1291, 0x0318, 0x77A7, 0x662E, 0x54B5, 0x453C,\n',
    '0xBDCB, 0xAC42, 0x9ED9, 0x8F50, 0xFBEF, 0xEA66, 0xD8FD, 0xC974,\n',
    '0x4204, 0x538D, 0x6116, 0x709F, 0x0420, 0x15A9, 0x2732, 0x36BB,\n',
    '0xCE4C, 0xDFC5, 0xED5E, 0xFCD7, 0x8868, 0x99E1, 0xAB7A, 0xBAF3,\n',
    '0x5285, 0x430C, 0x7197, 0x601E, 0x14A1, 0x0528, 0x37B3, 0x263A,\n',
    '0xDECD, 0xCF44, 0xFDDF, 0xEC56, 0x98E9, 0x8960, 0xBBFB, 0xAA72,\n',
    '0x6306, 0x728F, 0x4014, 0x519D, 0x2522, 0x34AB, 0x0630, 0x17B9,\n',
    '0xEF4E, 0xFEC7, 0xCC5C, 0xDDD5, 0xA96A, 0xB8E3, 0x8A78, 0x9BF1,\n',
    '0x7387, 0x620E, 0x5095, 0x411C, 0x35A3, 0x242A, 0x16B1, 0x0738,\n',
    '0xFFCF, 0xEE46, 0xDCDD, 0xCD54, 0xB9EB, 0xA862, 0x9AF9, 0x8B70,\n',
    '0x8408, 0x9581, 0xA71A, 0xB693, 0xC22C, 0xD3A5, 0xE13E, 0xF0B7,\n',
    '0x0840, 0x19C9, 0x2B52, 0x3ADB, 0x4E64, 0x5FED, 0x6D76, 0x7CFF,\n',
    '0x9489, 0x8500, 0xB79B, 0xA612, 0xD2AD, 0xC324, 0xF1BF, 0xE036,\n',
    '0x18C1, 0x0948, 0x3BD3, 0x2A5A, 0x5EE5, 0x4F6C, 0x7DF7, 0x6C7E,\n',
    '0xA50A, 0xB483, 0x8618, 0x9791, 0xE32E, 0xF2A7, 0xC03C, 0xD1B5,\n',
    '0x2942, 0x38CB, 0x0A50, 0x1BD9, 0x6F66, 0x7EEF, 0x4C74, 0x5DFD,\n',
    '0xB58B, 0xA402, 0x9699, 0x8710, 0xF3AF, 0xE226, 0xD0BD, 0xC134,\n',
    '0x39C3, 0x284A, 0x1AD1, 0x0B58, 0x7FE7, 0x6E6E, 0x5CF5, 0x4D7C,\n',
    '0xC60C, 0xD785, 0xE51E, 0xF497, 0x8028, 0x91A1, 0xA33A, 0xB2B3,\n',
    '0x4A44, 0x5BCD, 0x6956, 0x78DF, 0x0C60, 0x1DE9, 0x2F72, 0x3EFB,\n',
    '0xD68D, 0xC704, 0xF59F, 0xE416, 0x90A9, 0x8120, 0xB3BB, 0xA232,\n',
    '0x5AC5, 0x4B4C, 0x79D7, 0x685E, 0x1CE1, 0x0D68, 0x3FF3, 0x2E7A,\n',
    '0xE70E, 0xF687, 0xC41C, 0xD595, 0xA12A, 0xB0A3, 0x8238, 0x93B1,\n',
    '0x6B46, 0x7ACF, 0x4854, 0x59DD, 0x2D62, 0x3CEB, 0x0E70, 0x1FF9,\n',
    '0xF78F, 0xE606, 0xD49D, 0xC514, 0xB1AB, 0xA022, 0x92B9, 0x8330,\n',
    '0x7BC7, 0x6A4E, 0x58D5, 0x495C, 0x3DE3, 0x2C6A, 0x1EF1, 0x0F78,\n',
  ]
  expect(sut.crc16a.dumpPoly()).toBe(lines.join(''))
})

test('exportCrcFn', () => {
  expect(sut.crc16a.exportCrcFn().trim().length).toBeGreaterThan(0)
  expect(sut.crc16dectr.exportCrcFn().trim().length).toBeGreaterThan(0)
})

test('exportTest1', () => {
  const snapshot = `
describe('crc16a', () => {
  test.each([
    { crc: '6363', hex: '' },
    { crc: '71F4', hex: '31' },
    { crc: '4167', hex: '48656C6C6F20576F726C6421' },
    { crc: 'BF05', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.crc16a.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})
`
  expect(sut.crc16a.exportTest1().trim()).toBe(snapshot.trim())
})

test('exportTest2', () => {
  const snapshot = `
describe('crc16a', () => {
  test.each([
    { crc: '6363', hex: '' },
    { crc: '71F4', hex: '31' },
    { crc: '4167', hex: '48656C6C6F20576F726C6421' },
    { crc: 'BF05', hex: '313233343536373839' },
  ])('crc16a(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16a(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '4167', hex: '48656C6C6F20576F726C6421' },
    { crc: 'BF05', hex: '313233343536373839' },
  ])('crc16a(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16a(u8arr.subarray(0, 1))
    expect(crc16a(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})
`
  expect(sut.crc16a.exportTest2().trim()).toBe(snapshot.trim())
})
