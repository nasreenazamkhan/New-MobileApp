import {
  IonCard,
  IonCardContent,
  IonContent,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import { chevronDownOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Icon from "../../components/Icon";
import CenterPopup from "../../components/PopUp/CenterPopup/CenterPopup";
import SlideUpModal from "../../components/PopUp/SlideUpModal";
import Star from "../../components/Star/Star";
import InformationText from "../../components/Texts/InformationText";
import TopMenu from "../../components/topMenu/TopMenu";
import {
  fetchPods,
  getdetailsOfBookingNumber,
  postApprovePod,
  postRejectPod,
  reviewSubmit,
} from "../../services/EndPointApi";
import DeclarationDetails from "../ContainerCart/DeclarationDetails";
import "./Pod.scss";
import ListDownload from "./PODCard/ListDownload";
import PodCard from "./PODCard/PodCard";
import SLAExpire from "./SLAExpire";

var draftIconProps = {
  name: "drafts-note",
  slot: "",
  class: "zoom12",
  style: { stroke: "#168FE4" },
};

export default function PODDetails(props) {
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
  var allBookingRelated = props.history.location.state;
  const [showSlideUpModal, setshowSlideUpModal] = useState(false);
  const [downloadList, setdownloadList] = useState<any>([]);
  var downloadPodPopupContent = {
    content: <ListDownload downloadableListItem={downloadList} />,
    okButton: "APPROVE",
    cancelButton: "REJECT",
    textAreaComment: "Importer comments (if any)",
    isClose: true,
    type: "podDownload",
  };
  const [showModal, setshowModal] = useState(false);
  const [podDownLoadModalContent, setpodDownLoadModalContent] = useState<any>(
    downloadPodPopupContent
  );
  const [response, setresponse] = useState<any>([]);
  const [selectedIndexNumber, setselectedIndexNumber] = useState<any>({});
  const [ratingObj, setratingObj] = useState<any>({
    container_number: "",
    BookingReferenceNumber: "",
    feedback: "",
    rating: 0,
  });

  useEffect(() => {
    bookingDetails();
  }, []);

  // useEffect(() => {
  //   setshowModal(true);
  // }, [downloadList]);

  async function bookingDetails() {
    let resp = await getdetailsOfBookingNumber(
      props.location.state.bookingNumber
    );
    if (resp?.success) {
      setresponse(resp?.data);
    }
  }
  function podCardClick(item) {
    console.log(item);
    setshowSlideUpModal(true);
    setselectedIndexNumber(item);
  }

  async function centerPopupModalOkClick(data, type) {
    setshowModal(false);
    setpodDownLoadModalContent(downloadPodPopupContent);
    if (type === "podDownload") {
      var podApproveObj = { ...selectedIndexNumber, ...downloadList };
      if (data === "approve") {
        let podApproveResp = await postApprovePod(selectedIndexNumber);
        if (podApproveResp.success) {
          setpodDownLoadModalContent({
            content: (
              <Star
                starValue={(val) => setratingObj({ ...ratingObj, rating: val })}
              />
            ),
            okButton: "Submit",
            //cancelButton: "REJECT",
            textAreaComment: "Importer comments (if any)",
            isClose: false,
            textAreaHeading: "Add suggestions",
            mainHead: "Would you like to rate the transporter service?",
            type: "rating",
          });
          setshowModal(true);
        }
      } else if (data === "reject") {
        let podRejectResp = await postRejectPod(selectedIndexNumber);
        console.log("rejeccttteeeddd", podRejectResp);
        if (podRejectResp.success) {
          bookingDetails();
        }
      }
    } else if (type === "rating") {
      console.log("8888888", ratingObj);
      submitReview();
      setpodDownLoadModalContent(downloadPodPopupContent);
    }
  }

  async function submitReview() {
    var data = {
      container_number: selectedIndexNumber.container_number,
      BookingReferenceNumber: "",
      feedback: "",
      rating: 0,
    };
    setratingObj({
      ...ratingObj,
      container_number: selectedIndexNumber.container_number,
    });
    console.log("((**&&^^", selectedIndexNumber);
    let resp = await reviewSubmit(ratingObj);
  }

  async function openDownloadCenterpopup(status, item) {
    setselectedIndexNumber(item);
    var obj = {
      referenceNumber: props.location.state.bookingNumber,
      containerNumber: item.container_number,
    };
    let resp = await fetchPods(obj);
    if (resp.success) {
      console.log("99999", resp?.data.data.dataItems);
      if (resp?.data.data.dataItems.length > 0) {
        setdownloadList(resp?.data.data.dataItems);
        setpodDownLoadModalContent({
          content: (
            <ListDownload downloadableListItem={resp?.data.data.dataItems} />
          ),
          okButton: "APPROVE",
          cancelButton: "REJECT",
          textAreaComment: "Importer comments (if any)",
          isClose: true,
          type: "podDownload",
        });
        setshowModal(true);
        // }, 100);
      }
    }
  }

  var topMenuItems = [
    {
      name: "",
      src: "filter",
      styleProps: { zoom: 1.3 },
      type: "button",
      slot: "start",
      clickedOnTopMenu: () => console.log("clicked1"),
    },

    {
      name: "Storage Validity",
      src: "filter-down-arrow",
      type: "button",
      slot: "start",
      size: "0.7rem",
      clickedOnTopMenu: () => console.log("clicked4"),
    },
  ];
  return (
    <IonPage>
      <Header
        label="Verify POD "
        action="home"
        //searchClick={onSearchClick}
        agentHeader={true}
      />
      <IonContent>
        <SlideUpModal
          showModal={showSlideUpModal}
          openOrCloseModal={(modalState) => {
            setshowSlideUpModal(modalState);
            setpodDownLoadModalContent(downloadPodPopupContent);
          }}
          content={
            <DeclarationDetails
              item={selectedIndexNumber}
              click={() => {
                setshowModal(false);
              }}
              fromPod={true}
            />
          }
        />{" "}
        <CenterPopup
          showModal={showModal}
          content={podDownLoadModalContent.content}
          openOrCloseModal={(data, type) => centerPopupModalOkClick(data, type)}
          okButton={podDownLoadModalContent.okButton}
          cancelButton={podDownLoadModalContent.cancelButton}
          textAreaComment={podDownLoadModalContent.textAreaComment}
          isClose={podDownLoadModalContent.isClose}
          textAreaHeading={podDownLoadModalContent.textAreaHeading}
          mainHead={podDownLoadModalContent.mainHead}
          type={podDownLoadModalContent.type}
          getTextArea={(val) => setratingObj({ ...ratingObj, feedback: val })}
        />
        <TopMenu topMenuProps={topMenuItems} />
        <InformationText
          message={`${response?.containerList?.length || 0} containers`}
        />
        {/* <div className="sub-content">
          <div className="booking-num">
            <Icon iconProps={draftIconProps} />
            <IonLabel className="booking-label">
              {props.location.state.bookingNumber}
            </IonLabel>
          </div>
        </div> */}
        <div>
          {response?.containerList?.map((item, index) => (
            <PodCard
              key={index}
              item={item}
              cardClick={podCardClick}
              clickedDownloadPOD={openDownloadCenterpopup}
              expiryDate={allBookingRelated?.verifyPodBy}
              verifyPodTime={allBookingRelated?.verifyPodTime}
              icon1={trackTruckIconProps}
              icon2={editContactIconProps}
              icon3={downloadIconProps}
            />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
}
