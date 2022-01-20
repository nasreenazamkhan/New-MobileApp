import { SocialSharing } from "@ionic-native/social-sharing";
import { IonCol, IonIcon, IonLabel, IonRow } from "@ionic/react";
import { caretForwardOutline, closeOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AddressLink from "../../components/Address/AddressLink";
import Icon from "../../components/Icon";
import CenterPopup from "../../components/PopUp/CenterPopup/CenterPopup";
import SlideUpModal from "../../components/PopUp/SlideUpModal";
import ListDownload from "../VerifyPOD/PODCard/ListDownload";
import "./DeclarationDetails.scss";

interface declarationDetailsProps {
  click?: () => void;
  item: any;
  fromPod?: boolean;
}

const DeclarationDetails: React.FC<declarationDetailsProps> = ({
  click,
  item,
  fromPod,
}) => {
  const [podDownLoadModalContent, setpodDownLoadModalContent] = useState<any>(
    {}
  );
  const [showModal, setshowModal] = useState(false);
  let history = useHistory();
  var containerIcon = {
    name: "container",
    slot: "",
    class: "zoom12",
    styleProps: { zoom: 1.8 },
  };
  var downloadIconProps = {
    name: "invoices-download",
    slot: "",
    class: "zoom12",
    style: { stroke: "#168FE4" },
    styleProps: { zoom: 1.6 },
  };
  const closeIconProps = {
    name: "close",
  };

  function downloadPOD(item) {
    console.log(item);
    click();
    setshowModal(true);

    setpodDownLoadModalContent({
      content: <ListDownload downloadableListItem={item.proofOfDelivery} />,
      okButton: "APPROVE",
      cancelButton: "REJECT",
      textAreaComment: "Importer comments (if any)",
      isClose: true,
      type: "podDownload",
    });
  }

  return (
    <div className="details">
      <CenterPopup
        showModal={showModal}
        content={podDownLoadModalContent.content}
        isClose={true}
        mainHead={"PODs"}
        openOrCloseModal={() => setshowModal(false)}
      />
      <div className="decl-details-popup">
        <Icon iconProps={containerIcon} />
        <IonIcon
          class="right-arrow"
          //src="assets/icon/close.svg"
          icon={caretForwardOutline}
          //color="primary"
          //slot="start"
        />
        <div className="relativePosition componentMargins">
          <div className="smallUnderline">
            <IonLabel className="payLabel">{item.container_number}</IonLabel>
          </div>
        </div>
        {/* <div className="close-icon1">
          <IonIcon icon={closeOutline} className="close-icon" />
        </div> */}
      </div>
      <div className="first-row">
        <div className="first-col">
          <div className="static-label">Declaration Number</div>
          <div className="dyna-label">
            <IonLabel>{item.boeNumber}</IonLabel>
          </div>
        </div>
        <div className="sec-col">
          <div className="static-label">Container Wt</div>
          <div className="dyna-label">
            <IonLabel>{item.containerWeight}</IonLabel>
          </div>
        </div>
        <div className="third-col">
          <div className="static-label">ISO Code</div>
          <div className="dyna-label">
            <IonLabel>{item.iso_code}</IonLabel>
          </div>
        </div>
      </div>
      <div className="first-row">
        <div className="first-col">
          <div className="static-label">Storage Validity</div>
          <div className="dyna-label">
            <IonLabel>{item.storagePaidTill}</IonLabel>
          </div>
        </div>
        <div className="sec-col">
          <div className="static-label">Hold Authority</div>
          <div className="dyna-label">
            <IonLabel>{item.holdAuthority}</IonLabel>
          </div>
        </div>
        <div className="third-col">
          <div className="static-label">Pickup</div>
          <div className="dyna-label">
            <IonLabel>{item.pickupLocation}</IonLabel>
          </div>
        </div>
      </div>
      {item.dropAddress && (
        <div className="address-row">
          <IonRow className="address-text">Drop Location</IonRow>
          <IonRow>
            <AddressLink
              value={item || {}}
              //setAddress={setAddress}
              disabled={true}
              linkClassName="flexStart"
              //attributes={singleDropAttri}
              openPopup={false}
            />
          </IonRow>
        </div>
      )}
      {fromPod ? (
        <></>
      ) : (
        <div className="button" onClick={() => click()}>
          <IonLabel>Delete Container</IonLabel>
        </div>
      )}
      {fromPod && (
        <IonRow>
          {item.proofOfDelivery.length > 0 && (
            <IonCol onClick={() => downloadPOD(item)}>
              <IonCol size="1">
                <Icon iconProps={downloadIconProps} />
              </IonCol>
              <IonCol className="pod-download">Download POD</IonCol>
            </IonCol>
          )}
          <IonCol
            className="track-job"
            onClick={() => history.push("/track", item)}
          >
            track job
          </IonCol>
        </IonRow>
      )}
    </div>
  );
};
export default DeclarationDetails;
