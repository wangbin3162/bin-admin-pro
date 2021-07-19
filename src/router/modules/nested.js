export default [
  {
    path: 'menu1-1',
    component: () => import(/* webpackChunkName: "Nested" */ '../../views/demo/nested/menu1/menu1-1'),
    name: 'Menu1-1',
    meta: { title: '菜单1-1' }
  },
  {
    path: 'menu1-2',
    component: () => import(/* webpackChunkName: "Nested" */ '../../views/demo/nested/menu1/menu1-2'),
    name: 'Menu1-2',
    meta: { title: '菜单1-2' }
  },
  {
    path: 'menu1-3',
    component: () => import(/* webpackChunkName: "Nested" */ '../../views/demo/nested/menu1/menu1-3'),
    name: 'Menu1-3',
    meta: { title: '菜单1-3' }
  },
  {
    path: 'menu2',
    name: 'Menu2',
    component: () => import(/* webpackChunkName: "Nested" */ '../../views/demo/nested/menu2/index'),
    meta: { title: '菜单2' }
  }
]
