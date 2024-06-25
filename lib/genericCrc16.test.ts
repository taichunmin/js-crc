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
