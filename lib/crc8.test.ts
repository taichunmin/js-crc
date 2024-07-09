import crc8 from './crc8'
import crc8autosar from './crc8autosar'
import crc8bluetooth from './crc8bluetooth'
import crc8cardx from './crc8cardx'
import crc8cdma2000 from './crc8cdma2000'
import crc8darc from './crc8darc'
import crc8dvbs2 from './crc8dvbs2'
import crc8ebu from './crc8ebu'
import crc8gsma from './crc8gsma'
import crc8gsmb from './crc8gsmb'
import crc8hitag from './crc8hitag'
import crc8icode from './crc8icode'
import crc8itu from './crc8itu'
import crc8legic from './crc8legic'
import crc8mad from './crc8mad'
import crc8maxim from './crc8maxim'
import crc8nrsc5 from './crc8nrsc5'
import crc8opensafety from './crc8opensafety'
import crc8rohc from './crc8rohc'
import crc8saej1850 from './crc8saej1850'
import crc8wcdma from './crc8wcdma'

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
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '1C', hex: '48656C6C6F20576F726C6421' },
    { crc: 'F4', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8(u8arr.subarray(0, 1))
    expect(crc8(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8autosar', () => {
  test.each([
    { crc: '00', hex: '' },
    { crc: '4F', hex: '31' },
    { crc: '37', hex: '48656C6C6F20576F726C6421' },
    { crc: 'DF', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8autosar(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '37', hex: '48656C6C6F20576F726C6421' },
    { crc: 'DF', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8autosar(u8arr.subarray(0, 1))
    expect(crc8autosar(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8bluetooth', () => {
  test.each([
    { crc: '00', hex: '' },
    { crc: '92', hex: '31' },
    { crc: '51', hex: '48656C6C6F20576F726C6421' },
    { crc: '26', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8bluetooth(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '51', hex: '48656C6C6F20576F726C6421' },
    { crc: '26', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8bluetooth(u8arr.subarray(0, 1))
    expect(crc8bluetooth(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8cardx', () => {
  test.each([
    { crc: '2C', hex: '' },
    { crc: '53', hex: '31' },
    { crc: '18', hex: '48656C6C6F20576F726C6421' },
    { crc: 'DB', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8cardx(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '18', hex: '48656C6C6F20576F726C6421' },
    { crc: 'DB', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8cardx(u8arr.subarray(0, 1))
    expect(crc8cardx(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8cdma2000', () => {
  test.each([
    { crc: 'FF', hex: '' },
    { crc: 'B6', hex: '31' },
    { crc: '23', hex: '48656C6C6F20576F726C6421' },
    { crc: 'DA', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8cdma2000(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '23', hex: '48656C6C6F20576F726C6421' },
    { crc: 'DA', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8cdma2000(u8arr.subarray(0, 1))
    expect(crc8cdma2000(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8darc', () => {
  test.each([
    { crc: '00', hex: '' },
    { crc: 'DA', hex: '31' },
    { crc: '3E', hex: '48656C6C6F20576F726C6421' },
    { crc: '15', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8darc(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '3E', hex: '48656C6C6F20576F726C6421' },
    { crc: '15', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8darc(u8arr.subarray(0, 1))
    expect(crc8darc(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8dvbs2', () => {
  test.each([
    { crc: '00', hex: '' },
    { crc: '23', hex: '31' },
    { crc: '29', hex: '48656C6C6F20576F726C6421' },
    { crc: 'BC', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8dvbs2(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '29', hex: '48656C6C6F20576F726C6421' },
    { crc: 'BC', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8dvbs2(u8arr.subarray(0, 1))
    expect(crc8dvbs2(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8ebu', () => {
  test.each([
    { crc: 'FF', hex: '' },
    { crc: '7E', hex: '31' },
    { crc: '07', hex: '48656C6C6F20576F726C6421' },
    { crc: '97', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8ebu(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '07', hex: '48656C6C6F20576F726C6421' },
    { crc: '97', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8ebu(u8arr.subarray(0, 1))
    expect(crc8ebu(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8gsma', () => {
  test.each([
    { crc: '00', hex: '' },
    { crc: '57', hex: '31' },
    { crc: 'B2', hex: '48656C6C6F20576F726C6421' },
    { crc: '37', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8gsma(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: 'B2', hex: '48656C6C6F20576F726C6421' },
    { crc: '37', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8gsma(u8arr.subarray(0, 1))
    expect(crc8gsma(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8gsmb', () => {
  test.each([
    { crc: 'FF', hex: '' },
    { crc: 'F8', hex: '31' },
    { crc: 'E0', hex: '48656C6C6F20576F726C6421' },
    { crc: '94', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8gsmb(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: 'E0', hex: '48656C6C6F20576F726C6421' },
    { crc: '94', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8gsmb(u8arr.subarray(0, 1))
    expect(crc8gsmb(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8hitag', () => {
  test.each([
    { crc: 'FF', hex: '' },
    { crc: '93', hex: '31' },
    { crc: 'FE', hex: '48656C6C6F20576F726C6421' },
    { crc: 'B4', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8hitag(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: 'FE', hex: '48656C6C6F20576F726C6421' },
    { crc: 'B4', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8hitag(u8arr.subarray(0, 1))
    expect(crc8hitag(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8icode', () => {
  test.each([
    { crc: 'FD', hex: '' },
    { crc: 'A9', hex: '31' },
    { crc: '51', hex: '48656C6C6F20576F726C6421' },
    { crc: '7E', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8icode(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '51', hex: '48656C6C6F20576F726C6421' },
    { crc: '7E', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8icode(u8arr.subarray(0, 1))
    expect(crc8icode(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8itu', () => {
  test.each([
    { crc: '55', hex: '' },
    { crc: 'C2', hex: '31' },
    { crc: '49', hex: '48656C6C6F20576F726C6421' },
    { crc: 'A1', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8itu(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '49', hex: '48656C6C6F20576F726C6421' },
    { crc: 'A1', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8itu(u8arr.subarray(0, 1))
    expect(crc8itu(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8legic', () => {
  test.each([
    { crc: 'AA', hex: '' },
    { crc: 'D6', hex: '31' },
    { crc: 'F1', hex: '48656C6C6F20576F726C6421' },
    { crc: 'FF', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8legic(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: 'F1', hex: '48656C6C6F20576F726C6421' },
    { crc: 'FF', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8legic(u8arr.subarray(0, 1))
    expect(crc8legic(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8mad', () => {
  test.each([
    { crc: 'C7', hex: '' },
    { crc: '31', hex: '31' },
    { crc: '4B', hex: '48656C6C6F20576F726C6421' },
    { crc: '99', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8mad(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '4B', hex: '48656C6C6F20576F726C6421' },
    { crc: '99', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8mad(u8arr.subarray(0, 1))
    expect(crc8mad(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8maxim', () => {
  test.each([
    { crc: '00', hex: '' },
    { crc: 'E0', hex: '31' },
    { crc: '9E', hex: '48656C6C6F20576F726C6421' },
    { crc: 'A1', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8maxim(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '9E', hex: '48656C6C6F20576F726C6421' },
    { crc: 'A1', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8maxim(u8arr.subarray(0, 1))
    expect(crc8maxim(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8nrsc5', () => {
  test.each([
    { crc: 'FF', hex: '' },
    { crc: '58', hex: '31' },
    { crc: '26', hex: '48656C6C6F20576F726C6421' },
    { crc: 'F7', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8nrsc5(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '26', hex: '48656C6C6F20576F726C6421' },
    { crc: 'F7', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8nrsc5(u8arr.subarray(0, 1))
    expect(crc8nrsc5(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8opensafety', () => {
  test.each([
    { crc: '00', hex: '' },
    { crc: 'F2', hex: '31' },
    { crc: '7C', hex: '48656C6C6F20576F726C6421' },
    { crc: '3E', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8opensafety(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '7C', hex: '48656C6C6F20576F726C6421' },
    { crc: '3E', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8opensafety(u8arr.subarray(0, 1))
    expect(crc8opensafety(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8rohc', () => {
  test.each([
    { crc: 'FF', hex: '' },
    { crc: '7A', hex: '31' },
    { crc: '4C', hex: '48656C6C6F20576F726C6421' },
    { crc: 'D0', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8rohc(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '4C', hex: '48656C6C6F20576F726C6421' },
    { crc: 'D0', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8rohc(u8arr.subarray(0, 1))
    expect(crc8rohc(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8saej1850', () => {
  test.each([
    { crc: '00', hex: '' },
    { crc: '6C', hex: '31' },
    { crc: '01', hex: '48656C6C6F20576F726C6421' },
    { crc: '4B', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8saej1850(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '01', hex: '48656C6C6F20576F726C6421' },
    { crc: '4B', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8saej1850(u8arr.subarray(0, 1))
    expect(crc8saej1850(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})

describe('crc8wcdma', () => {
  test.each([
    { crc: '00', hex: '' },
    { crc: 'CB', hex: '31' },
    { crc: '75', hex: '48656C6C6F20576F726C6421' },
    { crc: '25', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(crc8wcdma(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '75', hex: '48656C6C6F20576F726C6421' },
    { crc: '25', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = crc8wcdma(u8arr.subarray(0, 1))
    expect(crc8wcdma(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})
