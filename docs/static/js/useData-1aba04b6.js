import{aP as k,aQ as A,e as x,b as D,o as E,H as T,aR as M}from"./vendor-a6c5ad11.js";import{M as R,a as y}from"./chunk-bin-ui-next-1e71edb3.js";import{j as S,k as F,m as C}from"./index-f676c4c8.js";import{d as j}from"./cross-tab-msg-0dc279e4.js";function z(t){return S(t)==="object"}function B(t){return S(t)==="function"}const I=(t,a)=>new Promise(n=>{const r=new k.Workbook;return z(t)&&(t=[t]),t.forEach(function(o){if(o.data.length===0)return!0;const l=r.addWorksheet(o.name),i=o.config&&o.config.merge||{},u=o.config&&o.config.borderInfo||{};return P(o.data,l),O(i,l),_(u,l),!0}),r.xlsx.writeBuffer().then(o=>{const l=new Blob([o],{type:"application/vnd.ms-excel;charset=utf-8"});n(),A.saveAs(l,`${a}.xlsx`)})}),O=(t={},a)=>{Object.values(t).forEach(function(r){a.mergeCells(r.r+1,r.c+1,r.r+r.rs,r.c+r.cs)})},_=(t,a)=>{!Array.isArray(t)||t.forEach(function(n){if(n.rangeType==="range"){let r=H(n.borderType,n.style,n.color),e=n.range[0],o=e.row,l=e.column;for(let i=o[0]+1;i<o[1]+2;i++)for(let u=l[0]+1;u<l[1]+2;u++)a.getCell(i,u).border=r}if(n.rangeType==="cell"){const{col_index:r,row_index:e}=n.value,o=Object.assign({},n.value);delete o.col_index,delete o.row_index;let l=L(o);a.getCell(e+1,r+1).border=l}})},P=(t,a)=>{!Array.isArray(t)||t.forEach(function(n,r){n.every(function(e,o){if(!e)return!0;let l=V(e.bg),i=W(e.ff,e.fc,e.bl,e.it,e.fs,e.cl,e.ul),u=Z(e.vt,e.ht,e.tb,e.tr),f="";e.f?f={formula:e.f,result:e.v}:!e.v&&e.ct&&e.ct.s?e.ct.s.forEach(s=>{f+=s.v}):f=e.v;let w=N(o),c=a.getCell(w+(r+1));for(const s in l){c.fill=l;break}return c.font=i,c.alignment=u,c.value=f,!0})})},V=t=>t?{type:"pattern",pattern:"solid",fgColor:{argb:t.replace("#","")}}:{},W=(t=0,a="#000000",n=0,r=0,e=10,o=0,l=0)=>{const i={0:"\u5FAE\u8F6F\u96C5\u9ED1",1:"\u5B8B\u4F53\uFF08Song\uFF09",2:"\u9ED1\u4F53\uFF08ST Heiti\uFF09",3:"\u6977\u4F53\uFF08ST Kaiti\uFF09",4:"\u4EFF\u5B8B\uFF08ST FangSong\uFF09",5:"\u65B0\u5B8B\u4F53\uFF08ST Song\uFF09",6:"\u534E\u6587\u65B0\u9B4F",7:"\u534E\u6587\u884C\u6977",8:"\u534E\u6587\u96B6\u4E66",9:"Arial",10:"Times New Roman ",11:"Tahoma ",12:"Verdana",num2bl:function(f){return f!==0}};return{name:typeof t=="number"?i[t]:t,family:1,size:e,color:{argb:a.replace("#","")},bold:i.num2bl(n),italic:i.num2bl(r),underline:i.num2bl(l),strike:i.num2bl(o)}},Z=(t="default",a="default",n="default",r="default")=>{const e={vertical:{0:"middle",1:"top",2:"bottom",default:"top"},horizontal:{0:"center",1:"left",2:"right",default:"left"},wrapText:{0:!1,1:!1,2:!0,default:!1},textRotation:{0:0,1:45,2:-45,3:"vertical",4:90,5:-90,default:0}};return{vertical:e.vertical[t],horizontal:e.horizontal[a],wrapText:e.wrapText[n],textRotation:e.textRotation[r]}},H=(t,a=1,n="#000")=>{if(!t)return{};const r={type:{"border-all":"all","border-top":"top","border-right":"right","border-bottom":"bottom","border-left":"left"},style:{0:"none",1:"thin",2:"hair",3:"dotted",4:"dashDot",5:"dashDot",6:"dashDotDot",7:"double",8:"medium",9:"mediumDashed",10:"mediumDashDot",11:"mediumDashDotDot",12:"slantDashDot",13:"thick"}};let e={style:r.style[a],color:{argb:n.replace("#","")}},o={};return r.type[t]==="all"?(o.top=e,o.right=e,o.bottom=e,o.left=e):o[r.type[t]]=e,o};function L(t,a,n){let r={};const e={type:{l:"left",r:"right",b:"bottom",t:"top"},style:{0:"none",1:"thin",2:"hair",3:"dotted",4:"dashDot",5:"dashDot",6:"dashDotDot",7:"double",8:"medium",9:"mediumDashed",10:"mediumDashDot",11:"mediumDashDotDot",12:"slantDashDot",13:"thick"}};for(const o in t)t[o].color.indexOf("rgb")===-1?r[e.type[o]]={style:e.style[t[o].style],color:{argb:t[o].color.replace("#","")}}:r[e.type[o]]={style:e.style[t[o].style],color:{argb:t[o].color}};return r}function N(t){let a="A".charCodeAt(0),r="Z".charCodeAt(0)-a+1,e="";for(;t>=0;)e=String.fromCharCode(t%r+a)+e,t=Math.floor(t/r)-1;return e}const U={lang:"zh",showinfobar:!1,showtoolbar:!0,showtoolbarFormula:!0,showtoolbarData:!0,showtoolbarConfig:{undoRedo:!0,paintFormat:!0,currencyFormat:!1,percentageFormat:!1,numberDecrease:!1,numberIncrease:!1,moreFormats:!0,font:!0,fontSize:!0,bold:!0,italic:!0,strikethrough:!0,underline:!0,textColor:!0,fillColor:!0,border:!0,mergeCell:!0,horizontalAlignMode:!0,verticalAlignMode:!0,textWrapMode:!0,textRotateMode:!0,image:!1,link:!1,chart:!1,postil:!1,pivotTable:!1,function:!0,frozenMode:!0,sortAndFilter:!0,conditionalFormat:!0,dataVerification:!0,splitColumn:!1,screenshot:!1,findAndReplace:!0,protection:!0,print:!1},showsheetbar:!0,showstatisticBar:!0,showstatisticBarConfig:{view:!1},allowUpdate:!0,allowInsertRow:!0,allowInsertColumn:!0,allowDeleteRow:!0,allowDeleteColumn:!0,allowRenameSheet:!0,allowCopy:!0,allowSortRow:!0,allowStatistic:!0,allowFilter:!0,allowResize:!0},m=window.luckysheet,h=x({id:"",name:"",jsonData:[],mapping:[]});function Y(){h.value={id:"",name:"",jsonData:[],mapping:[]}}function J(){}function ee(t){var w,c;const a=x(!1),n=x(!1),r=x({...j,...(c=(w=h.value)==null?void 0:w.jsonData)==null?void 0:c.info}),e=D({get:()=>h.value.name,set:s=>h.value.name=s}),o=D(()=>F(C({...U,container:"SheetContainer",title:e.value,data:[{name:"Sheet1",index:0}]}),C(t.cfg)));function l(){R.confirm({type:"warning",title:"\u63D0\u793A",message:"\u5173\u95ED\u5F53\u524D\u9875\u9762\u4F1A\u4E22\u5931\u6CA1\u6709\u4FDD\u5B58\u7684\u64CD\u4F5C, \u662F\u5426\u7EE7\u7EED?"}).then(()=>{window.close()}).catch(()=>{})}function i(){B(m==null?void 0:m.destroy)&&m.destroy()}function u(){let s=document.createElement("input");s.type="file",s.onchange=p=>{const d=p.target.files;if(!d||d.length===0){y.error("No files wait for import");return}let b=d[0],v=b.name.split(".");if(v[v.length-1]!=="xlsx"){y.error("Currently only supports the import of xlsx files");return}r.value.name=b.name,n.value=!0,M.transformExcelToLucky(d[0],g=>{if(!g.sheets||g.sheets.length===0){y.error("Failed to read the content of the excel file, currently does not support xls files!");return}console.log("exportJson",g),n.value=!1,i(),m.create({...o.value,data:g.sheets,title:g.info.name,userInfo:g.info.name.creator})})},s.click()}function f(){I(m.getAllSheets(),e.value).then(()=>{y.success("\u5BFC\u51FA\u6210\u529F!")})}return E(()=>{var d,b;const s=h.value.id,p={...o.value};s&&(p.data=(d=h.value.jsonData)==null?void 0:d.sheets,p.title=(b=h.value.jsonData)==null?void 0:b.info.name),m.create(p)}),T(()=>{i()}),{info:r,title:e,options:o,btnLoading:a,isMaskShow:n,closePage:l,loadExcel:u,downloadExcel:f}}export{J as d,h as e,Y as i,ee as u};