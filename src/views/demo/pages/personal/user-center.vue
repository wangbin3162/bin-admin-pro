<template>
  <div class="center-wrap">
    <b-row :gutter="16">
      <b-col span="7">
        <b-card class="info-pane" :bordered="false" shadow="never">
          <div class="avatar">
            <img src="@/assets/images/avatar/avatar11.jpeg" class="avatar-img" alt="avatar" />
          </div>
          <h2>Wang</h2>
          <p>千里之行，始于足下。</p>
          <div class="desc">
            <b-icon name="flag"></b-icon>
            前端工程师
          </div>
          <div class="desc">
            <b-icon name="apartment"></b-icon>
            xxx软件有限公司-前端事业部-前端架构组
          </div>
          <div class="desc">
            <b-icon name="location"></b-icon>
            徐州市泉山区
          </div>
          <b-divider dashed></b-divider>
          <b-tag>搬砖者 👐</b-tag>
          <b-tag>小有想法 😈</b-tag>
          <b-tag>前端开发 ⛲</b-tag>
          <b-tag>vue3 🍀</b-tag>
          <b-tag>专注前端 🌟</b-tag>
          <b-tag>大佬 🙋</b-tag>
          <b-tag>懂点设计 💎</b-tag>
          <b-tag>交互内容 🔖</b-tag>
        </b-card>
      </b-col>
      <b-col span="17">
        <b-card :bordered="false" shadow="never" :body-style="{ padding: '8px 0 0' }">
          <b-tabs v-model="activeTab" :data="tabs"></b-tabs>
          <div v-if="activeTab === 'tab1'" class="p16">
            <b-skeleton :loading="loading" animation>
              <template #template>
                <b-skeleton />
                <b-divider />
                <b-skeleton />
                <b-divider />
                <b-skeleton />
              </template>
              <template #default>
                <ArcticleItem
                  v-for="(item, index) in articleList"
                  :key="index"
                  :item="item"
                ></ArcticleItem>
              </template>
            </b-skeleton>
          </div>
          <div v-if="activeTab === 'tab2'" class="pt-16 pl-16">
            <ImgItem v-for="(item, index) in projectList" :key="index" :item="item"></ImgItem>
          </div>
          <div v-if="activeTab === 'tab3'" class="p16">
            <AppItem v-for="(item, index) in projectList" :key="index" :item="item"></AppItem>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script setup>
import { getArticleList, getProjectList } from '@/api/modules/mock.api'
import AppItem from '../../components/List/app-item.vue'
import ImgItem from '../../components/List/img-item.vue'
import ArcticleItem from '../../components/List/article-item.vue'
import { ref } from 'vue'

defineOptions({ name: 'UserCenter' })
const tabs = ref([
  { key: 'tab1', title: '文章' },
  { key: 'tab2', title: '项目' },
  { key: 'tab3', title: '应用' },
])

const activeTab = ref('tab1')

const articleList = ref([])
const projectList = ref([])
const loading = ref(false)

async function created() {
  loading.value = true
  const articles = await getArticleList()
  const projects = await getProjectList()
  tabs.value[0].title = `文章(${articles.rows.length})`
  tabs.value[1].title = `项目(${projects.rows.length})`
  tabs.value[2].title = `应用(${projects.rows.length})`
  articleList.value = articles.rows
  projectList.value = projects.rows
  loading.value = false
}

created()
</script>

<style scoped>
.center-wrap {
  margin: 16px;
  .info-pane {
    .avatar {
      padding: 8px 0;
      display: flex;
      justify-content: center;
      .avatar-img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
    }
    h2 {
      text-align: center;
      font-size: 20px;
      margin: 8px;
      font-weight: 500;
    }
    p {
      text-align: center;
    }
    .desc {
      display: flex;
      align-items: center;
      margin-top: 16px;
      i {
        font-size: 16px;
        margin-right: 8px;
      }
    }
    :deep(.bin-tag) {
      margin: 0 6px 6px 0;
    }
  }
}
</style>
