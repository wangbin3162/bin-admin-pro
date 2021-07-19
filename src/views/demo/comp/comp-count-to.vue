<template>
  <page-wrapper desc="数字动画组件，现已收录至bin-ui-next，此为示例">
    <b-collapse-wrap title="数字动画" shadow="none">
      <div class="p10">
        <h1 style="font-size: 60px;color: #1089ff;">
          <b-count-to
            :start-val="startVal"
            :end-val="endVal"
            :duration="duration"
            :prefix="prefix"
            :suffix="suffix"
            :autoplay="false"
            ref="countTo"
          ></b-count-to>
        </h1>
        <div flex>
          <div class="input-item">
            startVal:
            <b-input-number v-model="startVal" :min="0"></b-input-number>
          </div>
          <div class="input-item">
            endVal:
            <b-input-number v-model="endVal" :min="0"></b-input-number>
          </div>
          <div class="input-item">
            duration:
            <b-input-number v-model="duration" :min="0"></b-input-number>
          </div>
          <b-button type="primary" @click="restart">开始</b-button>
          <b-button type="info" @click="togglePlay">暂停/启动</b-button>
        </div>
        <div flex>
          <div class="input-item">
            prefix:
            <b-input v-model="prefix"></b-input>
          </div>
          <div class="input-item">
            suffix:
            <b-input v-model="suffix"></b-input>
          </div>
        </div>
      </div>
    </b-collapse-wrap>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Common/Page/page-wrapper'

export default {
  name: 'CompCountTo',
  components: { PageWrapper },
  data() {
    return {
      startVal: 0,
      endVal: 2021,
      duration: 4000,
      prefix: '¥',
      suffix: 'rmb'
    }
  },
  methods: {
    restart() {
      this.$refs.countTo.restart()
    },
    togglePlay() {
      this.$refs.countTo.pauseResume()
    }
  }
}
</script>

<style lang="stylus" scoped>
.input-item {
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
  margin-bottom: 8px;
  :deep(.bin-input), :deep(.bin-input-number) {
    width: 140px;
    margin-left: 6px;
  }
}
</style>
