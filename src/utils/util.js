import { Utils, Message, Notice, MessageBox } from 'bin-ui-next'

export const generateId = Utils.helper.generateId

export const typeOf = Utils.util.typeOf

export const deepCopy = Utils.util.deepCopy

export const throttle = Utils.util.throttle

export const debounce = Utils.util.debounce

export const isEmpty = Utils.helper.isEmpty

export const on = Utils.dom.on

export const off = Utils.dom.off

export const addResizeListener = Utils.resize.addResizeListener

export const removeResizeListener = Utils.resize.removeResizeListener

/**
 * arraybuffer 流文件转换为base64图像
 * @param data
 */
export function arraybuffer2Base64(data) {
  return 'data:image/png;base64,' +
    window.btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
}

/**
 * 抛异常公共函数，用于请求接口或其他异常捕捉错误信息
 * @param callFun 调用函数，用于记录错误调用来源 ，一般复制当前啊函数名称，或者填入说明信息 login/getVerifyCode
 * @param e 错误消息
 * @param type 错误消息类型【message，notice,alert】
 * @param title alert和notice模块选填，错误标题
 * @param log 是否打印到控制台
 */
export function throwError(callFun, e, type = 'message', title, log = true) {
  const msg = e.message || '操作错误！'
  if (type === 'alert') {
    MessageBox.alert({ type: 'error', title: title || '错误', message: msg })
  } else if (type === 'notice') {
    Notice.error({ title: title || '错误', message: msg })
  } else {
    Message.error({ duration: 4.5, message: msg, showClose: true })
  }
  if (log) {
    const str = callFun.split('/')
    if (str && str.length >= 2) {
      Utils.log.pretty(str[0], str[1], 'danger')
    }
    console.log(e)
    Utils.log.danger('----------------------------------------------------------')
  }
}
