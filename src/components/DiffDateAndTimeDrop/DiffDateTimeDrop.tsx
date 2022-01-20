import { IonCard, IonCardContent, IonLabel } from "@ionic/react";
import React from "react";
import {
  calendarTodayDate,
  formatToCalendarDate,
  minDate,
} from "../../services/Common";
//import { containerType } from "../../data";
import { dropIntervals } from "../../util/Constants";
import Calendar from "../calendar/Calendar";
import SimpleDropdown from "../dropdownInput/SimpleDropdown";
import Icon from "../Icon";
import UnderLineOnly from "../InputBorders/UnderLineOnly";

interface DiffDateTimeDropProps {
  icon: any;
  arrowDownIcon: any;
  item: any;
  updateDate: any;
  containerList?: any;
  disabled?: boolean;
  containerCardClick?: (item) => void;
}

const DiffDateTimeDrop: React.FC<DiffDateTimeDropProps> = ({
  icon,
  arrowDownIcon,
  item,
  updateDate,
  containerList,
  disabled,
  containerCardClick,
}) => {
  const calenderIcon = {
    name: "calendar",
    slot: "start",
    class: "calenderMargin absolutePosition zoom12",
  };

  return (
    <IonCard className="multi-card" onClick={() => containerCardClick(item)}>
      <IonCardContent>
        <div className="container">
          <div className="top-part">
            <div className="cont-icon">
              <Icon iconProps={icon} />
            </div>
            <div className="second-col">
              <div className="first-row">{item.container_number}</div>
              <div className="sec-row">
                <UnderLineOnly
                  className="black-underLine"
                  content={
                    <SimpleDropdown
                      name={"containerType"}
                      value={item.containerType}
                      // errors={errors.dropInterval}
                      type="text"
                      required={true}
                      onChange={(arg1, arg2) => updateDate(arg1, arg2)}
                      datatype="TEXT"
                      placeholder="Container Type"
                      listValues={containerList} // || containerType}
                      icon2={!disabled ? arrowDownIcon : ""}
                      className="firstElement rightGap"
                      disabled={disabled ? disabled : false}
                    />
                  }
                />
              </div>
            </div>
            <div className="third-col">
              <UnderLineOnly
                className="black-underLine"
                content={
                  <Calendar
                    name={"date_time"}
                    value={formatToCalendarDate(
                      item.date_time || calendarTodayDate
                    )}
                    label="Date"
                    //errors={errors.dateAndTime}
                    type="text"
                    required={true}
                    onChange={updateDate}
                    placeholder="text"
                    minDate={minDate}
                    icon={calenderIcon}
                    displayFormat="DD-MMM-YYYY HH:mm"
                    className="leftGap "
                    disabled={disabled ? disabled : false}
                  />
                }
              />
            </div>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};
export default DiffDateTimeDrop;
