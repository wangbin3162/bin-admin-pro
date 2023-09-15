<template>
  <div>
    <page-wrapper v-show="!dataTableShow">
      <base-table>
        <template #filter>
          <b-form label-width="95px">
            <b-form-item label="表单名称">
              <b-input v-model="query.name" clearable></b-input>
            </b-form-item>
            <b-form-item label-width="16px">
              <b-button type="primary" :loading="loading" @click="handleSearch">查询</b-button>
              <b-button @click="handleReset">重置</b-button>
            </b-form-item>
          </b-form>
        </template>

        <template #action>
          <b-button type="primary" icon="plus" @click="handleCreate">新增</b-button>
        </template>

        <b-table :columns="columns" :data="list" :loading="loading" size="small">
          <template #isPublish="{ row }">
            <action-button
              type="text"
              icon="play-circle"
              color="success"
              is-icon
              tooltip="发布"
              message="确定发布当前报表么?"
              confirm
              :disabled="row.isPublish === '1'"
              @click="handlePublish(row)"
            ></action-button>
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
              icon="file-add"
              color="#fa8c16"
              is-icon
              tooltip="数据填报"
              @click="handleWriteData(row)"
            ></action-button>
            <b-divider type="vertical"></b-divider>
            <action-button
              type="text"
              icon="filesearch"
              color="#13c2c2"
              is-icon
              tooltip="查看数据"
              @click="handleCheckData(row)"
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

        <template #page>
          <b-page
            :total="total"
            :current="query.page"
            :page-size="query.size"
            show-total
            @change="pageChange"
          ></b-page>
        </template>
      </base-table>
    </page-wrapper>

    <DataTable ref="dataTableRef" v-if="dataTableShow" @close="handleCancel" />
  </div>
</template>

<script setup>
import { reactive, onBeforeUnmount, ref, nextTick } from 'vue'
import useTable from '@/hooks/service/useTable'
import * as api from '@/api/modules/excel.api'
import { Message } from 'bin-ui-next'
import { useRouter } from 'vue-router'
import { listenMsg } from '@/utils/cross-tab-msg'
import DataTable from '../data-table/index.vue'

defineOptions({
  name: 'ExcelList',
})

const query = reactive({
  page: 1,
  size: 10,
  name: '',
  isPublish: '',
})
const dataTableRef = ref(null)
const dataTableShow = ref(false)
const router = useRouter()

const columns = [
  { title: '序号', width: 70, align: 'center', type: 'index' },
  { title: '表单名称', key: 'name' },
  { title: '上报数量', key: 'reportCount' },
  { title: '记录个数', key: 'records' },
  { title: '发布', width: 100, align: 'center', slot: 'isPublish' },
  { title: '操作', width: 200, align: 'center', slot: 'action' },
]

const { loading, list, total, handleSearch, getListData, pageChange } = useTable(
  api.getExcelList,
  query,
)

handleSearch()

// 重置查询
function handleReset() {
  query.name = ''
  handleSearch()
}

// 新增模板
function handleCreate() {
  let routeData = router.resolve({
    path: '/excel-edit',
    query: {},
  })
  window.open(routeData.href, '_blank')
}

// 编辑模板
function handleEdit({ id }) {
  let routeData = router.resolve({
    path: '/excel-edit',
    query: { id },
  })
  window.open(routeData.href, '_blank')
}

// 发布模板
function handlePublish({ id }) {
  api.publishTemplate(id).then(() => {
    Message.success('发布成功！')
    getListData()
  })
}

// 删除模板
function handleDelete({ id }) {
  api.removeTemplate(id).then(() => {
    Message.success('删除成功！')
    getListData()
  })
}

// 查看数据
async function handleCheckData({ id }) {
  const detail = await api.getTempDetail(id)
  dataTableShow.value = true
  await nextTick()
  dataTableRef.value.open(detail)
}

function handleCancel() {
  dataTableShow.value = false
}

// 数据填报链接跳转
function handleWriteData({ id }) {
  let routeData = router.resolve({
    path: '/data-edit',
    query: { tempId: id },
  })
  window.open(routeData.href, '_blank')
}

// 监听跨tab页签消息
const cancelListen = listenMsg(getListData)
onBeforeUnmount(cancelListen)
</script>
