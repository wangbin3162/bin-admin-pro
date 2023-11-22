<template>
  <page-wrapper
    v-if="modalVisible"
    :title="`${currentSheet.name ? `[${currentSheet.name}] ` : ''}数据查看`"
    show-close
    @close="handleCancel"
  >
    <base-table>
      <template #action>
        <b-button type="primary" icon="plus" @click="handleCreate">新增</b-button>
      </template>
      <b-table :columns="columns" :data="list" :loading="loading" size="small">
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
            icon="edit"
            is-icon
            tooltip="表单编辑"
            @click="handleEditSimple(row)"
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
  </page-wrapper>
</template>

<script setup>
import { reactive, ref, onBeforeUnmount } from 'vue'
import { deepCopy } from '@/utils/util'
import * as api from '@/api/modules/excel.api'
import { useRouter } from 'vue-router'
import { Message } from 'bin-ui-design'
import { listenMsg } from '@/utils/cross-tab-msg'

defineOptions({
  name: 'SysRole',
})

const emit = defineEmits(['close'])

const modalVisible = ref(false)
const router = useRouter()

const query = reactive({
  tempId: '',
})
const columns = ref([])

const currentSheet = ref({})
const loading = ref(false)
const list = ref([])

// 初始化列
function initColumns() {
  const mapping = deepCopy(currentSheet.value.mapping)
  columns.value = [{ title: '序号', width: 70, align: 'center', type: 'index' }]

  mapping.forEach((item, index) => {
    if (index < 5) {
      columns.value.push({
        title: item.fieldTitle,
        key: item.fieldName,
      })
    }
  })
  columns.value.push({ title: '操作', width: 150, align: 'center', slot: 'action' })
}

// 新增数据
function handleCreate() {
  let routeData = router.resolve({
    path: '/data-edit',
    query: { tempId: query.tempId },
  })
  window.open(routeData.href, '_blank')
}

// 编辑模板
function handleEdit({ id }) {
  let routeData = router.resolve({
    path: '/data-edit',
    query: { tempId: query.tempId, id },
  })
  window.open(routeData.href, '_blank')
}
// 编辑模板
function handleEditSimple({ id }) {
  let routeData = router.resolve({
    path: '/data-edit-simple',
    query: { tempId: query.tempId, id },
  })
  window.open(routeData.href, '_blank')
}

// 删除一条数据填报
function handleDelete({ id }) {
  api.removeSheetData(id).then(() => {
    Message.success('删除成功！')
    queryList()
  })
}
// 查询列表
async function queryList() {
  try {
    loading.value = true
    const { rows } = await api.getSheetDataList(query)
    list.value = rows.map(i => ({
      id: i.id,
      tempId: i.tempId,
      tempName: i.tempName,
      ...i.data,
    }))
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

function open(data) {
  modalVisible.value = true
  currentSheet.value = deepCopy(data)
  query.tempId = data.id

  initColumns()
  queryList()
}

function handleCancel() {
  modalVisible.value = false
  emit('close')
}

defineExpose({ open })

// 监听跨tab页签消息
const cancelListen = listenMsg(queryList)
onBeforeUnmount(cancelListen)
</script>
