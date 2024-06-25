import _ from 'lodash'
import { defineConfig, type Options } from 'tsup'

const sharedConfig: Options = {
  cjsInterop: true,
  dts: true,
  format: ['cjs', 'esm', 'iife'],
  // keepNames: true,
  publicDir: 'public',
  // shims: true,
  sourcemap: true,
  splitting: false,
}

export default defineConfig((options): Options[] => [
  {
    ...sharedConfig,
    clean: !options.watch, // only clean once when not watching
    minify: !options.watch,
    globalName: 'taichunmin.crc',
    entry: ['lib/index.ts'],
  },
  ..._.map([
    'crc16a',
    'crc16arc',
    'crc16augccitt',
    'crc16buypass',
    'crc16ccittfalse',
    'crc16cdma2000',
    'crc16dds110',
    'crc16dectr',
    'crc16dectx',
    'crc16dnp',
    'crc16en13757',
    'crc16genibus',
    'crc16kermit',
    'crc16maxim',
    'crc16mcrf4xx',
    'crc16modbus',
    'crc16riello',
    'crc16t10dif',
    'crc16teledisk',
    'crc16tms37157',
    'crc16usb',
    'crc16x25',
    'crc16xmodem',
    'crc32',
    'crc32bzip2',
    'crc32c',
    'crc32d',
    'crc32jamcrc',
    'crc32mpeg2',
    'crc32posix',
    'crc32q',
    'crc32sata',
    'crc32xfer',
    'genericCrc16',
    'genericCrc32',
  ], filename => ({
    ...sharedConfig,
    splitting: true, // fix cjsInterop bug: https://github.com/egoist/tsup/issues/572
    minify: !options.watch,
    globalName: `taichunmin.crc.${filename}`,
    entry: [`lib/${filename}.ts`],
  })),
])