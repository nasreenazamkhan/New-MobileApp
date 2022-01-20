import React, { useEffect, useState } from "react";
import {
  IonGrid,
  IonCol,
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import ContainerCard from "../containerDetails/containerCard/ContainerCard";
import Header from "../../../components/Header";
import { useHistory } from "react-router-dom";
import {
  httpPostCallWithoutHeaderAndWithBody,
  httpGetCallWithoutHeader,
  httpPostCallWithoutHeaderAndBody,
  getInvoiceDetails,
} from "../../../services/EndPointApi";
import * as EndPointURL from "../../../util/EndPointURL";
import "./ContainerDetails.scss";
import Alert from "../../../components/alert/Alert";
import SlideUpModal from "../../../components/PopUp/SlideUpModal";
import { closeOutline } from "ionicons/icons";
import RoundedAvatar from "../../../components/Avatar/RoundedAvatar";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import DownloadReciept from "../../../components/DownloadReciept/DownloadReciept";

export default function ContainerDetails(value) {
  const [data, setData] = useState<any>({});
  const [groupedData, setGroupedData] = useState<any>({});
  const [] = useState(false);
  const [alertPopup, setAlertPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteContainer, setDeleteContainer] = useState<any>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);
  const [containerDetails, setContainerDetails] = useState<any>();
  const [isInProgress, setIsInProgress] = useState<boolean>(false);
  const [isDelivered, setIsDelivered] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [paymentPage, setPaymentPage] = useState("");

  const [bookingDetails, setBookingDetails] = useState(
    value?.history?.location?.state.bookingDetails
  );
  let history: any = useHistory();
  var ref;
  var txnIds;
  var options = "zoom=no,footer=no,location=no";

  useEffect(() => {
    fetchData(value?.history?.location?.state?.bookingDetails?.bookingNumber);
  }, []);

  const [isPOD, setisPOD] = useState(false);
  const fetchData = async (referenceNumber) => {
    let appUrl = EndPointURL.containerDetails + "refNo=" + referenceNumber;
    var response = await httpGetCallWithoutHeader(appUrl);
    if (await response.success) {
      var resp = await getInvoiceDetails(referenceNumber);
      if (resp?.success) {
        if (resp.data.data.dataItems[0].invoiceList.length > 0) {
          setisPOD(true);
        }
      }
      // bookingDetails: value?.history?.location?.state,
      setData({
        ...data,
        bookingDetails: bookingDetails,
        response: response,
      });
      let bookingStatus = value?.history?.location?.state?.bookingStatus;
      setContainerDetails(response?.data);
      if (bookingStatus == "TRANSCONF" || bookingStatus === "STARTED") {
        OnInProgress("inProgress", response?.data);
      } else {
        var conts = response?.data.containerList;
        var list = groupingByDeclaration(conts);
        setGroupedData(list);
      }
    }
  };

  const OnInProgress = (status, ...cont) => {
    let conts;
    if (status == "inProgress") {
      setIsCompleted(false);
      setIsDelivered(false);
      setIsInProgress(true);

      let inProgressStatus = [
        "PEND",
        "PENTRUCK",
        "PODUPL",
        "INPRO",
        "TRUCK_ASGN",
        "PENDING_TOKEN",
      ];
      conts =
        containerDetails == undefined
          ? cont[0].containerList.filter((cL) =>
              inProgressStatus.includes(cL.refStatus?.code)
            )
          : containerDetails.containerList.filter((cL) =>
              inProgressStatus.includes(cL.refStatus?.code)
            );
    } else if (status == "delivered") {
      setIsInProgress(false);
      setIsCompleted(false);
      setIsDelivered(true);
      let deliveredStatus = ["FCL_DEL", "PMTTOK", "MTTOKASGN", "MTTRK_ASGN"];
      conts = containerDetails.containerList.filter((cL) =>
        deliveredStatus.includes(cL.refStatus?.code)
      );
    } else {
      setIsInProgress(false);
      setIsDelivered(false);
      setIsCompleted(true);
      let completedStatus = ["MT_DEL", "COMPL"];
      conts = containerDetails.containerList.filter((cL) =>
        completedStatus.includes(cL.refStatus?.code)
      );
    }
    var list = groupingByDeclaration(conts);
    setGroupedData(list);
  };

  const groupingByDeclaration = (containers: any) => {
    return containers.reduce(function (acc, { ...item }) {
      const key = `${item.boeNumber},${
        item.orderValidity ? item.orderValidity : ""
      }`;
      (acc[key] = acc[key] || []).push(item);
      return acc;
    }, {});
  };

  const canCellationRequest = async (ctn) => {
    try {
      await console.info("BEFORE DELETE ", JSON.stringify(data.containers));
      let response = await httpPostCallWithoutHeaderAndWithBody(
        EndPointURL.cancelRequestContainerUrl,
        ctn
      );
      await console.info("DELETE ", JSON.stringify(ctn.key));
      if (response?.success) {
        await delete data.containers[ctn.key];
        let r = await { booking: data.booking, containers: data.containers };
        console.info("AFTER DELETED  ", r);
        await setData(r);
        history.push("/bookingDetails/" + data?.bookingDetails?.cardStatus);
      }
    } catch (error) {
      await console.log("ERROR +++ {} ", error);
    }
  };

  const handleDelete = (item, actionType) => {
    if (actionType) {
      setAlertPopup(false);
      deleteContainer.cancelRemarks = item.cancellationReason;
      canCellationRequest(deleteContainer);
    } else {
    }
  };

  const alertProps = {
    isShow: alertPopup,
    message: message,
    content: "cancel the container?",
    icon: "<img src='/assets/icon/are-you-sure.svg'/>",
    alertAction: handleDelete,
    inputs: [
      {
        name: "cancellationReason",
        type: "textarea",
        placeholder: "Reason for cancellaltion",
        cssClass: "input-class",
      },
    ],
    itemName:
      "Kindly check our <a href=`https://www.google.com/`> className='link-text'>cancellation policy</a> <br/>before proceeding.",
    // cancelPolicy: true
  };

  const viewContactDetails = (ctn) => {
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
      bookingDetails: bookingDetails,
      containerList: data.response.data.containerList,
      isContainerEdit: true,
      // response : data.response
    };
    history.push("/addAddress", value);
  };

  const viewTrack = (item) => {
    history.push("/track", item);
  };

  const closeContainer = (ctn, id) => {
    let deleteData = {
      dpwTransactionId: ctn.dpwTransactionId,
      requestDetailsNumber: ctn.requestDetailsNumber,
      container_number: ctn.container_number,
      refStatus: { code: "CNCL" },
      key: id,
    };
    setAlertPopup(true);
    setMessage(ctn.container_number);
    setDeleteContainer(deleteData);
  };

  const goBack = () => {
    history.push("/bookingDetails/" + data?.bookingDetails?.cardStatus);
  };

  const onInfoClick = () => {
    setShowModal(true);
  };

  function PaymentDetails() {
    return (
      <div id="slide-up-details">
        <IonGrid>
          <IonRow>
            <IonCol size="8">
              <span
                className="label-text"
                style={{ margin: 0, fontSize: "1.1rem" }}
              >
                Payment Breakups
              </span>
              <hr className="header-text" style={{ margin: 0 }} />
            </IonCol>
            <IonCol size="3" style={{ color: "#0568AE" }}>
              {containerDetails.grossAmount} AED
            </IonCol>
            {/* <IonCol size="1">
              <IonIcon
                icon={closeOutline}
                className="close-icon"
                onClick={() => setShowPaymentModal(false)}
              />
            </IonCol> */}
          </IonRow>
          {containerDetails.paymentDetails
            .filter((pd) => pd.paymentType === "transportation")
            .map((item, index) => (
              <div
                className="data-text"
                key={index}
                style={
                  containerDetails.paymentDetails.filter((pd) => {
                    return pd.paymentType === "transportation";
                  }).length ==
                  index + 1
                    ? { padding: "10px" }
                    : { borderBottom: "1px solid #D7D7D7", padding: "10px" }
                }
              >
                <IonRow>
                  <IonCol className="column-space">Containers</IonCol>
                  <IonCol className="column-space">
                    {item.chargeDescription}
                  </IonCol>
                  <IonCol className="column-space">
                    {item.subTotalAmount} AED
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol className="column-space">Vat %</IonCol>
                  <IonCol className="column-space">5%</IonCol>
                  <IonCol className="column-space">{item.totalVat} AED</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol className="column-space" size="8">
                    Total
                  </IonCol>
                  <IonCol className="column-space">
                    {item.totalAmount} AED
                  </IonCol>
                </IonRow>
              </div>
            ))}
          <IonRow
            className="data-text"
            style={{ borderBottom: "1px solid #D7D7D7" }}
          >
            <IonCol className="column-space" size="8">
              Net Amount
            </IonCol>
            <IonCol className="column-space">
              {containerDetails.totalContainerTariff} AED
            </IonCol>
          </IonRow>
          {containerDetails.paymentDetails
            .filter((pd) => pd.paymentType !== "transportation")
            .map((item, index) => (
              <div
                className="data-text"
                key={index}
                style={
                  containerDetails.paymentDetails.filter((pd) => {
                    return pd.paymentType !== "transportation";
                  }).length ==
                  index + 1
                    ? {}
                    : { borderBottom: "1px solid #D7D7D7" }
                }
              >
                <IonRow>
                  <IonCol className="column-space">Token Charges</IonCol>
                  <IonCol className="column-space">
                    {item.chargeDescription}
                  </IonCol>
                  <IonCol className="column-space">
                    {item.subTotalAmount} AED
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol className="column-space">Vat %</IonCol>
                  <IonCol className="column-space">5%</IonCol>
                  <IonCol className="column-space">{item.totalVat} AED</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol className="column-space" size="8">
                    Total
                  </IonCol>
                  <IonCol className="column-space">
                    {item.totalAmount} AED
                  </IonCol>
                </IonRow>
              </div>
            ))}
          <IonRow
            className="data-text"
            style={{
              borderBottom: "1px solid #D7D7D7",
              paddingBottom: "10px",
              paddingTop: "10px",
            }}
          >
            <IonCol className="column-space" size="8">
              Net Amount
            </IonCol>
            <IonCol className="column-space">
              {containerDetails.totalTokenTariff} AED
            </IonCol>
          </IonRow>
          <IonRow className="data-text">
            <IonCol
              className="column-space"
              size="8"
              style={{ fontSize: "1.1rem" }}
            >
              Gross Amount
            </IonCol>
            <IonCol
              className="column-space"
              style={{ color: "#0568AE", fontSize: "1.1rem" }}
            >
              {containerDetails.grossAmount} AED
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    );
  }

  function BookingDetails() {
    return (
      <div id="slide-up-details" style={{ paddingLeft: "15px" }}>
        <IonGrid>
          <IonRow>
            <IonCol size="1">
              <RoundedAvatar color={"#1DB3FE"} name={"IA"} />
            </IonCol>
            <IonCol size="10">
              <span className="label-text">
                {data?.bookingDetails?.bookingNumber}
              </span>
              <hr className="header-text" />
            </IonCol>
            {/* <IonCol size="1">
              <IonIcon
                icon={closeOutline}
                className="close-icon"
                onClick={() => setShowModal(false)}
              />
            </IonCol> */}
          </IonRow>
          <IonRow className="row-text">
            <IonCol className="column-space" size="7">
              Requestor Name
            </IonCol>
            <IonCol className="column-space">Requestor Contact</IonCol>
          </IonRow>
          <IonRow className="data-text">
            <IonCol className="column-space" size="7">
              {data?.bookingDetails?.requesterName}
            </IonCol>
            <IonCol className="column-space">
              {data?.bookingDetails?.requesterContact}
            </IonCol>
          </IonRow>
          {data?.bookingDetails?.importerComments !== null && (
            <>
              <IonRow className="row-text">
                <IonCol className="column-space">Importer Comments</IonCol>
              </IonRow>
              <IonRow className="data-text">
                <IonCol className="column-space">
                  {data?.bookingDetails?.importerComments}
                </IonCol>
              </IonRow>
            </>
          )}
          <div style={{ paddingTop: "15px", paddingBottom: "15px" }}>
            <IonRow
              className="data-text"
              style={{ paddingBottom: "10px", fontSize: "1.1rem" }}
            >
              <IonCol className="column-space">Payment Details</IonCol>
            </IonRow>
            {containerDetails.paymentDetails
              .filter((pd) => pd.paymentType === "transportation")
              .map((item, index) => (
                <IonRow className="data-text" key={index}>
                  <IonCol className="column-space" size="7">
                    {item.chargeDescription}
                  </IonCol>
                  <IonCol className="column-space">
                    {item.totalAmount} AED
                  </IonCol>
                </IonRow>
              ))}
            {containerDetails.paymentDetails
              .filter(
                (pd) =>
                  pd.paymentType === "tokenIn" || pd.paymentType === "tokenOut"
              )
              .map((item, index) => (
                <IonRow className="data-text" key={index}>
                  <IonCol className="column-space" size="7">
                    {item.chargeDescription}
                  </IonCol>
                  <IonCol className="column-space">
                    {item.totalAmount} AED
                  </IonCol>
                </IonRow>
              ))}
            <IonRow className="data-text">
              <IonCol className="column-space" size="7">
                Gross Amount
              </IonCol>
              <IonCol className="column-space">
                {containerDetails.grossAmount} AED
              </IonCol>
            </IonRow>
          </div>
          <IonRow>
            <IonCol>
              <IonButton
                className="blue-link-text"
                fill="clear"
                onClick={() => {
                  setShowModal(false);
                  setTimeout(() => {
                    setShowPaymentModal(true);
                  }, 2500);
                }}
              >
                View Detailed Breakups
              </IonButton>
            </IonCol>
            {data?.bookingDetails?.bookingStatus === "FPAY" && (
              <IonCol>
                <IonButton
                  className="link-text"
                  fill="clear"
                  onClick={() =>
                    paymentInfo(data?.bookingDetails?.bookingNumber)
                  }
                >
                  Retry payment
                </IonButton>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
      </div>
    );
  }

  async function postToExternalSite(url, txnId) {
    txnIds = txnId;
    var paymentCompl;
    ref = InAppBrowser.create(url, "_blank", options);

    var result = ref.on("loadstop").subscribe(async (event) => {
      paymentCompl = await checkPaymentSuccess(event.url, txnId);
      if (paymentCompl) {
        return await paymentCompl;
      } else {
      }
    });

    ref.on("exit").subscribe(
      async () => {
        checkPaymentStatus(txnId);
      },
      (err) => {
        console.log(err);
      }
    );
    return await result;
  }

  async function checkPaymentSuccess(url, txnId) {
    if (url.includes("/mobileResponseFromRosoomPaymentApp")) {
      ref.close();
      var roStatus = await ref.on("exit").subscribe(
        async () => {},
        (err) => {
          console.log(err);
        }
      );
      var test = await checkPaymentStatus(txnId);
      return await test;
    } else {
      return false;
    }
  }

  async function checkPaymentStatus(txnId) {
    var appUrl = EndPointURL.rosoomPaymentStatusCheck + txnId;
    var response = await httpGetCallWithoutHeader(appUrl);
    if (await response.success) {
      if (response.data.data.dataItems[0].status == "SUCC") {
        await setPaymentPage("success");
      } else if (response.data.data.dataItems[0].status == "FAIL") {
        await setPaymentPage("fail");
      } else {
        await setPaymentPage("pending");
      }
      return response;
    }
    return response;
  }

  async function paymentInfo(bookingNumber) {
    var appUrl = EndPointURL.reinitializeUrl + bookingNumber;
    var response = await httpPostCallWithoutHeaderAndBody(appUrl);
    if (await response.success) {
      var url = await response.data.data.dataItems[0].url;
      var txnId = await response.data.data.dataItems[0].transactionId;
      await postToExternalSite(url, txnId);
    }
  }

  function ConfirmScreenTabs() {
    return (
      <IonRow id="confirm-screen">
        <IonCol
          className={isInProgress ? "clicked" : "not-clicked"}
          onClick={() => OnInProgress("inProgress")}
        >
          IN PROGRESS
        </IonCol>
        <IonCol
          className={isDelivered ? "clicked" : "not-clicked"}
          onClick={() => OnInProgress("delivered")}
        >
          DELIVERED
        </IonCol>
        <IonCol
          className={isCompleted ? "clicked" : "not-clicked"}
          onClick={() => OnInProgress("completed")}
        >
          COMPLETED
        </IonCol>
      </IonRow>
    );
  }

  function BookingNumberTab(props) {
    return (
      <>
      <IonRow className="booking-number-row">
          <IonCol size="5" className="regular-font">
            <IonLabel>Declaration Number </IonLabel>
        </IonCol>
          <IonCol size="1" className="regular-font">
            <IonLabel> : </IonLabel>
          </IonCol>
          <IonCol>
            <IonLabel>{props.boe?.split(",")[0]}</IonLabel>
          </IonCol>
        </IonRow>
        
        {props.boe?.split(",")[1] !== undefined && (
          <IonRow className="booking-number-row">
            <IonCol size="5" className="regular-font">
              <IonLabel>DO Validity </IonLabel>
            </IonCol>
            <IonCol size="1" className="regular-font">
            <IonLabel> : </IonLabel>
          </IonCol>
          <IonCol className="date">
            <IonLabel>
              {props.boe && props.boe?.split(",")[1]
                ? props.boe?.split(",")[1]
                : ""}
            </IonLabel>
          </IonCol>
          </IonRow>
        )}
     
      </>
    );
  }

  function ContainerToolbar() {
    let bookingStatus = history?.location?.state.bookingDetails.bookingStatus;

    async function goToInvoiceTabPage(e) {
      e.stopPropagation();
      var invoiceHeader = {
        noOfContainers: data?.bookingDetails?.containerCount,
        noOfTrucks: data?.bookingDetails?.truckCount,
        amountPaid: data?.bookingDetails?.totalAmount,
        // bookingNumber: value?.history?.location?.state?.bookingNumber,
        bookingNumber:
          value?.history?.location?.state?.bookingDetails.bookingNumber,
      };
      history.push("/invoicetabs/manual", invoiceHeader);
    }

    function openDownloadPopup() {
      setShowDownloadModal(true);
    }
    return (
      <IonToolbar>
        <SlideUpModal
          showModal={showDownloadModal}
          openOrCloseModal={(status) => {
            setShowDownloadModal(status);
          }}
          content={
            <DownloadReciept
              bookingReference={
                value?.history?.location?.state?.bookingDetails?.bookingNumber
              }
              click={() => setShowDownloadModal(false)}
            />
          }
        />
        <IonRow className="container-toolbar-row">
          <IonCol size="1" className="container-col">
            <IonIcon src="/assets/icon/container.svg" />
          </IonCol>
          <IonCol size="2.8" className="padding-left">
            <IonRow>
              <IonText className="data-font">
                {(data?.bookingDetails?.containerCount + "").padStart(2, "0") ??
                  0}
              </IonText>
            </IonRow>
            <IonRow>
              <IonText className="title-font">Containers</IonText>
            </IonRow>
          </IonCol>
          <IonCol size="1" className="container-col">
            <IonIcon src="/assets/icon/truck-grey.svg" />
          </IonCol>
          <IonCol size="2.8" className="padding-left">
            <IonRow>
              <IonText className="data-font">
                {(data?.bookingDetails?.truckCount + "").padStart(2, "0") ?? 0}
              </IonText>
            </IonRow>
            <IonRow>
              <IonText className="title-font">Trucks</IonText>
            </IonRow>
          </IonCol>
          {(bookingStatus === ("PPAY" || "FPAY") ||
            (bookingStatus !== ("PPAY" || "FPAY") && !isPOD)) && (
            <IonCol
              size="2"
              className="container-col background download"
              //
              //onClick={(e) => goToInvoiceTabPage(e)}
            >
              <IonButton
                onClick={() => openDownloadPopup()}
                fill="clear"
                size="small"
                disabled={
                  bookingStatus === ("PPAY" || "FPAY") ||
                  (bookingStatus !== ("PPAY" || "FPAY") && isPOD)
                }
              >
                {isPOD}
                <IonIcon src="/assets/icon/invoices-download.svg" />
              </IonButton>
            </IonCol> //isPOD
          )}
          {bookingStatus !== ("PPAY" || "FPAY") && isPOD && (
            <IonCol size="2" className="container-col background download">
              <IonButton
                fill="clear"
                size="small"
                onClick={(e) => goToInvoiceTabPage(e)}
              >
                <IonIcon src="/assets/icon/invoice_text_download.svg" />
              </IonButton>
            </IonCol>
          )}
          <IonCol size="2.4" className="container-col-amnt right-align">
            <IonText className="amnt-text">
              {/* {data?.bookingDetails?.totalAmount} AED{" "} */}
              {data?.bookingDetails?.totalAmount} AED{" "}
            </IonText>
          </IonCol>
        </IonRow>
      </IonToolbar>
    );
  }

  return (
    <IonPage id="container-details">
      <Header
        label={data?.bookingDetails?.bookingNumber}
        action="info"
        customBack={true}
        backClick={() => goBack()}
        agentHeader={true}
        infoClick={onInfoClick}
      />
      {data?.bookingDetails !== undefined && <ContainerToolbar />}
      <IonContent fullscreen scrollEvents={true}>
        <SlideUpModal
          showModal={showModal}
          openOrCloseModal={(status) => {
            setShowModal(status);
          }}
          content={<BookingDetails />}
        />
        <SlideUpModal
          showModal={showPaymentModal}
          openOrCloseModal={(status) => {
            setShowPaymentModal(status);
          }}
          content={<PaymentDetails />}
        />
        {(data?.bookingDetails?.bookingStatus === "TRANSCONF" ||
          data?.bookingDetails?.bookingStatus === "STARTED") && (
          <ConfirmScreenTabs />
        )}
        {groupedData !== undefined &&
          Object.keys(groupedData).map((boe, index) => (
            <div key={index}>
              {(data?.bookingDetails?.bookingStatus !== "TRANSCONF" ||
                data?.bookingDetails?.bookingStatus !== "STARTED") && (
                <BookingNumberTab boe={boe} />
              )}
              {groupedData[boe].map((item, index) => (
                <ContainerCard
                  bookingStatus={data?.bookingDetails?.bookingStatus}
                  key={index}
                  userType={value?.location?.state?.userType}
                  container_number={item?.container_number}
                  consigneeName={item?.consigneeDetails}
                  pickUpLocation={item?.pickupLocation}
                  dropLocation={item?.dropAddress}
                  dropZone={item?.dropZoneLabel}
                  bookingNumber={data?.bookingDetails?.bookingNumber}
                  dropTime={item?.date_time}
                  boeNumber={item?.boeNumber}
                  containerWeight={item?.containerWeight}
                  isoCode={item?.iso_code}
                  holdAuthority={item?.holdAuthority}
                  storageValidity={item?.storagePaidTill}
                  initials={item?.initials}
                  cancelRemarks={item?.cancelRemarks}
                  containerStatus={item?.refStatus?.code}
                  containerType={item?.containerType}
                  proofOfDelivery={item?.proofOfDelivery}
                  viewClick={() => {
                    viewContactDetails(item);
                  }}
                  trackClick={() => viewTrack(item)}
                  closeClick={() => {
                    closeContainer(item, index);
                  }}
                />
              ))}
            </div>
          ))}
        {Object.keys(groupedData).length === 0 &&
          groupedData.constructor === Object && (
            <IonCard className="noData">
              <IonCardContent>
                <IonLabel>No Data to show</IonLabel>
              </IonCardContent>
            </IonCard>
          )}
        <Alert alertProps={alertProps} />
      </IonContent>
      {/* <IonContent  fullscreen hidden={paymentPage == ""}>
          <div hidden={paymentPage !== "success"}>
            <PaymentSuccess 
            referenceNumber={referenceNumber}
            locationProps={props.history}/>
          </div>
          <div hidden={paymentPage !== "fail"}>
            <PaymentFailed 
            referenceNumber={referenceNumber}
            locationProps={props.history}/>
          </div>
          <div hidden={paymentPage !== "pending"}>
            <PaymentPending
              hidden={true}
              referenceNumber={referenceNumber}
              locationProps={props.history}
            />
          </div>
          </IonContent> */}
    </IonPage>
  );
}
