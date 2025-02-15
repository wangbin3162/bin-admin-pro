<template>
  <page-wrapper
    desc="包含信息的列表，带有常规操作。本页面也用作示例，实际操作以业务需求自行编写。"
    bg
  >
    <b-skeleton :loading="loading">
      <template #template>
        <b-skeleton animation />
        <b-divider></b-divider>
        <b-skeleton animation />
        <b-divider></b-divider>
        <b-skeleton animation />
        <b-divider></b-divider>
      </template>
      <template #default>
        <ul class="list-wrap">
          <li v-for="(item, index) in copyList" :key="item.id" class="user-list-item">
            <div class="list-item-meta">
              <img :src="item.avatar" alt="" class="avatar" />
              <div class="list-item-meta-name">{{ item.realName }}</div>
            </div>
            <div class="list-item-id">
              <span>ID:{{ item.id }}</span>
              <b-button size="mini" icon="file-copy" @click="handleCopy(item.id)">复制</b-button>
            </div>
            <div class="list-item-email mt-8">邮箱地址：{{ item.email }}</div>
            <div class="list-item-action mt-8" flex="cross:center">
              <b-tag :type="item.verify ? 'success' : 'danger'">
                {{ item.verify ? '已认证' : '未认证' }}
              </b-tag>
              <b-tag :type="roleMapStyle[item.roles]">{{ roleMap[item.roles] }}</b-tag>
              <b-button
                :icon="item.expand ? 'minus-square' : 'plus-square'"
                size="small"
                style="margin-left: 16px"
                @click="item.expand = !item.expand"
              >
                {{ item.expand ? '收起操作' : '展开操作' }}
              </b-button>
            </div>
            <div class="list-item-action mt-8" v-if="item.expand">
              <action-button
                :button-props="{
                  type: item.roles !== 'admin' ? 'primary' : null,
                  size: 'mini',
                  disabled: item.roles === 'admin',
                }"
                @click="setRole('admin', index)"
                message="设置角色为管理员吗？"
                confirm
              >
                管理员
              </action-button>
              <b-divider type="vertical"></b-divider>
              <action-button
                :button-props="{
                  type: item.roles !== 'user' ? 'primary' : null,
                  size: 'mini',
                  disabled: item.roles === 'user',
                }"
                @click="setRole('user', index)"
                message="设置角色为普通用户吗？"
                confirm
              >
                普通用户
              </action-button>
              <b-divider type="vertical"></b-divider>
              <action-button
                :button-props="{
                  type: item.roles !== 'op' ? 'primary' : null,
                  size: 'mini',
                  disabled: item.roles === 'op',
                }"
                @click="setRole('op', index)"
                message="设置角色为实施人员吗？"
                confirm
              >
                实施人员
              </action-button>
            </div>
          </li>
        </ul>
      </template>
    </b-skeleton>
    <div class="mt-16 t-center">
      <b-page
        :total="total"
        v-model:current="query.page"
        :page-size="query.size"
        show-elevator
        show-sizer
        show-total
        @change="pageChange"
        @size-change="pageSizeChange"
      ></b-page>
    </div>
  </page-wrapper>
</template>

<script>
import useTable from '@/hooks/service/useTable'
import { getUserList } from '@/api/modules/mock.api'
import { reactive, ref, watch } from 'vue'
import { Message } from 'bin-ui-design'

export default {
  name: 'UserList',
  setup() {
    const query = reactive({
      page: 1,
      size: 10,
    })
    const copyList = ref([])
    const { loading, list, total, getListData, pageChange, pageSizeChange } = useTable(
      getUserList,
      query,
    )

    function handleCopy(id) {
      Message.success(`复制ID：${id}成功！`)
    }

    function setRole(role, index) {
      copyList.value[index].roles = role
    }

    watch(
      () => list.value,
      val => {
        copyList.value = val.map(item => ({
          ...item,
          expand: false,
        }))
      },
    )
    // 执行一次内容
    getListData()
    return {
      query,
      roleMap: {
        admin: '管理员',
        user: '普通用户',
        op: '实施人员',
      },
      roleMapStyle: {
        admin: 'purple',
        user: 'blue',
        op: 'volcano',
      },
      loading,
      list,
      copyList,
      total,
      pageChange,
      pageSizeChange,
      handleCopy,
      setRole,
    }
  },
}
</script>

<style scoped>
.list-wrap {
  min-height: 200px;
  .user-list-item {
    padding: 12px 0;
    border-bottom: 1px solid var(--v-g-border-color);
    .list-item-meta {
      display: flex;
      width: 45%;
      align-items: center;
      font-size: 0;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 16px;
      }
      .list-item-meta-name {
        font-weight: 500;
        margin-bottom: 4px;
        color: var(--v-g-text-color);
        font-size: 16px;
        line-height: 22px;
      }
    }
    .list-item-id {
      margin-top: 8px;
      display: flex;
      align-items: center;
      > span {
        margin-right: 8px;
      }
    }
  }
}
</style>
