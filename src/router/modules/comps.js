export default [
  {
    name: 'Comps',
    title: '组件',
    icon: 'block',
    children: [
      {
        name: 'Basic',
        title: '基础组件',
        component: () => import('@/views/demo/comp/ui/basic.vue'),
      },
      {
        name: 'NavComp',
        title: '导航组件',
        component: () => import('@/views/demo/comp/ui/nav-comp.vue'),
      },
      {
        name: 'FormComp',
        title: '表单组件',
        component: () => import('@/views/demo/comp/ui/form-comp.vue'),
      },
      {
        name: 'DataComp',
        title: '数据组件',
        component: () => import('@/views/demo/comp/ui/data-comp.vue'),
      },
      {
        name: 'OtherComp',
        title: '其他组件',
        component: () => import('@/views/demo/comp/ui/other-comp.vue'),
      },
      {
        name: 'CompCountTo',
        title: '数字动画',
        component: () => import('@/views/demo/comp/comp-count-to.vue'),
      },
      {
        name: 'CompIconfont',
        title: '图标组件',
        component: () => import('@/views/demo/comp/comp-iconfont.vue'),
      },
      {
        name: 'CompAutoInput',
        title: '输入建议',
        component: () => import('@/views/demo/comp/comp-auto-input.vue'),
      },
      {
        name: 'CompSvgLoading',
        title: 'Svg Loading',
        component: () => import('@/views/demo/comp/comp-svg-loading.vue'),
      },
    ],
  },
]
