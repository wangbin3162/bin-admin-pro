<template>
  <page-wrapper desc="图标字体组件，基于iconfont模式，扩展组件库图标显示，可设置颜色、背景色、中文名、大小等">
    <b-collapse-wrap title="基础图标" shadow="none">
      <div class="p10">
        <iconfont icon="appstore"></iconfont>
        <iconfont icon="bulb"></iconfont>
        <iconfont icon="edit-square"></iconfont>
        <iconfont icon="tags"></iconfont>
        <iconfont icon="heart"></iconfont>
        <iconfont icon="smile"></iconfont>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="附带颜色" shadow="none">
      <div class="p10">
        <iconfont icon="appstore" color="primary"></iconfont>
        <iconfont icon="bulb" color="success"></iconfont>
        <iconfont icon="edit-square" color="warning"></iconfont>
        <iconfont icon="tags" color="info"></iconfont>
        <iconfont icon="heart" color="danger"></iconfont>
        <iconfont icon="smile" color="#25bbe3"></iconfont>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="设置大小和背景颜色" shadow="none">
      <div class="p10">
        <iconfont icon="appstore" color="primary" :size="30" bg></iconfont>
        <iconfont icon="bulb" color="success" :size="30" bg></iconfont>
        <iconfont icon="edit-square" color="warning" :size="30" bg></iconfont>
        <iconfont icon="tags" color="info" :size="30" bg></iconfont>
        <iconfont icon="heart" color="danger" :size="30" bg></iconfont>
        <iconfont icon="smile" color="#25bbe3" :size="30" bg></iconfont>
        <b-divider type="vertical"></b-divider>
        <iconfont icon="appstore" color="primary" :size="30" bg round></iconfont>
        <iconfont icon="bulb" color="success" :size="30" bg round></iconfont>
        <iconfont icon="edit-square" color="warning" :size="30" bg round></iconfont>
        <iconfont icon="tags" color="info" :size="30" bg round></iconfont>
        <iconfont icon="heart" color="danger" :size="30" bg round></iconfont>
        <iconfont icon="smile" color="#25bbe3" :size="30" bg round></iconfont>
        <b-divider type="vertical"></b-divider>
        <iconfont icon="appstore" color="primary" :size="40" bg round></iconfont>
        <iconfont icon="bulb" color="success" :size="40" bg round></iconfont>
        <iconfont icon="edit-square" color="warning" :size="40" bg round></iconfont>
        <iconfont icon="tags" color="info" :size="40" bg round></iconfont>
        <iconfont icon="heart" color="danger" :size="40" bg round></iconfont>
        <iconfont icon="smile" color="#25bbe3" :size="40" bg round></iconfont>
        <b-divider type="vertical"></b-divider>
        <iconfont icon="appstore" color="primary" :size="40"></iconfont>
        <iconfont icon="bulb" color="success" :size="40"></iconfont>
        <iconfont icon="edit-square" color="warning" :size="40"></iconfont>
        <iconfont icon="tags" color="info" :size="40"></iconfont>
        <iconfont icon="heart" color="danger" :size="40"></iconfont>
        <iconfont icon="smile" color="#25bbe3" :size="40"></iconfont>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="可点击" shadow="none">
      <div class="p10">
        <iconfont icon="appstore" color="primary" :size="30" bg round @click="clickFunc" type="btn"></iconfont>
        <iconfont icon="bulb" color="success" :size="30" bg round @click="clickFunc" type="btn"></iconfont>
        <iconfont icon="edit-square" color="warning" :size="30" bg round @click="clickFunc" type="btn"></iconfont>
        <iconfont icon="tags" color="info" :size="30" bg round @click="clickFunc" type="btn"></iconfont>
        <iconfont icon="heart" color="danger" :size="30" bg round @click="clickFunc" type="btn"></iconfont>
        <iconfont icon="smile" color="#25bbe3" :size="30" bg round @click="clickFunc" type="btn"></iconfont>
      </div>
    </b-collapse-wrap>
  </page-wrapper>
</template>

<script>
import Iconfont from '@/components/Common/Iconfont/iconfont'
import PageWrapper from '@/components/Common/Page/page-wrapper'

export default {
  name: 'CompIconfont',
  components: { PageWrapper, Iconfont },
  methods: {
    clickFunc(icon) {
      this.$message.info(`点击了图标:${icon}`)
    }
  }
}
</script>
