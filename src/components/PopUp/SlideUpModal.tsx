import { IonIcon, IonModal } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import React from "react";
import "./SearchBoeByDate.scss";

interface slideUpModalProps {
  showModal;
  openOrCloseModal?: (modalState) => void;
  content?;
  leftHeaderIcon?: any;
}
const SlideUpModal: React.FC<slideUpModalProps> = ({
  showModal,
  openOrCloseModal,
  content,
}) => {
  return (
    <IonModal
      isOpen={showModal}
      cssClass="popup-container"
      onDidDismiss={() => openOrCloseModal(false)}
    >
      <div
        className="close-icon-container"
        onClick={() => openOrCloseModal(false)}
      >
        <IonIcon icon={closeOutline} className="close-icon" />
      </div>
      {content}
    </IonModal>
  );
};
export default SlideUpModal;
