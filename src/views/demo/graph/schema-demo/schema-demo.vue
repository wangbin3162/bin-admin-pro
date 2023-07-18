<template>
  <page-container>
    <div class="schema-demo-wrap">
      <div class="top-bar">
        <b-button @click="clickBtn">载入图片</b-button>
        <!-- <b-button @click="checkConfig">查看配置</b-button> -->
        <b-button @click="saveConfig">保存</b-button>
        <b-button @click="loadData" :disabled="!saveData">打开</b-button>
        <input
          style="display: none"
          type="file"
          id="imgfile"
          lay-verify="required"
          accept="image/jpeg,image/png,image/jpg"
          class="upload-button"
          @change="loadImage()"
        />
      </div>
      <SchemaEditor ref="schemaRef" />
    </div>

    <b-modal title="当前配置" v-model="configVisible" width="700px">
      <b-ace-editor :model-value="JSON.stringify(config, null, 2)" height="400px" />
    </b-modal>
  </page-container>
</template>

<script setup>
import { ref } from 'vue'
import { fileToImageBase64 } from '@/utils/file-helper'
import { Message } from 'bin-ui-next'
const schemaRef = ref(null)
const configVisible = ref(false)
const config = ref({})

const saveData = ref(null)

function clickBtn() {
  document.getElementById('imgfile').click()
}

function checkConfig() {
  config.value = schemaRef.value.getAllConfig()
  configVisible.value = true
}

function saveConfig() {
  saveData.value = schemaRef.value.getAllConfig()
  console.log(saveData.value)
  Message('保存成功')
}

function loadData() {
  console.log(saveData.value)
  schemaRef.value.setConfig(saveData.value)
}

function loadImage() {
  let file = document.getElementById('imgfile').files[0]
  fileToImageBase64(file).then(res => {
    // 载入图片
    schemaRef.value.loadBgImage(res)
  })
}
</script>

<style lang="stylus" scoped>
.schema-demo-wrap {
  .top-bar {
    padding: 10px 20px;
    background: #fff;
  }
}
</style>
