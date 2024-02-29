<template>
  <page-wrapper>
    <div class="preview-panel" flex>
      <div class="left-images">
        <div class="top-bar image-list">
          图片列表
          <b-tooltip class="item" content="点击图片载入其区域配置" placement="right">
            <b-icon name="question-circle"></b-icon>
          </b-tooltip>
        </div>
        <div class="image-list-wp">
          <template v-for="(item, index) in listCfg" :key="index">
            <div class="image-wrap" :class="{ 'has-comps': item.comps.length }">
              <div
                class="image-item"
                :class="{ active: currentSelectId === item.id }"
                @click="clickImage(item, index)"
              >
                <i class="el-icon-picture-outline"></i>
                <span>{{ item.name }}</span>
              </div>
              <div
                class="item-comp"
                v-for="(comp, idx) in item.comps"
                :key="idx + comp.id"
                :class="[
                  { active: currentCompId === comp.id },
                  { edited: comp.script && comp.script.length },
                ]"
              >
                <span
                  :title="`${comp.alias}-${comp.name}`"
                  @click="compGroovyConfig(item, index, comp, idx)"
                >
                  {{ comp.alias }}
                </span>
              </div>
            </div>
          </template>
          <b-empty v-if="listCfg.length === 0">暂无列表</b-empty>
        </div>
      </div>

      <div class="right-config" ref="contentRef">
        <div class="top-bar" flex="main:justify" v-if="renderer">
          <div>
            <b-button
              plain
              :type="globalScript.length ? 'success' : 'default'"
              @click="globalConfig"
            >
              全局配置
            </b-button>
            <b-button @click="checkConfig">查看配置</b-button>
          </div>
          <div>
            <b-button @click="saveConfig(true)">保存</b-button>
          </div>
        </div>

        <SchemaEditor
          v-if="renderer"
          ref="schemaRef"
          :height="height + 'px'"
          @auto-save="saveConfig"
        />
        <b-empty v-if="listCfg.length === 0 && !renderer">请先准备可操作的图片</b-empty>

        <transition name="fade-right">
          <div class="config-panel" v-if="configModal">
            <div class="top-bar" flex="main:justify">
              <span>{{ configTitle }}脚本配置</span>

              <div>
                <b-button size="small" plain @click="closeConfigPanel">关闭</b-button>
                <b-button size="small" plain type="primary" @click="saveGroovy">保存脚本</b-button>
              </div>
            </div>
            <div class="edit-content" :style="{ height: height + 'px' }" flex>
              <div class="editor">
                <b-ace-editor v-model="configScript" lang="groovy" :height="height + 'px'" />
              </div>
              <div class="keys">
                <div class="key-item" @click="quickGroovy">测试脚本</div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <b-modal title="当前配置" v-model="configVisible" width="700px">
      <b-ace-editor :model-value="JSON.stringify(config, null, 2)" height="400px" />
    </b-modal>
  </page-wrapper>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Message } from 'bin-ui-design'
import { initData } from './initHook'
import { deepMerge } from '@/utils/util'

const contentRef = ref(null)
const schemaRef = ref(null)

const configVisible = ref(false)
const config = ref({})
const saveData = ref(null)

const configModal = ref(false)
const configTitle = ref('')
const configScript = ref('')
const globalScript = ref('')

const currentSelectIndex = ref(-1)
const currentSelectId = ref('')
const currentCompId = ref('') // 当前点击的是那个区域
const currentCompIndex = ref(-1) // 当前点击的区域索引

// 图片列表配置
const listCfg = ref(initData())
const renderer = ref(false)
const height = ref(400)

function loadItem(item, index) {
  currentSelectIndex.value = index
  currentSelectId.value = item.id
  schemaRef.value.setConfig(item)
}
// 保存当前图片绘制的区域信息
function saveConfig(showMessage = false) {
  saveData.value = schemaRef.value.getAllConfig()

  const oldData = listCfg.value[currentSelectIndex.value]
  const newData = deepMerge({ id: oldData.id, name: oldData.name }, saveData.value)
  listCfg.value[currentSelectIndex.value] = newData
  if (showMessage) {
    Message({ type: 'success', message: '保存成功! ' })
  }
}

// 图片切换
function clickImage(item, index) {
  // 图片切换之前,先获取一下当前配置并进行保存
  if (index >= 0) {
    saveConfig()
  }
  loadItem(item, index)
}

// 全局配置
function globalConfig() {
  configTitle.value = '全局'
  configScript.value = globalScript.value
  configModal.value = true
}

// 配置图片某个区域的groovy脚本
function compGroovyConfig(item, index, comp, compIdx) {
  clickImage(item, index)

  currentCompId.value = comp.id // 缓存当前的compid
  currentCompIndex.value = compIdx

  configTitle.value = `${item.name} - ${comp.alias} - `
  configScript.value = comp.script ? comp.script : ''
  configModal.value = true
}
// 快速配置
function quickGroovy(type) {
  // TODO: 这里默认增加一段代码
  configScript.value = `
  char c1 = 'A'
  assert c1 instanceof Character

  def c2 = 'B' as char
  assert c2 instanceof Character

  def c3 = (char)'C'
  assert c3 instanceof Character`
}

function closeConfigPanel() {
  currentCompId.value = ''
  currentCompIndex.value = -1
  configTitle.value = ''
  configScript.value = ''
  configModal.value = false
}

// 保存脚本
function saveGroovy() {
  if (configTitle.value === '全局') {
    // 保存全局脚本
    globalScript.value = configScript.value
  } else {
    const item = listCfg.value[currentSelectIndex.value]
    const idx = item.comps.findIndex(c => c.id === currentCompId.value)
    if (idx > -1) {
      // 给comps 对象扩展一个属性
      item.comps[idx].script = configScript.value
      loadItem(item, currentSelectIndex.value)
    }
  }
  closeConfigPanel()
}

// 调试,检查当前配置项
function checkConfig() {
  config.value = schemaRef.value.getAllConfig()
  configVisible.value = true
}

onMounted(async () => {
  if (listCfg.value.length > 0) {
    height.value = contentRef.value.clientHeight - 48
    renderer.value = true

    // 判断当前是否有列表，如有，则载入第一个
    // 默认给第一个元素增加两个区域
    const item = listCfg.value[0]
    item.comps = [
      {
        id: 'comp_2907',
        name: 'comp_2907',
        alias: '区域_2907',
        attr: {
          x: 867,
          y: 487,
          w: 538,
          h: 135,
        },
      },
      {
        id: 'comp_2951',
        name: 'comp_2951',
        alias: '区域_2951',
        attr: {
          x: 774,
          y: 784,
          w: 664,
          h: 142,
        },
      },
    ]
    await nextTick()
    loadItem(item, 0)
  }
})
</script>

<style scoped>
.preview-panel {
  display: flex;
  background: #fff;
  height: calc(100vh - 60px - 42px - 50px - 32px);
  border: 1px solid #d9d9d9;
  overflow: hidden;
  .left-images {
    width: 260px;
    border-right: 1px solid #d9d9d9;
  }
  .right-config {
    position: relative;
    width: calc(100% - 260px);
    .config-panel {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      z-index: 10;
      .top-bar {
        padding: 8px 16px;
        background: #fff;
        border-bottom: 1px solid #d9d9d9;
      }
      &.fade-right-enter-active,
      &.fade-right-leave-active {
        transition: 0.25s;
      }
      &.fade-right-enter-from,
      &.fade-right-leave-to {
        opacity: 0;
        transform: translateX(100%);
      }
      .editor {
        width: calc(100% - 200px);
        height: 100%;
      }
      .keys {
        width: 200px;
        height: 100%;
        .key-item {
          line-height: 35px;
          padding: 0 8px;
          cursor: pointer;
          border-bottom: 1px solid #eee;
          color: rgba(0, 0, 0, 0.65);
        }
      }
    }
  }
  .top-bar {
    padding: 8px 16px;
    background: #fff;
    line-height: 30px;
    height: 49px;
    &.image-list {
      position: relative;
      border-bottom: 1px solid #d9d9d9;
      &:before {
        content: '';
        position: absolute;
        top: 12px;
        left: 0;
        bottom: 12px;
        width: 3px;
        background: #1089ff;
      }
    }
  }
  .image-list-wp {
    height: calc(100% - 50px);
    overflow-x: hidden;
    overflow-y: auto;
    padding: 8px 8px 0;
    .image-wrap {
      position: relative;
      margin-bottom: 8px;
      &.has-comps::after {
        content: '';
        position: absolute;
        top: 38px;
        left: 20px;
        bottom: 15px;
        border-left: 1px dashed #d9d9d9;
      }
    }

    .image-item {
      position: relative;
      display: flex;
      align-items: center;
      padding: 10px;
      width: 100%;
      border: 1px solid #d9d9d9;
      color: rgba(0, 0, 0, 0.65);
      > i {
        font-size: 14px;
        margin-right: 8px;
      }
      cursor: pointer;
      border-radius: 5px;
      transition: 0.2s;
      overflow: hidden;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

      &:hover {
        border-color: #1089ff;
        color: #1089ff;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
      }
      &.active {
        border-color: #1089ff;
        color: #1089ff;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
        background-color: #1088ff1d;
      }
    }
    .item-comp {
      position: relative;
      height: 30px;
      padding-left: 40px;
      margin-top: 4px;
      > span {
        display: inline-block;
        cursor: pointer;
        padding: 0 10px;
        width: 100%;
        line-height: 30px;
        color: rgba(0, 0, 0, 0.65);
        overflow: hidden;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        &:hover {
          border-color: #1089ff;
          color: #1089ff;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
        }
      }
      &.active {
        &::before {
          content: '';
          position: absolute;
          top: 13px;
          left: 40px;
          width: 5px;
          height: 5px;
          background: #1089ff;
          border-radius: 50%;
        }
        > span {
          color: #1089ff;
        }
      }
      &.edited {
        &::before {
          content: '';
          position: absolute;
          top: 13px;
          left: 40px;
          width: 5px;
          height: 5px;
          background: #52c41a;
          border-radius: 50%;
        }
        > span {
          color: #52c41a;
        }
        &.active {
          &::before {
            content: '';
            position: absolute;
            top: 13px;
            left: 40px;
            width: 5px;
            height: 5px;
            background: #1089ff;
            border-radius: 50%;
          }
          > span {
            color: #1089ff;
          }
        }
      }
      &::after {
        content: '';
        position: absolute;
        top: 15px;
        left: 20px;
        width: 20px;
        border-top: 1px dashed #d9d9d9;
      }
    }
  }
}
</style>
