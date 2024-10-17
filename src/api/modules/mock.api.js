import avatar from '@/assets/images/avatar/avatar05.jpeg'
import avatar1 from '@/assets/images/avatar/avatar05.jpeg'
import avatar2 from '@/assets/images/avatar/avatar02.jpeg'
import avatar3 from '@/assets/images/avatar/avatar07.jpeg'
import avatar4 from '@/assets/images/avatar/avatar01.jpeg'
import avatar5 from '@/assets/images/avatar/avatar04.jpeg'
import avatar6 from '@/assets/images/avatar/avatar09.jpeg'
import banner1 from '@/assets/images/banner/banner2.jpeg'
import banner2 from '@/assets/images/banner/banner3.jpeg'
import banner3 from '@/assets/images/banner/banner1.jpeg'
import banner4 from '@/assets/images/banner/banner4.jpeg'
import banner5 from '@/assets/images/banner/banner6.jpeg'
import menus from '@/router/menus'

// 获取基础列表
export function getBaseList() {
  return new Promise(resolve => {
    resolve({
      rows: [
        {
          id: '001',
          title: 'Bin UI Design',
          desc: '基于vue3的ui组件库，内涵60+组件',
          author: 'wangbin',
          avatar: avatar1,
          time: '2021-07-04 12:00:00',
          progress: 95,
          status: 'text', // text success exception
        },
        {
          id: '002',
          title: 'Bin Admin Pro',
          desc: '基于vue3,bin-ui-design的企业级后台管理框架',
          author: 'wangbin',
          avatar: avatar2,
          time: '2021-06-04 12:00:00',
          progress: 80,
          status: 'text',
        },
        {
          id: '003',
          title: 'Bin Ace Editor',
          desc: '基于vue3的代码编辑器，支持多种格式',
          author: 'wangbin',
          avatar: avatar3,
          time: '2021-06-04 12:00:00',
          progress: 100,
          status: 'success',
        },
        {
          id: '004',
          title: 'Bin Charts',
          desc: '基于vue3、echart5 的图表封装组件',
          author: 'wangbin',
          avatar: avatar4,
          time: '2021-06-04 12:00:00',
          progress: 75,
          status: 'text',
        },
        {
          id: '005',
          title: 'Bin UI',
          desc: '基于vue2的基础组件库。',
          author: 'wangbin',
          avatar: avatar5,
          time: '2021-06-04 12:00:00',
          progress: 100,
          status: 'success',
        },
        {
          id: '006',
          title: 'test',
          desc: '测试任务描述',
          author: 'test',
          avatar: avatar6,
          time: '2021-06-04 12:00:00',
          progress: 40,
          status: 'exception',
        },
      ],
      total: 15,
    })
  })
}

// 获取文章列表
export function getArticleList() {
  return new Promise(resolve => {
    resolve({
      rows: [
        {
          id: '001',
          title: '前端知识梳理-VUE篇',
          url: 'https://juejin.cn/post/6844904018339168270',
          desc: '梳理一下个人开发中遇到的一些vue问题，记录一下个人的理解。',
          tags: ['vue', 'javascript', 'es6'],
          time: '2019年12月11日',
          read: 10339,
          favour: 206,
          remark: 13,
          author: 'wangbin',
          avatar,
        },
        {
          id: '002',
          title: '前端知识梳理-ES6篇',
          url: 'https://juejin.cn/post/6844904018318196743',
          desc: '梳理一下我自己的知识体系，本篇记录部分es6相关内容和个人理解。',
          tags: ['javascript', 'es6'],
          time: '2019年12月11日',
          read: 842,
          favour: 8,
          remark: 0,
          author: 'wangbin',
          avatar,
        },
        {
          id: '003',
          title: '前端知识梳理-ES5篇',
          url: 'https://juejin.cn/post/6844904018251087885',
          desc: '梳理一下我自己的知识体系，本篇文章记录自己对es5知识点的理解。',
          tags: ['javascript', 'es5'],
          time: '2019年12月11日',
          read: 758,
          favour: 10,
          remark: 0,
          author: 'wangbin',
          avatar,
        },
        {
          id: '004',
          title: '前端知识梳理-HTML、CSS篇',
          url: 'https://juejin.cn/post/6844904018230116360',
          desc: '梳理一下我自己的知识体系，此篇为html、css部分',
          tags: ['html', 'css'],
          time: '2019年12月11日',
          read: 1110,
          favour: 12,
          remark: 0,
          author: 'wangbin',
          avatar,
        },
      ],
    })
  })
}

// 获取项目列表
export function getProjectList() {
  return new Promise(resolve => {
    resolve({
      rows: [
        {
          id: '001',
          title: 'Bin UI Design',
          url: 'https://wangbin3162.github.io/bin-ui-design/#/guide',
          desc: '基于vue3的ui组件库，内涵60+组件',
          banner: banner1,
          author: 'wangbin',
          avatar,
          time: '2021-07-04',
        },
        {
          id: '002',
          title: 'Bin Admin Pro',
          url: 'https://wangbin3162.github.io/bin-ace-editor/#/guide',
          desc: '基于vue3,bin-ui-design的企业级后台管理框架',
          banner: banner2,
          author: 'wangbin',
          avatar,
          time: '2021-06-04',
        },
        {
          id: '003',
          title: 'Bin Ace Editor',
          url: 'https://wangbin3162.github.io/bin-ace-editor/#/guide',
          desc: '基于vue3的代码编辑器，支持多种格式',
          banner: banner3,
          author: 'wangbin',
          avatar,
          time: '2021-06-04',
        },
        {
          id: '004',
          title: 'Bin Charts',
          url: 'https://wangbin3162.github.io/bin-charts/#/guide',
          desc: '基于vue3、echart5 的图表封装组件',
          banner: banner4,
          author: 'wangbin',
          avatar,
          time: '2021-06-04',
        },
        {
          id: '005',
          title: 'Bin UI',
          url: 'https://wangbin3162.github.io/bin-ui/#/guide',
          desc: '基于vue2的基础组件库。',
          banner: banner5,
          author: 'wangbin',
          avatar,
          time: '2021-06-04',
        },
      ],
    })
  })
}

export function getDepartTree() {
  return new Promise(resolve => {
    resolve([
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
            parentId: '001',
          },
          {
            id: '00102',
            text: '前端组',
            deptCode: 'qd',
            status: '1',
            desc: '前端研发中心',
            parentId: '001',
          },
          {
            id: '00103',
            text: 'UI设计',
            deptCode: 'sj',
            status: '1',
            desc: '交互、ui设计中心',
            parentId: '001',
          },
          {
            id: '00104',
            text: '测试组',
            deptCode: 'cs',
            status: '1',
            desc: '测试组',
            parentId: '001',
          },
          {
            id: '00105',
            text: '运维组',
            deptCode: 'yw',
            status: '1',
            desc: '运维、服务、巡检',
            parentId: '001',
          },
        ],
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
            parentId: '002',
          },
          {
            id: '00202',
            text: '交付服务组',
            deptCode: 'jf',
            status: '1',
            desc: '交付项目，技术服务支持',
            parentId: '002',
          },
        ],
      },
    ])
  })
}

export function getUserList() {
  return new Promise(resolve => {
    resolve({
      rows: [
        {
          id: 10000001,
          realName: 'Wang',
          username: 'wangbin',
          password: '123456',
          email: 'user@bin.admin',
          verify: true, // 是否验证邮箱
          roles: 'admin',
          avatar: avatar1,
          status: '1', // 启用1，禁用0
          createDate: '2021-07-01',
        },
        {
          id: 10000002,
          realName: '张三',
          username: 'zhangsan',
          password: '123456',
          email: 'user@zhangsan.admin',
          verify: false, // 是否验证邮箱
          roles: 'user',
          avatar: avatar2,
          status: '1', // 启用1，禁用0
          createDate: '2021-07-01',
        },
        {
          id: 10000003,
          realName: '小倪',
          username: 'xiaoni',
          password: '123456',
          email: 'user@xiaoni.admin',
          verify: false, // 是否验证邮箱
          roles: 'op',
          avatar: avatar3,
          status: '1', // 启用1，禁用0
          createDate: '2021-07-01',
        },
        {
          id: 10000004,
          realName: 'Jack',
          username: 'jack',
          password: '123456',
          email: 'user@jack.admin',
          verify: false, // 是否验证邮箱
          roles: 'user',
          avatar: avatar4,
          status: '1', // 启用1，禁用0
          createDate: '2021-07-01',
        },
        {
          id: 10000005,
          realName: '张晓发',
          username: 'zhangxiaofa',
          password: '123456',
          email: 'user@zhangxiaofa.admin',
          verify: true, // 是否验证邮箱
          roles: 'user',
          avatar: avatar5,
          status: '1', // 启用1，禁用0
          createDate: '2021-07-01',
        },
        {
          id: 10000006,
          realName: '李霄',
          username: 'lixiao',
          password: '123456',
          email: 'user@lixiao.admin',
          verify: true, // 是否验证邮箱
          roles: 'user',
          avatar: avatar6,
          status: '1', // 启用1，禁用0
          createDate: '2021-07-01',
        },
      ],
      total: 15,
    })
  })
}

export function getMenuTree() {
  return new Promise(resolve => {
    resolve([
      {
        title: '系统菜单',
        path: 'root',
        expand: true,
        children: menus,
      },
    ])
  })
}

export function getRoleList() {
  return new Promise(resolve => {
    resolve({
      rows: [
        {
          id: 10000001,
          roleName: '管理员',
          roleCode: 'admin',
          status: '1', // 启用1，禁用0
          createDate: '2021-07-01',
        },
        {
          id: 10000002,
          roleName: '普通用户',
          roleCode: 'user',
          status: '1', // 启用1，禁用0
          createDate: '2021-07-01',
        },
        {
          id: 10000003,
          roleName: '实施人员',
          roleCode: 'op',
          status: '1', // 启用1，禁用0
          createDate: '2021-07-01',
        },
      ],
      total: 15,
    })
  })
}
