<template>
  <div class="ad-edit-container">
    <div class="ad-edit-panel">
      <div class="ad-edit-header" flex="main:justify">
        <div class="left" flex="cross:center">
          <i class="b-iconfont b-icon-left" @click="confirm = true"></i>
          <h4 class="header-title">作业流程配置</h4>
        </div>
        <b-space :size="20" style="margin-right: 8px">
          <b-button style="padding: 0 8px; --bin-border-radius-default: 6px" icon="message">
            测试
          </b-button>
          <b-button
            style="padding: 0 8px; --bin-border-radius-default: 6px"
            type="primary"
            icon="save"
          >
            保存
          </b-button>
        </b-space>
      </div>
      <div class="ad-edit-content">
        <div class="ad-edit-flow"><FlowEditor /></div>
      </div>
    </div>

    <b-modal v-model="confirm" width="420px">
      <div class="p8">
        <div class="f-s-18" flex="cross:center">
          <b-icon name="info-circle" size="24" color="#fa8c16"></b-icon>
          <span class="ml-8">操作确认</span>
        </div>
        <div style="padding: 8px 0 8px 32px">您即将退出高级编排页面，请确认</div>
        <div class="t-right">
          <b-button @click="goBack">不保存</b-button>
          <b-button type="primary" @click="goBack(true)">保存并退出</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FlowEditor from './components/FlowEditor.vue'

defineOptions({
  name: 'AdEdit',
})

const router = useRouter()

const confirm = ref(false)

function goEdit() {
  router.push('/ad-edit')
}

function goBack(save = false) {
  router.push('/VueFlowCustom')
}
</script>

<style scope>
.ad-edit-container {
  height: 100%;
  position: fixed;
  z-index: 999;
  inset: 0px;
  .ad-edit-panel {
    display: flex;
    height: 100%;
    flex-direction: column;
    background: rgb(255, 255, 255);
  }
  .ad-edit-header {
    display: flex;
    padding: 10px 24px;
    height: 52px;
    border-bottom: 1px solid rgb(223, 226, 234);
    -webkit-box-align: center;
    align-items: center;
    user-select: none;
    background: #fbfbfc;
    .b-icon-left {
      border: 1px solid rgb(223, 226, 234);
      padding: 5px;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        color: var(--bin-color-primary);
      }
    }
    .header-title {
      font-size: 18px;
      font-weight: normal;
      margin-left: 24px;
    }
    :deep(.bin-button) {
      color: red;
      --b-icon-size: 20px;
    }
  }
  .ad-edit-content {
    min-height: 400px;
    flex: 1 0 0px;
    width: 100%;
    height: 0px;
    position: relative;
  }
  .ad-edit-flow {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    z-index: 0;
  }
}
</style>
