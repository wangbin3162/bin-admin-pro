import{_ as e}from"./page-wrapper-3f5c639c.js";import{_ as l}from"./theme-color-panel-824af76e.js";import{J as a,o as r,c as t,w as o,u,B as m,A as d,K as s,F as n,q as b}from"./vendor-76eb7e0b.js";import"./index-c3db3ba4.js";import"./chunk-bin-ui-next-077811e2.js";import"./chunk-brace-7f859248.js";const i={name:"FormComp",components:{PageWrapper:e,ThemeColorPanel:l},data:()=>({cityList:[{value:"beijing",label:"北京"},{value:"nanjing",label:"南京"},{value:"shanghai",label:"上海"},{value:"xuzhou",label:"徐州"},{value:"guangzhou",label:"广州"},{value:"shenzhen",label:"深圳"}],shortcuts:[{text:"今日",value:new Date},{text:"昨天",value:(()=>{const e=new Date;return e.setTime(e.getTime()-864e5),e})()},{text:"一周前",value:(()=>{const e=new Date;return e.setTime(e.getTime()-6048e5),e})()}],form:{name:"",age:null,mail:"",region:"",hobby:[],sex:"",status:"disable",birthday:""},ruleValidate:{name:[{required:!0,message:"用户名不能为空",trigger:"blur"}],region:[{required:!0,message:"户籍地不能为空",trigger:"change"}],age:[{required:!0,type:"number",message:"年龄不为空",trigger:"change"},{type:"number",min:18,trigger:"change",message:"年龄必须在18以上"}],hobby:[{type:"array",required:!0,message:"请至少选择一个爱好",trigger:"change"}],sex:[{required:!0,message:"性别必选",trigger:"change"}],birthday:[{required:!0,type:"date",message:"出生日期必选",trigger:"blur"}],mail:[{required:!0,message:"邮箱不能为空",trigger:"blur"},{type:"email",message:"邮箱格式不正确",trigger:"blur"}]}}),methods:{submitForm(e){this.$refs[e].validate((e=>{e&&alert("submit!")}))},resetForm(e){this.$refs[e].resetFields()}}},p={class:"p20",flex:"main:center"},f={style:{width:"800px"}},g=m("span",null,"启用",-1),h=m("span",null,"禁用",-1),c=b("提交"),y=b("重置");i.render=function(e,l,b,i,V,_){const v=a("theme-color-panel"),x=a("b-input"),w=a("b-form-item"),F=a("b-input-number"),U=a("b-col"),j=a("b-option"),k=a("b-select"),q=a("b-row"),T=a("b-date-picker"),z=a("b-checkbox"),C=a("b-checkbox-group"),D=a("b-radio"),L=a("b-radio-group"),P=a("b-switch"),$=a("b-button"),A=a("b-form"),B=a("b-collapse-wrap"),J=a("page-wrapper");return r(),t(J,{desc:"表单类别的组件，可验证不同主题色的正确性。"},{default:o((()=>[u(v),u(B,{title:"Form 表单输入",shadow:"none",class:"mb-20"},{default:o((()=>[m("div",p,[m("div",f,[u(A,{ref:"ruleForm",model:V.form,"label-width":"85px",rules:V.ruleValidate},{default:o((()=>[u(w,{prop:"name",label:"名称"},{default:o((()=>[u(x,{modelValue:V.form.name,"onUpdate:modelValue":l[0]||(l[0]=e=>V.form.name=e),placeholder:"用户名"},null,8,["modelValue"])])),_:1}),u(w,{prop:"mail",label:"邮箱"},{default:o((()=>[u(x,{modelValue:V.form.mail,"onUpdate:modelValue":l[1]||(l[1]=e=>V.form.mail=e),placeholder:"邮箱"},null,8,["modelValue"])])),_:1}),u(q,null,{default:o((()=>[u(U,{span:12},{default:o((()=>[u(w,{prop:"age",label:"年龄"},{default:o((()=>[u(F,{style:{width:"100%"},modelValue:V.form.age,"onUpdate:modelValue":l[2]||(l[2]=e=>V.form.age=e),min:0,editable:!1},null,8,["modelValue"])])),_:1})])),_:1}),u(U,{span:12},{default:o((()=>[u(w,{label:"户籍地",prop:"region"},{default:o((()=>[u(k,{modelValue:V.form.region,"onUpdate:modelValue":l[3]||(l[3]=e=>V.form.region=e),placeholder:"请选择户籍地",clearable:""},{default:o((()=>[(r(!0),d(n,null,s(V.cityList,(e=>(r(),t(j,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1})])),_:1}),u(q,null,{default:o((()=>[u(U,{span:12},{default:o((()=>[u(w,{label:"出生日期",prop:"birthday"},{default:o((()=>[u(T,{modelValue:V.form.birthday,"onUpdate:modelValue":l[4]||(l[4]=e=>V.form.birthday=e),type:"datetime"},null,8,["modelValue"])])),_:1})])),_:1}),u(U,{span:12},{default:o((()=>[u(w,{label:"出生日期",prop:"birthday"},{default:o((()=>[u(T,{modelValue:V.form.birthday,"onUpdate:modelValue":l[5]||(l[5]=e=>V.form.birthday=e),type:"date",placeholder:"出生日期",shortcuts:V.shortcuts},null,8,["modelValue","shortcuts"])])),_:1})])),_:1})])),_:1}),u(w,{label:"爱好",prop:"hobby"},{default:o((()=>[u(C,{modelValue:V.form.hobby,"onUpdate:modelValue":l[6]||(l[6]=e=>V.form.hobby=e)},{default:o((()=>[u(z,{label:"打游戏",name:"hobby"}),u(z,{label:"看电影",name:"hobby"}),u(z,{label:"打篮球/运动",name:"hobby"}),u(z,{label:"看书",name:"hobby"})])),_:1},8,["modelValue"])])),_:1}),u(w,{label:"性别",prop:"sex"},{default:o((()=>[u(L,{modelValue:V.form.sex,"onUpdate:modelValue":l[7]||(l[7]=e=>V.form.sex=e)},{default:o((()=>[u(D,{label:"男",value:"male"}),u(D,{label:"女",value:"female"})])),_:1},8,["modelValue"])])),_:1}),u(w,{label:"状态",prop:"status"},{default:o((()=>[u(P,{modelValue:V.form.status,"onUpdate:modelValue":l[8]||(l[8]=e=>V.form.status=e),"true-value":"enable","false-value":"disable",size:"large"},{open:o((()=>[g])),close:o((()=>[h])),_:1},8,["modelValue"])])),_:1}),u(w,null,{default:o((()=>[u($,{type:"primary",onClick:l[9]||(l[9]=e=>_.submitForm("ruleForm"))},{default:o((()=>[c])),_:1}),u($,{onClick:l[10]||(l[10]=e=>_.resetForm("ruleForm"))},{default:o((()=>[y])),_:1})])),_:1})])),_:1},8,["model","rules"])])])])),_:1})])),_:1})};export{i as default};
