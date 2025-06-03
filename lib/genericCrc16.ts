import { setObject } from './common2'
import { reflect, u16ToHex } from './common1'

export class GenericCrc16 {
  name: string
  readonly initial: number
  readonly poly: number
  readonly refin: boolean
  readonly refout: boolean
  readonly tbl = new Uint16Array(256)
  readonly u16 = new Uint16Array(1)
  readonly xorout: number

  constructor (opts: {
    name: string
    poly: number
    initial: number
    xorout: number
    refin: boolean
    refout: boolean
  }) {
    this.name = opts.name
    this.poly = opts.poly
    this.initial = opts.initial
    this.xorout = opts.xorout
    this.refin = opts.refin
    this.refout = opts.refout
    this.buildPoly(opts.poly)
  }

  buildPoly (poly: number): void {
    const [u16, refin, tbl] = [this.u16, this.refin, this.tbl]
    for (let i = 0; i < 256; i++) {
      u16[0] = (refin ? reflect.u8(i) : i) << 8
      tbl[i] = 0
      for (let j = 0; j < 8; j++) {
        tbl[i] = (((tbl[i] ^ u16[0]) & 0x8000) !== 0 ? poly : 0) ^ (tbl[i] << 1)
        u16[0] <<= 1
      }
      if (refin) tbl[i] = reflect.u16(tbl[i])
    }
  }

  getCrc (buf: Uint8Array): number {
    const [u16, refout, tbl, xorout] = [this.u16, this.refout, this.tbl, this.xorout]
    if (refout) {
      u16[0] = reflect.u16(this.initial)
      for (const b of buf) u16[0] = tbl[(u16[0] ^ b) & 0xFF] ^ (u16[0] >>> 8)
    } else {
      u16[0] = this.initial
      for (const b of buf) u16[0] = tbl[(u16[0] >>> 8) ^ b] ^ (u16[0] << 8)
    }
    return u16[0] ^ xorout
  }

  dumpPoly (space = 0): string {
    const [u16, tbl] = [this.u16, this.tbl]
    const lines = []
    for (let i = 0; i < 32; i++) {
      const line = []
      for (let j = 0; j < 8; j++) {
        u16[0] = tbl[i * 8 + j]
        line.push(u16ToHex(u16[0]))
      }
      lines.push(''.padStart(space) + line.join(', ') + ',\n')
    }
    return lines.join('')
  }

  exportCrcFn (): string {
    const prev = u16ToHex((this.refout ? reflect.u16(this.initial) : this.initial) ^ this.xorout)
    const xorout = this.xorout === 0 ? '' : ` ^ ${u16ToHex(this.xorout)}`
    const loop = this.refin ? 'POLY_TABLE[(u16[0] ^ b) & 0xFF] ^ (u16[0] >>> 8)' : 'POLY_TABLE[(u16[0] >>> 8) ^ b] ^ (u16[0] << 8)'
    return `import { setObject, u16 } from './common2'

const POLY_TABLE = new Uint16Array([
  ${this.dumpPoly(2).trim()}
])

/**
 * - poly: ${u16ToHex(this.poly)}
 * - initial: ${u16ToHex(this.initial)}
 * - xorout: ${u16ToHex(this.xorout)}
 * - refin: ${this.refin}
 * - refout: ${this.refout}
 */
export default function ${this.name} (buf: Uint8Array = new Uint8Array(), prev: number = ${prev}): number {
  u16[0] = prev${xorout} // revert of refout and xorout
  for (const b of buf) u16[0] = ${loop}
  return u16[0]${xorout}
}

setObject(globalThis, ['taichunmin', 'crc', '${this.name}'], ${this.name})
`
  }

  exportTest1 (): string {
    const hexToCrc = (hex: string): string => u16ToHex(this.getCrc(Buffer.from(hex, 'hex'))).slice(2)
    return `
describe('${this.name}', () => {
  test.each([
    { crc: '${hexToCrc('')}', hex: '' },
    { crc: '${hexToCrc('31')}', hex: '31' },
    { crc: '${hexToCrc('48656C6C6F20576F726C6421')}', hex: '48656C6C6F20576F726C6421' },
    { crc: '${hexToCrc('313233343536373839')}', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    expect(sut.${this.name}.getCrc(u8arr)).toBe(parseInt(crc, 16))
  })
})
`
  }

  exportTest2 (): string {
    const hexToCrc = (hex: string): string => u16ToHex(this.getCrc(Buffer.from(hex, 'hex'))).slice(2)
    return `
describe('${this.name}', () => {
  test.each([
    { crc: '${hexToCrc('')}', hex: '' },
    { crc: '${hexToCrc('31')}', hex: '31' },
    { crc: '${hexToCrc('48656C6C6F20576F726C6421')}', hex: '48656C6C6F20576F726C6421' },
    { crc: '${hexToCrc('313233343536373839')}', hex: '313233343536373839' },
  ])('${this.name}(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(${this.name}(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '${hexToCrc('48656C6C6F20576F726C6421')}', hex: '48656C6C6F20576F726C6421' },
    { crc: '${hexToCrc('313233343536373839')}', hex: '313233343536373839' },
  ])('${this.name}(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = ${this.name}(u8arr.subarray(0, 1))
    expect(${this.name}(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})
`
  }
}

setObject(globalThis, ['taichunmin', 'crc', 'GenericCrc16'], GenericCrc16)

export const crc16a = new GenericCrc16({
  name: 'crc16a',
  poly: 0x1021,
  initial: 0xC6C6,
  xorout: 0x0000,
  refin: true,
  refout: true,
})

export const crc16arc = new GenericCrc16({
  name: 'crc16arc',
  poly: 0x8005,
  initial: 0x0000,
  xorout: 0x0000,
  refin: true,
  refout: true,
})

export const crc16augccitt = new GenericCrc16({
  name: 'crc16augccitt',
  poly: 0x1021,
  initial: 0x1D0F,
  xorout: 0x0000,
  refin: false,
  refout: false,
})

export const crc16buypass = new GenericCrc16({
  name: 'crc16buypass',
  poly: 0x8005,
  initial: 0x0000,
  xorout: 0x0000,
  refin: false,
  refout: false,
})

export const crc16ccittfalse = new GenericCrc16({
  name: 'crc16ccittfalse',
  poly: 0x1021,
  initial: 0xFFFF,
  xorout: 0x0000,
  refin: false,
  refout: false,
})

export const crc16cdma2000 = new GenericCrc16({
  name: 'crc16cdma2000',
  poly: 0xC867,
  initial: 0xFFFF,
  xorout: 0x0000,
  refin: false,
  refout: false,
})

export const crc16cms = new GenericCrc16({
  name: 'crc16cms',
  poly: 0x8005,
  initial: 0xFFFF,
  xorout: 0x0000,
  refin: false,
  refout: false,
})

export const crc16dds110 = new GenericCrc16({
  name: 'crc16dds110',
  poly: 0x8005,
  initial: 0x800D,
  xorout: 0x0000,
  refin: false,
  refout: false,
})

export const crc16dectr = new GenericCrc16({
  name: 'crc16dectr',
  poly: 0x0589,
  initial: 0x0000,
  xorout: 0x0001,
  refin: false,
  refout: false,
})

export const crc16dectx = new GenericCrc16({
  name: 'crc16dectx',
  poly: 0x0589,
  initial: 0x0000,
  xorout: 0x0000,
  refin: false,
  refout: false,
})

export const crc16dnp = new GenericCrc16({
  name: 'crc16dnp',
  poly: 0x3D65,
  initial: 0x0000,
  xorout: 0xFFFF,
  refin: true,
  refout: true,
})

export const crc16en13757 = new GenericCrc16({
  name: 'crc16en13757',
  poly: 0x3D65,
  initial: 0x0000,
  xorout: 0xFFFF,
  refin: false,
  refout: false,
})

export const crc16genibus = new GenericCrc16({
  name: 'crc16genibus',
  poly: 0x1021,
  initial: 0xFFFF,
  xorout: 0xFFFF,
  refin: false,
  refout: false,
})

export const crc16gsm = new GenericCrc16({
  name: 'crc16gsm',
  poly: 0x1021,
  initial: 0x0000,
  xorout: 0xFFFF,
  refin: false,
  refout: false,
})

export const crc16iclass = new GenericCrc16({
  name: 'crc16iclass',
  poly: 0x1021,
  initial: 0x4807,
  xorout: 0x0BC3,
  refin: true,
  refout: true,
})

export const crc16kermit = new GenericCrc16({
  name: 'crc16kermit',
  poly: 0x1021,
  initial: 0x0000,
  xorout: 0x0000,
  refin: true,
  refout: true,
})

export const crc16lj1200 = new GenericCrc16({
  name: 'crc16lj1200',
  poly: 0x6F63,
  initial: 0x0000,
  xorout: 0x0000,
  refin: false,
  refout: false,
})

export const crc16m17 = new GenericCrc16({
  name: 'crc16m17',
  poly: 0x5935,
  initial: 0xFFFF,
  xorout: 0x0000,
  refin: false,
  refout: false,
})

export const crc16maxim = new GenericCrc16({
  name: 'crc16maxim',
  poly: 0x8005,
  initial: 0x0000,
  xorout: 0xFFFF,
  refin: true,
  refout: true,
})

export const crc16mcrf4xx = new GenericCrc16({
  name: 'crc16mcrf4xx',
  poly: 0x1021,
  initial: 0xFFFF,
  xorout: 0x0000,
  refin: true,
  refout: true,
})

export const crc16modbus = new GenericCrc16({
  name: 'crc16modbus',
  poly: 0x8005,
  initial: 0xFFFF,
  xorout: 0x0000,
  refin: true,
  refout: true,
})

export const crc16nrsc5 = new GenericCrc16({
  name: 'crc16nrsc5',
  poly: 0x080b,
  initial: 0xFFFF,
  xorout: 0x0000,
  refin: true,
  refout: true,
})

export const crc16opensafetya = new GenericCrc16({
  name: 'crc16opensafetya',
  poly: 0x5935,
  initial: 0x0000,
  xorout: 0x0000,
  refin: false,
  refout: false,
})

export const crc16opensafetyb = new GenericCrc16({
  name: 'crc16opensafetyb',
  poly: 0x755b,
  initial: 0x0000,
  xorout: 0x0000,
  refin: false,
  refout: false,
})

export const crc16philips = new GenericCrc16({
  name: 'crc16philips',
  poly: 0x1021,
  initial: 0x49A3,
  xorout: 0x0000,
  refin: true,
  refout: true,
})

export const crc16profibus = new GenericCrc16({
  name: 'crc16profibus',
  poly: 0x1dcf,
  initial: 0xffff,
  xorout: 0xffff,
  refin: false,
  refout: false,
})

export const crc16riello = new GenericCrc16({
  name: 'crc16riello',
  poly: 0x1021,
  initial: 0xB2AA,
  xorout: 0x0000,
  refin: true,
  refout: true,
})

export const crc16t10dif = new GenericCrc16({
  name: 'crc16t10dif',
  poly: 0x8BB7,
  initial: 0x0000,
  xorout: 0x0000,
  refin: false,
  refout: false,
})

export const crc16teledisk = new GenericCrc16({
  name: 'crc16teledisk',
  poly: 0xA097,
  initial: 0x0000,
  xorout: 0x0000,
  refin: false,
  refout: false,
})

export const crc16tms37157 = new GenericCrc16({
  name: 'crc16tms37157',
  poly: 0x1021,
  initial: 0x89EC,
  xorout: 0x0000,
  refin: true,
  refout: true,
})

export const crc16usb = new GenericCrc16({
  name: 'crc16usb',
  poly: 0x8005,
  initial: 0xFFFF,
  xorout: 0xFFFF,
  refin: true,
  refout: true,
})

export const crc16x25 = new GenericCrc16({
  name: 'crc16x25',
  poly: 0x1021,
  initial: 0xFFFF,
  xorout: 0xFFFF,
  refin: true,
  refout: true,
})

export const crc16xmodem = new GenericCrc16({
  name: 'crc16xmodem',
  poly: 0x1021,
  initial: 0x0000,
  xorout: 0x0000,
  refin: false,
  refout: false,
})
