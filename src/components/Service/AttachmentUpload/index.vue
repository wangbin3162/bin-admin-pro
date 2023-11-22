<template>
  <div class="attachment-upload-wrap">
    <div class="normal-title mb-8" flex="cross:center" v-if="!onlyFiles">
      <b-space>
        <span v-if="title">添加规范文档</span>
        <b-upload
          action="/"
          :show-upload-list="false"
          :multiple="multiple"
          :before-upload="handleUpload"
        >
          <b-button background :size="size" :loading="loadingStatus">{{ text }}</b-button>
        </b-upload>
        <!--多选模式需要手动触发上传事件-->
        <b-button
          v-if="multiple && uploadFiles.length"
          type="primary"
          :size="size"
          icon="upload"
          :loading="loadingStatus"
          @click="doUpload"
        >
          上传
        </b-button>
      </b-space>
    </div>
    <div class="tip mb-8" v-if="tip">{{ tip }}</div>
    <ul class="file-list">
      <li v-for="(file, index) in fileList" :key="index" class="file-list-file">
        <div class="file-name">
          <i :class="`b-iconfont b-icon-${format(file.fileName)}`"></i>
          <span :title="file.name">{{ file.fileName }}</span>
        </div>
        <i
          v-if="!onlyFiles"
          class="b-iconfont b-icon-close file-list-remove"
          @click.stop.prevent="handleRemove(index)"
        ></i>
        <i
          v-if="file.id"
          title="下载文件"
          class="b-iconfont b-icon-vertical-align-botto file-list-download"
          @click.stop.prevent="handleDownload(file, index)"
        ></i>
      </li>
      <li v-for="(file, index) in uploadFiles" :key="index" class="file-list-file">
        <div class="file-name" style="color: #999">
          <span style="flex-shrink: 0" class="mr-5">待上传</span>
          <span :title="file.name">{{ file.name }}</span>
        </div>
        <i
          class="b-iconfont b-icon-close file-list-remove"
          @click.stop.prevent="handleRemoveFiles(index)"
        ></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { Message, MessageBox } from 'bin-ui-design'
import { deepCopy, downloadFile, throwError } from '@/utils/util'
import { commonDownload, commonUpload } from '@/api/common.api'

export default {
  name: 'AttachmentUpload',
  props: {
    title: {
      type: String,
    },
    text: {
      type: String,
      default: '上传附件',
    },
    tip: {
      type: String,
    },
    modelValue: {
      type: Array,
      default() {
        return []
      },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: Array,
      default() {
        return [] // 接收文件后缀名列表,会进行过滤筛选
      },
    },
    size: {
      type: String,
      default: 'default',
    },
    max: {
      type: Number,
      default: 10,
    },
    onlyFiles: Boolean, // 是否仅展示文件列表
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const fileList = ref([]) // 用于数据回显的数据集合
    const uploadFiles = ref([]) // 实际上传的文件集合
    const loadingStatus = ref(false)

    watch(
      () => props.modelValue,
      val => {
        fileList.value = deepCopy(val)
      },
      { immediate: true },
    )

    // 获取文件后缀名
    function getFileLast(name) {
      return name.split('.').pop().toLocaleLowerCase() || ''
    }

    // 格式化文件类型
    function format(name) {
      const format = getFileLast(name)
      let type = 'file-text'

      if (['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'].indexOf(format) > -1) {
        type = 'image'
      }
      if (['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'].indexOf(format) > -1) {
        type = 'video'
      }
      if (['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'].indexOf(format) > -1) {
        type = 'Youtube'
      }
      if (['pages', 'epub', 'pdf'].indexOf(format) > -1) {
        type = 'file-pdf'
      }
      if (['numbers', 'csv', 'xls', 'xlsx'].indexOf(format) > -1) {
        type = 'file-excel'
      }
      if (['keynote', 'ppt', 'pptx'].indexOf(format) > -1) {
        type = 'file-ppt'
      }

      return type
    }

    function handleUpload(file) {
      // 先判定接受类型
      if (props.accept.length > 0) {
        const hz = getFileLast(file.name)
        if (!props.accept.includes(hz)) {
          Message.error('请上传指定文件类型的文件!')
          return false
        }
      }
      // 判断单个文件大小和总大小都需要小雨最大值
      const singleSize = file.size / 1024 / 1024
      if (singleSize > props.max) {
        Message.error(`单个文件大小不得超过${props.max}M`)
        return false
      }
      // 实际文件存储列表
      uploadFiles.value.push(file)
      if (!props.multiple) {
        // 非多选则自动调用一次上传方式
        doUpload()
      }

      return false
    }

    // 实际调用上传方法
    async function doUpload() {
      const attachments = uploadFiles.value
      loadingStatus.value = true
      try {
        const list = await commonUpload(attachments)
        fileList.value = [...fileList.value, ...list]
        emitValue()
        Message.success('上传成功！')
      } catch (e) {
        throwError('AttachmentUpload/doUpload', e)
      }
      loadingStatus.value = false
      uploadFiles.value = [] // 清空暂存文件列表
    }

    // 移除一个
    function handleRemove(index) {
      MessageBox.confirm({
        type: 'warning',
        title: '提示',
        message: `<p>确定要删除, 是否继续?</p>`,
        useHTML: true,
      })
        .then(() => {
          fileList.value.splice(index, 1)
          emitValue()
        })
        .catch(() => {})
    }

    function handleRemoveFiles(index) {
      MessageBox.confirm({
        type: 'warning',
        title: '提示',
        message: `<p>确定要删除, 是否继续?</p>`,
        useHTML: true,
      })
        .then(() => {
          uploadFiles.value.splice(index, 1)
        })
        .catch(() => {})
    }

    async function handleDownload(file, index) {
      try {
        const { data } = await commonDownload(file.id)
        downloadFile(data, file.fileName)
      } catch (e) {
        throwError('AttachmentUpload/handleDownload', e)
      }
    }

    function emitValue() {
      emit('update:modelValue', fileList.value)
    }

    return {
      fileList,
      loadingStatus,
      handleUpload,
      uploadFiles,
      handleRemove,
      format,
      handleDownload,
      emitValue,
      doUpload,
      handleRemoveFiles,
    }
  },
}
</script>

<style scoped>
.attachment-upload-wrap {
  display: inline-block;
  width: 100%;
  .tip {
    font-size: 12px;
    color: var(--v-g-text-color);
  }
  .file-list {
    &-file {
      padding: 4px;
      color: #515a6e;
      border-radius: 4px;
      font-size: 14px;
      height: 34px;
      transition: background-color 0.2s ease-in-out;
      overflow: hidden;
      position: relative;
      .file-name {
        display: inline-flex;
        align-items: center;
        height: 100%;
        width: calc(100% - 24px);
        > span:last-child {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        i {
          font-size: 16px;
          margin-right: 4px;
          color: #515a6e;
        }
      }
      &:hover {
        background: #f3f3f3;
        .file-list-download,
        .file-list-remove {
          display: block;
        }
      }
    }
    &-download,
    &-remove {
      display: none;
      font-size: 16px;
      cursor: pointer;
      float: right;
      margin-right: 4px;
      color: #999;
      &:hover {
        color: #444;
      }
    }
    &-download {
      &:hover {
        color: var(--bin-color-primary);
      }
    }
  }
}
</style>
