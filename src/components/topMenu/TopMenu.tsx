import {
  IonButton,
  IonIcon,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useState } from "react";
import "./TopMenu.scss";

export default function TopMenu(props) {
  const agentCodeoptions = {
    cssClass: "agent-interface-class",
  };
  const [value, setValue] = useState<any>({});

  return (
    <IonRow className="horizontal-scroll">
      <div className="filter-buttons">
        {props.topMenuProps.map((item, index) => (
          <div key={index}>
            {item.type == "button" && (
              <IonButton
                className="circ-button"
                size="small"
                onClick={() => item.clickedOnTopMenu()}
              >
                {item.icon && <IonIcon icon={item.icon} slot={item.slot} />}
                {item.src && (
                  <IonIcon
                    slot={item.slot}
                    src={"/assets/icon/" + item.src + ".svg"}
                    style={{
                      fontSize: item.size,
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      transform:item.rotate
                    }}
                  />
                )}
                {item.name && item.name}
              </IonButton>
            )}
            {item.type == "dropDown" && (
              <div id="drop-down-css">
                <fieldset>
                  <IonSelect
                    value={value}
                    selectedText={value.label}
                    interface="popover"
                    onIonChange={(e) => {
                      let val = e.detail.value;
                      setValue(val);
                      console.log(item.selected);
                      item.clickedOnTopMenu(val);
                    }}
                    cancel-text
                    placeholder={item.name}
                    interfaceOptions={agentCodeoptions}
                    className="circ-button"
                  >
                    {item.list.map((opt, index) => {
                      return (
                        <IonSelectOption
                          value={opt}
                          key={index}
                          className="select-opt"
                        >
                          {opt.label}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>
                </fieldset>
              </div>
            )}
          </div>
        ))}
      </div>
    </IonRow>
  );
}
