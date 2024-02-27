<template>
  <div>
    <b-alert show-icon>
      说明
      <template #desc>
        <p>
          1、Lottie 是 Airbnb 开源的一套跨平台的完整的动画效果解决方案,设计师可以使用 AE
          设计动画之后,使用 Lottic 提供的 Bodymovin 插件将设计好的动画导出成 JSON 格式
        </p>
        <p>2、好处就是大小很小，且可以自由进行控制和使用，矢量</p>
        <p>
          2、
          <a href="http://airbnb.io/lottie/#/web" target="_blank">lottie docs</a>
          <b-divider type="vertical"></b-divider>
          <a href="https://github.com/airbnb/lottie-web" target="_blank">lottie-web</a>
          <b-divider type="vertical"></b-divider>
          <a href="https://lottiefiles.com/" target="_blank">lottiefiles</a>
        </p>
      </template>
    </b-alert>
    <b-row :gutter="16">
      <b-col span="12">
        <div flex>
          <div class="rabbit" ref="imgRef1"></div>
          <div class="rabbit" ref="imgRef2"></div>
        </div>
      </b-col>
      <b-col span="12">
        <b-collapse-wrap title="代码示例">
          <b-ace-editor
            :model-value="STR"
            lang="typescript"
            readonly
            theme="sqlserver"
            height="400px"
            :snippets="false"
          ></b-ace-editor>
        </b-collapse-wrap>
      </b-col>
    </b-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getImageUrl } from '../util'
import lottie from 'lottie-web'

const imgRef1 = ref(null)
const imgRef2 = ref(null)

const localPath = getImageUrl('animation.json')
const webPath = 'https://lottie.host/25a9ea9f-2a78-446c-a9e0-9b11dcb20aee/mdJJIHHT6p.json'

async function init() {
  lottie.loadAnimation({
    container: imgRef1.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: localPath,
  })
  lottie.loadAnimation({
    container: imgRef2.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: webPath,
  })
}

onMounted(() => {
  init()
})

const STR = `
// 首先需要准备好AE导出的lottie json文件，或者可以加载lottieFiles 中的网络地址
// 安装lottie-web插件进行实现，代码如下
// 更多api参考官网，可以对动画进行更精准的操作

import { ref, onMounted } from 'vue'
import { getImageUrl } from '../util'
import lottie from 'lottie-web'

const imgRef1 = ref(null)
const imgRef2 = ref(null)

const localPath = getImageUrl('animation.json')
const webPath = 'https://lottie.host/25a9ea9f-2a78-446c-a9e0-9b11dcb20aee/mdJJIHHT6p.json'

async function init() {
  lottie.loadAnimation({
    container: imgRef1.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: localPath,
  })
  lottie.loadAnimation({
    container: imgRef2.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: webPath,
  })
}

onMounted(() => {
  init()
})
`
</script>

<style scoped>
.rabbit {
  display: block;
  width: 400px;
  height: 400px;
  margin-right: 20px;
  background-repeat: no-repeat;
  > img {
    width: 100%;
  }
}
</style>
