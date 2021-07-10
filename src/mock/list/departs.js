/**
 * 部门列表
 */
export default [
  {
    id: '001',
    text: '研发部',
    deptCode: 'yfb',
    status: '1',
    desc: '研发中心',
    parentId: null,
    children: [
      {
        id: '00101',
        text: '后端组',
        deptCode: 'hd',
        status: '1',
        desc: '后端研发中心',
        parentId: '001'
      },
      {
        id: '00102',
        text: '前端组',
        deptCode: 'qd',
        status: '1',
        desc: '前端研发中心',
        parentId: '001'
      },
      {
        id: '00103',
        text: 'UI设计',
        deptCode: 'sj',
        status: '1',
        desc: '交互、ui设计中心',
        parentId: '001'
      },
      {
        id: '00104',
        text: '测试组',
        deptCode: 'cs',
        status: '1',
        desc: '测试组',
        parentId: '001'
      },
      {
        id: '00105',
        text: '运维组',
        deptCode: 'yw',
        status: '1',
        desc: '运维、服务、巡检',
        parentId: '001'
      }
    ]
  },
  {
    id: '002',
    text: '项目部',
    deptCode: 'xmb',
    status: '1',
    desc: '项目服务部',
    parentId: null,
    children: [
      {
        id: '00201',
        text: '开发组',
        deptCode: 'kf',
        status: '1',
        desc: '后端项目开发',
        parentId: '002'
      },
      {
        id: '00202',
        text: '交付服务组',
        deptCode: 'jf',
        status: '1',
        desc: '交付项目，技术服务支持',
        parentId: '002'
      }
    ]
  }
]
