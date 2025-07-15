import { setObject } from './common2'
import { reflect, u32ToHex } from './common1'

export class GenericCrc32 {
  name: string
  readonly initial: number
  readonly poly: number
  readonly refin: boolean
  readonly refout: boolean
  readonly tbl = new Uint32Array(256)
  readonly u32 = new Uint32Array(1)
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
    const [u32, refin, tbl] = [this.u32, this.refin, this.tbl]
    for (let i = 0; i < 256; i++) {
      u32[0] = (refin ? reflect.u8(i) : i) << 24
      tbl[i] = 0
      for (let j = 0; j < 8; j++) {
        tbl[i] = (((tbl[i] ^ u32[0]) & 0x80000000) !== 0 ? poly : 0) ^ (tbl[i] << 1)
        u32[0] <<= 1
      }
      if (refin) tbl[i] = reflect.u32(tbl[i])
    }
  }

  getCrc (buf: Uint8Array): number {
    const [u32, refout, tbl, xorout] = [this.u32, this.refout, this.tbl, this.xorout]
    if (refout) {
      u32[0] = reflect.u32(this.initial)
      for (const b of buf) u32[0] = tbl[(u32[0] ^ b) & 0xFF] ^ (u32[0] >>> 8)
    } else {
      u32[0] = this.initial
      for (const b of buf) u32[0] = tbl[(u32[0] >>> 24) ^ b] ^ (u32[0] << 8)
    }
    return (u32[0] ^ xorout) >>> 0
  }

  dumpPoly (space = 0): string {
    const [u32, tbl] = [this.u32, this.tbl]
    const lines = []
    for (let i = 0; i < 32; i++) {
      const line = []
      for (let j = 0; j < 8; j++) {
        u32[0] = tbl[i * 8 + j]
        line.push(u32ToHex(u32[0]))
      }
      lines.push(''.padStart(space) + line.join(', ') + ',\n')
    }
    return lines.join('')
  }

  exportCrcFn (): string {
    const prev = u32ToHex((this.refout ? reflect.u32(this.initial) : this.initial) ^ this.xorout)
    const xorout1 = this.xorout === 0 ? '' : `\nconst xorout = ${u32ToHex(this.xorout)}`
    const xorout2 = this.xorout === 0 ? '' : ' ^ xorout // revert xorout'
    const ret = this.xorout === 0 ? 'u32[0]' : '(u32[0] ^ xorout) >>> 0'
    const loop = this.refin ? 'POLY_TABLE[(u32[0] ^ b) & 0xFF] ^ (u32[0] >>> 8)' : 'POLY_TABLE[(u32[0] >>> 24) ^ b] ^ (u32[0] << 8)'
    return `import { setObject, u32 } from './common2'

const POLY_TABLE = new Uint32Array([
  ${this.dumpPoly(2).trim()}
])

/**
 * - poly: ${u32ToHex(this.poly)}
 * - initial: ${u32ToHex(this.initial)}
 * - xorout: ${u32ToHex(this.xorout)}
 * - refin: ${this.refin}
 * - refout: ${this.refout}
 */${xorout1}
export default function ${this.name} (buf: Uint8Array = new Uint8Array(), prev: number = ${prev}): number {
  u32[0] = prev${xorout2}
  for (const b of buf) u32[0] = ${loop}
  return ${ret}
}

setObject(globalThis, ['taichunmin', 'crc', '${this.name}'], ${this.name})
`
  }

  exportTest1 (): string {
    const hexToCrc = (hex: string): string => u32ToHex(this.getCrc(Buffer.from(hex, 'hex'))).slice(2)
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
    const hexToCrc = (hex: string): string => u32ToHex(this.getCrc(Buffer.from(hex, 'hex'))).slice(2)
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

setObject(globalThis, ['taichunmin', 'crc', 'GenericCrc32'], GenericCrc32)

export const crc32 = new GenericCrc32({
  name: 'crc32',
  poly: 0x04C11DB7,
  initial: 0xFFFFFFFF,
  xorout: 0xFFFFFFFF,
  refin: true,
  refout: true,
})

export const crc32autosar = new GenericCrc32({
  name: 'crc32autosar',
  poly: 0xf4acfb13,
  initial: 0xFFFFFFFF,
  xorout: 0xFFFFFFFF,
  refin: true,
  refout: true,
})

export const crc32bzip2 = new GenericCrc32({
  name: 'crc32bzip2',
  poly: 0x04C11DB7,
  initial: 0xFFFFFFFF,
  xorout: 0xFFFFFFFF,
  refin: false,
  refout: false,
})

export const crc32c = new GenericCrc32({
  name: 'crc32c',
  poly: 0x1EDC6F41,
  initial: 0xFFFFFFFF,
  xorout: 0xFFFFFFFF,
  refin: true,
  refout: true,
})

export const crc32cdromedc = new GenericCrc32({
  name: 'crc32cdromedc',
  poly: 0x8001801B,
  initial: 0x00000000,
  xorout: 0x00000000,
  refin: true,
  refout: true,
})

export const crc32d = new GenericCrc32({
  name: 'crc32d',
  poly: 0xA833982B,
  initial: 0xFFFFFFFF,
  xorout: 0xFFFFFFFF,
  refin: true,
  refout: true,
})

export const crc32jamcrc = new GenericCrc32({
  name: 'crc32jamcrc',
  poly: 0x04C11DB7,
  initial: 0xFFFFFFFF,
  xorout: 0x00000000,
  refin: true,
  refout: true,
})

export const crc32mef = new GenericCrc32({
  name: 'crc32mef',
  poly: 0x741B8CD7,
  initial: 0xFFFFFFFF,
  xorout: 0x00000000,
  refin: true,
  refout: true,
})

export const crc32mpeg2 = new GenericCrc32({
  name: 'crc32mpeg2',
  poly: 0x04C11DB7,
  initial: 0xFFFFFFFF,
  xorout: 0x00000000,
  refin: false,
  refout: false,
})

export const crc32posix = new GenericCrc32({
  name: 'crc32posix',
  poly: 0x04C11DB7,
  initial: 0x00000000,
  xorout: 0xFFFFFFFF,
  refin: false,
  refout: false,
})

export const crc32q = new GenericCrc32({
  name: 'crc32q',
  poly: 0x814141AB,
  initial: 0x00000000,
  xorout: 0x00000000,
  refin: false,
  refout: false,
})

export const crc32sata = new GenericCrc32({
  name: 'crc32sata',
  poly: 0x04C11DB7,
  initial: 0x52325032,
  xorout: 0x00000000,
  refin: false,
  refout: false,
})

export const crc32xfer = new GenericCrc32({
  name: 'crc32xfer',
  poly: 0x000000AF,
  initial: 0x00000000,
  xorout: 0x00000000,
  refin: false,
  refout: false,
})
