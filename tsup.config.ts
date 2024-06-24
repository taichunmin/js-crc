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
    'genericCrc32',
  ], filename => ({
    ...sharedConfig,
    splitting: true, // fix cjsInterop bug: https://github.com/egoist/tsup/issues/572
    minify: !options.watch,
    globalName: `taichunmin.crc.${filename}`,
    entry: [`lib/${filename}.ts`],
  })),
])
