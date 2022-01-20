import {
  IonCol,
  IonContent,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import * as EndPointURL from "../../util/EndPointURL";
import {
  httpGetCallWithoutHeader,
  httpPostCallWithoutHeaderAndBody
} from "../../services/EndPointApi";
import "./Notifications.scss";
import MainTabs from "../MainTabs";
import Store from "../../redux/Store";
import Header from "../../components/Header";

export default function Notifications(props: any) {
  console.log(props);
  const [newnNotfication, setNewNotification] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [accessedNotfication, setAccessedNotfication] = useState([]);
  const [agent, setAgent] = useState();
  Store.subscribe(() => {
    setAgent(Store.getState().CheckUserStatus.user.selectedAgent);
  });

  useEffect(() => {
    var response = httpGetCallWithoutHeader(
      EndPointURL.fetchAllNotificationUrl
    );
    response.then((result) => {
      if (result.success) {
        console.log("result", JSON.stringify(result.data.data.dataItems));
        let data1 = result.data.data.dataItems.filter(
          (item) => item.accessed === "N"
        );
        console.log("data1", JSON.stringify(data1));
        setNewNotification(data1);
        let data2 = result.data.data.dataItems.filter(
          (item) => item.accessed === "Y"
        );
        console.log("data2", JSON.stringify(data2));
        setAccessedNotfication(data2);
      }
    });
  }, [agent, refresh]);

  const onNewNotificationClick = async (resId, appLink) => {
    let appUrl = EndPointURL.fetchAllNotificationUrl + "/" + resId;
    var response = await httpPostCallWithoutHeaderAndBody(appUrl);
    if (await response.success) {
      setRefresh(prev => prev+1)
      if (appLink !== null) props.history.push(appLink);
    }
  };

  return (
    <IonPage id="notifications-page">
      <Header
        label="Notifications"
        action="search"
        showAgent={true}
        agentHeader={true}
      />
      <IonContent
        padding-top
        className="page-content"
        fullscreen
        scrollEvents={true}
        scrollY={true}
      >
        <IonRow className="divider">
          <IonCol size="12" className="full-width">
            <IonRow className="sort-divider">
              <IonLabel className="data-font">New</IonLabel>
            </IonRow>
          </IonCol>
          {newnNotfication.length > 0 ? (
            newnNotfication
              .filter((item) => item.accessed === "N")
              .map((item, index) => (
                <IonCol
                  size="12"
                  className="full-width"
                  key={index}
                  onClick={() =>
                    onNewNotificationClick(
                      item.responseUuid,
                      item.appNotificationDto.appLink
                    )
                  }
                >
                  <IonRow>
                    <IonLabel className="notification-font">
                      {item.appNotificationDto.message}
                    </IonLabel>
                  </IonRow>
                  <IonRow>
                    <IonLabel className="notification-date">
                      {item.duration}
                    </IonLabel>
                  </IonRow>
                </IonCol>
              ))
          ) : (
            <IonCol size="12" className="full-width ion-text-center">
              <IonLabel className="notification-date">
                No Notification to show
              </IonLabel>
            </IonCol>
          )}
        </IonRow>
        <IonRow className="accessed-status">
          <IonCol size="12" className="full-width">
            <IonRow className="sort-divider">
              <IonLabel className="data-font">Earlier</IonLabel>
            </IonRow>
          </IonCol>
          {accessedNotfication.length > 0 ? (
            accessedNotfication
              .filter((item) => item.accessed === "Y")
              .map((item, index) => (
                <IonCol size="12" className="full-width" key={index}>
                  <IonRow
                    onClick={() => {
                      if (item.appNotificationDto.appLink !== null)
                        props.history.push(item.appNotificationDto.appLink);
                    }}
                  >
                    <IonLabel className="notification-font">
                      {item.appNotificationDto.message}
                    </IonLabel>
                  </IonRow>
                  <IonRow>
                    <IonLabel className="notification-date">
                      {item.duration}
                    </IonLabel>
                  </IonRow>
                </IonCol>
              ))
          ) : (
            <IonCol size="12" className="full-width ion-text-center">
              <IonLabel className="notification-date">
                No Notification to show
              </IonLabel>
            </IonCol>
          )}
        </IonRow>
      </IonContent>
      <IonContent style={{ maxHeight: "86px" }}>
        <MainTabs selected={true} />
      </IonContent>
    </IonPage>
  );
}
