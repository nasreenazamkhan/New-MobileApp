import { IonButton } from "@ionic/react";
import React from "react";

export function CircularButton(props: any) {
  return (
    <>
      <IonButton className="circular-button" size={props.size}>
        {props.label}
      </IonButton>
    </>
  );
}

export function IconButton(props: any) {
  return (
    <>
      <IonButton size={props.size}>{props.label}</IonButton>
    </>
  );
}
