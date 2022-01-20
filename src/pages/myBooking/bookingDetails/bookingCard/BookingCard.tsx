import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCol,
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
import RoundedAvatar from "../../../../components/Avatar/RoundedAvatar";
import { postToExternalSite } from '../../../../services/PaymentService';
import Store from "../../../../redux/Store";
import Success from "../../../PaymentStatus/Success";
import Fail from "../../../PaymentStatus/Fail";
import Pending from "../../../PaymentStatus/Pending";

import {
  updateDRaftsPopupInHome,
  updatePaymentStatus,
} from "../../../../redux/actions/AllActions";

interface MyBookingParam {
  bookingNumber?: string;
  amount?: string;
  bookedOn?: string;
  noOfContainers?: any;
  // countTitle?: string;
  clickCard?(e: any): void;
  paymentClick?(e: any): void;
  yard?: string;
  town?: string;
  status: string;
  delivered: string;
  completed: string;
  paymentStatus: string;
  noOfTrucks?: string;
}

const BookingCard: React.FC<MyBookingParam> = (MyBookingParam) => {
  const [paymentPage, setPaymentPage] = useState("");
  var ref;
  var txnIds;
  var options = "zoom=no,footer=no,location=no";

  // const [screen, setscreen] = useState<any>({});

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

  async function paymentInfo(bookingNumber) {
    console.log("paymentInfo", bookingNumber);
    var appUrl = EndPointURL.reinitializeUrl + bookingNumber;
    var response = await httpPostCallWithoutHeaderAndBody(appUrl);
    if (await response.success) {
      var url = await response.data.data.dataItems[0].url;
      var txnId = await response.data.data.dataItems[0].transactionId;
      await postToExternalSite(url, txnId);
      
    }
    
    // let paymentStatus = updatePaymentStatus({ status: "SUCC", reference_num: 1234546789 });
    // Store.dispatch(paymentStatus)
  }

  return (
    <div>
    {/* {screen.status === "" && ( */}
    <div id="booking-card">
      <IonCard className="lightShadow">
        <IonCardContent className="card-content" onClick={MyBookingParam.clickCard}>
          <IonRow>
            <IonCol size="5">
              <IonText className="booking-number-font">
                {MyBookingParam?.bookingNumber}
              </IonText>
            </IonCol>
            <IonCol size="1">
              <IonIcon
                src="/assets/icon/container.svg"
                className="container-icon"
              />
            </IonCol>
            <IonCol size="3" className="padding-left">
              <IonRow>
                <IonText className="data-font">
                  {(MyBookingParam?.noOfContainers + "").padStart(2, "0") ?? 0}
                </IonText>
              </IonRow>
              <IonRow>
                <IonText className="title-font">Containers</IonText>
              </IonRow>
            </IonCol>
            <IonCol size="1">
              <IonIcon
                src="/assets/icon/truck-grey.svg"
                className="container-icon"
              />
            </IonCol>
            <IonCol size="2" className="padding-left">
              <IonRow>
                <IonText className="data-font">
                  {(MyBookingParam?.noOfTrucks + "").padStart(2, "0") ?? 0}
                </IonText>
              </IonRow>
              <IonRow>
                <IonText className="title-font">Trucks</IonText>
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <IonRow>
                <IonText className="regular-font">Amount Paid</IonText>
              </IonRow>
              <IonRow>
                <IonText className="data-font">
                  {MyBookingParam?.amount} AED
                </IonText>
              </IonRow>
            </IonCol>
            <IonCol size="5">
              <IonRow>
                <IonText className="regular-font">Booked On</IonText>
              </IonRow>
              <IonRow>
                <IonText className="data-font">
                  {MyBookingParam?.bookedOn}
                </IonText>
              </IonRow>
            </IonCol>
            <IonCol size="2">
              <IonRow className="ion-justify-content-center">
                {MyBookingParam?.paymentStatus !== "PPAY" &&
                MyBookingParam?.paymentStatus !== "FPAY" ? (
                  <IonIcon
                    className="booking-receipt-icon"
                    src="assets/icon/document-share.svg"
                    onClick={(e) => {
                      openReceiptForm(MyBookingParam?.bookingNumber);
                    }}
                  />
                ) : (
                  <IonIcon
                    className="booking-receipt-icon"
                    src="assets/icon/document-share-disable.svg"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                )}
              </IonRow>
            </IonCol>
          </IonRow>
        </IonCardContent>
        {(MyBookingParam?.paymentStatus === "TRANSCONF" ||
          MyBookingParam?.paymentStatus === "STARTED") && (
          <IonCardContent className="container-status-row">
            <IonRow>
              <IonCol size="4">
                <IonRow>
                  <IonCol size="8">In Progress</IonCol>
                  <IonCol size="4">
                    <div
                      className="avatar"
                      style={{ backgroundColor: "#FF9F5F" }}
                    >
                      {(
                        MyBookingParam?.town +
                        MyBookingParam?.yard +
                        ""
                      ).padStart(2, "0") ?? 0}
                    </div>
                  </IonCol>
                </IonRow>
              </IonCol>
              <IonCol size="4">
                <IonRow>
                  <IonCol size="8" style={{ paddingLeft: "15px" }}>
                    Delivered
                  </IonCol>
                  <IonCol size="4">
                    <div
                      className="avatar"
                      style={{ backgroundColor: "#76BD7D" }}
                    >
                      {(MyBookingParam?.delivered + "").padStart(2, "0") ?? 0}
                    </div>
                  </IonCol>
                </IonRow>
              </IonCol>
              <IonCol size="4">
                <IonRow>
                  <IonCol size="8" style={{ paddingLeft: "15px" }}>
                    Completed
                  </IonCol>
                  <IonCol size="4">
                    <div
                      className="avatar"
                      style={{ backgroundColor: "#168FE4" }}
                    >
                      {(MyBookingParam?.completed + "").padStart(2, "0") ?? 0}
                    </div>
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
          </IonCardContent>
        )}
        {MyBookingParam?.paymentStatus === "FPAY" && (
          <IonCardContent className="payment-fail-card-content">
            <IonRow>
              <IonCol size="1">
                <RoundedAvatar color={"#E91818"} bookingCard={true} />
              </IonCol>
              <IonCol size="7">
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
        {MyBookingParam?.paymentStatus === "PPAY" && (
          <IonCardContent className="payment-pending-card-content">
            <IonRow>
              <IonCol size="1">
                <RoundedAvatar color={"#FFB200"} bookingCard={true} />
              </IonCol>
              <IonCol>
                <IonLabel className="payment-text">
                  Waiting for Payment confirmation
                </IonLabel>
              </IonCol>
            </IonRow>
          </IonCardContent>
        )}
        {MyBookingParam?.paymentStatus === "completed" && (
          <IonCardContent className="payment-pending-card-content">
            <IonRow>
              <IonCol size="1">
                <RoundedAvatar color={"#1360D2"} bookingCard={true} />
              </IonCol>
              <IonCol>
                <IonLabel className="payment-text">MT IN Delivered</IonLabel>
              </IonCol>
            </IonRow>
          </IonCardContent>
        )}
        {MyBookingParam?.paymentStatus === "SUCC" && (
          <IonCardContent className="payment-pending-card-content">
            <IonRow>
              <IonCol size="1">
                <RoundedAvatar color={"#FFC350"} bookingCard={true} />
              </IonCol>
              <IonCol>
                <IonLabel className="payment-text">
                  Transporter Pending
                </IonLabel>
              </IonCol>
            </IonRow>
          </IonCardContent>
        )}
      </IonCard>
    </div>
  
    {/* )} */}
    {/* {screen.status === "SUCC" && <Success txnId={screen.reference_num} />}
    {screen.status === "FAIL" && <Fail txnId={screen.reference_num} />}
    {screen.status === "PEND" && <Pending txnId={screen.reference_num} />} */}
    </div>
    );
};

export default React.memo(BookingCard);
