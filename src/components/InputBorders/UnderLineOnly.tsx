import React from "react";
import "./InputBorders.scss";

interface UnderLineOnlyProps {
  content;
  className;
}
const UnderLineOnly: React.FC<UnderLineOnlyProps> = ({
  content,
  className,
}) => {
  return (
    <div className="fullWidth">
      <div className={className}>{content}</div>
    </div>
  );
};
export default UnderLineOnly;
