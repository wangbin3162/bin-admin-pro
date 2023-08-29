<template>
  <div class="theme-config-panel">
    <div class="group-panel">
      <div class="title">系统主题颜色</div>
      <div class="content">
        {{ themeConfigRef }}
        <b-color-picker
          size="small"
          v-model="themeConfigRef.binColorPrimary"
          show-label
          :colors="ThemeMainColors"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ThemeMainColors, themeConfigRef } from '@/hooks/theme'

defineOptions({
  name: 'ThemeConfig',
})
</script>

<style>
.theme-config-panel {
  padding: 20px;
  .group-panel {
    position: relative;
    /* display: inline-flex; */
    padding: 16px;
    border-radius: 4px;
    border: 1px solid var(--v-g-border-color);
    .title {
      position: absolute;
      height: 24px;
      line-height: 24px;
      background-color: var(--v-g-bg-color);
      top: -12px;
      left: 16px;
      padding: 0 8px;
      color: var(--v-g-text-color-dark);
    }
  }
}
</style>
