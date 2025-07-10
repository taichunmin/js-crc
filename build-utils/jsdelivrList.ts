import fg from 'fast-glob'
import _ from 'lodash'
import fsPromises from 'node:fs/promises'
import path from 'node:path'

const rootdir = path.resolve(__dirname, '../')
interface PkgExportVal {
  import?: string
  script?: string
}

interface Pkg {
  name: string
  version: string
  exports: Record<string, PkgExportVal>
}

async function main (): Promise<void> {
  try {
    const pkg: Pkg = JSON.parse(await fsPromises.readFile(path.resolve(__dirname, '../package.json'), 'utf-8'))
    const majorVer = pkg.version.split('.')[0]
    const lines = []
    for (const filePath of await fg(['dist/*.mjs', 'dist/*.global.js'], { cwd: rootdir })) {
      const matched = /([^/]*?)[.](d.mts|d.ts|global.js|mjs|js)$/.exec(filePath)
      if (_.isNil(matched)) continue
      // console.log(`filePath: ${filePath}, matched: ${JSON.stringify(matched)}`)
      lines.push(
        ...(matched[2] === 'global.js' ? [
          `https://cdn.jsdelivr.net/npm/${pkg.name}@${majorVer}/${filePath}`,
          `https://cdn.jsdelivr.net/npm/${pkg.name}/${filePath}`,
          `https://cdn.jsdelivr.net/npm/${pkg.name}@${majorVer}/${matched[1]}`,
          `https://cdn.jsdelivr.net/npm/${pkg.name}/${matched[1]}`,
        ] : []),
        ...(matched[2] === 'mjs' ? [
          `https://cdn.jsdelivr.net/npm/${pkg.name}@${majorVer}/${filePath}/+esm`,
          `https://cdn.jsdelivr.net/npm/${pkg.name}/${filePath}/+esm`,
          `https://cdn.jsdelivr.net/npm/${pkg.name}@${majorVer}/${matched[1]}/+esm`,
          `https://cdn.jsdelivr.net/npm/${pkg.name}/${matched[1]}/+esm`,
        ] : []),
      )
    }
    console.log(lines.join('\n'))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main().catch(() => {})
