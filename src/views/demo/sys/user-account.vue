<template>
  <page-container inner-scroll>
    <template #header>
      <b-form label-width="95px" label-position="left">
        <b-form-item label="用户名称">
          <b-input v-model="query.name" clearable></b-input>
        </b-form-item>
        <b-form-item label="用户角色">
          <b-select v-model="query.roles" clearable>
            <b-option v-for="(val, key) in roleMap" :key="key" :label="val" :value="key"></b-option>
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
          <b-button type="primary" :loading="loading" @click="getListData">查询</b-button>
          <b-button type="text" :icon="expand ? 'up' : 'down'" @click="expand = !expand">
            {{ expand ? '收起' : '展开' }}
          </b-button>
        </b-form-item>
      </b-form>
    </template>
    <template #rightFooter>
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

    <page-cube-wrapper>
      <template #left>
        <base-tree
          ref="treeRef"
          tree-title="部门列表"
          show-filter
          :fetch="getDepartTree"
          @select-change="handleSelect"
          width="240px"
        ></base-tree>
      </template>
      <base-table class="pl-16">
        <template #action>
          <b-button type="primary" icon="plus-circle" @click="handleCreate">新增</b-button>
        </template>
        <template #actionRight>
          <b-dropdown style="margin-left: 20px">
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
          <template #roles="{ row }">
            {{ roleMap[row.roles] }}
          </template>
          <template #action="{ row }">
            <action-button
              type="text"
              icon="edit-square"
              is-icon
              tooltip="编辑"
              @click="handleEdit(row)"
            ></action-button>
            <b-divider type="vertical"></b-divider>
            <action-button
              type="text"
              icon="delete"
              color="danger"
              is-icon
              tooltip="删除"
              confirm
              @click="handleDelete(row)"
            ></action-button>
          </template>
        </b-table>
      </base-table>
    </page-cube-wrapper>

    <b-modal
      :model-value="modalVisible"
      :title="`${pageStatus.isCreate ? '新增' : '修改'}用户`"
      @closed="handleCancel"
    >
      <div v-if="modalVisible">
        <b-form
          ref="formRef"
          :model="user"
          :rules="ruleValidate"
          label-width="100px"
          label-suffix=":"
        >
          <b-form-item label="所属部门">
            <b-tree-select v-model="user.depart" :data="deptTree" title-key="text"></b-tree-select>
          </b-form-item>
          <b-form-item label="姓名" prop="realName">
            <b-input v-model="user.realName" placeholder="输入姓名" clearable></b-input>
          </b-form-item>
          <b-form-item label="用户名" prop="username">
            <b-input v-model="user.username" placeholder="输入登录名" clearable></b-input>
          </b-form-item>
          <b-form-item label="邮箱">
            <b-input v-model="user.email" placeholder="输入邮箱" clearable></b-input>
          </b-form-item>
          <b-form-item label="角色">
            <b-select v-model="user.roles" placeholder="选择角色" clearable>
              <b-option
                v-for="(val, key) in roleMap"
                :key="key"
                :label="val"
                :value="key"
              ></b-option>
            </b-select>
          </b-form-item>
        </b-form>
      </div>
      <template #footer>
        <div>
          <b-button @click="handleCancel">取 消</b-button>
          <b-button type="primary" :loading="editLoading" @click="handleSubmit">确 定</b-button>
        </div>
      </template>
    </b-modal>
  </page-container>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import useTable from '@/hooks/service/useTable'
import { getUserList } from '@/api/modules/user.api'
import { getDepartTree } from '@/api/modules/depart.api'
import useForm from '@/hooks/service/useForm'
import { Message } from 'bin-ui-next'
import useTree from '@/hooks/service/useTree'

export default {
  name: 'UserAccount',
  setup() {
    const treeRef = ref(null)
    const currentTreeNode = ref({})
    const query = reactive({
      page: 1,
      size: 10,
      name: '',
      roles: '',
      status: '',
      date: '',
      email: '',
    })
    const expand = ref(false)
    const copyList = ref([])
    const user = ref({})

    const { treeData: deptTree, getTreeData } = useTree(getDepartTree)
    getTreeData().then(() => console.log(deptTree.value))
    const { loading, list, total, getListData, pageChange, pageSizeChange } = useTable(
      getUserList,
      query,
    )
    const {
      formRef,
      editStatus,
      pageStatus,
      editLoading,
      openCreate,
      openEdit,
      backNormal,
      submitForm,
      resetForm,
      setBtnLoading,
      modalVisible,
    } = useForm()
    watch(list, val => {
      copyList.value = val.map(item => ({
        ...item,
        expand: false,
      }))
    })

    function handleSelect(node) {
      if (node.selected) {
        currentTreeNode.value = node
      }
    }

    function handleCreate() {
      user.value = {
        realName: '',
        username: '',
        email: '',
        roles: '',
        depart: '',
      }
      openCreate()
    }

    function handleEdit(row) {
      user.value = {
        ...row,
        depart: '',
      }
      openEdit()
    }

    function handleCancel() {
      user.value = {}
      backNormal()
    }

    function handleDelete() {
      Message.success('删除成功！')
      getListData()
    }

    function handleSubmit() {
      submitForm(() => {
        setBtnLoading(true)
        const status = pageStatus.value
        setTimeout(() => {
          Message.success(`${status.isCreate ? '新增' : '修改'}成功！`)
          setBtnLoading(false)
          backNormal()
          getListData()
        }, 1000)
      })
    }

    // 执行一次内容
    getListData()

    return {
      // tree,
      treeRef,
      currentTreeNode,
      handleSelect,
      getDepartTree,
      deptTree,
      // list
      expand,
      query,
      loading,
      roleMap: {
        admin: '管理员',
        user: '普通用户',
        op: '实施人员',
      },
      total,
      copyList,
      getListData,
      pageChange,
      pageSizeChange,
      columns: [
        { title: '姓名', key: 'realName' },
        { title: '登录名', key: 'username' },
        { title: '邮箱', key: 'email' },
        { title: '角色', slot: 'roles' },
        { title: '出生日期', key: 'createDate' },
        { title: '操作', width: 100, align: 'center', slot: 'action' },
      ],
      // form
      user,
      formRef,
      editStatus,
      pageStatus,
      editLoading,
      openCreate,
      openEdit,
      backNormal,
      submitForm,
      resetForm,
      ruleValidate: {
        realName: [{ required: true, message: '真实名称必填', trigger: 'blur' }],
        username: [{ required: true, message: '用户名必填', trigger: 'blur' }],
      },
      modalVisible,
      handleCreate,
      handleCancel,
      handleEdit,
      handleSubmit,
      handleDelete,
    }
  },
}
</script>
