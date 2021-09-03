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
      avatar: '/images/avatar/avatar05.jpeg',
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
      avatar: '/images/avatar/avatar01.jpeg',
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
      avatar: '/images/avatar/avatar02.jpeg',
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
      avatar: '/images/avatar/avatar07.jpeg',
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
      avatar: '/images/avatar/avatar11.jpeg',
      status: '1', // 启用1，禁用0
      createDate: '2021-07-01',
    },
  ],
  total: 15,
}
