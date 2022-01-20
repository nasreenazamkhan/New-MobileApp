import { IonButton, IonIcon, IonInput, IonLabel, IonText } from "@ionic/react";
import { personOutline, pulseOutline } from "ionicons/icons";
import { TextInputType } from "../../util/DataTypes";
import React, { useState } from "react";
import "./TxtInput.scss";
import {
  getPatternValue,
  isValid,
  validateEmail,
  validateMobile,
} from "../../util/Utilities";
import { connect } from "../../data/connect";
import Icon from "../Icon";
interface TxtInputProps {
  label?: string;
  name: any;
  type: any;
  value?: any;
  onChange?: any;
  required?: any;
  errors?: any;
  pattern?: any;
  datatype?: TextInputType;
  description?: string;
  placeholder: string;
  icon?: any;
  onBlur?: any;
  readonly?: any;
  contactForm?: any;
  max?: number;
  setError?: any;
  clearInput?: boolean;
  keyDown? : any;
  isClickable?:any
}
const TxtInput: React.FC<TxtInputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required,
  errors,
  pattern,
  datatype,
  description,
  placeholder,
  icon,
  onBlur,
  readonly,
  contactForm,
  max,
  setError,
  clearInput,
  keyDown,
  isClickable
}) => {
  const [validation, setvalidation] = useState(false);
  //const [error, seterror] = useState("");
  const checkKey = (e) => {
    if(keyDown){
      keyDown(e)
    }
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
    if (type === "tel" && setError) {
      val = "971" + val.replace(/\s/g, "971");
      var nameTest = validateMobile(val, max * 1 + 3);
      console.log(nameTest);
      if (val != null) {
        if (!nameTest) {
          setError("Please Enter " + max + " digit number");
        } else {
          setError("");
        }
      }
      console.log("tteeeelll", val);
    }
    if (e.target.pattern) {
      val = getPatternValue(val, e.target.pattern, "-");
    }
    if (e.target.type === "email") {
      validate = validateEmail(val);
      if (!validate) {
        setError("Please Enter valid Mail id");
      } else {
        setError("");
      }
      console.log(validate);
      setvalidation(!validate);
    }
    if (!readonly) onChange(e, val, validate);
  };

  return (
    <div
      className="form-element-group"
      style={contactForm ? { width: "350px", padding: "0" } : {}}
    >
      <fieldset>
        <legend>{label}</legend>
        {type === "tel" ? (
          <IonLabel className="regularFont-textInput">971</IonLabel>
        ) : (
          <></>
        )}
        <IonInput
          name={name}
          type={type}
          value={
            type === "tel" && value?.substring(0, 3).includes("971")
              ? value.split("971")[1]
              : value
          }
          spellCheck={false}
          autocapitalize="off"
          //readonly={readonly}
          onKeyDown={checkKey}
          onIonChange={onInpChange}
          clearInput={clearInput}
          required={required}
          autocomplete="off"
          pattern={pattern}
          placeholder={placeholder}
          className="textInput"
          onIonBlur={(e) => {
            if (onBlur) onBlur(e);
            else {
            }
          }}
          maxlength={max}
          minlength={max}
          readonly={readonly ? readonly : false}
        >
          {!isClickable && icon && (
            <Icon
              iconProps={icon}
              iconName={name}
              fieldPlaceholder={placeholder}
            />
            // <IonIcon slot="primary" icon={pulseOutline} />
          )}
        </IonInput>
        {isClickable && icon &&(
          <IonButton

          className="icon-button"

          expand="full"

          fill="clear"

          onClick={() => icon.iconClick(name, placeholder)}

        >

          <Icon

            iconProps={icon}

            iconName={name}

            fieldPlaceholder={placeholder}

          />

        </IonButton>
        )}

      </fieldset>

      <div className="">
        {errors && (
          <IonText color="danger" className="validation-message">
            <IonLabel className="ion-padding-start validation-message">
              {errors}
            </IonLabel>
          </IonText>
        )}
      </div>
      {validation && description && (
        <IonText color="danger" className="validation-message">
          <IonLabel className="ion-padding-start validation-message">
            {description}
          </IonLabel>
        </IonText>
      )}
    </div>
  );
};

export default TxtInput;
