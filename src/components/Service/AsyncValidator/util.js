import { isEmpty } from '@/utils/util'
import { isIdCard, isOrgNo, isRegNo, isUnifiedCode, isDate } from '@/utils/validate'

/**
 * 触发条件枚举
 */
export const TRIGGER = ['blur', 'change']

/**
 * 触发条件枚举
 */
export const TYPE = ['string', 'number']

/**
 * 静态校验
 */
export const SIMPLE_RULE = {
  length: '$length',
  email: '$email',
  phone: '$phone',
  idCode: '$idCode',
  unifiedCode: '$unifiedCode',
  orgInstCode: '$orgInstCode',
  regNo: '$regNo',
}
/**
 * 可多次添加的特殊校验名称
 */
export const MULTIPLE_RULE = {
  regexp: '$regexp',
  conditionRequired: '$conditionRequired',
  conditionNotRequired: '$conditionNotRequired',
  conditionNotBe: '$conditionNotBe',
  notSame: '$notSame',
  timeBound: '$timeBound',
}
/**
 * 校验枚举值，全部
 */
export const RULE = {
  required: '$required',
  ...SIMPLE_RULE,
  ...MULTIPLE_RULE,
}

/**
 * 校验枚举值名称
 */
export const RULE_NAME_MAP = {
  $required: '必填项',
  $length: '长度参数',
  $email: '邮箱参数',
  $phone: '手机号码',
  $regexp: '正则匹配',
  $idCode: '身份证',
  $unifiedCode: '统一社会信用代码',
  $orgInstCode: '组织机构代码',
  $regNo: '工商注册号',
  $conditionRequired: '条件必填',
  $conditionNotRequired: '条件必不填',
  $conditionNotBe: '条件不为某值',
  $notSame: '值不能相同',
  $timeBound: '日期区间',
}

/**
 * 校验生成器对象根据不同类型的校验返回符合form-item类型的校验对象
 */
export const validatorBuild = {
  // 必填字段 opts: { message,trigger,type}
  $required: function (opts) {
    return { required: true, message: opts.message, trigger: opts.trigger, type: opts.type }
  },
  // 长度 opts: { min,max,message,trigger,type }
  $length: function (opts) {
    return { min: opts.min, max: opts.max, message: opts.message, trigger: opts.trigger, type: opts.type }
  },
  // 邮箱 opts: { message,trigger }
  $email: function (opts) {
    return { type: 'email', message: opts.message, trigger: opts.trigger }
  },
  // 手机号 opts: { message,trigger }
  $phone: function (opts) {
    return { pattern: /^((0\d{2,3}-\d{7,8})|(1[35874]\d{9}))$/, message: opts.message, trigger: opts.trigger }
  },
  // 正则表达式  opts: { regexp,message,trigger }
  $regexp: function (opts) {
    return { pattern: new RegExp(opts.regexp), message: opts.message, trigger: opts.trigger }
  },
  /* =========[信息项规则]=============== */
  // 居民身份证号码 opts: { preField,ignoreCase,message,trigger }
  $idCode: function (opts, obj) {
    if (!obj) {
      return null
    }
    return {
      validator: (rule, value, callback) => {
        // 需判断证件类型值，这里要求配置校验规则时区分法人与自然人
        const preField = obj[opts.preField]// 前置字段当前值
        // 判断前置字段不满足情况 字段名为空，字段值为空或者不等于目标值的时候，返回true
        const preFieldRule = (!isEmpty(opts.preField) && preField !== 'N1')
        const caseValue = opts.ignoreCase ? String(value).toUpperCase() : value
        const result = (isEmpty(value) || preFieldRule || isIdCard(caseValue))
        if (!result) callback(new Error(opts.message))
        callback()
      },
      trigger: opts.trigger,
    }
  },
  // 统一社会信用代码 opts: { preField,ignoreCase,message,trigger }
  $unifiedCode: function (opts, obj) {
    if (!obj) {
      return null
    }
    return {
      validator: (rule, value, callback) => {
        const preField = obj[opts.preField] // 前置字段当前值
        const preFieldRule = !isEmpty(opts.preField) && preField !== 'L1'
        // 需判是否需要级联判断id_type，统一社会信用代码为L1，工商注册号代码为L2，组织机构代码为L3
        const caseValue = opts.ignoreCase ? String(value).toUpperCase() : value
        const result = (isEmpty(value) || value === '00000000000000000X' || preFieldRule || isUnifiedCode(caseValue))
        if (!result) callback(new Error(opts.message))
        // console.log('$unifiedCode', result)
        callback()
      },
      trigger: opts.trigger,
    }
  },
  // 工商注册号 opts: { preField, ignoreCase,message,trigger }
  $regNo: function (opts, obj) {
    if (!obj) {
      return null
    }
    return {
      validator: (rule, value, callback) => {
        const preField = obj[opts.preField] // 前置字段当前值
        const preFieldRule = !isEmpty(opts.preField) && preField !== 'L2'
        // 需判是否需要级联判断id_type，统一社会信用代码为L1，工商注册号代码为L2，组织机构代码为L3
        const caseValue = opts.ignoreCase ? String(value).toUpperCase() : value
        const result = (isEmpty(value) || preFieldRule || isRegNo(caseValue))
        if (!result) callback(new Error(opts.message))
        // console.log('$regNo', result)
        callback()
      },
      trigger: opts.trigger,
    }
  },
  // 组织机构代码 opts: { preField,ignoreCase,message,trigger }
  $orgInstCode: function (opts, obj) {
    if (!obj) {
      return null
    }
    return {
      validator: (rule, value, callback) => {
        const preField = obj[opts.preField] // 前置字段当前值
        const preFieldRule = !isEmpty(opts.preField) && preField !== 'L3'
        // 需判是否需要级联判断id_type，统一社会信用代码为L1，工商注册号代码为L2，组织机构代码为L3
        const caseValue = opts.ignoreCase ? String(value).toUpperCase() : value
        const result = (isEmpty(value) || preFieldRule || isOrgNo(caseValue))
        if (!result) callback(new Error(opts.message))
        // console.log('$orgInstCode', result)
        callback()
      },
      trigger: opts.trigger,
    }
  },
  // 条件必填 opts: { preField, preFieldValue,message,trigger} obj:form
  $conditionRequired: function (opts, obj) {
    if (!obj) {
      return null
    }
    return {
      validator: (rule, value, callback) => {
        const preField = obj[opts.preField]// 前置字段当前值
        const preFieldValue = opts.preFieldValue// 前置字段需要匹配的值
        // console.log(preField, preFieldValue)
        if (
          (isEmpty(preField) && isEmpty(preFieldValue)) ||
          (preField === preFieldValue) ||
          (isEmpty(preFieldValue) && String(preField) === preFieldValue) ||
          (!isEmpty(preFieldValue) && String(preField).includes(preFieldValue))
        ) {
          if (isEmpty(value)) callback(new Error(opts.message))
        }
        callback()
      },
      trigger: opts.trigger,
    }
  },
  // 条件必不填 opts: { preField, preFieldValue,message,trigger} obj:form
  $conditionNotRequired: function (opts, obj) {
    if (!obj) {
      return null
    }
    return {
      validator: (rule, value, callback) => {
        const preField = obj[opts.preField]// 前置字段当前值
        const preFieldValue = opts.preFieldValue// 前置字段需要匹配的值
        // console.log(opts.preField + ':' + preField)
        // console.log((String(preField) === preFieldValue), (String(preField).includes(preFieldValue)))
        if (
          (isEmpty(preField) && isEmpty(preFieldValue)) ||
          (preField === preFieldValue) ||
          (isEmpty(preFieldValue) && String(preField) === preFieldValue) ||
          (!isEmpty(preFieldValue) && String(preField).includes(preFieldValue))
        ) {
          if (!isEmpty(value)) callback(new Error(opts.message))
        }
        callback()
      },
      trigger: opts.trigger,
    }
  },
  // 条件不能为某值 opts: { preField, preFieldValue,notValue,message,trigger} obj:form
  $conditionNotBe: function (opts, obj) {
    if (!obj) {
      return null
    }
    return {
      validator: (rule, value, callback) => {
        const preField = obj[opts.preField]// 前置字段当前值
        const preFieldValue = opts.preFieldValue// 前置字段需要匹配的值
        if (
          (preField === preFieldValue) ||
          (isEmpty(preFieldValue) && String(preField) === preFieldValue) ||
          (!isEmpty(preFieldValue) && String(preField).includes(preFieldValue))
        ) {
          if (value === opts.notValue || String(value) === opts.notValue) {
            callback(new Error(opts.message))
          }
        }
        callback()
      },
      trigger: opts.trigger,
    }
  },
  // 值不能相同 opts: { preField,message,trigger} obj:form
  $notSame: function (opts, obj) {
    if (!obj) {
      return null
    }
    return {
      validator: (rule, value, callback) => {
        const preField = obj[opts.preField]// 前置字段当前值
        if ((preField && (String(preField) === value)) || (preField === value)) {
          callback(new Error(opts.message))
        }
        callback()
      },
      trigger: opts.trigger,
    }
  },
  // 日期区间验证 opts: { time, compareMode:{gt,ge,lt,le} ,message , trigger} obj:form
  $timeBound: function (opts, obj) {
    if (!obj) {
      return null
    }
    return {
      validator: (rule, value, callback) => {
        if (isEmpty(value)) {
          callback()
          return
        }
        // 计算实际时间 // 获取实际时间，$now 当前时间，or 2099-01-01 or preField前置字段
        let otherTime
        if (opts.time === '$now') {
          otherTime = new Date()
          // console.log('time is $now')
        } else {
          if (isDate(opts.time)) {
            // 转换2020-01-01 中划线，转换date时取东八区8点补全
            otherTime = new Date(opts.time.replace(/-/g, '/'))
            // console.log(otherTime)
            // console.log('time is date string')
          } else {
            const preField = obj[opts.time]// 前置字段当前值
            otherTime = isDate(preField) ? new Date(preField.replace(/-/g, '/')) : null
            // console.log('time is field[' + opts.time + ']:' + preField)
          }
        }
        const mode = opts.compareMode // 比较模式
        const thisTime = new Date(value.replace(/-/g, '/'))
        let result = true // 校验结果
        if (otherTime) {
          switch (mode) {
            case 'gt':
              result = thisTime > otherTime
              break
            case 'ge':
              result = thisTime >= otherTime
              break
            case 'lt':
              result = thisTime < otherTime
              break
            case 'le':
              result = thisTime <= otherTime
              break
          }
        }
        if (!result) callback(new Error(opts.message))
        callback()
      },
      trigger: opts.trigger,
    }
  },
}
