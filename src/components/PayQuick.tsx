import {
  IonContent,
  IonFooter,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Icon from "./Icon";
import Payment from "./Payment";
import { useHistory } from "react-router-dom";

interface payQuickProps {
  buttonAction?: any;
  ref?: any;
}

const PayQuick: React.FC<payQuickProps> = forwardRef(
  ({ buttonAction }, ref) => {
    let history = useHistory();
    const myref = useRef();

    useEffect(() => {
      if (buttonAction === "payment") {
        // onContinue();
        console.log("payment");
      }
    }, [buttonAction]);

    useImperativeHandle(ref, () => ({
      async payNow() {
        var test: any = myref.current;
        if (myref.current) {
          test.openRosoom();
        }
      },
    }));

    var allPayableDetails = history.location.state;
    console.log(allPayableDetails);
    return (
      <IonPage className="BookTruck-Location">
        <IonContent>
          <div className="book-quick">
            <Payment
              allPayableDetails={allPayableDetails}
              buttonAction={buttonAction}
              ref={myref}
            />
          </div>
        </IonContent>
      </IonPage>
    );
  }
);
export default PayQuick;
