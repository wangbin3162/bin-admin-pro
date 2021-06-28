<template>
  <div class="p20" style="width: 200px;">
    <b-cascader
      v-model="selected"
      :props="{ multiple: true }"
      :options="options">
    </b-cascader>
  </div>
</template>

<script>
export default {
  name: 'Workbench',
  data() {
    return {
      options: [
        {
          value: 'nanjing',
          label: '南京',
          children: [
            {
              value: 'xuanwu',
              label: '玄武区'
            },
            {
              value: 'gulou',
              label: '鼓楼区'
            },
            {
              value: 'jianye',
              label: '建邺区'
            }
          ]
        },
        {
          value: 'xuzhou',
          label: '徐州',
          children: [
            {
              value: 'tongshan',
              label: '铜山区'
            },
            {
              value: 'gulou',
              label: '鼓楼区'
            },
            {
              value: 'yunlong',
              label: '云龙区',
              children: [
                { value: 'dalonghu', label: '大龙湖街道' },
                { value: 'guozhuanglu', label: '郭庄路街道' },
                { value: 'lvdi', label: '绿地商务城' },
                { value: 'jinlonghu', label: '金龙湖街道' }
              ]
            },
            {
              value: 'jiawang',
              label: '贾汪区'
            },
            { value: 'peixian', label: '沛县' },
            { value: 'fengxian', label: '丰县' },
            { value: 'pizhou', label: '邳州市' },
            { value: 'xinyi', label: '新沂市' }
          ]
        }
      ],
      selected: []
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
