<template>
  <page-wrapper desc="表单类别的组件，可验证不同主题色的正确性。">
    <theme-color-panel />
    <b-collapse-wrap title="Form 表单输入" shadow="none" class="mb-20">
      <div class="p20" flex="main:center">
        <div style="width: 800px;">
          <b-form ref="ruleForm" :model="form" label-width="85px" :rules="ruleValidate">
            <b-form-item prop="name" label="名称">
              <b-input v-model="form.name" placeholder="用户名"></b-input>
            </b-form-item>
            <b-form-item prop="mail" label="邮箱">
              <b-input v-model="form.mail" placeholder="邮箱"></b-input>
            </b-form-item>
            <b-row>
              <b-col :span="12">
                <b-form-item prop="age" label="年龄">
                  <b-input-number style="width: 100%;" v-model="form.age" always></b-input-number>
                </b-form-item>
              </b-col>
              <b-col :span="12">
                <b-form-item label="户籍地" prop="region">
                  <b-select v-model="form.region" placeholder="请选择户籍地" clearable>
                    <b-option
                      v-for="item in cityList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></b-option>
                  </b-select>
                </b-form-item>
              </b-col>
            </b-row>
            <b-row>
              <b-col :span="12">
                <b-form-item label="出生日期" prop="birthday">
                  <b-date-picker
                    v-model="form.birthday"
                    type="datetime"
                  ></b-date-picker>
                </b-form-item>
              </b-col>
              <b-col :span="12">
                <b-form-item label="出生日期" prop="birthday">
                  <b-date-picker v-model="form.birthday" type="date" placeholder="出生日期"
                                 :shortcuts="shortcuts"></b-date-picker>
                </b-form-item>
              </b-col>
            </b-row>
            <b-row>
              <b-col :span="12">
                <b-cascader
                  v-model="selected"
                  :options="cities">
                </b-cascader>
              </b-col>
            </b-row>
            <b-form-item label="爱好" prop="hobby">
              <b-checkbox-group v-model="form.hobby">
                <b-checkbox label="打游戏" name="hobby"></b-checkbox>
                <b-checkbox label="看电影" name="hobby"></b-checkbox>
                <b-checkbox label="打篮球/运动" name="hobby"></b-checkbox>
                <b-checkbox label="看书" name="hobby"></b-checkbox>
              </b-checkbox-group>
            </b-form-item>
            <b-form-item label="性别" prop="sex">
              <b-radio-group v-model="form.sex">
                <b-radio label="男" value="male"></b-radio>
                <b-radio label="女" value="female"></b-radio>
              </b-radio-group>
            </b-form-item>
            <b-form-item label="状态" prop="status">
              <b-switch v-model="form.status" true-value="enable" false-value="disable" size="large">
                <template #open><span>启用</span></template>
                <template #close><span>禁用</span></template>
              </b-switch>
            </b-form-item>
            <b-form-item>
              <b-button type="primary" @click="submitForm('ruleForm')">提交</b-button>
              <b-button @click="resetForm('ruleForm')">重置</b-button>
            </b-form-item>
          </b-form>
        </div>
      </div>
    </b-collapse-wrap>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Page/PageWrapper'
import ThemeColorPanel from '@/views/comp/components/theme-color-panel'

export default {
  name: 'FormComp',
  components: { PageWrapper, ThemeColorPanel },
  data() {
    return {
      cityList: [
        { value: 'beijing', label: '北京' },
        { value: 'nanjing', label: '南京' },
        { value: 'shanghai', label: '上海' },
        { value: 'xuzhou', label: '徐州' },
        { value: 'guangzhou', label: '广州' },
        { value: 'shenzhen', label: '深圳' }
      ],
      shortcuts: [
        {
          text: '今日',
          value: new Date()
        },
        {
          text: '昨天',
          value: (() => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
          })()
        },
        {
          text: '一周前',
          value: (() => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
          })()
        }],
      cities: [
        {
          value: 'nanjing',
          label: '南京'
        },
        {
          value: 'xuzhou',
          label: '徐州'
        }
      ],
      form: {
        name: '',
        age: null,
        mail: '',
        region: '',
        hobby: [],
        sex: '',
        status: 'disable',
        birthday: ''
      },
      ruleValidate: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        region: [{ required: true, message: '户籍地不能为空', trigger: 'change' }],
        age: [
          { required: true, type: 'number', message: '年龄不为空', trigger: 'change' },
          { type: 'number', min: 18, trigger: 'change', message: '年龄必须在18以上' }
        ],
        hobby: [
          { type: 'array', required: true, message: '请至少选择一个爱好', trigger: 'change' }
        ],
        sex: [{ required: true, message: '性别必选', trigger: 'change' }],
        birthday: [{ required: true, type: 'date', message: '出生日期必选', trigger: 'blur' }],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      },
      selected: []
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
