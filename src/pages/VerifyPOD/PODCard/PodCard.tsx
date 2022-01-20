import {
  IonCard,
  IonCardContent,
  IonCol,
  IonLabel,
  IonRow,
} from "@ionic/react";
import React, { useState } from "react";
import Icon from "../../../components/Icon";
import "../Pod.scss";
import CenterPopup from "../../../components/PopUp/CenterPopup/CenterPopup";
import SLAExpire from "../SLAExpire";
import { useHistory } from "react-router-dom";

var trackTruckIconProps = {
  name: "track-truck",
  slot: "",
  class: "zoom12",
  style: { stroke: "#168FE4" },
  styleProps: { zoom: 2.6 },
};

var editContactIconProps = {
  name: "edit-contact",
  slot: "",
  class: "zoom12",
  style: { stroke: "#168FE4" },
  styleProps: { zoom: 2.6 },
};

var downloadIconProps = {
  name: "invoices-download",
  slot: "",
  class: "zoom12",
  style: { stroke: "#168FE4" },
  styleProps: { zoom: 1.6 },
};

const calenderIcon = {
  name: "calendar",
  slot: "start",
  class: "slotStart",
  styleProps: { zoom: " 1.2" },
};

interface PodCardProps {
  cardClick;
  clickedDownloadPOD?: (status, item) => void;
  item?: any;
  expiryDate?: any;
  verifyPodTime?: any;
  icon1?: any;
  icon2?: any;
  icon3?: any;
}
const PodCard: React.FC<PodCardProps> = ({
  cardClick,
  clickedDownloadPOD,
  item,
  verifyPodTime,
  expiryDate,
  icon1,
  icon2,
  icon3,
}) => {
  let history = useHistory();
  const [slaStatus, setslaStatus] = useState(false);
  function getSLAStatus(status) {
    setslaStatus(true);
  }

  const viewContactDetails = (ctn) => {
    console.log("   -----    ", ctn);
    let value = {
      contact: {
        consigneeContactNumber: ctn.consigneeContactNumber,
        consigneeContactName: ctn?.consigneeContactName,
        phoneNumber: ctn?.phoneNumber,
        dropAddress: ctn?.dropAddress,
        addressLine1: ctn?.addressLine1,
        dropZone: ctn?.dropZoneCode,
        selectedDropZoneLabel: ctn?.dropZoneLabel,
        ctnNumber: ctn?.container_number,
        dpwTransactionId: ctn?.dpwTransactionId,
        requestDetailsNumber: ctn?.requestDetailsNumber,
        latLng: ctn?.latLng,
      },
      // booking: data.details,
      isContainerEdit: true,
    };
    history.push("/addAddress", value);
  };
  return (
    <>
      <IonCard
        className={slaStatus ? "red-border  box_shadow" : "box_shadow"}
        onClick={() => cardClick(item)}
      >
        <IonCardContent>
          <div className="first-row">
            <div className="cont-num">
              <div className=" cont-label">Container#</div>
              <div className=" cont-dynamic-num">
                {" "}
                <IonLabel>
                  {item.container_number} {item.iso_code}
                </IonLabel>
              </div>
            </div>
            <div className="cont-type">
              <div className=" cont-typelabel">Container Type</div>
              <div className="  cont-dynamic-type">
                {" "}
                <IonLabel>{item.containerType}</IonLabel>
              </div>
            </div>
            <div className="consignee-detail">
              <div className="consi-detail-label">Consignee details </div>
              <div className="consi-dynamic-detail">
                <IonLabel>{item.consigneeDetails}</IonLabel>
              </div>
            </div>
          </div>
          <div className="second-row">
            <div className="pickup">
              <div className=" pickup-label">Pickup </div>
              <div className=" pickup-dynamic-loc">
                {" "}
                <IonLabel>T1</IonLabel>
              </div>
            </div>
            <div className="drop-detail">
              <div className=" drop-detail-label">Drop Details</div>
              <div className="  drop-detail-dynamic">
                {" "}
                <IonLabel>{item.dropZoneLabel}</IonLabel>
              </div>
            </div>
            <div className="date">
              <div className="date-icon">
                <Icon iconProps={calenderIcon} />{" "}
              </div>
              <div className="consi-dynamic-detail">
                <IonLabel>{item.date_time}</IonLabel>
              </div>
            </div>
          </div>

          <div className="third-row">
            <div
              className="icon1"
              onClick={(e) => {
                e.stopPropagation();
                history.push("/track", item);
              }}
            >
              <Icon iconProps={icon1} />
            </div>
            <div
              className="icon2"
              onClick={(e) => {
                e.stopPropagation();
                viewContactDetails(item);
                console.log("download");
              }}
            >
              <Icon iconProps={icon2} />
            </div>
            <div
              className="icon3"
              onClick={(e) => {
                e.stopPropagation();
                clickedDownloadPOD(true, item);
              }}
            >
              {icon3 && (
                <div>
                  {item.proofOfDelivery.length > 0 ? (
                    <div className="download-icon">
                      <Icon iconProps={icon3} />
                      <div className="  download-pod">
                        {" "}
                        <IonLabel>Download POD</IonLabel>
                      </div>
                    </div>
                  ) : (
                    <div className="center-align">--</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </IonCardContent>
      </IonCard>
      {verifyPodTime && (
        <IonRow>
          <IonCol className="sla-position">
            <SLAExpire
              expiryDate={expiryDate}
              verifyPodTime={verifyPodTime}
              SLAstatus={getSLAStatus}
            />
          </IonCol>
        </IonRow>
      )}
    </>
  );
};
export default PodCard;
