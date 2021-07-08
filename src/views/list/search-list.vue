<template>
  <page-wrapper desc="基础表格的查询列表，带有常规操作。">
    <base-table>
      <template #filter>
        <b-form label-width="95px">
          <b-form-item label="用户名称">
            <b-input v-model="query.name" clearable></b-input>
          </b-form-item>
          <b-form-item label="用户角色">
            <b-select v-model="query.roles" clearable>
              <b-option v-for="(val,key) in roleMap" :key="key" :label="val" :value="key"></b-option>
            </b-select>
          </b-form-item>
          <template v-if="expand">
            <b-form-item label="状态">
              <b-select v-model="query.status" clearable>
                <b-option label="启用" value="1"></b-option>
                <b-option label="禁用" value="0"></b-option>
              </b-select>
            </b-form-item>
            <b-form-item label="邮箱">
              <b-input v-model="query.email" clearable></b-input>
            </b-form-item>
            <b-form-item label="日期">
              <b-date-picker v-model="query.date" clearable></b-date-picker>
            </b-form-item>
          </template>
          <b-form-item>
            <b-button>重置</b-button>
            <b-button type="primary" :loading="loading">查询</b-button>
            <b-button
              type="text"
              :icon="expand?'up':'down'"
              @click="expand = !expand"
            >
              {{ expand ? '收起' : '展开' }}
            </b-button>
          </b-form-item>
        </b-form>
      </template>
      <template #action>
        <b-button type="primary" icon="plus-circle">新增</b-button>
      </template>
      <template #actionRight>
        <b-dropdown style="margin-left: 20px;">
          <b-button>
            更多操作
            <b-icon name="down"></b-icon>
          </b-button>
          <template #dropdown>
            <b-dropdown-menu>
              <b-dropdown-item>刷新</b-dropdown-item>
              <b-dropdown-item>删除</b-dropdown-item>
            </b-dropdown-menu>
          </template>
        </b-dropdown>
      </template>
      <b-table :columns="columns" :data="copyList" :loading="loading" border>
        <template #roles="{row}">
          {{ roleMap[row.roles] }}
        </template>
        <template #action>
          <action-button type="text">编辑</action-button>
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
  </page-wrapper>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import BaseTable from '@/components/BaseTable'
import { getUserList } from '@/api/user.api'
import PageWrapper from '@/components/Page/PageWrapper'
import useTable from '@/hooks/service/useTable'
import ActionButton from '@/components/ActionButton'

export default {
  name: 'SearchList',
  components: {
    ActionButton,
    PageWrapper,
    BaseTable
  },
  setup() {
    const query = reactive({
      page: 1,
      size: 10,
      name: '',
      roles: '',
      status: '',
      date: '',
      email: ''
    })
    const expand = ref(false)
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
    watch(list, (val) => {
      copyList.value = val.map(item => ({
        ...item,
        expand: false
      }))
    })

    // 执行一次内容
    getDataSource()
    return {
      expand,
      query,
      loading,
      roleMap: {
        admin: '管理员',
        user: '普通用户',
        op: '实施人员'
      },
      total,
      copyList,
      getDataSource,
      pageChange,
      pageSizeChange,
      columns: [
        {
          title: '姓名',
          key: 'realName'
        },
        {
          title: '登录名',
          key: 'username'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '角色',
          slot: 'roles'
        },
        {
          title: '出生日期',
          key: 'createDate'
        },
        {
          title: '操作',
          width: 100,
          align: 'center',
          slot: 'action'
        }
      ]
    }
  }
}
</script>
