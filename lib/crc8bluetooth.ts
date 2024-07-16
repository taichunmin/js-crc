const u8 = new Uint8Array(1)

const POLY_TABLE = new Uint8Array([
  0x00, 0x6B, 0xD6, 0xBD, 0x67, 0x0C, 0xB1, 0xDA,
  0xCE, 0xA5, 0x18, 0x73, 0xA9, 0xC2, 0x7F, 0x14,
  0x57, 0x3C, 0x81, 0xEA, 0x30, 0x5B, 0xE6, 0x8D,
  0x99, 0xF2, 0x4F, 0x24, 0xFE, 0x95, 0x28, 0x43,
  0xAE, 0xC5, 0x78, 0x13, 0xC9, 0xA2, 0x1F, 0x74,
  0x60, 0x0B, 0xB6, 0xDD, 0x07, 0x6C, 0xD1, 0xBA,
  0xF9, 0x92, 0x2F, 0x44, 0x9E, 0xF5, 0x48, 0x23,
  0x37, 0x5C, 0xE1, 0x8A, 0x50, 0x3B, 0x86, 0xED,
  0x97, 0xFC, 0x41, 0x2A, 0xF0, 0x9B, 0x26, 0x4D,
  0x59, 0x32, 0x8F, 0xE4, 0x3E, 0x55, 0xE8, 0x83,
  0xC0, 0xAB, 0x16, 0x7D, 0xA7, 0xCC, 0x71, 0x1A,
  0x0E, 0x65, 0xD8, 0xB3, 0x69, 0x02, 0xBF, 0xD4,
  0x39, 0x52, 0xEF, 0x84, 0x5E, 0x35, 0x88, 0xE3,
  0xF7, 0x9C, 0x21, 0x4A, 0x90, 0xFB, 0x46, 0x2D,
  0x6E, 0x05, 0xB8, 0xD3, 0x09, 0x62, 0xDF, 0xB4,
  0xA0, 0xCB, 0x76, 0x1D, 0xC7, 0xAC, 0x11, 0x7A,
  0xE5, 0x8E, 0x33, 0x58, 0x82, 0xE9, 0x54, 0x3F,
  0x2B, 0x40, 0xFD, 0x96, 0x4C, 0x27, 0x9A, 0xF1,
  0xB2, 0xD9, 0x64, 0x0F, 0xD5, 0xBE, 0x03, 0x68,
  0x7C, 0x17, 0xAA, 0xC1, 0x1B, 0x70, 0xCD, 0xA6,
  0x4B, 0x20, 0x9D, 0xF6, 0x2C, 0x47, 0xFA, 0x91,
  0x85, 0xEE, 0x53, 0x38, 0xE2, 0x89, 0x34, 0x5F,
  0x1C, 0x77, 0xCA, 0xA1, 0x7B, 0x10, 0xAD, 0xC6,
  0xD2, 0xB9, 0x04, 0x6F, 0xB5, 0xDE, 0x63, 0x08,
  0x72, 0x19, 0xA4, 0xCF, 0x15, 0x7E, 0xC3, 0xA8,
  0xBC, 0xD7, 0x6A, 0x01, 0xDB, 0xB0, 0x0D, 0x66,
  0x25, 0x4E, 0xF3, 0x98, 0x42, 0x29, 0x94, 0xFF,
  0xEB, 0x80, 0x3D, 0x56, 0x8C, 0xE7, 0x5A, 0x31,
  0xDC, 0xB7, 0x0A, 0x61, 0xBB, 0xD0, 0x6D, 0x06,
  0x12, 0x79, 0xC4, 0xAF, 0x75, 0x1E, 0xA3, 0xC8,
  0x8B, 0xE0, 0x5D, 0x36, 0xEC, 0x87, 0x3A, 0x51,
  0x45, 0x2E, 0x93, 0xF8, 0x22, 0x49, 0xF4, 0x9F,
])

/**
 * - poly: 0xA7
 * - initial: 0x00
 * - xorout: 0x00
 * - refin: true
 * - refout: true
 */
export default function crc8bluetooth (buf: Uint8Array = new Uint8Array(), prev: number = 0x00): number {
  u8[0] = prev
  for (const b of buf) u8[0] = POLY_TABLE[u8[0] ^ b]
  return u8[0]
}

// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
Object.assign(((globalThis as any || {}).taichunmin ||= {}).crc ||= {}, { crc8bluetooth })
