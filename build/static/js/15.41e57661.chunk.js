(this["webpackJsonpcargoes-lift"]=this["webpackJsonpcargoes-lift"]||[]).push([[15],{157:function(e,a,t){"use strict";t.d(a,"a",(function(){return s}));var c=t(0),n=t.n(c),l=t(7),o=(t(159),t(60));function s(e){const a=r();var t=e.iconProps;return n.a.createElement(l.o,{src:"assets/icon/"+t.name+".svg",style:t.styleProps,className:t.class?a[t.class]+" "+t.class:"",slot:t.slot,onClick:()=>(null===t||void 0===t?void 0:t.iconClick)?null===t||void 0===t?void 0:t.iconClick(e.iconName,e.fieldPlaceholder):console.log()})}const r=Object(o.a)({zoom12:{zoom:1.4},slotEnd:{right:0,bottom:"1px"},disabledminus:{fontSize:"1.6rem",right:"-5px",zoom:1.5},calenderMargin:{zoom:1.4},zoom3:{zoom:3},zoom2:{zoom:2},slotStart:{position:"absolute",zoom:1.5},absolutePosition:{position:"absolute"},lastIcon:{zoom:"1.5",right:"3px",position:"relative"}})},158:function(e,a,t){"use strict";var c=t(7),n=t(12),l=t(0),o=t.n(l),s=t(17),r=t(160),i=(t(162),t(157)),m=t(11),d=t(8),u=t(49),h=t(56);a.a=e=>{const[a,t]=Object(l.useState)({search:!0,check:!0,close:!0,home:!0,info:!1});var f=m.a.getState().CheckUserStatus.user;const[E,v]=Object(l.useState)(!1),[g,p]=Object(l.useState)("Select All"),b={name:"back-arrow",slot:"icon-only",zoom:""};Object(l.useEffect)(()=>{C(e.action?e.action:"none")},[]);let k=Object(s.e)();const N=a=>{e.customClick?e.customClick("/containerCart"):e.customBack?e.backClick(a):k.goBack()},C=e=>{e&&("search"===e?t({search:!1,check:!0,close:!0,home:!0,info:!0}):"check"===e?t({search:!0,check:!1,close:!0,home:!0,info:!0}):"close"===e?t({search:!0,check:!0,close:!1,home:!0,info:!0}):"home"===e?t({search:!0,check:!0,close:!0,home:!1,info:!0}):"info"===e&&t({search:!0,check:!0,close:!0,home:!0,info:!1}))};return o.a.createElement(c.n,{style:e.agentHeader?{height:"102px"}:{height:"10%"}},o.a.createElement(c.P,{className:"header"},o.a.createElement("div",{className:"mainContainer",style:e.agentHeader?{}:{paddingBottom:0}},e.checkedProps?o.a.createElement("div",{className:"selectAllBg",hidden:!e.checkedProps.showChecked},o.a.createElement("div",null,o.a.createElement(c.d,{fill:"clear",onClick:e=>{N(e)}},o.a.createElement(i.a,{iconProps:b}))),o.a.createElement("div",{className:"checkBoxContainer"},o.a.createElement(c.h,{className:"checkBox",checked:E,onIonChange:a=>function(a){console.log(a),v(a),a?(p("Unselect All"),e.checkedProps.addContainerToCart("","","checked")):(e.checkedProps.addContainerToCart("","","unchecked"),p("Select All"))}(a.detail.checked)})),o.a.createElement("div",{className:"checkBoxLabelCol"},o.a.createElement(c.u,{className:"checkBoxLabel"},g)," ")):o.a.createElement(o.a.Fragment,null),o.a.createElement("div",{className:"backArrow"},"Home"!=e.label&&a.close?o.a.createElement(c.d,{fill:"clear",onClick:e=>{N(e)}},o.a.createElement(i.a,{iconProps:b})):o.a.createElement(o.a.Fragment,null)),o.a.createElement("div",{className:"header-label"}," ",o.a.createElement(c.M,null,e.label)),o.a.createElement("div",{className:"header-right"},o.a.createElement(c.d,{hidden:a.search,fill:"clear",onClick:e.searchClick},o.a.createElement(c.o,{slot:"icon-only",icon:n.x,style:{minWidth:"30px"}})),o.a.createElement(c.d,{hidden:a.info,fill:"clear",onClick:e.infoClick},o.a.createElement(c.o,{src:"assets/icon/info-italic.svg",slot:"icon-only",style:{minWidth:"30px"}})),o.a.createElement(c.d,{hidden:a.check,fill:"clear",onClick:e.checkClick},o.a.createElement(i.a,{iconProps:{name:"Check",slot:"icon-only",zoom:""}})),o.a.createElement(c.d,{hidden:a.home,fill:"clear",onClick:a=>{e.customClick?e.customClick("/tabs/landing"):(k.push("/tabs/landing"),Object(r.a)())}},o.a.createElement(i.a,{iconProps:{name:"home-new",slot:"icon-only",zoom:""}})),o.a.createElement(c.d,{hidden:a.close,fill:"clear",onClick:e=>{N(e)}},o.a.createElement(c.o,{slot:"icon-only",icon:n.p})),o.a.createElement(c.d,{hidden:""!==e.action,fill:"clear"},o.a.createElement(c.o,null)))),f.agents&&e.agentHeader&&o.a.createElement(c.P,{className:"agent-code-header"},o.a.createElement(c.F,{value:f.selectedAgent,interface:"popover",onIonChange:a=>(async a=>{let t=a.detail.value,c=d.loginAgent+"?agentCode="+t.agentCode+"&agentType="+t.agentType;var n={userName:f.userName,userType:"IMPORTER_APP"},l=await Object(h.A)(c,n),o=l.data.data.dataItems[0];if(await l.success){var s=await u.a(o.accessToken);s&&m.a.dispatch(s);var r=await u.b(o.user.activeCompanyCode);r&&m.a.dispatch(r);var i=await u.c(t);i&&m.a.dispatch(i);m.a.getState().CheckUserStatus;e.changedAgent?e.changedAgent():console.log("changed")}})(a),disabled:!e.showAgent||1==f.agents.length,style:e.showAgent?{}:{backgroundColor:"#DDF1FF"},interfaceOptions:{cssClass:"agent-interface"}},f.agents.map((e,a)=>o.a.createElement(c.G,{value:e,key:a,className:"select-agent-opt"},e.agentCode+"-"+e.agentName))),o.a.createElement(c.o,{src:"assets/icon/arrow-down.svg",className:"arrow-down-icon",hidden:!e.showAgent||1==f.agents.length}))))}},159:function(e,a,t){},160:function(e,a,t){"use strict";t.d(a,"a",(function(){return l}));var c=t(11),n=t(2);function l(){c.a.dispatch({type:n.m}),c.a.dispatch({type:n.v}),c.a.dispatch({type:n.x}),c.a.dispatch({type:n.s}),c.a.dispatch({type:n.w})}},162:function(e,a,t){},167:function(e,a,t){"use strict";t.d(a,"a",(function(){return s}));var c=t(7),n=t(0),l=t.n(n),o=(t(168),t(17));function s(){let e=Object(o.e)();function a(a){e.push(a)}return l.a.createElement("div",{className:"footer-container"},l.a.createElement("div",{className:"footer-button",onClick:()=>a("/tabs/landing")},l.a.createElement(c.o,{src:"assets/icon/home-new.svg",className:"footer-button"}),l.a.createElement(c.u,{className:"footer-label"},"Home")),l.a.createElement("div",{className:"footer-button",onClick:()=>a("/tabs/addresses")},l.a.createElement(c.o,{src:"assets/icon/address.svg",className:"footer-button"}),l.a.createElement(c.u,{className:"footer-label"},"Addresses")),l.a.createElement("div",{className:"footer-button"}),l.a.createElement("div",{className:"footer-button",onClick:()=>a("/tabs/status")},l.a.createElement(c.o,{src:"assets/icon/status.svg",className:"footer-button"}),l.a.createElement(c.u,{className:"footer-label"},"status")),l.a.createElement("div",{className:"footer-button",onClick:()=>a("/tabs/profile")},l.a.createElement(c.o,{src:"assets/icon/profile.svg",className:"footer-button"}),l.a.createElement(c.u,{className:"footer-label"},"profile")))}},168:function(e,a,t){},169:function(e,a,t){"use strict";var c=t(7),n=t(0),l=t.n(n),o=t(59),s=t(170);t(171);a.a=Object(o.b)(e=>({numberOfSelectedContainers:e.VariableValues}))(e=>{let{iconType:a,clickEvent:t,numberOfSelectedContainers:n}=e;return l.a.createElement("div",{className:"menu-button-div",onClick:()=>{(n.cartNumber>0||"menu"===a)&&t()}},l.a.createElement("div",{className:"menu-button"},"menu"===a?l.a.createElement(l.a.Fragment,null,l.a.createElement("hr",null),l.a.createElement("hr",null),l.a.createElement("hr",null)):"cart"===a&&l.a.createElement(l.a.Fragment,null,l.a.createElement(c.o,{src:"assets/icon/container-crane.svg",className:"button"}),l.a.createElement(s.a,null))))})},170:function(e,a,t){"use strict";var c=t(7),n=t(0),l=t.n(n),o=t(59),s=t(11),r=(t(174),t(2));a.a=Object(o.b)(e=>({numberOfContainers:e.Cart}),()=>({updateCartNumber:e=>{s.a.dispatch({type:r.I,payLoad:{variableName:"cartNumber",value:e}})}}))(e=>{let{numberOfContainers:a,updateCartNumber:t}=e;const[o,s]=Object(n.useState)(0);return Object(n.useEffect)(()=>{var e;s(e=0),a.map((a,c)=>{a.containerList.map(a=>{a.selected?(e++,s(e),t(e)):(s(e),t(e))})})},[a]),l.a.createElement("div",null,l.a.createElement(c.c,{className:"blueBg"}," ",o))})},171:function(e,a,t){},174:function(e,a,t){},199:function(e,a,t){},277:function(e,a,t){"use strict";t.r(a);var c=t(7),n=t(0),l=t.n(n),o=t(17),s=t(61),r=t(167),i=t(158),m=t(157),d=t(49),u=t(11),h=t(56),f=t(169);t(199);a.default=(e,a)=>{let{}=a;const[t,E]=Object(n.useState)([]),[v,g]=Object(n.useState)(!1),[p,b]=Object(n.useState)(""),[k,N]=Object(n.useState)("");let C=Object(o.e)();const y={isShow:v,message:"",content:" Are you sure to delete the draft?",icon:"<img src='/assets/icon/are-you-sure.svg'/>",alertAction:async function(e,a){var t={encryptedDraftId:p};if(g(!1),a){let e=await Object(h.b)(t);e.success&&S(),console.log(e)}console.log("elete")},itemName:"",okButtonName:"Continue",cancelButtonName:"Cancel"};Object(n.useEffect)(()=>{S()},[]);var O={name:"container",slot:"",class:"zoom12",styleProps:{zoom:2.8}},w={name:"drafts-note",slot:"",class:"zoom12",styleProps:{zoom:2.8}},P={name:"delete",slot:"",class:"zoom12"};async function S(){E([]);var e,a,t,c,n,l=await Object(h.k)();(console.log(l),null===l||void 0===l?void 0:l.success)?(null===l||void 0===l||null===(e=l.data)||void 0===e||null===(a=e.data)||void 0===a?void 0:a.dataItems.length)>0?(E(null===l||void 0===l||null===(t=l.data)||void 0===t||null===(c=t.data)||void 0===c?void 0:c.dataItems),N("")):N("No drafts saved to display"):N(null===l||void 0===l||null===(n=l.data)||void 0===n?void 0:n.message)}return l.a.createElement(c.x,null,l.a.createElement(i.a,{label:"Save drafts",action:"home",locationProps:e,searchClick:()=>console.log(),showAgent:!0,agentHeader:!0}),l.a.createElement(c.j,null,l.a.createElement(s.a,{alertProps:y}),k&&l.a.createElement("div",{className:"warning-message"},k),null===t||void 0===t?void 0:t.map((a,t)=>l.a.createElement(c.e,{className:"box_shadow",onClick:()=>function(a){delete a.containerDetailsDtoList;var t=a;console.log(t),t.requestDetailsDraft=JSON.parse(t.requestDetailsDraft),console.log(t);var c=d.g(t.requestDetailsDraft),n=d.p(a.encryptedDraftId);n&&u.a.dispatch(n),console.log(n),c&&u.a.dispatch(c),console.log(t),e.history.push("/bookTruckTab",t)}(a),key:t},l.a.createElement(c.f,null,l.a.createElement("div",{className:"draft-container"},l.a.createElement("div",{className:"draft-icon"},l.a.createElement(m.a,{iconProps:w})),l.a.createElement("div",{className:"draft-col"},l.a.createElement("div",{className:"boldBlackText"},"Draft 1"),l.a.createElement("div",{className:"saved-date"},l.a.createElement("div",{className:"lightGrayLable"},"Saved on"),l.a.createElement("div",{className:"lightGrayLable center-align"},a.creationDate))),l.a.createElement("div",{className:"draft-icon"},l.a.createElement(m.a,{iconProps:O})),l.a.createElement("div",{className:"draft-col"},l.a.createElement("div",{className:"lightBlackText"},l.a.createElement(c.u,null,JSON.parse(a.requestDetailsDraft).containerList.length||0)),l.a.createElement("div",{className:"lightBlackText"},l.a.createElement(c.u,null,"Containers"))),l.a.createElement("div",{className:"draft-icon",onClick:e=>{e.stopPropagation(),g(!0),b(a.encryptedDraftId)}},l.a.createElement(m.a,{iconProps:P})))))),l.a.createElement(f.a,{iconType:"menu",clickEvent:()=>C.push("/profilemenu")})),l.a.createElement(r.a,null))}}}]);
//# sourceMappingURL=15.41e57661.chunk.js.map