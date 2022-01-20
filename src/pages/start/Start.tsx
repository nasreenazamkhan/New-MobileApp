import { IonContent, IonPage, IonRouterLink } from "@ionic/react";
import React, { useState } from "react";

function Start() {
  return (
    <IonPage>
      <IonContent>
        <ul>
          <li>
            <IonRouterLink routerDirection={"forward"} href="/login">
              Login
            </IonRouterLink>
          </li>
          <li>
            <IonRouterLink routerDirection={"forward"} href="/notifications">
              Notifications
            </IonRouterLink>
          </li>
          <li>
            <IonRouterLink routerDirection={"forward"} href="/tabs">
              Maintab
            </IonRouterLink>
          </li>
          <li>
            <IonRouterLink routerDirection={"forward"} href="/bookTruckTab">
              bookTruckTab
            </IonRouterLink>
          </li>
          <li>
            <IonRouterLink routerDirection={"forward"} href="/decl">
              Declaration
            </IonRouterLink>
          </li>
          <li>
            <IonRouterLink routerDirection={"forward"} href="/profile">
              Profile
            </IonRouterLink>
          </li>
          <li>
            <IonRouterLink routerDirection={"forward"} href="/quickBook">
              QuickBook
            </IonRouterLink>
          </li>
        </ul>
      </IonContent>
    </IonPage>
  );
}

export default Start;
