import { typeOf } from '../util'

export function isObject(val) {
  return typeOf(val) === 'object'
}

export function isFunction(val) {
  return typeOf(val) === 'function'
}
