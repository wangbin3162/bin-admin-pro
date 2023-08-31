<template>
  <GroupPanel label="侧边样式" simple style="margin: 0">
    <div class="theme-list">
      <div class="theme-item" v-for="(theme, index) in ThemeSiderPrefabs" :key="index">
        <example
          :label="theme.name"
          :primaryColor="theme.config.binColorPrimary"
          :leftColor="theme.config.vSiderBg"
          :class="{ active: isThemeActive(theme.config) }"
          @click="loadConfig(theme.config)"
        />
      </div>
    </div>
  </GroupPanel>
</template>

<script setup>
import { themeConfigRef } from '@/hooks/theme'
import Example from '../src/Example.vue'
import GroupPanel from '../src/GroupPanel.vue'
import { ThemeSiderPrefabs } from '../prefabs/theme-sider'

// 判断当前的主题是否启用
function isThemeActive(cfg) {
  return (
    themeConfigRef.value.vSiderBg === cfg.vSiderBg &&
    themeConfigRef.value.binColorPrimary === cfg.binColorPrimary
  )
}

function loadConfig(cfg) {
  themeConfigRef.value = { ...themeConfigRef.value, ...cfg }
}
</script>

<style scoped>
.theme-list {
  display: flex;
  flex-wrap: wrap;
  height: 395px;
  padding-top: 10px;
  .theme-item {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
    width: 25%;
  }
}
</style>
