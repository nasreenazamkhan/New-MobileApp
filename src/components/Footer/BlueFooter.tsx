import { IonLabel } from "@ionic/react";
import React from "react";
import "./BlueFooter.scss";

interface blueFooterProps {
  onBlueFooterClick: () => void;
  footerLabel: any;
}
const BlueFooter: React.FC<blueFooterProps> = ({
  onBlueFooterClick,
  footerLabel,
}) => {
  return (
    <div onClick={() => onBlueFooterClick()} className="blue-footer-container">
      {footerLabel}
    </div>
  );
};
export default BlueFooter;
