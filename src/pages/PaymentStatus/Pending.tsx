import { IonLabel } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";
import Icon from "../../components/Icon";

interface PendingProps {
  txnId;
}

const Pending: React.FC<PendingProps> = ({ txnId }) => {
  var history = useHistory();
  var pendingIconProps = {
    name: "pending",
    class: "zoom84",
  };
  return (
    <div className="pending-container">
      <div className="content">
        <div className="icon-container">
          <Icon iconProps={pendingIconProps} />
        </div>
        <div className="pendingLabel">Payment Pending!</div>
        <div className="sub-label">
          Please note it may take up to 10 minutes for completing the
          transaction.
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
      </div>
    </div>
  );
};
export default Pending;
