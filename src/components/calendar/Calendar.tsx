import {
  IonDatetime,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import React from "react";
import { nextYear, todayDate } from "../../services/Common";
import Icon from "../Icon";
import "./Calendar.scss";

interface calendarProps {
  label?: string;
  name: any;
  type: any;
  value?: any;
  onChange?: any;
  required?: any;
  errors?: any;
  pattern?: any;
  description?: string;
  placeholder: string;
  icon?: any;
  onBlur?: any;
  minDate?: any;
  className?: any;
  displayFormat?: any;
  max?: any;
  disabled?: boolean;
}

const Calendar: React.FC<calendarProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required,
  errors,
  pattern,
  description,
  placeholder,
  icon,
  max,
  minDate,
  className,
  displayFormat,
  disabled,
}) => {
  // const onInpChange = (e) => {
  //   let val = e.target.value;
  //   let validate;
  //   if (e.target.pattern) {
  //     val = getPatternValue(val, e.target.pattern, "-");
  //   }
  //   if (e.target.type === "email") {
  //     validate = validateEmail(val);
  //     setvalidation(!validate);
  //   }
  //   if (!readonly) onChange(e, val, validate);
  // };

  return (
    <>
      <IonDatetime
        className={className}
        // aria-required={true}
        displayFormat={displayFormat}
        value={value}
        onIonChange={(e) => {
          onChange(e, e.detail.value);
        }}
        onClick={(e) => e.stopPropagation()}
        placeholder={placeholder}
        max={max ? max : nextYear}
        min={minDate ? minDate : todayDate}
        name={name}
        disabled={disabled ? disabled : false}
      ></IonDatetime>
      {icon && (
        <Icon iconProps={icon} />
        // <IonIcon slot="primary" icon={pulseOutline} />
      )}

      {/* <div className="">
        {errors && (
          <IonText color="danger" className="validation-message">
            <IonLabel className="ion-padding-start">{errors}</IonLabel>
          </IonText>
        )}
      </div> */}
    </>
  );
};
export default Calendar;
