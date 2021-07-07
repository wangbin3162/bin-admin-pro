<template>
  <page-wrapper desc="基础表格的查询列表，带有常规操作。">
    <base-table>
      <template #filter>
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
          <b-button type="primary">查询</b-button>
          <b-button
            type="text"
            :icon="expand?'up':'down'"
            @click="expand = !expand"
          >
            {{ expand ? '收起' : '展开' }}
          </b-button>
        </b-form-item>
      </template>
    </base-table>
  </page-wrapper>
</template>

<script>
import { reactive, ref } from 'vue'
import BaseTable from '@/components/BaseTable'
import { getUserList } from '@/api/user.api'

export default {
  name: 'SearchList',
  components: { BaseTable },
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
    return {
      expand,
      query,
      roleMap: {
        admin: '管理员',
        user: '普通用户',
        op: '实施人员'
      },
      getUserList
    }
  }
}
</script>
