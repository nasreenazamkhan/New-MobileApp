import { InAppBrowser } from "@ionic-native/in-app-browser";
import { IonLabel } from "@ionic/react";
import React, { useEffect, useState } from "react";
import UnderLinedText from "./Texts/UnderLinedText";
interface vatDetailProps {
  vatDetails;
}

const VatDetails: React.FC<vatDetailProps> = ({ vatDetails }) => {
  const [noVatnumberAlert, setNoVatnumberAlert] = useState(false);

  useEffect(() => {
    if (vatDetails?.vatNo === "") {
      setTimeout(() => {
        setNoVatnumberAlert(true);
      }, 100);
    }
  }, []);

  function openExternalBrowser() {
    InAppBrowser.create(vatDetails?.redirectionUrl, "_system");
  }

  const alertProps = {
    isShow: noVatnumberAlert,
    message: "",
    itemName: "",
    alertAction: proceedToPay,
    otherMessage:
      "VAT Number is not availabe. Do you want to proceed or complete your VAT Profile?",
    yesButtonLabel: "Complete VAT profile",
    noButtonLabel: "Yes",
    headerText: "VAT Profile",
  };

  function proceedToPay(item, actionType) {
    setNoVatnumberAlert(false);
    if (actionType) {
      openExternalBrowser();
    } else {
    }
  }

  return (
    <div>
      <UnderLinedText text="VAT Details" />
      <div className=" payment-section   ">
        <div className="paymentBreakup margin-top">
          <div className="paymentBreakupFirstRow payLabel">
            <IonLabel className="">VAT Number</IonLabel>
          </div>
          <div className="paymentBreakUprightSide ">
            <IonLabel className="payLabelLight"> {vatDetails?.vatNo}</IonLabel>
          </div>
        </div>
        <div className="paymentBreakup margin-top">
          <div className="paymentBreakupFirstRow payLabel">
            <IonLabel>Address</IonLabel>
          </div>
          <div className="paymentBreakUprightSidew">
            <div className="alignRight">
              <IonLabel className="payLabelLight">
                {vatDetails?.companyName}{" "}
              </IonLabel>
            </div>
            <div className="alignRight">
              <IonLabel className="payLabelLight">
                {" "}
                {vatDetails?.address}{" "}
              </IonLabel>
            </div>
            <div className="alignRight">
              <IonLabel className="payLabelLight">
                {" "}
                {vatDetails?.emirate}{" "}
              </IonLabel>
            </div>
            <div className="alignRight">
              <IonLabel className="payLabelLight">
                {" "}
                {vatDetails?.country}
              </IonLabel>
            </div>
            <div className="alignRight">
              <IonLabel className="payLabelLight">
                {vatDetails?.mobileNumber}
              </IonLabel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VatDetails;
