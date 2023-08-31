<template>
  <b-modal
    v-model="visible"
    title="主题配置"
    draggable
    width="1400px"
    append-to-body
    :body-styles="{ backgroundColor: 'var(--v-content-bg)', maxHeight: '600px', overflowY: 'auto' }"
  >
    <div class="top-tab">
      <b-radio-group v-model="activeTab" type="capsule" size="large">
        <b-radio label="basic">快捷配置</b-radio>
        <b-radio label="advanced">高级配置</b-radio>
      </b-radio-group>
    </div>

    <div v-if="activeTab === 'basic'" class="config-content base-config">
      <b-collapse-wrap title="快捷配置" shadow="none" collapse>
        <div class="p20">
          <b-row :gutter="16">
            <b-col span="6">
              <q-primary></q-primary>
            </b-col>
            <b-col span="6">
              <q-sider></q-sider>
            </b-col>
            <b-col span="6">
              <q-nav></q-nav>
            </b-col>
            <b-col span="6">
              <q-tags-view></q-tags-view>
            </b-col>
          </b-row>
        </div>
      </b-collapse-wrap>
    </div>
    <div v-else class="config-content advanced-config">
      <g-basic></g-basic>
      <g-header></g-header>
      <g-sider></g-sider>
      <g-tags-view></g-tags-view>
      <g-table></g-table>
      <g-page></g-page>
    </div>

    <template #footer>
      <div style="width: 100%" flex="main:justify">
        <b-button icon="close" type="danger" @click="resetConfig">重置主题</b-button>
        <div>
          <b-button icon="reload" @click="loadConfig">载入主题文件</b-button>
          <b-button type="primary" icon="file-copy" @click="copyConfig">复制主题配置</b-button>
          <b-button type="primary" icon="save" @click="saveConfig">保存主题文件</b-button>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import QPrimary from './quick/QPrimary.vue'
import QSider from './quick/QSider.vue'
import QNav from './quick/QNav.vue'
import QTagsView from './quick/QTagsView.vue'
import GBasic from './group/GBasic.vue'
import GHeader from './group/GHeader.vue'
import GSider from './group/GSider.vue'
import GTagsView from './group/GTagsView.vue'
import GTable from './group/GTable.vue'
import GPage from './group/GPage.vue'
import { exportJson, loadJsonFile, getChangedProperties } from '@/hooks/theme/utils'
import { themeConfigRef, Theme } from '@/hooks/theme'
import { Message, MessageBox } from 'bin-ui-next'
import { copyText } from '@/utils/util'

defineOptions({
  name: 'ThemeConfig',
})
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
})

const visible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})
const activeTab = ref('basic')

watch(
  () => props.modelValue,
  val => {
    if (val) activeTab.value = 'basic'
  },
)

// 重置主题
function resetConfig() {
  MessageBox.confirm({
    type: 'error',
    title: '提示',
    message: '<p>确认<span style="color:red;">重置</span>主题么?</p>',
    useHTML: true,
  })
    .then(() => {
      themeConfigRef.value = { ...Theme }
      Message.success('重置成功!')
    })
    .catch(() => {})
}

function loadConfig() {
  loadJsonFile().then(data => {
    themeConfigRef.value = { ...themeConfigRef.value, ...data }
  })
}

function copyConfig() {
  const obj = getChangedProperties(Theme, themeConfigRef.value)
  const jsonStr = JSON.stringify(obj, null, 2)
  copyText(jsonStr)
  Message.success('已复制配置至剪切板！')
}

function saveConfig() {
  const obj = getChangedProperties(Theme, themeConfigRef.value)
  exportJson(obj)
}
</script>

<style scoped>
.top-tab {
  background-color: var(--v-g-bg-color);
  padding: 4px;
  text-align: center;
  :deep(.bin-radio-group-capsule) {
    width: 100%;
    .bin-radio {
      width: 50%;
    }
  }
}
.config-content {
  background-color: var(--v-content-bg);
  padding: 8px 0 0;
}
.advanced-config {
  :deep(.bin-collapse-wrap) {
    margin: 0;
  }
}
</style>
