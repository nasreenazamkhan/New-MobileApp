import React, { useState } from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { Plugins, AppState } from "@capacitor/core";
import { Route, Redirect, RouteComponentProps } from "react-router";
import "./MainTab.scss";
import LandingPage from "./landingpage/LandingPage";
import Status from "./myBooking/status/Status";
import Profile from "./profile/Profile";
import Address from "./address/Address";
import { useHistory } from "react-router-dom";
import PODList from "./VerifyPOD/PODList";
import PODDetails from "./VerifyPOD/PODDetails";
import ListAllPod from "./VerifyPOD/ListAllPod";
import Invoice from "./ManualInvoice/Invoice";
import InvoiceTabs from "./ManualInvoice/InvoiceTabs/InvoiceTabs";

export default function MainTabs(props: any) {
  let history = useHistory();
  const { Keyboard } = Plugins;
  console.log(props.selected);
  const [selected, setSelected] = useState(false);
  const menutabClicked = (e) => {
    console.log(e);
    console.log(props);
    history.push("/profilemenu", { direction: "none" });
  };

  const sign = "test";

  return (
    <div className="ion-tabs">
      <div className="menu-button-div">
        <div className="menu-button" onClick={menutabClicked}>
          <hr />
          <hr />
          <hr />
        </div>
      </div>
      <IonTabs className="ion-tabs-bar">
        <IonRouterOutlet>
          <Redirect exact path="/tabs" to="/tabs/landing" />

          <Route
            path="/tabs/landing"
            render={() => <LandingPage />}
            exact={true}
          />
          <Route path="/tabs/status" render={() => <Status />} exact={true} />
          <Route
            path="/tabs/status/pod/podDetails"
            render={(routeProps) => <PODDetails {...routeProps} />}
            exact={true}
          />

          <Route
            path="/tabs/status/pod/listAllPod"
            render={() => <ListAllPod />}
            exact={true}
          />
          <Route
            path="/tabs/status/miscellaneous"
            render={() => <Invoice />}
            exact={true}
          />
          <Route
            path="/tabs/status/invoicetabs"
            render={() => <InvoiceTabs />}
            exact={true}
          />
          <Route path="/tabs/profile" render={() => <Profile />} exact={true} />
          <Route path="/tabs/addresses" exact render={() => <Address />} />
          {/* <Route path="/tabs/schedule/:id" component={SessionDetail} />
          <Route path="/tabs/speakers/sessions/:id" component={SessionDetail} />
          <Route path="/tabs/map" render={() => <MapView />} exact={true} />
          <Route path="/tabs/about" render={() => <About />} exact={true} /> */}
        </IonRouterOutlet>
        <IonTabBar slot="bottom" className=" main-tab">
          <IonTabButton tab="landing" href="/tabs/landing">
            <IonIcon src="assets/icon/home-new.svg" className="button" />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="addresses" href="/tabs/addresses">
            <IonIcon src="assets/icon/address.svg" className="button" />
            <IonLabel>Addresses</IonLabel>
          </IonTabButton>
          <IonTabButton disabled={true}></IonTabButton>
          <IonTabButton tab="status" href="/tabs/status">
            <IonIcon src="assets/icon/status.svg" className="button" />
            <IonLabel>Status</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/tabs/profile">
            <IonIcon src="assets/icon/profile.svg" className="button" />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </div>
  );
}
