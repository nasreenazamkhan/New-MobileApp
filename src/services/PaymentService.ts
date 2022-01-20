import { InAppBrowser } from "@ionic-native/in-app-browser";
import * as reduxActions from "../redux/actions/AllActions";
import Store from "../redux/Store";
import * as apiBaseUrl from "../util/EndPointURL";
import { platformDependentOption } from "./Common";
import * as HttpRequest from "./HttpsServices";

var txnIds;
var ref;
export async function postToExternalSite(url, txnId) {
    var rosoomStatus;
    txnIds = txnId;
    var paymentCompl;
    ref = InAppBrowser.create(url, "_self", platformDependentOption);

    ref.on("loadstart").subscribe((event) => {
      //checkPaymentSuccess(event.url, txnId);
    });

    var result = ref.on("loadstop").subscribe(async (event) => {
      paymentCompl = await checkPaymentSuccess(event.url, txnId);
      if (paymentCompl) {
        return await paymentCompl;
      } else {
      }
    });
    ref.on("loaderror").subscribe(
      (res) => {
        //alert("loaderror in response section")
        //checkPaymentStatus(txnId);
        //ref.close();
      },
      (err) => {
        // //alert("loaderror in error section")
        // ref.close();
      }
    );

    ref.on("exit").subscribe(
      async () => {
        console.log("exxxxxxiiiitt");
        checkPaymentStatus(txnId);
        //await console.log("***************", roStatus);
      },
      (err) => {
        console.log(err);
      }
    );
    //checkPaymentStatus(txnId);

    //rosoomStatus = await closeBrowser(txnId);
    return await result;
  }

  function until(condition) {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (condition()) {
          clearInterval(interval);
          resolve();
        }
      });
      return true
    });
  }

  async function checkPaymentSuccess(url, txnId) {
  console.log('Waiting until foo reaches 1337 ...');
  await until(() => url.includes("/mobileResponseFromRosoomPaymentApp"));
  console.log('url === yes... same' );
    //if (url.includes("/mobileResponseFromRosoomPaymentApp")) {
      ref.close();
      //if(paymentCompl){
      var roStatus;
      var roStatus = await ref.on("exit").subscribe(
        async () => {
          //await console.log("***************", roStatus);
          //await checkPaymentStatus(txnId);
        },
        (err) => {
          console.log(err);
        }
      );
     
      var test = await checkPaymentStatus(txnId);
      return await test;
      // await console.log("***************^^^^^^^^", await roStatus);
      // return await roStatus;
      //}
      // return true;
   // } else {
   //   return false;
   // }
  }

   async function checkPaymentStatus(txnId) {
    var rosoomStatus;
    var rosoomPaymentStatusCheckUrl =
    apiBaseUrl.rosoomPaymentStatusCheck + txnId;
    var data = {
      url: rosoomPaymentStatusCheckUrl,
      callType: "get",
      header: {},
    };
    rosoomStatus = await HttpRequest.HttpGetRequest(data).then(
      async (result) => {
        //setReferenceNumber(result.data.data.dataItems[0].referenceNumber);
        //setPaymentFooter(true);
        var paymentStatus;
         let reference_num=result?.data?.data?.dataItems[0]?.referenceNumber
         console.log("effffffffff**(*(&(*&(&(&(*(*&(*&(*",result)
        if (result.data.data.dataItems[0].status === "SUCC") {
          console.log("suuuucceesssssss");
           paymentStatus= { status: "SUCC", reference_num: reference_num }
         // setSuccessPayment(true);
          // ClearReduxStore();
        } else if (result.data.data.dataItems[0].status === "FAIL") {
          console.log("Faaaaaaaiiiiilllllll");
          paymentStatus= { status: "FAIL", reference_num: reference_num }
          //setFailurePayment(true);
        } else {
          console.log("Pennnnddddiiinnngg");
          paymentStatus= { status: "PEND", reference_num: reference_num }
         // setPendingPayment(true);
          // ClearReduxStore();
        }
        var updatePaymentStat = await reduxActions.updatePaymentStatus(
          paymentStatus
        );
        if (updatePaymentStat) Store.dispatch(updatePaymentStat);
        return result;
      }
    );
    return rosoomStatus;
  }