import React, { useState } from "react";
import Icon from "../../components/Icon";
import { updatePaymentStatus } from "../../redux/actions/AllActions";
import Store from "../../redux/Store";
import { reInitializePayment } from "../../services/EndPointApi";
import { postToExternalSite } from "../../services/PaymentService";
import "./PaymentStatus.scss";
import Pending from "./Pending";
import Success from "./Success";

interface FailProps {
  txnId;
}

const Fail: React.FC<FailProps> = ({ txnId }) => {
  const failIconProps = { name: "error", class: "zoom84" };
  const [screen, setscreen] = useState<any>({});

  Store.subscribe(() => {
    setscreen(Store.getState().VariableValues.paymentStatus);
    console.log(
      Store.getState().VariableValues.paymentStatus,
      "calling store",
      screen
    );
  });

  async function retryPayment() {
    var paymentStatus = { status: "", reference_num: "0" };
    var paymentSta = updatePaymentStatus(paymentStatus);
    if (paymentSta) Store.dispatch(paymentSta);
    var response = await reInitializePayment(txnId);
    if (response?.success) {
      console.log(response);
      postToExternalSite(
        response.data.data.dataItems[0].url,
        response?.data?.data?.dataItems[0]?.transactionId
      );
    } else {
      // setErrors({
      //   ...errors,
      //   general:
      //     response.data.message || response.data.data.dataItems[0].error,
      // });
    }
  }
  return (
    <div className="fail-container">
      <div className="content">
        <div className="icon-container">
          {" "}
          <Icon iconProps={failIconProps} />
        </div>
        <div className="failLabel">Payment Failed!</div>
        <div className="sub-label">
          Unfortunately, we encounter an error while processing your payment for
          the booking. Any amount deducted from your account will be refund in 3
          to 5 business days
        </div>
        <div className="booking-label">
          {" "}
          Please check your payment details and try again.
        </div>
        <div className="button-outline" onClick={() => retryPayment()}>
          <div className="button-label">Try Again</div>
        </div>
      </div>

      {screen.status === "SUCC" && <Success txnId={screen.reference_num} />}
      {screen.status === "FAIL" && <Fail txnId={screen.reference_num} />}
      {screen.status === "PEND" && <Pending txnId={screen.reference_num} />}
    </div>
  );
};
export default Fail;
