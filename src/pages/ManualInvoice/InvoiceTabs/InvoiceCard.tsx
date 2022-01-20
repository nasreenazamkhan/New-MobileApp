import { SocialSharing } from "@ionic-native/social-sharing";
import { IonCol, IonGrid, IonIcon, IonLabel, IonRow } from "@ionic/react";
import React from "react";
import Icon from "../../../components/Icon";
import { HttpGetRequest } from "../../../services/HttpsServices";
import "./InvoiceTabs.scss";

interface InvoiceCardProps {
  item;
}

const uploadIcon = {
  name: "upload-quick",
  slot: "",
  class: "zoom2",
  styleProps: { transform: " rotateX(180deg)" },
};
const InvoiceCard: React.FC<InvoiceCardProps> = ({ item }) => {
  console.log(item);
  function downloadDTInvoice(item: any, heading: string, subheading: any) {
    console.log(item);
    SocialSharing.share(
      heading,
      subheading + item.bookingReferenceNumber,
      "data:application/pdf;base64," + item.invoicePdfContent,
      null
    );
  }

  function downloadSupportingDoc(item: any, heading: string, subheading: any) {
    console.log(item);
    SocialSharing.share(
      heading,
      subheading + item.fileName,
      "data:application/" +
        item.fileName.split(".")[1] +
        ";base64," +
        item.fileContent,
      null
    );
  }
  return (
    <div className="invoice-card-cont">
      <IonRow>
        <IonCol size="4" className="gray-text">
          Invoice Number
        </IonCol>
        <IonCol size="4" className="gray-text">
          Invoice Date
        </IonCol>
        <IonCol size="4" className="gray-text">
          Vat Amount
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="4" className="black-text">
          <IonLabel>{item.invoiceNumber}</IonLabel>
        </IonCol>
        <IonCol size="4" className="black-text">
          <IonLabel>{item.invoiceDate}</IonLabel>
        </IonCol>
        <IonCol size="4" className="black-text">
          <IonLabel>{item.vatAmount}</IonLabel>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol></IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="4" className="gray-text">
          Invoice Amount
        </IonCol>
        <IonCol size="4" className="gray-text">
          Description
        </IonCol>
        <IonCol size="4" className="gray-text">
          Status
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="4" className="black-text">
          <IonLabel>{item.invoiceAmount}</IonLabel>
        </IonCol>
        <IonCol size="4" className="black-text">
          <IonLabel>{item.description}</IonLabel>
        </IonCol>
        <IonCol size="4" className="black-text">
          <IonLabel>{item.paymentStatus}</IonLabel>
        </IonCol>
      </IonRow>

      <IonRow className="parent">
        <IonCol
          className="child"
          onClick={() =>
            downloadDTInvoice(item, "DT invoice Receipt", "invoice-Receipt-")
          }
        >
          <div>
            {" "}
            <Icon iconProps={uploadIcon} />
          </div>
          <IonCol className="file-name"> Download Invoice</IonCol>
        </IonCol>
        {item.invoiceDocs.map((element, index) => (
          <IonCol
            className="child"
            key={index}
            onClick={() =>
              downloadSupportingDoc(
                element,
                "Supporting Documents",
                "supporting doc"
              )
            }
          >
            <div>
              {" "}
              <Icon iconProps={uploadIcon} />
            </div>
            <IonCol className="file-name"> Supporting docs</IonCol>
          </IonCol>
          // <div className="child">
          //   <div>
          //     {" "}
          //     <Icon iconProps={uploadIcon} />
          //   </div>
          //   <div className="file-name"> {element.fileName}</div>
          // </div>
        ))}
      </IonRow>
    </div>
  );
};
export default InvoiceCard;
