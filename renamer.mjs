import _ from 'lodash'

const subfolderMap = {
  'd.mts': 'd-mts/',
  'd.ts': 'd-ts/',
  'global.js': 'global-js/',
  js: 'js/',
  mjs: 'mjs/',
}

export default class Renamer {
  replace (filePath) {
    const matched = /([^/]*?)[.](d.mts|d.ts|global.js|mjs|js)$/.exec(filePath)
    if (_.isNil(matched)) return filePath
    // console.log(`matched: ${JSON.stringify(matched)}`)
    return [
      filePath.slice(0, -matched[0].length),
      subfolderMap[matched[2]] ?? '',
      filePath.slice(-matched[0].length),
    ].join('')
  }
}
