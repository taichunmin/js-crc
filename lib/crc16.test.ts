import crc16a from './crc16a'
import crc16arc from './crc16arc'
import crc16augccitt from './crc16augccitt'
import crc16buypass from './crc16buypass'
import crc16ccittfalse from './crc16ccittfalse'
import crc16cdma2000 from './crc16cdma2000'
import crc16cms from './crc16cms'
import crc16dds110 from './crc16dds110'
import crc16dectr from './crc16dectr'
import crc16dectx from './crc16dectx'
import crc16dnp from './crc16dnp'
import crc16en13757 from './crc16en13757'
import crc16genibus from './crc16genibus'
import crc16gsm from './crc16gsm'
import crc16iclass from './crc16iclass'
import crc16kermit from './crc16kermit'
import crc16lj1200 from './crc16lj1200'
import crc16m17 from './crc16m17'
import crc16maxim from './crc16maxim'
import crc16mcrf4xx from './crc16mcrf4xx'
import crc16modbus from './crc16modbus'
import crc16nrsc5 from './crc16nrsc5'
import crc16opensafetya from './crc16opensafetya'
import crc16opensafetyb from './crc16opensafetyb'
import crc16philips from './crc16philips'
import crc16profibus from './crc16profibus'
import crc16riello from './crc16riello'
import crc16t10dif from './crc16t10dif'
import crc16teledisk from './crc16teledisk'
import crc16tms37157 from './crc16tms37157'
import crc16usb from './crc16usb'
import crc16x25 from './crc16x25'
import crc16xmodem from './crc16xmodem'

function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}

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

describe('crc16arc', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: 'D4C1', hex: '31' },
    { crc: '57BE', hex: '48656C6C6F20576F726C6421' },
    { crc: 'BB3D', hex: '313233343536373839' },
  ])('crc16arc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16arc(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '57BE', hex: '48656C6C6F20576F726C6421' },
    { crc: 'BB3D', hex: '313233343536373839' },
  ])('crc16arc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16arc(u8arr.subarray(0, 1))
    expect(crc16arc(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16augccitt', () => {
  test.each([
    { crc: '1D0F', hex: '' },
    { crc: 'EAEE', hex: '31' },
    { crc: 'A5B9', hex: '48656C6C6F20576F726C6421' },
    { crc: 'E5CC', hex: '313233343536373839' },
  ])('crc16augccitt(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16augccitt(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: 'A5B9', hex: '48656C6C6F20576F726C6421' },
    { crc: 'E5CC', hex: '313233343536373839' },
  ])('crc16augccitt(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16augccitt(u8arr.subarray(0, 1))
    expect(crc16augccitt(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16buypass', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: '80A5', hex: '31' },
    { crc: '42E5', hex: '48656C6C6F20576F726C6421' },
    { crc: 'FEE8', hex: '313233343536373839' },
  ])('crc16buypass(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16buypass(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '42E5', hex: '48656C6C6F20576F726C6421' },
    { crc: 'FEE8', hex: '313233343536373839' },
  ])('crc16buypass(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16buypass(u8arr.subarray(0, 1))
    expect(crc16buypass(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16ccittfalse', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: 'C782', hex: '31' },
    { crc: '882A', hex: '48656C6C6F20576F726C6421' },
    { crc: '29B1', hex: '313233343536373839' },
  ])('crc16ccittfalse(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16ccittfalse(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '882A', hex: '48656C6C6F20576F726C6421' },
    { crc: '29B1', hex: '313233343536373839' },
  ])('crc16ccittfalse(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16ccittfalse(u8arr.subarray(0, 1))
    expect(crc16ccittfalse(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16cdma2000', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: 'CD4F', hex: '31' },
    { crc: 'EABF', hex: '48656C6C6F20576F726C6421' },
    { crc: '4C06', hex: '313233343536373839' },
  ])('crc16cdma2000(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16cdma2000(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: 'EABF', hex: '48656C6C6F20576F726C6421' },
    { crc: '4C06', hex: '313233343536373839' },
  ])('crc16cdma2000(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16cdma2000(u8arr.subarray(0, 1))
    expect(crc16cdma2000(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16cms', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: '7DA7', hex: '31' },
    { crc: '64A5', hex: '48656C6C6F20576F726C6421' },
    { crc: 'AEE7', hex: '313233343536373839' },
  ])('crc16cms(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16cms(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '64A5', hex: '48656C6C6F20576F726C6421' },
    { crc: 'AEE7', hex: '313233343536373839' },
  ])('crc16cms(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16cms(u8arr.subarray(0, 1))
    expect(crc16cms(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16dds110', () => {
  test.each([
    { crc: '800D', hex: '' },
    { crc: '0EA6', hex: '31' },
    { crc: '9765', hex: '48656C6C6F20576F726C6421' },
    { crc: '9ECF', hex: '313233343536373839' },
  ])('crc16dds110(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16dds110(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '9765', hex: '48656C6C6F20576F726C6421' },
    { crc: '9ECF', hex: '313233343536373839' },
  ])('crc16dds110(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16dds110(u8arr.subarray(0, 1))
    expect(crc16dds110(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16dectr', () => {
  test.each([
    { crc: '0001', hex: '' },
    { crc: 'EC38', hex: '31' },
    { crc: '23FE', hex: '48656C6C6F20576F726C6421' },
    { crc: '007E', hex: '313233343536373839' },
  ])('crc16dectr(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16dectr(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '23FE', hex: '48656C6C6F20576F726C6421' },
    { crc: '007E', hex: '313233343536373839' },
  ])('crc16dectr(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16dectr(u8arr.subarray(0, 1))
    expect(crc16dectr(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16dectx', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: 'EC39', hex: '31' },
    { crc: '23FF', hex: '48656C6C6F20576F726C6421' },
    { crc: '007F', hex: '313233343536373839' },
  ])('crc16dectx(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16dectx(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '23FF', hex: '48656C6C6F20576F726C6421' },
    { crc: '007F', hex: '313233343536373839' },
  ])('crc16dectx(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16dectx(u8arr.subarray(0, 1))
    expect(crc16dectx(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16dnp', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: '5265', hex: '31' },
    { crc: '8A5A', hex: '48656C6C6F20576F726C6421' },
    { crc: 'EA82', hex: '313233343536373839' },
  ])('crc16dnp(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16dnp(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '8A5A', hex: '48656C6C6F20576F726C6421' },
    { crc: 'EA82', hex: '313233343536373839' },
  ])('crc16dnp(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16dnp(u8arr.subarray(0, 1))
    expect(crc16dnp(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16en13757', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: '4DFE', hex: '31' },
    { crc: '07C0', hex: '48656C6C6F20576F726C6421' },
    { crc: 'C2B7', hex: '313233343536373839' },
  ])('crc16en13757(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16en13757(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '07C0', hex: '48656C6C6F20576F726C6421' },
    { crc: 'C2B7', hex: '313233343536373839' },
  ])('crc16en13757(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16en13757(u8arr.subarray(0, 1))
    expect(crc16en13757(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16genibus', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: '387D', hex: '31' },
    { crc: '77D5', hex: '48656C6C6F20576F726C6421' },
    { crc: 'D64E', hex: '313233343536373839' },
  ])('crc16genibus(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16genibus(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '77D5', hex: '48656C6C6F20576F726C6421' },
    { crc: 'D64E', hex: '313233343536373839' },
  ])('crc16genibus(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16genibus(u8arr.subarray(0, 1))
    expect(crc16genibus(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16gsm', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: 'D98D', hex: '31' },
    { crc: 'F32C', hex: '48656C6C6F20576F726C6421' },
    { crc: 'CE3C', hex: '313233343536373839' },
  ])('crc16gsm(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16gsm(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: 'F32C', hex: '48656C6C6F20576F726C6421' },
    { crc: 'CE3C', hex: '313233343536373839' },
  ])('crc16gsm(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16gsm(u8arr.subarray(0, 1))
    expect(crc16gsm(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16iclass', () => {
  test.each([
    { crc: 'EBD1', hex: '' },
    { crc: '18BA', hex: '31' },
    { crc: 'CA51', hex: '48656C6C6F20576F726C6421' },
    { crc: '56C7', hex: '313233343536373839' },
  ])('crc16iclass(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16iclass(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: 'CA51', hex: '48656C6C6F20576F726C6421' },
    { crc: '56C7', hex: '313233343536373839' },
  ])('crc16iclass(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16iclass(u8arr.subarray(0, 1))
    expect(crc16iclass(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16kermit', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: '200A', hex: '31' },
    { crc: '6B65', hex: '48656C6C6F20576F726C6421' },
    { crc: '2189', hex: '313233343536373839' },
  ])('crc16kermit(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16kermit(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '6B65', hex: '48656C6C6F20576F726C6421' },
    { crc: '2189', hex: '313233343536373839' },
  ])('crc16kermit(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16kermit(u8arr.subarray(0, 1))
    expect(crc16kermit(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16lj1200', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: '0E2B', hex: '31' },
    { crc: 'F77A', hex: '48656C6C6F20576F726C6421' },
    { crc: 'BDF4', hex: '313233343536373839' },
  ])('crc16lj1200(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16lj1200(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: 'F77A', hex: '48656C6C6F20576F726C6421' },
    { crc: 'BDF4', hex: '313233343536373839' },
  ])('crc16lj1200(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16lj1200(u8arr.subarray(0, 1))
    expect(crc16lj1200(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16m17', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: '5498', hex: '31' },
    { crc: '835A', hex: '48656C6C6F20576F726C6421' },
    { crc: '772B', hex: '313233343536373839' },
  ])('crc16m17(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16m17(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '835A', hex: '48656C6C6F20576F726C6421' },
    { crc: '772B', hex: '313233343536373839' },
  ])('crc16m17(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16m17(u8arr.subarray(0, 1))
    expect(crc16m17(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16maxim', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: '2B3E', hex: '31' },
    { crc: 'A841', hex: '48656C6C6F20576F726C6421' },
    { crc: '44C2', hex: '313233343536373839' },
  ])('crc16maxim(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16maxim(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: 'A841', hex: '48656C6C6F20576F726C6421' },
    { crc: '44C2', hex: '313233343536373839' },
  ])('crc16maxim(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16maxim(u8arr.subarray(0, 1))
    expect(crc16maxim(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16mcrf4xx', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: '2F8D', hex: '31' },
    { crc: 'F444', hex: '48656C6C6F20576F726C6421' },
    { crc: '6F91', hex: '313233343536373839' },
  ])('crc16mcrf4xx(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16mcrf4xx(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: 'F444', hex: '48656C6C6F20576F726C6421' },
    { crc: '6F91', hex: '313233343536373839' },
  ])('crc16mcrf4xx(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16mcrf4xx(u8arr.subarray(0, 1))
    expect(crc16mcrf4xx(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16modbus', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: '947E', hex: '31' },
    { crc: '55DA', hex: '48656C6C6F20576F726C6421' },
    { crc: '4B37', hex: '313233343536373839' },
  ])('crc16modbus(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16modbus(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '55DA', hex: '48656C6C6F20576F726C6421' },
    { crc: '4B37', hex: '313233343536373839' },
  ])('crc16modbus(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16modbus(u8arr.subarray(0, 1))
    expect(crc16modbus(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16nrsc5', () => {
  test.each([
    { crc: 'FFFF', hex: '' },
    { crc: '083E', hex: '31' },
    { crc: '7554', hex: '48656C6C6F20576F726C6421' },
    { crc: 'A066', hex: '313233343536373839' },
  ])('crc16nrsc5(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16nrsc5(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '7554', hex: '48656C6C6F20576F726C6421' },
    { crc: 'A066', hex: '313233343536373839' },
  ])('crc16nrsc5(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16nrsc5(u8arr.subarray(0, 1))
    expect(crc16nrsc5(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16opensafetya', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: '188C', hex: '31' },
    { crc: '1091', hex: '48656C6C6F20576F726C6421' },
    { crc: '5D38', hex: '313233343536373839' },
  ])('crc16opensafetya(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16opensafetya(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '1091', hex: '48656C6C6F20576F726C6421' },
    { crc: '5D38', hex: '313233343536373839' },
  ])('crc16opensafetya(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16opensafetya(u8arr.subarray(0, 1))
    expect(crc16opensafetya(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16opensafetyb', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: 'CBE5', hex: '31' },
    { crc: '8162', hex: '48656C6C6F20576F726C6421' },
    { crc: '20FE', hex: '313233343536373839' },
  ])('crc16opensafetyb(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16opensafetyb(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '8162', hex: '48656C6C6F20576F726C6421' },
    { crc: '20FE', hex: '313233343536373839' },
  ])('crc16opensafetyb(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16opensafetyb(u8arr.subarray(0, 1))
    expect(crc16opensafetyb(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16philips', () => {
  test.each([
    { crc: 'C592', hex: '' },
    { crc: '9754', hex: '31' },
    { crc: '861C', hex: '48656C6C6F20576F726C6421' },
    { crc: 'B842', hex: '313233343536373839' },
  ])('crc16philips(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16philips(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '861C', hex: '48656C6C6F20576F726C6421' },
    { crc: 'B842', hex: '313233343536373839' },
  ])('crc16philips(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16philips(u8arr.subarray(0, 1))
    expect(crc16philips(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16profibus', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: 'C5D2', hex: '31' },
    { crc: 'D5C0', hex: '48656C6C6F20576F726C6421' },
    { crc: 'A819', hex: '313233343536373839' },
  ])('crc16profibus(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16profibus(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: 'D5C0', hex: '48656C6C6F20576F726C6421' },
    { crc: 'A819', hex: '313233343536373839' },
  ])('crc16profibus(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16profibus(u8arr.subarray(0, 1))
    expect(crc16profibus(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16riello', () => {
  test.each([
    { crc: '554D', hex: '' },
    { crc: 'B9BE', hex: '31' },
    { crc: '014E', hex: '48656C6C6F20576F726C6421' },
    { crc: '63D0', hex: '313233343536373839' },
  ])('crc16riello(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16riello(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '014E', hex: '48656C6C6F20576F726C6421' },
    { crc: '63D0', hex: '313233343536373839' },
  ])('crc16riello(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16riello(u8arr.subarray(0, 1))
    expect(crc16riello(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16t10dif', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: '76E0', hex: '31' },
    { crc: '9744', hex: '48656C6C6F20576F726C6421' },
    { crc: 'D0DB', hex: '313233343536373839' },
  ])('crc16t10dif(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16t10dif(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '9744', hex: '48656C6C6F20576F726C6421' },
    { crc: 'D0DB', hex: '313233343536373839' },
  ])('crc16t10dif(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16t10dif(u8arr.subarray(0, 1))
    expect(crc16t10dif(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16teledisk', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: 'D192', hex: '31' },
    { crc: 'B69F', hex: '48656C6C6F20576F726C6421' },
    { crc: '0FB3', hex: '313233343536373839' },
  ])('crc16teledisk(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16teledisk(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: 'B69F', hex: '48656C6C6F20576F726C6421' },
    { crc: '0FB3', hex: '313233343536373839' },
  ])('crc16teledisk(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16teledisk(u8arr.subarray(0, 1))
    expect(crc16teledisk(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16tms37157', () => {
  test.each([
    { crc: '3791', hex: '' },
    { crc: 'A53D', hex: '31' },
    { crc: '6601', hex: '48656C6C6F20576F726C6421' },
    { crc: '26B1', hex: '313233343536373839' },
  ])('crc16tms37157(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16tms37157(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '6601', hex: '48656C6C6F20576F726C6421' },
    { crc: '26B1', hex: '313233343536373839' },
  ])('crc16tms37157(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16tms37157(u8arr.subarray(0, 1))
    expect(crc16tms37157(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16usb', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: '6B81', hex: '31' },
    { crc: 'AA25', hex: '48656C6C6F20576F726C6421' },
    { crc: 'B4C8', hex: '313233343536373839' },
  ])('crc16usb(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16usb(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: 'AA25', hex: '48656C6C6F20576F726C6421' },
    { crc: 'B4C8', hex: '313233343536373839' },
  ])('crc16usb(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16usb(u8arr.subarray(0, 1))
    expect(crc16usb(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16x25', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: 'D072', hex: '31' },
    { crc: '0BBB', hex: '48656C6C6F20576F726C6421' },
    { crc: '906E', hex: '313233343536373839' },
  ])('crc16x25(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16x25(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '0BBB', hex: '48656C6C6F20576F726C6421' },
    { crc: '906E', hex: '313233343536373839' },
  ])('crc16x25(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16x25(u8arr.subarray(0, 1))
    expect(crc16x25(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc16xmodem', () => {
  test.each([
    { crc: '0000', hex: '' },
    { crc: '2672', hex: '31' },
    { crc: '0CD3', hex: '48656C6C6F20576F726C6421' },
    { crc: '31C3', hex: '313233343536373839' },
  ])('crc16xmodem(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc16xmodem(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '0CD3', hex: '48656C6C6F20576F726C6421' },
    { crc: '31C3', hex: '313233343536373839' },
  ])('crc16xmodem(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc16xmodem(u8arr.subarray(0, 1))
    expect(crc16xmodem(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})
