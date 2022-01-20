import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { addCircle } from "ionicons/icons";
import "./AddressCard.scss";
import Store from "../../../redux/Store";
import * as EndPointURL from "../../../util/EndPointURL";
import {
  httpGetCallWithoutHeader,
  httpPostCallWithoutHeaderAndBody,
} from "../../../services/EndPointApi";
import * as reduxActions from "../../../redux/actions/AllActions";
import Alert from "../../../components/alert/Alert";

export default function AddressCard(props: any) {
  console.log("AddressCard", props)
  let history = useHistory();
  const [address, setAddress] = useState([]);
  const [agent, setAgent] = useState();
  const [alertPopup, showAlertPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [itemAddress, setItem] = useState({});

  Store.subscribe(() => {
    setAgent(Store.getState().CheckUserStatus.user.selectedAgent);
    setAddress(Store.getState().Addresses);
    console.log("calling store");
  });

  useEffect(() => {
    console.log("addressDB", Store.getState().Addresses);
    getAddress();
    console.log("add", address);
  }, [agent]);

  const getAddress = async () => {
    var response = await httpGetCallWithoutHeader(EndPointURL.getAddress);
    var result = response;
    if (await response?.success) {
      var addressess = reduxActions.clearAllAddress();
      if (addressess) Store.dispatch(addressess);

      console.log(response.data.addressDtoList.length);

      response.data.addressDtoList.forEach((element) => {
        element.dropZone = element.selectedDropZone;
      });
      response.data.addressDtoList.disableHrs = response.data.disableHrs;
      response.data.addressDtoList[0].isSelected = true;

      var newAddressess = reduxActions.addAddress(response.data.addressDtoList);
      if (newAddressess) Store.dispatch(newAddressess);
      setAddress(newAddressess.payLoad);
    } else if (
      response?.data?.data?.dataItems[0]?.code == "168" ||
      response?.data?.data?.dataItems[0]?.error == "No data available."
    ) {
      var addressess = reduxActions.clearAllAddress();
      if (addressess) Store.dispatch(addressess);
      setAddress([]);
    }
  };

  const updateAddress = (element) => {
    element.createMode = false;
    console.log(element);
    history.push("/addAddress", element);
  };

  function showAlert(item) {
    showAlertPopup(true);
    setMessage(item.addressNickname);
    setItem(item);
  }

  function deleteAddress(item, actionType) {
    showAlertPopup(false);
    if (actionType) {
      var response = httpPostCallWithoutHeaderAndBody(
        EndPointURL.deleteAddress + item.code
      );
      response.then((result) => {
        if (result.success) {
          var newAddressess = reduxActions.deleteAddress(item.code);
          if (newAddressess) Store.dispatch(newAddressess);
        }
      });
    }
  }

  const alertProps = {
    isShow: alertPopup,
    message: message + " ?",
    alertAction: deleteAddress,
    item: itemAddress,
    content: " Are you sure to remove contact of",
    okButtonName: "Continue",
    cancelButtonName: "Cancel",
    itemName: "",
  };

  const onAddressSelect = (e, index) => {
    address.forEach((element) => {
      element.isSelected = false;
    });
    address[index].isSelected = true;
    setAddress([...address]);
  };

  return (
    <div id="address-card">
      <Alert alertProps={alertProps} />
      <IonIcon
        onClick={() => history.push("/addAddress")}
        icon={addCircle}
        className="addIcon"
      />
      {address.length === 0 ? (
        <IonCard className="card emptyAddressCard">
          <IonCardContent>
            <IonText className="emptyAddressText">Add new address</IonText>
          </IonCardContent>
        </IonCard>
      ) : (
        <div className="cardTopMargin">
          {address.map((element: any, index: any) => (
            <div className="addressCard" key={index}>
              <IonIcon
                src={
                  element.isSelected
                    ? "/assets/icon/addressBookBlue.svg"
                    : "/assets/icon/addressBookGray.svg"
                }
                className="contactIcon"
              />
              <IonCard
                className="card"
                onClick={(e) => onAddressSelect(e, index)}
              >
                <IonCardContent>
                  <IonRow>
                    <IonCol size="10">
                      <IonRow>{element.addressNickname}</IonRow>
                      <IonRow>{element.selectedDropZoneLabel}</IonRow>
                      <IonRow>{element.dropAddress}</IonRow>
                      <IonRow>Mob: {element.consigneeContactNumber}</IonRow>
                      <IonRow>Ph: {element.phoneNumber}</IonRow>
                    </IonCol>
                    {element.isSelected && (
                      <IonCol size="2">
                        <IonRow>
                          <IonIcon
                            onClick={() => updateAddress(element)}
                            src="/assets/icon/edit-address.svg"
                            className="editIcon"
                          />
                        </IonRow>
                        <IonRow>
                          <IonIcon
                            onClick={() => showAlert(element)}
                            src="/assets/icon/delete-address.svg"
                            className="editIcon"
                          />
                        </IonRow>
                      </IonCol>
                    )}
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
