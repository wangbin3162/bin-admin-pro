<template>
  <page-wrapper>
    <template #desc>
      <div>动态编写执行函数体，执行获取返回数据。</div>
    </template>
    <b-collapse-wrap title="基础动态编码" shadow="none" class="mb-16">
      <div flex>
        <div class="p10" style="width: 40%">
          <b-alert show-icon>
            动态指定字段名称
            <template #desc>
              <p>选择字段拖入配置区域</p>
              <p>填写配置，右侧会自动拼接函数参数。</p>
            </template>
          </b-alert>
          <div>
            字段候选
            <b-tag type="primary" draggable="true" @dragstart="dragField($event, 'name')">
              name
            </b-tag>
            <b-tag type="info" draggable="true" @dragstart="dragField($event, 'price')">
              price
            </b-tag>
            <b-tag type="success" draggable="true" @dragstart="dragField($event, 'num')">num</b-tag>
            <b-tag type="warning" draggable="true" @dragstart="dragField($event, 'discount')">
              discount
            </b-tag>
            <b-tag type="danger" draggable="true" @dragstart="dragField($event, 'breaks')">
              breaks
            </b-tag>
          </div>
          <b-divider style="margin: 10px 0"></b-divider>
          <div class="drop-wrapper" @drop="dropField($event)" @dragover="allowDrop($event)">
            <p class="tip" v-if="fieldsMapping.length === 0">拖动字段到此处进行配置</p>
            <key-value-mapping v-model="fieldsMapping" :show-add="false"></key-value-mapping>
          </div>

          <b-divider style="margin: 10px 0"></b-divider>

          <b-button type="primary" @click="runTest1">执行计算</b-button>

          <b-divider style="margin: 10px 0"></b-divider>

          <b-alert type="success" v-if="fieldsTitle" show-icon>
            执行计算成功
            <template #desc>{{ fieldsTitle }}</template>
          </b-alert>
        </div>
        <div class="p10" style="width: 60%">
          <b-alert show-icon>
            <template #icon>
              <b-icon name="codelibrary"></b-icon>
            </template>
            计算函数
            <template #desc>
              <p>函数体入参根据配置传入，内部可直接使用，输入自定义计算函数并返回即可。</p>
              <p>函数体内代码遵循js编写规范，内有代码提示，如代码编写错误则执行计算时会报错。</p>
            </template>
          </b-alert>
          <func-body-editor
            ref="fieldsEditRef"
            v-model="fieldsFuncBody"
            :augments="fieldsMapping.map(v => v.key)"
          ></func-body-editor>

          <b-divider style="margin: 10px 0"></b-divider>

          <div class="example">
            示例代码：
            <p>拼接字符串：</p>
            <p style="padding-left: 8px">
              return `${name} 商品 ，单价${price} ，数量${num} ，总价: ${price*num}`;
            </p>
            <p>返回布尔值：</p>
            <p style="padding-left: 8px">return (price * num) * discount >= 200</p>
            <p>复杂计算逻辑：</p>
            <p style="padding-left: 8px">// 如果有折扣则计算折扣后总价</p>
            <p style="padding-left: 8px">
              const total = discount? price * num * discount : price * num;
            </p>
            <p style="padding-left: 8px">// 判断是否符合满减政策，如满200-30</p>
            <p style="padding-left: 8px">
              const totalPrice = total >= 200&&breaks ? total - breaks : total;
            </p>
            <p style="padding-left: 8px">// 输出最终结果</p>
            <p style="padding-left: 8px">
              return `您购买了${name}，单价${price}，数量${num}，最终价格: ${totalPrice}`
            </p>
          </div>
        </div>
      </div>
    </b-collapse-wrap>

    <b-collapse-wrap title="表格类方式调用" shadow="none" class="mb-16">
      <div flex>
        <div class="p10" style="width: 70%">
          <b-table
            :columns="columns"
            :data="goodsData"
            border
            :merge-method="handleSpan"
            size="small"
          ></b-table>
        </div>
        <div class="p10" style="width: 30%">
          <title-bar title="商品计算函数" tip-pos="left"></title-bar>
          tip: 这里采用对象传入的方式进行传参
          <func-body-editor
            ref="goodsEditRef"
            v-model="goodsFuncBody"
            :augments="['goods']"
          ></func-body-editor>
          <b-divider style="margin: 10px 0"></b-divider>

          <b-button type="primary" @click="runTest2">执行计算</b-button>
        </div>
      </div>
    </b-collapse-wrap>

    <b-collapse-wrap title="用于校验函数" shadow="none" class="mb-16">
      <div flex>
        <div class="p10" style="width: 30%">
          <b-ace-editor v-model="formObjStr"></b-ace-editor>
        </div>
        <div class="p10" style="width: 30%">
          <title-bar title="校验函数" tip-pos="left" class="mb-10"></title-bar>

          <b-space>
            <b-button size="mini" @click="addOne">新增校验字段</b-button>
            <b-tag
              :key="tag"
              v-for="tag in formParams"
              type="primary"
              closable
              @close="handleCloseTag(tag)"
            >
              {{ tag }}
            </b-tag>
            <b-input
              style="width: 100px"
              v-if="formAdded"
              size="mini"
              v-model="formField"
              @keydown.enter="blurAdd"
              @blur="blurCancel"
            />
          </b-space>
          <b-divider style="margin: 10px 0"></b-divider>

          <func-body-editor
            ref="formEditRef"
            v-model="formFuncBody"
            :augments="formParams"
            height="240"
          ></func-body-editor>
          <b-divider style="margin: 10px 0"></b-divider>

          <b-button type="primary" @click="runTest3">执行校验</b-button>
        </div>
        <div class="p10" style="width: 30%" v-if="formResult.type">
          <b-alert :type="formResult.type" show-icon>
            {{ formResult.type === 'success' ? '验证成功' : '验证失败' }}
            <template #desc>{{ formResult.message }}</template>
          </b-alert>
        </div>
      </div>
    </b-collapse-wrap>
  </page-wrapper>
</template>

<script>
import { ref } from 'vue'
import { Message } from 'bin-ui-design'

export default {
  name: 'FuncDynamicCode',
  setup() {
    const fieldsMapping = ref([
      { key: 'name', value: 'Akko pc75b plus' },
      { key: 'price', value: 549 },
      { key: 'num', value: 2 },
      { key: 'discount', value: 0.98 },
      { key: 'breaks', value: 30 },
    ])
    const fieldsFuncBody = ref(
      'return `${name} 商品 ，单价${price} ，数量${num} ，总价: ${price*num}`;',
    )
    const fieldsEditRef = ref(null)
    const fieldsTitle = ref('')

    const goodsEditRef = ref(null)
    const goodsData = ref([
      {
        name: 'Akko pc75b plus',
        price: 549,
        num: 2,
        discount: 1,
        total: null,
      },
      {
        name: 'Ciy 68 test',
        price: 79.0,
        num: 4,
        discount: 1,
        total: null,
      },
      {
        name: 'Ganss HS87T',
        price: 398,
        num: 2,
        discount: 0.95,
        total: null,
      },
      {
        name: '达尔优A84',
        price: 629,
        num: 2,
        discount: 0.9,
        total: null,
      },
      {
        name: 'FL cmk87',
        price: 629,
        num: 6,
        discount: 0.95,
        total: null,
      },
      {
        name: '总计',
        price: 0,
        num: 0,
        discount: 0,
        total: null,
      },
    ])
    const goodsFuncBody = ref(
      'const { price, num, discount } = goods;\n return price * num * discount;',
    )

    const formEditRef = ref(null)
    const formObjStr = ref(
      '{\n' +
        '  "name": "张三",\n' +
        '  "phone": "",\n' +
        '  "age": 17,\n' +
        '  "address": "江苏省徐州市云龙区"\n' +
        '}',
    )
    const formParams = ref(['phone', 'age'])
    const formField = ref('')
    const formAdded = ref(false)
    const formFuncBody = ref(`const validatPhone = phone.length > 0;
const validatAge = age > 18 && age < 35;
if(validatPhone && validatAge){
  return {
    result: true,
    message: '校验通过'
  };
} else {
  let message = '';
  if(!validatPhone) message += '[手机号不能为空]';
  if(!validatAge) message += '[年龄必须在18~35岁之间]';
  return{
    result: false,
    message
  };
}`)
    const formResult = ref({})

    function dragField(e, fieldName) {
      e.dataTransfer.setData('fieldName', fieldName)
    }

    function dropField(e) {
      const field = e.dataTransfer.getData('fieldName')
      if (fieldsMapping.value.findIndex(v => v.key === field) === -1) {
        fieldsMapping.value.push({ key: field, value: '' })
      }

      console.log(field)
    }

    function allowDrop(e) {
      e.preventDefault()
    }

    // 执行第一段函数代码
    function runTest1() {
      try {
        const nFunc = fieldsEditRef.value.getFunction()
        // 执行代码，进行计算
        const params = fieldsMapping.value.map(v => (v.key !== 'name' ? Number(v.value) : v.value))
        console.log(params)
        console.log(nFunc)
        const total = nFunc(...params)
        console.log(total)
        Message.success('函数执行成功！')
        fieldsTitle.value = total
      } catch (e) {
        fieldsTitle.value = ''
        Message.error('函数执行失败，请检查函数体和入参是否书写正确！')
      }
    }

    function handleSpan({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === goodsData.value.length - 1 && columnIndex === 0) {
        return [1, 4]
      } else if (rowIndex === goodsData.value.length - 1 && columnIndex > 0 && columnIndex < 4) {
        return [0, 0]
      }
    }

    // 执行第一段函数代码
    function runTest2() {
      try {
        const nFunc = goodsEditRef.value.getFunction()
        const goods = goodsData.value
        // 逐条代码执行并塞入数值
        let count = 0
        for (let i = 0; i < goods.length - 1; i++) {
          const total = +nFunc(goods[i]).toFixed(2)
          count += total
          goods[i].total = total
        }
        goods[goods.length - 1].total = count
        Message.success('计算成功！')
      } catch (e) {
        Message.error('函数执行失败，请检查函数体和入参是否书写正确！')
      }
    }

    function addOne() {
      formAdded.value = true
      formField.value = ''
    }

    function blurAdd() {
      const params = formParams.value
      if (params.indexOf(formField.value) === -1) {
        params.push(formField.value)
      }
      blurCancel()
    }

    function blurCancel() {
      formAdded.value = false
      formField.value = ''
    }

    function handleCloseTag(tag) {
      formParams.value.splice(formParams.value.indexOf(tag), 1)
    }

    // 执行第一段函数代码
    function runTest3() {
      try {
        const nFunc = formEditRef.value.getFunction()
        const params = []
        const obj = formParams.value
        for (let i = 0; i < obj.length; i++) {
          const user = JSON.parse(formObjStr.value)
          const p = user[obj[i]]
          params.push(p)
        }
        const res = nFunc(...params)
        formResult.value = {
          type: res.result ? 'success' : 'error',
          message: res.message,
        }
        Message(formResult.value)
      } catch (e) {
        fieldsTitle.value = ''
        Message.error('函数执行失败，请检查函数体和入参是否书写正确！')
      }
    }

    return {
      fieldsEditRef,
      goodsEditRef,
      fieldsMapping,
      fieldsFuncBody,
      fieldsTitle,
      dragField,
      dropField,
      allowDrop,
      runTest1,
      runTest2,
      columns: [
        { title: '商品名称', key: 'name' },
        { title: '商品单价', key: 'price' },
        { title: '商品数量', key: 'num' },
        { title: '折扣', key: 'discount' },
        { title: '合计', key: 'total' },
      ],
      goodsData,
      goodsFuncBody,
      handleSpan,
      formObjStr,
      formParams,
      formAdded,
      formField,
      formFuncBody,
      formEditRef,
      formResult,
      addOne,
      blurAdd,
      blurCancel,
      handleCloseTag,
      runTest3,
    }
  },
}
</script>

<style scoped lang="stylus">
.drop-wrapper {
  padding: 10px;
  border: 1px dashed var(--bin-color-primary);

  .tip {
    text-align: center;
    padding: 20px;
  }
}
.example {
  font-size: 12px;
  color #5d6d7e;
  > p {
    line-height: 20px;
  }
}
</style>
