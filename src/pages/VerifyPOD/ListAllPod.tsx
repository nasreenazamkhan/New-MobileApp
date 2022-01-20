import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonLabel,
  IonCol,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import InformationText from "../../components/InformationText";
import { getAllPods } from "../../services/EndPointApi";
import "./ListAllPod.scss";
import SLAExpire from "./SLAExpire";

export default function ListAllPod() {
  let history = useHistory();
  const [podList, setpodList] = useState<any>([]);
  useEffect(() => {
    getAllPod("option=ALL&statusCode=PODUPL&pgNo=0&pgSize=5&locale=en");
  }, []);

  async function getAllPod(param) {
    let res = await getAllPods(param);
    setpodList(res?.data?.elements);
  }
  var containerIcon = {
    name: "container",
    slot: "",
    class: "zoom24",
  };
  var truckIcon = {
    name: "truck-grey",
    slot: "",
    class: "zoom24",
  };

  function gotoPodDetails(item) {
    history.push("/tabs/status/pod/podDetails", item);
  }

  return (
    <IonPage id="booking-page">
      <Header
        label="Verify POD"
        action="home"
        agentHeader={true}
        // searchClick={this.onSearchClick}`Share ${speaker.name}`
      />
      <IonContent>
        <InformationText message={`${podList?.length || 0} containers`} />

        {podList?.map((item, index) => (
          <div
            id="booking-card"
            key={index}
            onClick={() => gotoPodDetails(item)}
          >
            <IonCard className="lightShadow">
              <IonCardContent className="card-content">
                <IonRow>
                  <IonCol size="5">
                    <IonText className="booking-number-font">
                      {item.bookingNumber}
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
                        {item.noOfContainers}
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
                      <IonText className="data-font">{item.noOfTrucks}</IonText>
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
                        {item.totalAmount * 1 - item.amountPaid * 1} AED
                      </IonText>
                    </IonRow>
                  </IonCol>
                  <IonCol size="5">
                    <IonRow>
                      <IonText className="regular-font">Booked On</IonText>
                    </IonRow>
                    <IonRow>
                      <IonText className="data-font">{item.bookedOn}</IonText>
                    </IonRow>
                  </IonCol>
                  <IonCol size="2"></IonCol>
                </IonRow>
                <IonRow className="sla">
                  <IonCol>
                    <IonRow>
                      No. of POD's : <div>01</div>
                    </IonRow>
                  </IonCol>

                  <IonCol>
                    {" "}
                    <SLAExpire
                      expiryDate={item.verifyPodBy}
                      verifyPodTime={item.verifyPodTime}
                    />
                  </IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
}
