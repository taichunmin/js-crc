import { i16ToHex, reflect } from './utils'

export class GenericCrc16 {
  name: string
  readonly #u16 = new Uint16Array(1)
  readonly #initial: number
  readonly #poly = new Uint16Array(256)
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
    const [u16, refin, tbl] = [this.#u16, this.#refin, this.#poly]
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

  dumpPoly (): string {
    const [u16, tbl] = [this.#u16, this.#poly]
    const lines = []
    for (let i = 0; i < 32; i++) {
      const line = []
      for (let j = 0; j < 8; j++) {
        u16[0] = tbl[i * 8 + j]
        line.push(i16ToHex(u16[0]))
      }
      lines.push(line.join(', ') + ',\n')
    }
    return lines.join('')
  }

  getCrc (buf: Uint8Array): number {
    const [u16, refin, refout, tbl, xorout] = [this.#u16, this.#refin, this.#refout, this.#poly, this.#xorout]
    if (refin) {
      u16[0] = reflect.u16(this.#initial)
      for (const b of buf) u16[0] = (u16[0] >>> 8) ^ tbl[(u16[0] ^ b) & 0xFF]
      return (refout ? u16[0] : reflect.u16(u16[0])) ^ xorout
    } else {
      u16[0] = this.#initial
      for (const b of buf) u16[0] = (u16[0] << 8) ^ tbl[(u16[0] >>> 8) ^ b]
      return (refout ? reflect.u16(u16[0]) : u16[0]) ^ xorout
    }
  }
}

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

export const crc16kermit = new GenericCrc16({
  name: 'crc16kermit',
  poly: 0x1021,
  initial: 0x0000,
  xorout: 0x0000,
  refin: true,
  refout: true,
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
