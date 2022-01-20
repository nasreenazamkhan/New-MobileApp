import React from "react";

interface BorderWithFloatingTextProps {
  content;
  label;
  className?;
}
const BorderWithFloatingText: React.FC<BorderWithFloatingTextProps> = ({
  content,
  label,
  className,
}) => {
  return (
    <div
      className={
        className ? className + " form-element-group" : "form-element-group"
      }
    >
      <fieldset>
        <legend>{label}</legend>
        {content}
      </fieldset>
    </div>
  );
};
export default BorderWithFloatingText;
