import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
  IonGrid,
  IonToolbar,
  IonInput,
  IonButtons,
  IonIcon,
  IonLabel,
  IonCol,
} from "@ionic/react";
import BookingCard from "./bookingCard/BookingCard";
import * as EndPointURL from "../../../util/EndPointURL";
import { httpGetCallWithoutHeader } from "../../../services/EndPointApi";
import Header from "../../../components/Header";
import Store from "../../../redux/Store";
import { chevronDownOutline, search } from "ionicons/icons";
import TopMenu from "../../../components/topMenu/TopMenu";
// import PaymentSuccess from "./PaymentSuccess";
// import PaymentFailed from "./PaymentFailed";
// import PaymentPending from "./PaymentPending";
// import Footer from "./Footer";
import "./BookingDetails.scss";
import MainTabs from "../../MainTabs";
import SlideUpModal from "../../../components/PopUp/SlideUpModal";
import SearchBoeByDate from "../../../components/PopUp/SearchBoeByDate";
import TxtInput from "../../../components/txtinput/TxtInput";
import SearchBooking from './searchBooking/searchBooking'
import { updatePaymentStatus } from "../../../redux/actions/AllActions";
import Success from "../../PaymentStatus/Success";
import Fail from "../../PaymentStatus/Fail";
import Pending from "../../PaymentStatus/Pending";


var pageNumber = 0;
export default function MyBookingDetails(props) {
  console.log("MyBookingDetails",props)
  const blankIcon = {
    name: "",
    slot: "",
    class: "",
    iconClick: () => console.log(),
  };


  const [result, setResult] = useState([]);
  const [disableInfiniteScroll, setDisableInfiniteScroll] =
    useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [requestStatus, setRequestStatus] = useState("");
  const [paymentPage, setPaymentPage] = useState("");
  const [referenceNumber, setReferenceNumber] = useState();
  const [agent, setAgent] = useState();
  const [sortOrderDate, setSortOrderDate] = useState<string>("DESC");
  const [sortOrderAmount, setSortOrderAmount] = useState<string>("ASC");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchClick, isSearchClick] = useState<boolean>(false);
  // const [seachValue, setSearchValue] = useState<string>("");
  const [icon, setIcon] = useState<any>(blankIcon);


   const [screen, setscreen] = useState<any>({});

 

  const getTitle = (status) => {
    switch (status) {
      case "ALL":
        setTitle("ALL BOOKINGS");
        break;
      case "PODUPL":
        setTitle("VERIFY POD'S");
        break;
      case "INVSUBMT":
        setTitle("VERIFY INVOICES");
        break;
      default:
        setTitle("");
    }
  };

  const onCardClick = (item) => {
    console.log("onCardClick",item)
    var userType = Store.getState().CheckUserStatus.user.userType;
    let bookingDetails = {
      bookingNumber: item?.bookingNumber,
      requesterName: item?.requesterName,
      requesterContact: item?.requesterContact,
      importerComments: item?.importerComments,
      // totalAmount: item?.amountPaid,
      totalAmount: item?.totalAmount,
      truckCount: item?.noOfTrucks,
      containerCount: item?.noOfContainers,
      userType: userType,
      cardStatus: props.match.params.status,
      bookingStatus: item?.statusCode,
    };
    props.history.push("/containerDetails", {
      bookingDetails : bookingDetails
    });
  };


  // useEffect(()=>{
  //   console.log(seachValue)
  //   onSearchBooking(seachValue) 
  // },[seachValue])

  useEffect(() => {
    Store.subscribe(() => {
      console.log("Subscribed to store",Store.getState().VariableValues.paymentStatus);
      setscreen(Store.getState().VariableValues.paymentStatus);
    });

    return () => {
      console.log("destory")
      let paymentStatus = updatePaymentStatus({ status: "", reference_num: 0 });
      Store.dispatch(paymentStatus)
    };

    // setscreen(Store.getState().VariableValues.paymentStatus);
    console.log("calling store", screen);
  }, []);

  useEffect(() => {
    Store.subscribe(() => {
      setAgent(Store.getState().CheckUserStatus.user.selectedAgent);
    });
    console.log("Store", Store.getState().CheckUserStatus.user.selectedAgent);
    var parameter = "";
    pageNumber = 0;
    fetchData(parameter);
  }, [agent]);

  const footerProps = {
    locationProps: props.history,
  };

  const fetchData = async (param, ...isFilter) => {
    console.log(isFilter[0]);
    const key = props.match.params.status;
    setRequestStatus(key);
    getTitle(key);
    if (!param) {
      param =
        key == "ALL"
          ? `sortOrder=${sortOrderDate}&sortCol=1&pgSize=10&pgNo=0&locale=en`
          : `statusCode=${key}&sortOrder=${sortOrderDate}&sortCol=1&pgSize=10&pgNo=0&locale=en`;
    }

    let appUrl = `${EndPointURL.bookingDetails}&${param}`;

    var response = await httpGetCallWithoutHeader(appUrl);
    console.log("BookingDetails fetchdata", response)
    if (await response.success) {
      isFilter[0]
        ? setResult([...response.data.elements])
        : setResult([...result, ...response.data.elements]);
      console.log(response.data.elements);
      setDisableInfiniteScroll(response.data.elements.length < 10);
    }
  };

  async function searchNext($event: CustomEvent<void>) {
    pageNumber = pageNumber + 1;
    const key = props.match.params.status;
    var param = `sortOrder=${sortOrderDate}&sortCol=1&pgSize=10&pgNo=${pageNumber}&locale=en`;
    await fetchData(param);
    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }

  const goBack = () => {
    props.history.push("/tabs/status");
  };

  const onStatusChange = async (status) => {
    let param = `status=${status}&pgSize=10&pgNo=0&locale=en`;
    await fetchData(param, true);
  };

  // const onSearchBooking = async (bookingNumber) => {
  //   if (seachValue !== "") {
  //     let param = `bookingNumber=${bookingNumber}&pgSize=10&pgNo=0&locale=en`;
  //     await fetchData(param, true);
  //   }
  // };

  const onSearchBooking = async (bookingNumber) => {
    // if (bookingNumber !== "") {
      let param = `bookingNumber=${bookingNumber}&pgSize=10&pgNo=0&locale=en`;
      await fetchData(param, true);
    // }else{
    //   setResult([])
    // }
  };

  const onSort = async (column) => {
    let sortOrder;
    if (column == 1) {
      sortOrder = sortOrderDate == "ASC" ? "DESC" : "ASC";
      setSortOrderDate(sortOrder);
    } else {
      sortOrder = sortOrderAmount == "ASC" ? "DESC" : "ASC";
      setSortOrderAmount(sortOrder);
    }

    let param = `sortOrder=${sortOrder}&sortCol=${column}&pgSize=10&pgNo=0&locale=en`;
    await fetchData(param, true);
  };

  const onDateSearch = async (fromDate, toDate) => {
    if (fromDate && toDate) {
      let param = `fromDate=${fromDate}&toDate=${toDate}&pgSize=10&pgNo=0&locale=en`;
      await fetchData(param, true);
    }
  };

  const topMenuItems = [
    {
      name: "",
      src: "filter",
      slot: "",
      type: "button",
      clickedOnTopMenu: () => {
        setShowModal(true);
      },
    },
    {
      name: "Booked Status",
      icon: chevronDownOutline,
      slot: "end",
      type: "dropDown",
      list: [
        { label: "Pending Payment", value: "PPAY" },
        { label: "Failed Payment", value: "FPAY" },
        { label: "Transporter Pending", value: "SUCC" },
        { label: "Transporter Confirmed", value: "TRANSCONF" },
        { label: "MT IN Delivered", value: "FPAY" },
      ],
      clickedOnTopMenu: (e) => {
        console.log("clicked2", e);
        onStatusChange(e.value);
      },
    },
    {
      name: "Booked on",
      slot: "start",
      src: "filter-down-arrow",
      rotate: sortOrderDate == "ASC" ? "rotate(180deg)" : "",
      size: "0.7rem",
      type: "button",
      clickedOnTopMenu: () => onSort(1),
    },
    {
      name: "Amount",
      slot: "start",
      src: "filter-down-arrow",
      rotate: sortOrderAmount == "ASC" ? "rotate(180deg)" : "",
      size: "0.7rem",
      type: "button",
      clickedOnTopMenu: () => onSort(5),
    },
  ];

  // function SearchBooking() {
  //   console.log("searchBooking")
  //   return (
  //     <div>
  //       <IonToolbar className="border-bottom-booking">
  //         <IonInput
  //           placeholder={"Search with Booking Number"}
  //           type="search"
  //           value={seachValue}
  //           className="input-box"
  //           // onIonBlur={() => onSearchBooking(seachValue)}
  //           onIonChange={(e) => setSearchValue(e.detail.value!)}
  //         ></IonInput>
  //         {
  //         seachValue == "" ? (
  //           <IonButtons slot="end" className="search-icon ">
  //             <IonIcon slot="icon-only" icon={search} />
  //           </IonButtons>
  //         ) : (
  //           <IonButtons slot="end">
  //             <IonLabel
  //               className="search-clear"
  //               onClick={() => {
  //                 setSearchValue("");
  //                 fetchData("");
  //               }}
  //             >
  //               Clear
  //             </IonLabel>
  //           </IonButtons>
  //         )}
  //       </IonToolbar>
  //     </div>
  //   );
  // }

  return (
    <IonPage id="booking-page">
      <Header
        label={title}
        action="search"
        customBack={true}
        backClick={goBack}
        showAgent={true}
        agentHeader={true}
        searchClick={() => {
          isSearchClick(!searchClick);
        }}
      />
      
      <IonContent
        fullscreen
        padding-top
        scrollEvents={true}
        hidden={paymentPage !== ""}
        className="page-content"
      >
        { 
        screen.status === "" && (
          <>
        <SlideUpModal
          showModal={showModal}
          openOrCloseModal={(status) => setShowModal(status)}
          content={
            <SearchBoeByDate
              openOrCloseModalInsearch={(modalStatus, fromDate, toDate) => {
                setShowModal(modalStatus);
                onDateSearch(fromDate, toDate);
              }}
              headerName="Booked On Date Filter"
            />
          }
        />
        <IonRow className="horizontal-scroll">
        
          {
          searchClick ? (
            // <SearchBooking />
            <SearchBooking 
        onSearchBooking={onSearchBooking}/>
          ) : (
            <TopMenu topMenuProps={topMenuItems} />
          )
          }
        </IonRow>
        <div className="decl-count"> Displaying {result.length} bookings</div>
        <IonGrid margin-top>
          {result.map((item, id) => (
            <BookingCard
              status={requestStatus}
              key={id}
              town={item?.containersToTown}
              yard={item?.containersInYard}
              delivered={item?.containersDelivered}
              completed={item?.containersCompleted}
              bookingNumber={item?.bookingNumber}
              amount={item?.totalAmount ?? "0 AED"}
              bookedOn={item?.bookedOn}
              noOfContainers={item?.noOfContainers}
              // countTitle={title}
              paymentStatus={item?.statusCode}
              noOfTrucks={item.noOfTrucks}
              clickCard={() => onCardClick(item)}
              paymentClick={(e) => {
                setPaymentPage(e);
                setReferenceNumber(item?.bookingNumber);
              }}
            />
          ))}
        </IonGrid>
        <IonInfiniteScroll
          threshold="100px"
          disabled={disableInfiniteScroll}
          onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}
        >
          <IonInfiniteScrollContent loadingText="Loading more..."></IonInfiniteScrollContent>
        </IonInfiniteScroll>
        
        </>
        )}
         {screen.status === "SUCC" && <Success txnId={screen.reference_num} />}
    {screen.status === "FAIL" && <Fail txnId={screen.reference_num} />}
    {screen.status === "PEND" && <Pending txnId={screen.reference_num} />}
     </IonContent>
     

       {/* {screen.status === "SUCC" && <Success txnId={screen.reference_num} />}
    {screen.status === "FAIL" && <Fail txnId={screen.reference_num} />}
    {screen.status === "PEND" && <Pending txnId={screen.reference_num} />} */}

      {/* <IonContent  fullscreen hidden={paymentPage == ""}>
          <div hidden={paymentPage !== "success"}>
            <PaymentSuccess 
            referenceNumber={referenceNumber}
            locationProps={props.history}/>
          </div>
          <div hidden={paymentPage !== "fail"}>
            <PaymentFailed 
            referenceNumber={referenceNumber}
            locationProps={props.history}/>
          </div>
          <div hidden={paymentPage !== "pending"}>
            <PaymentPending
              hidden={true}
              referenceNumber={referenceNumber}
              locationProps={props.history}
            />
          </div>
          </IonContent> */}
      <IonContent style={{ maxHeight: "86px" }}>
        <MainTabs tab="status" />
      </IonContent>
    </IonPage>
  );
}
