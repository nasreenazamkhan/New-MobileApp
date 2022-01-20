import {
  IonContent,
  IonIcon,
  IonLabel,
  IonList,
  IonPage,
  IonText,
} from "@ionic/react";
import { arrowForwardOutline } from "ionicons/icons";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import TxtInput from "../../components/txtinput/TxtInput";
import { confirmUserDetails } from "../../services/EndPointApi";
import { isEmpty } from "../../util/Utilities";
import * as EndPoints from "../../util/EndPointURL";

import "./ConfirmDetails.scss";

interface OwnProps extends RouteComponentProps {}

interface LoginProps extends OwnProps {}

function ConfirmDetails(confirmDetailsProps) {
  const [form, setForm] = useState(confirmDetailsProps.location.state);
  const [validate, setvalidate] = useState();
  const [errors, setErrors] = useState<any>({});

  const addOrUpdateuserDetails = async () => {
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
      errs.mobileNumber = "Mobile number is required";
    }
    if (isEmpty(form.landLineNumber)) {
      errs.landLineNumber = "Phone number is required";
    }
    // if (!validate) {
    //   console.log(validate);
    // } else
    if (
      form.firstName &&
      form.lastName &&
      form.email &&
      form.mobileNumber &&
      form.landLineNumber
    ) {
      form.confirmDetails = true;
      var response = await confirmUserDetails(EndPoints.confirmDetailUrl, form);
      //var result = response.data?.data?.dataItems[0];
      if (response && response?.success) {
        confirmDetailsProps.history.push("/tabs/", { direction: "none" });
      } else {
        errs.errorGeneral = response?.data?.message || "Error occured";
      }
    }
    setErrors(errs);
  };

  const handleChange = (e: any, value: any, validate: any) => {
    setvalidate(validate);
    setForm({
      ...form,
      [e.target.name]: value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <IonPage id="profilePage">
      <IonContent>
        <div className="main-container">
          <div className="login-logo">
            <img src="assets/img/dubai_trade_logo.png" alt="Ionic logo" />
          </div>
          <div className="form-content">
            <div className="login-box-header"></div>
            <form
              noValidate
              onSubmit={addOrUpdateuserDetails}
              autoComplete="off"
            >
              <IonList className="form-section">
                <div className="welcome-note">
                  Dear {form?.userName},
                  <br />
                  Welcome to DT Trucking.
                  <br />
                  <br />
                  Kindly confirm your contact details in order to proceed with
                  booking.
                </div>

                <TxtInput
                  name={"firstName"}
                  value={form?.firstName}
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
                  value={form?.lastName}
                  label="Last Name"
                  errors={errors.lastName}
                  type="text"
                  required={true}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
                <TxtInput
                  name={"email"}
                  value={form?.email}
                  label="Email"
                  errors={errors.email}
                  type="email"
                  required={true}
                  onChange={handleChange}
                  description="Email Format abc@xyz.com"
                  placeholder="Email"
                />
                <TxtInput
                  name={"mobileNumber"}
                  value={form?.mobileNumber}
                  label="Mobile"
                  errors={errors.mobileNumber}
                  type="text"
                  required={true}
                  onChange={handleChange}
                  datatype="TEL_NUM"
                  pattern="###-##-#######"
                  description="Tel Format 971-xx-xxxxxxx"
                  placeholder="Mobile"
                />
                <TxtInput
                  name={"landLineNumber"}
                  value={form?.landLineNumber}
                  label="Phone"
                  errors={errors.landLineNumber}
                  type="text"
                  required={true}
                  onChange={handleChange}
                  datatype="TEL_NUM"
                  pattern="###-##-#######"
                  description="Tel Format 971-xx-xxxxxxx"
                  placeholder="Phone"
                />
              </IonList>

              <div className="">
                {errors?.errorGeneral && (
                  <IonText
                    color="danger"
                    className="validation-message genralError"
                  >
                    <IonLabel className="ion-padding-start">
                      {errors?.errorGeneral}
                    </IonLabel>
                  </IonText>
                )}
              </div>
              <div className="button-div">
                <div className="button-holder" onClick={addOrUpdateuserDetails}>
                  <IonIcon slot="icon-only" icon={arrowForwardOutline} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ConfirmDetails;
