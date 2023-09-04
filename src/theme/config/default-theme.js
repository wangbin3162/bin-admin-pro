/**
 * 默认主题变量配置,这里默认覆盖全部变量，默认都会覆盖默认主题。
 * 建议通过主题配置后导出css变量文本进行替换使用。或者导出对象文本酌情修改。
 * 其他部分的面板配置，不需要设定的则不需要放出进行配置
 */

export const Theme = {
  // -----------------system---------------------//
  binColorPrimary: '#165dff',
  binColorSuccess: '#52c41a',
  binColorWarning: '#fa8c16',
  binColorDanger: '#f5222d',

  // -----------------system---------------------//
  'vGBgColor-1': '#17171a',
  'vGBgColor-2': '#232324',
  'vGBgColor-3': '#2a2a2b',
  'vGBgColor-4': '#313132',

  'vGTextColor-1': '#1d2129',
  'vGTextColor-2': '#4e5969',
  'vGTextColor-3': '#86909c',
  'vGTextColor-4': '#c9cdd4',

  'vGFillColor-1': '#f7f8fa',
  'vGFillColor-2': '#f2f3f5',
  'vGFillColor-3': '#e5e6eb',
  'vGFillColor-4': '#c9cdd4',

  vGBgColor: '#fff',
  vGTextColorDark: 'var(--v-g-text-color-1)',
  vGTextColor: 'var(--v-g-text-color-2)',
  vGTextColorLight: 'var(--v-g-text-color-3)',
  vGBorderColor: 'var(--v-g-fill-color-3)',
  // header
  vHeaderHeight: '60px',
  vHeaderBg: 'var(--v-g-bg-color)',
  vHeaderTextColor: 'var(--v-g-text-color)',
  vHeaderBorderColor: 'var(--v-g-border-color)',
  vHeaderTriggerSize: '28px',
  vHeaderTriggerRadius: '50%',
  vHeaderTriggerBorderColor: 'var(--v-g-border-color)',
  vHeaderTriggerHoverBgColor: 'var(--v-g-border-color)',
  // 侧边栏
  // vSiderWidth: '220px', // 侧边栏宽度使用setting设置
  // vSiderCollapseWidth: '48px', // 侧边栏宽度使用setting设置
  vSiderBg: 'var(--v-g-bg-color)',
  vSiderBorderColor: 'var(--v-g-border-color)',
  vSiderCollapseBtnColor: 'var(--v-g-text-color-3)',
  vSiderCollapseBtnBg: 'var(--v-g-fill-color-1)',
  vSiderCollapseBtnBgHover: 'var(--v-g-fill-color-3)',
  // menu
  vMenuItemHeight: '40px',
  vMenuItemBorderRadius: '4px',
  vMenuTextColor: 'var(--v-g-text-color)',
  vMenuTextHoverColor: 'var(--b-menu-text-color)',
  vMenuTextActiveColor: 'var(--bin-color-primary)',
  vMenuBgColor: 'var(--v-sider-bg)',
  vMenuBgHoverColor: 'var(--bin-color-primary-light6)',
  vMenuBgActiveColor: 'var(--bin-color-primary-light6)',
  // tags-view
  vTagsBgColor: 'var(--v-g-bg-color)',
  vTagsBorderColor: 'var(--v-g-border-color)',
  vTagsHeight: '32px',
  vTagsFontSize: '12px',
  vTagsItemBorderRadius: '2px',
  vTagsTextColor: 'var(--v-g-text-color)',
  vTagsTextHoverColor: 'var(--v-g-text-color)',
  vTagsTextActiveColor: 'var(--bin-color-primary)',
  vTagsItemBgColor: 'var(--v-g-fill-color-2)',
  vTagsItemBgHoverColor: 'var(--v-g-fill-color-2)',
  vTagsItemBgActiveColor: 'var(--v-g-fill-color-2)',
  vTagsItemBorderColor: 'var(--v-g-fill-color-2)',
  vTagsItemBorderHoverColor: 'var(--v-g-fill-color-2)',
  vTagsItemBorderActiveColor: 'var(--v-g-fill-color-2)',

  // 内容区域
  vContentBg: 'var(--v-g-fill-color-2)',
  // table
  vTableHeaderBg: 'var(--v-g-fill-color-2)',
  vTableHeaderText: '#1d2129',
  // page
  vPageBorderColor: 'transparent',
  vPageBg: 'var(--v-g-bg-color)',
  vPageHoverBg: 'var(--v-g-fill-color-2)',
  vPageActiveBg: 'var(--bin-color-primary-light5)',
}

// 主题颜色面板
export const ThemeMainColors = [
  '#165DFF',
  '#3491FA',
  '#14C9C9',
  '#00B42A',
  '#722ED1',
  '#D91AD9',
  '#F53F3F',
  '#F77234',
  '#FF9800',
  '#F5319D',
]

// 主题颜色对应的文字
export const ThemeMainColorsText = [
  '极致蓝',
  '海蔚蓝',
  '碧涛青',
  '仙野绿',
  '暗夜紫',
  '青春紫',
  '浪漫红',
  '活力橙',
  '黄昏',
  '玫瑰红',
]

// 菜单背景颜色
export const ThemeMenuColors = [
  '#001529',
  '#273352',
  '#191B24',
  '#304156',
  '#031D21',
  '#28333E',
  '#292C37',
  '#383F45',
  '#FFFFFF',
]

// 背景颜色
export const ThemeBgColors = [
  '#17171A',
  '#232324',
  '#2A2A2B',
  '#313132',
  '#373739',
  '#FAFAFA',
  '#FFFFFF',
]

// 文字颜色
export const ThemeTextColors = [
  '#1D2129',
  '#4E5969',
  '#86909C',
  '#C9CDD4',
  '#17233D',
  '#515A6E',
  '#808695',
  '#C5C8CE',
  '#C0C4CC',
  '#FFFFFF',
]

// 填充颜色
export const ThemeFillColors = [
  '#F7F8FA',
  '#F2F3F5',
  '#E5E6EB',
  '#C9CDD4',
  '#F0F0F0',
  '#F5F5F5',
  '#FAFAFA',
  '#FFFFFF',
]

// 边框颜色
export const ThemeBorderColors = [
  '#2E2E30',
  '#484849',
  '#5F5F60',
  '#929293',
  '#F7F8FA',
  '#F2F3F5',
  '#E5E6EB',
  '#C9CDD4',
  '#FAFAFA',
  '#EEEEEE',
  '#DDDDDD',
]
