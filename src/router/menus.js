/**
 * default menu list
 */
export default [
  {
    path: 'demo',
    title: 'Demo',
    icon: 'detail',
    children: [
      {
        path: 'demo',
        title: '测试代码'
      }
    ]
  }
]

/**
 * 静态的临时的menus，不受接口返回影响
 * @type {{children: [{path: string, title: string}], path: string, icon: string, title: string}[]}
 */
export const staticMenu = [
  {
    path: 'errorPage',
    title: '错误页面',
    icon: 'error',
    children: [
      {
        path: 'error401',
        title: '异常页401'
      },
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
  }
]

/**
 * 组装menus菜单
 * @param menus 接口返回的menus
 */
export function getFilterMenus(menus = []) {
  const temp = [{ path: 'home', title: '首页', icon: 'home' }]
  return temp.concat(menus, staticMenu)
}
