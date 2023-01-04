// default menu list
export default [
  {
    name: 'Comp',
    title: '组件',
    icon: 'block',
    children: [
      {
        name: 'Basic',
        title: '基础组件',
      },
      {
        name: 'NavComp',
        title: '导航组件',
      },
      {
        name: 'FormComp',
        title: '表单组件',
      },
      {
        name: 'DataComp',
        title: '数据组件',
      },
      {
        name: 'OtherComp',
        title: '其他组件',
      },
      {
        name: 'CompCountTo',
        title: '数字动画',
      },
      {
        name: 'CompIconfont',
        title: '图标组件',
      },
      {
        name: 'CompAutoInput',
        title: '输入建议',
      },
      {
        name: 'CompSvgLoading',
        title: 'Svg Loading',
      },
    ],
  },
  {
    name: 'Function',
    title: '功能',
    icon: 'codepen',
    children: [
      {
        name: 'FuncColorVar',
        title: '主题颜色',
      },
      {
        name: 'FuncDraggable',
        title: '拖拽排序',
      },
      {
        name: 'FuncKeyValue',
        title: '映射配置',
      },
      {
        name: 'FuncTitleBar',
        title: '标题组件',
      },
      {
        name: 'FuncBaseTree',
        title: '树结构',
      },
      {
        name: 'FuncService',
        title: '业务组件',
      },
      {
        name: 'FuncDynamicCode',
        title: '动态编码',
      },
      {
        name: 'FuncGraphviz',
        title: '绘图示例',
      },
      {
        name: 'FuncX6',
        title: '阿里X6示例',
      },
    ],
  },
  {
    name: 'Form',
    title: '表单页面',
    icon: 'reconciliation',
    children: [
      {
        name: 'BaseForm',
        title: '基础表单',
      },
      {
        name: 'StepForm',
        title: '分步表单',
      },
      {
        name: 'AdvancedForm',
        title: '高级表单',
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
      },
      {
        name: 'CardList',
        title: '卡片列表',
      },
      {
        name: 'UserList',
        title: '用户列表',
      },
      {
        name: 'SearchList',
        title: '查询列表',
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
      },
      {
        name: 'AdvancedDetail',
        title: '高级详情',
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
      },
      {
        name: 'UserSetting',
        title: '个人设置',
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
      },
      {
        name: 'Fail',
        title: '失败页',
      },
    ],
  },
  {
    name: 'ErrorPage',
    title: '异常页面',
    icon: 'error',
    children: [
      {
        name: 'Error403',
        title: '异常页403',
      },
      {
        name: 'Error404',
        title: '异常页404',
      },
      {
        name: 'Error500',
        title: '异常页500',
      },
      {
        name: 'ErrorDemo',
        title: '异常触发',
      },
    ],
  },
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
          },
          {
            name: 'Menu1-2',
            title: '菜单1-2',
          },
          {
            name: 'Menu1-3',
            title: '菜单1-3',
          },
        ],
      },
      {
        name: 'Menu2',
        title: '菜单2',
      },
    ],
  },
  {
    name: 'System',
    title: '系统管理',
    icon: 'setting',
    children: [
      {
        name: 'UserAccount',
        title: '用户管理',
      },
      {
        name: 'Depart',
        title: '部门管理',
      },
      {
        name: 'Menu',
        title: '菜单管理',
      },
      {
        name: 'Role',
        title: '角色管理',
      },
    ],
  },
  {
    name: 'OutLink',
    title: '外部连接',
    icon: 'earth',
    children: [
      {
        name: 'CompDoc',
        title: '组件文档',
        icon: 'link',
        externalLink: 'https://wangbin3162.gitee.io/bin-ui-next/',
      },
      {
        name: 'Github',
        title: '仓库地址',
        icon: 'link',
        externalLink: 'https://github.com/wangbin3162/bin-ui-next',
      },
      {
        name: 'DataV',
        title: 'DataV',
        icon: 'link',
        externalLink: 'https://wangbin3162.gitee.io/bin-datav/',
      },
      {
        name: 'DataVSchema',
        title: '数据分析平台',
        icon: 'link',
        externalLink: 'https://wangbin3162.gitee.io/bin-datav-schema/',
      },
    ],
  },
  {
    name: 'Graph',
    title: '图形图表',
    icon: 'pointmap',
    children: [
      {
        name: 'PivotDemo',
        title: '交叉表',
      },
    ],
  },
]

// 基础
export const HOME_PATH = 'WorkBench'
export const HOME_NAME = '工作台'
export const ERROR_PATH_LIST = ['403', '404', '500']
export const DASHBOARD_MENUS = [
  {
    name: 'Dashboard',
    title: 'Dashboard',
    icon: 'appstore',
    children: [
      { name: HOME_PATH, title: HOME_NAME },
      { name: 'Analysis', title: '分析页' },
    ],
  },
]

/**
 * 静态的临时的menus，不受接口返回影响
 *  {{children: [{name: string, title: string}], name: string, icon: string, title: string}[]}
 */
export const staticMenu = [
  {
    name: 'About',
    title: '关于',
    icon: 'dingtalk',
  },
]

/**
 * 组装menus菜单
 * @param menus 接口返回的menus
 */
export function getFilterMenus(menus = []) {
  return [...DASHBOARD_MENUS, ...menus, ...staticMenu]
}
