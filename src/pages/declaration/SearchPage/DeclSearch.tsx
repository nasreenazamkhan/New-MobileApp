import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import {
  arrowBack,
  arrowBackOutline,
  arrowBackSharp,
  arrowUp,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Badge from "../../../components/Badge/Badge";
import ContainerCard from "../../../components/ContainerCard";
import Footer from "../../../components/Footer/Footer";
import Icon from "../../../components/Icon";
import * as reduxActions from "../../../redux/actionTypes/AllActionTypes";
import Store from "../../../redux/Store";
import * as EndPointApi from "../../../services/EndPointApi";
import * as EndPointURL from "../../../util/EndPointURL";
import CenterFooterButton from "../../CenterFooterButton";
import "./DeclSearch.scss";
import SearchCompo from "./SearchCompo";

interface DeclSearchProps {
  onclickEvent?: (openStatus) => void;
  allStoreDeclarations: any;
  updateBoesInCart;
  location;
  updateContainersInCart;
}
const DeclSearch: React.FC<DeclSearchProps> = (
  props,
  {
    onclickEvent,
    allStoreDeclarations,
    updateBoesInCart,
    updateContainersInCart,
  }
) => {
  var count = 0;
  var allDecl = props.allStoreDeclarations;
  console.log(allDecl);
  const [selectedSegment, setselectedSegment] = useState(props.location.state);
  const [apiResult, setapiResult] = useState<any>([]);
  // var text={`Please search to get the ${selectedSegment} number results`}
  //var t = {`search with ${selectedSegment} number`}
  const [warningMessage, setwarningMessage] = useState("");

  let history = useHistory();
  const contanerIconProps = {
    name: "container",
    slot: "",
    class: "zoom12",
    styleProps: { zoom: 2.8 },
  };

  async function searchForResult(searchText, segment?) {
    var response;
    setapiResult([]);
    var param;
    if (segment === "declaration") {
      param =
        "pgSize=10&pgNo=0&option=ALL&locale=en&bookingNumber=" + searchText;
    } else {
      param =
        "pgSize=10&pgNo=0&option=ALL&locale=en&containerNumber=" + searchText;
    }
    if (searchText) {
      response = await EndPointApi.fetchAllDeclaration(
        EndPointURL.declarationUrl + param
      );
      console.log(response);

      if (!response?.success) {
        console.log(response, response?.data?.elements?.length);
        setwarningMessage(response?.data?.message);
      }
      if (response?.data?.elements?.length > 0) {
        console.log(response);
        setwarningMessage("");
        setapiResult(response?.data?.elements);
      } else {
        setwarningMessage("No Result found, search with another number");
      }
    }
  }

  function cardClicked(item) {
    allDecl.forEach((element, index) => {
      if (item.referenceNumber === element.referenceNumber) {
        allDecl[index].currentSelection = true;
        allDecl[index].containerList.index = index;
        element.containerList.forEach((container) => {
          //container.
        });
        props.updateBoesInCart(allDecl);
        history.push("/container", allStoreDeclarations);
      }
    });
  }

  function updateContainerInCart(item) {
    console.log(item);
    item.selected = true;
    // allDecl[index].selectedNumber = containerList[index]
    //       .selectedNumber
    //       ? containerList[index].selectedNumber
    //       : 0;
    //     containerList[index].selectedNumber =
    //       containerList[index].selectedNumber + 1;

    allDecl.map((element, index) => {
      if (element.referenceNumber === item.boeNumber) {
        allDecl[index].selectedNumber = allDecl[index].selectedNumber
          ? allDecl[index].selectedNumber
          : 0;
        allDecl[index].selectedNumber = allDecl[index].selectedNumber + 1;
        count = item.selectedNumber;
      }
    });
    props.updateContainersInCart(item);
    history.push("/containerCart");
  }

  return (
    <IonPage>
      <IonHeader>
        <SearchCompo
          setSegment={(val) => {
            setselectedSegment(val);
            searchForResult("");
          }}
          selectedSegment={selectedSegment}
          searchForResult={searchForResult}
          clearText={() => setwarningMessage("")}
          name={"declNumber"}
          value={"form.declNumber"}
          label="Declaration Number"
          errors={"errors.declNumber"}
          type="text"
          required={true}
          onChange={(val) => {
            setselectedSegment(val);
            searchForResult("");
          }}
          datatype="TEXT"
          placeholder=""
          //icon={icon.declNumber}
          //onBlur={onBlur}
          pattern="###-########-###"
          description=" Format xxx-yyyyyyyy-zz"
        />
      </IonHeader>
      <IonContent className="search-lense1">
        {(apiResult.length === 0 || warningMessage !== "") && (
          <IonRow className="search-lense">
            <IonCol className="search-body-text">
              {warningMessage && (
                <div className="warning-message">{warningMessage}</div>
              )}
              {warningMessage === "" && (
                <IonLabel>
                  {" "}
                  Please search to get the {selectedSegment} number results
                </IonLabel>
              )}
            </IonCol>
          </IonRow>
        )}
        {apiResult.map((element, index) => (
          <>
            {selectedSegment === "container" ? (
              <div className="container-list">
                {element?.containerList?.map((item, index) => {
                  return (
                    <ContainerCard
                      containerItem={item}
                      key={index}
                      containerClick={() => updateContainerInCart(item)}
                      // index={currentDecl?.containerList.index}
                    />
                  );
                })}
              </div>
            ) : (
              <IonCard
                key={index}
                className={
                  element.selected
                    ? "outer-card boxShadow "
                    : "outer-card lightShadow"
                }
                onClick={() => cardClicked(element)}
              >
                {" "}
                <IonCardContent>
                  <div className="container-card">
                    {/* <div className="list-logo">
                              <RoundedAvatar
                                color={color}
                                name={item.comments}
                              />
                            </div> */}
                    <div className="twoItems borderBottom">
                      <div className="eachItemLeft">
                        <div className="decl-info">
                          <span className="decl-number">
                            <IonLabel class="gray-text">Declaration#</IonLabel>
                          </span>
                          <span className="decl-comments">
                            {element.referenceNumber}
                          </span>
                        </div>
                      </div>
                      <div className="middle-item">
                        <div className="dov">
                          <span className="">
                            {/* <Icon
                                        iconProps={this.contanerIconProps}
                                      /> */}
                          </span>
                        </div>
                      </div>
                      <div className="eachItemRight">
                        <div className="dov">
                          <span className="dov-text">
                            <IonLabel class="gray-text">
                              Deliver Order validity
                            </IonLabel>
                          </span>
                          <span className="dov-number">
                            {element.deliveryOrderValidity}
                          </span>
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                    <div className="twoItems">
                      <div className="eachItemLeft">
                        <div className="decl-info">
                          <span className="decl-number">
                            {" "}
                            <IonLabel class="gray-text">Consignee</IonLabel>
                          </span>
                          <span className="decl-comments">
                            {element.consigneeDetails}
                            {/* {item.consigneeDetails} */}
                          </span>
                        </div>
                      </div>
                      <div className="middle-item">
                        <div className="dov">
                          <span className="">
                            <Icon iconProps={contanerIconProps} />
                          </span>
                        </div>
                      </div>
                      <div className="eachItemRight">
                        <div className="secondRow">
                          <div className="dov">
                            <span className="dov-number">
                              {element.containerList.length} Nos.
                            </span>
                            {element.selectedNumber > 0 && (
                              <span className="dov-selected-number">
                                {element.selectedNumber} selected.
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="secondRow">
                          <div className="badgeItem">
                            <div className="dov">
                              <span className="">
                                <Badge status={element.status} />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            )}
          </>
        ))}
        {apiResult.length > 0 && (
          <CenterFooterButton
            iconType="cart"
            //clickEvent={goToContainerCart}
          />
        )}
      </IonContent>
      {apiResult.length > 0 && <Footer />}
      {/* </IonModal> */}
    </IonPage>
  );
};

const mapStateToProps = (state: any) => {
  console.log("chnageddddd======");
  return {
    allStoreDeclarations: state.Cart,
    cartNumber: state.VariableValues,
    agent: state.CheckUserStatus.user.selectedAgent,
  };
};

const mapDispatchToProps = () => {
  return {
    addDeclarationToCart: (item: any) => {
      Store.dispatch({
        type: reduxActions.ADD_TO_CART,
        payLoad: item,
      });
    },
    updateContainersInCart: (item: any) => {
      console.log(item);
      Store.dispatch({
        type: reduxActions.UPDATE_CONTAINER_IN_CART,
        payLoad: item,
      });
    },
    removeAllContainersInCart: () => {
      Store.dispatch({ type: reduxActions.CLEAR_CART });
    },
    updateBoesInCart: (item) => {
      console.log(item);
      Store.dispatch({
        type: reduxActions.UPDATE_BOE_IN_CART,
        payLoad: item,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DeclSearch);
