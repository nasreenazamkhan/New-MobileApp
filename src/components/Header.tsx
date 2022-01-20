import {
  IonButton,
  IonCheckbox,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { closeSharp, informationCircle, search } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ClearReduxStore from "../util/ClearReduxStore";
import "./Header.scss";
import Icon from "./Icon";
import Store from "../redux/Store";
import * as EndPointURL from "../util/EndPointURL";
import * as reduxActions from "../redux/actions/AllActions";
import { loginWithAgent } from "../services/EndPointApi";

interface HeaderParam {
  label?: string;
  action?: string;
  showAgent?: boolean;
  agentHeader?: boolean;
  customBack?: boolean;
  searchClick?(e: any): void;
  infoClick?(e: any): void;
  checkClick?(e: any): void;
  backClick?(e: any): void;
  locationProps?: any;
  checkedProps?: any;
  customClick?(actionTYpe: string): void;
  changedAgent?(): void;
}
const Header: React.FC<HeaderParam> = (HeaderParam) => {
  const [actionType, setActionType] = useState({
    search: true,
    check: true,
    close: true,
    home: true,
    info: false,
  });

  var userDetails = Store.getState().CheckUserStatus.user;

  const [checked, setChecked] = useState(false);
  const [checkedLabel, setCheckedLabel] = useState("Select All");
  const backIconProps = {
    name: "back-arrow",
    slot: "icon-only",
    zoom: "",
  };
  const homeIconProps = {
    name: "home-new",
    slot: "icon-only",
    zoom: "",
  };
  const checkIconProps = {
    name: "Check",
    slot: "icon-only",
    zoom: "",
  };

  function checkAndUncheckAll(checked) {
    console.log(checked);
    setChecked(checked);
    if (checked) {
      setCheckedLabel("Unselect All");
      HeaderParam.checkedProps.addContainerToCart("", "", "checked");
    } else {
      HeaderParam.checkedProps.addContainerToCart("", "", "unchecked");
      setCheckedLabel("Select All");
    }
  }

  useEffect(() => {
    updateActionType(HeaderParam.action ? HeaderParam.action : "none");
  }, []);

  let history = useHistory();
  const back = (e: any) => {
    if (HeaderParam.customClick) HeaderParam.customClick("/containerCart");
    else {
      if (HeaderParam.customBack) {
        HeaderParam.backClick(e);
      } else {
        history.goBack();
      }
    }
  };

  const updateActionType = (myValue: string) => {
    if (myValue) {
      if (myValue === "search") {
        setActionType({
          search: false,
          check: true,
          close: true,
          home: true,
          info: true,
        });
      } else if (myValue === "check") {
        setActionType({
          search: true,
          check: false,
          close: true,
          home: true,
          info: true,
        });
      } else if (myValue === "close") {
        setActionType({
          search: true,
          check: true,
          close: false,
          home: true,
          info: true,
        });
      } else if (myValue === "home") {
        setActionType({
          search: true,
          check: true,
          close: true,
          home: false,
          info: true,
        });
      } else if (myValue === "info") {
        setActionType({
          search: true,
          check: true,
          close: true,
          home: true,
          info: false,
        });
      }
    }
  };

  function homeButtonClicked() {
    if (HeaderParam.customClick) HeaderParam.customClick("/tabs/landing");
    else {
      history.push("/tabs/landing");
      ClearReduxStore();
    }
  }

  const selectUserType = async (e: any) => {
    let data = e.detail.value;
    let url =
      EndPointURL.loginAgent +
      "?agentCode=" +
      data.agentCode +
      "&agentType=" +
      data.agentType;

    var endPointHeader = {
      userName: userDetails.userName,
      userType: "IMPORTER_APP",
    };

    var response = await loginWithAgent(url, endPointHeader);
    var result = response.data.data.dataItems[0];
    if (await response.success) {
      var accessToken = await reduxActions.AddAccessToKen(result.accessToken);
      if (accessToken) Store.dispatch(accessToken);

      var agentType = await reduxActions.AddAgentType(
        result.user.activeCompanyCode
      );
      if (agentType) Store.dispatch(agentType);

      var selectedAgent = await reduxActions.AddSelectedAgent(data);

      if (selectedAgent) Store.dispatch(selectedAgent);

      var test = Store.getState().CheckUserStatus;
      HeaderParam.changedAgent
        ? HeaderParam.changedAgent()
        : console.log("changed");
    }
  };

  const agentCodeoptions = {
    cssClass: "agent-interface",
  };

  return (
    <IonHeader
      style={HeaderParam.agentHeader ? { height: "102px" } : { height: "10%" }}
    >
      <IonToolbar className="header">
        <div
          className="mainContainer"
          style={!HeaderParam.agentHeader ? { paddingBottom: 0 } : {}}
        >
          {HeaderParam.checkedProps ? (
            <div
              className="selectAllBg"
              hidden={!HeaderParam.checkedProps.showChecked}
            >
              <div>
                <IonButton
                  fill="clear"
                  onClick={(e) => {
                    back(e);
                  }}
                >
                  <Icon iconProps={backIconProps} />
                </IonButton>
              </div>
              <div className="checkBoxContainer">
                <IonCheckbox
                  className="checkBox"
                  checked={checked}
                  onIonChange={(e) => checkAndUncheckAll(e.detail.checked)}
                />
              </div>
              <div className="checkBoxLabelCol">
                <IonLabel className="checkBoxLabel">{checkedLabel}</IonLabel>{" "}
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="backArrow">
            {HeaderParam.label != "Home" && actionType.close ? (
              <IonButton
                fill="clear"
                onClick={(e) => {
                  back(e);
                }}
              >
                <Icon iconProps={backIconProps} />
              </IonButton>
            ) : (
              <></>
            )}
          </div>
          <div className="header-label">
            {" "}
            <IonText>{HeaderParam.label}</IonText>
          </div>
          <div className="header-right">
            <IonButton
              hidden={actionType.search}
              fill="clear"
              onClick={HeaderParam.searchClick}
            >
              <IonIcon
                slot="icon-only"
                icon={search}
                style={{ minWidth: "30px" }}
              />
            </IonButton>
            <IonButton
              hidden={actionType.info}
              fill="clear"
              onClick={HeaderParam.infoClick}
            >
              <IonIcon
                src={"assets/icon/" + "info-italic" + ".svg"}
                slot="icon-only"
                // icon={informationCircle}
                style={{ minWidth: "30px" }}
              />
               
            </IonButton>
            <IonButton
              hidden={actionType.check}
              fill="clear"
              onClick={HeaderParam.checkClick}
            >
              {/* <IonIcon slot="icon-only" src="" style={{minWidth:'30px'}}/> */}
              <Icon iconProps={checkIconProps} />
            </IonButton>
            <IonButton
              hidden={actionType.home}
              fill="clear"
              onClick={(e) => homeButtonClicked()}
            >
              <Icon iconProps={homeIconProps} />
            </IonButton>
            <IonButton
              hidden={actionType.close}
              fill="clear"
              onClick={(e) => {
                back(e);
              }}
            >
              <IonIcon slot="icon-only" icon={closeSharp} />
            </IonButton>
            <IonButton hidden={HeaderParam.action !== ""} fill="clear">
              <IonIcon />
            </IonButton>
          </div>
        </div>
        {userDetails.agents && HeaderParam.agentHeader && (
          <IonToolbar className="agent-code-header">
            <IonSelect
              value={userDetails.selectedAgent}
              interface="popover"
              onIonChange={(e) => selectUserType(e)}
              disabled={
                !HeaderParam.showAgent || userDetails.agents.length == 1
              }
              style={
                !HeaderParam.showAgent ? { backgroundColor: "#DDF1FF" } : {}
              }
              interfaceOptions={agentCodeoptions}
            >
              {userDetails.agents.map((item, index) => {
                return (
                  <IonSelectOption
                    value={item}
                    key={index}
                    className="select-agent-opt"
                  >
                    {item.agentCode + "-" + item.agentName}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
            <IonIcon
              src="assets/icon/arrow-down.svg"
              className="arrow-down-icon"
              hidden={!HeaderParam.showAgent || userDetails.agents.length == 1}
            />
          </IonToolbar>
        )}
        {/* </IonImg> */}
      </IonToolbar>
    </IonHeader>
  );
};
export default Header;
