import {
  IonCol,
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonToggle,
} from "@ionic/react";
import { alertCircle } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Calendar from "../../components/calendar/Calendar";
import SimpleDropdown from "../../components/dropdownInput/SimpleDropdown";
import BlueFooter from "../../components/Footer/BlueFooter";
import SimpleBorder from "../../components/InputBorders/SimpleBorder";
import UnderLineOnly from "../../components/InputBorders/UnderLineOnly";
import MultiLocationCard from "../../components/MultiLocationCard/MultiLocationCard";
import InformationText from "../../components/Texts/InformationText";
import UnderLinedText from "../../components/Texts/UnderLinedText";
import { bookTruckSampleData, containerType } from "../../data";
import * as AllActionTypes from "../../redux/actionTypes/AllActionTypes";
import Store from "../../redux/Store";
import {
  calendarTodayDate,
  createArrayOfObjectWithKeyAndValue,
  createPaymentObject,
  formatDate,
  formatToCalendarDate,
  minDate,
  todayDate,
} from "../../services/Common";
import { dropIntervals } from "../../util/Constants";
import "./BookTruck.scss";
import SingleLocationDropCard from "../../components/SingleLocationDropCard/SingleLocationDropCard";
import moment from "moment";
import SingleLocContainerCard from "../../components/SingleLocationDropCard/SingleLocContainerCard";
import AddressLink from "../../components/Address/AddressLink";
import Toggle from "../../components/Toggle/Toggle";
import {
  fetchContainerSummaryPayment,
  getAddressApi,
  getContainerTypes,
} from "../../services/EndPointApi";
import SortedContainerList from "../../components/SortedContainerList/SortedContainerList";
import BlueUderLinedLink from "../../components/Texts/BlueUderLinedLink";
import Header from "../../components/Header";
import { addContainerTypeList } from "../../redux/actions/AllActions";
import SlideUpModal from "../../components/PopUp/SlideUpModal";
import DeclarationDetails from "../ContainerCart/DeclarationDetails";
import { addTimeToDateTime } from "../../util/Utilities";
import DiffDateTimeDrop from "../../components/DiffDateAndTimeDrop/DiffDateTimeDrop";
import Alert from "../../components/alert/Alert";

interface BookTruckProps {
  truckBook;
  bookTruckUpdateAddress;
  updateOtherData;
  updateCommonData;
}

var containerIcon = {
  name: "container",
  slot: "",
  class: "zoom34",
};

const BookTruck: React.FC<BookTruckProps> = (props: any) => {
  let history = useHistory();
  var isdiff = "test";
  var truckBookData = props.truckBook; //bookTruckSampleData;
  //containerList = props.bookTruck; // bookTruckSampleData.containerList; //props.bookTruck;
  const [form, setForm] = useState<any>({
    minDate: minDate,
    containerType: [],
    date_time: calendarTodayDate,
    dropDiffTimeDate: false,
    dropMultiLoc: false,
  });
  const [alertPopup, setAlertPopup] = useState(false);
  const alertProps = {
    isShow: alertPopup,
    message: "",
    content: " Are you sure to remove the container?",
    icon: "<img src='/assets/icon/are-you-sure.svg'/>",
    alertAction: removeSelectedConainer,

    itemName: "",
    // cancelPolicy: true
    okButtonName: "Continue",
    cancelButtonName: "Cancel",
  };
  const [showModal, setshowModal] = useState(false);
  const [selectedItem, setselectedItem] = useState<any>({});
  const [toggle, settoggle] = useState<any>({
    dropDiffTimeDate: false,
    dropMultiLoc: false,
  });

  const calenderIcon = {
    name: "calendar",
    slot: "start",
    class: "slotStart",
    styleProps: { zoom: " 1.2" },
  };

  const intervalIcon = {
    name: "interval",
    slot: "",
    class: "slotStart",
  };
  const arrowDownIcon = {
    name: "arrow-down",
    slot: "",
    class: "lastIcon",
  };
  var dataFromDrafts = props.history.location.state;
  const [errors, setErrors] = useState<any>({});
  useEffect(() => {
    fetchContainerTypes();
    FetchAddress();

    if (
      props.history.location.state &&
      props.history.location.state.currentStep !== "location"
    )
      goToReview();
  }, []);

  var totalTruckNumber = createArrayOfObjectWithKeyAndValue();

  const handleChange = (e: any, value: any) => {
    //setErrors({ ...errors, [e.target.name]: "" });
    var element;
    console.log(form);
    if (e.target.name === "date_time") {
      setErrors({
        ...errors,
        date_time: "",
      });
      var datevalue = moment(new Date(value)).format("DD/MM/YYYY H:mm");
      var tt = formatToCalendarDate(form.date_time);
      console.log(new Date(value), form.date_time, new Date(tt));
      if (new Date(tt) <= new Date(value)) {
        setForm((prevState) => ({
          ...prevState,
          [e.target.name]: datevalue,
        }));
        element = { [e.target.name]: datevalue };

        props.updateCommonData(element);
        props.bookTruckUpdateAddress(element);
      } else {
        setErrors({
          ...errors,
          date_time: "Please enter a valid date",
        });
      }
    } else {
      console.log(e.target.name, value);
      setForm((prevState) => ({
        ...prevState,
        [e.target.name]: datevalue,
      }));
      element = { [e.target.name]: value };
      props.updateCommonData(element);
    }
  };
  async function goToReview() {
    // createRequestObject();
    let resp: any = await fetchContainerSummaryPayment(props.truckBook);

    if (resp?.success) {
      var response = resp.data?.data?.dataItems[0];
      response.bookTruckDetails = props.truckBook;
      var payment = createPaymentObject(response);
      var objToPass = { payment: payment, reviewObj: truckBookData };
      var nextPath = dataFromDrafts?.currentStep
        ? dataFromDrafts?.currentStep
        : "review";
      history.push("/bookTruckTab/" + nextPath, objToPass);
    }
  }

  const setAddress = async (name, data) => {
    var temp = data;

    var addrObj = { ...temp, address: data };

    props.bookTruckUpdateAddress(addrObj);
  };

  function updateData(e, value, item?, index?) {
    if (props.truckBook.multiLocAndTime) {
    }
    var payLoad;
    if (e === "droplocation") {
      var temp = value;
      payLoad = {
        containerNumber: item.container_number,
        element: { ...temp, address: value },
      };
      props.updateOtherData(payLoad);
    } else if (e.target.name === "date_time") {
      setErrors({
        ...errors,
        date_time: "",
      });
      let te = value;
      var se = formatDate(te);

      var timevalue = moment(new Date(value)).format("DD/MM/YYYY H:mm");

      var tt = formatToCalendarDate(form.date_time);
      console.log(new Date(value), form.date_time, new Date(tt));
      if (new Date(tt) <= new Date(value)) {
        setForm((prevState) => ({
          ...prevState,
          [e.target.name]: timevalue,
        }));
        payLoad = {
          containerNumber: item.container_number,
          element: { [e.target.name]: timevalue, displayTime: se },
        };
        props.updateOtherData(payLoad);
      } else {
        //alert("not ok");
        setErrors({
          ...errors,
          date_time: "Please enter a valid date",
        });
      }

      // setForm((prevState) => ({
      //   ...prevState,
      //   [e.target.name]: value,
      // }));
      // payLoad = {
      //   containerNumber: item.container_number,
      //   element: { [e.target.name]: timevalue, displayTime: se },
      // };
      // props.updateOtherData(payLoad);
    } else {
      payLoad = {
        containerNumber: item.container_number,
        element: { [e.target.name]: value },
      };
      props.updateOtherData(payLoad);
    }
  }

  function updateCommonData(e, value) {
    var element;
    if (e.target.name === "date_time") {
      value = moment(new Date(value)).format("DD/MM/YYYY H:mm");

      setForm((prevState) => ({
        ...prevState,
        [e.target.name]: value,
      }));
      element = { [e.target.name]: value };
      props.updateCommonData(element);
    } else if (e.target.name === "dropDiffTimeDate" || "dropMultiLoc") {
      setForm((prevState) => ({
        ...prevState,
        [e.target.name]: value,
      }));
      if (e.target.name === "dropDiffTimeDate") {
        element = { dropDiffTimeDate: value, multiLocAndTime: value };
      } else element = { multiLocAndTime: value };
    } else {
      element = { [e.target.name]: value };
      props.updateCommonData(element);
    }
    props.updateCommonData(element);
  }

  async function FetchAddress() {
    let res = await getAddressApi();

    var mindateOfDisable = addTimeToDateTime(
      new Date(),
      1 * res?.disableHrs * 60 || 1
    );
    var formattedMindate = mindateOfDisable.toISOString();
    var newdateTime = moment(new Date(formattedMindate)).format(
      "DD/MM/YYYY H:mm"
    );
    console.log(newdateTime);
    setForm((prevState) => ({
      ...prevState,
      date_time: newdateTime,
    }));
  }
  async function fetchContainerTypes() {
    let res: any = await getContainerTypes();
    {
      if (res?.success) {
        setForm((prevState) => ({
          ...prevState,
          containerType: res.data || containerType,
        }));
        var updatedContainerType = addContainerTypeList(res.data);
        if (updatedContainerType) Store.dispatch(updatedContainerType);
      } else {
        setForm((prevState) => ({
          ...prevState,
          containerType: containerType, //to delete -eanas
        }));
      }
    }
  }

  function openDeclaDetails(item) {
    setshowModal(true);
    setselectedItem(item);
  }

  function removeSelectedConainer(ite, actionType) {
    //setshowModal(false);
    setAlertPopup(false);
    if (actionType) {
      props.removeContainer(selectedItem.container_number);
    } else {
    }
  }

  const singleDropAttri = { multiLocAndTime: false, containerNum: {} };

  function toggleChange(e, value) {
    console.log(e, value);
    settoggle({ ...toggle, [e.target.name]: value });
    updateCommonData(e, value);
  }
  console.log(form);
  return (
    <IonPage className="BookTruck-Location">
      <IonContent>
        <Alert alertProps={alertProps} />
        <SlideUpModal
          showModal={showModal}
          openOrCloseModal={(modalState) => setshowModal(modalState)}
          content={
            <DeclarationDetails
              click={() => {
                setshowModal(false);
                setAlertPopup(true);
              }}
              item={selectedItem}
              //click={removeSelectedConainer}
            />
          }
        />
        <div className="tab-content">
          <div className="main-content">
            {!form.dropDiffTimeDate && (
              <IonRow className="black-label">
                <IonCol size="9">
                  <IonLabel> Drop containers at multiple locations?</IonLabel>
                </IonCol>
                <IonCol className="right-item">
                  <Toggle
                    value={truckBookData.multiLocAndTime}
                    changeToggle={updateCommonData}
                    name="dropMultiLoc"
                  />
                </IonCol>
              </IonRow>
            )}
            {!form.dropMultiLoc && (
              <IonRow className="black-label">
                <IonCol size="9">
                  <IonLabel>Drop containers at different date & time?</IonLabel>
                </IonCol>
                <IonCol className="right-item">
                  <Toggle
                    value={truckBookData.dropDiffTimeDate}
                    changeToggle={
                      //() => {
                      // setdropDiffTimeDate(!dropDiffTimeDate);
                      //updateCommonData
                      //}
                      updateCommonData
                    }
                    name="dropDiffTimeDate"
                  />
                </IonCol>
              </IonRow>
            )}
            <IonRow className="black-label">
              <IonCol size="9">
                <IonLabel>Number of Trucks Required?</IonLabel>
              </IonCol>
              <IonCol className="right-item">
                <SimpleBorder
                  label="testing"
                  content={
                    <SimpleDropdown
                      name={"truckNumber"}
                      value={truckBookData.truckNumber || "1"}
                      errors={errors.truckNumber}
                      type="text"
                      required={true}
                      onChange={handleChange}
                      datatype="TEXT"
                      //placeholder=""
                      listValues={totalTruckNumber}
                      icon={arrowDownIcon}
                    />
                  }
                />
              </IonCol>
              <div className="alert-message">
                <IonIcon icon={alertCircle}></IonIcon> max limit of 80
                containers is one truck
              </div>
            </IonRow>
          </div>
          <div className="sub-content">
            <UnderLinedText text="Enter drop details" />
          </div>
          {/* {!truckBookData.multiLocAndTime && ( */}
          <div className="sub-content">
            {/* <SingleLocationDropCard /> */}
            <div className="twoItem">
              {!truckBookData.multiLocAndTime && (
                <div className="eachElement">
                  <UnderLineOnly
                    className="black-underLine"
                    content={
                      <Calendar
                        name={"date_time"}
                        value={
                          formatToCalendarDate(
                            form.date_time || calendarTodayDate
                            //truckBookData.date_time
                            // ? truckBookData.date_time
                            // : calendarTodayDate
                          )
                          // ||
                          // formatToCalendarDate(calendarTodayDate)
                        }
                        label="Date"
                        errors={errors.date_time}
                        type="text"
                        required={true}
                        onChange={handleChange}
                        placeholder="text"
                        minDate={form.minDate}
                        icon={calenderIcon}
                        displayFormat="DD-MMM-YYYY HH:mm"
                        className="leftGap"
                      />
                    }
                  />
                </div>
              )}
              <div className="centerElement"></div>
              {!truckBookData.multiLocAndTime && (
                <div className="lastElement">
                  <UnderLineOnly
                    className="black-underLine"
                    content={
                      <SimpleDropdown
                        name={"dropInterval"}
                        value={truckBookData.dropInterval || "0"}
                        errors={errors.dropInterval}
                        type="text"
                        required={true}
                        onChange={handleChange}
                        datatype="TEXT"
                        //placeholder=""
                        listValues={dropIntervals}
                        icon={intervalIcon}
                        icon2={arrowDownIcon}
                        className="firstElement leftGap"
                      />
                    }
                  />
                </div>
              )}
            </div>
            <div className="twoItem">
              <div className="eachElement">
                {errors.date_time && (
                  <div className="topMargin">
                    <IonText color="danger" className="validation-message">
                      <IonLabel className="ion-padding-start">
                        {errors.date_time}
                      </IonLabel>
                    </IonText>
                  </div>
                )}
              </div>
              {/* <div className="centerElement"></div> */}
              <div className="lastElement"></div>
            </div>
            {!form.dropMultiLoc && (
              <AddressLink
                //value={truckBookData?.containerList[0]?.address || {}}
                value={truckBookData?.containerList[0] || []}
                setAddress={setAddress}
                linkClassName="flexStart"
                attributes={singleDropAttri}
                openPopup={true}
              />
            )}
          </div>
          {/* )} */}

          <div className="container-list-booktruck">
            <InformationText
              message={`${truckBookData.containerList.length} containers`}
            />
            {/* {truckBookData.containerList?.map((item, index) => { */}
            {props.truckBook?.containerList?.map((item, index) => {
              return (
                <div key={index}>
                  <SortedContainerList
                    isDiff={isdiff === item.boeNumber ? true : false}
                    item={item}
                    content={
                      !form.dropMultiLoc && !form.dropDiffTimeDate ? (
                        <SingleLocContainerCard
                          item={item}
                          icon={containerIcon}
                          arrowDownIcon={arrowDownIcon}
                          updateDate={(arg1, arg2) =>
                            updateData(arg1, arg2, item, index)
                          }
                          containerList={form.containerType}
                          containerCardClick={openDeclaDetails}
                        />
                      ) : !form.dropDiffTimeDate && form.dropMultiLoc ? (
                        <MultiLocationCard
                          item={item}
                          icon={containerIcon}
                          arrowDownIcon={arrowDownIcon}
                          updateDate={(arg1, arg2) =>
                            updateData(arg1, arg2, item, index)
                          }
                          containerList={form.containerType}
                          containerCardClick={openDeclaDetails}
                          errors={errors.date_time}
                        />
                      ) : (
                        form.dropDiffTimeDate &&
                        !form.dropMultiLoc && (
                          <DiffDateTimeDrop
                            item={item}
                            icon={containerIcon}
                            arrowDownIcon={arrowDownIcon}
                            updateDate={(arg1, arg2) =>
                              updateData(arg1, arg2, item, index)
                            }
                            containerList={form.containerType}
                            containerCardClick={openDeclaDetails}
                          />
                        )
                      )
                    }
                  />

                  <div hidden={true}>{(isdiff = item.boeNumber)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </IonContent>
      {/* <div className="footerPosition"> */}
      <BlueFooter onBlueFooterClick={goToReview} footerLabel="Continue" />
      {/* </div> */}
    </IonPage>
  );
};

const mapStateToProps = (state: any) => {
  console.log(state.TruckBook);
  return {
    truckBook: state.TruckBook,
  };
};

const mapDispatchToProps = () => {
  return {
    bookTruckUpdateAddress: (item: any) => {
      Store.dispatch({
        type: AllActionTypes.BOOK_TRUCK_UPDATE_ADDRESS,
        payLoad: item,
      });
    },
    updateOtherData: (item: any) => {
      Store.dispatch({
        type: AllActionTypes.BOOK_TRUCK_UPDATE_OTHER_DATA,
        payLoad: item,
      });
    },
    updateCommonData: (item: any) => {
      console.log(item);
      Store.dispatch({
        type: AllActionTypes.BOOK_TRUCK_UPDATE_COMMON_DATA,
        payLoad: item,
      });
    },
    removeContainer: (item: any) => {
      Store.dispatch({
        type: AllActionTypes.REMOVE_CONTAINER_TRUCK_BOOK,
        payLoad: item,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookTruck);
