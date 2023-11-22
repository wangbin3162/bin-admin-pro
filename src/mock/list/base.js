import avatar1 from '@/assets/images/avatar/avatar05.jpeg'
import avatar2 from '@/assets/images/avatar/avatar02.jpeg'
import avatar3 from '@/assets/images/avatar/avatar07.jpeg'
import avatar4 from '@/assets/images/avatar/avatar01.jpeg'
import avatar5 from '@/assets/images/avatar/avatar04.jpeg'
import avatar6 from '@/assets/images/avatar/avatar09.jpeg'

export default {
  rows: [
    {
      id: '001',
      title: 'Bin UI Next',
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
}
