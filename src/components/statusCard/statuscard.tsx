import {
  IonCard,
  IonCardContent,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
  IonLabel,
  IonGrid,
  IonItem,
} from "@ionic/react";
import React from "react";
import SLAExpire from "../../pages/VerifyPOD/SLAExpire";
import { addPreZero } from "../../services/Common";
import "./statuscard.scss";

interface statuscardProps {
  gotoDetails: (item) => void;
  item: any;
}
const Statuscard: React.FC<statuscardProps> = (statuscardProps) => {
  console.log(statuscardProps.item);
  return (
    <div
      id="booking-card"
      onClick={() => statuscardProps.gotoDetails(statuscardProps.item)}
    >
      <IonCard className="lightShadow">
        <IonCardContent className="card-content">
          <IonRow>
            <IonCol size="5">
              <IonText className="booking-number-font">
                {statuscardProps.item.bookingNumber}
              </IonText>
            </IonCol>
            <IonCol size="1">
              <IonIcon
                src="/assets/icon/container.svg"
                className="container-icon"
              />
            </IonCol>
            <IonCol size="3" className="padding-left">
              <IonRow>
                <IonText className="data-font">
                  {statuscardProps.item.noOfContainers}
                </IonText>
              </IonRow>
              <IonRow>
                <IonText className="title-font">
                  <IonLabel>Containers</IonLabel>
                </IonText>
              </IonRow>
            </IonCol>
            <IonCol size="1">
              <IonIcon
                src="/assets/icon/truck-grey.svg"
                className="container-icon"
              />
            </IonCol>
            <IonCol size="2" className="padding-left">
              <IonRow>
                <IonText className="data-font">
                  {statuscardProps.item.noOfTrucks}
                </IonText>
              </IonRow>
              <IonRow>
                <IonText className="title-font">Trucks</IonText>
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <IonRow>
                <IonText className="regular-font">Amount Paid</IonText>
              </IonRow>
              <IonRow>
                <IonText className="data-font">
                  {statuscardProps.item.amountPaid} AED
                </IonText>
              </IonRow>
            </IonCol>
            <IonCol size="5">
              <IonRow>
                <IonText className="regular-font">Booked On</IonText>
              </IonRow>
              <IonRow>
                <IonText className="data-font">
                  {statuscardProps.item.bookedOn}
                </IonText>
              </IonRow>
            </IonCol>
            <IonCol size="2"></IonCol>
          </IonRow>
          {/* <IonRow className="sla">
            <IonCol>No. of POD's : 01</IonCol>

            <IonCol>
              {" "}
              <SLAExpire
                expiryDate={statuscardProps.item.verifyPodBy}
                verifyPodTime={statuscardProps.item.verifyPodTime}
              />
            </IonCol>
          </IonRow> */}
          {statuscardProps.item.statusCode !== "STARTED" ? (
            <IonRow className="sla">
              <IonCol size="1">
                <div className="mt-dot"></div>
              </IonCol>
              <IonCol>MT IN Delivered</IonCol>
            </IonRow>
          ) : (
            <IonGrid className="sla">
              <IonRow>
                <IonCol className="same-line">
                  In progress{" "}
                  <div className="count orange">
                    {/* {statuscardProps.item.containersInYard < 10 ? 0 : ""}
                    {statuscardProps.item.containersInYard} */}
                    {addPreZero(statuscardProps.item.containersInYard)}
                  </div>
                </IonCol>
                <IonCol className="same-line">
                  Delivered{" "}
                  <div className="count green">
                    {/* {statuscardProps.item.containersDelivered < 10 ? 0 : ""}
                    {statuscardProps.item.containersDelivered} */}
                    {addPreZero(statuscardProps.item.containersDelivered)}
                  </div>
                </IonCol>
                <IonCol className="same-line">
                  Completed{" "}
                  <div className="count blue">
                    {" "}
                    {statuscardProps.item.containersCompleted < 10 ? 0 : ""}
                    {statuscardProps.item.containersCompleted}
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          )}
        </IonCardContent>
      </IonCard>
    </div>
  );
};
export default Statuscard;
