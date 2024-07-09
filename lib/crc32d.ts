const u32 = new Uint32Array(1)

const POLY_TABLE = new Uint32Array([
  0x00000000, 0x2BDDD04F, 0x57BBA09E, 0x7C6670D1, 0xAF77413C, 0x84AA9173, 0xF8CCE1A2, 0xD31131ED,
  0xF6DD1A53, 0xDD00CA1C, 0xA166BACD, 0x8ABB6A82, 0x59AA5B6F, 0x72778B20, 0x0E11FBF1, 0x25CC2BBE,
  0x4589AC8D, 0x6E547CC2, 0x12320C13, 0x39EFDC5C, 0xEAFEEDB1, 0xC1233DFE, 0xBD454D2F, 0x96989D60,
  0xB354B6DE, 0x98896691, 0xE4EF1640, 0xCF32C60F, 0x1C23F7E2, 0x37FE27AD, 0x4B98577C, 0x60458733,
  0x8B13591A, 0xA0CE8955, 0xDCA8F984, 0xF77529CB, 0x24641826, 0x0FB9C869, 0x73DFB8B8, 0x580268F7,
  0x7DCE4349, 0x56139306, 0x2A75E3D7, 0x01A83398, 0xD2B90275, 0xF964D23A, 0x8502A2EB, 0xAEDF72A4,
  0xCE9AF597, 0xE54725D8, 0x99215509, 0xB2FC8546, 0x61EDB4AB, 0x4A3064E4, 0x36561435, 0x1D8BC47A,
  0x3847EFC4, 0x139A3F8B, 0x6FFC4F5A, 0x44219F15, 0x9730AEF8, 0xBCED7EB7, 0xC08B0E66, 0xEB56DE29,
  0xBE152A1F, 0x95C8FA50, 0xE9AE8A81, 0xC2735ACE, 0x11626B23, 0x3ABFBB6C, 0x46D9CBBD, 0x6D041BF2,
  0x48C8304C, 0x6315E003, 0x1F7390D2, 0x34AE409D, 0xE7BF7170, 0xCC62A13F, 0xB004D1EE, 0x9BD901A1,
  0xFB9C8692, 0xD04156DD, 0xAC27260C, 0x87FAF643, 0x54EBC7AE, 0x7F3617E1, 0x03506730, 0x288DB77F,
  0x0D419CC1, 0x269C4C8E, 0x5AFA3C5F, 0x7127EC10, 0xA236DDFD, 0x89EB0DB2, 0xF58D7D63, 0xDE50AD2C,
  0x35067305, 0x1EDBA34A, 0x62BDD39B, 0x496003D4, 0x9A713239, 0xB1ACE276, 0xCDCA92A7, 0xE61742E8,
  0xC3DB6956, 0xE806B919, 0x9460C9C8, 0xBFBD1987, 0x6CAC286A, 0x4771F825, 0x3B1788F4, 0x10CA58BB,
  0x708FDF88, 0x5B520FC7, 0x27347F16, 0x0CE9AF59, 0xDFF89EB4, 0xF4254EFB, 0x88433E2A, 0xA39EEE65,
  0x8652C5DB, 0xAD8F1594, 0xD1E96545, 0xFA34B50A, 0x292584E7, 0x02F854A8, 0x7E9E2479, 0x5543F436,
  0xD419CC15, 0xFFC41C5A, 0x83A26C8B, 0xA87FBCC4, 0x7B6E8D29, 0x50B35D66, 0x2CD52DB7, 0x0708FDF8,
  0x22C4D646, 0x09190609, 0x757F76D8, 0x5EA2A697, 0x8DB3977A, 0xA66E4735, 0xDA0837E4, 0xF1D5E7AB,
  0x91906098, 0xBA4DB0D7, 0xC62BC006, 0xEDF61049, 0x3EE721A4, 0x153AF1EB, 0x695C813A, 0x42815175,
  0x674D7ACB, 0x4C90AA84, 0x30F6DA55, 0x1B2B0A1A, 0xC83A3BF7, 0xE3E7EBB8, 0x9F819B69, 0xB45C4B26,
  0x5F0A950F, 0x74D74540, 0x08B13591, 0x236CE5DE, 0xF07DD433, 0xDBA0047C, 0xA7C674AD, 0x8C1BA4E2,
  0xA9D78F5C, 0x820A5F13, 0xFE6C2FC2, 0xD5B1FF8D, 0x06A0CE60, 0x2D7D1E2F, 0x511B6EFE, 0x7AC6BEB1,
  0x1A833982, 0x315EE9CD, 0x4D38991C, 0x66E54953, 0xB5F478BE, 0x9E29A8F1, 0xE24FD820, 0xC992086F,
  0xEC5E23D1, 0xC783F39E, 0xBBE5834F, 0x90385300, 0x432962ED, 0x68F4B2A2, 0x1492C273, 0x3F4F123C,
  0x6A0CE60A, 0x41D13645, 0x3DB74694, 0x166A96DB, 0xC57BA736, 0xEEA67779, 0x92C007A8, 0xB91DD7E7,
  0x9CD1FC59, 0xB70C2C16, 0xCB6A5CC7, 0xE0B78C88, 0x33A6BD65, 0x187B6D2A, 0x641D1DFB, 0x4FC0CDB4,
  0x2F854A87, 0x04589AC8, 0x783EEA19, 0x53E33A56, 0x80F20BBB, 0xAB2FDBF4, 0xD749AB25, 0xFC947B6A,
  0xD95850D4, 0xF285809B, 0x8EE3F04A, 0xA53E2005, 0x762F11E8, 0x5DF2C1A7, 0x2194B176, 0x0A496139,
  0xE11FBF10, 0xCAC26F5F, 0xB6A41F8E, 0x9D79CFC1, 0x4E68FE2C, 0x65B52E63, 0x19D35EB2, 0x320E8EFD,
  0x17C2A543, 0x3C1F750C, 0x407905DD, 0x6BA4D592, 0xB8B5E47F, 0x93683430, 0xEF0E44E1, 0xC4D394AE,
  0xA496139D, 0x8F4BC3D2, 0xF32DB303, 0xD8F0634C, 0x0BE152A1, 0x203C82EE, 0x5C5AF23F, 0x77872270,
  0x524B09CE, 0x7996D981, 0x05F0A950, 0x2E2D791F, 0xFD3C48F2, 0xD6E198BD, 0xAA87E86C, 0x815A3823,
])

/**
 * - poly: 0xA833982B
 * - initial: 0xFFFFFFFF
 * - xorout: 0xFFFFFFFF
 * - refin: true
 * - refout: true
 */
export default function crc32d (buf: Uint8Array = new Uint8Array(), prev: number = 0x00000000): number {
  u32[0] = prev ^ 0xFFFFFFFF // revert of refout and xorout
  for (const b of buf) u32[0] = POLY_TABLE[(u32[0] ^ b) & 0xFF] ^ (u32[0] >>> 8)
  return (u32[0] ^ 0xFFFFFFFF) >>> 0
}
