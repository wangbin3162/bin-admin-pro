<template>
  <page-container desc="将一个冗长或用户不熟悉的表单任务分成多个步骤，分布提交，确保用户操作面板的精简。" bg>
    <b-row type="flex" justify="center" class="mb-20">
      <b-col span="12">
        <b-steps :current="step">
          <b-step title="填写转账信息"></b-step>
          <b-step title="确认转账信息"></b-step>
          <b-step title="完成"></b-step>
        </b-steps>
      </b-col>
    </b-row>
    <template v-if="step === 0">
      <b-row type="flex" justify="center">
        <b-col span="12">
          <b-form :model="form1" :rules="rules1" ref="form1Ref" label-width="100px" label-suffix=":">
            <b-form-item prop="payment" label="付款账户">
              <b-select v-model="form1.payment" placeholder="请选择付款账户" clearable>
                <b-option label="wangbin3162@qq.com" value="wangbin3162@qq.com"></b-option>
              </b-select>
            </b-form-item>
            <b-form-item prop="collection" label="收款账户">
              <b-input v-model="form1.collection">
                <template #prepend>
                  <b-select v-model="form1.collectionType" style="width: 100px">
                    <b-option label="wechat" value="微信"></b-option>
                    <b-option label="alipay" value="支付宝"></b-option>
                  </b-select>
                </template>
              </b-input>
            </b-form-item>
            <b-form-item prop="name" label="收款人名称">
              <b-input v-model="form1.name"></b-input>
            </b-form-item>
            <b-form-item prop="money" label="金额">
              <b-input-number
                :max="10000"
                v-model="form1.money"
                :formatter="value => `¥ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
                :parser="value => value.replace(/¥s?|(,*)/g, '')"
              ></b-input-number>
            </b-form-item>
            <b-form-item>
              <b-button type="primary" @click="next">下一步</b-button>
            </b-form-item>
          </b-form>
        </b-col>
      </b-row>
    </template>
    <template v-if="step === 1">
      <b-row type="flex" justify="center">
        <b-col span="12">
          <b-alert show-icon closable>确认支付后，资金会直接打入对方账户，无法退回。</b-alert>
          <b-form :model="form2" ref="form2Ref" label-width="100px" label-suffix=":">
            <b-form-item label="付款账户">
              <label>{{ form1.payment }}</label>
            </b-form-item>
            <b-form-item label="收款账户">
              <label>{{ form1.collection }}</label>
            </b-form-item>
            <b-form-item label="收款人名称">
              <label>{{ form1.name }}</label>
            </b-form-item>
            <b-form-item label="金额">
              <label>¥ {{ form1.money }}</label>
            </b-form-item>
            <b-divider></b-divider>
            <b-form-item
              label="支付密码"
              prop="password"
              :rules="{ required: true, message: '域名不能为空', trigger: 'blur' }"
            >
              <b-input v-model="form2.password" type="password"></b-input>
            </b-form-item>
            <b-form-item>
              <b-button type="primary" :loading="loading" @click="submitForm">提 交</b-button>
              <b-button @click="prev">上一步</b-button>
            </b-form-item>
          </b-form>
        </b-col>
      </b-row>
    </template>
    <template v-if="step === 2">
      <result status="success">
        <template #desc>预计2小时内到账</template>
        <template #extra>
          <b-form label-width="100px" label-suffix=":">
            <b-form-item label="付款账户">
              <label>{{ form1.payment }}</label>
            </b-form-item>
            <b-form-item label="收款账户">
              <label>{{ form1.collection }}</label>
            </b-form-item>
            <b-form-item label="收款人名称">
              <label>{{ form1.name }}</label>
            </b-form-item>
            <b-form-item label="金额">
              <label>¥ {{ form1.money }}</label>
            </b-form-item>
          </b-form>
        </template>
        <template #actions>
          <b-button type="primary" @click="step = 0">再转一笔</b-button>
          <b-button>查看账单</b-button>
        </template>
      </result>
    </template>

    <!--表单的说明信息等-->
    <div v-if="step === 0">
      <b-divider></b-divider>
      <b-alert>
        说明
        <template #desc>
          <p>如果需要，这里可以放置一些表单字段的解释或者说明信息。</p>
          <p>如果需要，这里可以放置一些表单字段的解释或者说明信息。</p>
        </template>
      </b-alert>
    </div>
  </page-container>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'StepForm',
  setup() {
    const step = ref(0)
    const form1Ref = ref(null)
    const form2Ref = ref(null)
    const form1 = ref({
      payment: 'wangbin3162@qq.com',
      collectionType: 'wechat',
      collection: 'bin@.admin',
      name: 'Wang',
      money: 100,
    })
    const form2 = ref({
      password: '123456',
    })
    const loading = ref(false)

    function next() {
      if (!form1Ref.value) return
      form1Ref.value.validate(valid => {
        if (valid) {
          step.value = 1
        }
      })
    }

    function prev() {
      step.value = 0
    }

    function submitForm() {
      if (!form2Ref.value) return
      form2Ref.value.validate(valid => {
        if (valid) {
          loading.value = true
          setTimeout(() => {
            step.value = 2
            loading.value = false
          }, 1500)
        }
      })
    }

    return {
      step,
      form1Ref,
      form2Ref,
      form1,
      rules1: {
        payment: [{ required: true, message: '请选择付款账户', trigger: 'change' }],
        collection: [{ required: true, message: '请输入收款账户', trigger: 'blur' }],
        name: [{ required: true, message: '请输入收款人姓名', trigger: 'blur' }],
        money: [{ required: true, type: 'number', message: '请输入正确的金额', trigger: 'blur' }],
      },
      form2,
      loading,
      next,
      prev,
      submitForm,
    }
  },
}
</script>
