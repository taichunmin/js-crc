import fg from 'fast-glob'
import fsPromises from 'node:fs/promises'
import path from 'path'

const rootdir = path.resolve(__dirname, '../')

async function main (): Promise<void> {
  try {
    const changed = { cjs: 0, mjs: 0, dts: 0, index: 0 }
    // .cjs
    for (const file of await fg(['dist/*.js'], { cwd: rootdir })) {
      if (file.startsWith('dist/index') || file.startsWith('dist/genericCrc') || file.endsWith('global.js')) continue
      let code = await fsPromises.readFile(file, 'utf-8')
      if (!code.includes('globalThis,["taichunmin","crc"')) continue
      // console.log(`file = ${file}`)

      const origCode = code
      code = code.replace(/"use strict";.*?module.exports=[^;]+;/, '"use strict";')
      code = code.replace(/function .*?return [\w$]+}/, '')
      code = code.replace(/[\w$]+\(globalThis,\["taichunmin","crc","\w+"\],([\w$]+)\);/, 'module.exports=$1;')
      if (origCode === code) continue
      await fsPromises.writeFile(file, code, 'utf8')
      changed.cjs++
    }

    // .mjs
    for (const file of await fg(['dist/*.mjs'], { cwd: rootdir })) {
      if (file.startsWith('dist/index') || file.startsWith('dist/genericCrc')) continue
      let code = await fsPromises.readFile(file, 'utf-8')
      if (!code.includes('globalThis,["taichunmin","crc"')) continue
      // console.log(`file = ${file}`)

      const origCode = code
      code = code.replace(/function .*?return [\w$]+}/, '')
      code = code.replace(/[\w$]+\(globalThis,\["taichunmin","crc","\w+"\],([\w$]+)\);/, '')
      if (origCode === code) continue
      await fsPromises.writeFile(file, code, 'utf8')
      changed.mjs++
    }

    // .d.ts
    for (const dtsfile of await fg(['dist/**.d.ts'], { cwd: rootdir })) {
      let code = await fsPromises.readFile(dtsfile, 'utf-8')
      const matches = [...code.matchAll(/export { [\w$]+ as default };/g)]
      if (matches.length !== 1) continue
      // console.log(`dtsfile = ${dtsfile}`)

      const origCode = code
      code = code.replace(/export { ([\w$]+) as default };/, 'export = $1;')
      if (origCode === code) continue
      await fsPromises.writeFile(dtsfile, code, 'utf8')
      changed.dts++
    }

    // index.js, index.mjs
    for (const file of await fg(['dist/index.{js,mjs}'], { cwd: rootdir })) {
      let code = await fsPromises.readFile(file, 'utf-8')
      if (!code.includes('globalThis,["taichunmin","crc"')) continue
      // console.log(`file = ${file}`)

      const origCode = code
      code = code.replace(/function .*?return [\w$]+}/, '')
      code = code.replace(/[\w$]+\(globalThis,\["taichunmin","crc","\w+"\],([\w$]+)\);/g, '')
      if (origCode === code) continue
      await fsPromises.writeFile(file, code, 'utf8')
      changed.index++
    }

    console.log(`changed = ${JSON.stringify(changed)}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main().catch(() => {})
