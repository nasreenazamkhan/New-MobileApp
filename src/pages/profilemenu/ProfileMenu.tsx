import { Capacitor } from "@capacitor/core";
import { IonButton, IonContent, IonIcon, IonPage, IonRow } from "@ionic/react";
import {
  bookOutline,
  closeOutline,
  helpCircleOutline,
  personOutline,
  powerOutline,
  settingsOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import Alert from "../../components/alert/Alert";
import InappBrowser from "../../components/InappBrowser";
import * as LoginUser from "../../redux/actionTypes/AllActionTypes";
import Store from "../../redux/Store";
//import { Logout } from "../../services/Common";
import { getDraftCount } from "../../services/EndPointApi";
import { termsAndConditionUrl, helpAndSupportUrl } from "../../util/Constants";

import "./ProfileMenu.scss";
interface ProfileProps extends RouteComponentProps {}

const ProfileMenu: React.FC<ProfileProps> = (props) => {
  let history = useHistory();
  const [draftCount, setdraftCount] = useState(0);
  const [alertPopup, setAlertPopup] = useState(false);
  useEffect(() => {
    getAllSavedDraftsCount();
  }, []);

  const handleDraftPopup = (item, actionType) => {
    if (actionType) {
      setAlertPopup(false);
      //history.push("/savedDrafts");
    } else {
      setAlertPopup(false);
    }
  };
  const alertProps = {
    isShow: alertPopup,
    message: " ", //message,
    content: "Attention!",
    //icon: "<img src='/assets/icon/are-you-sure.svg'/>",
    alertAction: clickedLogout, //handleHeaderClick,

    itemName: " Are you sure you want to logout?",
    cancelPolicy: true,
    okButtonName: "Continue",
    cancelButtonName: "Cancel",
  };

  async function getAllSavedDraftsCount() {
    let resp = await getDraftCount();
    if (resp?.success) setdraftCount(resp?.data);
    //setdraftCount(resp);
    console.log(resp);
  }
  const closeThis = () => {
    console.log(props);
    props.history.goBack();
  };

  function clickedLogout(item, actionType) {
    setAlertPopup(false);
    if (actionType) {
      Store.dispatch(async (dispatch) => {
        dispatch({
          type: LoginUser.REMOVE_ACCESS_TOKEN,
        });
        dispatch({
          type: LoginUser.REMOVE_USER,
        });
      });
      history.push("/login");
      if (Capacitor.isNative) {
        //Plugins.App.exitApp();
        history.push("/login");
      }
    } else {
    }
  }
  return (
    <IonPage className="profile-page">
      <IonContent className="profile-menu-content">
        <Alert alertProps={alertProps} />
        <div className="dt-icon">
          <img
            className="icon-logo"
            src="assets/img/dubai_trade_logo.png"
            alt="Ionic logo"
          />
        </div>
        <div className="close-icon">
          <IonIcon onClick={(e) => closeThis()} icon={closeOutline}></IonIcon>
        </div>
        <div className="menu-links">
          <ul>
            <li>
              <IonRow
                className="center-align"
                onClick={(e) => history.push("/tabs/profile")}
              >
                <IonIcon icon={personOutline}></IonIcon> My Profile
              </IonRow>
            </li>
            <li>
              <IonRow
                className="center-align"
                onClick={() => props.history.push("/savedDrafts")}
              >
                <IonIcon icon={bookOutline}></IonIcon> save drafts{" "}
                <div className="drafts-count-circle">{draftCount}</div>
              </IonRow>
            </li>
            <li>
              <IonIcon icon={settingsOutline}></IonIcon>
              Settings
            </li>
            <li>
              <IonRow
                className="center-align"
                onClick={() => InappBrowser(helpAndSupportUrl)}
              >
                <IonIcon icon={helpCircleOutline}></IonIcon>
                Help & Support{" "}
              </IonRow>
            </li>
            <li>
              <IonRow
                className="center-align"
                onClick={() => setAlertPopup(true)}
              >
                <IonIcon icon={powerOutline}></IonIcon>
                Logout
              </IonRow>
            </li>
          </ul>
        </div>
        <div onClick={() => InappBrowser(termsAndConditionUrl)} className="tnc">
          Privacy policy - Terms and Conditions.
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfileMenu;
