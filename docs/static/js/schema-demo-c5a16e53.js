import{a8 as ee,r as n,p as te,G as ae,Q as d,o as c,j as S,w as o,b as a,f as m,K as s,a as f,R as J,H as R,t as T,F as K,i as y,I as ne,T as le,a9 as oe,aa as se}from"./vendor-5c4b4c96.js";import{n as ie}from"./chunk-bin-ui-design-2f3ecd04.js";import{n as ce}from"./index-0c470c36.js";import"./chunk-brace-6f23dcf5.js";import"./chunk-mockjs-c013c588.js";const ue="/bin-admin-pro/static/png/temp_1-5b44c19a.png",re="/bin-admin-pro/static/png/temp_2-b07f3fc4.png",pe="/bin-admin-pro/static/png/temp_3-5e1cf333.png",de="/bin-admin-pro/static/png/temp_4-15b71a7f.png",me="/bin-admin-pro/static/png/temp_5-e8b6f052.png",ve="/bin-admin-pro/static/png/temp_6-099bf39e.png",_e="/bin-admin-pro/static/png/temp_7-fc704490.png",fe="/bin-admin-pro/static/png/temp_8-8a41047e.png",ge=[ue,re,pe,de,me,ve,_e,fe];function he(){const v=[];for(let _=1;_<=8;_++)v.push({id:Math.floor(Math.random()*1e4),name:`\u56FE\u7247_${_}`,bgInfo:{url:ge[_-1],width:2447,height:3461},comps:[]});return v}const be=v=>(oe("data-v-38288a58"),v=v(),se(),v),ye={class:"preview-panel",flex:""},Ce={class:"left-images"},ke={class:"top-bar image-list"},xe={class:"image-list-wp"},we=["onClick"],Ie=be(()=>a("i",{class:"el-icon-picture-outline"},null,-1)),Se=["title","onClick"],Ve={key:0,class:"top-bar",flex:"main:justify"},$e={key:0,class:"config-panel"},De={class:"top-bar",flex:"main:justify"},Be={class:"editor"},Me={__name:"schema-demo",setup(v){const _=n(null),C=n(null),V=n(!1),z=n({}),A=n(null),k=n(!1),g=n(""),r=n(""),$=n(""),h=n(-1),G=n(""),x=n(""),j=n(-1),p=n(he()),w=n(!1),I=n(400);function D(t,e){h.value=e,G.value=t.id,C.value.setConfig(t)}function B(t=!1){A.value=C.value.getAllConfig();const e=p.value[h.value],i=ce({id:e.id,name:e.name},A.value);p.value[h.value]=i,t&&ie({type:"success",message:"\u4FDD\u5B58\u6210\u529F! "})}function E(t,e){e>=0&&B(),D(t,e)}function L(){g.value="\u5168\u5C40",r.value=$.value,k.value=!0}function O(t,e,i,M){E(t,e),x.value=i.id,j.value=M,g.value=`${t.name} - ${i.alias} - `,r.value=i.script?i.script:"",k.value=!0}function P(t){r.value=`
  char c1 = 'A'
  assert c1 instanceof Character

  def c2 = 'B' as char
  assert c2 instanceof Character

  def c3 = (char)'C'
  assert c3 instanceof Character`}function q(){x.value="",j.value=-1,g.value="",r.value="",k.value=!1}function Q(){if(g.value==="\u5168\u5C40")$.value=r.value;else{const t=p.value[h.value],e=t.comps.findIndex(i=>i.id===x.value);e>-1&&(t.comps[e].script=r.value,D(t,h.value))}q()}function W(){z.value=C.value.getAllConfig(),V.value=!0}return te(async()=>{if(p.value.length>0){I.value=_.value.clientHeight-48,w.value=!0;const t=p.value[0];t.comps=[{id:"comp_2907",name:"comp_2907",alias:"\u533A\u57DF_2907",attr:{x:867,y:487,w:538,h:135}},{id:"comp_2951",name:"comp_2951",alias:"\u533A\u57DF_2951",attr:{x:774,y:784,w:664,h:142}}],await ae(),D(t,0)}}),(t,e)=>{const i=d("b-icon"),M=d("b-tooltip"),F=d("b-empty"),b=d("b-button"),X=d("SchemaEditor"),H=d("b-ace-editor"),Y=d("b-modal"),Z=d("page-wrapper");return c(),S(Z,null,{default:o(()=>[a("div",ye,[a("div",Ce,[a("div",ke,[m(" \u56FE\u7247\u5217\u8868 "),s(M,{class:"item",content:"\u70B9\u51FB\u56FE\u7247\u8F7D\u5165\u5176\u533A\u57DF\u914D\u7F6E",placement:"right"},{default:o(()=>[s(i,{name:"question-circle"})]),_:1})]),a("div",xe,[(c(!0),f(K,null,J(p.value,(l,N)=>(c(),f("div",{key:N,class:R(["image-wrap",{"has-comps":l.comps.length}])},[a("div",{class:R(["image-item",{active:G.value===l.id}]),onClick:u=>E(l,N)},[Ie,a("span",null,T(l.name),1)],10,we),(c(!0),f(K,null,J(l.comps,(u,U)=>(c(),f("div",{class:R(["item-comp",[{active:x.value===u.id},{edited:u.script&&u.script.length}]]),key:U+u.id},[a("span",{title:`${u.alias}-${u.name}`,onClick:Ne=>O(l,N,u,U)},T(u.alias),9,Se)],2))),128))],2))),128)),p.value.length===0?(c(),S(F,{key:0},{default:o(()=>[m("\u6682\u65E0\u5217\u8868")]),_:1})):y("",!0)])]),a("div",{class:"right-config",ref_key:"contentRef",ref:_},[w.value?(c(),f("div",Ve,[a("div",null,[s(b,{plain:"",type:$.value.length?"success":"default",onClick:L},{default:o(()=>[m(" \u5168\u5C40\u914D\u7F6E ")]),_:1},8,["type"]),s(b,{onClick:W},{default:o(()=>[m("\u67E5\u770B\u914D\u7F6E")]),_:1})]),a("div",null,[s(b,{onClick:e[0]||(e[0]=l=>B(!0))},{default:o(()=>[m("\u4FDD\u5B58")]),_:1})])])):y("",!0),w.value?(c(),S(X,{key:1,ref_key:"schemaRef",ref:C,height:I.value+"px",onAutoSave:B},null,8,["height"])):y("",!0),p.value.length===0&&!w.value?(c(),S(F,{key:2},{default:o(()=>[m("\u8BF7\u5148\u51C6\u5907\u53EF\u64CD\u4F5C\u7684\u56FE\u7247")]),_:1})):y("",!0),s(le,{name:"fade-right"},{default:o(()=>[k.value?(c(),f("div",$e,[a("div",De,[a("span",null,T(g.value)+"\u811A\u672C\u914D\u7F6E",1),a("div",null,[s(b,{size:"small",plain:"",onClick:q},{default:o(()=>[m("\u5173\u95ED")]),_:1}),s(b,{size:"small",plain:"",type:"primary",onClick:Q},{default:o(()=>[m("\u4FDD\u5B58\u811A\u672C")]),_:1})])]),a("div",{class:"edit-content",style:ne({height:I.value+"px"}),flex:""},[a("div",Be,[s(H,{modelValue:r.value,"onUpdate:modelValue":e[1]||(e[1]=l=>r.value=l),lang:"groovy",height:I.value+"px"},null,8,["modelValue","height"])]),a("div",{class:"keys"},[a("div",{class:"key-item",onClick:P},"\u6D4B\u8BD5\u811A\u672C")])],4)])):y("",!0)]),_:1})],512)]),s(Y,{title:"\u5F53\u524D\u914D\u7F6E",modelValue:V.value,"onUpdate:modelValue":e[2]||(e[2]=l=>V.value=l),width:"700px"},{default:o(()=>[s(H,{"model-value":JSON.stringify(z.value,null,2),height:"400px"},null,8,["model-value"])]),_:1},8,["modelValue"])]),_:1})}}},je=ee(Me,[["__scopeId","data-v-38288a58"]]);export{je as default};