/**
 * 依赖color插件，在此基础上封装部分转换函数
 * 参考文档说明：https://www.npmjs.com/package/color
 */
import Color from 'color'

/**
 * 两个颜色值比较
 */
export function isEqual(color1, color2) {
  return Color(color1).toString() === Color(color2).toString()
}

/**
 * 混合色，浓度
 */
export function mix(mixColor, color, concentration) {
  return Color(color).mix(Color(mixColor), concentration).hex().toLowerCase()
}

export function mixWhite(color, concentration) {
  return mix('#ffffff', color, concentration)
}

export function mixBlack(color, concentration) {
  return mix('#000000', color, concentration)
}

export function getAlpha(color, concentration) {
  return Color(color).fade(1 - concentration)
}
