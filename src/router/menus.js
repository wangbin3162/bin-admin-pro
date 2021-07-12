// default menu list
export default []

// 基础
export const HOME_PATH = 'workbench'
export const HOME_NAME = '工作台'
export const DASHBOARD_MENUS = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    icon: 'appstore',
    children: [
      {
        path: HOME_PATH,
        title: HOME_NAME
      }
    ]
  }
]

/**
 * 静态的临时的menus，不受接口返回影响
 *  {{children: [{path: string, title: string}], path: string, icon: string, title: string}[]}
 */
export const staticMenu = [
  {
    path: 'about',
    title: '关于',
    icon: 'dingtalk'
  }
]

/**
 * 组装menus菜单
 * @param menus 接口返回的menus
 */
export function getFilterMenus(menus = []) {
  return [
    ...DASHBOARD_MENUS,
    ...menus,
    ...staticMenu
  ]
}
