<template>
  <div class="page-header">
    <div class="page-header-title">工作台</div>
    <div class="page-header-detail">
      <div class="avatar-img">
        <img src="@/assets/images/avatar/avatar05.jpeg" class="avatar" alt="avatar">
      </div>
      <div class="welcome">
        <div class="welcome-title">{{ welcomeTitle }}</div>
        <div class="welcome-weather">今日晴，20℃ - 32℃！</div>
      </div>
      <div class="right-box">
        <div class="item">
          <div class="top">
            <iconfont icon="block" color="primary" bg round></iconfont>
            <span class="ml-5">项目数</span>
          </div>
          <p>12</p>
        </div>
        <div class="item">
          <div class="top">
            <iconfont icon="check-square" color="warning" bg round></iconfont>
            <span class="ml-5">代办项</span>
          </div>
          <p>{{ todoLabel }}</p>
        </div>
        <div class="item">
          <div class="top">
            <iconfont icon="bell" color="success" bg round></iconfont>
            <span class="ml-5">通知数量</span>
          </div>
          <p>2321</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, unref } from 'vue'
import useStoreRouter from '@/hooks/use-store-router'
import dayjs from 'dayjs'
import Iconfont from '@/components/Iconfont/iconfont'

export default {
  name: 'top-box',
  components: { Iconfont },
  setup() {
    const { $store } = useStoreRouter()
    const userInfo = computed(() => $store.getters.userInfo)
    const welcomeTitle = computed(() => {
      const hour = dayjs().hour()
      return `${hour < 12 ? '上午好' : (hour < 18 ? '下午好' : '晚上好')}，${userInfo.value.realName}`
    })
    const todos = computed(() => $store.state.app.todoList)
    const todoDone = computed(() => todos.value.filter(v => v.done))
    const todoLabel = computed(() => `${todoDone.value.length} / ${todos.value.length}`)

    return {
      welcomeTitle,
      todoLabel
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~@/assets/stylus/base/var.styl"
.page-header {
  padding: 16px 32px 0 32px;
  background: #fff;
  border-bottom: $color-border-base
  &-title {
    display: inline-block;
    color: $color-text-primary;
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 16px;
  }
  &-detail {
    display: flex;
    margin-bottom: 16px;
    .avatar-img {
      .avatar {
        width: 64px;
        border-radius: 50%;
        font-size: 0;
        box-shadow: 0 0 2px rgba(0, 0, 0, .1);
      }
    }
    .welcome {
      flex: 1;
      padding: 0 24px;
      &-title {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 12px;
      }
      &-weather {
        color: $color-text-light;
      }
    }
    .right-box {
      width: 320px;
      justify-content: space-between;
      display: flex;
      .item {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 100px;
        text-align: right;
        .top {
          display: flex;
          align-items: center;
          color: #808695;
        }
        p {
          font-size: 22px;
          line-height: 32px;
        }
      }
    }
  }
}
</style>
