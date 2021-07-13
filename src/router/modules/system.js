export default [
  {
    path: 'userAccount',
    name: 'UserAccount',
    component: () => import(/* webpackChunkName: "UserAccount" */ '../../views/sys/user-account'),
    meta: { title: '用户管理' }
  },
  {
    path: 'depart',
    name: 'Depart',
    component: () => import(/* webpackChunkName: "Depart" */ '../../views/sys/depart'),
    meta: { title: '部门管理' }
  },
  {
    path: 'menu',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "Menu" */ '../../views/sys/menu'),
    meta: { title: '菜单管理' }
  },
  {
    path: 'role',
    name: 'Role',
    component: () => import(/* webpackChunkName: "Role" */ '../../views/sys/role'),
    meta: { title: '角色管理' }
  }
]
