<template>
  <b-modal
    v-model="visible"
    title="主题配置"
    draggable
    width="1400px"
    append-to-body
    :body-styles="{ backgroundColor: 'var(--v-content-bg)', maxHeight: '580px', overflowY: 'auto' }"
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
      <div class="t-center pt-16">
        <b-button @click="loadConfig">载入主题文件</b-button>
        <b-button type="primary" @click="saveConfig">保存主题文件</b-button>
      </div>
    </div>
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

function loadConfig() {
  loadJsonFile().then(data => {
    themeConfigRef.value = { ...Theme, data }
  })
}

function saveConfig() {
  const obj = getChangedProperties(Theme, themeConfigRef.value)
  exportJson(obj)
}
</script>

<style scoped>
.top-tab {
  background-color: var(--v-g-bg-color);
  padding: 8px;
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
  padding: 8px 0;
}
.advanced-config {
  :deep(.bin-collapse-wrap) {
    margin: 0;
  }
}
</style>
