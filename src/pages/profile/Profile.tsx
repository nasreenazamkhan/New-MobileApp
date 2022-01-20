import { IonContent, IonIcon, IonList, IonPage } from "@ionic/react";
import { arrowForwardOutline } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { Prompt, useHistory } from "react-router-dom";
import Header from "../../components/Header";
import Icon from "../../components/Icon";
import TxtInput from "../../components/txtinput/TxtInput";
import Store from "../../redux/Store";
import { getProfileData, updateProfile } from "../../services/EndPointApi";
import * as EndPointURL from "../../util/EndPointURL";
import { isEmpty } from "../../util/Utilities";
import "./Profile.scss";
import _ from "lodash";
import Alert from "../../components/alert/Alert";

var objectdefn = {
  firstName: {},
};
function Profile() {
  var userDetails = Store.getState().CheckUserStatus;
  const [userInfo, setUser] = useState<any>({
    userName: userDetails.user.userName,
    agentCode: userDetails.user.activeCompanyCode?.split("-")[1],
  });
  const [alertPopup, showAlertPopup] = useState(false);
  const [toGoPathName, settoGoPathName] = useState("");
  let history = useHistory();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    landlineNumber: "",
    submitted: false,
    valid: false,
    agentCode: "",
    userName: "",
  });

  const profileImageIconProps = {
    name: "profile-pic-icon",
    slot: "icon-only",
    class: "zoom84",
  };

  const pencilIconProps = {
    name: "pencil",
    styleProps: {
      stroke: "#FF5959",
      styleProps: { zoom: 0.7 },
    },
  };
  const [errors, setErrors] = useState<any>({});
  const [initialFormData, setinitialFormData] = useState<any>({});

  useEffect(() => {
    fetchDetails();
  }, []);

  const unblockHandle = useRef<any>();
  useEffect(() => {
    if (history) {
      unblockHandle.current = history.block(({ pathname }, action) => {
        settoGoPathName(pathname);
        if (pathname !== "/tabs/profile") {
          let finalData = form;
          delete finalData.agentCode;
          delete finalData.valid;
          delete finalData.submitted;
          if (!_.isEqual(initialFormData, finalData)) {
            showAlertPopup(true);
            return false;
          }
        }
      });
      return function () {
        unblockHandle.current.current && unblockHandle.current.current();
      };
    }
  }, [initialFormData, form]);

  const fetchDetails = async () => {
    let resp: any = await getProfileData(userInfo.userName);
    if (resp?.success) {
      await setForm({
        ...form,
        ...resp.data.data.dataItems[0],
      });
      setinitialFormData(resp.data.data.dataItems[0]);
    }
  };
  var updateFlag = false;
  const profileUpdate = async () => {
    let errs: any = {};
    if (isEmpty(form.firstName)) {
      errs.firstName = "First Name is required";
    }
    if (isEmpty(form.lastName)) {
      errs.lastName = "Last Name is required";
    }

    if (isEmpty(form.email)) {
      errs.email = "Email is required";
    }
    if (isEmpty(form.mobileNumber)) {
      errs.mobileNumber = "Mobile Number is required";
    }
    if (isEmpty(form.landlineNumber)) {
      errs.landlineNumber = "Landline Number is required";
    }
    if (
      errors.email !== "" ||
      errors.mobileNumber !== "" ||
      errors.landlineNumber !== ""
    ) {
    } else if (!Object.values(errors).some((x) => x !== null && x !== "")) {
      let updateProfileResp = await updateProfile(form);
      if (updateProfileResp.success) {
        updateFlag = true;
      } else {
        updateFlag = false;
      }
    }
    const isEmpt = !Object.values(errors).some((x) => x !== null && x !== "");

    setErrors({ ...errors, ...errs });
    return updateFlag;
  };

  const handleChange = (e: any, value: any) => {
    errors[e.target.name] = "";
    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const alertProps = {
    isShow: alertPopup,
    message: "",
    alertAction: alertAction,
    content:
      " You have made some changes. Do you want to save the changes before leaving?",
    okButtonName: "Save",
    cancelButtonName: "Cancel",
    icon: "<img src='/assets/icon/are-you-sure.svg'/>",
    itemName: "",
  };

  async function alertAction(item, actionType) {
    showAlertPopup(false);
    if (actionType) {
      var upadtedOrNot = await profileUpdate();
      if (upadtedOrNot) {
        fetchDetails();
        if (unblockHandle) {
          unblockHandle.current();
        }
        history.push(toGoPathName + "");
      }
    } else {
      setForm(initialFormData);
      if (unblockHandle) {
        unblockHandle.current();
      }
      history.push(toGoPathName + "");
    }
  }
  return (
    <IonPage id="profilePage">
      <Header
        label="My Profile"
        action="check"
        checkClick={() => profileUpdate()}
      />
      <IonContent>
        <Alert alertProps={alertProps} />
        <div className="main-container">
          <div className="login-logo"></div>
          <div className="profile-icon">
            <div>
              <Icon iconProps={profileImageIconProps} />
            </div>
            <div className="pencil-container">
              <div className="border-pencil">
                <Icon iconProps={pencilIconProps} />
              </div>
            </div>
          </div>
          <div className="form-content">
            <div className="login-box-header"></div>

            <form noValidate onSubmit={profileUpdate} autoComplete="off">
              <IonList className="form-section">
                <div className="login-header">
                  {form.userName}
                  {/* <hr /> */}
                </div>

                <div className="list-margin">
                  <TxtInput
                    name={"agentCode"}
                    value={userInfo.agentCode}
                    label="Agent code"
                    errors={errors.agentCode}
                    type="text"
                    required={true}
                    readonly={true}
                    onChange={handleChange}
                    datatype="TEXT"
                    placeholder="Agent code"
                  />
                  <TxtInput
                    name={"firstName"}
                    value={form.firstName}
                    label="First Name"
                    errors={errors.firstName}
                    type="text"
                    required={true}
                    onChange={handleChange}
                    datatype="TEXT"
                    placeholder="First Name"
                  />

                  <TxtInput
                    name={"lastName"}
                    value={form.lastName}
                    label="Last Name"
                    errors={errors.lastName}
                    type="text"
                    required={true}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />

                  <TxtInput
                    name={"email"}
                    value={form.email}
                    label="Email"
                    errors={errors.email}
                    type="email"
                    required={true}
                    onChange={handleChange}
                    //description="Please enter email"
                    placeholder="Email"
                    setError={(erro) => setErrors({ ...errors, email: erro })}
                  />

                  <TxtInput
                    name={"mobileNumber"}
                    value={form.mobileNumber}
                    label="Mobile"
                    errors={errors.mobileNumber}
                    type="tel"
                    required={true}
                    onChange={handleChange}
                    datatype="TEL_NUM"
                    //pattern="###-##-#######"
                    description="Tel Format 971 123456789"
                    placeholder="Mobile"
                    max={9}
                    setError={(erro) =>
                      setErrors({ ...errors, mobileNumber: erro })
                    }
                  />

                  <TxtInput
                    name={"landlineNumber"}
                    value={form.landlineNumber}
                    label="Phone"
                    errors={errors.landlineNumber}
                    type="tel"
                    required={true}
                    onChange={handleChange}
                    datatype="TEL_NUM"
                    //pattern="###-##-######"
                    description="Tel Format 971 12345678"
                    placeholder="Phone"
                    max={8}
                    setError={(erro) =>
                      setErrors({ ...errors, landlineNumber: erro })
                    }
                  />
                </div>
              </IonList>
              {/* <div className="button-div">
                <div className="button-holder" onClick={profileUpdate}>
                  <IonIcon slot="icon-only" icon={arrowForwardOutline} />
                </div>
              </div> */}
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Profile;
