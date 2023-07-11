<template>
  <page-container>
    <div class="schema-demo-wrap">
      <div class="top-bar">
        <b-button @click="clickBtn">载入图片</b-button>
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
  </page-container>
</template>

<script setup>
import { ref } from 'vue'
import { fileToImageBase64 } from '@/utils/file-helper'
const schemaRef = ref(null)

function clickBtn() {
  document.getElementById('imgfile').click()
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
