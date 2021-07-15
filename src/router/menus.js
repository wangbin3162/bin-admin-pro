// default menu list
export default [
  {
    path: 'comp',
    title: '组件',
    icon: 'block',
    children: [
      {
        path: 'colorVar',
        title: '主题颜色'
      },
      {
        path: 'ui',
        title: '组件库',
        children: [
          {
            path: 'basic',
            title: '基础组件'
          },
          {
            path: 'navComp',
            title: '导航组件'
          },
          {
            path: 'formComp',
            title: '表单组件'
          },
          {
            path: 'dataComp',
            title: '数据组件'
          },
          {
            path: 'otherComp',
            title: '其他组件'
          }
        ]
      },
      {
        path: 'compCountTo',
        title: '数字动画'
      },
      {
        path: 'compIconfont',
        title: '图标组件'
      },
      {
        path: 'compSvgLoading',
        title: 'Svg Loading'
      },
      {
        path: 'compTitleBar',
        title: '标题组件'
      },
      {
        path: 'compBaseTree',
        title: '树结构'
      }
    ]
  },
  {
    path: 'form',
    title: '表单页面',
    icon: 'reconciliation',
    children: [
      {
        path: 'baseForm',
        title: '基础表单'
      },
      {
        path: 'stepForm',
        title: '分步表单'
      },
      {
        path: 'advancedForm',
        title: '高级表单'
      }
    ]
  },
  {
    path: 'list',
    title: '列表页面',
    icon: 'table',
    children: [
      {
        path: 'baseList',
        title: '基础列表'
      },
      {
        path: 'cardList',
        title: '卡片列表'
      },
      {
        path: 'userList',
        title: '用户列表'
      },
      {
        path: 'searchList',
        title: '查询列表'
      }
    ]
  },
  {
    path: 'detail',
    title: '详情页面',
    icon: 'filedone',
    children: [
      {
        path: 'baseDetail',
        title: '基础详情'
      },
      {
        path: 'advancedDetail',
        title: '高级详情'
      }
    ]
  },
  {
    path: 'personal',
    title: '个人页面',
    icon: 'control',
    children: [
      {
        path: 'userCenter',
        title: '个人中心'
      },
      {
        path: 'userSetting',
        title: '个人设置'
      }
    ]
  },
  {
    path: 'result',
    title: '结果页面',
    icon: 'check-circle',
    children: [
      {
        path: 'success',
        title: '成功页'
      },
      {
        path: 'fail',
        title: '失败页'
      }
    ]
  },
  {
    path: 'errorPage',
    title: '异常页面',
    icon: 'error',
    children: [
      {
        path: '403',
        title: '异常页403'
      },
      {
        path: '404',
        title: '异常页404'
      },
      {
        path: '500',
        title: '异常页500'
      },
      {
        path: 'errorDemo',
        title: '异常触发'
      }
    ]
  },
  {
    path: 'nested',
    title: '嵌套菜单',
    icon: 'menu',
    children: [
      {
        path: 'menu1',
        title: '菜单1',
        children: [
          {
            path: 'menu1-1',
            title: '菜单1-1'
          },
          {
            path: 'menu1-2',
            title: '菜单1-2'
          },
          {
            path: 'menu1-3',
            title: '菜单1-3'
          }
        ]
      },
      {
        path: 'menu2',
        title: '菜单2'
      }
    ]
  },
  {
    path: 'system',
    title: '系统管理',
    icon: 'setting',
    children: [
      {
        path: 'userAccount',
        title: '用户管理'
      },
      {
        path: 'depart',
        title: '部门管理'
      },
      {
        path: 'menu',
        title: '菜单管理'
      },
      {
        path: 'role',
        title: '角色管理'
      }
    ]
  }
]

// 基础
export const HOME_PATH = 'workbench'
export const HOME_NAME = '工作台'
export const ERROR_PATH_LIST = ['403', '404', '500']
export const DASHBOARD_MENUS = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    icon: 'appstore',
    children: [
      {
        path: HOME_PATH,
        title: HOME_NAME
      },
      {
        path: 'analysis',
        title: '分析页'
      }
    ]
  }
]

/**
 * 静态的临时的menus，不受接口返回影响
 *  {{children: [{path: string, title: string}], path: string, icon: string, title: string}[]}
 */
export const staticMenu = [
  {
    path: 'about',
    title: '关于',
    icon: 'dingtalk'
  }
]

/**
 * 组装menus菜单
 * @param menus 接口返回的menus
 */
export function getFilterMenus(menus = []) {
  return [
    ...DASHBOARD_MENUS,
    ...menus,
    ...staticMenu
  ]
}
