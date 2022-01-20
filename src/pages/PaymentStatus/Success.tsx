import { SocialSharing } from "@ionic-native/social-sharing";
import { IonButton, IonLabel } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";
import Icon from "../../components/Icon";
import { HttpGetRequest } from "../../services/HttpsServices";
import { downloadReceipt, downloadTaxInvoice } from "../../util/EndPointURL";
import "./PaymentStatus.scss";

interface SuccessProps {
  txnId: any;
}

const Success: React.FC<SuccessProps> = ({ txnId }) => {
  var history = useHistory();
  var successIconProps = {
    name: "success",
    class: "zoom84",
  };

  function openDownloadForm(bookingNumber: string) {
    var data = {
      url: downloadReceipt + bookingNumber,
      callType: "get",
      header: {},
    };
    HttpGetRequest(data).then((result) => {
      if (result.success) {
        SocialSharing.share(
          "Your Payment Receipt",
          "Booking-Receipt-" + bookingNumber,
          "data:application/pdf;base64," + result.data,
          null
        );
      }
    });
  }

  function openReceiptForm(bookingNumber: string) {
    var data = {
      url: downloadTaxInvoice + bookingNumber,
      callType: "get",
      header: {},
    };
    HttpGetRequest(data).then((result) => {
      if (result.success) {
        SocialSharing.share(
          "Your Tax Invoice Receipt",
          "Booking-Receipt-" + bookingNumber,
          "data:application/pdf;base64," + result.data,
          null
        );
      }
    });
  }
  return (
    <div className="success-container">
      <div className="content">
        <div className="icon-container">
          <Icon iconProps={successIconProps} />
        </div>
        <div className="successLabel">Your Payment is Successful</div>
        <div className="sub-label">
          An Email confirmation will be send to you shortly with booking details
        </div>
        <div className="booking-label">
          {" "}
          <IonLabel> Booking number #{txnId}</IonLabel>
        </div>
        <div className="sub-label">
          Check your{" "}
          <IonLabel
            className="underLine-label"
            onClick={() => history.push("/tabs/status")}
          >
            Booking Status
          </IonLabel>
          here
        </div>
        <div
          className="button-outline"
          onClick={() => openDownloadForm("props.referenceNumber")}
        >
          <div className="button-label">Download Receipt</div>
        </div>
        <br />
        <div
          className="button-outline"
          onClick={() => openReceiptForm("props.referenceNumber")}
        >
          <div className="button-label">Tax Invoice</div>
        </div>
      </div>
    </div>
  );
};
export default Success;
