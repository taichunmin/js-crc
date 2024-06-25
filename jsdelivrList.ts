import _ from 'lodash'
import fsPromises from 'node:fs/promises'
import path from 'node:path'

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
    const pkg: Pkg = JSON.parse(await fsPromises.readFile(path.resolve(__dirname, './package.json'), 'utf-8'))
    const majorVer = pkg.version.split('.')[0]
    const lines = []
    for (const val1 of _.values(pkg.exports)) {
      if (!_.isNil(val1.import)) {
        lines.push(
          `https://cdn.jsdelivr.net/npm/${pkg.name}@${majorVer}/${val1.import.slice(2)}/+esm`,
          `https://cdn.jsdelivr.net/npm/${pkg.name}/${val1.import.slice(2)}/+esm`,
        )
      }
      if (!_.isNil(val1.script)) {
        lines.push(
          `https://cdn.jsdelivr.net/npm/${pkg.name}@${majorVer}/${val1.script.slice(2)}`,
          `https://cdn.jsdelivr.net/npm/${pkg.name}/${val1.script.slice(2)}`,
        )
      }
    }
    console.log(lines.join('\n'))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main().catch(() => {})
