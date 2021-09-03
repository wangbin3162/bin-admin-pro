<template>
  <div class="setting-wrap">
    <b-row :gutter="16">
      <b-col span="6">
        <b-card class="ctrl-pane" :bordered="false" shadow="never" :body-style="{padding:0}">
          <template v-slot:header>
            <div class="ctrl-header">
              <b-icon name="control" size="18" class="mr-5"></b-icon>
              <span>个人设置</span>
            </div>
          </template>
          <ul class="pt-5 pb-5">
            <li
              v-for="(item,key) in tabs"
              :key="key"
              class="tab-item"
              :class="{'active':key===active}"
              @click="active = key"
            >
              <span class="tab-item-title">{{ item.title }}</span>
              <span class="tab-item-desc">{{ item.desc }}</span>
            </li>
          </ul>
        </b-card>
      </b-col>
      <b-col span="18">
        <b-card :header="tabs[active].title" :bordered="false" shadow="never">
          <template v-if="active === 'base'">
            <b-form ref="form" :model="baseInfo" label-width="85px">
              <b-row :gutter="24">
                <b-col span="12">
                  <b-form-item label="邮箱">
                    <b-input v-model="baseInfo.email" placeholder="请输入昵称" clearable></b-input>
                  </b-form-item>
                  <b-form-item label="昵称">
                    <b-input v-model="baseInfo.name" placeholder="请输入昵称" clearable></b-input>
                  </b-form-item>
                  <b-form-item label="个人简介">
                    <b-input v-model="baseInfo.intro" placeholder="请输入个人简介" type="textarea"></b-input>
                  </b-form-item>
                  <b-form-item label="联系电话">
                    <b-input v-model="baseInfo.phone" placeholder="请输入联系电话" clearable></b-input>
                  </b-form-item>
                  <b-form-item label="所在地区">
                    <b-input v-model="baseInfo.address" placeholder="请输入所在地区" clearable></b-input>
                  </b-form-item>
                  <b-form-item>
                    <b-button type="primary" @click="updateBase">更新信息</b-button>
                  </b-form-item>
                </b-col>
                <b-col span="12">
                  <div class="avatar-wrap">
                    <div class="mb-8">头像</div>
                    <div class="avatar-img mb-8">
                      <img src="@/assets/images/avatar/avatar05.jpeg" alt="logo">
                    </div>
                    <b-upload action="">
                      <b-button icon="cloud-upload">更换头像</b-button>
                    </b-upload>
                  </div>
                </b-col>
              </b-row>
            </b-form>
          </template>
          <template v-if="active === 'safe'">
            <div class="pt-8 pb-16">
              <div class="list-item">
                <div class="list-item-left">
                  <h4>账户密码</h4>
                  <p>绑定手机和邮箱，并设置密码，帐号更安全</p>
                </div>
                <div class="list-item-right">
                  <a target="_self" class="i-link">修改</a>
                </div>
              </div>
              <b-divider></b-divider>
              <div class="list-item">
                <div class="list-item-left">
                  <h4>绑定手机</h4>
                  <p>已绑定手机号：+176****2310</p>
                </div>
                <div class="list-item-right">
                  <a target="_self" class="i-link">修改</a>
                </div>
              </div>
              <b-divider></b-divider>
              <div class="list-item">
                <div class="list-item-left">
                  <h4>密保问题</h4>
                  <p>设置密保问题可以有效保护账户安全</p>
                </div>
                <div class="list-item-right">
                  <a target="_self" class="i-link">修改</a>
                </div>
              </div>
              <b-divider></b-divider>
              <div class="list-item">
                <div class="list-item-left">
                  <h4>备用邮箱</h4>
                  <p>已绑定邮箱wangbin3162@qq.com</p>
                </div>
                <div class="list-item-right">
                  <a target="_self" class="i-link">修改</a>
                </div>
              </div>
            </div>
          </template>
          <template v-if="active === 'auth'">
            <div class="pt-8 pb-16">
              <div class="list-item">
                <div class="list-item-left">
                  <h4>绑定微信</h4>
                  <p>未绑定微信账户</p>
                </div>
                <div class="list-item-right">
                  <a target="_self" class="i-link">绑定</a>
                </div>
              </div>
              <b-divider></b-divider>
              <div class="list-item">
                <div class="list-item-left">
                  <h4>绑定支付宝</h4>
                  <p>未绑定支付宝账户</p>
                </div>
                <div class="list-item-right">
                  <a target="_self" class="i-link">绑定</a>
                </div>
              </div>
              <b-divider></b-divider>
              <div class="list-item">
                <div class="list-item-left">
                  <h4>实名认证</h4>
                  <p>未进行实名认证</p>
                </div>
                <div class="list-item-right">
                  <a target="_self" class="i-link">认证</a>
                </div>
              </div>
            </div>
          </template>
          <template v-if="active === 'message'">
            <div class="pt-8 pb-16">
              <div class="list-item">
                <div class="list-item-left">
                  <h4>账户密码</h4>
                  <p>用户账户密码修改后是否通知</p>
                </div>
                <div class="list-item-right">
                  <b-switch>
                    <template #open><span>开</span></template>
                    <template #close><span>关</span></template>
                  </b-switch>
                </div>
              </div>
              <b-divider></b-divider>
              <div class="list-item">
                <div class="list-item-left">
                  <h4>系统消息</h4>
                  <p>系统消息是否以站内信形式通知</p>
                </div>
                <div class="list-item-right">
                  <b-switch>
                    <template #open><span>开</span></template>
                    <template #close><span>关</span></template>
                  </b-switch>
                </div>
              </div>
              <b-divider></b-divider>
              <div class="list-item">
                <div class="list-item-left">
                  <h4>代办任务</h4>
                  <p>代办任务是否进行通知</p>
                </div>
                <div class="list-item-right">
                  <b-switch>
                    <template #open><span>开</span></template>
                    <template #close><span>关</span></template>
                  </b-switch>
                </div>
              </div>
            </div>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'UserSetting',
  data() {
    return {
      tabs: {
        base: { title: '基本设置', desc: '个人账户信息设置' },
        safe: { title: '安全设置', desc: '密码邮箱设置' },
        auth: { title: '认证设置', desc: '账号绑定、实名认证设置' },
        message: { title: '通知设置', desc: '消息通知设置' },
      },
      active: 'base',
      baseInfo: {
        email: '316281400@qq.com',
        name: 'Wang',
        phone: '176****1212',
        intro: '个人简介',
        address: '徐州市',
      },
    }
  },
  methods: {
    updateBase() {
      this.$message.success('更新成功！')
    },
  },
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/var.styl"
@import "../../../assets/stylus/base/mixins.styl"
.setting-wrap {
  margin: 16px;
  .ctrl-header {
    display: flex;
    align-items: center;
    font-weight: 500;
    color: $color-text-primary;
  }
  .ctrl-pane {
    .tab-item {
      margin: 0;
      line-height: normal;
      padding: 7px 16px;
      clear: both;
      color: $color-text-default
      font-size: 14px;
      list-style: none;
      cursor: pointer;
      transition: background .2s ease-in-out;
      > span {
        display: inline-block;
        width: 100%;
        line-height 1.2;
      }
      &-title {
        line-height: 24px;
        font-size: 14px;
      }
      &-desc {
        font-size: 12px;
        color: $color-text-secondary;
      }
      &:hover {
        background: #f3f3f3;
      }
      &.active {
        background: getLighten5();
        color: getColor();
        .tab-item-desc {
          color: getColor();
        }
      }
    }
  }
  .avatar-wrap {
    margin-left: 80px;
    .avatar-img {
      width: 90px;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
  }
  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .list-item-left {
      h4 {
        font-weight: 500;
      }
      p {
        margin-top: 8px;
        color: $color-text-secondary;
      }
    }
  }
}
</style>
