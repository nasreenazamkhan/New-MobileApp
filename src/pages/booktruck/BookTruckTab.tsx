import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { calendar, searchOutline } from "ionicons/icons";
import React, { useState } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import BlueFooter from "../../components/Footer/BlueFooter";
import Header from "../../components/Header";
import PayQuick from "../../components/PayQuick";
import Review from "./Review/Review";
import BookTruck from "./BookTruck";
import BookTruckPaymnet from "./BookTruckPaymnet";

import "./BookTruckTab.scss";
import Store from "../../redux/Store";
import { saveDraft } from "../../services/EndPointApi";
import Alert from "../../components/alert/Alert";
import SlideUpModal from "../../components/PopUp/SlideUpModal";
import DraftPopup from "../SaveDraft/DraftPopup";
import { BOOK_TRUCK_CLEAR } from "../../redux/actionTypes/AllActionTypes";

interface BookTruckTabProps extends RouteComponentProps {}

const BookTruckTab: React.FC<BookTruckTabProps> = (props) => {
  const [headerClickActionType, setheaderClickActionType] = useState("false");
  const [alertPopup, setAlertPopup] = useState(false);

  function goingOutOfthePage(actionType) {
    setheaderClickActionType(actionType);
    setAlertPopup(true);
  }

  function doSaveDraft() {
    var truckDetails: any = Store.getState().TruckBook;
    var encryptedDraftId: any =
      Store.getState().VariableValues.encryptedDraftId;
    console.log(encryptedDraftId);

    var containerDetailsDtoList = createcontainerDetailsDtoList(
      truckDetails.containerList
    );
    const currentStep = props.location.pathname.split("/").pop();
    var draftObjFormat = {
      requestDetailsDraft: JSON.stringify(truckDetails),
      containerDetailsDtoList: containerDetailsDtoList,
      currentStep: currentStep + "",
      encryptedDraftId: encryptedDraftId,
    };

    var resp = saveDraft(draftObjFormat);

    props.history.push(headerClickActionType);
  }

  function createcontainerDetailsDtoList(containerList) {
    var containerDetailsDto = [];
    var containerDetailsDtoObj = {};
    containerList.forEach((element) => {
      containerDetailsDtoObj = {
        container_number: element.container_number,
        dpwTransactionId: element.dpwTransactionId,
      };
      containerDetailsDto.push(containerDetailsDtoObj);
    });
    return containerDetailsDto;
  }
  const handleHeaderClick = (actionType) => {
    Store.dispatch({ type: BOOK_TRUCK_CLEAR });
    if (actionType) {
      setAlertPopup(false);
      doSaveDraft();
    } else {
      if (headerClickActionType === "/containerCart") props.history.goBack();
      else props.history.push(headerClickActionType);
    }
  };

  return (
    <>
      <IonPage className="bookTruckTab">
        <Header
          label="Book Truck"
          action="home"
          agentHeader={true}
          locationProps={props}
          customClick={goingOutOfthePage}
        />

        <IonContent className="tabContent">
          <SlideUpModal
            showModal={alertPopup}
            openOrCloseModal={(modalState) => setAlertPopup(modalState)}
            content={<DraftPopup draftOkClick={handleHeaderClick} />}
          />
          <IonTabs className="declaration-tab">
            <IonRouterOutlet>
              <Redirect
                exact
                path="/bookTruckTab"
                to="/bookTruckTab/location"
              />
              <Route
                path="/bookTruckTab/location"
                component={BookTruck}
                // render={() => <BookTruck />}
                exact={true}
              />
              <Route
                exact={true}
                path="/bookTruckTab/review"
                component={Review}
                //render={(props) => <Review />}
              />
              <Route
                exact={true}
                path="/bookTruckTab/payment"
                component={BookTruckPaymnet}
                //render={() => <BookTruckPaymnet />}
              />
            </IonRouterOutlet>
            <IonTabBar slot="top">
              <IonTabButton tab="location" href="/bookTruckTab/location">
                <IonLabel>Location</IonLabel>
              </IonTabButton>

              <IonTabButton
                disabled={props.location.pathname === "/quickBook/book"}
                tab="Review"
                href="/bookTruckTab/review"
              >
                <IonLabel>Review</IonLabel>
              </IonTabButton>

              <IonTabButton
                disabled={props.location.pathname === "/quickBook/book"}
                tab="Payment"
                href="/bookTruckTab/payment"
              >
                <IonLabel>Payment</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonContent>
        {/* <BlueFooter
          onBlueFooterClick={() => console.log()}
          footerLabel="Continue"
        /> */}
      </IonPage>
    </>
  );
};
export default BookTruckTab;
