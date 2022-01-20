import { IonLabel } from "@ionic/react";
import React from "react";

interface SortedContainerListProps {
  item: any;
  content: any;
  isDiff: any;
}
const SortedContainerList: React.FC<SortedContainerListProps> = ({
  item,
  content,
  isDiff,
}) => {
  return (
    <div>
      <div className="decla-info" hidden={isDiff}>
        <div className="decla-number">
          <IonLabel>{item.boeNumber}</IonLabel>
        </div>
        <div className="do-validity">
          <IonLabel class="validity-text">
            DO Validity: {item.boeNumber}
          </IonLabel>
        </div>
      </div>

      {content}
    </div>
  );
};
export default SortedContainerList;
