<template>
  <div class="flow-editor-container">
    <div class="flow-editor-panel">
      <div class="flow-editor-header" flex="main:justify">
        <div class="left" flex="cross:center">
          <i class="b-iconfont b-icon-left" @click="confirm = true"></i>
          <h4 class="header-title">作业流程配置</h4>
        </div>
        <b-space :size="20" style="margin-right: 8px">
          <b-button
            style="padding: 0 8px; --bin-border-radius-default: 6px"
            icon="message"
            @click="onSave"
          >
            Save
          </b-button>
          <b-button
            style="padding: 0 8px; --bin-border-radius-default: 6px"
            icon="message"
            @click="onRestore"
          >
            Restore
          </b-button>
          <b-button
            style="padding: 0 8px; --bin-border-radius-default: 6px"
            type="primary"
            plain
            icon="file-image"
            @click="handleExportImg"
          >
            保存图片
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
      <div class="flow-editor-content">
        <div class="flow-editor-flow"><FlowEditor /></div>
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
import { LoadingBar, Message } from 'bin-ui-design'
import { useRouter } from 'vue-router'
import { useVueFlow } from '@vue-flow/core'
import FlowEditor from './FlowEditor.vue'
import { createPreviewThumb } from '@/hooks/usePreviewImg'
import { getNow } from '@/utils/util'
import { dataURLtoFile } from '@/utils/file-helper'

defineOptions({
  name: 'FlowEditor',
})

const router = useRouter()

const confirm = ref(false)

const { toObject, fromObject, fitView } = useVueFlow()

function goBack(save = false) {
  router.push('/VueFlowCustom')
}

function logToObject() {
  const { nodes, edges } = toObject()
  console.log('--------------------------------------state--------------------------------------')
  console.log('----> nodes: ', nodes)
  console.log('----> edges: ', edges)
  console.log('---------------------------------------------------------------------------------')
}

const flowKey = 'example-flow'

function onSave() {
  const data = toObject()
  console.log('----> save Data: ', data)
  localStorage.setItem(flowKey, JSON.stringify(data))
}

function onRestore() {
  const flow = JSON.parse(localStorage.getItem(flowKey))
  console.log('----> restore Data: ', flow)

  if (flow) {
    fromObject(flow)
  }
}

// 导出图片
async function handleExportImg() {
  LoadingBar.start()

  try {
    await fitView()
    const el = document.querySelector('#flow-pane .custom-flow .vue-flow__viewport')
    const tumb = await createPreviewThumb(el)
    // 下载
    const link = document.createElement('a')
    link.download = `thumb_${getNow()}.png`
    link.href = tumb
    link.click()
    // 组装图片调用上传
    // const img = {
    //   name: 'fileName',
    //   attr: { w: el.clientWidth, h: el.clientHeight },
    //   file: dataURLtoFile(tumb, 'fileName'),
    // }
    // TODO 这里保存了base64格式的缩略图，实际可能需要调用一次上传后存储路径
    // await api.saveComps(selectGroup.value, selectedCom.value, tumbUrl)
  } catch (error) {
    console.error(error)
    Message.warning('图片导出失败，请重试。')
  }
  LoadingBar.done()
}
</script>

<style scope>
.flow-editor-container {
  height: 100%;
  position: fixed;
  z-index: 999;
  inset: 0px;
  .flow-editor-panel {
    display: flex;
    height: 100%;
    flex-direction: column;
    background: rgb(255, 255, 255);
  }
  .flow-editor-header {
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
  .flow-editor-content {
    min-height: 400px;
    flex: 1 0 0px;
    width: 100%;
    height: 0px;
    position: relative;
  }
  .flow-editor-flow {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    z-index: 0;
  }
}
</style>
