/**
 * 项目默认配置项
 */
import { isHexColor } from '@/utils/color'

export default {
  theme: 'dark',
  menuTheme: '#ffffff',
  systemPrimary: '#1089ff',
  sidebar: true, // 侧边栏开启状态
  sidebarWidth: 256, // 侧边栏宽度
  tagsView: true, // 多页签开启状态
  fixedHeader: false,
  fixedAside: false
}

export const SYSTEM_PRIMARY_COLOR_LIST = [
  '#1089ff',
  '#009688',
  '#0960bd',
  '#536def',
  '#ff5c93',
  '#ee4f12',
  '#0096c7',
  '#9c27b0',
  '#ff9800'
]

export const MENU_THEME_COLOR_LIST = [
  '#001529',
  '#273352',
  '#ffffff',
  '#191b24',
  '#394664',
  '#4e73df',
  '#001628',
  '#28333E',
  '#344058',
  '#383f45'
]

const SYSTEM_PRIMARY_VAR = '--primary-color'
const MENU_THEME_VAR = '--menu-bg-color'

export function setCssVar(prop, val, dom = document.documentElement) {
  dom.style.setProperty(prop, val)
}

export function setAttrVar(prop, val, dom = document.documentElement) {
  dom.setAttribute(prop, val)
}

// 设置全局theme皮肤
export function setThemeMode(theme = 'light') {
  setAttrVar('data-theme', theme)
}

// 设置全局主题色变量
export function setPrimaryColor(color) {
  setCssVar(SYSTEM_PRIMARY_VAR, color)
}

// 设置menuTheme
export function setMenuTheme(color) {
  if (!isHexColor(color)) return
  // bg color
  setCssVar(MENU_THEME_VAR, color)
}
