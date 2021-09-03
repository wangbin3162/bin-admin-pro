export default [
  {
    path: 'userAccount',
    name: 'UserAccount',
    component: () => import('@/views/demo/sys/user-account.vue'),
    meta: { title: '用户管理' },
  },
  {
    path: 'depart',
    name: 'Depart',
    component: () => import('@/views/demo/sys/depart.vue'),
    meta: { title: '部门管理' },
  },
  {
    path: 'menu',
    name: 'Menu',
    component: () => import('@/views/demo/sys/menu.vue'),
    meta: { title: '菜单管理' },
  },
  {
    path: 'role',
    name: 'Role',
    component: () => import('@/views/demo/sys/role.vue'),
    meta: { title: '角色管理' },
  },
]
