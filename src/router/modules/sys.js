export default [
  {
    name: 'System',
    title: '系统管理',
    icon: 'setting',
    children: [
      {
        name: 'SysUserAccount',
        title: '用户管理',
        component: () => import('@/views/demo/sys/user-account.vue'),
      },
      {
        name: 'SysDepart',
        title: '部门管理',
        component: () => import('@/views/demo/sys/depart.vue'),
      },
      {
        name: 'SysMenu',
        title: '菜单管理',
        component: () => import('@/views/demo/sys/menu.vue'),
      },
      {
        name: 'SysRole',
        title: '角色管理',
        component: () => import('@/views/demo/sys/role.vue'),
      },
    ],
  },
]
