<template>
  <div class="page-header-wrap">
    <div class="page-header-wrap-page-header-warp">
      <div class="grid-content">
        <div class="page-header has-breadcrumb">
          <div class="page-header-heading">
            <b-popover trigger="hover" placement="right" width="" v-if="isBubbles">
              <span class="page-header-heading-title">
                {{ normalTitle }}
                <b-icon name="question-circle-fill"></b-icon>
              </span>
              <template #content>
                <div>{{ normalDesc }}</div>
              </template>
            </b-popover>
            <span class="page-header-heading-title" v-if="!isBubbles">{{ normalTitle }}</span>
            <slot name="right"></slot>
          </div>
          <div class="page-header-desc" v-if="$slots.desc">
            <slot name="desc">{{ normalDesc }}</slot>
          </div>
          <b-icon v-if="showClose" name="close" type="button" @click="$emit('close')"></b-icon>
        </div>
      </div>
    </div>
    <div class="grid-content">
      <div
        class="page-header-wrap-children-content"
        :class="{ 'has-bg': bg }"
        :style="{ padding: bg ? contentPadding : null }"
      >
        <slot></slot>
      </div>
    </div>

    <page-footer v-if="$slots.leftFooter || $slots.rightFooter">
      <template #left>
        <slot name="leftFooter" />
      </template>
      <template #right>
        <slot name="rightFooter" />
      </template>
    </page-footer>
  </div>
</template>

<script setup>
import PageFooter from './page-footer.vue'
import { computed } from 'vue'
import useMenu from '@/hooks/store/useMenu'

defineOptions({
  name: 'PageWrapper',
})
defineEmits(['close'])
const props = defineProps({
  title: String,
  desc: String,
  showClose: Boolean,
  bg: Boolean,
  isBubbles: {
    type: Boolean,
    default: false,
  },
  contentPadding: {
    type: String,
    default: '16px',
  },
})

const { getCurrentRouteMenu } = useMenu()

const normalTitle = computed(() =>
  props.title ? props.title : getCurrentRouteMenu() ? getCurrentRouteMenu().title : '',
)
const normalDesc = computed(() =>
  props.desc ? props.desc : getCurrentRouteMenu() ? getCurrentRouteMenu().desc : '',
)
</script>

<style>
.page-header-wrap {
  .page-header {
    position: relative;
    box-sizing: border-box;
    margin: 0;
    font-size: 14px;
    line-height: 1.5715;
    list-style: none;
    padding: 16px 24px;
    background-color: #fff;
    border-bottom: 1px solid var(--v-g-border-color);
    &-heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      overflow: hidden;
      &-title {
        color: #17233d;
        font-weight: 500;
        font-size: 18px;
        margin-bottom: 0;
        padding-right: 12px;
      }
    }
    &-desc {
      padding-top: 10px;
    }
    .b-icon-close {
      position: absolute;
      right: 24px;
      top: 16px;
      z-index: 1;
      font-weight: normal;
      cursor: pointer;
      font-size: 20px;
      margin-right: 6px;
      color: rgba(0, 0, 0, 0.65);
      &:hover {
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
  &-children-content {
    margin: 16px;
    &.has-bg {
      background-color: #fff;
    }
  }
}
.grid-content {
  width: 100%;
  min-height: 100%;
  transition: 0.3s;
}
</style>
