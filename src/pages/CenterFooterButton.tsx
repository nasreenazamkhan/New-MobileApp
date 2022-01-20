import { IonIcon } from "@ionic/react";
import React from "react";
import { connect } from "react-redux";
import CartNumber from "../components/CartNumber";
import "./CenterFooterButton.scss";

interface CenterFooterButtonProps {
  iconType;
  clickEvent?: () => void;
  numberOfSelectedContainers;
}

const CenterFooterButton: React.FC<CenterFooterButtonProps> = ({
  iconType,
  clickEvent,
  numberOfSelectedContainers,
}) => {
  return (
    <div
      className="menu-button-div"
      onClick={() => {
        if (numberOfSelectedContainers.cartNumber > 0 || iconType === "menu")
          clickEvent();
      }}
    >
      <div className="menu-button">
        {iconType === "menu" ? (
          <>
            <hr />
            <hr />
            <hr />
          </>
        ) : (
          iconType === "cart" && (
            <>
              <IonIcon
                src="assets/icon/container-crane.svg"
                className="button"
              />
              <CartNumber />
            </>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    numberOfSelectedContainers: state.VariableValues,
  };
};

export default connect(mapStateToProps)(CenterFooterButton);
