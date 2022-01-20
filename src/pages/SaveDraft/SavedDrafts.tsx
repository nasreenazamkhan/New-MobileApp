import {
  IonCard,
  IonCardContent,
  IonContent,
  IonLabel,
  IonPage,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../../components/alert/Alert";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import Icon from "../../components/Icon";
import * as reduxActions from "../../redux/actions/AllActions";
import Store from "../../redux/Store";
import { deleteSelectedDraft, getAllDraft } from "../../services/EndPointApi";
import CenterFooterButton from "../CenterFooterButton";
import "./SavedDrafts.scss";

interface stateProps {
  //props;
}

interface ownProps {
  containerList;
  updateContainersInCart: (item) => void;
}
var count = 0;
type SavedDraftsProps = stateProps & ownProps;
const SavedDrafts: React.FC<SavedDraftsProps> = (props: any, {}) => {
  const [draftList, setdraftList] = useState<any>([]);
  const [alertPopup, setAlertPopup] = useState(false);
  const [encryptedId, setencryptedId] = useState("");
  const [message, setmessage] = useState("");

  let history = useHistory();
  const alertProps = {
    isShow: alertPopup,
    message: "",
    content: " Are you sure to delete the draft?",
    icon: "<img src='/assets/icon/are-you-sure.svg'/>",
    alertAction: deletethisDraft,

    itemName: "",
    // cancelPolicy: true
    okButtonName: "Continue",
    cancelButtonName: "Cancel",
  };
  useEffect(() => {
    fetchAlldrafts();
  }, []);

  async function deletethisDraft(item, actionType) {
    var body = { encryptedDraftId: encryptedId };
    setAlertPopup(false);
    if (actionType) {
      let resp = await deleteSelectedDraft(body);
      if (resp.success) {
        fetchAlldrafts();
      }
      console.log(resp);
    } else {
    }
    console.log("elete");
  }
  var contanerIconProps = {
    name: "container",
    slot: "",
    class: "zoom12",
    styleProps: { zoom: 2.8 },
  };
  var draftIconProps = {
    name: "drafts-note",
    slot: "",
    class: "zoom12",
    styleProps: { zoom: 2.8 },
  };

  var deleteIconProps = {
    name: "delete",
    slot: "",
    class: "zoom12",
    // zoom: 2.8,
  };

  async function fetchAlldrafts() {
    setdraftList([]);
    var resp = await getAllDraft();
    console.log(resp);
    if (resp?.success) {
      if (resp?.data?.data?.dataItems.length > 0) {
        setdraftList(resp?.data?.data?.dataItems);
        setmessage("");
      } else {
        setmessage("No drafts saved to display");
      }
      //console.log(JSON.parse(draftList[0].requestDetailsDraft));
    } else {
      setmessage(resp?.data?.message);
    }
  }

  function goTothis(item) {
    delete item.containerDetailsDtoList;
    var booktruckData = item;
    console.log(booktruckData);
    booktruckData.requestDetailsDraft = JSON.parse(
      booktruckData.requestDetailsDraft
    );
    console.log(booktruckData);
    var reduxAction = reduxActions.addToBookTruck(
      booktruckData.requestDetailsDraft
    );
    var updateencryptedDraftIdInRedux = reduxActions.updateencryptedDraftId(
      item.encryptedDraftId
    );
    if (updateencryptedDraftIdInRedux)
      Store.dispatch(updateencryptedDraftIdInRedux);
    console.log(updateencryptedDraftIdInRedux);
    if (reduxAction) Store.dispatch(reduxAction);
    console.log(booktruckData);
    props.history.push("/bookTruckTab", booktruckData); //props.history.push("/bookTruckTab/location", booktruckData);
  }
  return (
    <IonPage>
      <Header
        label="Save drafts"
        action="home"
        locationProps={props}
        searchClick={() => console.log()}
        showAgent={true}
        agentHeader={true}
      />
      <IonContent>
        <Alert alertProps={alertProps} />
        {message && <div className="warning-message">{message}</div>}
        {draftList?.map((item, index) => (
          <IonCard
            className="box_shadow"
            onClick={() => goTothis(item)}
            key={index}
          >
            <IonCardContent>
              <div className="draft-container">
                <div className="draft-icon">
                  <Icon iconProps={draftIconProps} />
                </div>
                <div className="draft-col">
                  <div className="boldBlackText">Draft 1</div>
                  <div className="saved-date">
                    <div className="lightGrayLable">Saved on</div>
                    <div className="lightGrayLable center-align">
                      {item.creationDate}
                    </div>
                  </div>
                </div>
                {/* <div className="draft-col">
                <div className="lightGrayLable"> </div>
                <div className="lightGrayLable">Saved on</div>
              </div> */}
                <div className="draft-icon">
                  <Icon iconProps={contanerIconProps} />
                </div>
                <div className="draft-col">
                  <div className="lightBlackText">
                    <IonLabel>
                      {JSON.parse(item.requestDetailsDraft).containerList
                        .length || 0}
                    </IonLabel>
                  </div>
                  <div className="lightBlackText">
                    <IonLabel>Containers</IonLabel>
                  </div>
                </div>
                <div
                  className="draft-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAlertPopup(true);
                    setencryptedId(item.encryptedDraftId);
                  }}
                >
                  <Icon iconProps={deleteIconProps} />
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        ))}

        <CenterFooterButton
          iconType="menu"
          clickEvent={() => history.push("/profilemenu")}
        />
      </IonContent>
      <Footer />
    </IonPage>
  );
};
export default SavedDrafts;
