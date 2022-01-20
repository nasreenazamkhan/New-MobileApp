import { IonBadge, IonPopover } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Store from "../redux/Store";
import "./CartNumber.scss";
import * as reduxActions from "../redux/actionTypes/AllActionTypes";

interface stateProps {}

interface ownProps {
  numberOfContainers;
  updateCartNumber;
}

type cartNumberProps = stateProps & ownProps;
const CartNumber: React.FC<cartNumberProps> = ({
  numberOfContainers,
  updateCartNumber,
}) => {
  const [number, setnumber] = useState(0);

  useEffect(() => {
    countContainerNumberSelected(0);
  }, [numberOfContainers]);
  function countContainerNumberSelected(count) {
    setnumber(count);
    numberOfContainers.map((item, index) => {
      item.containerList.map((container) => {
        if (container.selected) {
          count++;
          setnumber(count);
          updateCartNumber(count);
          //setShowPopover({ showPopover: true, event: "" });
        } else {
          setnumber(count);
          updateCartNumber(count);
        }
      });
    });
  }
  return (
    <div>
      <IonBadge className="blueBg"> {number}</IonBadge>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    numberOfContainers: state.Cart,
  };
};

const mapDispatchToProps = () => {
  return {
    updateCartNumber: (item: any) => {
      Store.dispatch({
        type: reduxActions.UPDATE_VARIABLE,
        payLoad: { variableName: "cartNumber", value: item },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartNumber);
