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
  - crc8
    - crc8: CRC8
    - crc8autosar: CRC8_8H2F, CRC8_AUTOSAR
    - crc8cdma2000: CRC8_CDMA2000
    - crc8darc: CRC8_DARC
    - crc8dvbs2: CRC8_DVB_S2
    - crc8ebu: CRC8_EBU
    - crc8icode: CRC8_ICODE
    - crc8itu: CRC8_ITU
    - crc8maxim: CRC8_MAXIM
    - crc8rohc: CRC8_ROHC
    - crc8saej1850: CRC8_SAE_J1850
    - crc8saej1850zero: CRC8_SAE_J1850_ZERO
    - crc8wcdma: CRC8_WCDMA
  - crc16
    - crc16a: CRC16_A
    - crc16arc: CRC16_ARC, CRC16_IBM
    - crc16augccitt: CRC16_AUG_CCITT
    - crc16buypass: CRC16_BUYPASS
    - crc16ccittfalse: CRC16_CCITT_FALSE
    - crc16cdma2000: CRC16_CDMA2000
    - crc16dds110: CRC16_DDS_110
    - crc16dectr: CRC16_DECT_R
    - crc16dectx: CRC16_DECT_X
    - crc16dnp: CRC16_DNP
    - crc16en13757: CRC16_EN_13757
    - crc16genibus: CRC16_GENIBUS
    - crc16kermit: CRC16_KERMIT, CRC-16/CCITT, CRC-16/CCITT-TRUE, CRC-16/V-41-LSB, CRC-CCITT
    - crc16maxim: CRC16_MAXIM
    - crc16mcrf4xx: CRC16_MCRF4XX
    - crc16modbus: CRC16_MODBUS
    - crc16riello: CRC16_RIELLO
    - crc16t10dif: CRC16_T10_DIF
    - crc16teledisk: CRC16_TELEDISK
    - crc16tms37157: CRC16_TMS37157
    - crc16usb: CRC16_USB
    - crc16x25: CRC16_X_25
    - crc16xmodem: CRC16_XMODEM
  - crc32
    - crc32: CRC32
    - crc32bzip2: CRC32_BZIP2
    - crc32c: CRC32_C
    - crc32d: CRC32_D
    - crc32jamcrc: CRC32_JAMCRC
    - crc32mpeg2: CRC32_MPEG2
    - crc32posix: CRC32_POSIX
    - crc32q: CRC32_Q
    - crc32sata: CRC32_SATA
    - crc32xfer: CRC32_XFER

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
import crc8 from '@taichunmin/crc/crc8'
import crc16a from '@taichunmin/crc/crc16a'
import crc32 from '@taichunmin/crc/crc32'

// require
const crc8 = require('@taichunmin/crc/crc8')
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
  import crc8 from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc8.mjs/+esm'
  import crc16a from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc16a.mjs/+esm'
  import crc32 from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32.mjs/+esm'
</script>

<!-- module + async import (can be used in DevTools) -->
<script type="module">
  const { default: crc8 } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc8.mjs/+esm')
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

<!-- module + import (can be used in DevTools) -->
<script type="module">
  const { default: crc32 } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/dist/crc32.mjs/+esm')
  crc32(new Uint8Array([0x68, 0x65, 0x6C, 0x6C, 0x6F])).toString(16)
  // "3610a686"
</script>
```

## References

- <https://crccalc.com/>
- <http://www.sunshine2k.de/coding/javascript/crc/crc_js.html> [(Backup)](https://gist.github.com/taichunmin/92fa001f139e5a73f5127d9389123d78)
- <https://github.com/Fabio286/easy-crc>
- <https://github.com/mrhooray/crc-rs>
- <https://github.com/alexgorbatchev/crc>
- <https://github.com/overcat/fastcrc>
- <https://github.com/taichunmin/proxmark3.js/blob/master/src/crc16.js>
- <https://github.com/ratriches/crc/blob/main/src/crcCalc.js>
- <https://blog.csdn.net/lianyunyouyou/article/details/107217125>