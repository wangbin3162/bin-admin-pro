<template>
  <page-wrapper>
    <template #desc>
      <p>
        <a href="https://github.com/wangbin3162/bin-admin-pro" target="_blank">bin-admin-pro</a>&nbsp;
        是一个基于Vue3.0、
        <a href="https://github.com/wangbin3162/bin-ui-next" target="_blank">bin-ui-next</a>&nbsp;
        的后台解决方案，目标是提供简单快速的开箱解决方案，提供部分示例和更多实用工具以便快速进行后台开发。
      </p>
    </template>
    <b-collapse-wrap title="项目信息" shadow="none">
      <div class="p10">
        <b-desc :column="2" border :label-width="20">
          <b-desc-item label="版本">
            <b-tag type="primary">{{ config.version }}</b-tag>
          </b-desc-item>
          <b-desc-item label="仓库地址">
            <a href="https://github.com/wangbin3162/bin-admin-pro" target="_blank">Github</a>
            <b-divider type="vertical"></b-divider>
            <a href="https://gitee.com/wangbin3162/bin-admin-pro" target="_blank">Gitee</a>
            <b-divider type="vertical"></b-divider>
            <a href="https://wangbin3162.github.io/bin-admin-pro" target="_blank">Preview</a>
          </b-desc-item>
          <b-desc-item label="bin-ui-next 地址">
            <a href="https://github.com/wangbin3162/bin-ui-next" target="_blank">Github</a>
            <b-divider type="vertical"></b-divider>
            <a href="https://gitee.com/wangbin3162/bin-ui-next" target="_blank">Gitee</a>
          </b-desc-item>
          <b-desc-item label="bin-ui-next 文档">
            <a href="https://wangbin3162.gitee.io/bin-ui-next" target="_blank">文档</a>
          </b-desc-item>
        </b-desc>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="生产环境依赖" shadow="none">
      <div class="p10">
        <b-desc border>
          <b-desc-item
            v-for="(val,key) in config.dependencies"
            :key="key"
            :label="key">
            {{ val }}
          </b-desc-item>
        </b-desc>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="开发环境依赖" shadow="none">
      <div class="p10">
        <b-desc border>
          <b-desc-item
            v-for="(val,key) in config.devDependencies"
            :key="key"
            :label="key">
            {{ val }}
          </b-desc-item>
        </b-desc>
      </div>
    </b-collapse-wrap>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Common/Page/page-wrapper.vue'
import config from '../../../../package.json'

export default {
  name: 'About',
  components: { PageWrapper },
  data() {
    return {
      config,
    }
  },
}
</script>
