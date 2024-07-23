import { setObject, u8 } from './common2'

const POLY_TABLE = new Uint8Array([
  0x00, 0x49, 0x92, 0xDB, 0x6D, 0x24, 0xFF, 0xB6,
  0xDA, 0x93, 0x48, 0x01, 0xB7, 0xFE, 0x25, 0x6C,
  0xFD, 0xB4, 0x6F, 0x26, 0x90, 0xD9, 0x02, 0x4B,
  0x27, 0x6E, 0xB5, 0xFC, 0x4A, 0x03, 0xD8, 0x91,
  0xB3, 0xFA, 0x21, 0x68, 0xDE, 0x97, 0x4C, 0x05,
  0x69, 0x20, 0xFB, 0xB2, 0x04, 0x4D, 0x96, 0xDF,
  0x4E, 0x07, 0xDC, 0x95, 0x23, 0x6A, 0xB1, 0xF8,
  0x94, 0xDD, 0x06, 0x4F, 0xF9, 0xB0, 0x6B, 0x22,
  0x2F, 0x66, 0xBD, 0xF4, 0x42, 0x0B, 0xD0, 0x99,
  0xF5, 0xBC, 0x67, 0x2E, 0x98, 0xD1, 0x0A, 0x43,
  0xD2, 0x9B, 0x40, 0x09, 0xBF, 0xF6, 0x2D, 0x64,
  0x08, 0x41, 0x9A, 0xD3, 0x65, 0x2C, 0xF7, 0xBE,
  0x9C, 0xD5, 0x0E, 0x47, 0xF1, 0xB8, 0x63, 0x2A,
  0x46, 0x0F, 0xD4, 0x9D, 0x2B, 0x62, 0xB9, 0xF0,
  0x61, 0x28, 0xF3, 0xBA, 0x0C, 0x45, 0x9E, 0xD7,
  0xBB, 0xF2, 0x29, 0x60, 0xD6, 0x9F, 0x44, 0x0D,
  0x5E, 0x17, 0xCC, 0x85, 0x33, 0x7A, 0xA1, 0xE8,
  0x84, 0xCD, 0x16, 0x5F, 0xE9, 0xA0, 0x7B, 0x32,
  0xA3, 0xEA, 0x31, 0x78, 0xCE, 0x87, 0x5C, 0x15,
  0x79, 0x30, 0xEB, 0xA2, 0x14, 0x5D, 0x86, 0xCF,
  0xED, 0xA4, 0x7F, 0x36, 0x80, 0xC9, 0x12, 0x5B,
  0x37, 0x7E, 0xA5, 0xEC, 0x5A, 0x13, 0xC8, 0x81,
  0x10, 0x59, 0x82, 0xCB, 0x7D, 0x34, 0xEF, 0xA6,
  0xCA, 0x83, 0x58, 0x11, 0xA7, 0xEE, 0x35, 0x7C,
  0x71, 0x38, 0xE3, 0xAA, 0x1C, 0x55, 0x8E, 0xC7,
  0xAB, 0xE2, 0x39, 0x70, 0xC6, 0x8F, 0x54, 0x1D,
  0x8C, 0xC5, 0x1E, 0x57, 0xE1, 0xA8, 0x73, 0x3A,
  0x56, 0x1F, 0xC4, 0x8D, 0x3B, 0x72, 0xA9, 0xE0,
  0xC2, 0x8B, 0x50, 0x19, 0xAF, 0xE6, 0x3D, 0x74,
  0x18, 0x51, 0x8A, 0xC3, 0x75, 0x3C, 0xE7, 0xAE,
  0x3F, 0x76, 0xAD, 0xE4, 0x52, 0x1B, 0xC0, 0x89,
  0xE5, 0xAC, 0x77, 0x3E, 0x88, 0xC1, 0x1A, 0x53,
])

/**
 * - poly: 0x49
 * - initial: 0x00
 * - xorout: 0xFF
 * - refin: false
 * - refout: false
 */
export default function crc8gsmb (buf: Uint8Array = new Uint8Array(), prev: number = 0xFF): number {
  u8[0] = prev ^ 0xFF
  for (const b of buf) u8[0] = POLY_TABLE[u8[0] ^ b]
  return u8[0] ^ 0xFF
}

setObject(globalThis, ['taichunmin', 'crc', 'crc8gsmb'], crc8gsmb)
