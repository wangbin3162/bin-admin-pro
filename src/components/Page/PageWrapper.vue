<template>
  <div class="page-header-wrap">
    <div class="page-header-wrap-page-header-warp">
      <div class="grid-content">
        <div class="page-header has-breadcrumb">
          <div class="page-header-heading">
            <span class="page-header-heading-title">{{ normalTitle }}</span>
            <b-icon v-if="showClose" name="close" @click="$emit('close')"></b-icon>
          </div>
          <div class="page-header-desc" v-if="$slots.desc || desc">
            <slot name="desc">{{ desc }}</slot>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-content">
      <div
        class="page-header-wrap-children-content"
        :class="{'has-bg':bg}"
        :style="{padding:bg?contentPadding:null}"
      >
        <slot>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import useSetting from '@/hooks/useSetting'
import useMenu from '@/hooks/useMenu'

export default {
  name: 'PageWrapper',
  props: {
    title: String,
    desc: String,
    showClose: Boolean,
    bg: Boolean,
    contentPadding: {
      type: String,
      default: '16px'
    }
  },
  emits: ['close'],
  setup(props) {
    const { showTagsView } = useSetting()
    const { getCurrentRouteMenu } = useMenu()
    const normalTitle = computed(() => props.title ? props.title : getCurrentRouteMenu().title || 'no-title')
    return {
      normalTitle,
      showTagsView
    }
  }
}
</script>

<style scoped lang="stylus">
.page-header-wrap {
  .page-header {
    box-sizing: border-box;
    margin: 0;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    position: relative;
    padding: 16px 24px;
    background-color: #fff;
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
      .b-icon-close {
        font-weight: normal;
        cursor: pointer;
        font-size: 20px;
        margin-right: 6px;
        color: rgba(0, 0, 0, .65);
        &:hover {
          color: rgba(0, 0, 0, .85);
        }
      }
    }
    &-desc {
      padding-top: 8px;
      overflow: hidden;
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
  transition: .3s;
}
</style>
