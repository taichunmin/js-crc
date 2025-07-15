<div align="center">

<h1>@taichunmin/crc</h1>

<p>A cross platform alternative for calculating Cyclic Redundancy Checks (CRC) values.</p>

<p>
<a href="https://taichunmin.idv.tw/pug/crccalc.html"><b>Demo</b></a>
</p>

[![npm version](https://img.shields.io/npm/v/@taichunmin/crc.svg?logo=npm)](https://www.npmjs.org/package/@taichunmin/crc)
[![jsdelivr hits](https://img.shields.io/jsdelivr/npm/hm/@taichunmin/crc?logo=jsdelivr)](https://www.jsdelivr.com/package/npm/@taichunmin/crc)
[![Build status](https://img.shields.io/github/actions/workflow/status/taichunmin/js-crc/ci.yml?branch=master)](https://github.com/taichunmin/js-crc/actions/workflows/ci.yml)
[![Coverage Status](https://img.shields.io/coverallsCoverage/github/taichunmin/js-crc?branch=master)](https://coveralls.io/github/taichunmin/js-crc?branch=master)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=@taichunmin%2Fcrc&query=$.install.pretty&label=install%20size)](https://packagephobia.now.sh/result?p=@taichunmin%2Fcrc)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@taichunmin/crc)](https://bundlephobia.com/package/@taichunmin/crc@latest)
[![npm downloads](https://img.shields.io/npm/dm/@taichunmin/crc.svg)](https://npm-stat.com/charts.html?package=@taichunmin%2Fcrc)
[![GitHub contributors](https://img.shields.io/github/contributors/taichunmin/js-crc)](https://github.com/taichunmin/js-crc/graphs/contributors)
[![Known vulnerabilities](https://snyk.io/test/npm/@taichunmin/crc/badge.svg)](https://snyk.io/test/npm/@taichunmin/crc)
[![MIT License](https://img.shields.io/github/license/taichunmin/js-crc)](https://github.com/taichunmin/js-crc/blob/master/LICENSE)

</div>

## Features

- Written in TypeScript and provides `d.ts` and `d.mts` files.
- Supports ESM, CommonJS and iife format.
- Pure JavaScript implementation, no dependencies.
- Supported CRC algorithms:
  - crc8
    - crc8: CRC8, CRC8/SMBUS
    - crc8autosar: CRC8/8H2F, CRC8/AUTOSAR
    - crc8bluetooth: CRC8/BLUETOOTH
    - crc8cardx: CRC8/CARDX
    - crc8cdma2000: CRC8/CDMA2000
    - crc8darc: CRC8/DARC
    - crc8dvbs2: CRC8/DVB-S2
    - crc8ebu: CRC8/AES, CRC8/EBU, CRC8/TECH-3250
    - crc8gsma: CRC8/GSM-A
    - crc8gsmb: CRC8/GSM-B
    - crc8hitag: CRC8/HITAG
    - crc8icode: CRC8/I-CODE
    - crc8itu: CRC8/ITU, CRC8/I-432-1
    - crc8legic: CRC8/LEGIC
    - crc8mad: CRC8/MAD, CRC8/MIFARE-MAD
    - crc8maxim: CRC8/DOW-CRC, CRC8/MAXIM, CRC8/MAXIM-DOW
    - crc8nrsc5: CRC8/NRSC-5
    - crc8opensafety: CRC8/OPENSAFETY
    - crc8rohc: CRC8/ROHC
    - crc8saej1850: CRC8/SAE-J1850
    - crc8wcdma: CRC8/WCDMA, CRC8/LTE
  - crc16
    - crc16a: CRC16/A
    - crc16arc: CRC16, CRC16/ARC, CRC16/IBM, CRC16/LHA
    - crc16augccitt: CRC16/AUG-CCITT, CRC16/SPI-FUJITSU
    - crc16buypass: CRC16/BUYPASS, CRC16/UMTS, CRC16/VERIFONE
    - crc16ccittfalse: CRC16/AUTOSAR, CRC16/CCITT-FALSE, CRC16/IBM-3740
    - crc16cdma2000: CRC16/CDMA2000
    - crc16cms: CRC16/CMS
    - crc16dds110: CRC16/DDS-110
    - crc16dectr: CRC16/DECT-R, CRC16/R-CRC-16
    - crc16dectx: CRC16/DECT-X, CRC16/X-CRC-16
    - crc16dnp: CRC16/DNP
    - crc16en13757: CRC16/EN-13757
    - crc16genibus: CRC16/DARC, CRC16/EPC, CRC16/EPC-C1G2, CRC16/GENIBUS, CRC16/I-CODE
    - crc16gsm: CRC16/GSM
    - crc16iclass: CRC16/ICLASS
    - crc16kermit: CRC16/BLUETOOTH, CRC16/CCITT, CRC16/CCITT-TRUE, CRC16/CCITT-TRUE, CRC16/KERMIT, CRC16/V-41-LSB, CRC16/V-41-LSB
    - crc16lj1200: CRC16/LJ1200
    - crc16m17: CRC16/M17
    - crc16maxim: CRC16/MAXIM, CRC16/MAXIM-DOW
    - crc16mcrf4xx: CRC16/MCRF4XX
    - crc16modbus: CRC16/MODBUS
    - crc16nrsc5: CRC16/NRSC-5
    - crc16opensafetya: CRC16/OPENSAFETY-A
    - crc16opensafetyb: CRC16/OPENSAFETY-B
    - crc16philips: CRC16/PHILIPS
    - crc16profibus: CRC16/PROFIBUS
    - crc16riello: CRC16/RIELLO
    - crc16t10dif: CRC16/T10_DIF
    - crc16teledisk: CRC16/TELEDISK
    - crc16tms37157: CRC16/TMS37157
    - crc16usb: CRC16/USB
    - crc16x25: CRC16/B, CRC16/IBM-SDLC, CRC16/ISO-HDLC, CRC16/ISO-IEC-14443-3-B, CRC16/X-25
    - crc16xmodem: CRC16/ACORN, CRC16/LTE, CRC16/V-41-MSB, CRC16/XMODEM, CRC16/ZMODEM
  - crc32
    - crc32: CRC32, CRC32/ADCCP, CRC32/PKZIP, CRC32/V-42, CRC32/XZ
    - crc32autosar: CRC32/AUTOSAR
    - crc32bzip2: CRC32/AAL5, CRC32/BZIP2, CRC32/DECT-B
    - crc32c: CRC32/BASE91-C, CRC32/C, CRC32/CASTAGNOLI, CRC32/INTERLAKEN
    - crc32cdromedc: CRC32/CD-ROM-EDC
    - crc32d: CRC32/D, CRC32/BASE91-D
    - crc32jamcrc: CRC32/JAMCRC
    - crc32mef: CRC32/MEF
    - crc32mpeg2: CRC32/MPEG2
    - crc32posix: CRC32/CKSUM, CRC32/POSIX
    - crc32q: CRC32/AIXM, CRC32/Q
    - crc32sata: CRC32/SATA
    - crc32xfer: CRC32/XFER

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
  import crc8 from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/crc8/+esm'
  import crc16a from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/crc16a/+esm'
  import crc32 from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/crc32/+esm'
</script>

<!-- module + async import (can be used in DevTools) -->
<script type="module">
  const { default: crc8 } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/crc8/+esm')
  const { default: crc16a } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/crc16a/+esm')
  const { default: crc32 } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/crc32/+esm')
</script>
```

## Usage

### Node.js

Using specific CRC is the recommended way to reduce bundle size:

```js
import crc32 from '@taichunmin/crc/crc32'
console.log(crc32(new Uint8Array([0x68, 0x65, 0x6C, 0x6C, 0x6F])).toString(16))
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
  console.log(crc32(new Uint8Array([0x68, 0x65, 0x6C, 0x6C, 0x6F])).toString(16))
  // "3610a686"
</script>

<!-- module -->
<script type="module">
  import crc32 from 'https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/crc32/+esm'
  console.log(crc32(new Uint8Array([0x68, 0x65, 0x6C, 0x6C, 0x6F])).toString(16))
  // "3610a686"
</script>

<!-- module + import (can be used in DevTools) -->
<script type="module">
  const { default: crc32 } = await import('https://cdn.jsdelivr.net/npm/@taichunmin/crc@0/crc32/+esm')
  console.log(crc32(new Uint8Array([0x68, 0x65, 0x6C, 0x6C, 0x6F])).toString(16))
  // "3610a686"
</script>
```

## References

- <https://crccalc.com/>
- <http://www.sunshine2k.de/coding/javascript/crc/crc_js.html> [(Backup)](https://gist.github.com/taichunmin/92fa001f139e5a73f5127d9389123d78)
- <https://reveng.sourceforge.io/crc-catalogue/>
- <https://pypi.org/project/crccheck/>
- <https://github.com/Fabio286/easy-crc>
- <https://github.com/mrhooray/crc-rs>
- <https://github.com/alexgorbatchev/crc>
- <https://github.com/overcat/fastcrc>
- <https://github.com/taichunmin/proxmark3.js/blob/master/src/crc16.js>
- <https://github.com/ratriches/crc/blob/main/src/crcCalc.js>
- <https://blog.csdn.net/lianyunyouyou/article/details/107217125>