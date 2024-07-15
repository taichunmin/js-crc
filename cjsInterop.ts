import fg from 'fast-glob'
import fsPromises from 'node:fs/promises'

async function main (): Promise<void> {
  try {
    // .cjs
    for (const jsfile of await fg(['dist/**.js'])) {
      if (jsfile.endsWith('global.js')) continue
      let code = await fsPromises.readFile(jsfile, 'utf-8')
      if (!code.includes('(((globalThis||{}).taichunmin||={}).crc||={})')) continue
      // console.log(`jsfile = ${jsfile}`)

      code = code.replace(/"use strict";.*?module.exports=[^;]+;/, '"use strict";')
      code = code.replace('(((globalThis||{}).taichunmin||={}).crc||={})', 'module.exports')
      code = code.replace(/module[.]exports[.]\w+/, 'module.exports')
      await fsPromises.writeFile(jsfile, code, 'utf8')
    }

    // .mjs
    for (const mjsfile of await fg(['dist/**.mjs'])) {
      let code = await fsPromises.readFile(mjsfile, 'utf-8')
      if (!code.includes('(((globalThis||{}).taichunmin||={}).crc||={})')) continue
      // console.log(`mjsfile = ${mjsfile}`)

      code = code.replace('(((globalThis||{}).taichunmin||={}).crc||={})', 'module.exports')
      code = code.replace(/module[.]exports[.]\w+=\w+;/, '')
      await fsPromises.writeFile(mjsfile, code, 'utf8')
    }

    // .d.ts
    for (const dtsfile of await fg(['dist/**.d.ts'])) {
      let code = await fsPromises.readFile(dtsfile, 'utf-8')
      const matches = [...code.matchAll(/export { \w+ as default };/g)]
      if (matches.length !== 1) continue
      // console.log(`dtsfile = ${dtsfile}`)

      code = code.replace(/export { (\w+) as default };/, 'export = $1;')
      await fsPromises.writeFile(dtsfile, code, 'utf8')
    }
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main().catch(() => {})
