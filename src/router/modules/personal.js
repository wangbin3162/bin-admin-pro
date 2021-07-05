export default [
  {
    path: 'userCenter',
    name: 'UserCenter',
    component: () => import('../../views/personal/user-center'),
    meta: { title: '个人中心' }
  },
  {
    path: 'userSetting',
    name: 'UserSetting',
    component: () => import('../../views/personal/user-setting'),
    meta: { title: '个人设置' }
  }
]
