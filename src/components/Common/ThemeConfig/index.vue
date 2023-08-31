<template>
  <b-modal
    v-model="visible"
    title="主题配置"
    draggable
    width="1400px"
    append-to-body
    :body-styles="{ backgroundColor: 'var(--v-content-bg)', maxHeight: '580px', overflowY: 'auto' }"
  >
    <g-basic></g-basic>
    <g-header></g-header>
    <g-sider></g-sider>
    <g-tags-view></g-tags-view>
    <g-table></g-table>
    <g-page></g-page>
    <template #footer>
      <b-button @click="loadConfig">载入主题文件</b-button>
      <b-button type="primary" @click="saveConfig">保存主题文件</b-button>
    </template>
  </b-modal>
</template>

<script setup>
import { computed } from 'vue'
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

<style></style>
