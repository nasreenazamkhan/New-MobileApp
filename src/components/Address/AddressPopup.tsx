import { IonCard, IonCardContent, IonCardSubtitle } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { addressData } from "../../data";
import Store from "../../redux/Store";
import { getAddressApi } from "../../services/EndPointApi";
import { getAddress } from "../../util/EndPointURL";
import Icon from "../Icon";
import BlueUderLinedLink from "../Texts/BlueUderLinedLink";
import UnderLinedText from "../Texts/UnderLinedText";
import "./AddressPopup.scss";

interface AddressPopupProps {
  clickFunc: (clickType, data?, name?) => void;
}
const AddressPopup: React.FC<AddressPopupProps> = ({ clickFunc }) => {
  const [addressData, setaddressData] = useState([]);
  useEffect(() => {
    getAddress();
  }, []);

  async function getAddress() {
    let res = await getAddressApi();
    console.log(Store.getState().Addresses);
    if (Store.getState().Addresses.length === res?.addressDtoList?.length) {
      console.log("seetttt");
      setaddressData(Store.getState().Addresses);
    } else {
      console.log("uuuuuufff");
      setaddressData(res?.addressDtoList);
    }
    // if (res.success) {

    console.log("***&&^^%%%$", addressData);
    // }
  }
  const addressBookProps = {
    name: "addressBookBlue",
    slot: "",
    class: "address-book-icon zoom12",
    //zoom: 2.8,
  };
  const editAddress = {
    name: "edit-address",
    slot: "",
    class: "address-book-icon zoom12 floatLeft",
    //zoom: 2.8,
  };

  return (
    <div className="margin">
      <UnderLinedText text="Select Drop Location" />
      <BlueUderLinedLink
        label="ADD NEW ADDRESS"
        onTap={() => clickFunc("add")}
        className="uppercase tnc"
      />
      {addressData?.map((item, index) => (
        <div key={index}>
          <div className="absolutePosition">
            <Icon iconProps={addressBookProps} />
          </div>
          <IonCard className="address-card">
            <IonCardSubtitle> </IonCardSubtitle>
            <IonCardContent className="card-cont">
              <div
                className="first-col"
                onClick={() => clickFunc("select", item, "droplocation")}
              >
                <div className="col-content">{item.addressNickname}</div>
                <div className="col-content">{item.consigneeContactName}</div>
                <span className="col-content">
                  {item.selectedDropZoneLabel}
                </span>
                <span className="col-content">{item.dropAddress}</span>
                <span className="col-content">
                  Ph: {item.consigneeContactNumber}
                </span>
              </div>
              <div className="sec-col" onClick={() => clickFunc("edit", item)}>
                <Icon iconProps={editAddress} />
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      ))}
    </div>
  );
};
export default AddressPopup;
