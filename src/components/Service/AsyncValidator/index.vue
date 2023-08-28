<template>
  <div class="validator-wrap">
    <!--顶部操作栏-->
    <div class="mb-10" style="padding: 0 4px">
      <div style="width: 100%; line-height: 32px" flex="main:justify">
        <div>
          <b-checkbox v-model="isRequired" @change="requiredChange" style="margin-right: 0">
            必填项
          </b-checkbox>
          <b-divider type="vertical" />
          <b-dropdown @command="setRules">
            <span style="cursor: pointer; color: #13c2c2">
              静态规则
              <b-icon name="down"></b-icon>
            </span>
            <template #dropdown>
              <b-dropdown-menu>
                <b-dropdown-item
                  v-for="(name, key) in SIMPLE_RULE"
                  :key="key"
                  :name="name"
                  :disabled="hasSameRule(name)"
                >
                  {{ RULE_NAME_MAP[name] }}
                </b-dropdown-item>
              </b-dropdown-menu>
            </template>
          </b-dropdown>
          <b-divider type="vertical" />
          <b-dropdown @command="setRules">
            <span style="cursor: pointer; color: #52c41a">
              动态规则
              <b-icon name="down"></b-icon>
            </span>
            <template #dropdown>
              <b-dropdown-menu>
                <b-dropdown-item v-for="(name, key) in MULTIPLE_RULE" :key="key" :name="name">
                  {{ RULE_NAME_MAP[name] }}
                </b-dropdown-item>
              </b-dropdown-menu>
            </template>
          </b-dropdown>
        </div>
        <div>
          <b-tooltip content="初始化校验">
            <b-button background size="mini" @click="refreshRules">
              <i class="b-iconfont b-icon-reload"></i>
            </b-button>
          </b-tooltip>
          <b-tooltip content="恢复修改前校验" v-if="originalRules">
            <b-button background size="mini" @click="reload">
              <i class="b-iconfont b-icon-mr"></i>
            </b-button>
          </b-tooltip>
        </div>
      </div>
    </div>
    <!--校验项列表-->
    <ul class="check-rules-wrap" ref="rulesRef">
      <li v-for="(rule, index) in checkRules" :key="index" class="rules-list-item">
        <div class="rules-params">
          <b-space>
            <div class="role-name" :class="rulesClass(rule.name)">
              {{ RULE_NAME_MAP[rule.name] }}
            </div>
            <div class="title-box" title="触发条件">
              <span title="输入框为失焦事件，其余控件为改变事件">触发条件</span>
              <b-select
                v-model="checkRules[index].trigger"
                size="small"
                append-to-body
                @change="emitValue"
              >
                <b-option label="失焦" value="blur"></b-option>
                <b-option label="改变" value="change"></b-option>
              </b-select>
            </div>
            <div class="title-box" title="取值类型">
              <span title="非数字类型选择字符">取值类型</span>
              <b-select
                v-model="checkRules[index].type"
                size="small"
                append-to-body
                @change="emitValue"
              >
                <b-option label="字符" value="string"></b-option>
                <b-option label="数字" value="number"></b-option>
              </b-select>
            </div>
          </b-space>
        </div>
        <div class="rules-cfg">
          <!--正则匹配-->
          <template v-if="rule.name === RULE.regexp">
            <div class="title-box is-message" title="正则规则">
              <span>正则规则</span>
              <b-input
                v-model.trim="checkRules[index].regexp"
                size="small"
                placeholder="需输入字符格式"
                @change="emitValue"
              ></b-input>
            </div>
          </template>
          <b-space>
            <!--长度参数-->
            <template v-if="rule.name === RULE.length">
              <div class="title-box" title="最小值">
                <span style="width: 60px">最小值</span>
                <b-input-number
                  v-model="checkRules[index].min"
                  :min="1"
                  :max="dataLength"
                  :precision="0"
                  size="small"
                  @change="emitValue"
                ></b-input-number>
              </div>
              <div class="title-box" title="最大值">
                <span style="width: 60px">最大值</span>
                <b-input-number
                  v-model="checkRules[index].max"
                  :min="1"
                  :max="dataLength"
                  :precision="0"
                  size="small"
                  @change="emitValue"
                ></b-input-number>
              </div>
            </template>
            <!--身份证，统一社会信用代码，组织机构代码，工商注册号-->
            <template
              v-if="
                [RULE.idCode, RULE.unifiedCode, RULE.orgInstCode, RULE.regNo].includes(rule.name)
              "
            >
              <div
                class="title-box"
                title="前置字段"
                @drop="onDrop($event, index)"
                @dragover="allowDrop($event)"
              >
                <span>前置字段</span>
                <b-input
                  v-model.trim="checkRules[index].preField"
                  size="small"
                  placeholder="前置字段"
                  @change="emitValue"
                ></b-input>
              </div>
              <b-checkbox v-model="checkRules[index].ignoreCase" @change="emitValue">
                忽略大小写
              </b-checkbox>
            </template>
            <!--条件必填，条件必不填-->
            <template
              v-if="rule.name === RULE.conditionRequired || rule.name === RULE.conditionNotRequired"
            >
              <div
                class="title-box"
                title="前置字段"
                @drop="onDrop($event, index)"
                @dragover="allowDrop($event)"
              >
                <span>前置字段</span>
                <b-input
                  v-model.trim="checkRules[index].preField"
                  size="small"
                  placeholder="前置字段"
                  @change="emitValue"
                ></b-input>
              </div>
              <div class="title-box" title="前置字段值">
                <span>前置字段值</span>
                <b-input
                  v-model.trim="checkRules[index].preFieldValue"
                  size="small"
                  placeholder="前置字段值"
                  @change="emitValue"
                ></b-input>
              </div>
            </template>
            <!--条件不为某值-->
            <template v-if="rule.name === RULE.conditionNotBe">
              <div
                class="title-box"
                title="前置字段"
                @drop="onDrop($event, index)"
                @dragover="allowDrop($event)"
              >
                <span>前置字段</span>
                <b-input
                  v-model.trim="checkRules[index].preField"
                  size="small"
                  placeholder="前置字段"
                  @change="emitValue"
                ></b-input>
              </div>
              <div class="title-box" title="前置字段值">
                <span>前置字段值</span>
                <b-input
                  v-model.trim="checkRules[index].preFieldValue"
                  size="small"
                  placeholder="前置字段值"
                  @change="emitValue"
                ></b-input>
              </div>
              <div class="title-box" title="不是某值">
                <span>不是某值</span>
                <b-input
                  v-model.trim="checkRules[index].notValue"
                  size="small"
                  placeholder="不是某值"
                  @change="emitValue"
                ></b-input>
              </div>
            </template>
            <!--值不能相同-->
            <template v-if="rule.name === RULE.notSame">
              <div
                class="title-box"
                title="前置字段"
                @drop="onDrop($event, index)"
                @dragover="allowDrop($event)"
              >
                <span>前置字段</span>
                <b-input
                  v-model.trim="checkRules[index].preField"
                  size="small"
                  placeholder="前置字段"
                  @change="emitValue"
                ></b-input>
              </div>
            </template>
            <!--日期区间-->
            <template v-if="rule.name === RULE.timeBound">
              <div class="title-box" title="比较模式">
                <span>比较模式</span>
                <b-select
                  v-model="checkRules[index].compareMode"
                  append-to-body
                  size="small"
                  @change="emitValue"
                >
                  <b-option value="gt" label="&gt;"></b-option>
                  <b-option value="ge" label="&ge;"></b-option>
                  <b-option value="lt" label="&lt;"></b-option>
                  <b-option value="le" label="&le;"></b-option>
                </b-select>
              </div>
              <div class="title-box" @drop="onDrop($event, index)" @dragover="allowDrop($event)">
                <span title="比较值(yyyy-MM-dd)，可以是字段名，也可以填写$now取得当前时间">
                  比较取值
                </span>
                <b-input
                  v-model.trim="checkRules[index].time"
                  size="small"
                  @change="emitValue"
                ></b-input>
              </div>
            </template>
          </b-space>
        </div>
        <div class="rules-message">
          <div class="title-box is-message" title="错误提示">
            <span>错误提示</span>
            <b-input
              v-model.trim="checkRules[index].message"
              size="small"
              placeholder="错误提示"
              @change="emitValue"
            ></b-input>
          </div>
        </div>
        <drag-handle icon="drag-drop-line"></drag-handle>
        <div class="delete">
          <b-icon
            title="移除"
            color="#f5222d"
            name="minus-circle"
            size="20"
            type="button"
            @click="removeRules(index)"
          ></b-icon>
        </div>
      </li>
    </ul>
    <!--log-->
    <div v-if="showLog">
      <b-ace-editor :model-value="JSON.stringify(checkRules, null, 2)" readonly></b-ace-editor>
    </div>
  </div>
</template>

<script>
import { SIMPLE_RULE, MULTIPLE_RULE, TYPE, RULE, RULE_NAME_MAP, TRIGGER } from './util'
import { computed, ref, watch } from 'vue'
import useSortable from '@/hooks/useSortable'
import DragHandle from '@/components/Common/DragHandle/index.vue'

/**
 * 校验控制参数，受业务影响
 * 可传入当前字段长度控制最大值
 * 可传入staticMap，和asyncMap给定校验的选项值，但必须确保选项值在util.js中已定义
 */
export default {
  name: 'async-validator',
  components: { DragHandle },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    dataLength: Number, // 当前字段的数据长度
    originalRules: {
      // 存储原始配置校验参数，即保存时保存一个初始副本
      type: String,
    },
    showLog: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const isRequired = ref(false)
    const checkRules = ref([])

    const { listRef: rulesRef } = useSortable(checkRules, emitValue)
    // 当前是否有必填校验
    const hasRequiredRule = computed(() => !!hasSameNameRule(RULE.required))

    // 是否存在相同名称的校验项
    const hasSameNameRule = name => checkRules.value.find(item => item.name === name)

    // 是否有相同名称的校验项
    function hasSameRule(name) {
      if (MULTIPLE_RULE[name]) {
        return false
      } else {
        return !!hasSameNameRule(name)
      }
    }

    // rulesClass样式
    function rulesClass(name) {
      if (name === RULE.required) {
        return 'is-required'
      } else if (MULTIPLE_RULE[name.slice(1)]) {
        return 'is-multiple'
      } else {
        return 'is-normal'
      }
    }

    // 字段放置
    function allowDrop(e) {
      e.preventDefault()
    }

    // 字段填充
    function onDrop(e, index) {
      // eslint-disable-next-line no-prototype-builtins
      if (checkRules.value[index].hasOwnProperty('preField')) {
        checkRules.value[index].preField = e.dataTransfer.getData('index')
      }
      // eslint-disable-next-line no-prototype-builtins
      if (checkRules.value[index].hasOwnProperty('time')) {
        checkRules.value[index].time = e.dataTransfer.getData('index')
      }
      emitValue()
      e.preventDefault()
    }

    // 必填change事件
    function requiredChange(val) {
      if (val) {
        setRules(RULE.required)
      } else {
        checkRules.value = checkRules.value.filter(item => item.name !== RULE.required)
        emitValue()
      }
    }

    // 增加校验，即增加默认参数配置
    function setRules(ruleType) {
      if (ruleType === RULE.required && hasRequiredRule.value) return
      const normalCfg = name => ({ name, type: TYPE[0], trigger: TRIGGER[0] })
      // 根据不同的校验名增加不同的校验对象
      switch (ruleType) {
        case RULE.required:
          checkRules.value.unshift({
            ...normalCfg(ruleType),
            message: '必填项',
          })
          break
        case RULE.length:
          checkRules.value.push({
            ...normalCfg(ruleType),
            min: 1,
            max: props.dataLength || Infinity,
            message: '长度必须在指定的范围内',
          })
          break
        case RULE.email:
          checkRules.value.push({
            ...normalCfg(ruleType),
            message: '邮箱格式不正确',
          })
          break
        case RULE.phone:
          checkRules.value.push({
            ...normalCfg(ruleType),
            message: '手机号格式不正确',
          })
          break
        case RULE.idCode:
          checkRules.value.push({
            ...normalCfg(ruleType),
            preField: '', // 前置判断字段
            message: '身份证格式不正确',
            ignoreCase: true,
          })
          break
        case RULE.unifiedCode:
          checkRules.value.push({
            ...normalCfg(ruleType),
            preField: '',
            message: '统一社会信用代码格式不正确',
            ignoreCase: true,
          })
          break
        case RULE.orgInstCode:
          checkRules.value.push({
            ...normalCfg(ruleType),
            preField: '',
            message: '组织机构代码格式不正确',
            ignoreCase: true,
          })
          break
        case RULE.regNo:
          checkRules.value.push({
            ...normalCfg(ruleType),
            preField: '',
            message: '工商注册号格式不正确',
            ignoreCase: true,
          })
          break
        case RULE.regexp:
          checkRules.value.push({
            ...normalCfg(ruleType),
            regexp: '',
            message: '正则表达式不匹配',
          })
          break
        case RULE.conditionRequired:
          checkRules.value.push({
            ...normalCfg(ruleType),
            preField: '',
            preFieldValue: '',
            message: '当前字段在前置字段条件达成下必填',
          })
          break
        case RULE.conditionNotRequired:
          checkRules.value.push({
            ...normalCfg(ruleType),
            preField: '',
            preFieldValue: '',
            message: '当前字段在前置字段条件达成下不可填写',
          })
          break
        case RULE.conditionNotBe:
          checkRules.value.push({
            ...normalCfg(ruleType),
            preField: '',
            preFieldValue: '',
            notValue: '',
            message: '当前字段在前置字段条件达成下不能为某值',
          })
          break
        case RULE.notSame:
          checkRules.value.push({
            ...normalCfg(ruleType),
            preField: '',
            message: '不能和前置字段值相同',
          })
          break
        case RULE.timeBound:
          checkRules.value.push({
            ...normalCfg(ruleType),
            time: '$now',
            compareMode: 'gt',
            message: '日期不符合区间设置',
          })
          break
        default:
          break
      }
      emitValue()
    }

    // 移除某个类型的校验
    function removeRules(index) {
      checkRules.value.splice(index, 1)
      emitValue()
    }

    // 重载校验信息
    function reload() {
      if (props.originalRules) {
        emit('update:modelValue', props.originalRules)
        emit('change', props.originalRules)
      }
    }

    // 重置校验
    function refreshRules() {
      checkRules.value = []
      isRequired.value = false
      emitValue()
    }

    // 更新emit
    function emitValue() {
      const value = checkRules.value.length ? JSON.stringify(checkRules.value) : ''
      emit('update:modelValue', value)
      emit('change', value)
    }

    // 初始value监听watch
    watch(
      () => props.modelValue,
      val => {
        if (val === '') {
          refreshRules()
          return
        }
        try {
          checkRules.value = JSON.parse(val)
          isRequired.value = hasRequiredRule.value
        } catch (e) {
          console.warn('async-validator: model-value is not a right json，rules is reset')
          refreshRules()
        }
      },
      { immediate: true },
    )
    return {
      rulesRef,
      SIMPLE_RULE,
      MULTIPLE_RULE,
      RULE, // 校验基础名称枚举
      RULE_NAME_MAP, // 校验名称中文映射
      TRIGGER, // 触发条件，默认blur
      TYPE, // 校验类型，默认string
      hasRequiredRule,
      isRequired,
      checkRules,
      rulesClass,
      requiredChange,
      setRules,
      removeRules,
      hasSameRule,
      emitValue,
      allowDrop,
      onDrop,
      reload,
      refreshRules,
    }
  },
}
</script>

<style scoped>
.validator-wrap {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 2px;
  .check-rules-wrap {
    min-width: 600px;
  }
  .rules-list-item {
    position: relative;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px dashed rgba(0, 0, 0, 0.1);
    padding: 6px;
    .rules-params {
      .role-name {
        width: 164px;
        padding: 0 8px;
        background: #e6fffb;
        border: 1px solid #87e8de;
        color: #13c2c2;
        line-height: 26px;
        height: 28px;
        &.is-required {
          background-color: #fef3f4;
          border-color: #fdd2d5;
          color: #f5222d;
        }
        &.is-multiple {
          background-color: #f6fcf3;
          border-color: #dcf3d1;
          color: #52c41a;
        }
      }
    }
    .rules-cfg,
    .rules-message {
      margin-top: 6px;
    }
    .title-box {
      display: flex;
      align-items: center;
      width: 164px;
      > span {
        border: 1px solid #dcdfe6;
        background: #f7f7f7;
        border-right: none;
        border-radius: 2px 0 0 2px;
        height: 28px;
        line-height: 26px;
        text-align: center;
        width: 74px;
        flex-shrink: 0;
        flex-grow: 0;
      }
      &.is-message {
        width: 100%;
      }
      :deep(.bin-input-number) {
        width: auto;
      }
      :deep(input.bin-input) {
        padding: 0 10px;
      }
    }
    .delete {
      position: absolute;
      top: 2px;
      right: 2px;
    }
    .handle {
      position: absolute;
      right: 30px;
      top: 3px;
      z-index: 10;
    }
  }

  .blue-background-class {
    position: relative;
    font-size: 0;
    border: 1px dashed var(--v-g-primary-color) !important;
    z-index: 1;
    &::after {
      position: absolute;
      content: '';
      display: block;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      background: #fff !important;
      background-image: linear-gradient(
        var(--bin-color-primary-light5),
        var(--bin-color-primary-light3),
        var(--bin-color-primary-light5)
      ) !important;
    }
  }
  .drag-item-class {
    background: #fff !important;
    border: 1px solid var(--v-g-primary-color) !important;
  }
}
</style>
