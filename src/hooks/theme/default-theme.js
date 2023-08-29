/**
 * 默认主题变量配置,这里默认覆盖全部变量，默认都会覆盖默认主题。
 * 建议通过主题配置后导出css变量文本进行替换使用。或者导出对象文本酌情修改。
 * 其他部分的面板配置，不需要设定的则不需要放出进行配置
 */

export const Theme = {
  // -----------------system---------------------//
  binColorPrimary: '#165dff',
  binColorSuccess: '#00c181',
  binColorWarning: '#ffaa00',
  binColorDanger: '#ff3d71',
  binBorderColorBase: 'var(--v-g-border-color)',
  binScrollbarWidth: '5px',
  binScrollbarRadius: '5px',
  // menu
  bMenuItemHeight: '40px',
  bMenuItemBorderRadius: '4px',
  bMenuTextColor: 'var(--v-g-text-color)',
  bMenuTextHoverColor: 'var(--b-menu-text-color)',
  bMenuTextActiveColor: 'var(--bin-color-primary)',
  bMenuBgColor: 'var(--v-sider-bg)',
  bMenuBgHoverColor: 'var(--bin-color-primary-light6)',
  bMenuBgActiveColor: 'var(--bin-color-primary-light6)',
  // popper
  bPopperPadding: '4px',
  bPopperRadius: '4px',
  bPopperItemMarginBottom: '4px',
  bShadowPopper:
    '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),0 9px 28px 8px rgba(0, 0, 0, 0.05)',
  // table
  bTableHeaderBg: 'var(--v-g-fill-color-2)',
  bTableHeaderText: '#1d2129',
  // page
  bPageBorderColor: 'transparent',
  bPageBg: 'var(--v-g-bg-color)',
  bPageHoverBg: 'var(--v-g-fill-color-2)',
  bPageActiveBg: 'var(--bin-color-primary-light5)',

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
  vHeaderHeight: '56px',
  vHeaderBg: 'var(--v-g-bg-color)',
  vHeaderBorderColor: 'var(--v-g-border-color)',
  vHeaderTriggerSize: '28px',
  vHeaderTriggerRadius: '50%',
  vHeaderTrigggerBorderColor: 'var(--v-g-border-color)',
  // 侧边栏
  // vSiderWidth: '220px', // 侧边栏宽度使用setting设置
  // vSiderCollapseWidth: '48px', // 侧边栏宽度使用setting设置
  vSiderBg: 'var(--v-g-bg-color)',
  vSiderBorderColor: 'var(--v-g-border-color)',
  vSiderCollapseBtnColor: 'var(--v-g-text-color-3)',
  vSiderCollapseBtnBg: 'var(--v-g-fill-color-1)',
  vSiderCollapseBtnBgHover: 'var(--v-g-fill-color-3)',
  // tags-view
  vTagsHeight: '32px',
  vTagsBorderColor: 'var(--v-g-border-color)',
  vTagsFontSize: '12px',
  vTagsTextColor: 'var(--v-g-text-color)',
  vTagsTextHoverColor: 'var(--v-tags-text-color)',
  vTagsBgColor: 'var(--v-g-bg-color)',
  vTagsItemBgColor: 'var(--v-g-fill-color-2)',
  vTagsItemTextColor: 'var(--bin-color-primary)',
  // 内容区域
  vContentBg: 'var(--v-g-fill-color-2)',
}

// 主题颜色面板
export const ThemeMainColors = [
  '#3366ff',
  '#009688',
  '#1976d2',
  '#536def',
  '#ff5c93',
  '#ee4f12',
  '#0096c7',
  '#9c27b0',
  '#ff9800',
]

// 菜单背景颜色
export const ThemeMenuColors = [
  '#001529',
  '#273352',
  '#191b24',
  '#304156',
  '#031d21',
  '#28333E',
  '#292c37',
  '#383f45',
  '#ffffff',
]
// 背景颜色
export const ThemeBGColors = [
  '#17171a',
  '#232324',
  '#2a2a2b',
  '#313132',
  '#373739',
  '#fafafa',
  '#ffffff',
]

// 文字颜色
export const ThemeTextColors = [
  '#1d2129',
  '#4e5969',
  '#86909c',
  '#c9cdd4',
  '#17233d',
  '#515a6e',
  '#808695',
  '#c5c8ce',
  '#C0C4CC',
  '#ffffff',
]

// 填充颜色
export const ThemeFillColors = [
  '#f7f8fa',
  '#f2f3f5',
  '#e5e6eb',
  '#c9cdd4',
  '#f0f0f0',
  '#f5f5f5',
  '#fafafa',
  '#ffffff',
]

// 边框颜色
export const ThemeBorderColors = [
  '#2e2e30',
  '#484849',
  '#5f5f60',
  '#929293',
  '#f7f8fa',
  '#f2f3f5',
  '#e5e6eb',
  '#c9cdd4',
  '#fafafa',
  '#eeeeee',
  '#dddddd',
]
