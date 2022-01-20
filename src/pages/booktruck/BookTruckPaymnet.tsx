import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import BlueFooter from "../../components/Footer/BlueFooter";
import Footer from "../../components/Footer/Footer";
import Payment from "../../components/Payment";
import PayQuick from "../../components/PayQuick";
import Store from "../../redux/Store";
import CenterFooterButton from "../CenterFooterButton";

export default function BookTruckPaymnet(props) {
  var history = useHistory();
  var allPayableDetails = props?.history?.location?.state;
  const [screen, setscreen] = useState<any>({});

  useEffect(() => {
    setscreen(Store.getState().VariableValues.paymentStatus);
    console.log("calling store", screen);
  }, []);

  Store.subscribe(() => {
    setscreen(Store.getState().VariableValues.paymentStatus);
    console.log(
      Store.getState().VariableValues.paymentStatus,
      "calling store",
      screen
    );
  });
  const myref = useRef();

  const handleOnClick = () => {
    console.log("0000000", myref);
    var test: any = myref.current;
    if (myref.current) {
      test.openRosoom();
    }
  };
  return (
    <IonPage className="BookTruck-Location">
      <IonContent>
        <Payment
          allPayableDetails={allPayableDetails?.payment}
          //buttonAction={buttonAction}
          ref={myref}
        />
        {screen.status !== "" && (
          <CenterFooterButton
            iconType="menu"
            clickEvent={() => history.push("/tabs/landing")}
          />
        )}
      </IonContent>
      {screen.status === "" ? (
        <BlueFooter
          onBlueFooterClick={handleOnClick}
          footerLabel={` PAY AED ${allPayableDetails?.payment.grossAmount} `}
        />
      ) : (
        <Footer />
      )}
    </IonPage>
  );
}
