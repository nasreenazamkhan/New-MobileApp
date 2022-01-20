import React from "react";
import "./InputBorders.scss";
interface SimpleBorderProps {
  content;
  label;
}
const SimpleBorder: React.FC<SimpleBorderProps> = ({ content, label }) => {
  return (
    <div className="form-element-group">
      <fieldset className="fullBlackBoder">{content}</fieldset>
    </div>
  );
};
export default SimpleBorder;
