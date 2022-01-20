import { IonLabel, IonText, IonTextarea } from "@ionic/react";
import { TextInputType } from "../../util/DataTypes";
import React, { useState } from "react";
import "./TxtArea.scss";
import { getPatternValue, isValid, validateEmail } from "../../util/Utilities";
import Icon from "../Icon";

interface TxtAreaProps {
  label?: string;
  name: any;
  value?: any;
  onChange?: any;
  required?: any;
  errors?: any;
  datatype?: TextInputType;
  description?: string;
  placeholder: string;
  icon?: any;
  onBlur?: any;
  readonly?: any;
  disabled?:any;
  contactForm?:any;
}
const TxtArea: React.FC<TxtAreaProps> = ({
  label,
  name,
  value,
  onChange,
  required,
  errors,
  datatype,
  description,
  placeholder,
  icon,
  onBlur,
  readonly,
  disabled,
  contactForm
}) => {
  const [validation, setvalidation] = useState(false);
  const checkKey = (e) => {
    if (e.key.length > 1) return true;
    setvalidation(!isValid(datatype, e.key));
    if (!isValid(datatype, e.key)) {
      e.preventDefault();
      return false;
    }
  };

  const onInpChange = (e) => {
    let val = e.target.value;
    let validate;
    if (e.target.pattern) {
      val = getPatternValue(val, e.target.pattern, "-");
    }
    if (e.target.type === "email") {
      validate = validateEmail(val);
      setvalidation(!validate);
    }
    onChange(e, val, validate);
  };
  return (
    <div className="form-element-group" style={contactForm ? {width:'350px', padding:'0'} : {}}>
      <fieldset>
        <legend>{label}</legend>
        <IonTextarea
          autoGrow={true}
          maxlength={100}
          disabled={disabled}
          name={name}
          value={value}
          spellCheck={false}
          autocapitalize="off"
          readonly={readonly}
          onKeyDown={checkKey}
          onIonChange={onInpChange}
          clearOnEdit={true}
          required={required}
          placeholder={placeholder}
          className="textInput"
          onIonBlur={(e) => {
            if (onBlur) onBlur(e);
          }}
        >
          {icon && (
              <div>
<Icon iconProps={icon} />
              </div>
            
            // <IonIcon slot="primary" icon={pulseOutline} />
          )}
        </IonTextarea>
      </fieldset>

      <div className="">
        {errors && (
          <IonText color="danger" className="validation-message">
            <IonLabel className="ion-padding-start">{errors}</IonLabel>
          </IonText>
        )}
      </div>
      {validation && description && (
        <IonText color="danger" className="validation-message">
          <IonLabel className="ion-padding-start">{description}</IonLabel>
        </IonText>
      )}
    </div>
  );
};

export default TxtArea;
