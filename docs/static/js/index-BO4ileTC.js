import{a8 as X,r as B,l as ce,Q as n,o as g,j as L,w as a,K as e,f as h,a as O,b as s,F as H,R as te,L as i,t as ae,i as E,a9 as le,aa as oe,X as ie,Z as ne,aD as ue,c as de,af as pe,g as re,v as me,ac as G,ag as _e,n as fe}from"./vendor-CoKaFqDy.js";import{n as q}from"./chunk-bin-ui-design-DTQlNCOT.js";import{i as W,j as ve,k as ge}from"./index-Dk_VZS5h.js";import{I as Y}from"./env-CxIDJ12h.js";import{a as be,s as ee,m as he,g as ye}from"./cross-tab-msg-D-hvLo0Z.js";import{c as Ve,M as K,m as c,O as Q,a as ke,u as Ce,d as we,e as v,f as Se,i as xe}from"./useData-DFu-Bvvp.js";import"./chunk-brace-BklEY0pF.js";import"./chunk-mockjs-CGXE1Baq.js";const S=w=>(le("data-v-cf196e43"),w=w(),oe(),w),Ie={key:0,class:"source-config"},De=S(()=>s("span",{class:"tooltip-label",title:"请输入选项，以英文逗号分割，如1,2,3,4"},"数据值",-1)),$e=S(()=>s("span",{class:"tooltip-label",title:"填写依赖的单元格索引，如B1"},"依赖项",-1)),Te=S(()=>s("span",{class:"tooltip-label",title:"编写Json格式的数据值，key值为依赖索引的值，如A对应1,2编写为 { 'A': '1,2' }"}," 数据值 ",-1)),Me=S(()=>s("div",null,"使用MATCH(D11, A1:A7, 0)函数获取数据项内容",-1)),Oe=S(()=>s("div",null,"第一个参数为填充到哪个单元格",-1)),Re=S(()=>s("div",null,"第二个参数为单元格选区",-1)),Ue=S(()=>s("div",null,"第三个参数为哪个工作表索引",-1)),Ae=S(()=>s("div",null,"COUNTIF(A1:A7,B1:B7)函数设置条件过滤",-1)),Be=S(()=>s("div",null,"第一个参数为条件key值取值内容",-1)),Ne=S(()=>s("div",null,"第二个参数为实际选项内容",-1)),Le=S(()=>s("div",null,"注意：COUNTIF 函数需要配合MATCH函数共同使用",-1)),Ee=S(()=>s("span",{class:"tooltip-label",title:"使用MATCH()函数获取数据项内容"},"数据值",-1)),ze={key:1,style:{height:"328px"}},Fe={__name:"SourceModal",emits:["save"],setup(w,{expose:r,emit:R}){const x=R,f=B(!1),o=B({}),U=B(!1);function z(I){U.value=!1,f.value=!0,o.value=W(I)}const j=ce(()=>Ve(o.value.dependOn));function P(){if(o.value.type==="cascade"&&!F())return;const I=W(o.value);f.value=!1,x("save",I)}function F(){try{const I=JSON.parse(o.value.cascade);return o.value.cascade=JSON.stringify(I,null,2),!0}catch{return q.error("请输入正确的对象映射！"),!1}}return r({open:z}),(I,u)=>{const J=n("b-radio"),l=n("b-radio-group"),t=n("b-form-item"),d=n("b-input"),m=n("b-col"),y=n("b-row"),k=n("b-ace-editor"),V=n("b-button"),D=n("b-tag"),M=n("b-tooltip"),A=n("b-space"),C=n("b-form"),N=n("b-loading"),$=n("b-modal");return g(),L($,{title:"数据源配置",modelValue:f.value,"onUpdate:modelValue":u[6]||(u[6]=p=>f.value=p),width:"1200px",draggable:"",top:"80px","esc-closable":"","append-to-body":"",onOpened:u[7]||(u[7]=p=>U.value=!0)},{footer:a(()=>[e(V,{onClick:u[5]||(u[5]=p=>f.value=!1)},{default:a(()=>[h("关闭")]),_:1}),e(V,{type:"primary",onClick:P},{default:a(()=>[h("保存")]),_:1})]),default:a(()=>[U.value?(g(),O("div",Ie,[e(C,{"label-width":"120px"},{default:a(()=>[e(t,{label:"数据源类型"},{default:a(()=>[s("div",null,[e(l,{modelValue:o.value.type,"onUpdate:modelValue":u[0]||(u[0]=p=>o.value.type=p),type:"capsule"},{default:a(()=>[(g(!0),O(H,null,te(i(K).DatasourceType.mapping,(p,T)=>(g(),L(J,{key:T,label:T},{default:a(()=>[h(ae(p),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])])]),_:1}),o.value.type==="normal"?(g(),L(t,{key:0,label:"数据值"},{label:a(()=>[De]),default:a(()=>[s("div",null,[e(d,{modelValue:o.value.normal,"onUpdate:modelValue":u[1]||(u[1]=p=>o.value.normal=p),placeholder:"请输入选项，以英文逗号分割，如1,2,3,4",clearable:""},null,8,["modelValue"])])]),_:1})):E("",!0),o.value.type==="cascade"?(g(),O(H,{key:1},[e(t,{label:"依赖项"},{label:a(()=>[$e]),default:a(()=>[e(y,{gutter:4},{default:a(()=>[e(m,{span:"18"},{default:a(()=>[e(d,{modelValue:o.value.dependOn,"onUpdate:modelValue":u[2]||(u[2]=p=>o.value.dependOn=p),placeholder:"依赖的单元格索引，如B1"},null,8,["modelValue"])]),_:1}),e(m,{span:"6"},{default:a(()=>[e(d,{"model-value":JSON.stringify(j.value),readonly:""},null,8,["model-value"])]),_:1})]),_:1})]),_:1}),e(t,{label:"数据值"},{label:a(()=>[Te]),default:a(()=>[s("div",null,[e(k,{height:"200",modelValue:o.value.cascade,"onUpdate:modelValue":u[3]||(u[3]=p=>o.value.cascade=p)},null,8,["modelValue"]),e(V,{type:"text",onClick:F},{default:a(()=>[h("格式化")]),_:1})])]),_:1})],64)):E("",!0),o.value.type==="fx"?(g(),O(H,{key:2},[e(t,{label:"支持函数"},{default:a(()=>[e(A,null,{default:a(()=>[e(M,{placement:"top",theme:"light"},{content:a(()=>[Me,Oe,Re,Ue]),default:a(()=>[e(D,null,{default:a(()=>[h("MATCH")]),_:1})]),_:1}),e(M,{placement:"top",theme:"light"},{content:a(()=>[Ae,Be,Ne,Le]),default:a(()=>[e(D,null,{default:a(()=>[h("COUNTIF")]),_:1})]),_:1})]),_:1})]),_:1}),e(t,{label:"数据值"},{label:a(()=>[Ee]),default:a(()=>[s("div",null,[e(d,{modelValue:o.value.fx,"onUpdate:modelValue":u[4]||(u[4]=p=>o.value.fx=p),type:"textarea"},null,8,["modelValue"])])]),_:1})],64)):E("",!0)]),_:1})])):(g(),O("div",ze,[e(N)]))]),_:1},8,["modelValue"])}}},je=X(Fe,[["__scopeId","data-v-cf196e43"]]),Pe={class:"mapping-config"},Je=de('<div class="top-title" data-v-021bee72><span class="l1" data-v-021bee72>位置</span><span class="l2" data-v-021bee72>字段标识</span><span class="l3" data-v-021bee72>字段名称</span><span class="l4" data-v-021bee72>类型</span><span class="l5" data-v-021bee72>数据源</span><span class="l6" data-v-021bee72>事件</span></div>',1),He={class:"mapping-item"},qe={class:"mapping-content"},Ke={flex:"main:center cross:center",style:{width:"44px"}},Qe={flex:"main:center cross:center",style:{width:"60px"}},Xe={__name:"MappingConfig",setup(w){const r=window.luckysheet;function R(l){c.value.splice(l,1)}const x=[`/**
 * 示例一：单元格变更时，更新 B2 单元格的数据为 '更新值'
 * API: setCellValue(row, column, value [,setting])
 */
LuckySheet.setCellValue(1, 1, '更新值')
`,`/**
 * 示例二：单元格变更时，更新 B2 单元格的数据验证为下拉
 * 下拉选项是 '独立办公,集中办公' 并设置默认为独立办公
 * API: setDataVerification(optionItem, [setting])
 */
const baseOptionItem = {
  checked: false,
  hintShow: false,
  hintText: '',
  prohibitInput: false,
  remote: false,
  type: 'dropdown',
  type2: false,
  value1: '',
  value2: '',
}

LuckySheet.setDataVerification(
  {
    ...baseOptionItem,
    value1: '独立办公,集中办公',
  },
  {
    range: { row: [1, 1], column: [1, 1] }
  }
)
LuckySheet.setCellValue(1, 1, '独立办公')
`,`/**
 * 示例三：根据当前单元格变更做级联更新，更新 B2 单元格的数据验证为下拉
 * 如依赖的单元格数据源是  党政机关/事业单位,教育机构,医院,文化体育场
 * 当前的数据源级联对象是 {"党政机关/事业单位":"独立办公,集中办公","教育机构":"高等学校,中小学校","医院":"三级,二级以下","文化体育场":"/"}
 * 更新映射后 为一下对应选项
 * API: setDataVerification(optionItem, [setting])
 */
const optionsMap = {
  '党政机关/事业单位':'独立办公,集中办公',
  '教育机构':'高等学校,中小学校',
  '医院':'三级,二级以下',
  '文化体育场':'/'
}

const { newValue }  = cellValue
const keyValue = optionsMap[newValue.v]

console.log(keyValue)

const baseOptionItem = {
  checked: false,
  hintShow: false,
  hintText: '',
  prohibitInput: false,
  remote: false,
  type: 'dropdown',
  type2: false,
  value1: '',
  value2: '',
}

LuckySheet.setDataVerification(
  {
    ...baseOptionItem,
    value1: keyValue,
  },
  {
    range: { row: [1, 1], column: [1, 1] }
  }
)
LuckySheet.setCellValue(1, 1, '')
`],f=B([]),o=B(-1),U=B(null),z=B(null);function j(l){var t;if(l>-1&&c.value[l]&&c.value[l].events){const{augments:d,funcBody:m}=c.value[l].events;o.value=l,f.value=d,(t=U.value)==null||t.open(m)}}function P(l){const t=o.value;t>-1&&c.value[t]&&c.value[t].events&&(c.value[t].events.funcBody=l,o.value=-1)}function F(l){var t;l>-1&&c.value[l]&&c.value[l].datasource&&(o.value=l,(t=z.value)==null||t.open(c.value[l].datasource))}function I(l){const t=o.value;t>-1&&c.value[t]&&c.value[t].datasource&&(c.value[t].datasource=l,o.value=-1,u(c.value[t]))}function u({cellRange:l,datasource:t}){const d=t.type,m=t[d];if(d==="normal"){const y=new Q().getMerge({value1:m});m.length>0?r.setDataVerification(y,{range:l}):r.deleteDataVerification({range:l})}else if(d==="fx"){const{matchCellRange:y,sourceList:k,orderIndex:V,countIf:D}=ke(m);if(D){const C={};for(let $=0;$<D.keysList.length;$++){const p=D.keysList[$],T=D.valuesList[$],_=r.getCellValue(p.row,p.column,{order:V}),b=r.getCellValue(T.row,T.column,{order:V});C[_]?C[_]+=","+b:C[_]=b}const N=r.getCellValue(y.row,y.column,{order:V});if(N&&C[N]){const $=C[N],p=new Q().getMerge({value1:$});$.length>0?r.setDataVerification(p,{range:l}):r.deleteDataVerification({range:l})}return}const M=k.map(C=>r.getCellValue(C.row,C.column,{order:V})).join(","),A=new Q().getMerge({value1:M});M.length>0?r.setDataVerification(A,{range:l}):r.deleteDataVerification({range:l})}}function J(l){if(l>-1&&c.value[l]){const t=c.value[l],{cellIndex:d}=t;t.dataType==="select"?u(t):r.deleteDataVerification({range:{...t.cellRange}}),r.setCellValue(d.row,d.column,"")}}return(l,t)=>{const d=n("b-empty"),m=n("drag-handle"),y=n("action-button"),k=n("b-tag"),V=n("b-input"),D=n("b-option"),M=n("b-select"),A=n("b-icon"),C=n("b-button"),N=n("b-checkbox"),$=n("b-space"),p=n("FuncBodyEditorModal");return g(),O("div",Pe,[Je,i(c).length===0?(g(),L(d,{key:0},{default:a(()=>[h("暂无映射")]),_:1})):E("",!0),e(i(ue),ie({modelValue:i(c),"onUpdate:modelValue":t[0]||(t[0]=T=>ne(c)?c.value=T:null),class:"mapping-list","item-key":"element"},{animation:200,group:"mapping",ghostClass:"ghost",dragClass:"drag-item-class",handle:".drag-handle"}),{item:a(({element:T,index:_})=>[s("div",He,[e(m,{class:"drag-handle mr-5"}),e(y,{type:"text",icon:"close",color:"danger","is-icon":"",tooltip:"删除",confirm:"",onClick:b=>R(_)},null,8,["onClick"]),s("div",qe,[e($,{size:4},{default:a(()=>[e(k,{style:{width:"38px","justify-content":"center",padding:"0 4px"}},{default:a(()=>[h(ae(T.cellPosition.start),1)]),_:2},1024),e(V,{modelValue:i(c)[_].fieldName,"onUpdate:modelValue":b=>i(c)[_].fieldName=b,size:"small",placeholder:"字段标识"},null,8,["modelValue","onUpdate:modelValue"]),e(V,{modelValue:i(c)[_].fieldTitle,"onUpdate:modelValue":b=>i(c)[_].fieldTitle=b,size:"small",placeholder:"字段名称"},null,8,["modelValue","onUpdate:modelValue"]),e(M,{modelValue:i(c)[_].dataType,"onUpdate:modelValue":b=>i(c)[_].dataType=b,size:"small",style:{width:"70px"},onChange:()=>J(_)},{default:a(()=>[(g(!0),O(H,null,te(i(K).DataType.mapping,(b,Z)=>(g(),L(D,{key:Z,value:Z,label:b},null,8,["value","label"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue","onChange"]),s("div",Ke,[e(C,{disabled:T.dataType!=="select",type:"text",title:"数据源配置",onClick:b=>F(_)},{default:a(()=>[e(A,{name:"database",size:"18"})]),_:2},1032,["disabled","onClick"])]),s("div",Qe,[e(N,{modelValue:i(c)[_].events.enable,"onUpdate:modelValue":b=>i(c)[_].events.enable=b,style:{"line-height":"1"}},null,8,["modelValue","onUpdate:modelValue"]),e(C,{disabled:!i(c)[_].events.enable,type:"text",title:"事件脚本",onClick:b=>j(_)},{default:a(()=>[e(A,{name:"code",size:"20"})]),_:2},1032,["disabled","onClick"])])]),_:2},1024)])])]),_:1},16,["modelValue"]),e(je,{ref_key:"sourceConfigRef",ref:z,onSave:I},null,512),e(p,{augments:f.value,exampleFun:x,ref_key:"funcEditorRef",ref:U,onSave:P},null,8,["augments"])])}}},Ze=X(Xe,[["__scopeId","data-v-021bee72"]]),se=w=>(le("data-v-484cd714"),w=w(),oe(),w),Ge={class:"sheet-wrapper"},We={class:"sheet-header"},Ye={class:"left"},et=se(()=>s("h3",null,"模板名称",-1)),tt={class:"right"},at=se(()=>s("div",{id:"SheetContainer",class:"sheet-excel has-config"},null,-1)),lt={class:"right-config"},ot={class:"right-top"},nt={class:"right-content"},st={class:"p8"},ct={class:"mask"},it={__name:"SheetConfig",props:{cfg:{type:Object,default:()=>({})}},setup(w){const r=window.luckysheet,R=w,{info:x,title:f,btnLoading:o,isMaskShow:U,closePage:z,loadExcel:j,downloadExcel:P}=Ce(R),F=pe();async function I(){try{x.value.name=f.value;const t=u();if(o.value=!0,t.id===""){const m=await be(t);if(m){q.success("新增成功!"),ee("add-temp",{...t}),v.value.id=m,v.value.reportCount=v.value.records=0,v.value.isPublish="0";let y=F.resolve({path:"/excel-edit",query:{id:m}});window.location.replace(y.href),document.title="修改模板"}}else await he(t),q.success("修改成功!"),ee("modify-temp",{...t})}catch(t){console.log(t)}o.value=!1}function u(){const t=r.getAllSheets();return{...G(v.value),jsonData:{info:G(x.value),sheets:t}}}function J(){const t=r.getRange()[0],d=Se(t);if(v.value.mapping.findIndex(y=>ve(y.cellRange,t))>-1){q.warning("已存在相同位置的单元格数据项！");return}v.value.mapping.push(new K().getMerge({...d}))}function l(){console.log(v.value);const t=JSON.stringify(v.value);ge(t)}return(t,d)=>{const m=n("b-input"),y=n("b-space"),k=n("b-button"),V=n("b-divider"),D=n("b-ace-editor"),M=n("b-scrollbar");return g(),O("div",Ge,[s("div",We,[s("div",Ye,[e(y,null,{default:a(()=>[et,e(m,{modelValue:i(f),"onUpdate:modelValue":d[0]||(d[0]=A=>ne(f)?f.value=A:null),placeholder:"模板名称"},null,8,["modelValue"])]),_:1})]),s("div",tt,[i(Y)?(g(),L(k,{key:0,type:"text",icon:"bug","text-color":"danger",title:"打印调试",onClick:i(we)},null,8,["onClick"])):E("",!0),e(k,{type:"primary",size:"small",icon:"login",plain:"",onClick:i(j)},{default:a(()=>[h(" 导入模板 ")]),_:1},8,["onClick"]),e(k,{type:"primary",size:"small",icon:"download",plain:"",onClick:i(P)},{default:a(()=>[h(" 下载模板 ")]),_:1},8,["onClick"]),e(V,{type:"vertical"}),e(k,{type:"primary",size:"small",icon:"save",loading:i(o),onClick:I},{default:a(()=>[h(" 保存 ")]),_:1},8,["loading"]),e(k,{type:"danger",size:"small",icon:"close",onClick:i(z)},{default:a(()=>[h("关闭")]),_:1},8,["onClick"])])]),at,s("div",lt,[s("div",ot,[e(k,{type:"primary",size:"small",dashed:"",onClick:J},{default:a(()=>[h("设为数据项")]),_:1})]),s("div",nt,[e(M,null,{default:a(()=>[s("div",st,[e(Ze),i(Y)?(g(),O(H,{key:0},[e(V,{align:"left"},{default:a(()=>[h("实际存储值")]),_:1}),e(k,{type:"text",icon:"file-copy",onClick:l},{default:a(()=>[h("复制配置项")]),_:1}),e(D,{"model-value":JSON.stringify({id:i(v).id,name:i(v).name,mapping:i(v).mapping},null,2),readonly:""},null,8,["model-value"])],64)):E("",!0)])]),_:1})])]),re(s("div",ct,"loading",512),[[me,i(U)]])])}}},ut=X(it,[["__scopeId","data-v-484cd714"]]),bt=Object.assign({name:"ExcelEdit"},{__name:"index",setup(w){const r=_e(),R=B(!1);return fe(()=>r.path,async()=>{const{id:x}=r.query;if(document.title=x?"修改模板":"新增模板",x){const f=await ye(x);v.value={...f},v.value.mapping=v.value.mapping.map(o=>new K().getMerge(o))}else xe(),v.value.name="新模板";R.value=!0},{immediate:!0}),(x,f)=>R.value?(g(),L(ut,{key:0})):E("",!0)}});export{bt as default};
