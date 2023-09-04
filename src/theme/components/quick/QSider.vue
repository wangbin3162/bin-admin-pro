<template>
  <GroupPanel label="侧边样式" simple style="margin: 0">
    <div class="theme-list">
      <div class="theme-item" v-for="(theme, index) in ThemeSiderPrefabs" :key="index">
        <example
          :label="theme.name"
          :primaryColor="theme.config.binColorPrimary"
          :topColor="themeConfigRef.vHeaderBg"
          :leftColor="theme.config.vSiderBg"
          :class="{ active: isThemeActive(theme.config) }"
          @click="loadConfig(theme.config)"
        />
      </div>
    </div>
  </GroupPanel>
</template>

<script setup>
import { ThemeSiderPrefabs, themeConfigRef, isThemeActive, loadConfig } from '@/theme'
import Example from '../src/Example.vue'
import GroupPanel from '../src/GroupPanel.vue'
</script>

<style scoped>
.theme-list {
  height: 376px;
  .theme-item {
    display: inline-flex;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 8px;
    width: 25%;
    height: 64px;
  }
}
</style>
