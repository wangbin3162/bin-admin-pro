import{u as e,a as t}from"./index-c3db3ba4.js";import{a7 as s,a8 as a,o,A as r,B as d,r as n,E as i,g as l,f as c,J as g,t as p,q as h,a as v,c as f,D as u,w as b}from"./vendor-76eb7e0b.js";const m={name:"PageFooter",setup(){const{rightContentWidth:t}=e();return{rightContentWidth:t}}};s("data-v-26f409a8");const w={class:"page-footer__left"},$={class:"page-footer__right"};a(),m.render=function(e,t,s,a,l,c){return o(),r("div",{class:"page-footer",style:i(a.rightContentWidth)},[d("div",w,[n(e.$slots,"left",{},void 0,!0)]),n(e.$slots,"center",{},void 0,!0),d("div",$,[n(e.$slots,"right",{},void 0,!0)])],4)},m.__scopeId="data-v-26f409a8";const _={name:"PageWrapper",components:{PageFooter:m},props:{title:String,desc:String,showClose:Boolean,bg:Boolean,contentPadding:{type:String,default:"16px"}},emits:["close"],setup(s,{slots:a}){const{showTagsView:o}=e(),{getCurrentRouteMenu:r}=t();return{normalTitle:l((()=>s.title?s.title:r()?r().title:"no-title")),showTagsView:o,getShowFooter:c(a.leftFooter||a.rightFooter)}}};s("data-v-7067e3db");const F={class:"page-header-wrap"},y={class:"page-header-wrap-page-header-warp"},C={class:"grid-content"},P={class:"page-header has-breadcrumb"},S={class:"page-header-heading"},k={class:"page-header-heading-title"},T={key:0,class:"page-header-desc"},W={class:"grid-content"};a(),_.render=function(e,t,s,a,l,c){const m=g("b-icon"),w=g("page-footer");return o(),r("div",F,[d("div",y,[d("div",C,[d("div",P,[d("div",S,[d("span",k,p(a.normalTitle),1),n(e.$slots,"right",{},void 0,!0)]),e.$slots.desc||s.desc?(o(),r("div",T,[n(e.$slots,"desc",{},(()=>[h(p(s.desc),1)]),{})])):v("",!0),s.showClose?(o(),f(m,{key:1,name:"close",type:"button",onClick:t[0]||(t[0]=t=>e.$emit("close"))})):v("",!0)])])]),d("div",W,[d("div",{class:u(["page-header-wrap-children-content",{"has-bg":s.bg}]),style:i({padding:s.bg?s.contentPadding:null})},[n(e.$slots,"default",{},void 0,!0)],6)]),a.getShowFooter?(o(),f(w,{key:0},{left:b((()=>[n(e.$slots,"leftFooter",{},void 0,!0)])),right:b((()=>[n(e.$slots,"rightFooter",{},void 0,!0)])),_:3})):v("",!0)])},_.__scopeId="data-v-7067e3db";export{_};