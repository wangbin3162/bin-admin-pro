<template>
  <page-container desc="数据类别的组件（table/page/tree/desc/progress/circle），可验证不同主题色的正确性。">
    <theme-color-panel />
    <b-collapse-wrap title="Table 表格" shadow="none" class="mb-20">
      <div class="p10">
        <b-table :columns="columns" :data="list" border></b-table>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="Page 分页器" shadow="none" class="mb-20">
      <div class="p10">
        <b-page :total="100" show-elevator show-sizer show-total></b-page>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="Tree 树形结构" shadow="none" class="mb-20">
      <div class="p10">
        <b-tree :data="data" @select-change="handleSelect"></b-tree>
      </div>
    </b-collapse-wrap>
  </page-container>
</template>

<script>
import ThemeColorPanel from '@/views/demo/comp/components/theme-color-panel.vue'

export default {
  name: 'DataComp',
  components: { ThemeColorPanel },
  data() {
    return {
      columns: [
        {
          title: '姓名',
          key: 'name',
        },
        {
          title: '年龄',
          key: 'age',
        },
        {
          title: '出生日期',
          key: 'birthday',
        },
        {
          title: '地址',
          key: 'address',
        },
      ],
      list: [
        {
          name: '王小明',
          age: 18,
          birthday: '1990-04-22',
          address: '北京市朝阳区芍药居',
        },
        {
          name: '张小刚',
          age: 25,
          birthday: '1990-11-11',
          address: '北京市海淀区西二旗',
        },
        {
          name: '李小红',
          age: 30,
          birthday: '1985-02-05',
          address: '上海市浦东新区世纪大道',
        },
        {
          name: '周小伟',
          age: 26,
          birthday: '1993-07-11',
          address: '深圳市南山区深南大道',
        },
        {
          name: '张小发',
          age: 33,
          birthday: '1999-12-12',
          address: '南京市龙眠大道',
        },
      ],
      data: [
        {
          title: '一级 1',
          expand: true,
          children: [
            {
              title: '二级 1-1',
              expand: true,
              children: [{ title: '三级 1-1-1' }, { title: '三级 1-1-2' }],
            },
            {
              title: '二级 1-2',
              expand: true,
              children: [{ title: '三级 1-2-1' }, { title: '三级 1-2-2' }],
            },
          ],
        },
      ],
    }
  },
  methods: {
    handleSelect(selected, node) {
      console.log(node)
    },
  },
}
</script>
