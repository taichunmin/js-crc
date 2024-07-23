export function isObject (value: any): value is object {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

export function setObject<T> (parent: T, path: [string, ...string[]], value: any): T {
  if (!isObject(parent) || !Array.isArray(path) || path.length < 1) return parent
  let cur: Record<string, any> = parent
  for (let i = 0; i < path.length; i++) {
    const key = path[i]
    if (i === path.length - 1) {
      cur[key] = value
      break
    }
    if (!isObject(cur[key])) cur[key] = {}
    cur = cur[key]
  }
  return parent
}

export const u8 = new Uint8Array(1)
export const u16 = new Uint16Array(1)
export const u32 = new Uint32Array(1)
