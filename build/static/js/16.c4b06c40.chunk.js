(this["webpackJsonpcargoes-lift"]=this["webpackJsonpcargoes-lift"]||[]).push([[16],{157:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(0),o=a.n(n),l=a(7),c=(a(159),a(60));function r(e){const t=s();var a=e.iconProps;return o.a.createElement(l.o,{src:"assets/icon/"+a.name+".svg",style:a.styleProps,className:a.class?t[a.class]+" "+a.class:"",slot:a.slot,onClick:()=>(null===a||void 0===a?void 0:a.iconClick)?null===a||void 0===a?void 0:a.iconClick(e.iconName,e.fieldPlaceholder):console.log()})}const s=Object(c.a)({zoom12:{zoom:1.4},slotEnd:{right:0,bottom:"1px"},disabledminus:{fontSize:"1.6rem",right:"-5px",zoom:1.5},calenderMargin:{zoom:1.4},zoom3:{zoom:3},zoom2:{zoom:2},slotStart:{position:"absolute",zoom:1.5},absolutePosition:{position:"absolute"},lastIcon:{zoom:"1.5",right:"3px",position:"relative"}})},158:function(e,t,a){"use strict";var n=a(7),o=a(12),l=a(0),c=a.n(l),r=a(17),s=a(160),i=(a(162),a(157)),d=a(11),u=a(8),m=a(49),p=a(56);t.a=e=>{const[t,a]=Object(l.useState)({search:!0,check:!0,close:!0,home:!0,info:!1});var g=d.a.getState().CheckUserStatus.user;const[b,v]=Object(l.useState)(!1),[h,f]=Object(l.useState)("Select All"),E={name:"back-arrow",slot:"icon-only",zoom:""};Object(l.useEffect)(()=>{N(e.action?e.action:"none")},[]);let k=Object(r.e)();const y=t=>{e.customClick?e.customClick("/containerCart"):e.customBack?e.backClick(t):k.goBack()},N=e=>{e&&("search"===e?a({search:!1,check:!0,close:!0,home:!0,info:!0}):"check"===e?a({search:!0,check:!1,close:!0,home:!0,info:!0}):"close"===e?a({search:!0,check:!0,close:!1,home:!0,info:!0}):"home"===e?a({search:!0,check:!0,close:!0,home:!1,info:!0}):"info"===e&&a({search:!0,check:!0,close:!0,home:!0,info:!1}))};return c.a.createElement(n.n,{style:e.agentHeader?{height:"102px"}:{height:"10%"}},c.a.createElement(n.P,{className:"header"},c.a.createElement("div",{className:"mainContainer",style:e.agentHeader?{}:{paddingBottom:0}},e.checkedProps?c.a.createElement("div",{className:"selectAllBg",hidden:!e.checkedProps.showChecked},c.a.createElement("div",null,c.a.createElement(n.d,{fill:"clear",onClick:e=>{y(e)}},c.a.createElement(i.a,{iconProps:E}))),c.a.createElement("div",{className:"checkBoxContainer"},c.a.createElement(n.h,{className:"checkBox",checked:b,onIonChange:t=>function(t){console.log(t),v(t),t?(f("Unselect All"),e.checkedProps.addContainerToCart("","","checked")):(e.checkedProps.addContainerToCart("","","unchecked"),f("Select All"))}(t.detail.checked)})),c.a.createElement("div",{className:"checkBoxLabelCol"},c.a.createElement(n.u,{className:"checkBoxLabel"},h)," ")):c.a.createElement(c.a.Fragment,null),c.a.createElement("div",{className:"backArrow"},"Home"!=e.label&&t.close?c.a.createElement(n.d,{fill:"clear",onClick:e=>{y(e)}},c.a.createElement(i.a,{iconProps:E})):c.a.createElement(c.a.Fragment,null)),c.a.createElement("div",{className:"header-label"}," ",c.a.createElement(n.M,null,e.label)),c.a.createElement("div",{className:"header-right"},c.a.createElement(n.d,{hidden:t.search,fill:"clear",onClick:e.searchClick},c.a.createElement(n.o,{slot:"icon-only",icon:o.x,style:{minWidth:"30px"}})),c.a.createElement(n.d,{hidden:t.info,fill:"clear",onClick:e.infoClick},c.a.createElement(n.o,{src:"assets/icon/info-italic.svg",slot:"icon-only",style:{minWidth:"30px"}})),c.a.createElement(n.d,{hidden:t.check,fill:"clear",onClick:e.checkClick},c.a.createElement(i.a,{iconProps:{name:"Check",slot:"icon-only",zoom:""}})),c.a.createElement(n.d,{hidden:t.home,fill:"clear",onClick:t=>{e.customClick?e.customClick("/tabs/landing"):(k.push("/tabs/landing"),Object(s.a)())}},c.a.createElement(i.a,{iconProps:{name:"home-new",slot:"icon-only",zoom:""}})),c.a.createElement(n.d,{hidden:t.close,fill:"clear",onClick:e=>{y(e)}},c.a.createElement(n.o,{slot:"icon-only",icon:o.p})),c.a.createElement(n.d,{hidden:""!==e.action,fill:"clear"},c.a.createElement(n.o,null)))),g.agents&&e.agentHeader&&c.a.createElement(n.P,{className:"agent-code-header"},c.a.createElement(n.F,{value:g.selectedAgent,interface:"popover",onIonChange:t=>(async t=>{let a=t.detail.value,n=u.loginAgent+"?agentCode="+a.agentCode+"&agentType="+a.agentType;var o={userName:g.userName,userType:"IMPORTER_APP"},l=await Object(p.A)(n,o),c=l.data.data.dataItems[0];if(await l.success){var r=await m.a(c.accessToken);r&&d.a.dispatch(r);var s=await m.b(c.user.activeCompanyCode);s&&d.a.dispatch(s);var i=await m.c(a);i&&d.a.dispatch(i);d.a.getState().CheckUserStatus;e.changedAgent?e.changedAgent():console.log("changed")}})(t),disabled:!e.showAgent||1==g.agents.length,style:e.showAgent?{}:{backgroundColor:"#DDF1FF"},interfaceOptions:{cssClass:"agent-interface"}},g.agents.map((e,t)=>c.a.createElement(n.G,{value:e,key:t,className:"select-agent-opt"},e.agentCode+"-"+e.agentName))),c.a.createElement(n.o,{src:"assets/icon/arrow-down.svg",className:"arrow-down-icon",hidden:!e.showAgent||1==g.agents.length}))))}},159:function(e,t,a){},160:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a(11),o=a(2);function l(){n.a.dispatch({type:o.m}),n.a.dispatch({type:o.v}),n.a.dispatch({type:o.x}),n.a.dispatch({type:o.s}),n.a.dispatch({type:o.w})}},162:function(e,t,a){},164:function(e,t,a){"use strict";var n=a(7),o=a(0),l=a.n(o),c=(a(165),a(161)),r=a(157);t.a=e=>{let{label:t,name:a,type:s,value:i,onChange:d,required:u,errors:m,pattern:p,datatype:g,description:b,placeholder:v,icon:h,onBlur:f,readonly:E,contactForm:k,max:y,setError:N,clearInput:O,keyDown:C,isClickable:j}=e;const[T,A]=Object(o.useState)(!1);return l.a.createElement("div",{className:"form-element-group",style:k?{width:"350px",padding:"0"}:{}},l.a.createElement("fieldset",null,l.a.createElement("legend",null,t),"tel"===s?l.a.createElement(n.u,{className:"regularFont-textInput"},"971"):l.a.createElement(l.a.Fragment,null),l.a.createElement(n.s,{name:a,type:s,value:"tel"===s&&(null===i||void 0===i?void 0:i.substring(0,3).includes("971"))?i.split("971")[1]:i,spellCheck:!1,autocapitalize:"off",onKeyDown:e=>(C&&C(e),e.key.length>1||(A(!Object(c.e)(g,e.key)),Object(c.e)(g,e.key)?void 0:(e.preventDefault(),!1))),onIonChange:e=>{let t,a=e.target.value;if("tel"===s&&N){a="971"+a.replace(/\s/g,"971");var n=Object(c.g)(a,1*y+3);console.log(n),null!=a&&N(n?"":"Please Enter "+y+" digit number"),console.log("tteeeelll",a)}e.target.pattern&&(a=Object(c.c)(a,e.target.pattern,"-")),"email"===e.target.type&&(t=Object(c.f)(a),N(t?"":"Please Enter valid Mail id"),console.log(t),A(!t)),E||d(e,a,t)},clearInput:O,required:u,autocomplete:"off",pattern:p,placeholder:v,className:"textInput",onIonBlur:e=>{f&&f(e)},maxlength:y,minlength:y,readonly:E||!1},!j&&h&&l.a.createElement(r.a,{iconProps:h,iconName:a,fieldPlaceholder:v})),j&&h&&l.a.createElement(n.d,{className:"icon-button",expand:"full",fill:"clear",onClick:()=>h.iconClick(a,v)},l.a.createElement(r.a,{iconProps:h,iconName:a,fieldPlaceholder:v}))),l.a.createElement("div",{className:""},m&&l.a.createElement(n.M,{color:"danger",className:"validation-message"},l.a.createElement(n.u,{className:"ion-padding-start validation-message"},m))),T&&b&&l.a.createElement(n.M,{color:"danger",className:"validation-message"},l.a.createElement(n.u,{className:"ion-padding-start validation-message"},b)))}},173:function(e,t,a){},177:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a(25),o=function(){var e=function(t,a){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])})(t,a)};return function(t,a){function n(){this.constructor=t}e(t,a),t.prototype=null===a?Object.create(a):(n.prototype=a.prototype,new n)}}(),l=new(function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.share=function(e,t,a,o){return Object(n.b)(this,"share",{successIndex:4,errorIndex:5},arguments)},t.prototype.shareWithOptions=function(e){return Object(n.b)(this,"shareWithOptions",{platforms:["iOS","Android"]},arguments)},t.prototype.canShareVia=function(e,t,a,o,l){return Object(n.b)(this,"canShareVia",{successIndex:5,errorIndex:6,platforms:["iOS","Android"]},arguments)},t.prototype.shareViaTwitter=function(e,t,a){return Object(n.b)(this,"shareViaTwitter",{successIndex:3,errorIndex:4,platforms:["iOS","Android"]},arguments)},t.prototype.shareViaFacebook=function(e,t,a){return Object(n.b)(this,"shareViaFacebook",{successIndex:3,errorIndex:4,platforms:["iOS","Android"]},arguments)},t.prototype.shareViaFacebookWithPasteMessageHint=function(e,t,a,o){return Object(n.b)(this,"shareViaFacebookWithPasteMessageHint",{successIndex:4,errorIndex:5,platforms:["iOS","Android"]},arguments)},t.prototype.shareViaInstagram=function(e,t){return Object(n.b)(this,"shareViaInstagram",{platforms:["iOS","Android"]},arguments)},t.prototype.shareViaWhatsApp=function(e,t,a){return Object(n.b)(this,"shareViaWhatsApp",{successIndex:3,errorIndex:4,platforms:["iOS","Android"]},arguments)},t.prototype.shareViaWhatsAppToReceiver=function(e,t,a,o){return Object(n.b)(this,"shareViaWhatsAppToReceiver",{successIndex:4,errorIndex:5,platforms:["iOS","Android"]},arguments)},t.prototype.shareViaSMS=function(e,t){return Object(n.b)(this,"shareViaSMS",{platforms:["iOS","Android"]},arguments)},t.prototype.canShareViaEmail=function(){return Object(n.b)(this,"canShareViaEmail",{platforms:["iOS","Android"]},arguments)},t.prototype.shareViaEmail=function(e,t,a,o,l,c){return Object(n.b)(this,"shareViaEmail",{platforms:["iOS","Android"],successIndex:6,errorIndex:7},arguments)},t.prototype.shareVia=function(e,t,a,o,l){return Object(n.b)(this,"shareVia",{successIndex:5,errorIndex:6,platforms:["iOS","Android"]},arguments)},t.prototype.setIPadPopupCoordinates=function(e){return Object(n.b)(this,"setIPadPopupCoordinates",{sync:!0,platforms:["iOS"]},arguments)},t.prototype.saveToPhotoAlbum=function(e){return Object(n.b)(this,"saveToPhotoAlbum",{platforms:["iOS"]},arguments)},t.prototype.shareViaWhatsAppToPhone=function(e,t,a,o){return Object(n.b)(this,"shareViaWhatsAppToPhone",{successIndex:5,errorIndex:6,platforms:["iOS","Android"]},arguments)},t.pluginName="SocialSharing",t.plugin="cordova-plugin-x-socialsharing",t.pluginRef="plugins.socialsharing",t.repo="https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin",t.platforms=["Android","Browser","iOS","Windows","Windows Phone"],t}(n.a))},179:function(e,t,a){"use strict";var n=a(7),o=a(0),l=a.n(o);a(173);t.a=e=>{let{text:t}=e;return l.a.createElement("div",{className:"relativePosition componentMargins1"},l.a.createElement("div",{className:"smallUnderline payLabel"},l.a.createElement(n.u,{className:""},t)))}},188:function(e,t,a){"use strict";var n=a(0),o=a.n(n);t.a=e=>{let{content:t,label:a,className:n}=e;return o.a.createElement("div",{className:n?n+" form-element-group":"form-element-group"},o.a.createElement("fieldset",null,o.a.createElement("legend",null,a),t))}},203:function(e,t,a){"use strict";var n=a(7),o=a(0),l=a.n(o),c=(a(193),a(17));t.a=e=>{let{label:t,name:a,value:r,onChange:s,errors:i,description:d,placeholder:u,listValues:m,disabled:p,selectedName:g,type:b}=e;const[v,h]=Object(o.useState)({});let f=Object(c.e)();Object(o.useEffect)(()=>{h({label:g,value:r})},[]);return l.a.createElement("div",{className:"form-element-group"},l.a.createElement("fieldset",null,l.a.createElement("legend",null,t),l.a.createElement(n.F,{name:a,placeholder:u,value:r||v,onIonChange:e=>{let t=e.target.value;h(t),"addAddress"===t?f.push("/addAddress"):s(e,t)},"cancel-text":!0,interface:"popover",className:"dropdownInput",interfaceOptions:{cssClass:"my-custom-interface"}},"address"===b&&l.a.createElement(n.G,{value:"addAddress",class:"selectAddAddr"},"Add new Address",l.a.createElement("img",{src:"/assets/icon/eye.svg"})),null===m||void 0===m?void 0:m.map((e,t)=>"address"===b?l.a.createElement(n.G,{key:t,value:e},e.dropAddress,e.consigneeName," ",e.dropAddress,e.email):l.a.createElement(n.G,{key:t,value:e.value},e.label)))),l.a.createElement("div",{className:""},i&&l.a.createElement(n.M,{color:"danger",className:"validation-message"},l.a.createElement(n.u,{className:"ion-padding-start"},i))),l.a.createElement(n.M,{color:"danger",className:"validation-message"},l.a.createElement(n.u,{className:"ion-padding-start"},d)))}},244:function(e,t,a){},245:function(e,t,a){},282:function(e,t,a){"use strict";a.r(t);var n=a(7),o=a(12),l=a(0),c=a.n(l),r=a(17),s=a(23),i=a.n(s),d=a(58),u=a(56),m=a(32),p=a(161),g=a(175),b=a(203),v=a(164),h=a(188);a(244);var f=e=>{let{value:t,name:a,errors:o,icon:r,onOptionClick:s,onBlur:i,onSuggestionChange:d,label:u,suggestions:m,pattern:p,clearInput:g}=e;const b={name:"close-outline",slot:"end",class:"slotEnd",iconClick:()=>{g(a)}},[h,f]=Object(l.useState)([]),[E,k]=Object(l.useState)(0),[y,N]=Object(l.useState)(!1),[O,C]=Object(l.useState)(null),[j,T]=Object(l.useState)(!1),[A,S]=Object(l.useState)(null),[I,x]=Object(l.useState)(o);Object(l.useEffect)(()=>{x(o)},[o]),Object(l.useEffect)(()=>{S(t?b:r)},[r]),Object(l.useEffect)(()=>{if(console.log("autocomplete useEffect suggestions",m),m&&m.length>0){let e=[];1==m.length&&m[0]==O?(console.log("copy paste"),e=[m[0]],T(!0),S(r),f([]),N(!1),s(a,m[0])):m&&(e=m.filter(e=>e.toLowerCase().indexOf(O.toLowerCase())>-1),f(e),k(0),N(!0),S(b))}else f([])},[m]),Object(l.useEffect)(()=>{console.log("autocomplete useEffect value changed",t),C(t)},[t]),Object(l.useEffect)(()=>{console.log("autocomplete useEfect input changed",O),T(!1),O&&0!=O.length||(f([]),N(!1),S(r))},[O]),Object(l.useEffect)(()=>{},[j]);return c.a.createElement("div",{className:"parent-postion"},c.a.createElement(v.a,{name:a,value:t,label:u,errors:I,type:"text",required:!0,onChange:async(e,t)=>{S(b),d(e,t)},datatype:"TEXT",placeholder:u,icon:A,onBlur:e=>{console.log("Autocomplete OnBlur")},pattern:p||"",description:" Format xxx-yyyyyyyy-zz",clearInput:!1,isClickable:!0,keyDown:e=>{"9"==e.keyCode&&(console.log("is sugg clicked",j),j||g(a))}}),y&&c.a.createElement(n.v,{className:"suggestion-list"},h&&h.map((e,t)=>c.a.createElement(n.t,{className:"suggestion",onClick:()=>(e=>{T(!0),N(!1),s(a,e),S(r)})(e),key:e+t},e)),(!h||0===h.length)&&c.a.createElement(n.t,{className:"suggestion"},"No Suggestions Found")))},E=[];let k=new Map;var y=[],N=[];var O=Object(l.forwardRef)((e,t)=>{var a,o,s,O,C,j;let{buttonAction:T}=e,A=Object(r.e)();Object(l.useRef)();const S={name:"plusQuick",slot:"end",class:"slotEnd",iconClick:function(e,t){console.log("addTextInput",e);"declNumber"===e?(Q(e=>[...e,{name:"declNumber"+(new Date).getMilliseconds(),value:"",isParent:!1,suggestions:[],icon:w}]),console.log(G)):"containerNumber"==e&&J(e=>[...e,{name:"containerNumber"+(new Date).getMilliseconds(),value:"",isParent:!1,suggestions:[],icon:w}])}},I={name:"plus-disabled",slot:"end",class:"disabledminus",iconClick:ne},x={name:"plus-disabled",slot:"end",class:"disabledminus",iconClick:()=>{}},w={name:"close-circle-outline",slot:"end",class:"slotEnd",iconClick:e=>{console.log("delete click"),console.log(e),k.delete(e),e.includes("declNumber")?Q(t=>t.filter(t=>t.name!==e)):J(t=>t.filter(t=>t.name!==e))}},[P,D]=Object(l.useState)({declNumber:y,containerNumber:N}),[B,V]=Object(l.useState)({declNumber:"",containerNumber:"",truckCount:"",dateAndTime:d.b,minDate:d.h,truckType:"",droplocation:{consigneeContactName:"",consigneeContactNumber:"",phoneNumber:""},contactPerson:"",contactNumber:"",submitted:!1,valid:!1,dropInterval:""});var q={declNumber:S,containerNumber:S};const[M,F]=Object(l.useState)({}),[H,z]=Object(l.useState)(q),[L,Y]=Object(l.useState)(T),[W,_]=Object(l.useState)({address:[],listTruck:[],disbaleHr:1,dateAndTime:""});let R={name:"declNumber",value:"",isParent:!0,suggestions:[],icon:S},X={name:"containerNumber",value:"",isParent:!0,suggestions:[],icon:S};const[G,Q]=Object(l.useState)([R]),[U,J]=Object(l.useState)([X]),[K,Z]=Object(l.useState)(!1),[$,ee]=Object(l.useState)(!1),[te,ae]=Object(l.useState)([]);function ne(e){D({...P,[e]:"containerNumber"===e?y.splice(0,y.length):N.splice(0,N.length)})}Object(l.useEffect)(()=>{le(),oe()},[]),Object(l.useEffect)(()=>{console.log(B)},[B]),Object(l.useEffect)(()=>{},[T]);const oe=async()=>{let e=await Object(u.n)();var t,a;(null===e||void 0===e?void 0:e.success)?(_(t=>({...t,listTruck:null===e||void 0===e?void 0:e.data})),setTimeout(()=>{console.log(W)},2e3)):F({...M,general:(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.message)||(null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.error)})},le=async()=>{let e=await Object(u.j)();var t=p.a(new Date,1*(null===e||void 0===e?void 0:e.disableHrs)*60||1).toISOString();_(a=>({...a,address:null===e||void 0===e?void 0:e.addressDtoList,disbaleHr:null===e||void 0===e?void 0:e.disableHrs,dateAndTime:t}));var a=i()(new Date(t)).format("DD/MM/YYYY H:mm");V({...B,minDate:Object(d.i)(t),dateAndTime:a})};var ce=Object(d.c)();const re=(e,t)=>{console.log(e.target.name),console.log(e.target.value),console.log(B),console.log(B),V({...B,[e.target.name]:e.target.value}),F({...M,[e.target.name]:""}),"declNumber"===e.target.name?(B.containerNumber="",ne("declNumber"),z({containerNumber:I,declNumber:S})):"containerNumber"===e.target.name&&(ne("containerNumber"),B.declNumber="",z({declNumber:I,containerNumber:S})),V({...B,[e.target.name]:t}),""===e.target.value&&z(q),console.log(B)},se=(e,t)=>{console.log("BookQuick onHandleChange",t);const a=e.target.name;console.log("BookQuick onHandleChange",a),t?t&&(ie(a,"value",t),a.includes("declNumber")?ge(t):a.includes("containerNumber")&&be(t),de(a,t)):(F({...M,[a]:""}),ie(a,"value",""),ie(a,"suggestions",[]))},ie=(e,t,a)=>{if(e.includes("declNumber")){let n=G.findIndex(t=>t.name===e),o=[...G],l=o[n];"value"==t&&ue(l),l[t]=a,Q(o)}else if(e.includes("containerNumber")){let n=U.findIndex(t=>t.name===e),o=[...U],l=o[n];"value"==t&&ue(l),l[t]=a,J(o)}},de=async(e,t)=>{if(e.includes("declNumber")){let a=await Object(u.h)(t);ie(e,"suggestions",a.data)}else if(e.includes("containerNumber")){let a=await Object(u.g)(t);ie(e,"suggestions",a.data)}},ue=e=>{e.isParent?e.icon=S:e.icon=w},me=e=>{F({...M,[e]:""}),k.delete(e),e.includes("declNumber")?(G.forEach(t=>{t.name==e&&(t.value="",ue(t))}),Q([...G])):e.includes("containerNumber")&&(U.forEach(t=>{t.name==e&&(t.value="",ue(t))}),J([...U]))},pe=(e,t)=>{if(console.log("onDeclarationClick name",e),console.log("onDeclarationClick value",t),((e,t)=>{let a=!1;return e.includes("declNumber")?a=G.some(a=>a.name!=e&&a.value===t):e.includes("containerNumber")&&(a=U.some(a=>a.name!=e&&a.value===t)),a})(e,t)?F({...M,[e]:"declNumber"===e?"DeclarationNumber Already Entered":"Container Number Already Entered"}):(F({...M,[e]:""}),he(e,t,e)),e.includes("declNumber")){let a=G.findIndex(t=>t.name===e),n=[...G];n[a].value=t,n[a].suggestions=[],Q(n)}else if(e.includes("containerNumber")){let a=U.findIndex(t=>t.name===e),n=[...U];n[a].value=t,n[a].suggestions=[],J(n)}},ge=e=>{console.log("clearContainers"),F({...M,containerNumber:""}),U.forEach(e=>{k.delete(e.name)});let t={...X};t.icon=x,J([t])},be=e=>{console.log("clearDeclarations"),F({...M,declNumber:""}),G.forEach(e=>{k.delete(e.name)});let t={...R};t.icon=x,Q([t])},ve=async e=>{if(console.log("onBlur"),console.log(e.target.name,e.target.value),e.target.value&&""!=e.target.value){var t;let h;if(F({...M,[e.target.name]:""}),h=e.target.name.includes("declNumber")?await Object(u.t)(e.target.value):await Object(u.s)(e.target.value),null===(t=h)||void 0===t?void 0:t.success){var a,n,o,l,c,r,s,i,d,m=(null===(a=h.data)||void 0===a||null===(n=a.data)||void 0===n||null===(o=n.dataItems[0])||void 0===o?void 0:o.containerList)||[null===(l=h.data)||void 0===l||null===(c=l.data)||void 0===c||null===(r=c.dataItems[0])||void 0===r?void 0:r.container];Array.prototype.push.apply(E,m),console.log(m),console.log(m,E),F({...M,[e.target.name]:(null===(s=h.data)||void 0===s||null===(i=s.data)||void 0===i||null===(d=i.dataItems[0])||void 0===d?void 0:d.noOfContainers)?h.data.data.dataItems[0].noOfContainers+" container selected":"1 Container Selected"})}else{var p,g,b,v;console.log(e.target.placeholder),F({...M,[e.target.name]:(null===(p=h)||void 0===p||null===(g=p.data)||void 0===g||null===(b=g.data)||void 0===b||null===(v=b.dataItems[0])||void 0===v?void 0:v.error)||"Invalid "+e.target.placeholder})}}console.log(B)},he=async(e,t,a)=>{if(t&&""!=t){var n;let y;if(F({...M,[e]:""}),y=e.includes("declNumber")?await Object(u.t)(t):await Object(u.s)(t),null===(n=y)||void 0===n?void 0:n.success){var o,l,c,r,s,i,d,m,p,g=(null===(o=y.data)||void 0===o||null===(l=o.data)||void 0===l||null===(c=l.dataItems[0])||void 0===c?void 0:c.containerList)||[null===(r=y.data)||void 0===r||null===(s=r.data)||void 0===s||null===(i=s.dataItems[0])||void 0===i?void 0:i.container];Array.prototype.push.apply(E,g),k.set(e,g),console.log(g),console.log(g,E),F({...M,[e]:(null===(d=y.data)||void 0===d||null===(m=d.data)||void 0===m||null===(p=m.dataItems[0])||void 0===p?void 0:p.noOfContainers)?y.data.data.dataItems[0].noOfContainers+" container selected":"1 Container Selected"})}else{var b,v,h,f;console.log(a),F({...M,[e]:(null===(b=y)||void 0===b||null===(v=b.data)||void 0===v||null===(h=v.data)||void 0===h||null===(f=h.dataItems[0])||void 0===f?void 0:f.error)||"Invalid "+a})}}};function fe(){let e=[];console.log(k);let t=[];Array.from(k.values()).forEach(e=>{t=[...e,...t]}),t.forEach(t=>{var a={...t,...B.droplocation,date_time:B.dateAndTime};a.containerType=B.truckType,a.requestDetailsNumber=null,e.push(a)});let a=function(e,t,a,n){let o,l=[],c=Number(a),r=p.b(e),s=0;for(let m=0;m<c;m++){var d,u;o={dateAndTime:i()(B.dateAndTime).format("DD/MM/YYYY H:mm"),index:m,interval:e,vehicleCode:null!==(d=null===n||void 0===n?void 0:n.value)&&void 0!==d?d:"code",vehicleName:null!==(u=null===n||void 0===n?void 0:n.label)&&void 0!==u?u:"name"},l.push(o),s+=r}return l}(B.dropInterval,B.dateAndTime,B.truckCount,B.truckType);return console.log({requestTruckType:null!==a&&void 0!==a?a:[],containerList:e,multiLocAndTime:!1,date_time:B.dateAndTime,truckNumber:B.truckCount}),{requestTruckType:null!==a&&void 0!==a?a:[],containerList:e,multiLocAndTime:!1,date_time:B.dateAndTime,truckNumber:B.truckCount}}var Ee={};return Object(l.useImperativeHandle)(t,()=>({async gotoPaymentDiscPage(){console.log("clicked");var e=await(async()=>{F({general:""===B.declNumber&&""===B.containerNumber?"one from declaration/container number is mandatory":"",truckType:""===B.truckType?"Truck Type Selection is Mandatory":"",droplocation:""===B.droplocation.consigneeContactName?"Address Selection is Mandatory":"",truckCount:""===B.truckCount?"Truck Selection is Mandatory":""});for(var e in M)if(console.log(M,"key",e),"declNumber"===M[e]||void 0===M[e])return!1;return!0})();if(Ee.multiLocAndTime=!1,Ee.date_time=B.dateAndTime,Ee.truckNumber=B.truckCount,console.log("emptyField",e),e){let e=await fe();console.log(e,B);var t=await Object(u.f)(e);if(null===t||void 0===t?void 0:t.success){var a,n,o=null===(a=t.data)||void 0===a||null===(n=a.data)||void 0===n?void 0:n.dataItems[0];o.bookTruckDetails=Ee;var l=Object(d.d)(o);l.totalContainerTariff=o.totalContainerTariff,l.totalTokenTariff=o.totalTokenTariff,console.log(l),A.push("/quickBook/payment",l)}else{var c,r;F({...M,general:(null===o||void 0===o||null===(c=o.data)||void 0===c?void 0:c.message)||(null===o||void 0===o||null===(r=o.data)||void 0===r?void 0:r.error)})}}}})),c.a.createElement(n.x,{className:"BookTruck-Location"},c.a.createElement(n.j,null,c.a.createElement("div",{className:"book-quick"},c.a.createElement("div",{className:"validationMessage "},c.a.createElement(n.u,{className:"",hidden:""===M.general},M.general)),G&&G.map((e,t)=>c.a.createElement(c.a.Fragment,null,c.a.createElement(f,{name:e.name,errors:M[e.name],icon:e.icon,onOptionClick:pe,onSuggestionChange:se,onBlur:ve,label:"Declaration Number",value:e.value,pattern:"###-########-####",suggestions:e.suggestions,clearInput:me}))),U&&U.map((e,t)=>c.a.createElement(c.a.Fragment,null,c.a.createElement(f,{value:e.value,name:e.name,errors:M[e.name],icon:e.icon,onOptionClick:pe,onSuggestionChange:se,onBlur:ve,label:"Container Number",suggestions:e.suggestions,clearInput:me}))),c.a.createElement("div",{className:"twoItem"},c.a.createElement("div",{className:"eachElement"}," ",c.a.createElement(b.a,{name:"truckCount",value:B.truckCount,label:"Truck Count",errors:M.truckCount,type:"text",required:!0,onChange:re,datatype:"TEXT",placeholder:"Enter Count",listValues:ce})),c.a.createElement("div",{className:"eachElement"},c.a.createElement(b.a,{name:"dropInterval",value:B.dropInterval,label:"Drop Interval",errors:M.dropInterval,required:!0,onChange:re,datatype:"TEXT",type:"text",placeholder:"Select Interval",listValues:m.b}))),c.a.createElement(h.a,{label:B.minDate,content:c.a.createElement(g.a,{name:"dateAndTime",value:Object(d.f)(B.dateAndTime),label:"Date",errors:M.dateAndTime,type:"text",required:!0,onChange:(e,t)=>{F({...M,dateAndTime:""});Object(d.i)(t);var a=i()(new Date(t)).format("DD/MM/YYYY H:mm"),n=Object(d.f)(B.dateAndTime);console.log(new Date(t),B.dateAndTime,new Date(n)),new Date(n)<=new Date(t)?V({...B,[e.target.name]:a}):F({...M,dateAndTime:"Please enter a valid date"})},placeholder:"text",minDate:B.minDate,icon:{name:"calendar",slot:"start",class:"calenderMargin"},displayFormat:"DD-MMM-YYYY HH:mm",className:"dropdownInput"})}),M.dateAndTime&&c.a.createElement("div",{className:"topMargin"},c.a.createElement(n.M,{color:"danger",className:"validation-message"},c.a.createElement(n.u,{className:"ion-padding-start"},M.dateAndTime))),c.a.createElement(b.a,{name:"truckType",value:B.truckType,label:"Container Type",errors:M.truckType,required:!0,onChange:re,datatype:"TEXT",type:"text",placeholder:"Select Type",listValues:W.listTruck}),c.a.createElement(b.a,{name:"droplocation",value:B.droplocation,label:"Drop Address",errors:M.droplocation,type:"address",required:!0,onChange:re,datatype:"TEXT",placeholder:"Enter Address",listValues:W.address}),c.a.createElement(v.a,{name:"contactPerson",value:null!==(a=null===(o=B.droplocation)||void 0===o?void 0:o.consigneeContactName)&&void 0!==a?a:"",label:"Contact Person",type:"text",required:!0,datatype:"TEXT",placeholder:"Name",readonly:!0,onChange:re}),c.a.createElement(v.a,{name:"consigneeContactNumber",value:null!==(s=null===(O=B.droplocation)||void 0===O?void 0:O.consigneeContactNumber)&&void 0!==s?s:"",label:"Mobile Number",type:"text",required:!0,datatype:"TEXT",placeholder:"Enter Number",readonly:!0,onChange:re}),c.a.createElement(v.a,{name:"phoneNumber",value:null!==(C=null===(j=B.droplocation)||void 0===j?void 0:j.phoneNumber)&&void 0!==C?C:"",label:"Phone Number",type:"text",required:!0,datatype:"TEXT",placeholder:"Enter Number",readonly:!0,onChange:re}))))}),C=a(158),j=a(221);var T=Object(l.forwardRef)((e,t)=>{let{buttonAction:a}=e,o=Object(r.e)();const s=Object(l.useRef)();Object(l.useEffect)(()=>{"payment"===a&&console.log("payment")},[a]),Object(l.useImperativeHandle)(t,()=>({async payNow(){var e=s.current;s.current&&e.openRosoom()}}));var i=o.location.state;return console.log(i),c.a.createElement(n.x,{className:"BookTruck-Location"},c.a.createElement(n.j,null,c.a.createElement("div",{className:"book-quick"},c.a.createElement(j.a,{allPayableDetails:i,buttonAction:a,ref:s}))))}),A=a(49),S=a(11);a(245);t.default=e=>{const[t,a]=Object(l.useState)("");var s=Object(r.e)();const[i,d]=Object(l.useState)(S.a.getState().VariableValues.paymentStatus);Object(l.useEffect)(()=>{p(),d(S.a.getState().VariableValues.paymentStatus)},[]),S.a.subscribe(()=>{d(S.a.getState().VariableValues.paymentStatus)});const u=Object(l.useRef)(),m=Object(l.useRef)();function p(){var e=Object(A.o)({status:"",reference_num:"0"});e&&S.a.dispatch(e),console.log("^^^^^^^^^^^",i)}return c.a.createElement(n.x,{className:"quick-book-page"},c.a.createElement(C.a,{label:"Quick Book",action:"home",showAgent:!0,agentHeader:!0}),c.a.createElement(n.j,{className:"quick-book-content"},c.a.createElement("div",{className:"form-div"},c.a.createElement(n.L,{className:"declaration-tab",onIonTabsDidChange:()=>p()},c.a.createElement(n.A,null,c.a.createElement(r.a,{exact:!0,path:"/quickBook",to:"/quickBook/book"}),c.a.createElement(r.b,{path:"/quickBook/book",render:()=>c.a.createElement(O,{buttonAction:t,ref:u}),exact:!0}),c.a.createElement(r.b,{path:"/quickBook/payment",render:()=>c.a.createElement(T,{buttonAction:t,ref:m}),exact:!0})),c.a.createElement(n.J,{slot:"top"},c.a.createElement(n.K,{tab:"location",href:"/quickBook/book",className:"quick-tabButton",disabled:"/quickBook/payment"===e.location.pathname},c.a.createElement(n.u,null,"Book")),c.a.createElement(n.K,{tab:"Payment",href:"/quickBook/payment",className:"quick-tabButton",disabled:"/quickBook/book"===e.location.pathname},c.a.createElement(n.u,null,"Payment")))))),c.a.createElement(n.l,null,c.a.createElement(n.P,null,("/quickBook/book"===e.location.pathname||"/quickBook/payment"===e.location.pathname)&&""===i.status&&c.a.createElement("div",{className:"button-div"},c.a.createElement("div",{className:"button-holder",onClick:()=>function(){if("/quickBook/book"===e.location.pathname){a("book");var t=u.current;console.log(u),u.current&&(t.gotoPaymentDiscPage(),console.log("09090909")),console.log("00000")}else"/quickBook/payment"===e.location.pathname&&a("payment");t=m.current,m.current&&t.payNow()}()},c.a.createElement(n.o,{slot:"icon-only",icon:o.e}))),""!==i.status&&c.a.createElement("div",{className:"button-div"},c.a.createElement("div",{className:"button-holder",onClick:()=>{s.push("/tabs/landing")}},c.a.createElement(n.o,{src:"assets/icon/home-new.svg",className:"button"}))))))}}}]);
//# sourceMappingURL=16.c4b06c40.chunk.js.map