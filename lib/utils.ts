class Reflect {
  readonly #tbl = new Uint8Array(256)

  constructor () {
    const tbl = this.#tbl
    for (let i = 0; i < 256; i++) {
      let j = ((i >>> 1) & 0x55) | ((i & 0x55) << 1)
      j = ((j >>> 2) & 0x33) | ((j & 0x33) << 2)
      tbl[i] = ((j >>> 4) & 0x0F) | ((j & 0x0F) << 4)
    }
  }

  u8 (u8: number): number {
    return this.#tbl[u8 & 0xFF]
  }

  u16 (u16: number): number {
    return this.u8(u16) << 8 | this.u8(u16 >>> 8)
  }

  i32 (i32: number): number {
    return this.u16(i32) << 16 | this.u16(i32 >>> 16)
  }
}

export const reflect = new Reflect()

export function i32ToHex (i32: number): string {
  return '0x' + `0000000${(i32 >>> 0).toString(16).toUpperCase()}`.slice(-8)
}

export function i16ToHex (i16: number): string {
  return '0x' + `000${(i16 & 0xFFFF).toString(16).toUpperCase()}`.slice(-4)
}
