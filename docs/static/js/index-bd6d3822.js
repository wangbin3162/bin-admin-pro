import{a9 as P,C as x,aP as E,G as a,o as u,a as k,c as e,w as n,b as t,m as g,ac as G,ad as R,l as v,aQ as j,aR as F,e as h,j as A,a1 as B}from"./vendor-cd6e7a80.js";import"./chunk-brace-6f23dcf5.js";const C="/bin-admin-pro/static/json/animation-c630bffe.json",T="/bin-admin-pro/static/png/apng_test-b9078a02.png",N="/bin-admin-pro/static/png/css_sprites-3b25b99c.png",U="/bin-admin-pro/static/png/css_sprites1-1387d590.png",M="/bin-admin-pro/static/json/lottie-d53ae1cd.json",H="/bin-admin-pro/static/pag/pag_test-8fcc370b.pag";function V(o){return new URL(Object.assign({"../../../../assets/images/effects/animation.json":C,"../../../../assets/images/effects/apng_test.png":T,"../../../../assets/images/effects/css_sprites.png":N,"../../../../assets/images/effects/css_sprites1.png":U,"../../../../assets/images/effects/lottie.json":M,"../../../../assets/images/effects/pag_test.pag":H})[`../../../../assets/images/effects/${o}`],self.location).href}const I=o=>(G("data-v-4a3c77f3"),o=o(),R(),o),J=I(()=>t("p",null," 1\u3001 \u5173\u952E\u5E27\u52A8\u6548\uFF0C\u9700\u8981\u4F7F\u7528sprites\u96EA\u78A7\u56FE\u6216\u8005\u5E8F\u5217\u5E27\u56FE\u8FDB\u884C\u64AD\u653E\u548C\u8C03\u7528\uFF0C\u5B9E\u9645\u60C5\u51B5\u6700\u597D\u662F\u5236\u4F5C\u6210\u96EA\u78A7\u56FE\u6765\u51CF\u5C11\u56FE\u7247\u591A\u6B21\u8BF7\u6C42\u3002 ",-1)),L=I(()=>t("p",null,"2\u3001 \u96EA\u78A7\u56FE\u5B9E\u73B0\u4F9D\u8D56\u4E8E\u5404\u79CD\u5750\u6807\uFF0C\u8FD9\u79CD\u505A\u6CD5\u4E0D\u591F\u7075\u6D3B",-1)),q=I(()=>t("a",{href:"https://www.toptal.com/developers/css/sprite-generator/",target:"_blank"}," \u96EA\u78A7\u56FE\u5236\u4F5C ",-1)),D=I(()=>t("a",{href:"https://tinypng.com/",target:"_blank"},"png\u538B\u7F29\u5DE5\u5177",-1)),K=`
import { onMounted } from 'vue'
import animation from 'bin-keyframe-animation'
import { getImageUrl } from './util'

let images = [getImageUrl('css_sprites.png')]
let map = [
  '-10 -10',
  '-430 -10',
  '-10 -430',
  '-430 -430',
  '-850 -10',
  '-850 -430',
  '-10 -850',
  '-430 -850',
  '-850 -850',
  '-1270 -10',
  '-1270 -430',
  '-1270 -850',
  '-10 -1270',
  '-430 -1270',
  '-850 -1270',
  '-1270 -1270',
]
let repeatAnimation
let running = false
function click() {
  if (!repeatAnimation) return
  if (running) {
    running = false
    repeatAnimation.pause()
  } else {
    running = true
    repeatAnimation.restart()
  }
}

onMounted(() => {
  const el = document.getElementById('sprites')

  repeatAnimation = animation().loadImage(images).changePosition(el, map, images[0]).repeatForever()
  repeatAnimation.start(80)
  running = true
})
`,O={__name:"keyframe",setup(o){let i=[V("css_sprites.png")],c=["-10 -10","-430 -10","-10 -430","-430 -430","-850 -10","-850 -430","-10 -850","-430 -850","-850 -850","-1270 -10","-1270 -430","-1270 -850","-10 -1270","-430 -1270","-850 -1270","-1270 -1270"],l,s=!1;function p(){!l||(s?(s=!1,l.pause()):(s=!0,l.restart()))}return x(()=>{const r=document.getElementById("sprites");l=E().loadImage(i).changePosition(r,c,i[0]).repeatForever(),l.start(80),s=!0}),(r,_)=>{const d=a("b-divider"),m=a("b-alert"),f=a("b-col"),b=a("b-ace-editor"),$=a("b-collapse-wrap"),S=a("b-row");return u(),k("div",null,[e(m,{"show-icon":""},{desc:n(()=>[J,L,t("p",null,[g(" 2\u3001 "),q,e(d,{type:"vertical"}),D])]),default:n(()=>[g(" \u8BF4\u660E ")]),_:1}),e(S,{gutter:16},{default:n(()=>[e(f,{span:"12"},{default:n(()=>[t("div",{id:"sprites",class:"rabbit",onClick:p})]),_:1}),e(f,{span:"12"},{default:n(()=>[e($,{title:"\u4EE3\u7801\u793A\u4F8B"},{default:n(()=>[e(b,{"model-value":K,lang:"typescript",readonly:"",theme:"sqlserver",height:"400px",snippets:!1})]),_:1})]),_:1})]),_:1})])}}},z=P(O,[["__scopeId","data-v-4a3c77f3"]]),Q="/bin-admin-pro/static/png/apng_test-b9078a02.png";const W={},w=o=>(G("data-v-aa55b5c5"),o=o(),R(),o),X=w(()=>t("p",null," 1\u3001\u5173\u952E\u5E27\u5BFC\u51FA\u540E\uFF0C\u53EF\u4EE5\u5236\u4F5Capng\u7528\u6765\u76F4\u63A5\u663E\u793A\u52A8\u753B\uFF0C\u4F46\u8FD9\u79CD\u65B9\u5F0F\u4E0D\u53D7\u4EE3\u7801\u63A7\u5236\uFF0C\u52A8\u753B\u901F\u7387\u7B49\u53EA\u80FD\u5728AE\u4E2D\u8FDB\u884C\u8C03\u6574\u540E\uFF0C\u5BFC\u51FA\u5E8F\u5217\u5E27\u518D\u7528\u8F6C\u6362\u5DE5\u5177\u8FDB\u884C\u8F6C\u6362 ",-1)),Y=w(()=>t("p",null," 2\u3001\u597D\u5904\u5C31\u662F\u4F7F\u7528\u5341\u5206\u65B9\u4FBF\uFF0C\u65E0\u9700\u7F16\u7801\u76F4\u63A5\u5F53\u6210\u666E\u901A\u56FE\u7247\u8FDB\u884C\u5F15\u7528\u5373\u53EF\uFF0C\u6BD4\u8F83\u63A8\u8350\u7528\u4E8E\u80CC\u666F\u6216\u8005icon\u52A8\u6548\u8FD9\u79CD\u53EF\u4EE5\u4E0D\u53D7\u63A7\u5236\u7684\u5185\u5BB9 ",-1)),Z=w(()=>t("a",{href:"https://www.zhangxinxu.com/sp/apng/",target:"_blank"},"APNG\u5408\u6210\u5DE5\u5177",-1)),tt=w(()=>t("a",{href:"https://tinypng.com/",target:"_blank"},"png\u538B\u7F29\u5DE5\u5177",-1)),et=w(()=>t("div",{class:"rabbit"},[t("img",{src:Q})],-1));function at(o,i){const c=a("b-divider"),l=a("b-alert"),s=a("b-col"),p=a("b-row");return u(),k("div",null,[e(l,{"show-icon":""},{desc:n(()=>[X,Y,t("p",null,[g(" 2\u3001 "),Z,e(c,{type:"vertical"}),tt])]),default:n(()=>[g(" \u8BF4\u660E ")]),_:1}),e(p,{gutter:16},{default:n(()=>[e(s,{span:"24"},{default:n(()=>[et]),_:1}),e(s,{span:"12"})]),_:1})])}const nt=P(W,[["render",at],["__scopeId","data-v-aa55b5c5"]]);const y=o=>(G("data-v-422f2ff2"),o=o(),R(),o),ot=y(()=>t("p",null," 1\u3001Lottie \u662F Airbnb \u5F00\u6E90\u7684\u4E00\u5957\u8DE8\u5E73\u53F0\u7684\u5B8C\u6574\u7684\u52A8\u753B\u6548\u679C\u89E3\u51B3\u65B9\u6848,\u8BBE\u8BA1\u5E08\u53EF\u4EE5\u4F7F\u7528 AE \u8BBE\u8BA1\u52A8\u753B\u4E4B\u540E,\u4F7F\u7528 Lottic \u63D0\u4F9B\u7684 Bodymovin \u63D2\u4EF6\u5C06\u8BBE\u8BA1\u597D\u7684\u52A8\u753B\u5BFC\u51FA\u6210 JSON \u683C\u5F0F ",-1)),st=y(()=>t("p",null,"2\u3001\u597D\u5904\u5C31\u662F\u5927\u5C0F\u5F88\u5C0F\uFF0C\u4E14\u53EF\u4EE5\u81EA\u7531\u8FDB\u884C\u63A7\u5236\u548C\u4F7F\u7528\uFF0C\u77E2\u91CF",-1)),it=y(()=>t("a",{href:"http://airbnb.io/lottie/#/web",target:"_blank"},"lottie docs",-1)),lt=y(()=>t("a",{href:"https://github.com/airbnb/lottie-web",target:"_blank"},"lottie-web",-1)),ct=y(()=>t("a",{href:"https://lottiefiles.com/",target:"_blank"},"lottiefiles",-1)),rt={flex:""},_t="https://lottie.host/25a9ea9f-2a78-446c-a9e0-9b11dcb20aee/mdJJIHHT6p.json",pt=`
// \u9996\u5148\u9700\u8981\u51C6\u5907\u597DAE\u5BFC\u51FA\u7684lottie json\u6587\u4EF6\uFF0C\u6216\u8005\u53EF\u4EE5\u52A0\u8F7DlottieFiles \u4E2D\u7684\u7F51\u7EDC\u5730\u5740
// \u5B89\u88C5lottie-web\u63D2\u4EF6\u8FDB\u884C\u5B9E\u73B0\uFF0C\u4EE3\u7801\u5982\u4E0B
// \u66F4\u591Aapi\u53C2\u8003\u5B98\u7F51\uFF0C\u53EF\u4EE5\u5BF9\u52A8\u753B\u8FDB\u884C\u66F4\u7CBE\u51C6\u7684\u64CD\u4F5C

import { ref, onMounted } from 'vue'
import { getImageUrl } from '../util'
import lottie from 'lottie-web'

const imgRef1 = ref(null)
const imgRef2 = ref(null)

const localPath = getImageUrl('animation.json')
const webPath = 'https://lottie.host/25a9ea9f-2a78-446c-a9e0-9b11dcb20aee/mdJJIHHT6p.json'

async function init() {
  lottie.loadAnimation({
    container: imgRef1.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: localPath,
  })
  lottie.loadAnimation({
    container: imgRef2.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: webPath,
  })
}

onMounted(() => {
  init()
})
`,dt={__name:"lottie",setup(o){const i=v(null),c=v(null),l=V("animation.json");async function s(){j.loadAnimation({container:i.value,renderer:"svg",loop:!0,autoplay:!0,path:l}),j.loadAnimation({container:c.value,renderer:"svg",loop:!0,autoplay:!0,path:_t})}return x(()=>{s()}),(p,r)=>{const _=a("b-divider"),d=a("b-alert"),m=a("b-col"),f=a("b-ace-editor"),b=a("b-collapse-wrap"),$=a("b-row");return u(),k("div",null,[e(d,{"show-icon":""},{desc:n(()=>[ot,st,t("p",null,[g(" 2\u3001 "),it,e(_,{type:"vertical"}),lt,e(_,{type:"vertical"}),ct])]),default:n(()=>[g(" \u8BF4\u660E ")]),_:1}),e($,{gutter:16},{default:n(()=>[e(m,{span:"12"},{default:n(()=>[t("div",rt,[t("div",{class:"rabbit",ref_key:"imgRef1",ref:i},null,512),t("div",{class:"rabbit",ref_key:"imgRef2",ref:c},null,512)])]),_:1}),e(m,{span:"12"},{default:n(()=>[e(b,{title:"\u4EE3\u7801\u793A\u4F8B"},{default:n(()=>[e(f,{"model-value":pt,lang:"typescript",readonly:"",theme:"sqlserver",height:"400px",snippets:!1})]),_:1})]),_:1})]),_:1})])}}},ut=P(dt,[["__scopeId","data-v-422f2ff2"]]),mt=t("p",null,"1\u3001pag\u662F\u817E\u8BAF\u63A8\u51FA\u7684\u4E00\u5957\u5B8C\u6574\u7684\u52A8\u6548\u5DE5\u4F5C\u6D41\u89E3\u51B3\u65B9\u6848\u3002",-1),gt=t("p",null," 2\u3001\u80FD\u591F\u4E00\u952E\u5C06\u8BBE\u8BA1\u5E08\u5728 AE \uFF08Adobe After Effects\uFF09\u4E2D\u5236\u4F5C\u7684\u52A8\u6548\u5185\u5BB9\u5BFC\u51FA\u6210\u7D20\u6750\u6587\u4EF6\uFF0C\u5E76\u5FEB\u901F\u4E0A\u7EBF\u5E94\u7528\u4E8E\u51E0\u4E4E\u6240\u6709\u7684\u4E3B\u6D41\u5E73\u53F0\u3002 ",-1),ft=t("a",{href:"https://pag.art/",target:"_blank"},"\u5B98\u7F51",-1),bt=t("a",{href:"https://pag.art/docs/sdk.html#web-%E7%AB%AF%E6%8E%A5%E5%85%A5",target:"_blank"}," docs ",-1),ht=`
// libpag SDK \u7684\u8FD0\u884C\u9700\u8981\u4F9D\u8D56\u4E8E libpag.js \u548C libpag.wasm \u6587\u4EF6
// \u53EF\u4EE5\u7B80\u5355\u7684\u7406\u89E3\u4E3A libpag.js \u662F\u4EE3\u7406\u5C42\uFF0Clibpag.wasm \u662F\u6838\u5FC3\u5C42\u3002
// libpag.wasm \u7684\u52A0\u8F7D\u9700\u8981\u901A\u8FC7\u5F15\u5165 libpag.js \u540E\u8C03\u7528 PAGInit() \u63A5\u53E3\u8FDB\u884C\u5B9E\u4F8B\u5316
// \u901A\u8FC7Npm\u8C03\u7528\u4E4B\u540E\uFF0C\u9700\u8981\u501F\u52A9\u6253\u5305\u5DE5\u5177\u628A node_modules \u4E0B\u7684 libpag/lib/libpag.wasm \u6587\u4EF6\u6253\u5305\u5230\u6700\u7EC8\u4EA7\u7269\u4E2D
// \u4F7F\u7528 locateFile \u94A9\u5B50\u8FD4\u56DE libpag.wasm \u6587\u4EF6\u7684\u8DEF\u5F84\uFF0C\u8FD9\u6837\u624D\u80FD\u786E\u4FDD\u5728\u7F51\u7EDC\u8BF7\u6C42\u4E2D\u80FD\u52A0\u8F7D\u5230 libpag.wasm \u6587\u4EF6

import copy from 'rollup-plugin-copy'

export default ({ mode }) => {
  const dirRoot = process.cwd()

  const env = loadEnv(mode, dirRoot)
  const isProd = "production" === 'production'

  return defineConfig({
    base: isProd ? env.VITE_PUBLIC_PATH : '/',
    plugins: [
      vue(),
      copy({
        targets: [
          {
            src: './node_modules/libpag/lib/libpag.wasm',
            dest: isProd ? 'dist/' : 'public/',
          },
        ],
        hook: isProd ? 'writeBundle' : 'buildStart',
      }),
    ],
  })
}

// \u5B9E\u9645\u8C03\u7528\u65F6\u7528\u6CD5\u793A\u4F8B
// \u6CE8\u610F\uFF1A\u56E0\u4E3A PAG Web \u7248\u662F\u5355\u7EBF\u7A0B\u7684 SDK\uFF0C\u6240\u4EE5\u6211\u4EEC\u4E0D\u5EFA\u8BAE\u540C\u5C4F\u64AD\u653E\u591A\u4E2A PAGView\u3002\u5177\u4F53\u4F7F\u7528\u65B9\u5F0F\u89C1\u5B98\u65B9\u6587\u6863\u3002
// https://pag.art/docs/web-play-pagfile.html
import { ref, onMounted } from 'vue'
import { PAGInit } from 'libpag'
const props = defineProps({
  url: {
    type: String,
    default: '',
  },
})
const imgRef = ref(null)

async function init() {
  // \u5B9E\u4F8B\u5316 PAG
  const PAG = await PAGInit()
  // \u83B7\u53D6 PAG \u7D20\u6750\u6570\u636E
  const buffer = await fetch(props.url).then(response => response.arrayBuffer())
  // \u52A0\u8F7D PAG \u7D20\u6750\u4E3A PAGFile \u5BF9\u8C61
  const pagFile = await PAG.PAGFile.load(buffer)
  // \u5C06\u753B\u5E03\u5C3A\u5BF8\u8BBE\u7F6E\u4E3A PAGFile\u7684\u5C3A\u5BF8
  const canvas = imgRef.value
  canvas.width = pagFile.width()
  canvas.height = pagFile.height()
  // \u5B9E\u4F8B\u5316 PAGView \u5BF9\u8C61
  const pagView = await PAG.PAGView.init(pagFile, canvas, { useScale: false })
  pagView.setRepeatCount(0)
  // \u64AD\u653E PAGView
  await pagView.play()
}

onMounted(() => {
  init()
})
`,vt={__name:"pag",props:{url:{type:String,default:""}},setup(o){const i=o,c=v(null);async function l(){const s=await F(),p=await fetch(i.url).then(m=>m.arrayBuffer()),r=await s.PAGFile.load(p),_=c.value;_.width=r.width(),_.height=r.height();const d=await s.PAGView.init(r,_,{useScale:!1});d.setRepeatCount(0),await d.play()}return x(()=>{l()}),(s,p)=>{const r=a("b-divider"),_=a("b-alert"),d=a("b-col"),m=a("b-ace-editor"),f=a("b-collapse-wrap"),b=a("b-row");return u(),k("div",null,[e(_,{"show-icon":""},{desc:n(()=>[mt,gt,t("p",null,[g(" 2\u3001 "),ft,e(r,{type:"vertical"}),bt])]),default:n(()=>[g(" \u8BF4\u660E ")]),_:1}),e(b,{gutter:16},{default:n(()=>[e(d,{span:"12"},{default:n(()=>[t("canvas",{class:"rabbit",ref_key:"imgRef",ref:c},null,512)]),_:1}),e(d,{span:"12"},{default:n(()=>[e(f,{title:"\u4EE3\u7801\u793A\u4F8B"},{default:n(()=>[e(m,{"model-value":ht,lang:"typescript",readonly:"",theme:"sqlserver",height:"400px",snippets:!1})]),_:1})]),_:1})]),_:1})])}}};const wt={class:"panel"},yt={class:"content-box"},At={__name:"index",setup(o){const i=v("tab1"),c=v([{key:"tab1",title:"\u5173\u952E\u5E27"},{key:"tab2",title:"APNG"},{key:"tab3",title:"Lottie"},{key:"tab4",title:"Pag"}]);return(l,s)=>{const p=a("b-tabs"),r=a("page-container");return u(),h(r,{desc:"\u591A\u79CD\u52A8\u6548\u4F7F\u7528\u65B9\u6848\uFF0C\u5B9E\u9645\u4F7F\u7528\u7684\u65F6\u5019\u6839\u636E\u5B9E\u9645\u9700\u6C42\u8FDB\u884C\u4E0D\u540C\u65B9\u6848\u7684\u9009\u62E9\u3002\u4EE5\u8FBE\u5230\u6700\u597D\u7684\u52A8\u6548\u65B9\u6848\u3002"},{default:n(()=>[t("div",wt,[e(p,{modelValue:i.value,"onUpdate:modelValue":s[0]||(s[0]=_=>i.value=_),data:c.value,type:"card"},null,8,["modelValue","data"]),t("div",yt,[i.value==="tab1"?(u(),h(z,{key:0})):A("",!0),i.value==="tab2"?(u(),h(nt,{key:1})):A("",!0),i.value==="tab3"?(u(),h(ut,{key:2})):A("",!0),i.value==="tab4"?(u(),h(vt,{key:3,url:B(V)("pag_test.pag")},null,8,["url"])):A("",!0)])])]),_:1})}}},It=P(At,[["__scopeId","data-v-940b8a9d"]]);export{It as default};
