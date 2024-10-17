import { compileFlatState } from '@/utils/util'
import menuList from '@/router/modules/index'

// 处理拉平树结构菜单
export const flatMenus = compileFlatState(menuList)

// 基础
export const HOME_PATH = 'Home'
export const HOME_NAME = '首页'
export const ERROR_PATH_LIST = ['403', '404', '500']

export const whiteList = ['/login', ERROR_PATH_LIST.map(path => `/${path}`), '/error']

export const HOME_MENUS = [{ name: HOME_PATH, title: HOME_NAME, linkType: 'route', icon: 'home' }]

/**
 * 组装menus菜单
 * @param menus 接口返回的menus
 */
export const getFilterMenus = (menus = []) => [...HOME_MENUS, ...menus]

export default menuList
