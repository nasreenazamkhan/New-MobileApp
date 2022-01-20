import { IonLabel } from "@ionic/react";
import React from "react";
import "./Badge.scss";

interface BadgeProps {
  status: any;
}

var color;
const Badge: React.FC<BadgeProps> = ({ status }) => {
  if (status === "Pending") {
    color = "warning";
  } else if (status === "New") {
    color = "#6AC672";
  } else if (status === "Expired") {
    color = "#E91818";
  } else if (status === "Active") {
    color = "#6AC672";
  }
  return (
    <div className="badge-shape" style={{ backgroundColor: color }}>
      <IonLabel className="badge-label">{status}</IonLabel>
    </div>
  );
};
export default Badge;
