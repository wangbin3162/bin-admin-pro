<template>
  <page-wrapper bg>
    <b-divider align="left">基本信息</b-divider>
    <b-desc>
      <b-desc-item label="姓名">王小五</b-desc-item>
      <b-desc-item label="手机号">1769239****</b-desc-item>
      <b-desc-item label="居住地">徐州市</b-desc-item>
      <b-desc-item label="生日">2020-04-22</b-desc-item>
      <b-desc-item label="地址">江苏省xx市吴中区吴中大道 1245 号</b-desc-item>
    </b-desc>
    <b-divider align="left">其他信息</b-divider>
    <b-desc>
      <b-desc-item label="姓名">王小五</b-desc-item>
      <b-desc-item label="邮箱">bin-admin-pro@github.com</b-desc-item>
      <b-desc-item label="地址">徐州市</b-desc-item>
      <b-desc-item label="爱好">
        <b-tag>打篮球</b-tag>
        <b-tag>游戏</b-tag>
        <b-tag>听歌</b-tag>
      </b-desc-item>
    </b-desc>
    <b-divider align="left">表格信息</b-divider>
    <b-table :columns="columns" :data="data"></b-table>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Common/Page/page-wrapper.vue'

export default {
  name: 'BaseDetail',
  components: { PageWrapper },
  data() {
    return {
      columns: [
        { title: '姓名', key: 'name' },
        { title: '年龄', key: 'age' },
        { title: '出生日期', key: 'birthday' },
        { title: '地址', key: 'address' },
      ],
      data: [
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
    }
  },
}
</script>
