<template>
  <div class="action-panel">
    <div class="header-container">
      <div class="simple-header-left">
        <b-tooltip content="返回" theme="light">
          <div class="simple-header-icon" @click="handleBack">
            <b-icon name="left" size="24"></b-icon>
          </div>
        </b-tooltip>
        <div class="simple-cube-icon">
          <cube-svg></cube-svg>
        </div>
        <input
          class="simple-header-input"
          placeholder="请输入名称"
          maxlength="50"
          type="text"
          v-model="name"
          @input="handleInputChange"
        >
      </div>
      <div class="simple-header-right">
        <div class="cube-btn" flex="cross:center">
          <b-space size="large">
            <b-tooltip content="另存为" theme="light">
              <b-icon name="file-copy" size="18" type="button"></b-icon>
            </b-tooltip>
            <b-tooltip content="帮助" theme="light">
              <b-icon name="question-circle" size="18" type="button"></b-icon>
            </b-tooltip>
            <b-button type="primary" round size="mini" style="width: 108px;" @click="handleSave">保存</b-button>
          </b-space>
        </div>
        <div class="cube-navigator">
          <b-icon name="barchart" size="16"></b-icon>
          开始分析
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import CubeSvg from '@/views/schema/cube/src/cube-svg.vue'

export default {
  name: 'cube-header',
  components: { CubeSvg },
  emits: ['update:modelValue', 'save', 'back'],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    backUrl: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const name = ref('')

    const handleBack = () => {
      emit('back', props.backUrl)
    }
    const handleSave = () => {
      emit('save')
    }

    const handleInputChange = (e) => {
      emit('update:modelValue', e.target.value.trim())
    }

    watch(() => props.modelValue, val => {
      name.value = val
    }, { immediate: true })

    return {
      name,
      handleSave,
      handleInputChange,
      handleBack,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../../assets/stylus/base/mixins.styl"
.action-panel {
  height: 50px;
  display: flex;
  background-color: getMenuBg();
  .header-container {
    width: 100%;
    height: 50px;
    background-color: getMenuBg();
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    .simple-header-left, .simple-header-right {
      height: 100%;
      display: flex;
      align-items: center;
    }
    .simple-header-icon {
      cursor: pointer;
      border-right: 1px solid hsla(0, 0%, 100%, .2);
      height: 50px;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .simple-cube-icon {
      > i {
        margin: 0 10px 0 14px;
        font-size: 18px;
      }
    }
    .simple-header-input {
      background-color: transparent;
      font-size: 16px;
      height: 30px;
      max-width: 236px;
      min-width: 30px;
      border: 1px solid transparent;
      border-radius: 0;
      color: #fff;
      line-height: 30px;
      padding: 4px 11px;
      outline: none;
      &:focus, &:active, &:focus-visible {
        border: 1px solid getColor();
      }
    }
  }
  .cube-btn {
    height: 100%;
  }
  .cube-navigator {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 108px;
    height: 100%;
    cursor: pointer;
    font-size: 12px;
    &:hover {
      background: #000;
    }
    > i {
      margin-right: 4px;
    }
  }
}
</style>
