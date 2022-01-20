import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
  Marker,
  InfoWindow,
  Autocomplete,
  Polygon,
} from "@react-google-maps/api";
import { mapConfig } from "./../util/Config";
import Geocode from "react-geocode";
import "./MapView.scss";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const divStyle = {
  color: "#434343",
  fontFamily: "Dubai",
  fontSize: 14,
  maxWidth: "200px",
};

function MapView(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: mapConfig.apiKey,
    libraries: mapConfig.libraries,
  });
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(mapConfig.JNCenter);
  const [state, setState] = useState({ showingInfoWindow: false });
  const [address, setAddress] = useState(props.address);
  const [searchBox, setSearchBox] = useState();
  const [place, setPlace] = useState();
  const bounds =
    props.mapViewProps.zone === "JAFZAN"
      ? mapConfig.JAFZA_NORTH_BOUNDS
      : props.mapViewProps.zone === "JAFZAS"
      ? mapConfig.JAFZA_SOUTH_BOUNDS
      : mapConfig.DUBAI_LOGISTICS_BOUNDS;

  const paths =
    props.mapViewProps.zone === "JAFZAN"
      ? mapConfig.JAFZA_NORTH_POLYGON
      : props.mapViewProps.zone === "JAFZAS"
      ? mapConfig.JAFZA_SOUTH_POLYGON
      : mapConfig.DUBAI_LOGISTICS_POLYGON;

  useEffect(() => {
    if (props.mapViewProps.latLng) setCenter(props.mapViewProps.latLng);
    else if (props.mapViewProps.zone == "JAFZAS") setCenter(mapConfig.JSCenter);
    else if (props.mapViewProps.zone == "JAFZAN") setCenter(mapConfig.JNCenter);
    else if (props.mapViewProps.zone == "DUBAIS") setCenter(mapConfig.DLCenter);
    else setCenter(mapConfig.DLCenter);
    var str = props.mapViewProps.selectedAdd;
    if(str?.includes(",")) {
      var arr = str?.split(",");
      var fst = arr?.splice(0,1).join("");
      var rest = arr?.join(",");
      setAddress(rest);
      setPlace(fst);
    } else {
      setAddress(str);
      setPlace("");
    }
    
  }, [props.mapViewProps]);

  const handleMapClick = (...args) => {
    if (centerChanged(args[0].latLng)) {
      setCenter({
        lat: args[0].latLng.lat(),
        lng: args[0].latLng.lng(),
      });
      console.log("onClick args: ", args);
      setPlace();
      console.log("mapref", map);
      Geocode.fromLatLng(
        args[0].latLng.lat(),
        args[0].latLng.lng(),
        mapConfig.apiKey
      ).then(
        (response) => {
          console.log("map", response);
          const address = response.results[0].formatted_address;
          console.log("formatted_address :: " + address);
          setAddress(address);
          props.mapViewProps.getAddressFromMap({add: address, loc: response.results[0].geometry.location});
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  const onMarkerClick = (e) => {
    console.log("marker", e);
    setState({
      showingInfoWindow: !state.showingInfoWindow,
    });
  };

  const options = {
    restriction: {
      latLngBounds: bounds,
      strictBounds: false,
    },
    streetViewControl: mapConfig.streetViewControl,
    mapTypeControl: mapConfig.mapTypeControl,
    fullscreenControl: mapConfig.fullscreenControl,
    clickableIcons: mapConfig.clickableIcons,
    zoom: mapConfig.zoomLevel,
  };

  const onLoad = (autocomplete) => {
    console.log("autocomplete: ", autocomplete);
    setSearchBox(autocomplete);
  };

  const onPlaceChanged = () => {
    if (searchBox !== null) {
      console.log("autocomplete", searchBox.getPlace());
      if (centerChanged(searchBox.getPlace().geometry.location)) {
        setCenter({
          lat: searchBox.getPlace().geometry.location.lat(),
          lng: searchBox.getPlace().geometry.location.lng(),
        });
        const address = searchBox.getPlace().formatted_address;
        const place = searchBox.getPlace().name;
        setAddress(address);
        setPlace(place);
        console.log(place + ", " + address);
        props.mapViewProps.getAddressFromMap({add: place + ", " + address, loc: searchBox.getPlace().geometry.location});
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const centerChanged = (latLng) => {
    props.mapViewProps.handleError("");
    const jafza = new window.google.maps.Polygon({
      paths: paths,
    });
    if (window.google.maps.geometry.poly.containsLocation(latLng, jafza))
      return true;
    else {
      setAddress("");
      setPlace("");
      props.mapViewProps.getAddressFromMap("");
      props.mapViewProps.handleError("Location is outside of selected zone");
    }
  };

  return isLoaded ? (
    <GoogleMap
      id="map-view"
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onClick={
        !props.mapViewProps.isContainerEdit ? handleMapClick: {}
      }
      ref={(ref) => {
        setMap(ref);
      }}
      options={options}
      onBoundsChanged={(e) => console.log("bounds", e)}
    >
      <Marker position={center} onClick={onMarkerClick}>
        {state.showingInfoWindow && (
          <InfoWindow position={center} onCloseClick={onMarkerClick}>
            <div style={divStyle}>
              <div style={{ textAlign: "center" }}>
                <b>
                  <u>{place}</u>
                </b>
              </div>
              <div style={{ textAlign: "center" }}>
                {address
                  ? address
                  : props.mapViewProps.zone === "JAFZAN"
                  ? "JAFZA North Area"
                  : props.mapViewProps.zone === "JAFZAS"
                  ? "JAFZA South Area"
                  : "Dubai Logistics City"}
              </div>
            </div>
          </InfoWindow>
        )}
      </Marker>
      {!props.mapViewProps.isContainerEdit && <div>
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          bounds={bounds}
          restrictions={{ country: "ae" }}
        >
          <input
            type="text"
            className="auto-complete-input"
            placeholder="Search Location Here"
          />
        </Autocomplete>
      </div> }
      <Polygon
        paths={paths}
        options={{
          fillColor: "transparent",
          strokeColor: "rgb(5 33 95)",
          strokeOpacity: 1,
          strokeWeight: 1,
          clickable: false,
          draggable: false,
          editable: false,
          geodesic: false,
          zIndex: 1,
        }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapView);
