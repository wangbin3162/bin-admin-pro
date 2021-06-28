<template>
  <div class="p20" style="width: 100px;">
    <b-select v-model="selected" placeholder="请选择户籍地" clearable>
      <b-option label="上海" value="shanghai"></b-option>
      <b-option label="北京" value="beijing"></b-option>
      <b-option label="南京" value="nanjing"></b-option>
      <b-option label="徐州" value="xuzhou"></b-option>
    </b-select>
  </div>
</template>

<script>
export default {
  name: 'Workbench',
  data() {
    return {
      selected: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
