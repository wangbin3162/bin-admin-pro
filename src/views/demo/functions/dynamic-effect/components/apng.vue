<template>
  <div>
    <b-alert show-icon>
      说明
      <template #desc>
        <p>
          1、关键帧导出后，可以制作apng用来直接显示动画，但这种方式不受代码控制，动画速率等只能在AE中进行调整后，导出序列帧再用转换工具进行转换
        </p>
        <p>
          2、好处就是使用十分方便，无需编码直接当成普通图片进行引用即可，比较推荐用于背景或者icon动效这种可以不受控制的内容
        </p>
        <p>
          2、
          <a href="https://www.zhangxinxu.com/sp/apng/" target="_blank">APNG合成工具</a>
          <b-divider type="vertical"></b-divider>
          <a href="https://tinypng.com/" target="_blank">png压缩工具</a>
        </p>
      </template>
    </b-alert>
    <b-row :gutter="16">
      <b-col span="24">
        <div class="rabbit">
          <img src="@/assets/images/effects/apng_test.png" />
        </div>
      </b-col>
      <b-col span="12"></b-col>
    </b-row>
  </div>
</template>

<script setup></script>

<style lang="stylus" scoped>
.rabbit {
  display: block;
  width: 400px;
  height: 400px;
  background-repeat: no-repeat;
  > img {
    width: 100%;
  }
}
</style>
