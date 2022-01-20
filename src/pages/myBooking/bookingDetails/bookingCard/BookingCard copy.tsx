import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import { SocialSharing } from "@ionic-native/social-sharing";
import * as EndPointURL from "../../../../util/EndPointURL";
import {
  httpGetCallWithoutHeader,
  httpPostCallWithoutHeaderAndBody,
} from "../../../../services/EndPointApi";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import "./BookingCard.scss";

interface MyBookingParam {
  bookingNumber?: string;
  amount?: string;
  createOn?: string;
  count?: string;
  countTitle?: string;
  clickCard?(e: any): void;
  paymentClick?(e: any): void;
  totalBooking?: string;
  yard?: string;
  town?: string;
  status: string;
  dilivered: string;
  confirmed: string;
  emptyDelivered: string;
  paymentStatus: string;
}

const MyBooking: React.FC<MyBookingParam> = (MyBookingParam) => {
  const [paymentPage, setPaymentPage] = useState("");
  var ref;
  var txnIds;
  var options = "zoom=no,footer=no,location=no";

  const openReceiptForm = async (bookingNumber: string) => {
    let appUrl = EndPointURL.downloadReceipt + bookingNumber;
    var response = await httpGetCallWithoutHeader(appUrl);
    if (await response.success) {
      SocialSharing.share(
        "Your Payment Receipt",
        "Booking-Receipt-" + bookingNumber,
        "data:application/pdf;base64," + response.data,
        null
      );
    }
  };

  async function postToExternalSite(url, txnId) {
    txnIds = txnId;
    var paymentCompl;
    ref = InAppBrowser.create(url, "_blank", options);

    var result = ref.on("loadstop").subscribe(async (event) => {
      paymentCompl = await checkPaymentSuccess(event.url, txnId);
      if (paymentCompl) {
        return await paymentCompl;
      } else {
      }
    });

    ref.on("exit").subscribe(
      async () => {
        console.log("exxxxxxiiiitt");
        checkPaymentStatus(txnId);
      },
      (err) => {
        console.log(err);
      }
    );
    return await result;
  }

  async function checkPaymentSuccess(url, txnId) {
    if (url.includes("/mobileResponseFromRosoomPaymentApp")) {
      ref.close();
      var roStatus = await ref.on("exit").subscribe(
        async () => {},
        (err) => {
          console.log(err);
        }
      );
      var test = await checkPaymentStatus(txnId);
      return await test;
    } else {
      return false;
    }
  }

  async function checkPaymentStatus(txnId) {
    var appUrl = EndPointURL.rosoomPaymentStatusCheck + txnId;
    var response = await httpGetCallWithoutHeader(appUrl);
    if (await response.success) {
      if (response.data.data.dataItems[0].status == "SUCC") {
        await setPaymentPage("success");
        MyBookingParam.paymentClick("success");
      } else if (response.data.data.dataItems[0].status == "FAIL") {
        await setPaymentPage("fail");
        MyBookingParam.paymentClick("fail");
      } else {
        await setPaymentPage("pending");
        MyBookingParam.paymentClick("pending");
      }
      return response;
    }
    return response;
  }

  async function paymentInfo(bookingNumber) {
    var appUrl = EndPointURL.reinitializeUrl + bookingNumber;
    var response = await httpPostCallWithoutHeaderAndBody(appUrl);
    if (await response.success) {
      var url = await response.data.data.dataItems[0].url;
      var txnId = await response.data.data.dataItems[0].transactionId;
      await postToExternalSite(url, txnId);
    }
  }

  return (
    <div id="booking-card">
      {MyBookingParam?.status !== "INPRO" ? (
        <IonGrid>
          <IonCard button className="lightShadow">
            <IonCardContent
              onClick={MyBookingParam.clickCard}
              className="card-content"
            >
              <IonRow className="border-bottom-row">
                <IonCol size={MyBookingParam?.status == "PEND" ? "9" : "6"}>
                  <IonRow className="margin-top">
                    <IonText className="regular-font">Booking#</IonText>
                  </IonRow>
                  <IonRow>
                    <IonText className="data-font">
                      {MyBookingParam?.bookingNumber}
                    </IonText>
                  </IonRow>
                </IonCol>
                <IonCol
                  size="3"
                  hidden={
                    MyBookingParam?.status == "CONF" ||
                    MyBookingParam?.status == "PEND"
                  }
                >
                  <IonRow className="ion-justify-content-center">
                    <IonText className="booking-menu-total">
                      {MyBookingParam?.totalBooking}
                    </IonText>
                  </IonRow>
                  <IonRow className="ion-justify-content-center">
                    <IonText className="booking-container-status">
                      BOOKED
                    </IonText>
                  </IonRow>
                </IonCol>
                <IonCol size="3" hidden={MyBookingParam?.status != "MT_DEL"}>
                  <IonRow className="ion-justify-content-center">
                    <IonText className="booking-menu-total">
                      {MyBookingParam?.emptyDelivered}
                    </IonText>
                  </IonRow>
                  <IonRow className="ion-justify-content-center">
                    <IonText className="booking-container-status">
                      M - DELIVERED
                    </IonText>
                  </IonRow>
                </IonCol>
                <IonCol
                  size="3"
                  hidden={
                    MyBookingParam?.status == "FCL_DEL" ||
                    MyBookingParam?.status == "MT_DEL"
                  }
                >
                  <IonRow className="ion-justify-content-center">
                    <IonText className="booking-menu-total">
                      {MyBookingParam?.yard}
                    </IonText>
                  </IonRow>
                  <IonRow className="ion-justify-content-center">
                    <IonText className="booking-container-status">
                      IN YARD
                    </IonText>
                  </IonRow>
                </IonCol>
                <IonCol size="3" hidden={MyBookingParam?.status != "CONF"}>
                  <IonRow className="ion-justify-content-center">
                    <IonText className="booking-menu-total">
                      {MyBookingParam?.confirmed}
                    </IonText>
                  </IonRow>
                  <IonRow className="ion-justify-content-center">
                    <IonText className="booking-container-status">
                      CONFIRMED
                    </IonText>
                  </IonRow>
                </IonCol>
                <IonCol
                  size="3"
                  className=" ion-float-right"
                  hidden={MyBookingParam?.status != "FCL_DEL"}
                >
                  <IonRow className="ion-justify-content-center">
                    <IonText className="booking-menu-total">
                      {MyBookingParam?.dilivered}
                    </IonText>
                  </IonRow>
                  <IonRow className="ion-justify-content-center">
                    <IonText className="booking-container-status">
                      DELIVERED
                    </IonText>
                  </IonRow>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="5">
                  <IonRow>
                    <IonLabel className="regular-font">Amount Paid</IonLabel>
                  </IonRow>
                  <IonRow className="data-font">
                    <IonLabel className="date-font">
                      {MyBookingParam?.amount} AED
                    </IonLabel>
                  </IonRow>
                </IonCol>
                <IonCol size="4">
                  <IonRow>
                    <IonLabel className="regular-font">Created On</IonLabel>
                  </IonRow>
                  <IonRow className="data-font">
                    <IonLabel className="date-font">
                      {MyBookingParam?.createOn}
                    </IonLabel>
                  </IonRow>
                </IonCol>
                <IonCol>
                  <IonRow className="ion-justify-content-center">
                    <IonIcon
                      className={
                        MyBookingParam?.paymentStatus !== "SUCC"
                          ? "booking-receipt-icon-disable"
                          : "booking-receipt-icon"
                      }
                      src="assets/icon/document-share.svg"
                      onClick={(e) => {
                        if (MyBookingParam?.paymentStatus !== "SUCC")
                          e.stopPropagation();
                        else openReceiptForm(MyBookingParam?.bookingNumber);
                      }}
                    />
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonCardContent>
            {MyBookingParam?.paymentStatus == "FPAY" && (
              <IonCardContent className="payment-fail-card-content">
                <IonRow>
                  <IonCol size="8.5">
                    <IonIcon
                      className="payment-icon"
                      src="assets/icon/failed-payment.svg"
                    />
                    <IonLabel className="payment-text">Payment Failed</IonLabel>
                  </IonCol>
                  <IonCol
                    onClick={() => paymentInfo(MyBookingParam?.bookingNumber)}
                  >
                    <IonIcon
                      className="repayment-icon"
                      src="assets/icon/refresh.svg"
                    />
                    <IonLabel className="repayment-text">Re-initiate</IonLabel>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            )}
            {MyBookingParam?.paymentStatus == "PPAY" && (
              <IonCardContent className="payment-pending-card-content">
                <IonRow>
                  <IonCol>
                    <IonIcon
                      className="payment-icon"
                      src="assets/icon/pending-payment.svg"
                    />
                    <IonLabel className="payment-text">
                      Waiting for Payment confirmation
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            )}
          </IonCard>
        </IonGrid>
      ) : (
        <IonGrid>
          <IonCard className="lightShadow" button hidden={paymentPage !== ""}>
            <IonCardContent
              className="card-content"
              onClick={MyBookingParam.clickCard}
            >
              <IonRow className="border-bottom-booking">
                <IonCol size="4.5" className="ion-padding-top">
                  <IonRow>
                    <IonText className="regular-font">Booking#</IonText>
                  </IonRow>
                  <IonRow>
                    <IonText className="data-font">
                      {MyBookingParam?.bookingNumber}
                    </IonText>
                  </IonRow>
                </IonCol>
                <IonCol size="2.5">
                  <IonRow className="ion-justify-content-center">
                    <IonText className="booking-menu-total">
                      {MyBookingParam?.totalBooking}
                    </IonText>
                  </IonRow>
                  <IonRow className="ion-justify-content-center">
                    <IonText className="booking-container-status">
                      BOOKED
                    </IonText>
                  </IonRow>
                </IonCol>
                <IonCol size="2.5">
                  <IonRow className="ion-justify-content-center">
                    <IonText className="booking-menu-total">
                      {MyBookingParam?.town}
                    </IonText>
                  </IonRow>
                  <IonRow className="ion-justify-content-center">
                    <IonText className="booking-container-status">TOWN</IonText>
                  </IonRow>
                </IonCol>
                <IonCol size="2.5">
                  <IonRow className="ion-justify-content-center">
                    <IonText className="booking-menu-total">
                      {MyBookingParam?.yard}
                    </IonText>
                  </IonRow>
                  <IonRow className="ion-justify-content-center">
                    <IonText className="booking-container-status">
                      IN YARD
                    </IonText>
                  </IonRow>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4.5">
                  <IonRow>
                    <IonLabel className="regular-font">Amount Paid</IonLabel>
                  </IonRow>
                  <IonRow>
                    <IonLabel className="consigneeFont">
                      {MyBookingParam?.amount} AED
                    </IonLabel>
                  </IonRow>
                </IonCol>
                <IonCol size="5" style={{ paddingLeft: "20px" }}>
                  <IonRow>
                    <IonLabel className="regular-font ">Created On</IonLabel>
                  </IonRow>
                  <IonRow>
                    <IonLabel className="consigneeFont">
                      {MyBookingParam?.createOn}
                    </IonLabel>
                  </IonRow>
                </IonCol>
                <IonCol>
                  <IonRow className="ion-justify-content-center">
                    <IonIcon
                      className={
                        MyBookingParam?.paymentStatus !== "SUCC"
                          ? "booking-receipt-icon-disable"
                          : "booking-receipt-icon"
                      }
                      src="assets/icon/document-share.svg"
                      onClick={(e) => {
                        if (MyBookingParam?.paymentStatus !== "SUCC")
                          e.stopPropagation();
                        else openReceiptForm(MyBookingParam?.bookingNumber);
                      }}
                    />
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonCardContent>
            {MyBookingParam?.paymentStatus == "FPAY" && (
              <IonCardContent className="payment-fail-card-content">
                <IonRow>
                  <IonCol size="8.5">
                    <IonIcon
                      className="payment-icon"
                      src="assets/icon/failed-payment.svg"
                    />
                    <IonLabel className="payment-text">Payment Failed</IonLabel>
                  </IonCol>
                  <IonCol
                    onClick={() => paymentInfo(MyBookingParam?.bookingNumber)}
                  >
                    <IonIcon
                      className="repayment-icon"
                      src="assets/icon/refresh.svg"
                    />
                    <IonLabel className="repayment-text">Re-initiate</IonLabel>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            )}
            {MyBookingParam?.paymentStatus == "PPAY" && (
              <IonCardContent className="payment-pending-card-content">
                <IonRow>
                  <IonCol>
                    <IonIcon
                      className="payment-icon"
                      src="assets/icon/pending-payment.svg"
                    />
                    <IonLabel className="payment-text">
                      Waiting for Payment confirmation
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            )}
          </IonCard>
        </IonGrid>
      )}
    </div>
  );
};

export default React.memo(MyBooking);
