import React from "react";
import { Plugins, Capacitor } from "@capacitor/core";
import Store from "../redux/Store";
import * as LoginUser from "../redux/actionTypes/AllActionTypes";
import { useHistory } from "react-router-dom";

export default function Logout(props) {
  let history = useHistory();
  console.log("hhhhhhhh");
  Store.dispatch(async (dispatch) => {
    dispatch({
      type: LoginUser.REMOVE_ACCESS_TOKEN,
    });
    dispatch({
      type: LoginUser.REMOVE_USER,
    });
  });
  history.push("/login");
  if (Capacitor.isNative) {
    //Plugins.App.exitApp();
    history.push("/login");
  }
}
