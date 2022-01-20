import React, { useState, useRef, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonList,
  IonLabel,
  IonText,
  IonIcon,
} from "@ionic/react";
import {
  arrowForwardOutline,
} from "ionicons/icons";
import "./Login.scss";
import { setIsLoggedIn, setUsername } from "../../data/user/user.actions";
import { connect } from "../../data/connect";
import { RouteComponentProps } from "react-router";
import { doLogin, fetchAllDeclaration, registerDeviceToDB } from "../../services/EndPointApi";
import * as EndPoints from "../../util/EndPointURL";
import TxtInput from "../../components/txtinput/TxtInput";
import InappBrowser from "../../components/InappBrowser";
import { termsAndConditionUrl } from "../../util/Constants";
import * as reduxActions from "../../redux/actions/AllActions";
import Store from "../../redux/Store";
import { Plugins, PushNotificationToken } from '@capacitor/core';
const { PushNotifications, Device  } = Plugins;

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface LoginProps extends OwnProps, DispatchProps {}
const uploadIcon = {
  name: "upload-quick",
  slot: "",
  class: "zoom2",
};
const Login: React.FC<LoginProps> = ({
  setIsLoggedIn,
  history,
  //setUsername: setUsernameAction,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<any>({});
  const [form, setForm] = useState({
    username: "",
    password: "",
    submitted: false,
    valid: false,
  });
  const [deviceId, setDeviceId] = useState<string>("");
  const [deviceLang, setDeviceLang] = useState<string>("");
  const [deviceToken, setDeviceToken] = useState<string>("");

  useEffect(() => {
    console.log('useEffect')
    logDeviceInfo();
    logDeviceLanguageInfo();
    getDeviceToken();
  },[])

  const logDeviceInfo = () => {
    Device.getInfo().then((info) => {
      console.log('deviceInfo', info);
      setDeviceId(info.uuid);
    });
  };

  const logDeviceLanguageInfo = () => {
    Device.getLanguageCode().then((lang) => {
      console.log('language',lang);
      const arr=lang.value.split('-');
      setDeviceLang(arr.shift());
    });
  };

  const getDeviceToken = () => {
    PushNotifications.register();
    
    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
    (token: PushNotificationToken) => {
      console.log("deviceToken", token.value)
      setDeviceToken(token.value);
    });

     // Some issue with our setup and push will not work
     PushNotifications.addListener('registrationError', 
     (error) => {
       console.log('Error on registration: ' + JSON.stringify(error));
     }
   );

   // Show us the notification payload if the app is open on our device
   PushNotifications.addListener('pushNotificationReceived', 
     (notification) => {
       console.log('Push received: ' + JSON.stringify(notification));
     }
   );

   // Method called when tapping on a notification
   PushNotifications.addListener('pushNotificationActionPerformed', 
     (notification) => {
       console.log('Push action performed: ' + JSON.stringify(notification));
     }
   );
  }

  const registerDevice = async () => {
    var data = {
        notificationToken : deviceToken,
        preferredLanguage: deviceLang,
        deviceId: deviceId
    };
    console.log('data - url',data +" - "+ EndPoints.deviceRegisterUrl);
    var response = await registerDeviceToDB(EndPoints.deviceRegisterUrl, data);
    console.log('apiResponse',response);
  }

  const loginClicked = async (e: React.FormEvent) => {
    console.log('login clicked')
    let errs: any = {};
    e.preventDefault();
    setFormSubmitted(true);

    if (!form.username) {
      errs.username = "Username is required";
    }
    if (!form.password) {
      errs.password = "Password is required";
    }
    if (form.username && form.password) {
      var endPointHeader = {
        userName: form.username,
        password: form.password,
        userType: "IMPORTER_APP",
      };

      var response = await doLogin(EndPoints.loginUrl, endPointHeader);
      if (await response.success) {
        var result = response.data.data.dataItems[0];
        var accessToken = await reduxActions.AddAccessToKen(result.accessToken);
        if (accessToken) Store.dispatch(accessToken);

        var agentType = await reduxActions.AddAgentType(
          // result.user.activeCompanyCode
          result.user.userType
        );
        if (agentType) Store.dispatch(agentType);
        var addUser = await reduxActions.AddUser(result.user);
        if (addUser) Store.dispatch(addUser);
        // if (result.user.agents && result.user.agents.length > 0) {
        //   history.push("/tabs", result);
        // } else {

        var response = await fetchAllDeclaration(
          EndPoints.fetchConfirmDetails + form.username
        );
        if (response.success) {
          var userDetails = response.data.data.dataItems[0];

          if (!response.data.data.dataItems[0].confirmDetails) {
            history.push("/tabs/", response);
          } else {
            history.push("/confirmDetails", userDetails);
            //history.push("/tabs/", userDetails);
          }
        } else {
          errs.errorGeneral = response.data.message;
        }
        // }
        await setIsLoggedIn(true);
        await registerDevice();
        //await setUsernameAction(form.username);
        //history.push("/tabs/", { direction: "none" });
      } else {
        console.log(response);
        errs.errorGeneral = response.data.message || response.data.error;
        setError(errs);
      }
    }
    setError(errs);
  };

  const handleChange = (e: any, value: any) => {
    setForm({
      ...form,
      [e.target.name]: value,
    });
    setError({ ...error, [e.target.name]: "" });
  };

  var userNmaeIcon = {
    name: "username",
    slot: "start",
    login: true,
    class: "zoom12",
  };

  var passwordIcon = {
    name: "password",
    slot: "start",
    login: true,
    class: "zoom12",
  };

  const fileInput = useRef(null);

  return (
    <IonPage id="login-page">
      <IonContent>
        <div className="main-container">
          <div className="login-logo">
            <img src="assets/img/dubai_trade_logo.png" alt="Ionic logo" />
          </div>
          <div className="form-content">
            <div className="login-box-header"></div>
            <form noValidate onSubmit={loginClicked} autoComplete="off">
              <IonList className="form-section">
                <div className="login-header">
                  Login
                  <hr />
                </div>
                <TxtInput
                  name={"username"}
                  value={form.username}
                  label="Username"
                  errors={error.username}
                  type="text"
                  required={true}
                  onChange={handleChange}
                  datatype="TEXT"
                  placeholder="Username"
                  icon={userNmaeIcon}
                />

                <TxtInput
                  name={"password"}
                  value={form.password}
                  label="Password"
                  errors={error.password}
                  type="password"
                  required={true}
                  onChange={handleChange}
                  datatype="TEXT"
                  placeholder="Password"
                  icon={passwordIcon}
                />

                <div className="">
                  {error.errorGeneral && (
                    <IonText
                      color="danger"
                      className="validation-message genralError"
                    >
                      <IonLabel className="ion-padding-start">
                        {error.errorGeneral}
                      </IonLabel>
                    </IonText>
                  )}
                </div>

                <div className="login-tnc">
                  <div>by clicking "submit" you agree to our</div>
                  <div
                    onClick={() => InappBrowser(termsAndConditionUrl)}
                    className="tnc"
                  >
                    terms and conditions
                  </div>
                </div>
              </IonList>
              <div className="button-div">
                <div className="button-holder" onClick={loginClicked}>
                  <IonIcon slot="icon-only" icon={arrowForwardOutline} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername,
  },
  component: Login,
});
