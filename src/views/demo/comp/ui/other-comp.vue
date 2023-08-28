<template>
  <page-wrapper desc="导航类别的组件，可验证不同主题色的正确性。">
    <theme-color-panel />
    <b-collapse-wrap title="Other 其他类型的显示组件" shadow="none" class="mb-20">
      <div class="p10">
        <b-divider align="left">卡片</b-divider>
        <b-card class="box-card" width="480px" head-tip>
          <template v-slot:header>
            <div flex="main:justify cross:center">
              <span>卡片名称</span>
              <b-icon name="dropbox" size="20" style="cursor: pointer"></b-icon>
            </div>
          </template>
          <div v-for="o in 4" :key="o" class="text item">
            {{ '这是内容区域 ' + o }}
          </div>
        </b-card>
        <b-divider align="left">徽标</b-divider>
        <b-badge :value="1" class="item" type="primary">
          <b-button>primary徽标</b-button>
        </b-badge>
        <b-divider align="left">tag标签</b-divider>
        <b-space>
          <b-tag type="primary" dark>primary</b-tag>
          <b-tag type="success" dark>success</b-tag>
          <b-tag type="info" dark>info</b-tag>
          <b-tag type="warning" dark>warning</b-tag>
          <b-tag type="danger" dark>danger</b-tag>
          <b-tag type="primary">primary</b-tag>
          <b-tag type="success">success</b-tag>
          <b-tag type="info">info</b-tag>
          <b-tag type="warning">warning</b-tag>
          <b-tag type="danger">danger</b-tag>
        </b-space>
        <b-divider align="left">loading</b-divider>
        <div>
          <div class="demo-loading">
            <b-loading fix>加载中</b-loading>
          </div>
          <div class="demo-loading">
            <b-loading fix show-text="loading"></b-loading>
          </div>
          <div class="demo-loading">
            <b-loading fix show-text="loading" show-icon="loading2"></b-loading>
          </div>
        </div>
        <b-divider align="left">alert</b-divider>
        <b-alert>info alert</b-alert>
        <b-alert show-icon>info alert</b-alert>
        <b-alert show-icon>
          自定义icon
          <template #icon>
            <b-icon name="smile"></b-icon>
          </template>
          <template #desc>自定义icon描述</template>
        </b-alert>
        <b-divider align="left">日历</b-divider>
        <div style="width: 300px; display: inline-block">
          <b-calendar mini></b-calendar>
        </div>
        <div style="width: 300px; display: inline-block">
          <b-calendar
            mini
            :body-style="{ border: 'none' }"
            :day-style="{ border: 'none', borderRadius: '4px' }"
          ></b-calendar>
        </div>
      </div>
    </b-collapse-wrap>
  </page-wrapper>
</template>

<script>
import ThemeColorPanel from '@/views/demo/comp/components/theme-color-panel.vue'

export default {
  name: 'OtherComp',
  components: { ThemeColorPanel },
}
</script>

<style>
.demo-loading {
  position: relative;
  overflow: hidden;
  display: inline-block;
  margin-right: 5px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #cecece;
}
</style>
