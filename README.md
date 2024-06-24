# @taichunmin/crc

A cross platform alternative for calculating Cyclic Redundancy Checks (CRC) values.

## Features

- Written in TypeScript and provides `d.ts` and `d.mts` files.
- Supports ESM, CommonJS and iife format.
- Pure JavaScript implementation, no dependencies.
- Supported CRC algorithms:
  - crc32
  - crc32bzip2
  - crc32c
  - crc32d
  - crc32jamcrc
  - crc32mpeg2
  - crc32posix
  - crc32q
  - crc32sata
  - crc32xfer

## Installation

### Package manager

Using npm or yarn to install the package:

```bash
# npm
npm install @taichunmin/crc

# yarn
yarn add @taichunmin/crc
```

Once the package is installed, you can import the library using import or require:

```js
// import
import crc32 from '@taichunmin/crc/crc32'
import crc32bzip2 from '@taichunmin/crc/crc32bzip2'
import crc32c from '@taichunmin/crc/crc32c'
import crc32d from '@taichunmin/crc/crc32d'
import crc32jamcrc from '@taichunmin/crc/crc32jamcrc'
import crc32mpeg2 from '@taichunmin/crc/crc32mpeg2'
import crc32posix from '@taichunmin/crc/crc32posix'
import crc32q from '@taichunmin/crc/crc32q'
import crc32sata from '@taichunmin/crc/crc32sata'
import crc32xfer from '@taichunmin/crc/crc32xfer'

// require
const crc32 = require('@taichunmin/crc/crc32')
const crc32bzip2 = require('@taichunmin/crc/crc32bzip2')
const crc32c = require('@taichunmin/crc/crc32c')
const crc32d = require('@taichunmin/crc/crc32d')
const crc32jamcrc = require('@taichunmin/crc/crc32jamcrc')
const crc32mpeg2 = require('@taichunmin/crc/crc32mpeg2')
const crc32posix = require('@taichunmin/crc/crc32posix')
const crc32q = require('@taichunmin/crc/crc32q')
const crc32sata = require('@taichunmin/crc/crc32sata')
const crc32xfer = require('@taichunmin/crc/crc32xfer')
```

### CDN

Using jsDelivr CDN:

```html
<!-- script -->
<script src="https://cdn.jsdelivr.net/npm/@taichunmin/crc@0"></script>
<script>
  const { crc32, crc32bzip2, crc32c, crc32d, crc32jamcrc, crc32mpeg2, crc32posix, crc32q, crc32sata, crc32xfer } = window?.taichunmin?.crc
</script>

<!-- module -->
<script type="module">
  import crc32 from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32.mjs/+esm'
  import crc32bzip2 from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32bzip2.mjs/+esm'
  import crc32c from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32c.mjs/+esm'
  import crc32d from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32d.mjs/+esm'
  import crc32jamcrc from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32jamcrc.mjs/+esm'
  import crc32mpeg2 from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32mpeg2.mjs/+esm'
  import crc32posix from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32posix.mjs/+esm'
  import crc32q from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32q.mjs/+esm'
  import crc32sata from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32sata.mjs/+esm'
  import crc32xfer from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32xfer.mjs/+esm'
</script>

<!-- module + async import -->
<script type="module">
  const { default: crc32 } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32.mjs/+esm')
  const { default: crc32bzip2 } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32bzip2.mjs/+esm')
  const { default: crc32c } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32c.mjs/+esm')
  const { default: crc32d } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32d.mjs/+esm')
  const { default: crc32jamcrc } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32jamcrc.mjs/+esm')
  const { default: crc32mpeg2 } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32mpeg2.mjs/+esm')
  const { default: crc32posix } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32posix.mjs/+esm')
  const { default: crc32q } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32q.mjs/+esm')
  const { default: crc32sata } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32sata.mjs/+esm')
  const { default: crc32xfer } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32xfer.mjs/+esm')
</script>
```

## Usage

Using specific CRC is the recommended way to reduce bundle size:

```js
import crc32 from '@taichunmin/crc/crc32'
crc32(new Uint8Array([0x68, 0x65, 0x6C, 0x6C, 0x6F])).toString(16)
// "3610a686"
```

Using TextEncoder to encode UTF-8 string to Uint8Array:

```js
import crc32 from '@taichunmin/crc/crc32'
crc32(new TextEncoder('utf-8').encode('hello')).toString(16)
// "3610a686"
```

Or using a Buffer:

```js
import crc32 from '@taichunmin/crc/crc32'
crc32(Buffer.from('hello')).toString(16)
// "3610a686"
crc32(Buffer.from('68656C6C6F', 'hex')).toString(16)
// "3610a686"
crc32(fs.readFileSync('README.md', 'utf-8')).toString(16)
```

Incrementally calculate a CRC:

```js
import crc32 from '@taichunmin/crc/crc32'

const utf8Encoder = new TextEncoder('utf-8')
let value = crc32()
for (const chunk of ['one', 'two', 'three']) value = crc32(utf8Encoder.encode(chunk), value)
value.toString(16)
// "9e1c092"
```

## References

- <https://crccalc.com/>
- <http://www.sunshine2k.de/coding/javascript/crc/crc_js.html> [Backup](https://gist.github.com/taichunmin/92fa001f139e5a73f5127d9389123d78)
- <https://github.com/mrhooray/crc-rs>
- <https://github.com/alexgorbatchev/crc>
- <https://github.com/overcat/fastcrc>
- <https://github.com/taichunmin/proxmark3.js/blob/master/src/crc16.js>