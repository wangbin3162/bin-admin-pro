<template>
  <GroupPanel
    label="系统主颜色[binColorPrimary]"
    :defaultVal="Theme.binColorPrimary"
    :colors="ThemeMainColors"
    v-model="themeConfigRef.binColorPrimary"
    type="color"
    style="margin: 0"
  >
    <ul class="color-quick-list pt-16">
      <li
        v-for="(color, index) in ThemeMainColors"
        :key="index"
        :style="{ backgroundColor: color }"
        @click="setColor(color)"
      >
        <span>{{ ThemeMainColorsText[index] }}</span>
        <span>{{ ThemeMainColors[index] }}</span>
      </li>
    </ul>
  </GroupPanel>
</template>

<script setup>
import { Theme, ThemeMainColors, ThemeMainColorsText, themeConfigRef } from '@/hooks/theme'

import GroupPanel from '../src/GroupPanel.vue'

function setColor(color) {
  themeConfigRef.value.binColorPrimary = color
}
</script>

<style scoped>
.color-quick-list {
  margin-top: 8px;
  > li {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    transition: transform 0.2s;
    color: var(--v-g-fill-color-1);
    > span:last-child {
      transition: transform 0.2s;
      opacity: 0;
    }
    &:first-child {
      border-top-left-radius: var(--bin-border-radius-default);
      border-top-right-radius: var(--bin-border-radius-default);
    }
    &:last-child {
      border-bottom-left-radius: var(--bin-border-radius-default);
      border-bottom-right-radius: var(--bin-border-radius-default);
    }
    &:hover {
      transform: scale(1.02);
      box-shadow: 0 12px 16px rgba(0, 0, 0, 0.15);
      border-radius: var(--bin-border-radius-default);
      > span {
        opacity: 1;
      }
    }
  }
}
</style>
