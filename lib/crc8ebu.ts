const u8 = new Uint8Array(1)

const POLY_TABLE = new Uint8Array([
  0x00, 0x64, 0xC8, 0xAC, 0xE1, 0x85, 0x29, 0x4D,
  0xB3, 0xD7, 0x7B, 0x1F, 0x52, 0x36, 0x9A, 0xFE,
  0x17, 0x73, 0xDF, 0xBB, 0xF6, 0x92, 0x3E, 0x5A,
  0xA4, 0xC0, 0x6C, 0x08, 0x45, 0x21, 0x8D, 0xE9,
  0x2E, 0x4A, 0xE6, 0x82, 0xCF, 0xAB, 0x07, 0x63,
  0x9D, 0xF9, 0x55, 0x31, 0x7C, 0x18, 0xB4, 0xD0,
  0x39, 0x5D, 0xF1, 0x95, 0xD8, 0xBC, 0x10, 0x74,
  0x8A, 0xEE, 0x42, 0x26, 0x6B, 0x0F, 0xA3, 0xC7,
  0x5C, 0x38, 0x94, 0xF0, 0xBD, 0xD9, 0x75, 0x11,
  0xEF, 0x8B, 0x27, 0x43, 0x0E, 0x6A, 0xC6, 0xA2,
  0x4B, 0x2F, 0x83, 0xE7, 0xAA, 0xCE, 0x62, 0x06,
  0xF8, 0x9C, 0x30, 0x54, 0x19, 0x7D, 0xD1, 0xB5,
  0x72, 0x16, 0xBA, 0xDE, 0x93, 0xF7, 0x5B, 0x3F,
  0xC1, 0xA5, 0x09, 0x6D, 0x20, 0x44, 0xE8, 0x8C,
  0x65, 0x01, 0xAD, 0xC9, 0x84, 0xE0, 0x4C, 0x28,
  0xD6, 0xB2, 0x1E, 0x7A, 0x37, 0x53, 0xFF, 0x9B,
  0xB8, 0xDC, 0x70, 0x14, 0x59, 0x3D, 0x91, 0xF5,
  0x0B, 0x6F, 0xC3, 0xA7, 0xEA, 0x8E, 0x22, 0x46,
  0xAF, 0xCB, 0x67, 0x03, 0x4E, 0x2A, 0x86, 0xE2,
  0x1C, 0x78, 0xD4, 0xB0, 0xFD, 0x99, 0x35, 0x51,
  0x96, 0xF2, 0x5E, 0x3A, 0x77, 0x13, 0xBF, 0xDB,
  0x25, 0x41, 0xED, 0x89, 0xC4, 0xA0, 0x0C, 0x68,
  0x81, 0xE5, 0x49, 0x2D, 0x60, 0x04, 0xA8, 0xCC,
  0x32, 0x56, 0xFA, 0x9E, 0xD3, 0xB7, 0x1B, 0x7F,
  0xE4, 0x80, 0x2C, 0x48, 0x05, 0x61, 0xCD, 0xA9,
  0x57, 0x33, 0x9F, 0xFB, 0xB6, 0xD2, 0x7E, 0x1A,
  0xF3, 0x97, 0x3B, 0x5F, 0x12, 0x76, 0xDA, 0xBE,
  0x40, 0x24, 0x88, 0xEC, 0xA1, 0xC5, 0x69, 0x0D,
  0xCA, 0xAE, 0x02, 0x66, 0x2B, 0x4F, 0xE3, 0x87,
  0x79, 0x1D, 0xB1, 0xD5, 0x98, 0xFC, 0x50, 0x34,
  0xDD, 0xB9, 0x15, 0x71, 0x3C, 0x58, 0xF4, 0x90,
  0x6E, 0x0A, 0xA6, 0xC2, 0x8F, 0xEB, 0x47, 0x23,
])

/**
 * - poly: 0x1D
 * - initial: 0xFF
 * - xorout: 0x00
 * - refin: true
 * - refout: true
 */
export default function crc8ebu (buf: Uint8Array = new Uint8Array(), prev: number = 0xFF): number {
  u8[0] = prev
  for (const b of buf) u8[0] = POLY_TABLE[u8[0] ^ b]
  return u8[0]
}

// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
;(((globalThis as any || {}).taichunmin ||= {}).crc ||= {}).crc8ebu = crc8ebu
