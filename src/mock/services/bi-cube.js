import { builder, getQueryParameters } from '@/mock/util'
import Mock from 'mockjs'
import { generateId } from '@/utils/util'

const idMock = []

for (let i = 0; i < 4; i++) {
  idMock.push(generateId().toString())
}

// 拦截获取左侧列表
Mock.mock(/\/dataset\/listByDsId/, 'get', options => {
  const params = getQueryParameters(options)
  if (params.workspaceId === 'test_datasource') {
    return builder([
      {
        id: idMock[0],
        title: 'root',
        tableName: 'root',
        fields: [
          { field: 'res_info', title: '资源信息', type: 'STRING' },
          { field: 'create_date', title: '创建时间', type: 'DATE' },
        ],
      },
      {
        id: idMock[1],
        title: 'depart',
        tableName: 'depart',
        fields: [
          { field: 'res_info', title: '资源信息', type: 'STRING' },
          { field: 'create_date', title: '创建时间', type: 'DATE' },
          { field: 'create_dept', title: '创建部门', type: 'STRING' },
          { field: 'total_count', title: '总数', type: 'NUMBER' },
          { field: 'success_count', title: '成功条数', type: 'NUMBER' },
        ],
      },
      {
        id: idMock[2],
        title: 'analysis',
        tableName: 'analysis',
        fields: [
          { field: 'country', title: '国家', type: 'STRING' },
          { field: 'province', title: '省', type: 'STRING' },
          { field: 'city', title: '市', type: 'STRING' },
          { field: 'count', title: '统计', type: 'NUMBER' },
        ],
      },
      {
        id: idMock[3],
        title: 'batch_job',
        tableName: 'batch_job',
        fields: [
          { field: 'job_name', title: '任务名称', type: 'STRING' },
          { field: 'create_date', title: '创建时间', type: 'DATE' },
          { field: 'total', title: '总数', type: 'NUMBER' },
          { field: 'success_count', title: '成功条数', type: 'NUMBER' },
        ],
      },
    ])
  }
  return builder([
    {
      id: idMock[1],
      title: 'depart',
      tableName: 'depart',
      fields: [
        { field: 'res_info', title: '资源信息', type: 'STRING' },
        { field: 'create_date', title: '创建时间', type: 'DATE' },
        { field: 'create_dept', title: '创建部门', type: 'STRING' },
        { field: 'total_count', title: '总数', type: 'NUMBER' },
        { field: 'success_count', title: '成功条数', type: 'NUMBER' },
      ],
    },
    {
      id: idMock[2],
      title: 'analysis',
      tableName: 'analysis',
      fields: [
        { field: 'country', title: '国家', type: 'STRING' },
        { field: 'province', title: '省', type: 'STRING' },
        { field: 'city', title: '市', type: 'STRING' },
        { field: 'count', title: '统计', type: 'NUMBER' },
      ],
    },
  ])
})
// 拦截获取左侧列表
Mock.mock(/\/dataset\/schema/, 'get', options => {
  const { id } = getQueryParameters(options)
  if (id === 'dataset_0001') {
    return builder({
      physicalSchema: {
        id: idMock[0],
        title: 'root',
        tableName: 'root',
        fields: [
          { field: 'res_info', title: '资源信息', type: 'STRING', checked: true },
          { field: 'create_date', title: '创建时间', type: 'DATE', checked: true },
        ],
      },
    })
  }
  return builder({
    physicalSchema: {
      id: idMock[0],
      title: 'root',
      tableName: 'root',
      children: [
        {
          id: idMock[1],
          title: 'depart',
          tableName: 'depart',
          joinType: 'LEFT_OUTER_JOIN',
        },
        {
          id: idMock[2],
          title: 'analysis',
          tableName: 'analysis',
          joinType: 'INNER_JOIN',
        },
        {
          id: idMock[3],
          title: 'batch_job',
          tableName: 'batch_job',
          joinType: 'FULL_OUTER_JOIN',
        },
      ],
    },
  })
})
