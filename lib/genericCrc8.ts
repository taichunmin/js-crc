import { u8ToHex, reflect } from './utils'

export class GenericCrc8 {
  name: string
  readonly #u8 = new Uint8Array(1)
  readonly #initial: number
  readonly #poly = new Uint8Array(256)
  readonly #refin: boolean
  readonly #refout: boolean
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
    this.#initial = opts.initial
    this.#xorout = opts.xorout
    this.#refin = opts.refin
    this.#refout = opts.refout
    this.buildPoly(opts.poly)
  }

  buildPoly (poly: number): void {
    const [u8, refin, tbl] = [this.#u8, this.#refin, this.#poly]
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

  dumpPoly (): string {
    const [u8, tbl] = [this.#u8, this.#poly]
    const lines = []
    for (let i = 0; i < 32; i++) {
      const line = []
      for (let j = 0; j < 8; j++) {
        u8[0] = tbl[i * 8 + j]
        line.push(u8ToHex(u8[0]))
      }
      lines.push(line.join(', ') + ',\n')
    }
    return lines.join('')
  }

  getCrc (buf: Uint8Array): number {
    const [u8, refout, tbl, xorout] = [this.#u8, this.#refout, this.#poly, this.#xorout]
    u8[0] = refout ? reflect.u8(this.#initial) : this.#initial
    for (const b of buf) u8[0] = tbl[u8[0] ^ b]
    return u8[0] ^ xorout
  }
}

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

export const crc8maxim = new GenericCrc8({
  name: 'crc8maxim',
  poly: 0x31,
  initial: 0x00,
  xorout: 0x00,
  refin: true,
  refout: true,
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

export const crc8saej1850zero = new GenericCrc8({
  name: 'crc8saej1850zero',
  poly: 0x1D,
  initial: 0x00,
  xorout: 0x00,
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
