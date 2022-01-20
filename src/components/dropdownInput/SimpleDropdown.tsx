import { IonLabel, IonSelect, IonSelectOption, IonText } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Icon from "../Icon";
import "./DrpdownInput.scss";

interface SimpleDropdownProps {
  name: any;
  type?: any;
  value?: any;
  onChange?: any;
  required?: any;
  errors?: any;
  pattern?: any;
  datatype?: any;
  description?: string;
  placeholder?: string;
  icon?: any;
  icon2?: any;
  onBlur?: any;
  listValues?: Array<any>;
  selectedName?;
  className?: any;
  disabled?: boolean;
}
const SimpleDropdown: React.FC<SimpleDropdownProps> = ({
  name,
  value,
  onChange,
  errors,
  description,
  placeholder,
  listValues,
  type,
  selectedName,
  icon,
  icon2,
  className,
  disabled,
}) => {
  const [valueD, setValueD] = useState({});
  let history = useHistory();
  useEffect(() => {
    setValueD({ label: selectedName, value: value });
  }, []);
  const onInpChange = (e) => {
    let val = e.detail.value;
    setValueD(val);
    if (val === "addAddress") {
      history.push("/addAddress");
    } else {
      onChange(e, val);
    }
  };

  const options = {
    cssClass: "my-custom-interface",
  };
  return (
    <>
      <IonSelect
        //selectedText={value}

        onClick={(e) => {
          e.stopPropagation();
        }}
        name={name}
        placeholder={placeholder}
        value={value}
        onIonChange={onInpChange}
        cancel-text
        interface="popover"
        className={className + " fullWidth"}
        interfaceOptions={options}
        disabled={disabled ? disabled : false}
      >
        {type === "address" && (
          <IonSelectOption value="addAddress" class="selectAddAddr">
            Add new Address
            {/* <IonIcon icon={addCircle} className="addIcon" /> */}
            <img src="/assets/icon/eye.svg" />
          </IonSelectOption>
        )}
        {listValues?.map((item, index) =>
          type === "address" ? (
            <IonSelectOption key={index} value={item}>
              {item.consigneeName} {item.dropAddress}
              {item.email}
            </IonSelectOption>
          ) : (
            <IonSelectOption key={index} value={item.value}>
              {item.label}
            </IonSelectOption>
          )
        )}
      </IonSelect>
      {icon && <Icon iconProps={icon} />}
      {icon2 && <Icon iconProps={icon2} />}
      <div className="">
        {errors && (
          <IonText color="danger" className="validation-message">
            <IonLabel className="ion-padding-start">{errors}</IonLabel>
          </IonText>
        )}
      </div>
      {/* {validation && description && ( */}
      <IonText color="danger" className="validation-message">
        <IonLabel className="ion-padding-start">{description}</IonLabel>
      </IonText>
      {/* )} */}
    </>
  );
};
export default SimpleDropdown;
