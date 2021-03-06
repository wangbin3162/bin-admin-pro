import{j as e,t as a}from"./index-c3db3ba4.js";import{f as t,x as l,a7 as n,a8 as o,g as s,n as r,J as d,L as c,o as i,A as h,B as u,t as p,c as m,a as f,r as y,u as v,w as k,F as b,d as g,D as w,E as x,q as S}from"./vendor-76eb7e0b.js";function C(n,o={},s,r="text"){const d=t(null),c=t([]),i=t(""),h=t(!1),u=t(!1),p=async()=>{if(n){try{m(!0);const a=await n(o);"object"===e(a)?c.value=[a]:c.value=a,s&&s.emit("init-success")}catch(t){a("useTree/getTreeData",t)}m(!1)}};function m(e){h.value=e}return{treeRef:d,query:i,loading:h,treeData:c,hasChecked:u,getFlatState:()=>d.value.getFlatState(),getTreeData:p,reloadTree:async(e=[],a=[])=>{await p(),await l(),d.value.setSelected(e),d.value.setExpand(a)},reloadTreeWithCheck:async(e=[])=>{await p(),await l(),d.value&&d.value.setChecked(e)},handleFilter:e=>{d.value&&d.value.filter(e)},filterNode:(e,a)=>!e||-1!==a[r].indexOf(e),handleSelect:(e,a,t)=>{s&&s.emit("select-change",a,t)},handleChecked:(e,a,t)=>{u.value=e.length>0,s&&s.emit("check-change",e,a,t)}}}const A={name:"BaseTree",props:{width:{type:String,default:"320px"},minHeight:{type:String,default:"300px"},maxHeight:{type:String,default:"700px"},treeTitle:{type:String},filterPosition:{type:String,default:"top"},lock:Boolean,fetch:{type:[Function,Array]},params:{type:Object},render:Function,showCheckbox:{type:Boolean},checkStrictly:{type:Boolean},showFilter:{type:Boolean},titleKey:{type:String,default:"text"},defaultExpand:{type:Boolean},expandKeys:{type:Array,default:()=>[]},selectedKeys:{type:Array,default:()=>[]}},emits:["select-change","check-change","command","init-success"],setup(a,n){const o=t(null),d=s((()=>a.showFilter&&"top"===a.filterPosition)),c=s((()=>a.showFilter&&"inner"===a.filterPosition)),{treeRef:i,loading:h,query:u,treeData:p,getTreeData:m,reloadTree:f,reloadTreeWithCheck:y,handleSelect:v,handleChecked:k,handleFilter:b,filterNode:g}=C(a.fetch,a.params,n,a.titleKey);function w(){i.value&&i.value.setExpand(a.expandKeys),i.value&&i.value.setSelected(a.selectedKeys)}return r((()=>a.fetch),(async a=>{if("array"===e(a))return p.value=a,a.length>0&&(await l(),w()),!0;await m(),w()}),{immediate:!0}),{treeEl:o,showTopSearch:d,showInnerSearch:c,treeRef:i,query:u,loading:h,treeData:p,getTreeData:m,reloadTree:f,reloadTreeWithCheck:y,handleSelect:v,handleChecked:k,handleAction:function(e){switch(e){case"expandAll":i.value&&i.value.expandAll();break;case"collapseAll":i.value&&i.value.collapseAll();break;case"checkAll":i.value&&i.value.checkAll();break;case"uncheckAll":i.value&&i.value.uncheckAll()}n.emit("command",e)},handleFilter:b,filterNode:g}}};n("data-v-53325db2");const T={class:"base-tree-header"},F={class:"base-title"},D={class:"base-ctrl"},_={class:"search"},q={class:"ctrl"},B=u("i",{class:"b-iconfont b-icon-ellipsis"},null,-1),E=S("????????????"),K=S("????????????"),$=S("????????????"),H=S("????????????"),V={key:0,class:"tree-inner"},j={key:1,class:"inner-search"},N={class:"mr-5"},R={key:0,class:"tree-bottom"};o(),A.render=function(e,a,t,l,n,o){const s=d("b-input"),r=d("b-dropdown-item"),S=d("b-dropdown-menu"),C=d("b-dropdown"),A=d("b-tree"),I=c("loading");return i(),h("div",{class:"base-tree",style:x({width:t.width}),ref:"treeEl"},[u("div",T,[u("span",F,p(t.treeTitle),1),u("div",D,[u("div",_,[l.showTopSearch?(i(),m(s,{key:0,size:"small",search:"",modelValue:l.query,"onUpdate:modelValue":a[0]||(a[0]=e=>l.query=e),placeholder:"??????",onSearch:l.handleFilter},null,8,["modelValue","onSearch"])):f("",!0),y(e.$slots,"default",{},void 0,!0)]),u("div",q,[v(C,{"append-to-body":"",placement:"bottom-start",onCommand:l.handleAction},{dropdown:k((()=>[v(S,null,{default:k((()=>[v(r,{name:"expandAll"},{default:k((()=>[E])),_:1}),v(r,{name:"collapseAll"},{default:k((()=>[K])),_:1}),t.showCheckbox?(i(),h(b,{key:0},[v(r,{name:"checkAll",divided:""},{default:k((()=>[$])),_:1}),v(r,{name:"uncheckAll"},{default:k((()=>[H])),_:1})],64)):f("",!0),y(e.$slots,"ctrl",{},void 0,!0)])),_:3})])),default:k((()=>[B])),_:3},8,["onCommand"])])])]),g(u("div",{class:w(["tree-wrap",{"has-bottom":e.$slots.bottom}]),style:x({minHeight:t.minHeight,maxHeight:t.maxHeight})},[e.$slots.inner?(i(),h("div",V,[y(e.$slots,"inner",{},void 0,!0)])):f("",!0),l.showInnerSearch?(i(),h("div",j,[v(s,{size:"small",search:"",modelValue:l.query,"onUpdate:modelValue":a[1]||(a[1]=e=>l.query=e),placeholder:"??????",onSearch:l.handleFilter},null,8,["modelValue","onSearch"])])):f("",!0),u("div",N,[v(A,{data:l.treeData,"title-key":t.titleKey,"show-checkbox":t.showCheckbox,"filter-node-method":l.filterNode,render:t.render,"lock-select":t.lock,"default-expand":t.defaultExpand,ref:"treeRef",onSelectChange:l.handleSelect,onCheckChange:l.handleChecked},null,8,["data","title-key","show-checkbox","filter-node-method","render","lock-select","default-expand","onSelectChange","onCheckChange"])])],6),[[I,l.loading]]),e.$slots.bottom?(i(),h("div",R,[y(e.$slots,"bottom",{},void 0,!0)])):f("",!0)],4)},A.__scopeId="data-v-53325db2";export{A as _,C as u};
