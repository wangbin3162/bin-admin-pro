import { builder, getQueryParameters } from '@/mock/util'
import Mock from 'mockjs'
import { generateId } from '@/utils/util'
import { FIELD_TYPE } from '@/components/Service/LinkNode/node-util'

const idMock = []

for (let i = 0; i < 4; i++) {
  idMock.push(generateId().toString())
}

const tables = [
  {
    id: idMock[0],
    title: 'root',
    tableName: 'root',
    fields: [
      { field: 'res_info', title: '资源信息', dataType: 'STRING', type: FIELD_TYPE.dimension },
      { field: 'create_date', title: '创建时间', dataType: 'DATE', type: FIELD_TYPE.measure },
    ],
  },
  {
    id: idMock[1],
    title: 'depart',
    tableName: 'depart',
    fields: [
      { field: 'res_info', title: '资源信息', dataType: 'STRING', type: FIELD_TYPE.dimension },
      { field: 'create_date', title: '创建时间', dataType: 'DATE', type: FIELD_TYPE.measure },
      { field: 'create_dept', title: '创建部门', dataType: 'STRING', type: FIELD_TYPE.dimension },
      { field: 'total_count', title: '总数', dataType: 'NUMBER', type: FIELD_TYPE.measure },
      { field: 'success_count', title: '成功条数', dataType: 'NUMBER', type: FIELD_TYPE.measure },
    ],
  },
  {
    id: idMock[2],
    title: 'analysis',
    tableName: 'analysis',
    fields: [
      { field: 'country', title: '国家', dataType: 'STRING', type: FIELD_TYPE.dimension },
      { field: 'province', title: '省', dataType: 'STRING', type: FIELD_TYPE.dimension },
      { field: 'city', title: '市', dataType: 'STRING', type: FIELD_TYPE.dimension },
      { field: 'count', title: '统计', dataType: 'NUMBER', type: FIELD_TYPE.measure },
    ],
  },
  {
    id: idMock[3],
    title: 'batch_job',
    tableName: 'batch_job',
    fields: [
      { field: 'job_name', title: '任务名称', dataType: 'STRING', type: FIELD_TYPE.dimension },
      { field: 'create_date', title: '创建时间', dataType: 'DATE', type: FIELD_TYPE.measure },
      { field: 'total', title: '总数', dataType: 'NUMBER', type: FIELD_TYPE.measure },
      { field: 'success_count', title: '成功条数', dataType: 'NUMBER', type: FIELD_TYPE.measure },
    ],
  },
]

// 拦截获取左侧列表
Mock.mock(/\/dataset\/listByDsId/, 'get', options => {
  const params = getQueryParameters(options)
  if (params.workspaceId === 'test_datasource') {
    return builder(tables)
  }
  return builder(tables.splice(0, 2))
})
// 拦截获取左侧列表
Mock.mock(/\/dataset\/schema/, 'get', options => {
  const { id } = getQueryParameters(options)
  if (id === 'dataset_0001') {
    return builder({
      physicalSchema: {},
    })
  }
  return builder({
    physicalSchema: {
      id: idMock[0],
      title: 'root',
      tableName: 'root',
      fields: [
        { field: 'res_info', title: '资源信息', dataType: 'STRING', type: FIELD_TYPE.dimension, _checked: true },
        { field: 'create_date', title: '创建时间', dataType: 'DATE', type: FIELD_TYPE.measure, _checked: true },
      ],
      children: [
        {
          id: idMock[1],
          title: 'depart',
          tableName: 'depart',
          joinType: 'LEFT_OUTER_JOIN',
          joinKeys: [{
            sourceKey: 'res_info',
            targetKey: 'res_info',
          }],
          fields: [
            { field: 'res_info', title: '资源信息', dataType: 'STRING', type: FIELD_TYPE.dimension, _checked: true },
            { field: 'create_date', title: '创建时间', dataType: 'DATE', type: FIELD_TYPE.measure, _checked: false },
            { field: 'create_dept', title: '创建部门', dataType: 'STRING', type: FIELD_TYPE.dimension, _checked: true },
            { field: 'total_count', title: '总数', dataType: 'NUMBER', type: FIELD_TYPE.measure, _checked: true },
            { field: 'success_count', title: '成功条数', dataType: 'NUMBER', type: FIELD_TYPE.measure, _checked: true },
          ],
        },
      ],
    },
  })
})
