import { IonToggle } from "@ionic/react";
import React from "react";
import "./Toggle.scss";

interface ToggleProps {
  value: any;
  changeToggle: (arg, val) => void;
  name: any;
}
const Toggle: React.FC<ToggleProps> = ({ value, changeToggle, name }) => {
  return (
    <IonToggle
      name={name}
      onIonChange={(e) => changeToggle(e, e.detail.checked)}
      checked={value}
    />
  );
};
export default Toggle;
