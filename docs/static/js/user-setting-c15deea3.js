import{b as l}from"./index-e9e85ee6.js";import{a7 as e,a8 as a,J as s,o as t,A as i,u as d,w as n,B as c,F as o,K as u,D as m,t as r,c as p,a as f,q as b}from"./vendor-fe3131ae.js";import"./chunk-bin-ui-next-169a0b5b.js";import"./chunk-brace-7f859248.js";const v={name:"UserSetting",data:()=>({tabs:{base:{title:"基本设置",desc:"个人账户信息设置"},safe:{title:"安全设置",desc:"密码邮箱设置"},auth:{title:"认证设置",desc:"账号绑定、实名认证设置"},message:{title:"通知设置",desc:"消息通知设置"}},active:"base",baseInfo:{email:"316281400@qq.com",name:"Wang",phone:"176****1212",intro:"个人简介",address:"徐州市"}}),methods:{updateBase(){this.$message.success("更新成功！")}}};e("data-v-4f68a412");const h={class:"setting-wrap"},g={class:"ctrl-header"},_=c("span",null,"个人设置",-1),k={class:"pt-5 pb-5"},V=["onClick"],I={class:"tab-item-title"},y={class:"tab-item-desc"},w=b("更新信息"),U={class:"avatar-wrap"},q=c("div",{class:"mb-8"},"头像",-1),x=c("div",{class:"avatar-img mb-8"},[c("img",{src:l,alt:"logo"})],-1),j=b("更换头像"),C={key:1,class:"pt-8 pb-16"},B=c("div",{class:"list-item"},[c("div",{class:"list-item-left"},[c("h4",null,"账户密码"),c("p",null,"绑定手机和邮箱，并设置密码，帐号更安全")]),c("div",{class:"list-item-right"},[c("a",{target:"_self",class:"i-link"},"修改")])],-1),z=c("div",{class:"list-item"},[c("div",{class:"list-item-left"},[c("h4",null,"绑定手机"),c("p",null,"已绑定手机号：+176****2310")]),c("div",{class:"list-item-right"},[c("a",{target:"_self",class:"i-link"},"修改")])],-1),A=c("div",{class:"list-item"},[c("div",{class:"list-item-left"},[c("h4",null,"密保问题"),c("p",null,"设置密保问题可以有效保护账户安全")]),c("div",{class:"list-item-right"},[c("a",{target:"_self",class:"i-link"},"修改")])],-1),D=c("div",{class:"list-item"},[c("div",{class:"list-item-left"},[c("h4",null,"备用邮箱"),c("p",null,"已绑定邮箱wangbin3162@qq.com")]),c("div",{class:"list-item-right"},[c("a",{target:"_self",class:"i-link"},"修改")])],-1),F={key:2,class:"pt-8 pb-16"},J=c("div",{class:"list-item"},[c("div",{class:"list-item-left"},[c("h4",null,"绑定微信"),c("p",null,"未绑定微信账户")]),c("div",{class:"list-item-right"},[c("a",{target:"_self",class:"i-link"},"绑定")])],-1),K=c("div",{class:"list-item"},[c("div",{class:"list-item-left"},[c("h4",null,"绑定支付宝"),c("p",null,"未绑定支付宝账户")]),c("div",{class:"list-item-right"},[c("a",{target:"_self",class:"i-link"},"绑定")])],-1),S=c("div",{class:"list-item"},[c("div",{class:"list-item-left"},[c("h4",null,"实名认证"),c("p",null,"未进行实名认证")]),c("div",{class:"list-item-right"},[c("a",{target:"_self",class:"i-link"},"认证")])],-1),W={key:3,class:"pt-8 pb-16"},$={class:"list-item"},E=c("div",{class:"list-item-left"},[c("h4",null,"账户密码"),c("p",null,"用户账户密码修改后是否通知")],-1),G={class:"list-item-right"},H=c("span",null,"开",-1),L=c("span",null,"关",-1),M={class:"list-item"},N=c("div",{class:"list-item-left"},[c("h4",null,"系统消息"),c("p",null,"系统消息是否以站内信形式通知")],-1),O={class:"list-item-right"},P=c("span",null,"开",-1),Q=c("span",null,"关",-1),R={class:"list-item"},T=c("div",{class:"list-item-left"},[c("h4",null,"代办任务"),c("p",null,"代办任务是否进行通知")],-1),X={class:"list-item-right"},Y=c("span",null,"开",-1),Z=c("span",null,"关",-1);a(),v.render=function(l,e,a,b,v,ll){const el=s("b-icon"),al=s("b-card"),sl=s("b-col"),tl=s("b-input"),il=s("b-form-item"),dl=s("b-button"),nl=s("b-upload"),cl=s("b-row"),ol=s("b-form"),ul=s("b-divider"),ml=s("b-switch");return t(),i("div",h,[d(cl,{gutter:16},{default:n((()=>[d(sl,{span:"6"},{default:n((()=>[d(al,{class:"ctrl-pane",bordered:!1,shadow:"never","body-style":{padding:0}},{header:n((()=>[c("div",g,[d(el,{name:"control",size:"18",class:"mr-5"}),_])])),default:n((()=>[c("ul",k,[(t(!0),i(o,null,u(v.tabs,((l,e)=>(t(),i("li",{key:e,class:m(["tab-item",{active:e===v.active}]),onClick:l=>v.active=e},[c("span",I,r(l.title),1),c("span",y,r(l.desc),1)],10,V)))),128))])])),_:1})])),_:1}),d(sl,{span:"18"},{default:n((()=>[d(al,{header:v.tabs[v.active].title,bordered:!1,shadow:"never"},{default:n((()=>["base"===v.active?(t(),p(ol,{key:0,ref:"form",model:v.baseInfo,"label-width":"85px"},{default:n((()=>[d(cl,{gutter:24},{default:n((()=>[d(sl,{span:"12"},{default:n((()=>[d(il,{label:"邮箱"},{default:n((()=>[d(tl,{modelValue:v.baseInfo.email,"onUpdate:modelValue":e[0]||(e[0]=l=>v.baseInfo.email=l),placeholder:"请输入昵称",clearable:""},null,8,["modelValue"])])),_:1}),d(il,{label:"昵称"},{default:n((()=>[d(tl,{modelValue:v.baseInfo.name,"onUpdate:modelValue":e[1]||(e[1]=l=>v.baseInfo.name=l),placeholder:"请输入昵称",clearable:""},null,8,["modelValue"])])),_:1}),d(il,{label:"个人简介"},{default:n((()=>[d(tl,{modelValue:v.baseInfo.intro,"onUpdate:modelValue":e[2]||(e[2]=l=>v.baseInfo.intro=l),placeholder:"请输入个人简介",type:"textarea"},null,8,["modelValue"])])),_:1}),d(il,{label:"联系电话"},{default:n((()=>[d(tl,{modelValue:v.baseInfo.phone,"onUpdate:modelValue":e[3]||(e[3]=l=>v.baseInfo.phone=l),placeholder:"请输入联系电话",clearable:""},null,8,["modelValue"])])),_:1}),d(il,{label:"所在地区"},{default:n((()=>[d(tl,{modelValue:v.baseInfo.address,"onUpdate:modelValue":e[4]||(e[4]=l=>v.baseInfo.address=l),placeholder:"请输入所在地区",clearable:""},null,8,["modelValue"])])),_:1}),d(il,null,{default:n((()=>[d(dl,{type:"primary",onClick:ll.updateBase},{default:n((()=>[w])),_:1},8,["onClick"])])),_:1})])),_:1}),d(sl,{span:"12"},{default:n((()=>[c("div",U,[q,x,d(nl,{action:""},{default:n((()=>[d(dl,{icon:"cloud-upload"},{default:n((()=>[j])),_:1})])),_:1})])])),_:1})])),_:1})])),_:1},8,["model"])):f("",!0),"safe"===v.active?(t(),i("div",C,[B,d(ul),z,d(ul),A,d(ul),D])):f("",!0),"auth"===v.active?(t(),i("div",F,[J,d(ul),K,d(ul),S])):f("",!0),"message"===v.active?(t(),i("div",W,[c("div",$,[E,c("div",G,[d(ml,null,{open:n((()=>[H])),close:n((()=>[L])),_:1})])]),d(ul),c("div",M,[N,c("div",O,[d(ml,null,{open:n((()=>[P])),close:n((()=>[Q])),_:1})])]),d(ul),c("div",R,[T,c("div",X,[d(ml,null,{open:n((()=>[Y])),close:n((()=>[Z])),_:1})])])])):f("",!0)])),_:1},8,["header"])])),_:1})])),_:1})])},v.__scopeId="data-v-4f68a412";export{v as default};