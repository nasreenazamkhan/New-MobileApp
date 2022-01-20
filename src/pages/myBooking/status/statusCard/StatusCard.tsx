import React, { useState } from "react";
import {
  IonText,
  IonRow,
  IonCard,
  IonCol,
  IonCardContent,
  IonIcon,
} from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";
import "../statusCard/StatusCard.scss";

interface MenuParam {
  type: string;
  total: string;
  handleClick?(e: any): void;
}

const StatusCard: React.FC<MenuParam> = (MenuParam) => {
  const [] = useState();

  return (
    <>
      <IonRow id="status-card">
        <IonCol className="booking-card">
          <IonCard className="lightShadow" onClick={MenuParam.handleClick}>
            <IonCardContent className="booking-card-content">
              <IonRow className="booking-row">
                <IonCol size="8" className="ion-align-self-center">
                  <div className="ion-float-left">
                    <IonText className="booking-menu-type">
                      {MenuParam.type}
                    </IonText>{" "}
                  </div>
                </IonCol>
                <IonCol size="2" className="ion-align-self-center">
                  <div className="ion-float-right">
                    <IonText className="booking-menu-total">
                      {MenuParam.total || "00"}
                    </IonText>{" "}
                  </div>
                </IonCol>
                <IonCol size="2" className="ion-align-self-center">
                  <div>
                    <IonIcon
                      className="booking-menu-icon"
                      icon={chevronForwardOutline}
                      slot="icon-only"
                    ></IonIcon>{" "}
                  </div>
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </>
  );
};

export default React.memo(StatusCard);
