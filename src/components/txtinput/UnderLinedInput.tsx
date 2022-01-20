import { IonInput, IonLabel, IonText } from "@ionic/react";
import React, { useState } from "react";
import { TextInputType } from "../../util/DataTypes";
import {
  getPatternValue,
  isValid,
  validateEmail,
  validateMobile,
} from "../../util/Utilities";
import "./TxtInput.scss";

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
  readonly?: boolean;
  setError?: any;
  max?: any;
}
const UnderLinedInput: React.FC<TxtInputProps> = ({
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
  setError,
  max,
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
    <div className="form-element-group customStyle">
      <div className="blue-underLine">
        {/* <legend>{label}</legend> */}
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
          onKeyDown={checkKey}
          onIonChange={onInpChange}
          //clearInput={true}
          required={required}
          autocomplete="off"
          pattern={pattern}
          placeholder={placeholder}
          className="textInputWithBlueBorder"
          onIonBlur={(e) => {
            if (onBlur) onBlur(e);
          }}
          readonly={readonly ? readonly : false}
        ></IonInput>
      </div>

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

export default UnderLinedInput;
