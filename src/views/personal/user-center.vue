<template>
  <div class="center-wrap">
    <b-row :gutter="16">
      <b-col span="7">
        <b-card class="info-pane" :bordered="false" shadow="never">
          <div class="avatar">
            <img src="@/assets/images/avatar/avatar05.jpeg" class="avatar-img" alt="avatar">
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
        <b-card :bordered="false" shadow="never" :body-style="{padding: '8px 0 0'}">
          <b-tabs v-model="activeTab" :data="tabs"></b-tabs>
          <div v-if="activeTab === 'tab1'" class="p16">
            <article-item
              v-for="(item,index) in articleList"
              :key="index"
              :item="item"
            ></article-item>
          </div>
          <div v-if="activeTab === 'tab2'" class="pt-16 pl-16">
            <img-item
              v-for="(item,index) in projectList"
              :key="index"
              :item="item"
            ></img-item>
          </div>
          <div v-if="activeTab === 'tab3'" class="p16">
            <app-item
              v-for="(item,index) in projectList"
              :key="index"
              :item="item"
            ></app-item>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ArticleItem from '@/components/List/article-item'
import ImgItem from '@/components/List/img-item'
import AppItem from '@/components/List/app-item'
import { getArticleList, getProjectList } from '@/api/list.api'

export default {
  name: 'UserCenter',
  components: { AppItem, ImgItem, ArticleItem },
  data() {
    return {
      tabs: [
        { key: 'tab1', title: '文章' },
        { key: 'tab2', title: '项目' },
        { key: 'tab3', title: '应用' }
      ],
      activeTab: 'tab1',
      articleList: [],
      projectList: []
    }
  },
  async created() {
    const articles = await getArticleList()
    const projects = await getProjectList()
    this.tabs[0].title = `文章(${articles.list.length})`
    this.tabs[1].title = `项目(${projects.list.length})`
    this.tabs[2].title = `应用(${projects.list.length})`
    this.articleList = articles.list
    this.projectList = projects.list
  }
}
</script>

<style scoped lang="stylus">
@import "~@/assets/stylus/base/var.styl"
@import "~@/assets/stylus/base/mixins.styl"
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
