import { exportExcel } from './export'
import { Message } from 'bin-ui-design'
// 创建虚拟列表并进行下载
export function downloadExcel(sheets, fileName, successMsg = '导出成功!') {
  exportExcel(sheets, fileName).then(() => {
    Message.success(successMsg)
  })
}
