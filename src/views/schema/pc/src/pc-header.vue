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
          <pc-svg></pc-svg>
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
            <b-tooltip content="帮助" theme="light">
              <b-icon name="question-circle" size="18" type="button"></b-icon>
            </b-tooltip>
            <span class="primary-btn transparent" @click="handleSave">预览</span>
            <span class="primary-btn transparent" @click="handleSave">保存</span>
            <span class="primary-btn" @click="handleSave">保存并发布</span>
          </b-space>
        </div>
        <div class="cube-navigator">
          <b-dropdown trigger="click">
            <i class="iconfont svg-icon-wrapper icon-qbi-gengduo"
               data-spm-anchor-id="0.0.0.i22.7ecf4666dsN92y">
              <svg class="svg-icon" viewBox="0 0 1024 1024" aria-hidden="true" width="1em" height="1em"
                   fill="currentColor"
                   data-spm-anchor-id="0.0.0.i21.7ecf4666dsN92y">
                <path
                  d="M393.846154 787.692308h236.307692v236.307692H393.846154zM393.846154 393.846154h236.307692v236.307692H393.846154zM393.846154 0h236.307692v236.307692H393.846154z"
                  fill="" data-spm-anchor-id="0.0.0.i7.7ecf4666dsN92y"></path>
              </svg>
            </i>
            <template #dropdown>
              <b-dropdown-menu>
                <b-dropdown-item icon="file-copy">复制</b-dropdown-item>
              </b-dropdown-menu>
            </template>
          </b-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import PcSvg from '@/views/schema/pc/src/pc-svg.vue'

export default {
  name: 'pc-header',
  components: { PcSvg },
  emits: ['update:modelValue', 'save', 'back'],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    backUrl: {
      type: String,
    },
    pageStatus: {
      type: Object,
      default: () => ({}),
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
      height: 20px;
      > i {
        margin: 0 10px 0 14px;
        font-size: 20px;
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
    .primary-btn {
      cursor: pointer;
      display: inline-block;
      width: 100px;
      height: 28px;
      text-align: center;
      line-height: 26px;
      color: #ffffff;
      background-color: getColor();
      border: 1px solid getColor();
      border-radius: 14px;
      &.transparent {
        background-color: transparent;
      }
      + .primary-btn {
        margin-left: 14px;
      }
    }
  }
  .cube-navigator .iconfont {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;
    font-size: 16px;
    margin: 0 20px;
    position: relative;
    top: 2px;
  }
}
</style>
<style lang="stylus">
.bi-pc-container {
  .header-container {
    .bin-dropdown__popper.bin-popper[role=tooltip] {
      background-color: #0b1532;
    }
    .bin-dropdown-menu .bin-dropdown-item {
      color: #ced0d6
      &:hover {
        background: #2f3a5b;
      }
    }
  }
}
</style>
