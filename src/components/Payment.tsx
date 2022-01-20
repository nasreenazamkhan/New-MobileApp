import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useRef,
} from "react";

// import { Capacitor } from "@capacitor/core";
// import { FileOpener } from "@ionic-native/file-opener";
import Icon from "./Icon";
import UnderLinedInput from "./txtinput/UnderLinedInput";
import "./Payment.scss";
import { saveQuickBook } from "../services/EndPointApi";
import VatDetails from "./VatDetails";
import UnderLinedText from "./Texts/UnderLinedText";
import UnderLineOnly from "./InputBorders/UnderLineOnly";
import Store from "../redux/Store";
import Success from "../pages/PaymentStatus/Success";
import {
  updateDRaftsPopupInHome,
  updatePaymentStatus,
} from "../redux/actions/AllActions";
import Fail from "../pages/PaymentStatus/Fail";
import Pending from "../pages/PaymentStatus/Pending";
import { postToExternalSite } from "../services/PaymentService";
import { closeCircleOutline } from "ionicons/icons";

interface paymentProps {
  allPayableDetails: any;
  buttonAction?: any;
  ref?: any;
}
const Payment: React.FC<paymentProps> = forwardRef(
  ({ allPayableDetails, buttonAction }, ref) => {
    console.log(allPayableDetails);
    var paymentObject = allPayableDetails;
    const [errors, setErrors] = useState<any>({});
    const [form, setForm] = useState<any>({});
    const [screen, setscreen] = useState<any>({});
    const fileInput = useRef(null);
    useEffect(() => {
      setscreen(Store.getState().VariableValues.paymentStatus);
      console.log("calling store", screen);
    }, []);

    Store.subscribe(() => {
      setscreen(Store.getState().VariableValues.paymentStatus);
      console.log(
        Store.getState().VariableValues.paymentStatus,
        "calling store",
        screen
      );
    });

    const uploadIcon = {
      name: "upload-quick",
      slot: "",
      class: "zoom3",
    };

    useEffect(() => {
      if (buttonAction === "payment") {
        //saveRequest();
      }
    }, [buttonAction]);
    useImperativeHandle(ref, () => ({
      async openRosoom() {
        let obj = createObj();
        let response: any = await saveQuickBook(obj);
        console.log("", response);
        if (response?.success) {
          console.log(response);
          postToExternalSite(
            response.data.data.dataItems[0].url,
            response?.data?.data?.dataItems[0]?.transactionId
          );
        } else {
          setErrors({
            ...errors,
            general:
              response.data.message || response.data.data.dataItems[0].error,
          });
        }
        //showText();
      },
    }));

    const saveRequest = async () => {
      //eanas
      var paymentStatus = { status: "PEND", reference_num: "0" };
      var updatePaymentStat = await updatePaymentStatus(paymentStatus);
      if (updatePaymentStat) Store.dispatch(updatePaymentStat);
      //end eanas
    };

    const handleChange = (e: any, value: any) => {
      setForm({
        ...form,
        ...allPayableDetails,
        [e.target.name]: value,
      });
      setErrors({ ...errors, [e.target.name]: "" });
      console.log(form);
    };

    function createObj() {
      paymentObject = { ...paymentObject, ...form };
      console.log(paymentObject);
      return paymentObject;
    }

    const setImage = (e: any) => {
      console.log(e.target.files);
      const file = e.target.files[0];

      let f = e.target.files![0];
      let reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = function () {
        //me.modelvalue = reader.result;
        console.log(reader.result);
        const contentArr = (reader.result as string)?.split(",");
        const fileType = contentArr[0]
          .replace("data:", "")
          .replace(";base64", "");
        console.log(fileType, contentArr[1]);
        setForm((prevState) => ({
          ...prevState,
          ...allPayableDetails,
          fileContent: contentArr[1],
          fileType: fileType,
          fileName: file.name,
        }));
      };
      console.log(form);
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
      console.log(f);
    };

    function deleteFile() {
      setForm((prevState) => ({
        ...prevState,
        ...allPayableDetails,
        fileContent: "",
        fileType: "",
        fileName: "",
      }));
    }
    return (
      <div className="componentMargins">
        {screen.status === "" && (
          <div>
            <div className="validationMessage ">
              <IonLabel
                className="validation-message"
                hidden={errors.general === ""}
              >
                {errors.general}
              </IonLabel>
            </div>
            <UnderLinedText text=" Enter Requestor Details" />
            <div className="paymentTopSection">
              <div className="payment-requester-details">
                <div className="eachElement">
                  <UnderLinedInput
                    name={"requesterName"}
                    value={form.requesterName}
                    label="Container Number"
                    errors={errors.requesterName}
                    type="text"
                    required={true}
                    onChange={handleChange}
                    datatype="TEXT"
                    placeholder="Requester Name"
                    onBlur={() => console.log("blur")}
                  />
                </div>
                <div className="center-ele"></div>
                <div className="eachElement">
                  <UnderLinedInput
                    name={"requesterContactNumber"}
                    value={form.requesterContactNumber}
                    label="Container Number"
                    errors={errors.requesterContactNumber}
                    type="text"
                    required={true}
                    onChange={handleChange}
                    datatype="TEXT"
                    placeholder="Requester Number"
                    onBlur={() => console.log("blur")}
                  />
                  {/* <UnderLinedInput
                    name={"requesterContactNumber"}
                    value={form.requesterContactNumber}
                    label="Container Number"
                    errors={errors.requesterContactNumber}
                    type="tel"
                    required={true}
                    onChange={handleChange}
                    datatype="TEL_NUM"
                    //pattern="###-##-######"
                    description="Tel Format 971 12345678"
                    max={8}
                    setError={(erro) =>
                      setErrors({ ...errors, requesterContactNumber: erro })
                    }
                    placeholder="Requester Number"
                    onBlur={() => console.log("blur")}
                  /> */}
                </div>
              </div>
              <UnderLinedInput
                name={"importerComments"}
                value={form.importerComments}
                label="Container Number"
                errors={errors.importerComments}
                type="text"
                required={true}
                onChange={handleChange}
                datatype="TEXT"
                placeholder="Importer Comments (if any)"
                onBlur={() => console.log("blur")}
              />
              <div
                className="upload-section"
                onClick={() => {
                  fileInput?.current?.click();
                }}
              >
                <input
                  ref={fileInput}
                  hidden
                  type="file"
                  onChange={setImage}
                  onClick={() => {
                    console.log("onClick");
                  }}
                />

                <Icon iconProps={uploadIcon} />
                {form.fileName ? (
                  <>
                    <IonLabel className="uploadLabel">
                      {" "}
                      {form.fileName + form.fileType}{" "}
                    </IonLabel>
                    {/* <IonIcon
                      icon={closeCircleOutline}
                      className="close-icon"
                      onClick={() => deleteFile()}
                    /> */}
                    <IonLabel className="uploadLabel">Re upload</IonLabel>
                  </>
                ) : (
                  <IonLabel className="uploadLabel">
                    Upload supporting files
                  </IonLabel>
                )}
              </div>
            </div>
            <div className="componentMargins1">
              <VatDetails vatDetails={allPayableDetails?.vatProfileDto} />
              <div className="paymentBreakup relativePosition">
                <div className="halfWidth">
                  {/* <div className="paymentBreakupUnderLine">
              <IonLabel className="payLabel">Payment Breakups</IonLabel>
            </div> */}
                  <UnderLinedText text="Payment Breakups" />
                </div>
                <div className="paymentBreakUprightSide">
                  <IonLabel className="bluePaymentLable">
                    {allPayableDetails?.grossAmount} AED
                  </IonLabel>
                </div>
              </div>

              {allPayableDetails?.paymentDetails?.map((item, index) => (
                <div key={index}>
                  {item.paymentType === "transportation" && (
                    <div className="payment-section">
                      <div className="paymentBreakup margin-top">
                        <div className="paymentBreakupFirstRow">
                          {" "}
                          <IonLabel className="payLabel">Containers</IonLabel>
                        </div>
                        <div className="paymentBreakup">
                          <IonLabel className="payLabelLight">
                            {" "}
                            {item.chargeDescription}
                          </IonLabel>
                        </div>
                        <div className="paymentBreakUprightSide">
                          <IonLabel className="payLabelLight">
                            {item.subTotalAmount} AED
                          </IonLabel>
                        </div>
                      </div>
                      <div className="paymentBreakup margin-top">
                        <div className="paymentBreakupFirstRow">
                          {" "}
                          <IonLabel className="payLabel">Vat %</IonLabel>
                        </div>
                        <div className="paymentBreakup">
                          <IonLabel className="payLabelLight">
                            {item.vat}%
                          </IonLabel>
                        </div>
                        <div className="paymentBreakUprightSide">
                          <IonLabel className="payLabelLight">
                            {item.totalVat} AED
                          </IonLabel>
                        </div>
                      </div>
                      {/* <div className="paymentBreakup margin-top">
                        <div className="paymentBreakupFirstRow">
                          {" "}
                          <IonLabel className="payLabel">Total</IonLabel>
                        </div>
                        <div className="paymentBreakup">
                          <IonLabel className="payLabelLight"></IonLabel>
                        </div>
                        <div className="paymentBreakUprightSide">
                          <IonLabel className="payLabelLight">
                            {item.totalAmount} AED
                          </IonLabel>
                        </div>
                      </div> */}
                    </div>
                  )}
                </div>
              ))}

              <div className=" payment-section paymentBreakup  margin-top no-padding-top">
                <div className="paymentBreakupFirstRow">
                  <IonLabel className="payLabel">Net Amount</IonLabel>
                </div>
                <div className="paymentBreakUprightSide">
                  <IonLabel className="bluePaymentLable">
                    {allPayableDetails?.totalContainerTariff} AED
                  </IonLabel>
                </div>
              </div>

              {allPayableDetails?.paymentDetails?.map((item, index) => (
                <div key={index}>
                  {item.paymentType === "tokenIn" && (
                    <div className="payment-section no-padding-top">
                      <div className="paymentBreakup margin-top">
                        <div className="paymentBreakupFirstRow payLabel">
                          <IonLabel>Token Re-Charges In-Bound</IonLabel>
                        </div>
                        <div className="paymentBreakup">
                          <IonLabel className="payLabelLight">
                            {" "}
                            {item.chargeDescription}
                          </IonLabel>
                        </div>
                        <div className="paymentBreakUprightSide">
                          <IonLabel className="payLabelLight">
                            {" "}
                            {item.subTotalAmount} AED
                          </IonLabel>
                        </div>
                      </div>
                      <div className="paymentBreakup margin-top">
                        <div className="paymentBreakupFirstRow payLabel">
                          {" "}
                          <IonLabel>Vat %</IonLabel>
                        </div>
                        <div className="paymentBreakup">
                          <IonLabel className="payLabelLight">
                            {item.vat || 0}%
                          </IonLabel>
                        </div>
                        <div className="paymentBreakUprightSide">
                          <IonLabel className="payLabelLight">
                            {" "}
                            {item.totalVat || 0} AED
                          </IonLabel>
                        </div>
                      </div>
                      <div className="paymentBreakup margin-top">
                        <div className="paymentBreakupFirstRow payLabel">
                          {" "}
                          <IonLabel>Total Amount</IonLabel>
                        </div>
                        <div className="paymentBreakup">
                          <IonLabel className="payLabelLight"></IonLabel>
                        </div>
                        <div className="paymentBreakUprightSide">
                          <IonLabel className="payLabel">
                            {item.totalAmount} AED
                          </IonLabel>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {allPayableDetails?.paymentDetails?.map((item, index) => (
                <div key={index}>
                  {item.paymentType === "tokenOut" && (
                    <div className="payment-section no-padding-top">
                      <div className="paymentBreakup margin-top">
                        <div className="paymentBreakupFirstRow payLabel">
                          <IonLabel>Token Re-Charges Out-Bound</IonLabel>
                        </div>
                        <div className="paymentBreakup">
                          <IonLabel className="payLabelLight">
                            {item.chargeDescription}
                          </IonLabel>
                        </div>
                        <div className="paymentBreakUprightSide">
                          <IonLabel className="payLabelLight">
                            {item.subTotalAmount} AED
                          </IonLabel>
                        </div>
                      </div>
                      <div className="paymentBreakup margin-top">
                        <div className="paymentBreakupFirstRow payLabel">
                          <IonLabel>Vat %</IonLabel>
                        </div>
                        <div className="paymentBreakup">
                          <IonLabel className="payLabelLight">
                            {item.vat || 0}%
                          </IonLabel>
                        </div>
                        <div className="paymentBreakUprightSide">
                          <IonLabel className="payLabelLight">
                            {item.totalVat || 0} AED
                          </IonLabel>
                        </div>
                      </div>
                      <div className="paymentBreakup margin-top">
                        <div className="paymentBreakupFirstRow payLabel">
                          <IonLabel>Total Amount</IonLabel>
                        </div>
                        <div className="paymentBreakup">
                          <IonLabel className="payLabelLight"></IonLabel>
                        </div>
                        <div className="paymentBreakUprightSide">
                          <IonLabel className="payLabelLight">
                            {item.totalAmount} AED
                          </IonLabel>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="paymentBreakup payment-section  margin-top no-padding-top">
                <div className="paymentBreakupFirstRow payLabel">
                  <IonLabel>Net Amount</IonLabel>
                </div>
                <div className="paymentBreakUprightSide">
                  <IonLabel className="bluePaymentLable">
                    {" "}
                    {allPayableDetails?.totalTokenTariff} AED
                  </IonLabel>
                </div>
              </div>
              <div className="paymentBreakup  margin-top ">
                <div className="paymentBreakupFirstRow payLabel">
                  <IonLabel>Gross Payable Amount</IonLabel>
                </div>
                <div className="paymentBreakUprightSide">
                  <IonLabel className="bluePaymentLable">
                    {allPayableDetails?.grossAmount} AED
                  </IonLabel>
                </div>
              </div>
            </div>
          </div>
        )}
        {screen.status === "SUCC" && <Success txnId={screen.reference_num} />}
        {screen.status === "FAIL" && <Fail txnId={screen.reference_num} />}
        {screen.status === "PEND" && <Pending txnId={screen.reference_num} />}
      </div>
    );
  }
);
export default Payment;
