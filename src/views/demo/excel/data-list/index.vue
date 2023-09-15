<template>
  <div>
    <page-wrapper v-show="!dataTableShow">
      <div class="filter-wrap">
        <b-form label-width="95px" inline>
          <b-form-item label="报表名称">
            <b-input v-model="query.name" clearable></b-input>
          </b-form-item>
          <b-form-item label-width="16px">
            <b-button type="primary" :loading="loading" @click="handleSearch">查询</b-button>
            <b-button @click="handleReset">重置</b-button>
          </b-form-item>
        </b-form>
      </div>

      <div class="list-wrapper">
        <TransitionGroup tag="div" name="fade" class="card-list-wrap">
          <div class="card-item" key="add">
            <b-button icon="plus" dashed style="height: 175px; width: 100%" @click="handleCreate">
              新增表单
            </b-button>
          </div>
          <div v-for="item in list" :key="item.id" class="card-item">
            <b-card
              class="app-item"
              :style="{ width: '100%', height: '175px', margin: '0' }"
              :body-style="{ padding: 0 }"
              shadow="never"
            >
              <div class="p16">
                <div flex="cross:center">
                  <div class="item-title">{{ item.name }}</div>
                </div>
              </div>
              <div>
                <div class="item-author">上报数量：{{ item.reportCount }}</div>
                <div class="item-desc">字段数量：{{ item.mapping.length }}</div>
              </div>
              <div class="item-extra">
                <b-row>
                  <b-col span="8">
                    <b-tooltip content="新增填报">
                      <b-icon
                        name="plus-circle"
                        color="#1089ff"
                        type="button"
                        @click="handleWriteData(item, '/data-edit')"
                      ></b-icon>
                    </b-tooltip>
                  </b-col>
                  <b-col span="8">
                    <b-tooltip content="表单填报">
                      <b-icon
                        name="file-add"
                        type="button"
                        color="#fa8c16"
                        @click="handleWriteData(item, '/data-edit-simple')"
                      ></b-icon>
                    </b-tooltip>
                  </b-col>
                  <b-col span="8">
                    <b-tooltip content="查看数据">
                      <b-icon
                        name="filesearch"
                        type="button"
                        color="#13c2c2"
                        @click="handleCheckData(item)"
                      ></b-icon>
                    </b-tooltip>
                  </b-col>
                </b-row>
              </div>
            </b-card>
          </div>
        </TransitionGroup>
        <div v-if="loading" style="height: 175px">
          <b-loading style="background: transparent"></b-loading>
        </div>
        <b-empty v-if="list.length === 0">暂无已发布填报</b-empty>
      </div>
    </page-wrapper>

    <DataTable ref="dataTableRef" v-if="dataTableShow" @close="handleCancel" />
  </div>
</template>

<script setup>
import { reactive, onBeforeUnmount, ref, nextTick } from 'vue'
import useTable from '@/hooks/service/useTable'
import * as api from '@/api/modules/excel.api'
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
  isPublish: '1',
})
const router = useRouter()
const dataTableRef = ref(null)
const dataTableShow = ref(false)

const { loading, list, handleSearch, getListData } = useTable(api.getExcelList, query)

handleSearch()

// 重置查询
function handleReset() {
  query.name = ''
  handleSearch()
}

// 数据填报链接跳转
function handleWriteData({ id }, path = '/data-edit') {
  let routeData = router.resolve({
    path,
    query: { tempId: id },
  })
  window.open(routeData.href, '_blank')
}

// 新增模板
function handleCreate() {
  let routeData = router.resolve({
    path: '/excel-edit',
    query: {},
  })
  window.open(routeData.href, '_blank')
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
// 监听跨tab页签消息
const cancelListen = listenMsg(getListData)
onBeforeUnmount(cancelListen)
</script>

<style scoped>
.filter-wrap {
  background: #fff;
  margin-bottom: 16px;
  padding-top: 20px;
}
.list-wrapper {
  position: relative;
}
.card-list-wrap {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: -8px -8px 0;

  .card-item {
    width: 25%;
    padding: 8px;
    .app-item {
      display: inline-block;
      width: 48%;
      margin: 0 16px 16px 0;
      .item-title {
        font-weight: 600;
        color: var(--v-g-text-color-dark);
        margin-left: 6px;
        height: 32px;
        line-height: 32px;
        font-size: 18px;
      }
      .item-desc,
      .item-author {
        color: var(--v-g-text-color);
        padding: 0 24px;
        margin-bottom: 6px;
      }
      .item-extra {
        margin-top: 16px;
        border-top: 1px solid #f0f0f0;
        padding: 8px 0;
        text-align: center;
        :deep(.bin-col) {
          border-right: 1px solid #e8eaec;
        }
        :deep(.bin-col:last-child) {
          border-right: none;
        }
        i {
          font-size: 20px;
          cursor: pointer;
          line-height: 32px;
        }
        a {
          display: inline-block;
          line-height: 32px;
          color: var(--v-g-text-color);
        }
      }
    }

    /* 1. 声明过渡效果 */
    &.fade-move,
    &.fade-enter-active,
    &.fade-leave-active {
      transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }

    /* 2. 声明进入和离开的状态 */
    &.fade-enter-from,
    &.fade-leave-to {
      opacity: 0;
      transform: scaleY(0.01) translate(30px, 0);
    }

    /* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
    &.fade-leave-active {
      position: absolute;
    }
  }
}
</style>
