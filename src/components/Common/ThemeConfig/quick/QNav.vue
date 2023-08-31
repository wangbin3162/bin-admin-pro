<template>
  <GroupPanel label="导航栏样式" simple style="margin: 0">
    <div>aaa</div>
  </GroupPanel>
</template>

<script setup>
import { Theme, ThemeMainColors, ThemeMainColorsText, themeConfigRef } from '@/hooks/theme'

import GroupPanel from '../src/GroupPanel.vue'
</script>

<style scoped>
.theme-config-panel {
  padding: 20px 20px 0;
}
</style>
