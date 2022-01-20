import React from "react";
import "./InformationText.scss";

interface informationTextProps {
  message;
}
const InformationText: React.FC<informationTextProps> = ({ message }) => {
  return <div className="container-count">Displaying {message}</div>;
};
export default InformationText;
