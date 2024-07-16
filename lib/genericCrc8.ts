import { u8ToHex, reflect } from './utils'

export class GenericCrc8 {
  name: string
  readonly #initial: number
  readonly #poly: number
  readonly #refin: boolean
  readonly #refout: boolean
  readonly #tbl = new Uint8Array(256)
  readonly #u8 = new Uint8Array(1)
  readonly #xorout: number

  constructor (opts: {
    name: string
    poly: number
    initial: number
    xorout: number
    refin: boolean
    refout: boolean
  }) {
    this.name = opts.name
    this.#poly = opts.poly
    this.#initial = opts.initial
    this.#xorout = opts.xorout
    this.#refin = opts.refin
    this.#refout = opts.refout
    this.buildPoly(opts.poly)
  }

  buildPoly (poly: number): void {
    const [u8, refin, tbl] = [this.#u8, this.#refin, this.#tbl]
    for (let i = 0; i < 256; i++) {
      u8[0] = refin ? reflect.u8(i) : i
      tbl[i] = 0
      for (let j = 0; j < 8; j++) {
        tbl[i] = (((tbl[i] ^ u8[0]) & 0x80) !== 0 ? poly : 0) ^ (tbl[i] << 1)
        u8[0] <<= 1
      }
      if (refin) tbl[i] = reflect.u8(tbl[i])
    }
  }

  getCrc (buf: Uint8Array): number {
    const [u8, refout, tbl, xorout] = [this.#u8, this.#refout, this.#tbl, this.#xorout]
    u8[0] = refout ? reflect.u8(this.#initial) : this.#initial
    for (const b of buf) u8[0] = tbl[u8[0] ^ b]
    return u8[0] ^ xorout
  }

  dumpPoly (space = 0): string {
    const [u8, tbl] = [this.#u8, this.#tbl]
    const lines = []
    for (let i = 0; i < 32; i++) {
      const line = []
      for (let j = 0; j < 8; j++) {
        u8[0] = tbl[i * 8 + j]
        line.push(u8ToHex(u8[0]))
      }
      lines.push(''.padStart(space) + line.join(', ') + ',\n')
    }
    return lines.join('')
  }

  exportCrcFn (): string {
    const prev = u8ToHex((this.#refout ? reflect.u8(this.#initial) : this.#initial) ^ this.#xorout)
    const xorout = this.#xorout === 0 ? '' : ` ^ ${u8ToHex(this.#xorout)}`
    return `const u8 = new Uint8Array(1)

const POLY_TABLE = new Uint8Array([
  ${this.dumpPoly(2).trim()}
])

/**
 * - poly: ${u8ToHex(this.#poly)}
 * - initial: ${u8ToHex(this.#initial)}
 * - xorout: ${u8ToHex(this.#xorout)}
 * - refin: ${this.#refin}
 * - refout: ${this.#refout}
 */
export default function ${this.name} (buf: Uint8Array = new Uint8Array(), prev: number = ${prev}): number {
  u8[0] = prev${xorout}
  for (const b of buf) u8[0] = POLY_TABLE[u8[0] ^ b]
  return u8[0]${xorout}
}

// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
Object.assign(((globalThis as any || {}).taichunmin ||= {}).crc ||= {}, { ${this.name} })
`
  }

  exportTest1 (): string {
    const hexToCrc = (hex: string): string => u8ToHex(this.getCrc(Buffer.from(hex, 'hex'))).slice(2)
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
    const hexToCrc = (hex: string): string => u8ToHex(this.getCrc(Buffer.from(hex, 'hex'))).slice(2)
    return `
describe('${this.name}', () => {
  test.each([
    { crc: '${hexToCrc('')}', hex: '' },
    { crc: '${hexToCrc('31')}', hex: '31' },
    { crc: '${hexToCrc('48656C6C6F20576F726C6421')}', hex: '48656C6C6F20576F726C6421' },
    { crc: '${hexToCrc('313233343536373839')}', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hex === '' ? undefined : hexToU8Arr(hex)
    expect(${this.name}(u8arr)).toBe(parseInt(crc, 16))
  })

  test.each([
    { crc: '${hexToCrc('48656C6C6F20576F726C6421')}', hex: '48656C6C6F20576F726C6421' },
    { crc: '${hexToCrc('313233343536373839')}', hex: '313233343536373839' },
  ])('#getCrc(Buffer.from("$hex", "hex")) = 0x$crc', ({ hex, crc }) => {
    const u8arr = hexToU8Arr(hex)
    const prev = ${this.name}(u8arr.subarray(0, 1))
    expect(${this.name}(u8arr.subarray(1), prev)).toBe(parseInt(crc, 16))
  })
})
`
  }
}

// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
Object.assign(((globalThis as any || {}).taichunmin ||= {}).crc ||= {}, { GenericCrc8 })

export const crc8 = new GenericCrc8({
  name: 'crc8',
  poly: 0x07,
  initial: 0x00,
  xorout: 0x00,
  refin: false,
  refout: false,
})

export const crc8autosar = new GenericCrc8({
  name: 'crc8autosar',
  poly: 0x2F,
  initial: 0xFF,
  xorout: 0xFF,
  refin: false,
  refout: false,
})

export const crc8bluetooth = new GenericCrc8({
  name: 'crc8bluetooth',
  poly: 0xA7,
  initial: 0x00,
  xorout: 0x00,
  refin: true,
  refout: true,
})

export const crc8cardx = new GenericCrc8({
  name: 'crc8cardx',
  poly: 0x07,
  initial: 0x2C,
  xorout: 0x00,
  refin: false,
  refout: false,
})

export const crc8cdma2000 = new GenericCrc8({
  name: 'crc8cdma2000',
  poly: 0x9B,
  initial: 0xFF,
  xorout: 0x00,
  refin: false,
  refout: false,
})

export const crc8darc = new GenericCrc8({
  name: 'crc8darc',
  poly: 0x39,
  initial: 0x00,
  xorout: 0x00,
  refin: true,
  refout: true,
})

export const crc8dvbs2 = new GenericCrc8({
  name: 'crc8dvbs2',
  poly: 0xD5,
  initial: 0x00,
  xorout: 0x00,
  refin: false,
  refout: false,
})

export const crc8ebu = new GenericCrc8({
  name: 'crc8ebu',
  poly: 0x1D,
  initial: 0xFF,
  xorout: 0x00,
  refin: true,
  refout: true,
})

export const crc8gsma = new GenericCrc8({
  name: 'crc8gsma',
  poly: 0x1D,
  initial: 0x00,
  xorout: 0x00,
  refin: false,
  refout: false,
})

export const crc8gsmb = new GenericCrc8({
  name: 'crc8gsmb',
  poly: 0x49,
  initial: 0x00,
  xorout: 0xFF,
  refin: false,
  refout: false,
})

export const crc8hitag = new GenericCrc8({
  name: 'crc8hitag',
  poly: 0x1D,
  initial: 0xFF,
  xorout: 0x00,
  refin: false,
  refout: false,
})

export const crc8icode = new GenericCrc8({
  name: 'crc8icode',
  poly: 0x1D,
  initial: 0xFD,
  xorout: 0x00,
  refin: false,
  refout: false,
})

export const crc8itu = new GenericCrc8({
  name: 'crc8itu',
  poly: 0x07,
  initial: 0x00,
  xorout: 0x55,
  refin: false,
  refout: false,
})

export const crc8legic = new GenericCrc8({
  name: 'crc8legic',
  poly: 0x63,
  initial: 0x55,
  xorout: 0x00,
  refin: true,
  refout: true,
})

export const crc8mad = new GenericCrc8({
  name: 'crc8mad',
  poly: 0x1D,
  initial: 0xC7,
  xorout: 0x00,
  refin: false,
  refout: false,
})

export const crc8maxim = new GenericCrc8({
  name: 'crc8maxim',
  poly: 0x31,
  initial: 0x00,
  xorout: 0x00,
  refin: true,
  refout: true,
})

export const crc8nrsc5 = new GenericCrc8({
  name: 'crc8nrsc5',
  poly: 0x31,
  initial: 0xFF,
  xorout: 0x00,
  refin: false,
  refout: false,
})

export const crc8opensafety = new GenericCrc8({
  name: 'crc8opensafety',
  poly: 0x2F,
  initial: 0x00,
  xorout: 0x00,
  refin: false,
  refout: false,
})

export const crc8rohc = new GenericCrc8({
  name: 'crc8rohc',
  poly: 0x07,
  initial: 0xFF,
  xorout: 0x00,
  refin: true,
  refout: true,
})

export const crc8saej1850 = new GenericCrc8({
  name: 'crc8saej1850',
  poly: 0x1D,
  initial: 0xFF,
  xorout: 0xFF,
  refin: false,
  refout: false,
})

export const crc8wcdma = new GenericCrc8({
  name: 'crc8wcdma',
  poly: 0x9B,
  initial: 0x00,
  xorout: 0x00,
  refin: true,
  refout: true,
})
