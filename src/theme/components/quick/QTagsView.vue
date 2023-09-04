<template>
  <GroupPanel label="多页签样式" simple style="margin: 0">
    <div class="theme-list">
      <div
        class="theme-item"
        v-for="(theme, index) in ThemeTagsPrefabs"
        :key="index"
        @click="loadConfig(theme.config)"
      >
        <div class="inner">
          <div class="tag-wrap" :style="{ backgroundColor: theme.config.vTagsBgColor }">
            <span
              class="tag"
              :style="{
                borderRadius: theme.config.vTagsItemBorderRadius,
                color: theme.config.vTagsTextColor,
                backgroundColor: theme.config.vTagsItemBgColor,
                borderColor: theme.config.vTagsItemBorderColor,
              }"
            >
              默认标签
            </span>
            <span
              class="tag hover"
              :style="{
                borderRadius: theme.config.vTagsItemBorderRadius,
                color: theme.config.vTagsTextHoverColor,
                backgroundColor: theme.config.vTagsItemBgHoverColor,
                borderColor: theme.config.vTagsItemBorderHoverColor,
              }"
            >
              标签悬停
            </span>
            <span
              class="tag active"
              :style="{
                borderRadius: theme.config.vTagsItemBorderRadius,
                color: theme.config.vTagsTextActiveColor,
                backgroundColor: theme.config.vTagsItemBgActiveColor,
                borderColor: theme.config.vTagsItemBorderActiveColor,
              }"
            >
              标签激活
            </span>
            <span
              class="tag"
              :style="{
                borderRadius: theme.config.vTagsItemBorderRadius,
                color: theme.config.vTagsTextColor,
                backgroundColor: theme.config.vTagsItemBgColor,
                borderColor: theme.config.vTagsItemBorderColor,
              }"
            >
              默认标签
            </span>
          </div>
          <div class="label">
            {{ theme.name }}
            <i v-show="isThemeActive(theme.config)" class="b-iconfont b-icon-check"></i>
          </div>
        </div>
      </div>
    </div>
  </GroupPanel>
</template>

<script setup>
import { ThemeTagsPrefabs, isThemeActive, loadConfig } from '@/theme'

import GroupPanel from '../src/GroupPanel.vue'
</script>

<style scoped>
.theme-list {
  height: 376px;
  padding-top: 8px;
  .theme-item {
    display: inline-flex;
    justify-content: center;
    width: 100%;
    height: 60px;
    .inner {
      position: relative;
      width: 100%;
      cursor: pointer;
      .tag-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        height: 38px;
        width: 100%;
        box-shadow: 0 2px 4px #0000001f, 0 0 6px #0000000a;
        .tag {
          font-size: 12px;
          padding: 0 8px;
          height: 28px;
          line-height: 26px;
          border-width: 1px;
          border-style: solid;
          + .tag {
            margin-left: 4px;
          }
        }
      }
      .label {
        position: relative;
        width: 100%;
        font-size: 12px;
        text-align: center;
        line-height: 22px;
        > i.b-icon-check {
          position: absolute;
          color: var(--bin-color-primary);
          right: 100px;
        }
      }
    }
    + .theme-item {
      margin-top: 4px;
    }
  }
}
</style>
