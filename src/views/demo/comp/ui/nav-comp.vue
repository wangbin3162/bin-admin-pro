<template>
  <page-wrapper desc="导航类别的组件，可验证不同主题色的正确性。">
    <theme-color-panel />
    <b-collapse-wrap title="Menu 导航菜单" shadow="none" class="mb-20">
      <div class="p10">
        <b-button-group v-model="isCollapse" style="margin-bottom: 20px">
          <b-button :type="isCollapse ? 'default' : 'primary'" @click="isCollapse = false">
            展开
          </b-button>
          <b-button :type="isCollapse ? 'primary' : 'default'" @click="isCollapse = true">
            收起
          </b-button>
        </b-button-group>
        <div flex="main:justify">
          <div style="width: 220px">
            <b-menu default-active="1" class="b-menu-vertical-demo border" :collapse="isCollapse">
              <b-submenu index="1">
                <template #title>
                  <b-icon name="location-fill"></b-icon>
                  <span>导航一</span>
                </template>
                <b-menu-item-group>
                  <template #title>分组一</template>
                  <b-menu-item index="1-1">选项1</b-menu-item>
                  <b-menu-item index="1-2">选项2</b-menu-item>
                </b-menu-item-group>
                <b-menu-item-group title="分组2">
                  <b-menu-item index="1-3">选项3</b-menu-item>
                </b-menu-item-group>
                <b-submenu index="1-4">
                  <template #title>选项4</template>
                  <b-menu-item index="1-4-1">选项1</b-menu-item>
                </b-submenu>
              </b-submenu>
              <b-menu-item index="2">
                <b-icon name="appstore-fill"></b-icon>
                <template #title>导航二</template>
              </b-menu-item>
              <b-menu-item index="3" disabled>
                <b-icon name="file-text"></b-icon>
                <template #title>导航三</template>
              </b-menu-item>
              <b-menu-item index="4">
                <b-icon name="setting-fill"></b-icon>
                <template #title>导航四</template>
              </b-menu-item>
            </b-menu>
          </div>
          <div style="width: calc(100% - 240px)">
            <b-menu default-active="1" class="b-menu-vertical-demo border" mode="horizontal">
              <b-submenu index="1">
                <template #title>
                  <b-icon name="location-fill"></b-icon>
                  <span>导航一</span>
                </template>
                <b-menu-item-group>
                  <template #title>分组一</template>
                  <b-menu-item index="1-1">选项1</b-menu-item>
                  <b-menu-item index="1-2">选项2</b-menu-item>
                </b-menu-item-group>
                <b-menu-item-group title="分组2">
                  <b-menu-item index="1-3">选项3</b-menu-item>
                </b-menu-item-group>
                <b-submenu index="1-4">
                  <template #title>选项4</template>
                  <b-menu-item index="1-4-1">选项1</b-menu-item>
                </b-submenu>
              </b-submenu>
              <b-menu-item index="2">
                <b-icon name="appstore-fill"></b-icon>
                <template #title>导航二</template>
              </b-menu-item>
              <b-menu-item index="3" disabled>
                <b-icon name="file-text"></b-icon>
                <template #title>导航三</template>
              </b-menu-item>
              <b-menu-item index="4">
                <b-icon name="setting-fill"></b-icon>
                <template #title>导航四</template>
              </b-menu-item>
            </b-menu>
          </div>
        </div>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="Anchor 锚点" shadow="none" class="mb-20">
      <div class="p10">
        <div style="width: 220px">
          <b-anchor show-ink style="margin-left: 20px" :scroll-offset="100">
            <b-anchor-link href="#ji-chu-yong-fa" title="基础用法"></b-anchor-link>
            <b-anchor-link href="#zi-ding-yi-tu-biao" title="自定义图标"></b-anchor-link>
            <b-anchor-link href="#zi-ding-yi-yan-se" title="自定义颜色"></b-anchor-link>
            <b-anchor-link href="#zhi-ding-gun-dong-rong-qi" title="指定滚动容器"></b-anchor-link>
            <b-anchor-link href="#props" title="Props"></b-anchor-link>
            <b-anchor-link href="#events" title="Events"></b-anchor-link>
            <b-anchor-link href="#anchorlink-props" title="AnchorLink Props"></b-anchor-link>
          </b-anchor>
        </div>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="Tabs 标签页" shadow="none" class="mb-20">
      <div class="p10">
        <b-tabs v-model="activeTab" :data="tabs"></b-tabs>
        <p v-show="activeTab === 'tab0'">首页</p>
        <p v-show="activeTab === 'tab1'">用户管理</p>
        <p v-show="activeTab === 'tab2'">组织管理</p>
        <p v-show="activeTab === 'tab3'">系统管理</p>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="Dropdown 下拉菜单" shadow="none" class="mb-20">
      <div class="p10">
        <b-dropdown trigger="click" style="margin-left: 20px">
          <a href="javascript:void(0)">
            click 触发
            <b-icon name="down"></b-icon>
          </a>
          <template #dropdown>
            <b-dropdown-menu>
              <b-dropdown-item selected>选项一</b-dropdown-item>
              <b-dropdown-item disabled>选项二</b-dropdown-item>
              <b-dropdown-item>选项三</b-dropdown-item>
              <b-dropdown-item divided>选项四</b-dropdown-item>
              <b-dropdown-item>选项五</b-dropdown-item>
            </b-dropdown-menu>
          </template>
        </b-dropdown>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="Steps 步骤条" shadow="none" class="mb-20">
      <div class="p10">
        <b-steps :current="current">
          <b-step title="已完成" content="这里是该步骤的描述信息"></b-step>
          <b-step title="进行中" content="这里是该步骤的描述信息"></b-step>
          <b-step title="待进行" content="这里是该步骤的描述信息"></b-step>
          <b-step title="待进行" content="这里是该步骤的描述信息"></b-step>
        </b-steps>
        <b-button type="primary" @click="next">下一步</b-button>
      </div>
    </b-collapse-wrap>
  </page-wrapper>
</template>

<script>
import ThemeColorPanel from '@/views/demo/comp/components/theme-color-panel.vue'

export default {
  name: 'NavComp',
  components: { ThemeColorPanel },
  data() {
    return {
      isCollapse: false,
      tabs: [
        { key: 'tab0', title: '首页', noClose: true },
        { key: 'tab1', title: '用户管理' },
        { key: 'tab2', title: '组织管理' },
        { key: 'tab3', title: '系统管理' },
      ],
      activeTab: 'tab0',
      current: 0,
    }
  },
  methods: {
    next() {
      if (this.current === 3) {
        this.current = 0
      } else {
        this.current += 1
      }
    },
  },
}
</script>
