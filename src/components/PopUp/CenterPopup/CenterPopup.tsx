import { IonIcon, IonLabel, IonModal, IonTextarea } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import React, { useState } from "react";
import "../../../components/alert/Alert.scss";
import Icon from "../../Icon";
import "./CenterPopup.scss";

interface CenterPopupProps {
  showModal;
  content;
  openOrCloseModal?: (data?, type?) => void;
  okButton?: string;
  cancelButton?: string;
  textAreaComment?: string;
  isClose?: boolean;
  textAreaHeading?: string;
  mainHead?: string;
  type?: string;
  getTextArea?: (val) => void;
}
const CenterPopup: React.FC<CenterPopupProps> = ({
  showModal,
  content,
  openOrCloseModal,
  cancelButton,
  okButton,
  textAreaComment,
  isClose,
  textAreaHeading,
  mainHead,
  type,
  getTextArea,
}) => {
  const [error, setError] = useState<boolean>(false);
  const [text, setText] = useState<string>();
  const closeIconProps = {
    name: "close",
  };

  return (
    <IonModal
      isOpen={showModal}
      cssClass="center-align-modal"
      showBackdrop={true}
      onDidDismiss={() => openOrCloseModal()}
    >
      {isClose && (
        <div className="close-icon" onClick={() => openOrCloseModal()}>
          {/* <Icon iconProps={closeIconProps} /> */}
          <IonIcon icon={closeOutline} className="close-icon" />
        </div>
      )}
      {mainHead && (
        <div>
          <IonLabel className="center-popup-label">{mainHead}</IonLabel>
        </div>
      )}
      {content}
      {textAreaHeading && (
        <div>
          <IonLabel className="center-popup-label">Add suggestions</IonLabel>
        </div>
      )}
      {textAreaComment && (
        <div>
          <IonTextarea
            value={text}
            onIonChange={(e) => {
              setText(e.detail.value!);
              getTextArea(e.detail.value!);
            }}
            placeholder={textAreaComment}
          ></IonTextarea>
        </div>
      )}
      <div className="buttons">
        {cancelButton && (
          <div
            className="button1"
            onClick={() => openOrCloseModal("reject", type)}
          >
            {cancelButton}
          </div>
        )}
        {okButton && (
          <div
            className="button2"
            onClick={() => openOrCloseModal("approve", type)}
          >
            {okButton}
          </div>
        )}
      </div>
    </IonModal>
  );
};
export default CenterPopup;
