export default [
  {
    name: 'Pages',
    title: '页面',
    icon: 'creditcard',
    children: [
      {
        name: 'Form',
        title: '表单页面',
        icon: 'reconciliation',
        children: [
          {
            name: 'BaseForm',
            title: '基础表单',
            component: () => import('@/views/demo/pages/form/base-form.vue'),
          },
          {
            name: 'StepForm',
            title: '分步表单',
            component: () => import('@/views/demo/pages/form/step-form.vue'),
          },
          {
            name: 'AdvancedForm',
            title: '高级表单',
            component: () => import('@/views/demo/pages/form/advanced-form.vue'),
          },
        ],
      },
      {
        name: 'List',
        title: '列表页面',
        icon: 'table',
        children: [
          {
            name: 'BaseList',
            title: '基础列表',
            component: () => import('@/views/demo/pages/list/base-list.vue'),
          },
          {
            name: 'CardList',
            title: '卡片列表',
            component: () => import('@/views/demo/pages/list/card-list.vue'),
          },
          {
            name: 'UserList',
            title: '用户列表',
            component: () => import('@/views/demo/pages/list/user-list.vue'),
          },
          {
            name: 'SearchList',
            title: '查询列表',
            component: () => import('@/views/demo/pages/list/search-list.vue'),
          },
        ],
      },
      {
        name: 'Detail',
        title: '详情页面',
        icon: 'filedone',
        children: [
          {
            name: 'BaseDetail',
            title: '基础详情',
            component: () => import('@/views/demo/pages/detail/base-detail.vue'),
          },
          {
            name: 'AdvancedDetail',
            title: '高级详情',
            component: () => import('@/views/demo/pages/detail/advanced-detail.vue'),
          },
        ],
      },
      {
        name: 'Personal',
        title: '个人页面',
        icon: 'control',
        children: [
          {
            name: 'UserCenter',
            title: '个人中心',
            component: () => import('@/views/demo/pages/personal/user-center.vue'),
          },
          {
            name: 'UserSetting',
            title: '个人设置',
            component: () => import('@/views/demo/pages/personal/user-setting.vue'),
          },
        ],
      },
      {
        name: 'Result',
        title: '结果页面',
        icon: 'check-circle',
        children: [
          {
            name: 'Success',
            title: '成功页',
            component: () => import('@/views/demo/pages/result/success.vue'),
          },
          {
            name: 'Fail',
            title: '失败页',
            component: () => import('@/views/demo/pages/result/fail.vue'),
          },
        ],
      },
      {
        name: 'ErrorPage',
        title: '错误页面',
        icon: 'error',
        children: [
          {
            name: 'Error403',
            title: '异常页403',
            component: () => import('@/views/demo/pages/error-page/error403.vue'),
          },
          {
            name: 'Error404',
            title: '异常页404',
            component: () => import('@/views/demo/pages/error-page/error404.vue'),
          },
          {
            name: 'Error500',
            title: '异常页500',
            component: () => import('@/views/demo/pages/error-page/error500.vue'),
          },
          {
            name: 'ErrorDemo',
            title: '异常触发',
            component: () => import('@/views/demo/pages/error-page/demo.vue'),
          },
        ],
      },
    ],
  },
]
