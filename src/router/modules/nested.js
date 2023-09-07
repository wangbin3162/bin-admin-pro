export default [
  {
    name: 'Nested',
    title: '嵌套菜单',
    icon: 'menu',
    children: [
      {
        name: 'Menu1',
        title: '菜单1',
        children: [
          {
            name: 'Menu1-1',
            title: '菜单1-1',
            component: () => import('@/views/demo/nested/menu1/menu1-1/index.vue'),
          },
          {
            name: 'Menu1-2',
            title: '菜单1-2',
            component: () => import('@/views/demo/nested/menu1/menu1-2/index.vue'),
          },
          {
            name: 'Menu1-3',
            title: '菜单1-3',
            component: () => import('@/views/demo/nested/menu1/menu1-3/index.vue'),
          },
        ],
      },
      {
        name: 'Menu2',
        title: '菜单2',
        component: () => import('@/views/demo/nested/menu2/index.vue'),
      },
    ],
  },
]
