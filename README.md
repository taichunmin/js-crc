<div align="center">

<h1>@taichunmin/crc</h1>

<p>A cross platform alternative for calculating Cyclic Redundancy Checks (CRC) values.</p>

[![npm version](https://img.shields.io/npm/v/@taichunmin/crc.svg?logo=npm)](https://www.npmjs.org/package/@taichunmin/crc)
[![jsdelivr hits](https://img.shields.io/jsdelivr/npm/hm/@taichunmin/crc?logo=jsdelivr)](https://www.jsdelivr.com/package/npm/@taichunmin/crc)
[![Build status](https://img.shields.io/github/actions/workflow/status/taichunmin/js-buffer/ci.yml?branch=master)](https://github.com/taichunmin/js-buffer/actions/workflows/ci.yml)
[![Coverage Status](https://img.shields.io/coverallsCoverage/github/taichunmin/js-buffer?branch=master)](https://coveralls.io/github/taichunmin/js-buffer?branch=master)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=@taichunmin%2Fbuffer&query=$.install.pretty&label=install%20size)](https://packagephobia.now.sh/result?p=@taichunmin%2Fbuffer)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@taichunmin/crc)](https://bundlephobia.com/package/@taichunmin/crc@latest)
[![npm downloads](https://img.shields.io/npm/dm/@taichunmin/crc.svg)](https://npm-stat.com/charts.html?package=@taichunmin%2Fbuffer)
[![GitHub contributors](https://img.shields.io/github/contributors/taichunmin/js-buffer)](https://github.com/taichunmin/js-buffer/graphs/contributors)
[![Known vulnerabilities](https://snyk.io/test/npm/@taichunmin/crc/badge.svg)](https://snyk.io/test/npm/@taichunmin/crc)
[![MIT License](https://img.shields.io/github/license/taichunmin/js-buffer)](https://github.com/taichunmin/js-buffer/blob/master/LICENSE)

</div>

## Features

- Written in TypeScript and provides `d.ts` and `d.mts` files.
- Supports ESM, CommonJS and iife format.
- Pure JavaScript implementation, no dependencies.
- Supported CRC algorithms:
  - crc16a
  - crc16arc
  - crc16augccitt
  - crc16buypass
  - crc16ccittfalse
  - crc16cdma2000
  - crc16dds110
  - crc16dectr
  - crc16dectx
  - crc16dnp
  - crc16en13757
  - crc16genibus
  - crc16kermit
  - crc16maxim
  - crc16mcrf4xx
  - crc16modbus
  - crc16riello
  - crc16t10dif
  - crc16teledisk
  - crc16tms37157
  - crc16usb
  - crc16x25
  - crc16xmodem
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
import crc16a from '@taichunmin/crc/crc16a'
import crc32 from '@taichunmin/crc/crc32'

// require
const crc16a = require('@taichunmin/crc/crc16a')
const crc32 = require('@taichunmin/crc/crc32')
```

### CDN

Using jsDelivr CDN:

```html
<!-- script -->
<script src="https://cdn.jsdelivr.net/npm/@taichunmin/crc@0"></script>
<script>
  const { crc16a, crc32 } = window?.taichunmin?.crc
</script>

<!-- module -->
<script type="module">
  import crc16a from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc16a.mjs/+esm'
  import crc32 from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32.mjs/+esm'
</script>

<!-- module + async import -->
<script type="module">
  const { default: crc16a } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc16a.mjs/+esm')
  const { default: crc32 } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32.mjs/+esm')
</script>
```

## Usage

### Node.js

Using specific CRC is the recommended way to reduce bundle size:

```js
import crc32 from '@taichunmin/crc/crc32'
crc32(new Uint8Array([0x68, 0x65, 0x6C, 0x6C, 0x6F])).toString(16)
// "3610a686"
```

Using `TextEncoder` to encode UTF-8 string to `Uint8Array`:

```js
import crc32 from '@taichunmin/crc/crc32'
crc32(new TextEncoder('utf-8').encode('hello')).toString(16)
// "3610a686"
```

Or using a `Buffer`:

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

### Browser

```html
<!-- script -->
<script src="https://cdn.jsdelivr.net/npm/@taichunmin/crc@0"></script>
<script>
  const { crc32 } = window?.taichunmin?.crc
  crc32(new Uint8Array([0x68, 0x65, 0x6C, 0x6C, 0x6F])).toString(16)
  // "3610a686"
</script>

<!-- module -->
<script type="module">
  import crc32 from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32.mjs/+esm'
  crc32(new Uint8Array([0x68, 0x65, 0x6C, 0x6C, 0x6F])).toString(16)
  // "3610a686"
</script>

<!-- module + import (devtools) -->
<script type="module">
  const { default: crc32 } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32.mjs/+esm')
  crc32(new Uint8Array([0x68, 0x65, 0x6C, 0x6C, 0x6F])).toString(16)
  // "3610a686"
</script>
```

## References

- <https://crccalc.com/>
- <http://www.sunshine2k.de/coding/javascript/crc/crc_js.html> [(Backup)](https://gist.github.com/taichunmin/92fa001f139e5a73f5127d9389123d78)
- <https://github.com/mrhooray/crc-rs>
- <https://github.com/alexgorbatchev/crc>
- <https://github.com/overcat/fastcrc>
- <https://github.com/taichunmin/proxmark3.js/blob/master/src/crc16.js>