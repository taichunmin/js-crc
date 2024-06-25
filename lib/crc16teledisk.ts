/**
 * CRC32 lookup table, generated by following code:
 *
 * ```js
 * // yarn tsx
 * .editor
 * ;(function () {
 *   const genericCrc16 = require('./lib/genericCrc16')
 *   console.log(genericCrc16.crc16teledisk.dumpPoly())
 * })()
 * ```
 */
const POLY_TABLE = new Uint16Array([
  0x0000, 0xA097, 0xE1B9, 0x412E, 0x63E5, 0xC372, 0x825C, 0x22CB,
  0xC7CA, 0x675D, 0x2673, 0x86E4, 0xA42F, 0x04B8, 0x4596, 0xE501,
  0x2F03, 0x8F94, 0xCEBA, 0x6E2D, 0x4CE6, 0xEC71, 0xAD5F, 0x0DC8,
  0xE8C9, 0x485E, 0x0970, 0xA9E7, 0x8B2C, 0x2BBB, 0x6A95, 0xCA02,
  0x5E06, 0xFE91, 0xBFBF, 0x1F28, 0x3DE3, 0x9D74, 0xDC5A, 0x7CCD,
  0x99CC, 0x395B, 0x7875, 0xD8E2, 0xFA29, 0x5ABE, 0x1B90, 0xBB07,
  0x7105, 0xD192, 0x90BC, 0x302B, 0x12E0, 0xB277, 0xF359, 0x53CE,
  0xB6CF, 0x1658, 0x5776, 0xF7E1, 0xD52A, 0x75BD, 0x3493, 0x9404,
  0xBC0C, 0x1C9B, 0x5DB5, 0xFD22, 0xDFE9, 0x7F7E, 0x3E50, 0x9EC7,
  0x7BC6, 0xDB51, 0x9A7F, 0x3AE8, 0x1823, 0xB8B4, 0xF99A, 0x590D,
  0x930F, 0x3398, 0x72B6, 0xD221, 0xF0EA, 0x507D, 0x1153, 0xB1C4,
  0x54C5, 0xF452, 0xB57C, 0x15EB, 0x3720, 0x97B7, 0xD699, 0x760E,
  0xE20A, 0x429D, 0x03B3, 0xA324, 0x81EF, 0x2178, 0x6056, 0xC0C1,
  0x25C0, 0x8557, 0xC479, 0x64EE, 0x4625, 0xE6B2, 0xA79C, 0x070B,
  0xCD09, 0x6D9E, 0x2CB0, 0x8C27, 0xAEEC, 0x0E7B, 0x4F55, 0xEFC2,
  0x0AC3, 0xAA54, 0xEB7A, 0x4BED, 0x6926, 0xC9B1, 0x889F, 0x2808,
  0xD88F, 0x7818, 0x3936, 0x99A1, 0xBB6A, 0x1BFD, 0x5AD3, 0xFA44,
  0x1F45, 0xBFD2, 0xFEFC, 0x5E6B, 0x7CA0, 0xDC37, 0x9D19, 0x3D8E,
  0xF78C, 0x571B, 0x1635, 0xB6A2, 0x9469, 0x34FE, 0x75D0, 0xD547,
  0x3046, 0x90D1, 0xD1FF, 0x7168, 0x53A3, 0xF334, 0xB21A, 0x128D,
  0x8689, 0x261E, 0x6730, 0xC7A7, 0xE56C, 0x45FB, 0x04D5, 0xA442,
  0x4143, 0xE1D4, 0xA0FA, 0x006D, 0x22A6, 0x8231, 0xC31F, 0x6388,
  0xA98A, 0x091D, 0x4833, 0xE8A4, 0xCA6F, 0x6AF8, 0x2BD6, 0x8B41,
  0x6E40, 0xCED7, 0x8FF9, 0x2F6E, 0x0DA5, 0xAD32, 0xEC1C, 0x4C8B,
  0x6483, 0xC414, 0x853A, 0x25AD, 0x0766, 0xA7F1, 0xE6DF, 0x4648,
  0xA349, 0x03DE, 0x42F0, 0xE267, 0xC0AC, 0x603B, 0x2115, 0x8182,
  0x4B80, 0xEB17, 0xAA39, 0x0AAE, 0x2865, 0x88F2, 0xC9DC, 0x694B,
  0x8C4A, 0x2CDD, 0x6DF3, 0xCD64, 0xEFAF, 0x4F38, 0x0E16, 0xAE81,
  0x3A85, 0x9A12, 0xDB3C, 0x7BAB, 0x5960, 0xF9F7, 0xB8D9, 0x184E,
  0xFD4F, 0x5DD8, 0x1CF6, 0xBC61, 0x9EAA, 0x3E3D, 0x7F13, 0xDF84,
  0x1586, 0xB511, 0xF43F, 0x54A8, 0x7663, 0xD6F4, 0x97DA, 0x374D,
  0xD24C, 0x72DB, 0x33F5, 0x9362, 0xB1A9, 0x113E, 0x5010, 0xF087,
])

/**
 * - poly: 0xA097
 * - initial: 0x0000
 * - xorout: 0x0000
 * - refin: false
 * - refout: false
 */
export default function crc16teledisk (buf: Uint8Array = new Uint8Array(), prev: number = 0): number {
  let crc = prev // revert of refout and xorout
  for (const u8 of buf) crc = ((crc & 0xFF) << 8) ^ POLY_TABLE[(crc >>> 8) ^ u8]
  return crc
}