export default [
  {
    path: 'userCenter',
    name: 'UserCenter',
    component: () => import('@/views/demo/personal/user-center.vue'),
    meta: { title: '个人中心' },
  },
  {
    path: 'userSetting',
    name: 'UserSetting',
    component: () => import('@/views/demo/personal/user-setting.vue'),
    meta: { title: '个人设置' },
  },
]
