import { IonButton, IonLabel, IonText } from "@ionic/react";
import moment from "moment";
import React, { useState } from "react";
import { lastYear, minDate, todayDate } from "../../services/Common";
import Calendar from "../calendar/Calendar";
import BorderWithFloatingText from "../InputBorders/BorderWithFloatingText";

interface searchBoeByDateProps {
  openOrCloseModalInsearch?: (modalStatus, param1?, param2?) => any;
  headerName: string;
  searchDates?: any;
  setSearchdate?: any;
}

const SearchBoeByDate: React.FC<searchBoeByDateProps> = ({
  openOrCloseModalInsearch,
  headerName,
  searchDates,
  setSearchdate,
}) => {
  console.log(searchDates);
  const [form, setForm] = useState<any>({
    fromDate: { value: searchDates.fromDate, minDate: "", maxdate: "" },
    toDate: { value: searchDates.toDate, minDate: "", maxdate: "" },
  });
  console.log(form);
  const [error, seterror] = useState<any>({ fromDate: "", toDate: "" });
  const handleChange = (e: any, value: any) => {
    // if (e.target.name === "fromDate") {
    //   setForm({
    //     ...form,
    //     toDate: {
    //       value: value,
    //       //minDate: moment(new Date(value)).format("YYYY-MM-DD"),
    //       paramDate: moment(new Date(value)).format("DD/MM/yyyy"),
    //     },
    //   });
    // }
    seterror({ fromDate: "" });

    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: {
        ...form[e.target.name],
        paramDate: moment(new Date(value)).format("DD/MM/yyyy"),
        value: value,
      },
    }));
    setSearchdate({
      ...searchDates,
      [e.target.name]: moment(new Date(value)).format("YYYY-MM-DD"),
    });
  };

  const calenderIcon = {
    name: "calendar",
    slot: "end",
    class: "calenderMargin",
  };

  function reset() {
    setSearchdate({ fromDate: "", toDate: todayDate });
    // setForm({
    //   fromDate: { value: "", minDate: "", maxdate: "" },
    //   toDate: { value: todayDate, minDate: "", maxdate: "" },
    // });
    openOrCloseModalInsearch(false, "", "");
  }

  function applyFilter() {
    if (form.fromDate.value === "")
      seterror({ fromDate: "Choose 'From Date'" });
    else
      openOrCloseModalInsearch(
        false,
        form.fromDate.paramDate,
        //form.toDate.paramDate ||
        // searchDates.toDate ||
        moment(new Date(searchDates.toDate).toISOString()).format("DD/MM/YYYY")
      );
  }

  return (
    <>
      <div className="popup-header">
        <div className="header-title">
          <span>{headerName}</span>
        </div>
      </div>
      <div className="popup-content">
        <div className=" twoItems">
          <BorderWithFloatingText
            label="From Date"
            content={
              <Calendar
                name={"fromDate"}
                value={form.fromDate.value}
                label="From Date"
                // errors={errors.dateAndTime}
                type="text"
                required={true}
                onChange={handleChange}
                placeholder="--/--/----"
                minDate={lastYear}
                icon={calenderIcon}
                className="leftCalendar"
                displayFormat="DD/MMM/YYYY"
                //max={minDate}
              />
            }
          />

          <BorderWithFloatingText
            label="To Date"
            content={
              <Calendar
                name={"toDate"}
                value={form.toDate.value} //{form.toDate.value}
                label="To Date"
                //errors={errors.dateAndTime}
                type="text"
                required={true}
                onChange={handleChange}
                placeholder="--/--/----"
                minDate={lastYear}
                icon={calenderIcon}
                className="rightCalendar"
                displayFormat="DD/MMM/YYYY"
                //max={minDate}
              />
            }
          />
        </div>
        {error.fromDate && (
          <div className=" twoItems1 validate-date">
            {" "}
            <div className="topMargin">
              <IonText color="danger" className="validation-message">
                <IonLabel className="ion-padding-start">
                  {error.fromDate}
                </IonLabel>
              </IonText>
            </div>
          </div>
        )}
        <div className="twoItems">
          <IonButton className="reset" fill="clear" onClick={() => reset()}>
            Reset
          </IonButton>
          <IonButton
            className="apply-filter"
            fill="clear"
            onClick={() => {
              console.log(
                form.fromDate.paramDate,
                form.toDate.value,
                searchDates.toDate
              );
              applyFilter();
            }}
          >
            Apply Filter
          </IonButton>
        </div>
      </div>
    </>
  );
};
export default SearchBoeByDate;
