import React from "react";
import { Plugins, AppState } from "@capacitor/core";
import { useHistory } from "react-router-dom";
import { sessionTimeoutInSec } from "../util/Constants";

const { App } = Plugins;

export default function ApplicationState(props) {
  var timeout;
  let history = useHistory();
  App.addListener("appStateChange", (state: AppState) => {
    if (!state.isActive) {
      timeout = setTimeout(() => {
        history.push("/login");
      }, sessionTimeoutInSec);
    } else {
      clearTimeout(timeout);
    }
  });
  return <div></div>;
}
