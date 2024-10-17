import{a8 as Q,r as A,l as ae,R as i,o as g,j as N,w as a,K as t,f as y,a as M,b as u,F as P,Q as ee,L as c,t as te,i as $,c as oe,X as ne,Z as le,aD as se,af as ie,g as ue,v as de,aa as Z,n as ce,ag as pe}from"./vendor-COsJffew.js";import{n as H}from"./chunk-bin-ui-design-55yTQV6H.js";import{d as G,I as W,i as re,c as me}from"./index-DlSIhdb0.js";import{a as fe,s as Y,m as ve,g as _e}from"./cross-tab-msg-CTU40FVn.js";import{c as ge,M as q,m as d,O as K,a as be,u as ye,d as Ve,e as _,f as Ce,i as ke}from"./useData-TSQMxnf1.js";import"./chunk-brace-DF1jSkZr.js";const he={key:0,class:"source-config"},we={key:1,style:{height:"328px"}},Se={__name:"SourceModal",emits:["save"],setup(J,{expose:r,emit:O}){const w=O,v=A(!1),s=A({}),R=A(!1);function L(S){R.value=!1,v.value=!0,s.value=G(S)}const z=ae(()=>ge(s.value.dependOn));function F(){if(s.value.type==="cascade"&&!E())return;const S=G(s.value);v.value=!1,w("save",S)}function E(){try{const S=JSON.parse(s.value.cascade);return s.value.cascade=JSON.stringify(S,null,2),!0}catch{return H.error("请输入正确的对象映射！"),!1}}return r({open:L}),(S,l)=>{const j=i("b-radio"),n=i("b-radio-group"),e=i("b-form-item"),o=i("b-input"),m=i("b-col"),V=i("b-row"),k=i("b-ace-editor"),C=i("b-button"),x=i("b-tag"),T=i("b-tooltip"),U=i("b-space"),h=i("b-form"),B=i("b-loading"),I=i("b-modal");return g(),N(I,{title:"数据源配置",modelValue:v.value,"onUpdate:modelValue":l[6]||(l[6]=p=>v.value=p),width:"1200px",draggable:"",top:"80px","esc-closable":"","append-to-body":"",onOpened:l[7]||(l[7]=p=>R.value=!0)},{footer:a(()=>[t(C,{onClick:l[5]||(l[5]=p=>v.value=!1)},{default:a(()=>l[17]||(l[17]=[y("关闭")])),_:1}),t(C,{type:"primary",onClick:F},{default:a(()=>l[18]||(l[18]=[y("保存")])),_:1})]),default:a(()=>[R.value?(g(),M("div",he,[t(h,{"label-width":"120px"},{default:a(()=>[t(e,{label:"数据源类型"},{default:a(()=>[u("div",null,[t(n,{modelValue:s.value.type,"onUpdate:modelValue":l[0]||(l[0]=p=>s.value.type=p),type:"capsule"},{default:a(()=>[(g(!0),M(P,null,ee(c(q).DatasourceType.mapping,(p,D)=>(g(),N(j,{key:D,label:D},{default:a(()=>[y(te(p),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])])]),_:1}),s.value.type==="normal"?(g(),N(e,{key:0,label:"数据值"},{label:a(()=>l[8]||(l[8]=[u("span",{class:"tooltip-label",title:"请输入选项，以英文逗号分割，如1,2,3,4"},"数据值",-1)])),default:a(()=>[u("div",null,[t(o,{modelValue:s.value.normal,"onUpdate:modelValue":l[1]||(l[1]=p=>s.value.normal=p),placeholder:"请输入选项，以英文逗号分割，如1,2,3,4",clearable:""},null,8,["modelValue"])])]),_:1})):$("",!0),s.value.type==="cascade"?(g(),M(P,{key:1},[t(e,{label:"依赖项"},{label:a(()=>l[9]||(l[9]=[u("span",{class:"tooltip-label",title:"填写依赖的单元格索引，如B1"},"依赖项",-1)])),default:a(()=>[t(V,{gutter:4},{default:a(()=>[t(m,{span:"18"},{default:a(()=>[t(o,{modelValue:s.value.dependOn,"onUpdate:modelValue":l[2]||(l[2]=p=>s.value.dependOn=p),placeholder:"依赖的单元格索引，如B1"},null,8,["modelValue"])]),_:1}),t(m,{span:"6"},{default:a(()=>[t(o,{"model-value":JSON.stringify(z.value),readonly:""},null,8,["model-value"])]),_:1})]),_:1})]),_:1}),t(e,{label:"数据值"},{label:a(()=>l[10]||(l[10]=[u("span",{class:"tooltip-label",title:"编写Json格式的数据值，key值为依赖索引的值，如A对应1,2编写为 { 'A': '1,2' }"}," 数据值 ",-1)])),default:a(()=>[u("div",null,[t(k,{height:"200",modelValue:s.value.cascade,"onUpdate:modelValue":l[3]||(l[3]=p=>s.value.cascade=p)},null,8,["modelValue"]),t(C,{type:"text",onClick:E},{default:a(()=>l[11]||(l[11]=[y("格式化")])),_:1})])]),_:1})],64)):$("",!0),s.value.type==="fx"?(g(),M(P,{key:2},[t(e,{label:"支持函数"},{default:a(()=>[t(U,null,{default:a(()=>[t(T,{placement:"top",theme:"light"},{content:a(()=>l[13]||(l[13]=[u("div",null,"使用MATCH(D11, A1:A7, 0)函数获取数据项内容",-1),u("div",null,"第一个参数为填充到哪个单元格",-1),u("div",null,"第二个参数为单元格选区",-1),u("div",null,"第三个参数为哪个工作表索引",-1)])),default:a(()=>[t(x,null,{default:a(()=>l[12]||(l[12]=[y("MATCH")])),_:1})]),_:1}),t(T,{placement:"top",theme:"light"},{content:a(()=>l[15]||(l[15]=[u("div",null,"COUNTIF(A1:A7,B1:B7)函数设置条件过滤",-1),u("div",null,"第一个参数为条件key值取值内容",-1),u("div",null,"第二个参数为实际选项内容",-1),u("div",null,"注意：COUNTIF 函数需要配合MATCH函数共同使用",-1)])),default:a(()=>[t(x,null,{default:a(()=>l[14]||(l[14]=[y("COUNTIF")])),_:1})]),_:1})]),_:1})]),_:1}),t(e,{label:"数据值"},{label:a(()=>l[16]||(l[16]=[u("span",{class:"tooltip-label",title:"使用MATCH()函数获取数据项内容"},"数据值",-1)])),default:a(()=>[u("div",null,[t(o,{modelValue:s.value.fx,"onUpdate:modelValue":l[4]||(l[4]=p=>s.value.fx=p),type:"textarea"},null,8,["modelValue"])])]),_:1})],64)):$("",!0)]),_:1})])):(g(),M("div",we,[t(B)]))]),_:1},8,["modelValue"])}}},xe=Q(Se,[["__scopeId","data-v-cf196e43"]]),Ie={class:"mapping-config"},De={class:"mapping-item"},Te={class:"mapping-content"},Me={flex:"main:center cross:center",style:{width:"44px"}},Oe={flex:"main:center cross:center",style:{width:"60px"}},Re={__name:"MappingConfig",setup(J){const r=window.luckysheet;function O(n){d.value.splice(n,1)}const w=[`/**
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
`],v=A([]),s=A(-1),R=A(null),L=A(null);function z(n){var e;if(n>-1&&d.value[n]&&d.value[n].events){const{augments:o,funcBody:m}=d.value[n].events;s.value=n,v.value=o,(e=R.value)==null||e.open(m)}}function F(n){const e=s.value;e>-1&&d.value[e]&&d.value[e].events&&(d.value[e].events.funcBody=n,s.value=-1)}function E(n){var e;n>-1&&d.value[n]&&d.value[n].datasource&&(s.value=n,(e=L.value)==null||e.open(d.value[n].datasource))}function S(n){const e=s.value;e>-1&&d.value[e]&&d.value[e].datasource&&(d.value[e].datasource=n,s.value=-1,l(d.value[e]))}function l({cellRange:n,datasource:e}){const o=e.type,m=e[o];if(o==="normal"){const V=new K().getMerge({value1:m});m.length>0?r.setDataVerification(V,{range:n}):r.deleteDataVerification({range:n})}else if(o==="fx"){const{matchCellRange:V,sourceList:k,orderIndex:C,countIf:x}=be(m);if(x){const h={};for(let I=0;I<x.keysList.length;I++){const p=x.keysList[I],D=x.valuesList[I],f=r.getCellValue(p.row,p.column,{order:C}),b=r.getCellValue(D.row,D.column,{order:C});h[f]?h[f]+=","+b:h[f]=b}const B=r.getCellValue(V.row,V.column,{order:C});if(B&&h[B]){const I=h[B],p=new K().getMerge({value1:I});I.length>0?r.setDataVerification(p,{range:n}):r.deleteDataVerification({range:n})}return}const T=k.map(h=>r.getCellValue(h.row,h.column,{order:C})).join(","),U=new K().getMerge({value1:T});T.length>0?r.setDataVerification(U,{range:n}):r.deleteDataVerification({range:n})}}function j(n){if(n>-1&&d.value[n]){const e=d.value[n],{cellIndex:o}=e;e.dataType==="select"?l(e):r.deleteDataVerification({range:{...e.cellRange}}),r.setCellValue(o.row,o.column,"")}}return(n,e)=>{const o=i("b-empty"),m=i("drag-handle"),V=i("action-button"),k=i("b-tag"),C=i("b-input"),x=i("b-option"),T=i("b-select"),U=i("b-icon"),h=i("b-button"),B=i("b-checkbox"),I=i("b-space"),p=i("FuncBodyEditorModal");return g(),M("div",Ie,[e[2]||(e[2]=oe('<div class="top-title" data-v-021bee72><span class="l1" data-v-021bee72>位置</span><span class="l2" data-v-021bee72>字段标识</span><span class="l3" data-v-021bee72>字段名称</span><span class="l4" data-v-021bee72>类型</span><span class="l5" data-v-021bee72>数据源</span><span class="l6" data-v-021bee72>事件</span></div>',1)),c(d).length===0?(g(),N(o,{key:0},{default:a(()=>e[1]||(e[1]=[y("暂无映射")])),_:1})):$("",!0),t(c(se),ne({modelValue:c(d),"onUpdate:modelValue":e[0]||(e[0]=D=>le(d)?d.value=D:null),class:"mapping-list","item-key":"element"},{animation:200,group:"mapping",ghostClass:"ghost",dragClass:"drag-item-class",handle:".drag-handle"}),{item:a(({element:D,index:f})=>[u("div",De,[t(m,{class:"drag-handle mr-5"}),t(V,{type:"text",icon:"close",color:"danger","is-icon":"",tooltip:"删除",confirm:"",onClick:b=>O(f)},null,8,["onClick"]),u("div",Te,[t(I,{size:4},{default:a(()=>[t(k,{style:{width:"38px","justify-content":"center",padding:"0 4px"}},{default:a(()=>[y(te(D.cellPosition.start),1)]),_:2},1024),t(C,{modelValue:c(d)[f].fieldName,"onUpdate:modelValue":b=>c(d)[f].fieldName=b,size:"small",placeholder:"字段标识"},null,8,["modelValue","onUpdate:modelValue"]),t(C,{modelValue:c(d)[f].fieldTitle,"onUpdate:modelValue":b=>c(d)[f].fieldTitle=b,size:"small",placeholder:"字段名称"},null,8,["modelValue","onUpdate:modelValue"]),t(T,{modelValue:c(d)[f].dataType,"onUpdate:modelValue":b=>c(d)[f].dataType=b,size:"small",style:{width:"70px"},onChange:()=>j(f)},{default:a(()=>[(g(!0),M(P,null,ee(c(q).DataType.mapping,(b,X)=>(g(),N(x,{key:X,value:X,label:b},null,8,["value","label"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue","onChange"]),u("div",Me,[t(h,{disabled:D.dataType!=="select",type:"text",title:"数据源配置",onClick:b=>E(f)},{default:a(()=>[t(U,{name:"database",size:"18"})]),_:2},1032,["disabled","onClick"])]),u("div",Oe,[t(B,{modelValue:c(d)[f].events.enable,"onUpdate:modelValue":b=>c(d)[f].events.enable=b,style:{"line-height":"1"}},null,8,["modelValue","onUpdate:modelValue"]),t(h,{disabled:!c(d)[f].events.enable,type:"text",title:"事件脚本",onClick:b=>z(f)},{default:a(()=>[t(U,{name:"code",size:"20"})]),_:2},1032,["disabled","onClick"])])]),_:2},1024)])])]),_:1},16,["modelValue"]),t(xe,{ref_key:"sourceConfigRef",ref:L,onSave:S},null,512),t(p,{augments:v.value,exampleFun:w,ref_key:"funcEditorRef",ref:R,onSave:F},null,8,["augments"])])}}},Ue=Q(Re,[["__scopeId","data-v-021bee72"]]),Ae={class:"sheet-wrapper"},Be={class:"sheet-header"},Ne={class:"left"},$e={class:"right"},Le={class:"right-config"},Ee={class:"right-top"},ze={class:"right-content"},Fe={class:"p8"},je={class:"mask"},Pe={__name:"SheetConfig",props:{cfg:{type:Object,default:()=>({})}},setup(J){const r=window.luckysheet,O=J,{info:w,title:v,btnLoading:s,isMaskShow:R,closePage:L,loadExcel:z,downloadExcel:F}=ye(O),E=ie();async function S(){try{w.value.name=v.value;const e=l();if(s.value=!0,e.id===""){const m=await fe(e);if(m){H.success("新增成功!"),Y("add-temp",{...e}),_.value.id=m,_.value.reportCount=_.value.records=0,_.value.isPublish="0";let V=E.resolve({path:"/excel-edit",query:{id:m}});window.location.replace(V.href),document.title="修改模板"}}else await ve(e),H.success("修改成功!"),Y("modify-temp",{...e})}catch(e){console.log(e)}s.value=!1}function l(){const e=r.getAllSheets();return{...Z(_.value),jsonData:{info:Z(w.value),sheets:e}}}function j(){const e=r.getRange()[0],o=Ce(e);if(_.value.mapping.findIndex(V=>re(V.cellRange,e))>-1){H.warning("已存在相同位置的单元格数据项！");return}_.value.mapping.push(new q().getMerge({...o}))}function n(){console.log(_.value);const e=JSON.stringify(_.value);me(e)}return(e,o)=>{const m=i("b-input"),V=i("b-space"),k=i("b-button"),C=i("b-divider"),x=i("b-ace-editor"),T=i("b-scrollbar");return g(),M("div",Ae,[u("div",Be,[u("div",Ne,[t(V,null,{default:a(()=>[o[1]||(o[1]=u("h3",null,"模板名称",-1)),t(m,{modelValue:c(v),"onUpdate:modelValue":o[0]||(o[0]=U=>le(v)?v.value=U:null),placeholder:"模板名称"},null,8,["modelValue"])]),_:1})]),u("div",$e,[c(W)?(g(),N(k,{key:0,type:"text",icon:"bug","text-color":"danger",title:"打印调试",onClick:c(Ve)},null,8,["onClick"])):$("",!0),t(k,{type:"primary",size:"small",icon:"login",plain:"",onClick:c(z)},{default:a(()=>o[2]||(o[2]=[y(" 导入模板 ")])),_:1},8,["onClick"]),t(k,{type:"primary",size:"small",icon:"download",plain:"",onClick:c(F)},{default:a(()=>o[3]||(o[3]=[y(" 下载模板 ")])),_:1},8,["onClick"]),t(C,{type:"vertical"}),t(k,{type:"primary",size:"small",icon:"save",loading:c(s),onClick:S},{default:a(()=>o[4]||(o[4]=[y(" 保存 ")])),_:1},8,["loading"]),t(k,{type:"danger",size:"small",icon:"close",onClick:c(L)},{default:a(()=>o[5]||(o[5]=[y("关闭")])),_:1},8,["onClick"])])]),o[9]||(o[9]=u("div",{id:"SheetContainer",class:"sheet-excel has-config"},null,-1)),u("div",Le,[u("div",Ee,[t(k,{type:"primary",size:"small",dashed:"",onClick:j},{default:a(()=>o[6]||(o[6]=[y("设为数据项")])),_:1})]),u("div",ze,[t(T,null,{default:a(()=>[u("div",Fe,[t(Ue),c(W)?(g(),M(P,{key:0},[t(C,{align:"left"},{default:a(()=>o[7]||(o[7]=[y("实际存储值")])),_:1}),t(k,{type:"text",icon:"file-copy",onClick:n},{default:a(()=>o[8]||(o[8]=[y("复制配置项")])),_:1}),t(x,{"model-value":JSON.stringify({id:c(_).id,name:c(_).name,mapping:c(_).mapping},null,2),readonly:""},null,8,["model-value"])],64)):$("",!0)])]),_:1})])]),ue(u("div",je,"loading",512),[[de,c(R)]])])}}},Je=Q(Pe,[["__scopeId","data-v-484cd714"]]),Ge=Object.assign({name:"ExcelEdit"},{__name:"index",setup(J){const r=pe(),O=A(!1);return ce(()=>r.path,async()=>{const{id:w}=r.query;if(document.title=w?"修改模板":"新增模板",w){const v=await _e(w);_.value={...v},_.value.mapping=_.value.mapping.map(s=>new q().getMerge(s))}else ke(),_.value.name="新模板";O.value=!0},{immediate:!0}),(w,v)=>O.value?(g(),N(Je,{key:0})):$("",!0)}});export{Ge as default};
