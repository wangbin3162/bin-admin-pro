var e=Object.defineProperty,a=Object.defineProperties,t=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable,r=(a,t,l)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):a[t]=l;import{g as n}from"./depart.api-fa696167.js";import{f as s,J as u,o as i,c as p,w as c,B as m,u as f,a as b,T as v,d as g,z as h,A as y,q as _,t as N,a7 as C,a8 as V}from"./vendor-b1b195f8.js";import{g as j}from"./index-c2ebc9d7.js";import{a as w}from"./chunk-bin-ui-next-f06badfa.js";import{u as x}from"./useForm-1a257857.js";import{_ as S}from"./page-wrapper-ea777216.js";import{_ as k}from"./index-60e21d33.js";import{_ as O}from"./iconfont-5bbc32b2.js";import"./chunk-brace-7f859248.js";const F={name:"Depart",components:{Iconfont:O,BaseTree:k,PageWrapper:S},setup(){const e=s(null),u=s(null),i=s({}),p=s({}),{formRef:c,editStatus:m,pageStatus:f,editLoading:b,openCreate:v,openEdit:g,backNormal:h,submitForm:y,resetForm:_}=x();function N(e="edit"){if("edit"!==e){var n,s;i.value={text:"",deptCode:"",status:"1",desc:"",parentId:"",parentName:void 0}}else{const e=p.value,c=u.value,m=e[c.nodeKey].parent,f=m||0===m?e[m].node:{};i.value=c?(n=((e,a)=>{for(var t in a||(a={}))o.call(a,t)&&r(e,t,a[t]);if(l)for(var t of l(a))d.call(a,t)&&r(e,t,a[t]);return e})({},j(c)),s={parentId:0===m?"":f.id,parentName:f.title},a(n,t(s))):{}}}function C(){N("create"),v()}return{treeRef:e,getDepartTree:n,currentNode:u,copyNode:i,handleSelect:function(e,a){e.selected?(u.value=e,p.value=a,N("edit"),g()):(u.value=null,p.value=null,i.value={},h())},handleSubmit:function(){y((()=>{b.value=!0;const a=f.value;setTimeout((()=>{w.success((a.isCreate?"新增":"修改")+"成功！"),h();const t=u.value?[u.value.nodeKey]:[];e.value&&e.value.reloadTree(t),b.value=!1}),1e3)}))},handleResetForm:function(){N(m.value),_()},handleCommand:function(e){if("root"===e&&C(),"child"===e){C();const e=u.value;i.value.parentId=e.id,i.value.parentName=e.text}},formRef:c,pageStatus:f,editLoading:b,submitForm:y,resetForm:_,ruleValidate:{text:[{required:!0,message:"部门名称必填",trigger:"blur"}],deptCode:[{required:!0,message:"部门编码必填",trigger:"blur"}]}}}},R=e=>(C("data-v-7207f23c"),e=e(),V(),e),I={class:"table-depart"},P=_("增加根节点"),T=_("增加子节点"),U={class:"table-depart-right"},D={flex:"main:justify cross:center",style:{"font-weight":"normal"}},q={class:"top"},z=R((()=>m("span",{class:"ml-5"},"编辑部门",-1))),L={class:"right"},B=_("新增子部门"),E={style:{position:"relative","min-height":"100px",overflow:"hidden"}},K={style:{position:"absolute",width:"100%"}},A=_("点选左侧部门，进行编辑操作"),J={key:0,class:"pt-8"},M=R((()=>m("span",null,"启用",-1))),W=R((()=>m("span",null,"禁用",-1))),G=_("重置");F.render=function(e,a,t,l,o,d){const r=u("b-dropdown-item"),n=u("base-tree"),s=u("iconfont"),C=u("b-button"),V=u("b-alert"),j=u("b-input"),w=u("b-form-item"),x=u("b-switch"),S=u("b-form"),k=u("b-col"),O=u("b-row"),F=u("b-card"),R=u("page-wrapper");return i(),p(R,{desc:"页面内容为Mock数据，仅作示例使用。"},{default:c((()=>[m("div",I,[f(n,{ref:"treeRef","tree-title":"部门列表","show-filter":"",fetch:l.getDepartTree,onSelectChange:l.handleSelect,onCommand:l.handleCommand},{ctrl:c((()=>[f(r,{name:"root",divided:""},{default:c((()=>[P])),_:1}),f(r,{name:"child",disabled:!l.currentNode},{default:c((()=>[T])),_:1},8,["disabled"])])),_:1},8,["fetch","onSelectChange","onCommand"]),m("div",U,[f(F,{bordered:!1,class:"card-panel",shadow:"never"},{header:c((()=>[m("div",D,[m("div",q,[f(s,{icon:"apartment",color:"primary",bg:"",round:""}),z]),m("div",L,[l.currentNode?(i(),p(C,{key:0,type:"text",size:"small",onClick:a[0]||(a[0]=e=>l.handleCommand("child"))},{default:c((()=>[B])),_:1})):b("",!0)])])])),default:c((()=>[m("div",E,[f(v,{name:"fade-in"},{default:c((()=>[m("div",K,[g(f(V,null,{default:c((()=>[A])),_:1},512),[[h,l.pageStatus.isNormal]])])])),_:1}),f(v,{name:"fade-transverse"},{default:c((()=>[l.pageStatus.isNormal?b("",!0):(i(),y("div",J,[f(O,null,{default:c((()=>[f(k,{span:"14"},{default:c((()=>[f(S,{ref:"formRef",model:l.copyNode,rules:l.ruleValidate,"label-width":"100px","label-suffix":":"},{default:c((()=>[f(w,{label:"父级组织"},{default:c((()=>[f(j,{modelValue:l.copyNode.parentName,"onUpdate:modelValue":a[1]||(a[1]=e=>l.copyNode.parentName=e),disabled:""},null,8,["modelValue"])])),_:1}),f(w,{label:"部门名称",prop:"text"},{default:c((()=>[f(j,{modelValue:l.copyNode.text,"onUpdate:modelValue":a[2]||(a[2]=e=>l.copyNode.text=e),placeholder:"输入部门名称",clearable:""},null,8,["modelValue"])])),_:1}),f(w,{label:"部门编码",prop:"deptCode"},{default:c((()=>[f(j,{modelValue:l.copyNode.deptCode,"onUpdate:modelValue":a[3]||(a[3]=e=>l.copyNode.deptCode=e),placeholder:"输入部门编码",clearable:""},null,8,["modelValue"])])),_:1}),f(w,{label:"部门状态"},{default:c((()=>[f(x,{size:"large",modelValue:l.copyNode.status,"onUpdate:modelValue":a[4]||(a[4]=e=>l.copyNode.status=e),"true-value":"1","false-value":"0"},{open:c((()=>[M])),close:c((()=>[W])),_:1},8,["modelValue"])])),_:1}),f(w,{label:"部门描述"},{default:c((()=>[f(j,{modelValue:l.copyNode.desc,"onUpdate:modelValue":a[5]||(a[5]=e=>l.copyNode.desc=e),type:"textarea",placeholder:"输入部门描述"},null,8,["modelValue"])])),_:1}),f(w,null,{default:c((()=>[f(C,{type:"primary",onClick:l.handleSubmit,loading:l.editLoading},{default:c((()=>[_(N(l.pageStatus.isCreate?"提交数据":"更新数据"),1)])),_:1},8,["onClick","loading"]),f(C,{onClick:l.handleResetForm},{default:c((()=>[G])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model","rules"])])),_:1})])),_:1})]))])),_:1})])])),_:1})])])])),_:1})},F.__scopeId="data-v-7207f23c";export{F as default};