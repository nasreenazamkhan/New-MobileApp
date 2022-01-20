import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IonPage, IonContent, IonGrid } from "@ionic/react";
import StatusCard from "./statusCard/StatusCard";
import * as EndPointURL from "../../../util/EndPointURL";
import Header from "../../../components/Header";
import { httpGetCallWithoutHeader } from "../../../services/EndPointApi";
import Store from "../../../redux/Store";

export default function Status(props) {
  console.log(props);
  let history = useHistory();
  const [countsRequest, setCountsRequest] = useState<any>({});
  const [agent, setAgent] = useState();
  Store.subscribe(() => {
    setAgent(Store.getState().CheckUserStatus.user.selectedAgent);
  });

  useEffect(() => {
    getCountRequest();
    console.log("call status", agent);
  }, [agent]);

  const onBookingClick = () => {
    history.push("/bookingDetails/ALL");
  };
  const onPODClick = () => {
    history.push("/tabs/status/pod/listAllPod");
  };
  const onInvoiceClick = () => {
    history.push("/tabs/status/miscellaneous");
  };

  const getCountRequest = async () => {
    var response = await httpGetCallWithoutHeader(
      EndPointURL.fetchRequestStatusCountsUrl
    );
    if (await response?.success) {
      var respObj = response?.data?.data?.dataItems[0];
      Object.keys(respObj).forEach(function (key) {
        respObj[key] = respObj[key] < 10 ? "0" + respObj[key] : respObj[key];
      });

      await setCountsRequest({
        ...countsRequest,
        result: respObj,
      });
    }
  };

  const onSearchClick = () => {
    history.push("/search-booking");
  };

  const goBack = () => {
    history.push("/tabs/landing");
  };

  return (
    <IonPage id="status-page">
      <Header
        label="Status"
        action="search"
        searchClick={onSearchClick}
        showAgent={true}
        customBack={true}
        backClick={goBack}
        agentHeader={true}
      />
      <IonContent fullscreen padding-top className="page-content">
        <IonGrid margin-top>
          <StatusCard
            type="All Bookings"
            total={countsRequest?.result?.ALL}
            handleClick={onBookingClick}
          />
          <StatusCard
            type="Verify POD's"
            total={countsRequest.result?.PODUPL}
            handleClick={onPODClick}
          />
          <StatusCard
            type="Miscellaneous Invoices"
            total={countsRequest.result?.INVAPPR}
            handleClick={onInvoiceClick}
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
