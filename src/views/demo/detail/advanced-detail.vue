<template>
  <page-wrapper title="项目开发进度（编号：10000）">
    <template #desc>
      <b-desc>
        <b-desc-item label="责任人">Wang</b-desc-item>
        <b-desc-item label="审批人">Jack</b-desc-item>
        <b-desc-item label="创建时间">2021-06-30</b-desc-item>
        <b-desc-item label="当前状态">
          <b-tag type="success" dot>开发</b-tag>
        </b-desc-item>
        <b-desc-item label="项目描述">当前项目的描述</b-desc-item>
      </b-desc>
    </template>
    <b-collapse-wrap title="流程进度" shadow="none">
      <div class="p20">
        <b-steps :current="1">
          <b-step title="创建项目" content="创建时间：2021-06-30"></b-step>
          <b-step title="需求评审" content="评审时间：2021-07-05"></b-step>
          <b-step title="开发测试" content="开发时间：2021-08-31"></b-step>
          <b-step title="部署上线" content="上线时间：2021-10-01"></b-step>
        </b-steps>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="基本信息" shadow="none">
      <div class="p20">
        <b-desc>
          <b-desc-item label="负责人">Wang</b-desc-item>
          <b-desc-item label="审批人">Jack</b-desc-item>
          <b-desc-item label="拟定完成时间">2021-06-30</b-desc-item>
          <b-desc-item label="当前状态">
            <b-tag type="success" dot>开发</b-tag>
          </b-desc-item>
          <b-desc-item label="紧急程度">
            <b-tag type="danger">紧急</b-tag>
          </b-desc-item>
        </b-desc>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="项目信息" shadow="none">
      <div class="p20">
        <b-desc>
          <b-desc-item label="项目名称">基础Admin后台管理系统</b-desc-item>
          <b-desc-item label="项目类型">前端独立项目</b-desc-item>
          <b-desc-item label="项目状态">
            <b-tag type="success">正常</b-tag>
          </b-desc-item>
          <b-desc-item label="项目目标">实现admin后台管理模板，方便中台系统的构建。</b-desc-item>
          <b-desc-item label="项目描述">
            这里是描述，这里是描述，这里是描述，这里是描述，这里是描述，这里是描述，这里是描述，这里是描述
          </b-desc-item>
        </b-desc>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="项目人员" shadow="none">
      <div class="p20">
        <b-table :columns="columns" :data="data" size="small"></b-table>
      </div>
    </b-collapse-wrap>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Common/Page/page-wrapper.vue'

export default {
  name: 'AdvancedDetail',
  components: { PageWrapper },
  data() {
    return {
      columns: [
        { title: '姓名', key: 'name' },
        { title: '工号', key: 'no' },
        { title: '所属分组', key: 'dept' },
      ],
      data: [
        { name: 'Wang', no: '001', dept: '前端组' },
        { name: '郭小宁', no: '002', dept: '前端组' },
        { name: '约修亚', no: '003', dept: '前端组' },
        { name: '李小红', no: '004', dept: '后端组' },
        { name: '张小发', no: '005', dept: '测试组' },
      ],
    }
  },
}
</script>
