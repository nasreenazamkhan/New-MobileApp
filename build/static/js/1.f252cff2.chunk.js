(this["webpackJsonpcargoes-lift"]=this["webpackJsonpcargoes-lift"]||[]).push([[1],{167:function(e,a,t){"use strict";t.d(a,"a",(function(){return o}));var n=t(7),l=t(0),c=t.n(l),s=(t(168),t(17));function o(){let e=Object(s.e)();function a(a){e.push(a)}return c.a.createElement("div",{className:"footer-container"},c.a.createElement("div",{className:"footer-button",onClick:()=>a("/tabs/landing")},c.a.createElement(n.o,{src:"assets/icon/home-new.svg",className:"footer-button"}),c.a.createElement(n.u,{className:"footer-label"},"Home")),c.a.createElement("div",{className:"footer-button",onClick:()=>a("/tabs/addresses")},c.a.createElement(n.o,{src:"assets/icon/address.svg",className:"footer-button"}),c.a.createElement(n.u,{className:"footer-label"},"Addresses")),c.a.createElement("div",{className:"footer-button"}),c.a.createElement("div",{className:"footer-button",onClick:()=>a("/tabs/status")},c.a.createElement(n.o,{src:"assets/icon/status.svg",className:"footer-button"}),c.a.createElement(n.u,{className:"footer-label"},"status")),c.a.createElement("div",{className:"footer-button",onClick:()=>a("/tabs/profile")},c.a.createElement(n.o,{src:"assets/icon/profile.svg",className:"footer-button"}),c.a.createElement(n.u,{className:"footer-label"},"profile")))}},168:function(e,a,t){},169:function(e,a,t){"use strict";var n=t(7),l=t(0),c=t.n(l),s=t(59),o=t(170);t(171);a.a=Object(s.b)(e=>({numberOfSelectedContainers:e.VariableValues}))(e=>{let{iconType:a,clickEvent:t,numberOfSelectedContainers:l}=e;return c.a.createElement("div",{className:"menu-button-div",onClick:()=>{(l.cartNumber>0||"menu"===a)&&t()}},c.a.createElement("div",{className:"menu-button"},"menu"===a?c.a.createElement(c.a.Fragment,null,c.a.createElement("hr",null),c.a.createElement("hr",null),c.a.createElement("hr",null)):"cart"===a&&c.a.createElement(c.a.Fragment,null,c.a.createElement(n.o,{src:"assets/icon/container-crane.svg",className:"button"}),c.a.createElement(o.a,null))))})},171:function(e,a,t){},180:function(e,a,t){"use strict";t.d(a,"a",(function(){return m}));var n,l=t(64),c=t(49),s=t(11),o=t(8),i=t(58),r=t(6);async function m(e,a){var t;a,(n=l.a.create(e,"_self",i.l)).on("loadstart").subscribe(e=>{});var c=n.on("loadstop").subscribe(async e=>{if(t=await async function(e,a){console.log("Waiting until foo reaches 1337 ..."),await(t=()=>e.includes("/mobileResponseFromRosoomPaymentApp"),new Promise(e=>{const a=setInterval(()=>{t()&&(clearInterval(a),e())});return!0})),console.log("url === yes... same"),n.close();var t;await n.on("exit").subscribe(async()=>{},e=>{console.log(e)});var l=await u(a);return await l}(e.url,a))return await t});return n.on("loaderror").subscribe(e=>{},e=>{}),n.on("exit").subscribe(async()=>{console.log("exxxxxxiiiitt"),u(a)},e=>{console.log(e)}),await c}async function u(e){var a={url:o.rosoomPaymentStatusCheck+e,callType:"get",header:{}};return await r.a(a).then(async e=>{var a,t,n,l;let o=null===e||void 0===e||null===(a=e.data)||void 0===a||null===(t=a.data)||void 0===t||null===(n=t.dataItems[0])||void 0===n?void 0:n.referenceNumber;console.log("effffffffff**(*(&(*&(&(&(*(*&(*&(*",e),"SUCC"===e.data.data.dataItems[0].status?(console.log("suuuucceesssssss"),l={status:"SUCC",reference_num:o}):"FAIL"===e.data.data.dataItems[0].status?(console.log("Faaaaaaaiiiiilllllll"),l={status:"FAIL",reference_num:o}):(console.log("Pennnnddddiiinnngg"),l={status:"PEND",reference_num:o});var i=await c.o(l);return i&&s.a.dispatch(i),e})}},181:function(e,a,t){"use strict";var n=t(7),l=t(0),c=t.n(l),s=t(17),o=t(157);a.a=e=>{let{txnId:a}=e;var t=Object(s.e)();return c.a.createElement("div",{className:"pending-container"},c.a.createElement("div",{className:"content"},c.a.createElement("div",{className:"icon-container"},c.a.createElement(o.a,{iconProps:{name:"pending",class:"zoom84"}})),c.a.createElement("div",{className:"pendingLabel"},"Payment Pending!"),c.a.createElement("div",{className:"sub-label"},"Please note it may take up to 10 minutes for completing the transaction."),c.a.createElement("div",{className:"booking-label"}," ",c.a.createElement(n.u,null," Booking number #",a)),c.a.createElement("div",{className:"sub-label"},"Check your"," ",c.a.createElement(n.u,{className:"underLine-label",onClick:()=>t.push("/tabs/status")},"Booking Status"),"here")))}},182:function(e,a,t){"use strict";var n=t(177),l=t(7),c=t(0),s=t.n(c),o=t(17),i=t(157),r=t(6),m=t(8);t(186);a.a=e=>{let{txnId:a}=e;var t=Object(o.e)();return s.a.createElement("div",{className:"success-container"},s.a.createElement("div",{className:"content"},s.a.createElement("div",{className:"icon-container"},s.a.createElement(i.a,{iconProps:{name:"success",class:"zoom84"}})),s.a.createElement("div",{className:"successLabel"},"Your Payment is Successful"),s.a.createElement("div",{className:"sub-label"},"An Email confirmation will be send to you shortly with booking details"),s.a.createElement("div",{className:"booking-label"}," ",s.a.createElement(l.u,null," Booking number #",a)),s.a.createElement("div",{className:"sub-label"},"Check your"," ",s.a.createElement(l.u,{className:"underLine-label",onClick:()=>t.push("/tabs/status")},"Booking Status"),"here"),s.a.createElement("div",{className:"button-outline",onClick:()=>function(e){var a={url:m.downloadReceipt+e,callType:"get",header:{}};Object(r.a)(a).then(a=>{a.success&&n.a.share("Your Payment Receipt","Booking-Receipt-"+e,"data:application/pdf;base64,"+a.data,null)})}("props.referenceNumber")},s.a.createElement("div",{className:"button-label"},"Download Receipt")),s.a.createElement("br",null),s.a.createElement("div",{className:"button-outline",onClick:()=>function(e){var a={url:m.downloadTaxInvoice+e,callType:"get",header:{}};Object(r.a)(a).then(a=>{a.success&&n.a.share("Your Tax Invoice Receipt","Booking-Receipt-"+e,"data:application/pdf;base64,"+a.data,null)})}("props.referenceNumber")},s.a.createElement("div",{className:"button-label"},"Tax Invoice"))))}},186:function(e,a,t){},192:function(e,a,t){"use strict";var n=t(0),l=t.n(n),c=t(157),s=t(49),o=t(11),i=t(56),r=t(180),m=(t(186),t(181)),u=t(182);const d=e=>{let{txnId:a}=e;const[t,E]=Object(n.useState)({});return o.a.subscribe(()=>{E(o.a.getState().VariableValues.paymentStatus),console.log(o.a.getState().VariableValues.paymentStatus,"calling store",t)}),l.a.createElement("div",{className:"fail-container"},l.a.createElement("div",{className:"content"},l.a.createElement("div",{className:"icon-container"}," ",l.a.createElement(c.a,{iconProps:{name:"error",class:"zoom84"}})),l.a.createElement("div",{className:"failLabel"},"Payment Failed!"),l.a.createElement("div",{className:"sub-label"},"Unfortunately, we encounter an error while processing your payment for the booking. Any amount deducted from your account will be refund in 3 to 5 business days"),l.a.createElement("div",{className:"booking-label"}," ","Please check your payment details and try again."),l.a.createElement("div",{className:"button-outline",onClick:()=>async function(){var e=Object(s.o)({status:"",reference_num:"0"});e&&o.a.dispatch(e);var t,n,l,c=await Object(i.E)(a);(null===c||void 0===c?void 0:c.success)&&(console.log(c),Object(r.a)(c.data.data.dataItems[0].url,null===c||void 0===c||null===(t=c.data)||void 0===t||null===(n=t.data)||void 0===n||null===(l=n.dataItems[0])||void 0===l?void 0:l.transactionId))}()},l.a.createElement("div",{className:"button-label"},"Try Again"))),"SUCC"===t.status&&l.a.createElement(u.a,{txnId:t.reference_num}),"FAIL"===t.status&&l.a.createElement(d,{txnId:t.reference_num}),"PEND"===t.status&&l.a.createElement(m.a,{txnId:t.reference_num}))};a.a=d},212:function(e,a,t){},213:function(e,a,t){"use strict";var n=t(7),l=t(0),c=t.n(l),s=t(157),o=(t(212),t(214)),i=t(17);const r={name:"calendar",slot:"start",class:"slotStart",styleProps:{zoom:" 1.2"}};a.a=e=>{let{cardClick:a,clickedDownloadPOD:t,item:m,verifyPodTime:u,expiryDate:d,icon1:E,icon2:v,icon3:b}=e,N=Object(i.e)();const[p,f]=Object(l.useState)(!1);return c.a.createElement(c.a.Fragment,null,c.a.createElement(n.e,{className:p?"red-border  box_shadow":"box_shadow",onClick:()=>a(m)},c.a.createElement(n.f,null,c.a.createElement("div",{className:"first-row"},c.a.createElement("div",{className:"cont-num"},c.a.createElement("div",{className:" cont-label"},"Container#"),c.a.createElement("div",{className:" cont-dynamic-num"}," ",c.a.createElement(n.u,null,m.container_number," ",m.iso_code))),c.a.createElement("div",{className:"cont-type"},c.a.createElement("div",{className:" cont-typelabel"},"Container Type"),c.a.createElement("div",{className:"  cont-dynamic-type"}," ",c.a.createElement(n.u,null,m.containerType))),c.a.createElement("div",{className:"consignee-detail"},c.a.createElement("div",{className:"consi-detail-label"},"Consignee details "),c.a.createElement("div",{className:"consi-dynamic-detail"},c.a.createElement(n.u,null,m.consigneeDetails)))),c.a.createElement("div",{className:"second-row"},c.a.createElement("div",{className:"pickup"},c.a.createElement("div",{className:" pickup-label"},"Pickup "),c.a.createElement("div",{className:" pickup-dynamic-loc"}," ",c.a.createElement(n.u,null,"T1"))),c.a.createElement("div",{className:"drop-detail"},c.a.createElement("div",{className:" drop-detail-label"},"Drop Details"),c.a.createElement("div",{className:"  drop-detail-dynamic"}," ",c.a.createElement(n.u,null,m.dropZoneLabel))),c.a.createElement("div",{className:"date"},c.a.createElement("div",{className:"date-icon"},c.a.createElement(s.a,{iconProps:r})," "),c.a.createElement("div",{className:"consi-dynamic-detail"},c.a.createElement(n.u,null,m.date_time)))),c.a.createElement("div",{className:"third-row"},c.a.createElement("div",{className:"icon1",onClick:e=>{e.stopPropagation(),N.push("/track",m)}},c.a.createElement(s.a,{iconProps:E})),c.a.createElement("div",{className:"icon2",onClick:e=>{e.stopPropagation(),(e=>{console.log("   -----    ",e);let a={contact:{consigneeContactNumber:e.consigneeContactNumber,consigneeContactName:null===e||void 0===e?void 0:e.consigneeContactName,phoneNumber:null===e||void 0===e?void 0:e.phoneNumber,dropAddress:null===e||void 0===e?void 0:e.dropAddress,addressLine1:null===e||void 0===e?void 0:e.addressLine1,dropZone:null===e||void 0===e?void 0:e.dropZoneCode,selectedDropZoneLabel:null===e||void 0===e?void 0:e.dropZoneLabel,ctnNumber:null===e||void 0===e?void 0:e.container_number,dpwTransactionId:null===e||void 0===e?void 0:e.dpwTransactionId,requestDetailsNumber:null===e||void 0===e?void 0:e.requestDetailsNumber,latLng:null===e||void 0===e?void 0:e.latLng},isContainerEdit:!0};N.push("/addAddress",a)})(m),console.log("download")}},c.a.createElement(s.a,{iconProps:v})),c.a.createElement("div",{className:"icon3",onClick:e=>{e.stopPropagation(),t(!0,m)}},b&&c.a.createElement("div",null,m.proofOfDelivery.length>0?c.a.createElement("div",{className:"download-icon"},c.a.createElement(s.a,{iconProps:b}),c.a.createElement("div",{className:"  download-pod"}," ",c.a.createElement(n.u,null,"Download POD"))):c.a.createElement("div",{className:"center-align"},"--")))))),u&&c.a.createElement(n.B,null,c.a.createElement(n.i,{className:"sla-position"},c.a.createElement(o.a,{expiryDate:d,verifyPodTime:u,SLAstatus:function(e){f(!0)}}))))}},214:function(e,a,t){"use strict";var n=t(23),l=t.n(n),c=t(0),s=t.n(c),o=t(58);t(215);a.a=e=>{let{expiryDate:a,verifyPodTime:t,SLAstatus:n}=e;const[i,r]=Object(c.useState)("");var m=Object(o.j)(a),u=l()(new Date),d=l()(new Date(m));return Object(c.useEffect)(()=>{r(d.from(u)),n&&d.diff(u,"hours")<t&&n(!0)},[]),s.a.createElement("div",{className:d.diff(u,"hours")<t?"sla-text red":"sla-text"},"SLA Expire",d.diff(u,"minutes")<0?"d ":"s "," ",i)}},215:function(e,a,t){},216:function(e,a,t){},234:function(e,a,t){},270:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return w}));var n=t(7),l=t(0),c=t.n(l),s=t(17),o=t(158),i=t(157),r=t(166),m=t(179),u=t(58),d=t(56),E=t(191),v=t(213);t(234);var b=e=>{var a,t;let{InvoiceDetails:o}=e;Object(s.e)();console.log(o);const[b,N]=Object(l.useState)({}),[p,f]=Object(l.useState)(!1),[g,k]=Object(l.useState)({}),[y,h]=Object(l.useState)(!1);Object(l.useEffect)(()=>{!async function(){var e=await Object(d.q)(o.bookingNumber);console.log(e),(null===e||void 0===e?void 0:e.success)&&N(null===e||void 0===e?void 0:e.data)}()},[]);Object(u.c)(5);var x={name:"track-truck",slot:"",class:"zoom12",style:{stroke:"#168FE4"},styleProps:{zoom:2.6}},C={name:"eye-blue",slot:"",class:"zoom12",style:{stroke:"#168FE4"},styleProps:{zoom:2.6}},O={name:"star",slot:"",class:"zoom12",style:{stroke:"#168FE4"}};function P(e){console.log(e),f(!0),k(e)}return c.a.createElement(n.x,{className:"BookTruck-Location"},c.a.createElement(n.j,null,c.a.createElement(r.a,{showModal:p,openOrCloseModal:e=>{f(e)},content:c.a.createElement(E.a,{item:g,click:()=>{console.log("uuiuiuiuiu"),h(!1)},fromPod:!0})}),c.a.createElement("div",{className:"invoice-book-container componentMargins"},c.a.createElement(n.B,null,c.a.createElement(n.i,null,c.a.createElement(m.a,{text:"Payment details"}))),c.a.createElement("div",{className:"invoice-book-container"},null===(a=b.paymentDetails)||void 0===a?void 0:a.map((e,a)=>c.a.createElement(n.B,{key:a},c.a.createElement(n.i,null,c.a.createElement(n.u,{className:"bold-font"},e.chargeDescription)),c.a.createElement(n.i,{class:"ion-text-end"},c.a.createElement(n.u,{className:"bold-font"},e.totalAmount," AED")))),c.a.createElement(n.B,null,c.a.createElement(n.i,null)),c.a.createElement(n.B,null,c.a.createElement(n.i,null,c.a.createElement(n.u,{className:"bold-font"},"Gross Amount")),c.a.createElement(n.i,{class:"ion-text-end"},c.a.createElement(n.u,{className:"bold-font"},b.grossAmount," AED"))))),null===(t=b.containerList)||void 0===t?void 0:t.map((e,a)=>c.a.createElement("div",{key:a},c.a.createElement(v.a,{item:e,cardClick:P,icon1:x,icon2:C}),c.a.createElement("div",{className:"invoice-book-container componentMargins"},c.a.createElement(n.B,null,e.rating>0&&Object(u.c)(e.rating).map((e,a)=>c.a.createElement(i.a,{key:a,iconProps:O})),c.a.createElement(n.i,{class:"ion-text-end"},c.a.createElement(n.u,{className:"gray-label"},"Completed on: ",e.date_time))))))))},N=(t(216),t(185)),p=t(167),f=t(49),g=t(11),k=t(180),y=t(169),h=t(192),x=t(181),C=t(182),O=t(177);const P={name:"upload-quick",slot:"",class:"zoom2",styleProps:{transform:" rotateX(180deg)"}};var A=e=>{let{item:a}=e;return console.log(a),c.a.createElement("div",{className:"invoice-card-cont"},c.a.createElement(n.B,null,c.a.createElement(n.i,{size:"4",className:"gray-text"},"Invoice Number"),c.a.createElement(n.i,{size:"4",className:"gray-text"},"Invoice Date"),c.a.createElement(n.i,{size:"4",className:"gray-text"},"Vat Amount")),c.a.createElement(n.B,null,c.a.createElement(n.i,{size:"4",className:"black-text"},c.a.createElement(n.u,null,a.invoiceNumber)),c.a.createElement(n.i,{size:"4",className:"black-text"},c.a.createElement(n.u,null,a.invoiceDate)),c.a.createElement(n.i,{size:"4",className:"black-text"},c.a.createElement(n.u,null,a.vatAmount))),c.a.createElement(n.B,null,c.a.createElement(n.i,null)),c.a.createElement(n.B,null,c.a.createElement(n.i,{size:"4",className:"gray-text"},"Invoice Amount"),c.a.createElement(n.i,{size:"4",className:"gray-text"},"Description"),c.a.createElement(n.i,{size:"4",className:"gray-text"},"Status")),c.a.createElement(n.B,null,c.a.createElement(n.i,{size:"4",className:"black-text"},c.a.createElement(n.u,null,a.invoiceAmount)),c.a.createElement(n.i,{size:"4",className:"black-text"},c.a.createElement(n.u,null,a.description)),c.a.createElement(n.i,{size:"4",className:"black-text"},c.a.createElement(n.u,null,a.paymentStatus))),c.a.createElement(n.B,{className:"parent"},c.a.createElement(n.i,{className:"child",onClick:()=>function(e,a,t){console.log(e),O.a.share(a,t+e.bookingReferenceNumber,"data:application/pdf;base64,"+e.invoicePdfContent,null)}(a,"DT invoice Receipt","invoice-Receipt-")},c.a.createElement("div",null," ",c.a.createElement(i.a,{iconProps:P})),c.a.createElement(n.i,{className:"file-name"}," Download Invoice")),a.invoiceDocs.map((e,a)=>c.a.createElement(n.i,{className:"child",key:a,onClick:()=>function(e,a,t){console.log(e),O.a.share(a,t+e.fileName,"data:application/"+e.fileName.split(".")[1]+";base64,"+e.fileContent,null)}(e,"Supporting Documents","supporting doc")},c.a.createElement("div",null," ",c.a.createElement(i.a,{iconProps:P})),c.a.createElement(n.i,{className:"file-name"}," Supporting docs")))))};var I=e=>{var a;let{InvoiceDetails:t}=e,o=Object(s.e)();const[i,r]=Object(l.useState)({}),[m,u]=Object(l.useState)({});return Object(l.useEffect)(()=>{!async function(){var e=Object(f.o)({status:"",reference_num:"0"});e&&g.a.dispatch(e);var a=await Object(d.p)(t.bookingNumber);(null===a||void 0===a?void 0:a.success)&&r(a.data.data.dataItems[0])}()},[]),g.a.subscribe(()=>{u(g.a.getState().VariableValues.paymentStatus)}),c.a.createElement(n.x,{className:"BookTruck-Location"},c.a.createElement(n.j,null,""===m.status&&c.a.createElement("div",{className:"invoice-book-container componentMargins"},c.a.createElement(n.B,null,c.a.createElement(n.i,null,c.a.createElement(n.u,{className:"bold-font"},"Total Amount paid")),c.a.createElement(n.i,{class:"ion-text-end1"},c.a.createElement(n.u,{className:"bold-font"},i.paidAmount," AED"))),c.a.createElement(n.B,null,c.a.createElement(n.i,null,c.a.createElement(n.u,{className:"bold-font"},"Amount to be paid")),c.a.createElement(n.i,{class:"ion-text-end1"},c.a.createElement(n.u,{className:"bold-font"},i.unpaidAmount," AED"))),null===(a=i.invoiceList)||void 0===a?void 0:a.map((e,a)=>c.a.createElement("div",{key:a,className:0!==a?"invoicecard-cont":""},c.a.createElement(A,{item:e})))),"SUCC"===m.status&&c.a.createElement(C.a,{txnId:m.reference_num}),"FAIL"===m.status&&c.a.createElement(h.a,{txnId:m.reference_num}),"PEND"===m.status&&c.a.createElement(x.a,{txnId:m.reference_num}),(i.unpaidAmount<1||"SUCC"===m.status||"FAIL"===m.status||"PEND"===m.status)&&c.a.createElement(y.a,{iconType:"menu",clickEvent:()=>o.push("/tabs/landing")})),i.unpaidAmount<1||"SUCC"===m.status||"FAIL"===m.status||"PEND"===m.status?c.a.createElement(p.a,null):c.a.createElement(N.a,{onBlueFooterClick:()=>async function(){var e,a,t,n,l,c,s=await Object(d.B)(i);(null===s||void 0===s?void 0:s.success)&&Object(k.a)(null===s||void 0===s||null===(e=s.data)||void 0===e||null===(a=e.data)||void 0===a||null===(t=a.dataItems[0])||void 0===t?void 0:t.url,null===s||void 0===s||null===(n=s.data)||void 0===n||null===(l=n.data)||void 0===l||null===(c=l.dataItems[0])||void 0===c?void 0:c.transactionId)}(),footerLabel:"PAY AMOUNT"}))};function w(e){const[a,t]=Object(l.useState)({}),i=e.history.location.state;return Object(l.useEffect)(()=>{var e={noOfContainers:null===i||void 0===i?void 0:i.noOfContainers,noOfTrucks:null===i||void 0===i?void 0:i.noOfTrucks,unpaidAmount:null===i||void 0===i?void 0:i.unpaidAmount,bookingNumber:null===i||void 0===i?void 0:i.bookingNumber},a=Object(f.n)(e);a&&g.a.dispatch(a)},[]),g.a.subscribe(()=>{t(g.a.getState().VariableValues.invoiceHeader)}),c.a.createElement(n.x,{className:"invoice-page"},c.a.createElement(o.a,{label:a.bookingNumber,action:"home",agentHeader:!0}),c.a.createElement(n.P,null,c.a.createElement(n.B,{className:"container-toolbar-row"},c.a.createElement(n.i,{size:"1",className:"container-col"},c.a.createElement(n.o,{src:"/assets/icon/container.svg"})),c.a.createElement(n.i,{size:"2.8",className:"padding-left"},c.a.createElement(n.B,null,c.a.createElement(n.M,{className:"data-font"},Object(u.a)(a.noOfContainers))),c.a.createElement(n.B,null,c.a.createElement(n.M,{className:"title-font"},"Containers"))),c.a.createElement(n.i,{size:"1",className:"container-col"},c.a.createElement(n.o,{src:"/assets/icon/truck-grey.svg"})),c.a.createElement(n.i,{size:"2.8",className:"padding-left"},c.a.createElement(n.B,null,c.a.createElement(n.M,{className:"data-font"},Object(u.a)(a.noOfTrucks))),c.a.createElement(n.B,null,c.a.createElement(n.M,{className:"title-font"},"Trucks"))),c.a.createElement(n.i,{size:"2",className:"container-col background"}),c.a.createElement(n.i,{size:"2.4",className:"container-col-amnt"},c.a.createElement(n.M,{className:"amnt-text"},a.unpaidAmount,"AED")))),c.a.createElement(n.j,null,c.a.createElement(n.L,{className:"manual-invoice-tab",onIonTabsDidChange:()=>console.log(2323223)},c.a.createElement(n.A,null,c.a.createElement(s.a,{exact:!0,path:"/invoicetabs/",to:"/invoicetabs/booking"}),c.a.createElement(s.b,{path:"/invoicetabs/booking",render:()=>c.a.createElement(b,{InvoiceDetails:i}),exact:!0}),c.a.createElement(s.b,{path:"/invoicetabs/manual",exact:!0,render:()=>c.a.createElement(I,{InvoiceDetails:i})})),c.a.createElement(n.J,{slot:"top"},c.a.createElement(n.K,{tab:"location",href:"/invoicetabs/booking",className:"invoice-button"},c.a.createElement(n.u,{className:"tab-text"},"Booking")),c.a.createElement(n.K,{className:"invoice-button",tab:"explore",href:"/invoicetabs/manual"},c.a.createElement(n.u,{className:"tab-text"},"MANUAL INVOICE"))))))}}}]);
//# sourceMappingURL=1.f252cff2.chunk.js.map