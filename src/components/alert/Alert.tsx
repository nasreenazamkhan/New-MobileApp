import { IonAlert, IonInput, IonIcon } from "@ionic/react";
import React, { useState } from "react";
import InappBrowser from "../../components/InappBrowser";
import "./Alert.scss";

export default function Alert(props: any) {
  const [error, setError] = useState<boolean>(false);

  function alertAction(item, actionType) {
    props.alertProps.alertAction(item, actionType);
  }
  return (
    <IonAlert
      id="alert"
      isOpen={props.alertProps.isShow}
      // onDidDismiss={() => !props.alertProps.isShow}
      header={props.alertProps.header}
      message={
        "<div class='text-style'> " +
        (props.alertProps.icon ? props.alertProps.icon + "<br/>" : "<br/>") +
        props.alertProps.content +
        "<div class='redColor'> " +
        props.alertProps.message +
        "</div>" +
        "<div class='row message2-text'>" +
        props.alertProps.itemName +
        "</div>" +
        "</div><div class='row border'></div>"
      }
      inputs={props.alertProps.inputs}
      buttons={[
        {
          text: props.alertProps.okButtonName,
          role: "confirm",
          handler: (e) => {
            console.log("data", props.alertProps.item);
            alertAction(props.alertProps.item, true);
          },
        },
        {
          text: props.alertProps.cancelButtonName,
          role: "cancel",
          cssClass: props.alertProps.cancelClass,
          handler: () => {
            alertAction("", false);
          },
        },
      ]}
    />
  );
}
