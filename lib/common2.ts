export function isObject (value: any): value is object {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

export function setObject<T extends object> (parent: T, path: [string, ...string[]], value: any): T {
  if (!isObject(parent) || !Array.isArray(path) || path.length < 1) return parent
  let cur: Record<string, any> = parent
  for (const key of path.slice(0, -1)) {
    if (!isObject(cur[key])) cur[key] = {}
    cur = cur[key]
  }
  cur[path.at(-1) as string] = value
  return parent
}

export const u8 = new Uint8Array(1)
export const u16 = new Uint16Array(1)
export const u32 = new Uint32Array(1)
