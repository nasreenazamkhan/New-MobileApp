import Store from "../redux/Store";
import * as LoginUser from "../redux/actionTypes/AllActionTypes";
import { Plugins, Capacitor } from "@capacitor/core";
import * as EndPointURL from "../util/EndPointURL";

import "@capacitor-community/http";
const { Http, Device } = Plugins;
var deviceLang = "";

export function logDeviceLanguageInfo(){
  Device.getLanguageCode().then((lang) => {
    console.log(lang);
    const arr=lang.value.split('-');
    // setDeviceLang(arr.shift());
    deviceLang = arr.shift();
  });
};

export async function HttpGetRequest(data) {
  logDeviceLanguageInfo();
  var httprequestStatus;
  var successData = "";
  //let handler = Network.addListener('networkStatusChange', (status) => {

  httprequestStatus = await getAccessToken(
    data.url.includes("auth/mobilelogin")
  ).then((result) => {
    /*  I add result.token to resolved tempraly token issue   */
    let access_token = result.access_token;
    let config = {
      headers: data.header,
      // headers: {
      //   access_token: access_token,
      //   "Content-Type": "application/json",
      //   mobile: "yes",
      // },
    };
    console.log(config);
    // let config = {};
    config["headers"]["access_token"] = access_token;
    config["headers"]["Content-Type"] = "application/json";
    config["headers"]["mobile"] = "YES";
    config["headers"]["locale"] = deviceLang;
    //*********************Commented Code start ************
    //get access token
    return Store.dispatch(async (dispatch) => {
      dispatch({
        type: LoginUser.API_REQUEST_STARTED,
      });
      // let status = await Network.getStatus();
      // console.log("Network status before ", JSON.stringify(status));

      // return await axios
      //   .get(data.url, config)

      return await Http.request({
        method: "GET",
        url: data.url,
        headers: config.headers,
        //params: data.header,
      })

        .then((response) => {
          console.log(response);
          if (
            response.data.status === "FAIL" ||
            response.data.status === "fail" ||
            response.data.status === "error" ||
            response.status === "error" ||
            response.data.status === "Error" ||
            response.status === 500 ||
            response.status === 404
          ) {
            if (response.status === 500) {
              response.data.message = "Server Issue. Please try again later";
            }
            successData = { success: false, data: response.data };
            dispatch({
              type: LoginUser.API_REQUEST_FAILURE,
              payLoad: response.data.message,
            });
          } else if (response.status == 401) {
            handleUnAutharisedCall(data, "get");
          } else {
            successData = { success: true, data: response.data };
          }
          // if (
          //   response.data.status == "FAIL" ||
          //   response.data.status == "fail" ||
          //   response.data.status == "error"
          // ) {
          //   successData = { success: false, data: response.data };
          //   dispatch({
          //     type: LoginUser.API_REQUEST_FAILURE,
          //     payLoad: response.data.message,
          //   });
          // } else if (response.status === 401) {
          //   console.log(44444444000001111);
          //   httprequestStatus = getAccessToken(
          //     data.url.includes("mobile/api/auth")
          //   );
          //   successData = { success: "401", data: "" };
          // } else {
          //   successData = { success: true, data: response.data };
          // }
          dispatch({
            type: LoginUser.API_REQUEST_SUCCESS,
          });
          //const successData = { success: true, data: response.data };
          return successData;
        })
        .catch(function (error) {
          // handle error
          const errorData = { success: false, data: error };
          if (!error.success) {
            dispatch({
              type: LoginUser.API_REQUEST_FAILURE,
              payLoad: error.message,
            });
          } else {
            dispatch({
              type: LoginUser.API_REQUEST_FAILURE,
              payLoad: error.errorMessage,
            });
          }
          console.error("error on ", JSON.stringify(error));
          return errorData;
        });
      //************End */
    });
    //************End */
  });
  return httprequestStatus;
}

export async function httpPostRequest(content) {
  logDeviceLanguageInfo()
  var contenData = {};
  console.log(content.url);
  var successData = "";
  var httprequestStatus;

  httprequestStatus = await getAccessToken(
    content.url.includes("auth/mobilelogin")
  ).then((result) => {
    let access_token = result.access_token;
    let config = {
      headers: {
        headers: {
          access_token: access_token,
          mobile: "YES",
          "Content-Type": "application/json",
          locale:"deviceLang"
        },
      },
    };
    // config["headers"]["Content-Type"] = "application/json";
    // config["headers"]["Access-Control-Allow-Origin"] = "*";
    //get access token
    return Store.dispatch(async (dispatch) => {
      dispatch({
        type: LoginUser.API_REQUEST_STARTED,
      });

      contenData = content.data;
      // return await axios
      //   .post(content.url, content.data, config.headers)
      return await Http.request({
        method: content.callType == "patch" ? "PATCH" : "POST",
        url: content.url,
        headers: config.headers.headers,
        data: content.data,
        // data: JSON.parse(JSON.stringify(content.data)),
      })
        .then((response) => {
          console.info(response);
          dispatch({
            type: LoginUser.API_REQUEST_SUCCESS,
          });
          console.log(response.data.status);
          if (
            response.data.status === "FAIL" ||
            response.data.status === "fail" ||
            response.data.status === "error" ||
            response.status === "error" ||
            response.data.status === "Error" ||
            response.status === 500 ||
            response.status === 404
          ) {
            if (response.status === 500) {
              response.data.message = "Server Issue. Please try again later";
            }
            successData = { success: false, data: response.data };
          } else {
            successData = { success: true, data: response.data };
          }

          return successData;
        })
        .catch(function (error) {
          console.info(error);
          // handle error
          dispatch({
            type: LoginUser.API_REQUEST_FAILURE,
          });
          console.error("Error on ", JSON.stringify(error));
          const errorData = { success: false, data: error };
          return errorData;
        });
    });
  });
  return httprequestStatus;
}
export async function getAccessToken(authUrl) {
  var data;
  console.log(Store.getState().CheckAccessToken, authUrl);
  let user = Store.getState().CheckUserStatus.user;
  if (!authUrl) {
    if (Store.getState().CheckAccessToken.status) {
      let isAccessToken = await Store.getState().CheckAccessToken;
      var agentType = user.activeCompanyCode?.split("-")[0];
      var agentCode = user.activeCompanyCode?.split("-")[1];
      console.log(
        EndPointURL.tokenUrl +
          "&agentCode=" +
          agentCode +
          "&agentType=" +
          agentType +
          "&userName=" +
          user.userName
      );
      return isAccessToken.user;
    } else {
      let user = Store.getState().CheckUserStatus.user;

      var agentType = user.activeCompanyCode?.split("-")[0];
      var agentCode = user.activeCompanyCode?.split("-")[1];
      console.log(
        agentCode,
        "api call for access-token",
        agentType,
        user.userName
      );
      if (agentCode && agentType && user.userName) {
        await Store.dispatch(async (dispatch) => {
          dispatch({
            type: LoginUser.API_REQUEST_STARTED,
          });
          // let url =
          //   EndPointURL.tokenUrl + "&agentCode=F7100&agentType=F&userName=fzuser";
          let url =
            EndPointURL.tokenUrl +
            "&agentCode=" +
            agentCode +
            "&agentType=" +
            agentType +
            "&userName=" +
            user.userName;
          // data = await axios
          // .get(url) // access token api
          data = await Http.request({
            method: "GET",
            url: url,
          })
            .then((response) => {
              dispatch({
                type: LoginUser.API_REQUEST_SUCCESS,
              });
              if (response.status == 500) {
                dispatch({
                  type: LoginUser.REMOVE_ACCESS_TOKEN,
                });
              } else {
                dispatch({
                  type: LoginUser.ADD_ACCESS_TOKEN,
                  data: {
                    access_token: response.data.token,
                    refresh_token: "00",
                  },
                });
                return {
                  access_token: response.data.token,
                  refresh_token: "00",
                };
              }
            })

            .catch(function (error) {
              // handle error
              dispatch({
                type: LoginUser.API_REQUEST_FAILURE,
              });
              console.error("Error on ", JSON.stringify(error));
              return "error";
            });
        });
      }
      return data;
    }
  }
  return { access_token: "" };
}

export function handleUnAutharisedCall(data, type) {
  Store.dispatch(async (dispatch) => {
    dispatch({
      type: LoginUser.REMOVE_ACCESS_TOKEN,
    });
  });
  getAccessToken(data.url.includes("auth/mobilelogin")).then((result) => {
    if (type === "get") {
      HttpGetRequest(data);
    } else {
      httpPostRequest(data);
    }
  });
}
