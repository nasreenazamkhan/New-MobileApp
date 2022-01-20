import { IonCol, IonLabel, IonRow, IonText } from "@ionic/react";
import React, { useEffect, useState } from "react";

const TrackComponent = (props: any) => {
  const [title, setTitle] = useState("");
  console.log("88888888", props.trackData);

  // const getMonthName = (monthNum) => {
  //   var monthNames = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];

  //   return monthNames[monthNum - 1];
  // };
  function getTitle(status) {
    switch (status) {
      case "PTOK":
        //setTitle("PENDING");
        return "Truck Assigned";
        break;
      // case "CONF":
      //   //setTitle("CONFIRMED");
      //   return "Job Started";
      //   break;
      case "INPRO":
        //setTitle("COMPLETED");
        return "Job Started";
        break;
      case "PODUPL":
        return "Proof of Delivery Submitted";
      case "FCL_DEL":
        return "Delivered";
      case "PEND":
        return "Booked";
      case "COMPL":
        //setTitle("PENDING");
        return "Empty container back in yard ";
    }
  }

  function checkDate(currentDate) {
    return true;
  }

  return (
    <>
      {props.trackData?.map((item, id) => (
        <IonRow class="menuClose1" key={id}>
          {/* { test = checkDate(item.actionDateAndTime.split(" ")[0])} */}
          <IonCol size="2" class="trackLine">
            {item.diffTime || id === 0 ? (
              <IonRow class="blueRound lightShadow">
                <IonCol class="ion-text-center top25"></IonCol>
              </IonRow>
            ) : (
              <></>
            )}
            <IonRow class="trackRound lightShadow">
              <IonCol class="ion-text-center top25">
                <IonLabel className="trackRoundLabel">
                  {/* {item.actionDateAndTime.split(" ")[1]} */}
                  {item.time}
                </IonLabel>
              </IonCol>
            </IonRow>
          </IonCol>

          <IonCol class="trackDateLabel">
            <IonRow>
              {item.diffTime || id === 0 ? (
                <IonLabel class="trackLabelColor trackDate">
                  {/* {getMonthName(
                    item.actionDateAndTime.split(" ")[0].split("/")[1]
                  )}{" "}
                  {item.actionDateAndTime.split(" ")[0].split("/")[0]} */}
                  {item.date}
                </IonLabel>
              ) : (
                <></>
              )}
            </IonRow>

            <IonRow class={item.diffTime ? "trackLabel" : "trackLabelSmall"}>
              <IonLabel className="regularFont">
                {/* {getTitle(item.status)}{" "} */}
                {item.trackDescription}
              </IonLabel>
            </IonRow>
          </IonCol>
          {/* <IonCol class="trackLabel"> */}

          {/* </IonCol> */}
        </IonRow>
      ))}
    </>
  );
};

// export default React.memo(TrackComponent);
export default TrackComponent;
