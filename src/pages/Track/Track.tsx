import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./Track.scss";
import TrackComponent from "./TrackComponent";

export default function Track(props) {
  const [trackData, setData] = useState([]);

  useEffect(() => {
    var pend = {
      status: "PEND",
      actionDateAndTime: props.location.state?.bookingDate,
      createdBy: "",
      containerList: null,
      diffTime: true,
    };

    // var backToYard = {
    //   status: "BACK_TO_YARD",
    //   actionDateAndTime: "",
    //   createdBy: "",
    //   containerList: null,
    //   diffTime: false,
    // };
    var trackData1 = props.location.state?.containerTrackList;
    console.log(trackData1);

    //trackData1.splice(0, 0, pend);
    trackData1?.forEach(function (item, index) {
      if (index > 0) {
        // if (item.status === "FCL_DEL") {
        //   //backToYard.actionDateAndTime == item.actionDateAndTime;
        //   trackData1.push(backToYard);
        // }
        var thisdatearray = item.actionDateAndTime.split("/");
        var prevdateArray = trackData1[index - 1].actionDateAndTime.split("/");

        var newThisdate =
          thisdatearray[1] + "/" + thisdatearray[0] + "/" + thisdatearray[2];
        var newPrevDate =
          prevdateArray[1] + "/" + prevdateArray[0] + "/" + prevdateArray[2];
        var thisDate = new Date(newThisdate.split(" ")[0]);
        var prevDate = new Date(newPrevDate.split(" ")[0]);
        console.log(thisDate, prevDate);
        if (thisDate > prevDate) {
          item.diffTime = true;
        } else {
          item.diffTime = false;
        }
        console.log(item);
      }
    });
    const finalTrackData = trackData1?.filter((item) => item.status !== "CONF");

    setData(finalTrackData);
  }, []);
  return (
    <IonPage>
      <Header
        label={`TRACK #${props.location.state?.container_number}`}
        action="home"
      />
      <IonContent>
        {" "}
        <TrackComponent trackData={trackData} />
      </IonContent>
    </IonPage>
  );
}
