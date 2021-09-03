<template>
  <div class="bin-result">
    <div :class="iconClass">
      <b-icon :name="iconName"></b-icon>
    </div>
    <div class="bin-result-title">{{ statusText }}</div>
    <div class="bin-result-desc" v-if="$slots.desc">
      <slot name="desc"></slot>
    </div>
    <div class="bin-result-extra" :class="{'is-white-bg':extraWhite}" v-if="$slots.extra">
      <slot name="extra"></slot>
    </div>
    <div class="bin-result-actions" v-if="$slots.actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Result',
  props: {
    status: {
      type: String,
      validator: (val) => ['success', 'error'].includes(val),
      default: 'success',
    },
    statusMap: {
      type: Object,
      default() {
        return {
          success: '提交成功',
          error: '提交失败',
        }
      },
    },
    extraWhite: Boolean,
  },
  computed: {
    iconClass() {
      return `bin-result-icon bin-result-icon-${this.status}`
    },
    iconName() {
      const iconMap = {
        success: 'check-circle-fill',
        error: 'close-circle-fill',
      }
      return iconMap[this.status]
    },
    statusText() {
      return this.statusMap[this.status]
    },
  },
}
</script>

<style scoped lang="stylus">
.bin-result {
  width: 70%;
  margin: 0 auto;
  text-align: center;
  padding: 48px 32px;
  .bin-result-icon {
    display: inline-block;
    width: 72px;
    border-radius: 50%;
    margin-bottom: 24px;
    i {
      font-size: 72px;
    }
    &-error i {
      color: #f5222d;
    }
    &-success i {
      color: #52c41a;
    }
  }
  .bin-result-title {
    margin-bottom: 16px;
    color: #17233d;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }
  .bin-result-desc {
    margin-bottom: 24px;
    color: #808695;
    font-size: 14px;
    line-height: 22px;
  }
  .bin-result-extra {
    padding: 24px 40px;
    text-align: left;
    background: #f8f8f9;
    border-radius: 4px;
    &.is-white-bg {
      background: #fff;
      border: 1px solid #f8f8f9;
      box-shadow: 0 0 4px rgba(0, 0, 0, .1);
    }
  }
  .bin-result-actions {
    margin-top: 32px;
  }
}
</style>
