/**
 * 项目默认配置项
 */
import { Utils } from 'bin-ui-next'

const { mixWhite, mixBlack, alpha } = Utils.color

// 全局setting变量
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
  '#304156',
  '#031d21',
  '#28333E',
  '#292c37',
  '#383f45'
]

const PRIMARY_ACTIVE_VAR = '--primary-active-color'
const PRIMARY_VAR = '--primary-color'
const PRIMARY_HOVER_VAR = '--primary-hover-color'
const PRIMARY_LIGHTEN_3_VAR = '--primary-lighten3-color'
const PRIMARY_LIGHTEN_5_VAR = '--primary-lighten5-color'
const PRIMARY_LIGHTEN_HOVER_VAR = '--primary-lighten-hover-color'
const PRIMARY_SHADOW_VAR = '--primary-shadow-color'
const PRIMARY_SHADOW_LIGHT_VAR = '--primary-lighten-shadow-color'

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
  // active
  const darkColor = mixBlack(color, 0.1)
  // hover
  const hoverColor = mixWhite(color, 0.2)
  // lighten
  const lighten3 = mixWhite(color, 0.6)
  const lighten5 = mixWhite(color, 0.9)
  const lightenHover = mixWhite(color, 0.95)
  // alpha
  const shadow = alpha(color, 0.2)
  const shadowLight = alpha(color, 0.08)

  setCssVar(PRIMARY_VAR, color) // primary
  setCssVar(PRIMARY_ACTIVE_VAR, darkColor) // active
  // hover
  setCssVar(PRIMARY_HOVER_VAR, hoverColor)
  setCssVar(PRIMARY_LIGHTEN_3_VAR, lighten3)
  setCssVar(PRIMARY_LIGHTEN_5_VAR, lighten5)
  setCssVar(PRIMARY_LIGHTEN_HOVER_VAR, lightenHover)
  // alpha
  setCssVar(PRIMARY_SHADOW_VAR, shadow)
  setCssVar(PRIMARY_SHADOW_LIGHT_VAR, shadowLight)
}

// 设置menuTheme
export function setMenuTheme(color) {
  // bg color
  setCssVar(MENU_THEME_VAR, color)
  const activeColor = mixBlack(color, 0.2)
  setCssVar(MENU_THEME_ACTIVE_VAR, activeColor)
}
