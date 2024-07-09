import fg from 'fast-glob'
import fsPromises from 'node:fs/promises'

async function main (): Promise<void> {
  try {
    // .cjs
    for (const jsfile of await fg(['dist/**.js'])) {
      let code = await fsPromises.readFile(jsfile, 'utf-8')
      const matches = [...code.matchAll(/exports[.]/g)]
      if (matches.length !== 1) continue
      // console.log(`jsfile = ${jsfile}`)

      code = code.replace('Object.defineProperty(exports, "__esModule", {value: true});', '') // __esModule
      code = code.replace('exports.default', 'module.exports') // exports.default
      await fsPromises.writeFile(jsfile, code, 'utf8')
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
