import {
  IonIcon,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import { addCircle } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./DrpdownInput.scss";
import { useHistory } from "react-router-dom";

interface DrpDownInputProps {
  label?: string;
  name: any;
  type?: any;
  value?: any;
  onChange: any;
  required?: any;
  errors?: any;
  pattern?: any;
  datatype?: any;
  description?: string;
  placeholder: string;
  icon?: any;
  onBlur?: any;
  listValues?: Array<any>;
  disabled?: any;
  selectedName?: any;
}
const DrpdownInput: React.FC<DrpDownInputProps> = ({
  label,
  name,
  value,
  onChange,
  errors,
  description,
  placeholder,
  listValues,
  disabled,
  selectedName,
  type,
}) => {
  // const [selectedName, setselectedName] = useState();
  const [valueD, setValueD] = useState({});
  let history = useHistory();
  useEffect(() => {
    setValueD({ label: selectedName, value: value });
  }, []);

  const onInpChange = (e) => {
    let val = e.target.value;
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
    <div className="form-element-group">
      <fieldset>
        <legend>{label}</legend>
        <IonSelect
          // selectedText={selectedName}
          name={name}
          placeholder={placeholder}
          value={value || valueD}
          onIonChange={onInpChange}
          cancel-text
          interface="popover"
          className="dropdownInput"
          interfaceOptions={options}
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
                {item.dropAddress}
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
      </fieldset>

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
    </div>
  );
};

export default DrpdownInput;
