import { SocialSharing } from "@ionic-native/social-sharing";
import { IonLabel } from "@ionic/react";
import React from "react";
import {
  getBookingReciptForm,
  getTaxReciptForm,
} from "../../services/EndPointApi";
import "./DownloadReciept.scss";

interface downlaodReceipt {
  bookingReference?: any;
  click?: any;
}
const DownloadReciept: React.FC<downlaodReceipt> = ({
  bookingReference,
  click,
}) => {
  async function downloadTax(form) {
    let resp;
    if (form === "Tax") {
      resp = await getTaxReciptForm(bookingReference);
    } else if (form === "Booking") {
      resp = await getBookingReciptForm(bookingReference);
    }
    if (resp) {
      click();
      SocialSharing.share(
        "Your Payment Receipt",
        form + "-Receipt-" + bookingReference,
        "data:application/pdf;base64," + resp.data,
        null
      );
    }
  }
  return (
    <div className="download-limk-container">
      <div className="each-link" onClick={() => downloadTax("Tax")}>
        <IonLabel>Download Tax Invoice</IonLabel>
      </div>
      <div className="each-link" onClick={() => downloadTax("Booking")}>
        <IonLabel>Download Booking Invoice</IonLabel>
      </div>

      <div></div>
    </div>
  );
};
export default DownloadReciept;
