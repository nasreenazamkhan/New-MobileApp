import {
  IonCol,
  IonContent,
  IonFooter,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BlueFooter from "../../../../components/Footer/BlueFooter";
import Footer from "../../../../components/Footer/Footer";
import { updatePaymentStatus } from "../../../../redux/actions/AllActions";
import Store from "../../../../redux/Store";
import { createArrayOfObjectWithKeyAndValue } from "../../../../services/Common";
import {
  getInvoiceDetails,
  payManualInvoice,
} from "../../../../services/EndPointApi";
import { postToExternalSite } from "../../../../services/PaymentService";
import CenterFooterButton from "../../../CenterFooterButton";
import Fail from "../../../PaymentStatus/Fail";
import Pending from "../../../PaymentStatus/Pending";
import Success from "../../../PaymentStatus/Success";
import InvoiceCard from "../InvoiceCard";

interface ManualInvoiceProps {
  InvoiceDetails;
}

const ManualInvoice: React.FC<ManualInvoiceProps> = ({ InvoiceDetails }) => {
  let history: any = useHistory();
  const [invoiceList, setinvoiceList] = useState<any>({});
  const [screen, setscreen] = useState<any>({});
  useEffect(() => {
    getAllInvoice();
  }, []);

  async function getAllInvoice() {
    var paymentStatus = { status: "", reference_num: "0" };
    var paymentSta = updatePaymentStatus(paymentStatus);
    if (paymentSta) Store.dispatch(paymentSta);
    var resp = await getInvoiceDetails(InvoiceDetails.bookingNumber);
    if (resp?.success) {
      setinvoiceList(resp.data.data.dataItems[0]);
    }
  }
  Store.subscribe(() => {
    setscreen(Store.getState().VariableValues.paymentStatus);
  });
  async function payAmount() {
    var resp = await payManualInvoice(invoiceList);
    if (resp?.success) {
      postToExternalSite(
        resp?.data?.data?.dataItems[0]?.url,
        resp?.data?.data?.dataItems[0]?.transactionId
      );
    }
  }

  return (
    <IonPage className="BookTruck-Location">
      <IonContent>
        {screen.status === "" && (
          <div className="invoice-book-container componentMargins">
            <IonRow>
              <IonCol>
                <IonLabel className="bold-font">Total Amount paid</IonLabel>
              </IonCol>
              <IonCol class="ion-text-end1">
                <IonLabel className="bold-font">
                  {invoiceList.paidAmount} AED
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonLabel className="bold-font">Amount to be paid</IonLabel>
              </IonCol>
              <IonCol class="ion-text-end1">
                <IonLabel className="bold-font">
                  {invoiceList.unpaidAmount} AED
                </IonLabel>
              </IonCol>
            </IonRow>
            {invoiceList.invoiceList?.map((item, index) => (
              <div
                key={index}
                className={index !== 0 ? "invoicecard-cont" : ""}
              >
                <InvoiceCard item={item} />
              </div>
            ))}
          </div>
        )}
        {screen.status === "SUCC" && <Success txnId={screen.reference_num} />}
        {screen.status === "FAIL" && <Fail txnId={screen.reference_num} />}
        {screen.status === "PEND" && <Pending txnId={screen.reference_num} />}
        {(invoiceList.unpaidAmount < 1 ||
          screen.status === "SUCC" ||
          screen.status === "FAIL" ||
          screen.status === "PEND") && (
          <CenterFooterButton
            iconType="menu"
            clickEvent={() => history.push("/tabs/landing")}
          />
        )}
      </IonContent>

      {invoiceList.unpaidAmount < 1 ||
      screen.status === "SUCC" ||
      screen.status === "FAIL" ||
      screen.status === "PEND" ? (
        <Footer />
      ) : (
        <BlueFooter
          onBlueFooterClick={() => payAmount()}
          footerLabel="PAY AMOUNT"
        />
      )}
    </IonPage>
  );
};
export default ManualInvoice;
