<template>
  <page-wrapper desc="标题组件，全局的内置标题组件，附带不同的效果">
    <b-collapse-wrap title="基础标题，title参数 或 默认插槽显示标题" shadow="none">
      <div class="p10">
        <title-bar title="Title标题"></title-bar>
        <title-bar>默认插槽标题</title-bar>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="标题样式" shadow="none">
      <div class="p10">
        <title-bar :title-style="{fontSize:'14px',fontWeight:700}">自定义大小</title-bar>
        <title-bar>
          <b-icon name="sketch"></b-icon>
          插槽自定义
        </title-bar>
        <title-bar tip-pos="left">tip-pos-left</title-bar>
        <title-bar no-border>no-border</title-bar>
        <title-bar>右侧插槽
          <template #right>
            <b-button size="small">操作</b-button>
          </template>
        </title-bar>
      </div>
    </b-collapse-wrap>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Common/Page/page-wrapper.vue'
import TitleBar from '@/components/Common/TitleBar/index.vue'

export default {
  name: 'CompTitleBar',
  components: { TitleBar, PageWrapper },
}
</script>
