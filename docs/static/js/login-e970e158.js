import{l as v,t as g,i as x,_ as L}from"./index-f19363d9.js";import{a9 as V,aO as k,G as r,o as f,a as h,b as e,F as K,O as q,c as s,w as a,L as u,m as b,ac as F,ad as I}from"./vendor-8d0d5030.js";import"./chunk-bin-ui-next-02c71193.js";import"./chunk-brace-6f23dcf5.js";import"./chunk-mockjs-c013c588.js";const S="/bin-admin-pro/static/png/login-code-8c841f1c.png";const z={name:"Login",data(){return{formLogin:{username:"admin",password:"admin",captcha:"v9am"},loading:!1,rules:{username:[{required:!0,message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",trigger:"blur"}],password:[{required:!0,message:"\u8BF7\u8F93\u5165\u5BC6\u7801",trigger:"blur"}],captcha:[{required:!0,message:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",trigger:"blur"}]}}},methods:{...k(x,["setToken"]),submit(){this.$refs.loginForm.validate(async t=>{if(t){try{this.loading=!0;const{data:o}=await v(this.formLogin);await this.loginSuccess(o)}catch(o){g("login/requestFailed",o)}this.loading=!1}})},async loginSuccess(t){if(t.code==="00"){const o=t.data.accessToken;await this.setToken(o);const _=this.$route.query.redirect||"/";await this.$router.push({path:_})}else g("login/requestFailed",t)}}},c=t=>(F("data-v-e68033e8"),t=t(),I(),t),N={class:"page-login"},B={class:"layer area"},C={class:"circles"},T={class:"layer"},O={class:"content",flex:"dir:top main:justify cross:center box:justify"},U=c(()=>e("div",{class:"header"},[e("p",{class:"header-motto"},"\u5F00\u7BB1\u5373\u7528\u7684\u4E2D\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF")],-1)),j={class:"main",flex:"dir:top main:center cross:center"},A=c(()=>e("div",{class:"page-login--logo"},[e("img",{src:L,alt:"logo"}),e("span",null,"BIN-ADMIN-PRO")],-1)),E={class:"form"},D=c(()=>e("span",{class:"login-code"},[e("img",{src:S,alt:"code"})],-1)),G=c(()=>e("div",{class:"footer"},[e("p",{class:"footer-copyright"},[b(" bin admin pro \u7B80\u7248\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDFvue3 \u91CD\u6784\u7248 "),e("a",{href:"https://github.com/wangbin3162/bin-admin-pro",target:"_blank"},"github")])],-1));function M(t,o,_,P,n,l){const d=r("b-icon"),m=r("b-input"),p=r("b-form-item"),y=r("b-button"),w=r("b-form");return f(),h("div",N,[e("div",B,[e("ul",C,[(f(),h(K,null,q(10,i=>e("li",{key:i})),64))])]),e("div",T,[e("div",O,[U,e("div",j,[A,e("div",E,[s(w,{ref:"loginForm","label-position":"top",rules:n.rules,model:n.formLogin,size:"large"},{default:a(()=>[s(p,{prop:"username"},{default:a(()=>[s(m,{type:"text",modelValue:n.formLogin.username,"onUpdate:modelValue":o[0]||(o[0]=i=>n.formLogin.username=i),placeholder:"\u7528\u6237\u540D[admin,wang]",onKeydown:u(l.submit,["enter"])},{prefix:a(()=>[s(d,{name:"user",size:"16"})]),_:1},8,["modelValue","onKeydown"])]),_:1}),s(p,{prop:"password"},{default:a(()=>[s(m,{type:"password",modelValue:n.formLogin.password,"onUpdate:modelValue":o[1]||(o[1]=i=>n.formLogin.password=i),placeholder:"\u5BC6\u7801[admin,123456]",onKeydown:u(l.submit,["enter"])},{prefix:a(()=>[s(d,{name:"lock",size:"16"})]),_:1},8,["modelValue","onKeydown"])]),_:1}),s(p,{prop:"captcha"},{default:a(()=>[s(m,{type:"text",modelValue:n.formLogin.captcha,"onUpdate:modelValue":o[2]||(o[2]=i=>n.formLogin.captcha=i),placeholder:"- - - -",style:{width:"68%"},onKeydown:u(l.submit,["enter"])},{prefix:a(()=>[s(d,{name:"bulb",size:"16"})]),_:1},8,["modelValue","onKeydown"]),D]),_:1}),s(y,{onClick:l.submit,loading:n.loading,type:"primary",class:"button-login",size:"large"},{default:a(()=>[b(" \u767B\u5F55 ")]),_:1},8,["onClick","loading"])]),_:1},8,["rules","model"])])]),G])])])}const X=V(z,[["render",M],["__scopeId","data-v-e68033e8"]]);export{X as default};