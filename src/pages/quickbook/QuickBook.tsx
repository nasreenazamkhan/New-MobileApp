import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
} from "@ionic/react";
import { arrowForwardOutline } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { Redirect, Route, useHistory } from "react-router";
import BookQuick from "../../components/BookQuick";
import Header from "../../components/Header";
import PayQuick from "../../components/PayQuick";
import TxtInput from "../../components/txtinput/TxtInput";
import {
  updateAddress,
  updatePaymentStatus,
} from "../../redux/actions/AllActions";
import Store from "../../redux/Store";

import "./QuickBook.scss";
const QuickBook = (props) => {
  const [buttonState, setbuttonState] = useState("");
  var history = useHistory();

  const [screen, setscreen] = useState<any>(
    Store.getState().VariableValues.paymentStatus
  );

  useEffect(() => {
    updatePayStatus();
    setscreen(Store.getState().VariableValues.paymentStatus);
  }, []);

  Store.subscribe(() => {
    setscreen(Store.getState().VariableValues.paymentStatus);
    // console.log(
    //   Store.getState().VariableValues.paymentStatus,
    //   "calling storeee",
    //   screen
    // );
  });
  const bookref = useRef();
  const payref = useRef();

  function onContinue() {
    if (props.location.pathname === "/quickBook/book") {
      setbuttonState("book");
      var test: any = bookref.current;
      console.log(bookref);
      if (bookref.current) {
        test.gotoPaymentDiscPage();
        console.log("09090909");
      }

      console.log("00000");
    } else if (props.location.pathname === "/quickBook/payment")
      setbuttonState("payment");
    var test: any = payref.current;
    if (payref.current) {
      test.payNow();
    }
  }

  function goToHome() {
    history.push("/tabs/landing");
  }

  function updatePayStatus() {
    var paymentStatus = { status: "", reference_num: "0" };
    var paymentSta = updatePaymentStatus(paymentStatus);
    if (paymentSta) Store.dispatch(paymentSta);
    console.log("^^^^^^^^^^^", screen);
  }
  return (
    <IonPage className="quick-book-page">
      {/* <Header label="QuickBook" action="home" /> */}
      <Header
        label="Quick Book"
        action="home"
        showAgent={true}
        agentHeader={true}
      />
      <IonContent className="quick-book-content">
        <div className="form-div">
          <IonTabs
            className="declaration-tab"
            onIonTabsDidChange={() => updatePayStatus()}
          >
            <IonRouterOutlet>
              <Redirect exact path="/quickBook" to="/quickBook/book" />
              <Route
                path="/quickBook/book"
                render={() => (
                  <BookQuick buttonAction={buttonState} ref={bookref} />
                )} //}
                exact={true}
              />
              <Route
                path="/quickBook/payment"
                render={() => (
                  <PayQuick buttonAction={buttonState} ref={payref} />
                )}
                exact={true}
              />
            </IonRouterOutlet>
            <IonTabBar slot="top">
              <IonTabButton
                tab="location"
                href="/quickBook/book"
                className="quick-tabButton"
                disabled={props.location.pathname === "/quickBook/payment"}
              >
                <IonLabel>Book</IonLabel>
              </IonTabButton>

              <IonTabButton
                tab="Payment"
                href="/quickBook/payment"
                className="quick-tabButton"
                disabled={props.location.pathname === "/quickBook/book"}
              >
                <IonLabel>Payment</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          {/* {screen.status === "" && ( */}
          {(props.location.pathname === "/quickBook/book" ||
            props.location.pathname === "/quickBook/payment") &&
            screen.status === "" && (
              <div className="button-div">
                <div className="button-holder" onClick={() => onContinue()}>
                  <IonIcon slot="icon-only" icon={arrowForwardOutline} />
                </div>
              </div>
            )}

          {screen.status !== "" && (
            <div className="button-div">
              <div className="button-holder" onClick={() => goToHome()}>
                {/* {buttonState !== "payment" && buttonState !== "book" && (
                  <IonIcon slot="icon-only" icon={arrowForwardOutline} />
                )}
                {buttonState === "payment" && ( */}
                <IonIcon src="assets/icon/home-new.svg" className="button" />
                {/* )} */}
              </div>
            </div>
          )}
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default QuickBook;
