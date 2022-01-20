import {
  IonCol,
  IonContent,
  IonFooter,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { searchOutline, navigateOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import BookQuick from "../../../components/BookQuick";
import Header from "../../../components/Header";
import Invoice from "../Invoice";
import InvoiceBooking from "./Tabs/InvoiceBooking";
import "./InvoiceTabs.scss";
import BlueFooter from "../../../components/Footer/BlueFooter";
import ManualInvoice from "./Tabs/ManualInvoice";
import Footer from "../../../components/Footer/Footer";
import CenterFooterButton from "../../CenterFooterButton";
import { addPreZero } from "../../../services/Common";
import { updateInvoiceHeader } from "../../../redux/actions/AllActions";
import Store from "../../../redux/Store";

export default function InvoiceTabs(props) {
  const [invoiceHead, setinvoiceHead] = useState<any>({});
  //let history = useHistory();
  const invoiceDetails: any = props.history.location.state; //history.location.state;
  useEffect(() => {
    var invoiceHeader = {
      noOfContainers: invoiceDetails?.noOfContainers,
      noOfTrucks: invoiceDetails?.noOfTrucks,
      unpaidAmount: invoiceDetails?.unpaidAmount,
      bookingNumber: invoiceDetails?.bookingNumber,
    };
    var updateInvoiceHead = updateInvoiceHeader(invoiceHeader);
    if (updateInvoiceHead) Store.dispatch(updateInvoiceHead);
  }, []);

  Store.subscribe(() => {
    setinvoiceHead(Store.getState().VariableValues.invoiceHeader);
  });
  return (
    <IonPage className="invoice-page">
      <Header
        label={invoiceHead.bookingNumber}
        action="home"
        //searchClick={onSearchClick}
        agentHeader={true}
      />

      <IonToolbar>
        <IonRow className="container-toolbar-row">
          <IonCol size="1" className="container-col">
            <IonIcon src="/assets/icon/container.svg" />
          </IonCol>
          <IonCol size="2.8" className="padding-left">
            <IonRow>
              <IonText className="data-font">
                {addPreZero(invoiceHead.noOfContainers)}
              </IonText>
            </IonRow>
            <IonRow>
              <IonText className="title-font">Containers</IonText>
            </IonRow>
          </IonCol>
          <IonCol size="1" className="container-col">
            <IonIcon src="/assets/icon/truck-grey.svg" />
          </IonCol>
          <IonCol size="2.8" className="padding-left">
            <IonRow>
              <IonText className="data-font">
                {addPreZero(invoiceHead.noOfTrucks)}
              </IonText>
            </IonRow>
            <IonRow>
              <IonText className="title-font">Trucks</IonText>
            </IonRow>
          </IonCol>
          <IonCol size="2" className="container-col background"></IonCol>
          <IonCol size="2.4" className="container-col-amnt">
            <IonText className="amnt-text">
              {invoiceHead.unpaidAmount}AED
            </IonText>
          </IonCol>
        </IonRow>
      </IonToolbar>

      <IonContent>
        <IonTabs
          className="manual-invoice-tab"
          onIonTabsDidChange={() => console.log(2323223)}
        >
          <IonRouterOutlet>
            <Redirect exact path="/invoicetabs/" to="/invoicetabs/booking" />

            <Route
              path="/invoicetabs/booking"
              //component={InvoiceBooking}
              render={() => <InvoiceBooking InvoiceDetails={invoiceDetails} />}
              exact={true}
            />

            <Route
              path="/invoicetabs/manual"
              exact={true}
              render={() => <ManualInvoice InvoiceDetails={invoiceDetails} />}
            />
          </IonRouterOutlet>

          <IonTabBar slot="top">
            <IonTabButton
              tab="location"
              href="/invoicetabs/booking"
              className="invoice-button"
            >
              <IonLabel className="tab-text">Booking</IonLabel>
            </IonTabButton>

            <IonTabButton
              className="invoice-button"
              tab="explore"
              href="/invoicetabs/manual"
            >
              <IonLabel className="tab-text">MANUAL INVOICE</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonContent>
      {/* <Footer /> */}
    </IonPage>
  );
}
