import { IonLabel } from "@ionic/react";
import React from "react";
import "./SavedDrafts.scss";
//

interface DraftPopupProps {
  draftOkClick: (actionType) => void;
}
const DraftPopup: React.FC<DraftPopupProps> = ({ draftOkClick }) => {
  return (
    <div className="draft-popup">
      <div className="draft-label">
        <IonLabel>
          Unsaved Data will be lost- Do you want to save the transaction as
          drafts?
        </IonLabel>
      </div>
      <div className="draft-button">
        <div className="button1" onClick={() => draftOkClick(false)}>
          Cancel Transaction
        </div>
        <div className="button2" onClick={() => draftOkClick(true)}>
          Save as Draft
        </div>
      </div>
    </div>
  );
};
export default DraftPopup;
