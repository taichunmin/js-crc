import { u32ToHex, reflect } from './utils'

export class GenericCrc32 {
  name: string
  readonly #u32 = new Uint32Array(1)
  readonly #initial: number
  readonly #poly = new Uint32Array(256)
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
    const [u32, refin, tbl] = [this.#u32, this.#refin, this.#poly]
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

  dumpPoly (): string {
    const [u32, tbl] = [this.#u32, this.#poly]
    const lines = []
    for (let i = 0; i < 32; i++) {
      const line = []
      for (let j = 0; j < 8; j++) {
        u32[0] = tbl[i * 8 + j]
        line.push(u32ToHex(u32[0]))
      }
      lines.push(line.join(', ') + ',\n')
    }
    return lines.join('')
  }

  getCrc (buf: Uint8Array): number {
    const [u32, refout, tbl, xorout] = [this.#u32, this.#refout, this.#poly, this.#xorout]
    if (refout) {
      u32[0] = reflect.u32(this.#initial)
      for (const b of buf) u32[0] = tbl[(u32[0] ^ b) & 0xFF] ^ (u32[0] >>> 8)
    } else {
      u32[0] = this.#initial
      for (const b of buf) u32[0] = tbl[(u32[0] >>> 24) ^ b] ^ (u32[0] << 8)
    }
    return (u32[0] ^ xorout) >>> 0
  }
}

export const crc32 = new GenericCrc32({
  name: 'crc32',
  poly: 0x04C11DB7,
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
