export default [
  {
    path: 'SysUserAccount',
    name: 'SysUserAccount',
    component: () => import('@/views/demo/sys/user-account.vue'),
    meta: { title: '用户管理' },
  },
  {
    path: 'SysDepart',
    name: 'SysDepart',
    component: () => import('@/views/demo/sys/depart.vue'),
    meta: { title: '部门管理' },
  },
  {
    path: 'SysMenu',
    name: 'SysMenu',
    component: () => import('@/views/demo/sys/menu.vue'),
    meta: { title: '菜单管理' },
  },
  {
    path: 'SysRole',
    name: 'SysRole',
    component: () => import('@/views/demo/sys/role.vue'),
    meta: { title: '角色管理' },
  },
]
