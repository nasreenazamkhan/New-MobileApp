import React from "react";
import { IonContent, IonPage, IonRow } from "@ionic/react";
import AddresCard from "./addressCard/AddressCard";
import Header from "../../components/Header";
export default function Address(props: any) {
  return (
    <IonPage id="address-page">
      <Header label="Addresses" action="home" locationProps={props} showAgent={true} agentHeader={true}/>
      <IonContent class="pageContainer" fullscreen>
          <AddresCard editable={true} />
      </IonContent>
    </IonPage>
  );
}
