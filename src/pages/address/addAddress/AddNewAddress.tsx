import React, { useState, useEffect } from "react";
import { IonPage, IonLabel, IonCard, IonIcon } from "@ionic/react";
import Store from "../../../redux/Store";
import Header from "../../../components/Header";
import TxtInput from "../../../components/txtinput/TxtInput";
import MapView from "../../MapView";
import * as EndPointURL from "../../../util/EndPointURL";
import DropDownInput from "../../../components/dropdownInput/DrpdownInput";
import * as Utils from "../../../util/Utilities";
import { closeOutline } from "ionicons/icons";
//import * as reduxActions from "../../redux/actionTypes/AllActionTypes";
import {
  httpGetCallWithoutHeader,
  httpPostCallWithoutHeaderAndWithBody,
} from "../../../services/EndPointApi";
import * as reduxActions from "../../../redux/actions/AllActions";
import { useHistory } from "react-router-dom";
import "./AddNewAddress.scss";

export default function AddNewAddress(props: any) {
  console.log("AddNewAddress",props)
  let history = useHistory();
  const [allZones, setAllZones] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [address, setAddress] = useState<any>({
    consigneeContactName: "",
    consigneeContactNumber: "",
    dropAddress: "",
    selectedDropZoneLabel: "Jafza North",
    dropZone: "JAFZAN",
    addressNickname: "",
    addressLine1: "",
    phoneNumber: "",
    createMode: true,
    latLng: "",
  });
  const [error, setError] = useState({
    errorName: "",
    errorMobile: "",
    errorDropAddr: "",
    errorDropZone: "",
    errorNickName: "",
    errorAddrLine: "",
    errorPhone: "",
    mapError: "",
  });

  useEffect(() => {
    var add;
    console.log("props", props.history.location.state);
    if (props.history.location.state?.isContainerEdit) {
      add = props.history.location.state?.contact;
      setAddress(add);
    } else {
      props.history.location.state
        ? setAddress(props.history.location.state)
        : setAddress(address);
    }

    var response = httpGetCallWithoutHeader(EndPointURL.allZone);
    response.then((result) => {
      if (result?.success) {
        // if(props.history.location.state?.isContainerEdit) {
        //     var dZ = result.data.data.dataItems.find((element) => {
        //         return element.value === add.dropZone;
        //       });
        //     console.log("DZ", dZ);
        //     add.selectedDropZoneLabel = dZ.label;
        //     console.log(add);
        //     setAddress(add);
        // }

        setAllZones(result?.data?.data?.dataItems);
      }
    });
  }, []);

  function getZone(e: any, value: any) {
    console.log(e.target.name, e.target.value, e.target.label);
    console.log(e.target.name, value);
    setError({
      ...error,
      errorDropZone: "",
    });
    setAddress({
      ...address,
      dropZone: value,
      selectedDropZoneLabel: e.target.label,
      dropAddress: "",
      latLng: "",
    });
    console.log("add", address);
  }

  function handlePhoneNumber(e: any, value: any) {
    setAddress({
      ...address,
      phoneNumber: value ? "971" + value * 1 : "",
    });
    var nameTest = Utils.validatePhone(value);
    if (value) {
      if (!nameTest) {
        setError({
          ...error,
          errorPhone: "Please Enter 8 digit number",
        });
      } else {
        setError({
          ...error,
          errorPhone: "",
        });
      }
      setErrorMessage("");
    }
  }

  function handleContactName(e: any, value: any) {
    setAddress({
      ...address,
      consigneeContactName: value,
    });
    setError({
      ...error,
      errorName: "",
    });
  }

  function handleMobileNumber(e: any, value: any) {
    setAddress({
      ...address,
      consigneeContactNumber: value ? "971" + value * 1 : "",
    });
    var nameTest = Utils.validateMobile(value, 9);
    if (value) {
      if (!nameTest) {
        setError({
          ...error,
          errorMobile: "Please Enter 9 digit number",
        });
      } else {
        setError({
          ...error,
          errorMobile: "",
        });
      }
      setErrorMessage("");
    }
  }

  function handleLandMark(e: any, value: any) {
    setAddress({
      ...address,
      addressLine1: value,
    });
    setError({
      ...error,
      errorAddrLine: "",
    });
  }

  function handleAddressNickName(e: any, value: any) {
    setAddress({
      ...address,
      addressNickname: value,
    });
    setError({
      ...error,
      errorNickName: "",
    });
  }

  function addOrUpdate() {
    var validate = true;
    for (var key in address) {
      if (
        (address[key] === "" ||
          address[key] === null ||
          address[key] === "9710") &&
        key != "isActive"
      ) {
        if (key != "addressLine1") {
          validate = false;
          if (key == "consigneeContactName") {
            error.errorName = "Contact Name is blank";
          }
          if (key == "dropAddress" || key == "latLng") {
            error.errorDropAddr = "Drop address is blank";
          }
          if (key == "dropZone") {
            error.errorDropZone = "Drop Zone is blank";
          }
          if (key == "addressNickname") {
            error.errorNickName = "Nick name is blank";
          }
          if (key == "consigneeContactNumber") {
            error.errorMobile = "Mobile Number is blank";
          }
          if (key == "phoneNumber") {
            error.errorPhone = "Phone Number is blank";
          }
          setError({ ...error });
          setErrorMessage("Please Fill all the fields");
        }
      }
    }

    if (validate) {
      if (address.createMode) {
        saveAddress();
      } else {
        props.history.location.state.bookTruck
          ? updateBookTruckContact()
          : props.history.location.state.isContainerEdit
          ? updateContainerContact()
          : updateAddress();
        // props.history.location.state.isContainerEdit
        //   ? updateContainerContact()
        //   : props.history.location.state.bookTruck
        //   ? updateBookTruckContact()
        //   : updateAddress();
      }
    }
  }
  const updateBookTruckContact = () => {
    if (!props.history.location.state.bookTruck.multiLocAndTime) {
      var temp = address;
      var addrObj = { ...temp, address: address };
      var updatedAddress = reduxActions.bookTruckUpdateAddress(addrObj);
      if (updatedAddress) Store.dispatch(updatedAddress);
    } else {
      var temp = address;
      var payLoad = {
        containerNumber: props.history.location.state.bookTruck.containerNum,
        element: { ...temp, address: address },
      };

      var updateMultiAddress = reduxActions.booktruckUpdateOtherData(payLoad);
      if (updateMultiAddress) Store.dispatch(updateMultiAddress);
    }
    history.push("/bookTruckTab/location");
  };
  const updateContainerContact = async () => {
    var data = props.history.location.state;
    data.containerList.map((c) => {
      if (c.container_number == address.ctnNumber) {
        c.consigneeContactName = address.consigneeContactName;
        c.addressLine1 = address.addressLine1;
        c.phoneNumber = address.phoneNumber;
        c.consigneeContactNumber = address.consigneeContactNumber;
      }
    });
    var cont = data.containerList;
    var request = {
      consigneeContactNumber: address.consigneeContactNumber,
      phoneNumber: address.phoneNumber,
      addressLine1: address.addressLine1,
      consigneeContactName: address.consigneeContactName,
      container_number: address.ctnNumber,
      dpwTransactionId: address.dpwTransactionId,
      requestDetailsNumber: address.requestDetailsNumber,
    };
    let response = await httpPostCallWithoutHeaderAndWithBody(
      EndPointURL.contacDetailsUpdateUrl,
      request
    );
    if (await response.success) {
      console.log("bookingData", data.booking);
      let booking = {
        // booking: data.booking?.booking,
        // bookingNumber : data.booking.bookingNumber,
        bookingDetails : data.bookingDetails,
        containers: cont,
        userType: data.booking?.userType,
        // status: data.booking?.status,
        status: data.booking?.cardStatus,
      };
      history.push("/containerDetails", booking);
    }
  };

  function updateAddress() {
    let newAddress = address;
    var response = httpPostCallWithoutHeaderAndWithBody(
      EndPointURL.updateAddress,
      newAddress
    );
    response.then((result) => {
      if (result.success) {
        var address = reduxActions.updateAddress(newAddress);
        if (address) Store.dispatch(address);
        props.history.goBack();
      }
    });
  }

  function saveAddress() {
    let newAddress = address;
    var response = httpPostCallWithoutHeaderAndWithBody(
      EndPointURL.addAddress,
      newAddress
    );
    response.then((result) => {
      if (result.success) {
        var address = reduxActions.addAddress(newAddress);
        if (address) Store.dispatch(address);
        props.history.goBack();
      }
    });
  }

  function handleAddress(e: any) {
    console.log("loc", JSON.stringify(e.loc));
    setAddress({
      ...address,
      dropAddress: e.add,
      latLng: JSON.stringify(e.loc),
    });
    setError({
      ...error,
      errorDropAddr: "",
    });
  }

  const mapViewProps = {
    getAddressFromMap: handleAddress,
    zone: address.dropZone,
    latLng: address.latLng ? JSON.parse(address.latLng) : address.latLng,
    selectedAdd: address.dropAddress,
    isContainerEdit: props.history.location.state?.isContainerEdit,
    handleError: (e) => {
      setError({
        ...error,
        mapError: e,
      });
    },
  };

  return (
    <IonPage>
      <Header
        label={address.createMode ? "Add address" : "Edit Address"}
        action="check"
        checkClick={() => {
          addOrUpdate();
        }}
      />
      <IonCard className="mapCard">
        <MapView mapViewProps={mapViewProps} />
      </IonCard>
      <IonLabel className="redColor" hidden={error.mapError == ""}>
        {error.mapError}
        <IonIcon
          icon={closeOutline}
          slot="icon-only"
          className="closeIconMap"
          onClick={() => {
            setError({
              ...error,
              mapError: "",
            });
          }}
        />
      </IonLabel>
      <IonLabel className="redColor" hidden={errorMessage == ""}>
        {errorMessage}
      </IonLabel>
      <IonCard className="scrollCard">
        <DropDownInput
          name={"dropZone"}
          value={address.dropZone}
          label="Zone"
          errors={error.errorDropZone}
          type="text"
          required={true}
          onChange={getZone}
          datatype="TEXT"
          placeholder="Zone"
          listValues={allZones}
          selectedName={address.selectedDropZoneLabel}
          disabled={props.history.location.state?.isContainerEdit}
        />
        <TxtInput
          name={"dropAddress"}
          value={address.dropAddress}
          label="Drop Address"
          errors={error.errorDropAddr}
          type="text"
          required={true}
          readonly={true}
          datatype="TEXT"
          placeholder="Select Location"
        />
        <TxtInput
          name={"addressLine1"}
          value={address.addressLine1}
          label="Addresss Line 1"
          errors={error.errorAddrLine}
          type="text"
          required={true}
          readonly={props.history.location.state?.isContainerEdit}
          onChange={handleLandMark}
          datatype="TEXT"
          placeholder="Addresss Line 1"
        />
        {!props.history.location.state?.isContainerEdit && (
          <TxtInput
            name={"nickName"}
            value={address.addressNickname}
            label="Nick Name"
            errors={error.errorNickName}
            type="text"
            required={true}
            onChange={handleAddressNickName}
            datatype="TEXT"
            placeholder="Nick Name"
          />
        )}
        <TxtInput
          name={"contactName"}
          value={address.consigneeContactName}
          label="Contact Person"
          errors={error.errorName}
          type="text"
          required={true}
          onChange={handleContactName}
          datatype="TEXT"
          placeholder="Contact Person"
        />
        <TxtInput
          name={"mobileNumber"}
          value={
            address?.consigneeContactNumber?.split("971")[1]
              ? address?.consigneeContactNumber?.split("971")[1]
              : address.consigneeContactNumber
          }
          label="Mobile Number"
          errors={error.errorMobile}
          type="tel"
          required={true}
          onChange={handleMobileNumber}
          datatype="TEXT"
          placeholder="Mobile Number"
          max={9}
        />

        <TxtInput
          name={"phoneNumber"}
          value={
            address.phoneNumber?.split("971")[1]
              ? address?.phoneNumber?.split("971")[1]
              : address.phoneNumber
          }
          label="Phone Number"
          errors={error.errorPhone}
          type="tel"
          required={true}
          onChange={handlePhoneNumber}
          datatype="TEXT"
          placeholder="Phone Number"
          max={8}
        />
      </IonCard>
    </IonPage>
  );
}
