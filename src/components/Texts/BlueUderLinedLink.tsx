import { IonLabel } from "@ionic/react";
import React from "react";
import Icon from "../Icon";
import "./BlueUderLinedLink.scss";

interface AddLocationProps {
  leftIcon?;
  onTap?: (modalState) => void;
  className?: string;
  label: string;
  rightIcon?: any;
  labelCLassName?: any;
  rightIconTap?: any;
}
const BlueUderLinedLink: React.FC<AddLocationProps> = ({
  leftIcon,
  onTap,
  className,
  label,
  rightIcon,
  rightIconTap,
  labelCLassName,
}) => {
  return (
    <div className={className ? className + " login-tnc" : "login-tnc"}>
      <div>{leftIcon && <Icon iconProps={leftIcon} />}</div>
      <div
        className={labelCLassName ? labelCLassName : "tnc location-label"}
        onClick={(e) => {
          console.log(111111111111111);
          e.stopPropagation();
          onTap(true);
        }}
      >
        <IonLabel>{label}</IonLabel>
      </div>
      <div onClick={() => rightIconTap()} className="tnc">
        {rightIcon && <Icon iconProps={rightIcon} />}
      </div>
    </div>
  );
};
export default BlueUderLinedLink;
