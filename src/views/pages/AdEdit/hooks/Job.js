// 节点的类型
export const NodeType = {
  Start: 'start',
  Simple: 'simple', // 单一任务节点,
  Multiple: 'multiple',
  End: 'end',
}

// 节点的名称和描述
export const NodeInfo = {
  Start: {
    icon: 'play-circle-fill',
    iconColor: '#3370ff',
    title: '任务入口',
    desc: '用户发起一个任务后，流程将会从这个模块开始执行。',
  },
  Simple: {
    icon: 'index',
    iconColor: '#8b81c3',
    title: '简单任务',
    desc: '串行单一任务，节点只可以配置一个执行任务。',
  },
  Multiple: {
    icon: 'Partition',
    iconColor: '#13c2c2',
    title: '并联任务',
    desc: '并联任务，节点可以配置多个执行任务，可以并行执行，并指定条件。',
  },
  End: {
    icon: 'stop-fill',
    iconColor: '#dd6a5e',
    title: '任务终止',
    desc: '执行到该节点时，本次任务调用将会结束。',
  },
}

// 获取一个新的job
export function CreateNewJob() {
  return { jobId: '', jobName: '', error: '' }
}
