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
    IonSearchbar,
  } from "@ionic/react";
  import { chevronDownOutline, search } from "ionicons/icons";
  import React, { useEffect, useState } from "react";
import "./searchBooking.scss";
import TxtInput from "../../../../components/txtinput/TxtInput";

function SearchBooking(props) {
  const clearIcon = {
    name: "close-outline",
    slot: "end",
    class: "slotEnd",
    iconClick: () => {
      // clearInput(name);
    },
  };

    const [seachValue, setSearchValue] = useState<string>("");
    // const [icon, setIcon] = useState<any>(clearIcon);

    const onSearchBooking = async (bookingNumber) => {
        // if (seachValue !== "") {
            props.onSearchBooking(seachValue)            
        // }
      };

    useEffect(()=>{
        onSearchBooking(seachValue) 
      },[seachValue])

    console.log("searchBooking")
    return (
      <div className="booking-search">
      <IonSearchbar 
        className="searchBar"
         type="search"
        value={seachValue} 
        onIonChange={e => setSearchValue(e.detail.value!)} 
        placeholder={"Search with Booking Number"}
        >
          </IonSearchbar>

          {/* <IonToolbar className="border-booking">
          <IonInput
          
            placeholder={"Search with Booking Number"}
            type="search"
            value={seachValue}
            className="input-search-box"
            // onIonBlur={() => onSearchBooking(seachValue)}
            onIonChange={(e) => setSearchValue(e.detail.value!)}
          ></IonInput>
          {
          seachValue == "" ? (
            // className="search-icon "
            <IonButtons slot="end">
              <IonIcon slot="icon-only" icon={search} />
            </IonButtons>
          ) : (
            <IonButtons slot="end">
              <IonLabel
                // className="search-clear"
                onClick={() => {
                  setSearchValue("");
                //   fetchData("");
                }}
              >
                Clear
              </IonLabel>
            </IonButtons>
          )}
        </IonToolbar> */}
          </div>
    );
  }

  export default SearchBooking;