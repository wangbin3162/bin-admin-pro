/**
 * default menu list
 */
export default [
  {
    name: 'demo',
    title: 'Demo',
    icon: 'detail',
    children: [
      {
        name: 'demo',
        title: '测试代码'
      }
    ]
  }
]

/**
 * 静态的临时的menus，不受接口返回影响
 * @type {{children: [{name: string, title: string}], name: string, icon: string, title: string}[]}
 */
export const staticMenu = [
  {
    name: 'errorPage',
    title: '错误页面',
    icon: 'error',
    children: [
      {
        name: 'error401',
        title: '异常页401'
      },
      {
        name: 'error403',
        title: '异常页403'
      },
      {
        name: 'error404',
        title: '异常页404'
      },
      {
        name: 'error500',
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
  const temp = [{ name: 'home', title: '首页', icon: 'home' }]
  return temp.concat(menus, staticMenu)
}
