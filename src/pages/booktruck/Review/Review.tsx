import { IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";
import { RouteComponentProps, useHistory, useLocation } from "react-router-dom";
import AddressLink from "../../../components/Address/AddressLink";

import Calendar from "../../../components/calendar/Calendar";
import SimpleDropdown from "../../../components/dropdownInput/SimpleDropdown";
import BlueFooter from "../../../components/Footer/BlueFooter";
//import InformationText from "../../../components/InformationText1";
import UnderLineOnly from "../../../components/InputBorders/UnderLineOnly";
import MultiLocationCard from "../../../components/MultiLocationCard/MultiLocationCard";
import SingleLocContainerCard from "../../../components/SingleLocationDropCard/SingleLocContainerCard";
import SortedContainerList from "../../../components/SortedContainerList/SortedContainerList";
import BlueUderLinedLink from "../../../components/Texts/BlueUderLinedLink";
import InformationText from "../../../components/Texts/InformationText";
import Store from "../../../redux/Store";
import { formatToCalendarDate, todayDate } from "../../../services/Common";
import { dropIntervals } from "../../../util/Constants";
import "./Review.scss";

// interface ReviewProps {
//   // payment?: any;
//   // reviewObj?;
// }
export default function Review(props) {
  var history = useHistory();
  var isdiff = "test";
  //const location = useLocation();
  const [obj, setobj] = useState<any>(
    props?.history?.location?.state?.reviewObj
  );
  const [showModal, setshowModal] = useState(false);
  const [selectedItem, setselectedItem] = useState<any>({});
  console.log(props?.history?.location?.state);
  // var truckBook: any = location.state.reviewObj;
  const calenderIcon = {
    name: "calendar",
    slot: "start",
    class: "slotStart",
    zoom: " 1.2",
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
  var locationIconProps = {
    name: "location",
    slot: "",
    class: "zoom24",
    styleProps: { zoom: 1.8 },
  };
  var containerIcon = {
    name: "container",
    slot: "",
    class: "zoom34",
  };

  function goToPayment() {
    console.log(props?.history?.location?.state);
    history.push("/bookTruckTab/payment", props?.history?.location?.state);
  }

  var containerTypeList = Store.getState().VariableValues.containerTypeList;
  console.log(containerTypeList);
  return (
    <IonPage className="BookTruck-Location">
      <IonContent>
        <div className="main-content tab-content">
          <div className="total-info">
            <div className="first-elemnt">Total Containers</div>
            <div className="sec-elemnt">{obj?.containerList?.length}</div>
            <div className="third-elemnt">Total Trucks</div>
            <div className="last-elemnt">{obj?.truckNumber}</div>
          </div>
          <div hidden={obj?.multiLocAndTime}>
            <div className="twoItem">
              <div className="eachElement">
                <UnderLineOnly
                  className="black-underLine no-underLine"
                  content={
                    <Calendar
                      name={"date_time"}
                      //value={obj?.date_time}
                      value={formatToCalendarDate(obj?.date_time)}
                      label="Date"
                      //errors={errors.date_time}
                      type="text"
                      required={true}
                      //onChange={handleChange}
                      placeholder="text"
                      //minDate={form.minDate}
                      icon={calenderIcon}
                      displayFormat="DD-MMM-YYYY HH:mm"
                      className="leftGap"
                      disabled={true}
                    />
                  }
                />
              </div>
              {/* <div className="centerElement"></div> */}
              <div className="lastElement">
                <UnderLineOnly
                  className="black-underLine no-underLine"
                  content={
                    <SimpleDropdown
                      name={"dropInterval"}
                      value={obj.dropInterval || "0"}
                      //errors={errors.dropInterval}
                      type="text"
                      required={true}
                      //onChange={handleChange}
                      datatype="TEXT"
                      //placeholder=""
                      listValues={dropIntervals}
                      icon={intervalIcon}
                      className="firstElement leftGap"
                      disabled={true}
                    />
                  }
                />
              </div>
            </div>
            <AddressLink
              value={obj?.containerList[0]?.address || {}}
              //setAddress={setAddress}
              disabled={true}
              linkClassName="flexStart"
              openPopup={false}
              //attributes={singleDropAttri}
            />
            {/* <BlueUderLinedLink
              label={obj.reviewObj?.containerList[0].address}
              leftIcon={locationIconProps}
              //onTap={() => setshowModal(true)}
              className="flexStart "
              labelCLassName="location-selected"
            /> */}
          </div>
          <InformationText
            message={`${obj?.containerList?.length} containers`}
          />
          {obj?.containerList?.map((item, index) => {
            return (
              <div key={index}>
                <SortedContainerList
                  isDiff={isdiff === item.boeNumber ? true : false}
                  item={item}
                  content={
                    !obj?.multiLocAndTime ? (
                      <SingleLocContainerCard
                        item={item}
                        icon={containerIcon}
                        arrowDownIcon={arrowDownIcon}
                        updateDate={(arg1, arg2) => console.log()}
                        disabled={true}
                        containerList={containerTypeList}
                        containerCardClick={() => console.log("details")}
                      />
                    ) : (
                      <MultiLocationCard
                        item={item}
                        icon={containerIcon}
                        arrowDownIcon={arrowDownIcon}
                        updateDate={(arg1, arg2) => console.log()}
                        disabled={true}
                        containerList={containerTypeList}
                        containerCardClick={() => console.log("details")}
                      />
                    )
                  }
                />
                {/* {item.selected && (
                  <div key={index}>
                    <>
                      <div
                        className="decla-info"
                        hidden={isdiff === item.boeNumber}
                      >
                        <div className="decla-number">
                          <IonLabel>{item.boeNumber}</IonLabel>
                        </div>
                        <div className="do-validity">
                          <IonLabel class="validity-text">
                            DO Validity: {item.boeNumber}
                          </IonLabel>
                        </div>
                      </div>
                      <div hidden={true}>{(isdiff = item.boeNumber)}</div>
                    </>
                    {!truckBookData.multiLocAndTime ? (
                      <SingleLocContainerCard
                        item={item}
                        icon={containerIcon}
                        arrowDownIcon={arrowDownIcon}
                        updateDate={(arg1, arg2) =>
                          updateData(arg1, arg2, item, index)
                        }
                        containerList={form.containerType}
                      />
                    ) : (
                      <MultiLocationCard
                        item={item}
                        icon={containerIcon}
                        arrowDownIcon={arrowDownIcon}
                        updateDate={(arg1, arg2) =>
                          updateData(arg1, arg2, item, index)
                        }
                        containerList={form.containerType}
                      />
                    )}
                  </div>
                )} */}
                <div hidden={true}>{(isdiff = item.boeNumber)}</div>
              </div>
            );
          })}
        </div>
      </IonContent>
      {/* <div className="footerPosition"> */}
      <BlueFooter
        onBlueFooterClick={() => goToPayment()}
        footerLabel="Continue"
      />
      {/* </div> */}
    </IonPage>
  );
}
