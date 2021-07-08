<template>
  <div class="p16">
    <base-table>
      <template #filter>
        <b-form label-width="95px">
          <b-form-item label="角色名称">
            <b-input v-model="query.roleName" clearable></b-input>
          </b-form-item>
          <b-form-item label="角色状态">
            <b-select v-model="query.status" clearable>
              <b-option v-for="(val,key) in statusMap" :key="key" :label="val" :value="key"></b-option>
            </b-select>
          </b-form-item>
          <b-form-item>
            <b-button>重置</b-button>
            <b-button type="primary" :loading="loading">查询</b-button>
          </b-form-item>
        </b-form>
      </template>
      <template #action>
        <b-button type="primary" icon="plus-circle">新增</b-button>
      </template>
      <b-table :columns="columns" :data="copyList" :loading="loading" border>
        <template #status="{row}">
          {{ statusMap[row.status] }}
        </template>
        <template #action>
          <action-button
            icon="edit-square"
            is-icon
            tooltip="编辑"
          ></action-button>
          <action-button
            icon="delete"
            color="danger"
            is-icon
            tooltip="删除"
            confirm
          ></action-button>
        </template>
      </b-table>
      <template #page>
        <b-page
          :total="total"
          :current="query.page"
          :page-size="query.size"
          show-sizer
          show-total
          @change="pageChange"
          @size-change="pageSizeChange"
        ></b-page>
      </template>
    </base-table>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { reactive, ref, watch } from 'vue'
import useTable from '@/hooks/service/useTable'
import { getUserList } from '@/api/user.api'
import ActionButton from '@/components/ActionButton'

export default {
  name: 'Role',
  components: {
    ActionButton,
    BaseTable
  },
  setup() {
    const query = reactive({
      page: 1,
      size: 10,
      roleName: '',
      status: ''
    })
    const copyList = ref([])
    const {
      loading,
      list,
      total,
      getDataSource,
      pageChange,
      pageSizeChange
    } = useTable({
      api: getUserList,
      params: query
    })
    watch(() => list.value, (val) => {
      copyList.value = val
    })

    // 执行一次内容
    getDataSource()
    return {
      statusMap: {
        0: '禁用',
        1: '启用'
      },
      columns: [
        {
          title: '角色名称',
          key: 'realName'
        },
        {
          title: '角色编码',
          key: 'username'
        },
        {
          title: '状态',
          slot: 'status'
        },
        {
          title: '创建日期',
          key: 'createDate'
        },
        {
          title: '操作',
          width: 100,
          align: 'center',
          slot: 'action'
        }
      ],
      query,
      loading,
      total,
      copyList,
      getDataSource,
      pageChange,
      pageSizeChange
    }
  }
}
</script>
