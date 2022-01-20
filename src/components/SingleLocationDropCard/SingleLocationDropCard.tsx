import { IonText, IonLabel } from "@ionic/react";
import React, { useState } from "react";
import { todayDate } from "../../services/Common";
import Calendar from "../calendar/Calendar";
import SimpleDropdown from "../dropdownInput/SimpleDropdown";
import UnderLineOnly from "../InputBorders/UnderLineOnly";
import BlueUderLinedLink from "../Texts/BlueUderLinedLink";
import "./SingleLocationDropCard.scss";

interface SingleLocationDropCard {
  updateSingleLoc?: () => void;
}
const SingleLocationDropCard: React.FC<SingleLocationDropCard> = ({}) => {
  const [calendarDate, setcalendarDate] = useState(todayDate);
  const calenderIcon = {
    name: "calendar",
    slot: "start",
    class: "slotStart",
  };
  function updateData(data) {
    console.log(data);
  }
  return (
    // <div className="twoItem">
    //   <div className="eachElement">
    <>
      <UnderLineOnly
        className="black-underLine"
        content={
          <Calendar
            name={"dateAndTime"}
            value={calendarDate}
            label="Date"
            type="text"
            required={true}
            onChange={updateData}
            placeholder="text"
            minDate={todayDate}
            icon={calenderIcon}
            displayFormat="DD-MMM-YYYY HH:mm"
            className="leftGap"
          />
        }
      />
      {/* {errors.dateAndTime && ( */}
      <div className="topMargin">
        <IonText color="danger" className="validation-message">
          <IonLabel className="ion-padding-start">
            Pls enter valid date
          </IonLabel>
        </IonText>
      </div>
      {/* )} */}
    </>
  );
};
export default SingleLocationDropCard;
