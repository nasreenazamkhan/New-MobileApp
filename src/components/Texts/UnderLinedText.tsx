import { IonLabel } from "@ionic/react";
import React from "react";
import "./InformationText.scss";

interface UnderLinedTextProps {
  text;
}

const UnderLinedText: React.FC<UnderLinedTextProps> = ({ text }) => {
  return (
    <div className="relativePosition componentMargins1">
      <div className="smallUnderline payLabel">
        <IonLabel className="">{text}</IonLabel>
      </div>
    </div>
  );
};
export default UnderLinedText;
