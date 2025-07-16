import fsPromises from 'fs/promises'
import _ from 'lodash'
import path from 'path'
import * as GenericCrc16 from '../lib/genericCrc16'
import * as GenericCrc32 from '../lib/genericCrc32'
import * as GenericCrc8 from '../lib/genericCrc8'

const rootdir = path.resolve(__dirname, '../')
const codeHexToU8Arr = `
function hexToU8Arr (hex: string): Uint8Array {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16)))
}\n`

;(async () => {
  const crc8Names = _.keys(GenericCrc8) as Array<keyof typeof GenericCrc8>
  const testCrc8Imports = []
  const testCrc8Tests = []

  for (const crcName of crc8Names) {
    const crc = GenericCrc8[crcName]
    if (!(crc instanceof GenericCrc8.GenericCrc8)) continue
    // .ts
    const body = crc.exportCrcFn()
    await fsPromises.writeFile(path.resolve(rootdir, `lib/${crc.name}.ts`), body)
    // .test.ts
    testCrc8Imports.push(`import ${crcName} from './${crcName}'\n`)
    testCrc8Tests.push(crc.exportTest2())
  }
  await fsPromises.writeFile(path.resolve(rootdir, 'lib/crc8.test.ts'), [
    ...testCrc8Imports,
    codeHexToU8Arr,
    ...testCrc8Tests,
  ].join(''))

  const crc16Names = _.keys(GenericCrc16) as Array<keyof typeof GenericCrc16>
  const testCrc16Imports = []
  const testCrc16Tests = []

  for (const crcName of crc16Names) {
    const crc = GenericCrc16[crcName]
    if (!(crc instanceof GenericCrc16.GenericCrc16)) continue
    // .ts
    const body = crc.exportCrcFn()
    await fsPromises.writeFile(path.resolve(rootdir, `lib/${crc.name}.ts`), body)
    // .test.ts
    testCrc16Imports.push(`import ${crcName} from './${crcName}'\n`)
    testCrc16Tests.push(crc.exportTest2())
  }
  await fsPromises.writeFile(path.resolve(rootdir, 'lib/crc16.test.ts'), [
    ...testCrc16Imports,
    codeHexToU8Arr,
    ...testCrc16Tests,
  ].join(''))

  const crc32Names = _.keys(GenericCrc32) as Array<keyof typeof GenericCrc32>
  const testCrc32Imports = []
  const testCrc32Tests = []

  for (const crcName of crc32Names) {
    const crc = GenericCrc32[crcName]
    if (!(crc instanceof GenericCrc32.GenericCrc32)) continue
    // .ts
    const body = crc.exportCrcFn()
    await fsPromises.writeFile(path.resolve(rootdir, `lib/${crc.name}.ts`), body)
    // .test.ts
    testCrc32Imports.push(`import ${crcName} from './${crcName}'\n`)
    testCrc32Tests.push(crc.exportTest2())
  }
  await fsPromises.writeFile(path.resolve(rootdir, 'lib/crc32.test.ts'), [
    ...testCrc32Imports,
    codeHexToU8Arr,
    ...testCrc32Tests,
  ].join(''))
})().catch(console.log)
