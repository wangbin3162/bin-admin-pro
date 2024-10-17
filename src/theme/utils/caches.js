import { SYSTEM_THEME } from '@/config/system.cfg'
import { Theme } from '../config/default-theme'
/**
 * 缓存读取器
 * @param {*} key
 */
export default function useCaches(key = SYSTEM_THEME) {
  function getVal() {
    let value = { ...Theme }
    let val = localStorage.getItem(key)
    if (!val) return value
    try {
      return JSON.parse(val)
    } catch (error) {
      return value
    }
  }
  function setVal(val) {
    localStorage.setItem(key, JSON.stringify(val))
  }
  return { getVal, setVal }
}

export function removeThemeCaches(key = SYSTEM_THEME) {
  localStorage.removeItem(key)
}
