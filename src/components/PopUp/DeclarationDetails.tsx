import { IonButton, IonModal } from "@ionic/react";
import React from "react";
import "./SearchBoeByDate.scss";

interface declarationDetailsProps {
  showModal;
  openOrCloseModal?: () => void;
}
const DeclarationDetails: React.FC<declarationDetailsProps> = ({
  showModal,
  openOrCloseModal,
}) => {
  return (
    <IonModal isOpen={showModal} cssClass="decla-details">
      <p>This is modal content</p>
      <IonButton onClick={() => openOrCloseModal()}>Close Modal</IonButton>
    </IonModal>
  );
};
export default DeclarationDetails;
