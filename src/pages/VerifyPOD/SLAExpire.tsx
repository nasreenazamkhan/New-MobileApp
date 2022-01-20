import { IonCol, IonLabel } from "@ionic/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { mmddFormatDate } from "../../services/Common";
import "./ListAllPod.scss";

interface SLAExpireProps {
  expiryDate;
  verifyPodTime: number;
  SLAstatus?: (status) => void;
}
const SLAExpire: React.FC<SLAExpireProps> = ({
  expiryDate,
  verifyPodTime,
  SLAstatus,
}) => {
  const [expiryTime, setexpiryTime] = useState("");
  var dateInMMDD = mmddFormatDate(expiryDate);
  var start = moment(new Date());
  var end = moment(new Date(dateInMMDD));

  useEffect(() => {
    setexpiryTime(end.from(start));
    if (SLAstatus && end.diff(start, "hours") < verifyPodTime) {
      SLAstatus(true);
    }
  }, []);

  return (
    <div
      className={
        end.diff(start, "hours") < verifyPodTime ? "sla-text red" : "sla-text"
      }
    >
      SLA Expire{end.diff(start, "minutes") < 0 ? "d " : "s "} {expiryTime}
    </div>
  );
};
export default SLAExpire;
