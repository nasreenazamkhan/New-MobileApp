import {
  IonRow,
  IonCol,
  IonLabel,
  IonFooter,
  IonToolbar,
  IonContent,
  IonPage,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BlueFooter from "../../../../components/Footer/BlueFooter";
import Footer from "../../../../components/Footer/Footer";
import Icon from "../../../../components/Icon";
import SlideUpModal from "../../../../components/PopUp/SlideUpModal";
import UnderLinedText from "../../../../components/Texts/UnderLinedText";
import { createArrayOfObjectWithKeyAndValue } from "../../../../services/Common";
import { getMiscellaniousDetails } from "../../../../services/EndPointApi";
import DeclarationDetails from "../../../ContainerCart/DeclarationDetails";
import PodCard from "../../../VerifyPOD/PODCard/PodCard";
import "./TabInvoice.scss";
var PODDetail = [
  {
    container_number: 12345,
    containerType: 67890,
    consigneeDetails: "Sony Gulf Fze..",
    pick_up: "T2",
    date_time: "10-01-2020 13:20",
  },
];
interface InvoiceBookingProps {
  InvoiceDetails;
}
const InvoiceBooking: React.FC<InvoiceBookingProps> = ({ InvoiceDetails }) => {
  let history: any = useHistory();
  console.log(InvoiceDetails);
  const [miscellaniousLis, setmiscellaniousLis] = useState<any>({});
  const [showSlideUpModal, setshowSlideUpModal] = useState(false);
  const [selectedIndexNumber, setselectedIndexNumber] = useState<any>({});
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    getDetailsOfMiscellanious();
  }, []);

  async function getDetailsOfMiscellanious() {
    var resp = await getMiscellaniousDetails(InvoiceDetails.bookingNumber);
    console.log(resp);
    if (resp?.success) {
      setmiscellaniousLis(resp?.data);
    }
  }
  var starnumbertest = createArrayOfObjectWithKeyAndValue(5);
  var trackTruckIconProps = {
    name: "track-truck",
    slot: "",
    class: "zoom12",
    style: { stroke: "#168FE4" },
    styleProps: { zoom: 2.6 },
  };

  var editContactIconProps = {
    name: "eye-blue",
    slot: "",
    class: "zoom12",
    style: { stroke: "#168FE4" },
    styleProps: { zoom: 2.6 },
  };

  var startIconProps = {
    name: "star",
    slot: "",
    class: "zoom12",
    style: { stroke: "#168FE4" },
  };

  function podCardClick(item) {
    console.log(item);
    setshowSlideUpModal(true);
    setselectedIndexNumber(item);
  }
  return (
    <IonPage className="BookTruck-Location">
      <IonContent>
        <SlideUpModal
          showModal={showSlideUpModal}
          openOrCloseModal={(modalState) => {
            setshowSlideUpModal(modalState);
            //setpodDownLoadModalContent(podDownLoadModalContent);
          }}
          content={
            <DeclarationDetails
              item={selectedIndexNumber}
              click={() => {
                console.log("uuiuiuiuiu");
                setshowModal(false);
              }}
              fromPod={true}
            />
          }
        />
        <div className="invoice-book-container componentMargins">
          <IonRow>
            <IonCol>
              <UnderLinedText text="Payment details" />
            </IonCol>
          </IonRow>
          <div className="invoice-book-container">
            {miscellaniousLis.paymentDetails?.map((item, index) => (
              <IonRow key={index}>
                <IonCol>
                  <IonLabel className="bold-font">
                    {item.chargeDescription}
                  </IonLabel>
                </IonCol>
                <IonCol class="ion-text-end">
                  <IonLabel className="bold-font">
                    {item.totalAmount} AED
                  </IonLabel>
                </IonCol>
              </IonRow>
            ))}

            <IonRow>
              <IonCol></IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonLabel className="bold-font">Gross Amount</IonLabel>
              </IonCol>
              <IonCol class="ion-text-end">
                <IonLabel className="bold-font">
                  {miscellaniousLis.grossAmount} AED
                </IonLabel>
              </IonCol>
            </IonRow>
          </div>
        </div>
        {miscellaniousLis.containerList?.map((item, index) => (
          <div key={index}>
            <PodCard
              item={item}
              cardClick={podCardClick}
              //clickedDownloadPOD={podCardClick}
              icon1={trackTruckIconProps}
              icon2={editContactIconProps}
            />
            <div className="invoice-book-container componentMargins">
              <IonRow>
                {item.rating > 0 &&
                  createArrayOfObjectWithKeyAndValue(item.rating).map(
                    (item, index) => (
                      <Icon key={index} iconProps={startIconProps} />
                    )
                  )}
                <IonCol class="ion-text-end">
                  <IonLabel className="gray-label">
                    Completed on: {item.date_time}
                  </IonLabel>
                </IonCol>
              </IonRow>
            </div>
          </div>
        ))}
        {/* <CenterFooterButton
          iconType="menu"
          clickEvent={() => console.log("2")}
        /> */}
      </IonContent>
      {/* <IonToolbar>
        <Footer />
      </IonToolbar> */}
    </IonPage>
  );
};
export default InvoiceBooking;
