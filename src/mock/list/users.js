import avatar1 from '@/assets/images/avatar/avatar05.jpeg'
import avatar2 from '@/assets/images/avatar/avatar01.jpeg'
import avatar3 from '@/assets/images/avatar/avatar02.jpeg'
import avatar4 from '@/assets/images/avatar/avatar07.jpeg'
import avatar5 from '@/assets/images/avatar/avatar12.jpeg'
import avatar6 from '@/assets/images/avatar/avatar11.jpeg'

/**
 * 用户列表
 * roles :[admin,user,op]
 */
export default {
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
}
