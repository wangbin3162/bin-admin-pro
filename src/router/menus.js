/**
 * default menu list
 */
export default [
  {
    name: 'demo',
    title: 'Demo',
    icon: 'ios-cube',
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
    icon: 'ios-warning',
    children: [
      {
        name: 'Error401',
        title: '异常页401'
      },
      {
        name: 'Error403',
        title: '异常页403'
      },
      {
        name: 'Error404',
        title: '异常页404'
      },
      {
        name: 'Error500',
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
  const temp = [{
    name: 'home',
    title: '首页',
    icon: 'ios-home'
  }]
  return temp.concat(menus, staticMenu)
}
