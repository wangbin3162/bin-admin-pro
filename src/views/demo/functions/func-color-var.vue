<template>
  <page-wrapper
    title="基础颜色"
    desc="基础颜色，系统主题会默认注入不同的主色和颜色，这里可以动态设置颜色查看效果"
  >
    <theme-config />
    <template #rightFooter>
      <b-button @click="loadConfig">载入配置</b-button>
      <b-button type="primary" @click="saveConfig">保存当前配置</b-button>
    </template>
  </page-wrapper>
</template>

<script setup>
import { exportJson } from '@/hooks/theme/export-file'
import { themeConfigRef } from '@/hooks/theme/index'
defineOptions({
  name: 'FuncColorVar',
})

function loadConfig() {}

function saveConfig() {
  exportJson(themeConfigRef.value)
}
</script>

<style scoped>
.block {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  width: 200px;
  height: 60px;
  border-radius: 4px;
  margin: 0 20px 0 0;
}
[data-theme='light'] .block.menu {
  color: #333;
}
</style>
