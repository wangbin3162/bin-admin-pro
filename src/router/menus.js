// default menu list
export default [
  {
    path: 'comp',
    title: '组件',
    icon: 'block',
    children: [
      { path: 'colorVar', title: '主题颜色' },
      { path: 'basic', title: '基础组件' }
    ]
  },
  {
    path: 'demo',
    title: 'Demo',
    icon: 'detail',
    children: [
      { path: 'tableTest', title: '测试代码' }
    ]
  },
  {
    path: 'nested',
    title: '嵌套菜单',
    icon: 'menu',
    children: [
      {
        path: 'menu1',
        title: '菜单1',
        children: [
          { path: 'menu1-1', title: '菜单1-1' },
          { path: 'menu1-2', title: '菜单1-2' },
          { path: 'menu1-3', title: '菜单1-3' }
        ]
      },
      { path: 'menu2', title: '菜单2' }
    ]
  }
]

// 基础
export const HOME_PATH = 'workbench'
export const HOME_NAME = '工作台'
export const DASHBOARD_MENUS = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    icon: 'appstore',
    children: [
      { path: HOME_PATH, title: HOME_NAME },
      { path: 'analysis', title: '分析页' }
    ]
  }
]

/**
 * 静态的临时的menus，不受接口返回影响
 *  {{children: [{path: string, title: string}], path: string, icon: string, title: string}[]}
 */
export const staticMenu = [
  {
    path: 'errorPage',
    title: '错误页面',
    icon: 'error',
    children: [
      {
        path: 'error403',
        title: '异常页403'
      },
      {
        path: 'error404',
        title: '异常页404'
      },
      {
        path: 'error500',
        title: '异常页500'
      }
    ]
  },
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
  return DASHBOARD_MENUS.concat(menus, staticMenu)
}
