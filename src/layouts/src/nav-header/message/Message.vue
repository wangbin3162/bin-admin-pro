<template>
  <b-popover placement="bottom-start" width="300px" popper-class="message-box">
    <div class="header-trigger">
      <div class="trigger">
        <b-badge :is-dot="messageCount > 0" class="item">
          <i class="b-iconfont b-icon-bell"></i>
        </b-badge>
      </div>
    </div>
    <template #content>
      <div class="top-tabs">
        <div
          v-for="item in tabs"
          :key="item.key"
          class="tab-item"
          :class="{ active: item.key === activeTab }"
        >
          {{ item.title }}
          <span v-if="item.count">({{ item.count }})</span>
        </div>
      </div>
      <div class="message-content" v-if="activeTab === 'message'">
        <div v-for="(item, index) in messageList" :key="index" class="message-item">
          <div v-if="item.icon" class="icon">
            <img :src="item.icon" alt="icon" />
          </div>
          <div class="content">
            <h4 class="content-title">{{ item.title }}</h4>
            <div class="content-date">{{ item.date }}</div>
          </div>
        </div>

        <b-empty v-if="messageList.length === 0"></b-empty>
      </div>
    </template>
  </b-popover>
</template>

<script setup>
import { computed, ref } from 'vue'
import day from 'dayjs'
import avatar1 from '@/assets/images/avatar/avatar01.jpeg'
import avatar2 from '@/assets/images/avatar/avatar00.jpeg'
import avatar3 from '@/assets/images/avatar/avatar06.jpeg'
import avatar4 from '@/assets/images/avatar/avatar03.jpg'

const tabs = ref([{ key: 'message', title: '通知' }])
const activeTab = ref('message')
const messageList = ref([
  {
    icon: avatar1,
    title: '您今天有12个任务',
    date: day().format('YYYY-MM-DD dddd HH:mm:ss'),
  },
  {
    icon: avatar2,
    title: '今日需要修改发布新版程序',
    date: day().format('YYYY-MM-DD dddd HH:mm:ss'),
  },
  {
    icon: avatar3,
    title: '最新的文章已经发布',
    date: day().format('YYYY-MM-DD dddd HH:mm:ss'),
  },
  {
    icon: avatar4,
    title: '这是通知示例，实际需要根据业务需求自行修改',
    date: day().format('YYYY-MM-DD dddd HH:mm:ss'),
  },
])
const messageCount = computed(() => messageList.value.length)

tabs.value[0].count = messageCount.value
</script>

<style scoped>
.message-box {
  .top-tabs {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .tab-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.65);
      height: 36px;
      line-height: 36px;
      padding: 0 12px;
      margin-right: 8px;
      font-size: 14px;
      transition: 0.2s;
      &.active {
        color: var(--bin-color-primary);
        font-weight: 500;
        &:after {
          content: '';
          position: absolute;
          right: 0;
          left: 0;
          bottom: 0;
          z-index: 1;
          border-bottom: 2px solid var(--bin-color-primary);
        }
      }
      &:hover {
        color: var(--bin-color-primary-light1);
      }
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      border-bottom: 1px solid #eaeaea;
    }
  }
  .message-content {
    .message-item {
      display: flex;
      padding: 12px 16px;
      border-bottom: 1px solid #e8eaec;
      cursor: pointer;
      text-align: left;
      .icon {
        flex-shrink: 0;
        width: 36px;
        height: 36px;
        margin-right: 16px;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .content-title {
        font-size: 14px;
        font-weight: 400;
        line-height: 1.2;
        color: #515a6e;
        margin-bottom: 4px;
      }
      .content-date {
        font-size: 12px;
        color: #808695;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
