/**
 * 项目默认配置项
 */
import { darken, isHexColor } from '@/utils/color'

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
export const SYSTEM_PRIMARY_HOVER_COLOR_LIST = [
  'rgba(16, 137, 255, 0.1)',
  'rgba(0, 150, 136, 0.1)',
  'rgba(9, 96, 189, 0.1)',
  'rgba(83, 109, 239, 0.1)',
  'rgba(255, 92, 147, 0.1)',
  'rgba(238, 79, 18, 0.1)',
  'rgba(0, 150, 199, 0.1)',
  'rgba(156, 39, 176, 0.1)',
  'rgba(255, 152, 0, 0.1)'
]

export const SYSTEM_PRIMARY_HOVER2_COLOR_LIST = [
  'rgba(16, 137, 255, 0.6)',
  'rgba(0, 150, 136, 0.6)',
  'rgba(9, 96, 189, 0.6)',
  'rgba(83, 109, 239, 0.6)',
  'rgba(255, 92, 147, 0.6)',
  'rgba(238, 79, 18, 0.6)',
  'rgba(0, 150, 199, 0.6)',
  'rgba(156, 39, 176, 0.6)',
  'rgba(255, 152, 0, 0.6)'
]

export const SYSTEM_PRIMARY_ACTIVE_COLOR_LIST = [
  '#0c58a9',
  '#00695e',
  '#06448a',
  '#3141a0',
  '#ae3f63',
  '#c13d0d',
  '#00678a',
  '#7c208c',
  '#a26203'
]

export const MENU_THEME_COLOR_LIST = [
  '#001529',
  '#273352',
  '#ffffff',
  '#191b24',
  '#191a23',
  '#304156',
  '#001628',
  '#28333E',
  '#344058',
  '#383f45'
]

const SYSTEM_PRIMARY_VAR = '--primary-color'
const SYSTEM_PRIMARY_HOVER_VAR = '--primary-hover-color'
const SYSTEM_PRIMARY_HOVER2_VAR = '--primary-hover2-color'
const SYSTEM_PRIMARY_ACTIVE_VAR = '--primary-active-color'
const MENU_THEME_VAR = '--menu-bg-color'
const MENU_THEME_ACTIVE_VAR = '--menu-bg-active-color'

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
  // hover
  const index = SYSTEM_PRIMARY_COLOR_LIST.findIndex(v => v === color)
  setCssVar(SYSTEM_PRIMARY_HOVER_VAR, SYSTEM_PRIMARY_HOVER_COLOR_LIST[index])
  setCssVar(SYSTEM_PRIMARY_HOVER2_VAR, SYSTEM_PRIMARY_HOVER2_COLOR_LIST[index])
  setCssVar(SYSTEM_PRIMARY_ACTIVE_VAR, SYSTEM_PRIMARY_ACTIVE_COLOR_LIST[index])
}

// 设置menuTheme
export function setMenuTheme(color) {
  if (!isHexColor(color)) return
  // bg color
  setCssVar(MENU_THEME_VAR, color)
  setCssVar(MENU_THEME_ACTIVE_VAR, darken(color, 6))
}
