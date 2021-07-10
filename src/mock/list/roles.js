/**
 * 角色列表
 * roles :[admin,user,op]
 */
export default {
  rows: [
    {
      id: 10000001,
      roleName: '管理员',
      roleCode: 'admin',
      status: '1', // 启用1，禁用0
      createDate: '2021-07-01'
    },
    {
      id: 10000002,
      roleName: '普通用户',
      roleCode: 'user',
      status: '1', // 启用1，禁用0
      createDate: '2021-07-01'
    },
    {
      id: 10000003,
      roleName: '实施人员',
      roleCode: 'op',
      status: '1', // 启用1，禁用0
      createDate: '2021-07-01'
    }
  ],
  total: 15
}
