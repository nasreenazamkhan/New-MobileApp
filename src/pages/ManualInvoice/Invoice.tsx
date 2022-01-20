import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import InformationText from "../../components/InformationText";
import Statuscard from "../../components/statusCard/statuscard";
import { updateInvoiceHeader } from "../../redux/actions/AllActions";
import Store from "../../redux/Store";
import { fetchAllmiscellaneousList } from "../../services/EndPointApi";
import { fetchMiscellanious } from "../../util/EndPointURL";
var miscellaneousList = [
  {
    bookingNumber: "LM000723",
    bookedOn: "15/08/2021 13:52",
    noOfContainers: 1,
    noOfTrucks: 1,
    statusCode: "STARTED",
    amountPaid: "0.00",
    receipt: "true",
    requesterName: "ReqName",
    requesterContact: "971554070465",
    containersInYard: 0,
    containersToTown: 1,
    containersDelivered: 0,
    containersCompleted: 0,
    bookedDate: "2021-08-15T09:52:28.645+00:00",
    importerComments: null,
    verifyPodBy: "16/08/2021 16:49",
    verifyPodTime: 3,
    unpaidAmount: "105.00",
    inv: true,
    pod: true,
  },
];

export default function Invoice() {
  let history = useHistory();
  const [miscellaneousList, setmiscellaneousList] = useState([]);

  useEffect(() => {
    getAllmiscellaneousList("");
  }, []);

  async function getAllmiscellaneousList(param: string) {
    if (!param) {
      param = "pgSize=10&pgNo=0&option=ALL&locale=en";
    }

    var response = await fetchAllmiscellaneousList(fetchMiscellanious + param);
    if (response?.data?.elements?.length > 0) {
      setmiscellaneousList(response.data.elements);
    }
    console.log(response);
  }

  async function goToInvoiceTabPage(item) {
    // var invoiceHeader = {
    //   noOfContainers: item.noOfContainers,
    //   noOfTrucks: item.noOfTrucks,
    //   amountPaid: item.amountPaid,
    // };
    // var updateInvoiceHead = updateInvoiceHeader(invoiceHeader);
    // if (updateInvoiceHead) Store.dispatch(updateInvoiceHead);
    history.push("/invoicetabs/booking", item);
  }
  return (
    <IonPage>
      <Header
        label="miscellaneous invoice"
        action="home"
        //searchClick={onSearchClick}
        agentHeader={true}
      />
      <InformationText message={`${miscellaneousList.length} bookings`} />
      <IonContent>
        {miscellaneousList.map((item, index) => (
          <Statuscard
            key={index}
            item={item}
            gotoDetails={() => goToInvoiceTabPage(item)}
          />
        ))}
      </IonContent>
    </IonPage>
  );
}
