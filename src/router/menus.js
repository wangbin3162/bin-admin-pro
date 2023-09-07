import menuList from '@/router/modules/index'
import { compileFlatState } from '@/utils/util'

// 处理拉平树结构菜单
export const flatMenus = compileFlatState(menuList)

export default menuList

// 基础
export const HOME_PATH = 'WorkBench'
export const HOME_NAME = '工作台'
export const ERROR_PATH_LIST = ['403', '404', '500']

export const DASHBOARD_MENUS = [
  {
    name: 'Dashboard',
    title: 'Dashboard',
    icon: 'appstore',
    children: [
      { name: HOME_PATH, title: HOME_NAME },
      { name: 'Analysis', title: '分析页' },
    ],
  },
]

/**
 * 组装menus菜单
 * @param menus 接口返回的menus
 */
export function getFilterMenus(menus = []) {
  return [...DASHBOARD_MENUS, ...menus]
}
