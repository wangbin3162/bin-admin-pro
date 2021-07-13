export default [
  {
    path: 'menu1-1',
    component: () => import(/* webpackChunkName: "Nested" */ '../../views/nested/menu1/menu1-1'),
    name: 'menu1-1',
    meta: { title: '菜单1-1' }
  },
  {
    path: 'menu1-2',
    component: () => import(/* webpackChunkName: "Nested" */ '../../views/nested/menu1/menu1-2'),
    name: 'menu1-2',
    meta: { title: '菜单1-2' }
  },
  {
    path: 'menu1-3',
    component: () => import(/* webpackChunkName: "Nested" */ '../../views/nested/menu1/menu1-3'),
    name: 'menu1-3',
    meta: { title: '菜单1-3' }
  },
  {
    path: 'menu2',
    name: 'menu2',
    component: () => import(/* webpackChunkName: "Nested" */ '../../views/nested/menu2/index'),
    meta: { title: '菜单2' }
  }
]
