<template>
  <page-wrapper desc="页面内容为Mock数据，仅作示例使用。">
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
            <b-button type="primary" :loading="loading" @click="getDataSource">查询</b-button>
          </b-form-item>
        </b-form>
      </template>
      <template #action>
        <b-button type="primary" icon="plus-circle" @click="handleCreate">新增</b-button>
      </template>
      <b-table :columns="columns" :data="copyList" :loading="loading" border>
        <template #status="{row}">
          {{ statusMap[row.status] }}
        </template>
        <template #action="{row}">
          <action-button
            icon="edit-square"
            is-icon
            tooltip="编辑"
            @click="handleEdit(row)"
          ></action-button>
          <action-button
            icon="delete"
            color="danger"
            is-icon
            tooltip="删除"
            confirm
            @click="handleDelete(row)"
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
    <b-modal
      :model-value="modalVisible"
      :title="`${pageStatus.isCreate?'新增':'修改'}角色`"
      @closed="handleCancel"
    >
      <div v-if="modalVisible">
        <b-form
          ref="formRef"
          :model="role"
          :rules="ruleValidate"
          label-width="100px"
          label-suffix=":"
        >
          <b-form-item label="角色名称" prop="roleName">
            <b-input v-model="role.roleName" placeholder="输入角色名称" clearable></b-input>
          </b-form-item>
          <b-form-item label="角色编码" prop="roleCode">
            <b-input v-model="role.roleCode" placeholder="输入角色编码" clearable></b-input>
          </b-form-item>
          <b-form-item label="角色状态">
            <b-switch size="large" v-model="role.status" true-value="1" false-value="0">
              <template #open><span>启用</span></template>
              <template #close><span>禁用</span></template>
            </b-switch>
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
  </page-wrapper>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { computed, reactive, ref, watch } from 'vue'
import useTable from '@/hooks/service/useTable'
import { getRoleList } from '@/api/modules/role.api'
import ActionButton from '@/components/ActionButton'
import PageWrapper from '@/components/Page/PageWrapper'
import useForm from '@/hooks/service/useForm'
import { Message } from 'bin-ui-next'

export default {
  name: 'Role',
  components: {
    PageWrapper,
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
    const role = ref({})
    const {
      loading,
      list,
      total,
      getDataSource,
      pageChange,
      pageSizeChange
    } = useTable(getRoleList, query)
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
      setBtnLoading
    } = useForm()
    const modalVisible = computed(() => pageStatus.value.isCreate || pageStatus.value.isEdit)

    watch(() => list.value, (val) => {
      copyList.value = val
    })

    // 执行一次内容
    getDataSource()

    function handleCreate() {
      role.value = {
        roleName: '',
        roleCode: '',
        status: '1'
      }
      openCreate()
    }

    function handleEdit(row) {
      role.value = {
        ...row
      }
      openEdit()
    }

    function handleCancel() {
      role.value = {}
      backNormal()
    }

    function handleDelete() {
      Message.success('删除成功！')
      getDataSource()
    }

    function handleSubmit() {
      submitForm(() => {
        setBtnLoading(true)
        const status = pageStatus.value
        setTimeout(() => {
          Message.success(`${status.isCreate ? '新增' : '修改'}成功！`)
          setBtnLoading(false)
          backNormal()
          getDataSource()
        }, 1000)
      })
    }

    return {
      statusMap: {
        0: '禁用',
        1: '启用'
      },
      columns: [
        {
          title: '角色名称',
          key: 'roleName'
        },
        {
          title: '角色编码',
          key: 'roleCode'
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
      // form
      formRef,
      role,
      editStatus,
      pageStatus,
      editLoading,
      openCreate,
      openEdit,
      backNormal,
      submitForm,
      resetForm,
      ruleValidate: {
        roleName: [{ required: true, message: '角色名称必填', trigger: 'blur' }],
        roleCode: [{ required: true, message: '角色编码必填', trigger: 'blur' }]
      },
      // list
      query,
      loading,
      total,
      copyList,
      getDataSource,
      pageChange,
      pageSizeChange,
      modalVisible,
      handleCreate,
      handleCancel,
      handleEdit,
      handleSubmit,
      handleDelete
    }
  }
}
</script>
