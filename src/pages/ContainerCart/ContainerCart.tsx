import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Store from "../../redux/Store";
import * as reduxActions from "../../redux/actionTypes/AllActionTypes";
import ContainerCard from "../../components/ContainerCard";
import "./ContainerCart.scss";
import { IonContent, IonItem, IonLabel, IonPage } from "@ionic/react";
import Header from "../../components/Header";
import InformationText from "../../components/Texts/InformationText";
import BlueFooter from "../../components/Footer/BlueFooter";
import SlideUpModal from "../../components/PopUp/SlideUpModal";
import DeclarationDetails from "./DeclarationDetails";
import { useHistory } from "react-router-dom";
import SortedContainerList from "../../components/SortedContainerList/SortedContainerList";
import CartNumber from "../../components/CartNumber";
import Alert from "../../components/alert/Alert";

interface ownProps {
  declaList;
  numberOfSelectedContainers;
  addContainerListToBook;
  updateContainersInCart;
}

interface stateProps {}
type containerCartProps = ownProps & stateProps;
const ContainerCart: React.FC<containerCartProps> = (
  props,
  { declaList, dataForBookTruck }
) => {
  console.log(props.declaList);
  var dataForBookTruck: any = [];
  var isdiff = "test";
  let history = useHistory();
  const [showModal, setshowModal] = useState(false);
  const [selectedIndexNumber, setselectedIndexNumber] = useState<any>({});
  const [alertPopup, setAlertPopup] = useState(false);

  const alertProps = {
    isShow: alertPopup,
    message: "",
    content: " Are you sure to remove the container?",
    icon: "<img src='/assets/icon/are-you-sure.svg'/>",
    alertAction: removeSelectedConainer,

    itemName: "",
    // cancelPolicy: true
    okButtonName: "Continue",
    cancelButtonName: "Cancel",
  };

  function openDeclaDetails(modalState, declIndex?, contaIndex?, item?) {
    console.log(item);
    setselectedIndexNumber({
      declIndex: declIndex,
      contaIndex: contaIndex,
      item,
    });
    setshowModal(modalState);
  }

  function goToBookTruck() {
    props.declaList.map((item, index) => {
      item.containerList.map((container) => {
        if (container.selected) {
          dataForBookTruck.push(container);
          //setShowPopover({ showPopover: true, event: "" });
        }
      });
    });

    if (dataForBookTruck.length > 0) {
      props.addContainerListToBook(dataForBookTruck);
      history.push("/bookTruckTab");
    }
  }

  function removeSelectedConainer(ite, actionType) {
    console.log(actionType);
    setAlertPopup(false);

    if (actionType) {
      var declarationList = props.declaList;
      console.log(declarationList, selectedIndexNumber);
      declarationList[selectedIndexNumber.declIndex].selected = false;
      declarationList[selectedIndexNumber.declIndex].selectedNumber =
        declarationList[selectedIndexNumber.declIndex].selectedNumber - 1;
      declarationList[selectedIndexNumber.declIndex].containerList[
        selectedIndexNumber.contaIndex
      ].selected = false;

      props.updateContainersInCart(
        declarationList[selectedIndexNumber.declIndex].containerList[
          selectedIndexNumber.contaIndex
        ]
      );
    } else {
    }
  }
  return (
    <IonPage>
      <Header
        label="Containers"
        action="home"
        locationProps={props}
        agentHeader={true}
        // searchClick={this.onSearchClick}`Share ${speaker.name}`
      />
      <IonContent>
        <Alert alertProps={alertProps} />
        <SlideUpModal
          showModal={showModal}
          openOrCloseModal={(modalState) => setshowModal(modalState)}
          content={
            <DeclarationDetails
              item={selectedIndexNumber.item}
              click={() => {
                setshowModal(false);
                setAlertPopup(true);
              }}
            />
          }
        />
        <div className="info-text">
          <InformationText
            message={`${props.numberOfSelectedContainers.cartNumber} containers`}
          />
        </div>
        <div className="container-list">
          {props.declaList?.map((decla, declIndex) =>
            decla?.containerList.map((item, contaIndex) => {
              return (
                <div key={contaIndex}>
                  {item.selected && (
                    <>
                      <SortedContainerList
                        isDiff={isdiff === decla.referenceNumber ? true : false}
                        item={item}
                        content={
                          <ContainerCard
                            containerItem={item}
                            key={contaIndex}
                            containerClick={() =>
                              openDeclaDetails(
                                true,
                                declIndex,
                                contaIndex,
                                item
                              )
                            }
                          />
                        }
                      />
                      <div hidden={true}>
                        {(isdiff = decla.referenceNumber)}
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
        <div hidden={true}>
          <CartNumber />
        </div>
      </IonContent>
      <BlueFooter onBlueFooterClick={goToBookTruck} footerLabel="Book Truck" />
    </IonPage>
  );
};
const mapStateToProps = (state: any) => {
  return {
    declaList: state.Cart,
    numberOfSelectedContainers: state.VariableValues,
  };
};

const mapDispatchToProps = () => {
  return {
    updateContainersInCart: (item: any) => {
      Store.dispatch({
        type: reduxActions.UPDATE_CONTAINER_IN_CART,
        payLoad: item,
      });
    },

    addContainerListToBook: (item: any) => {
      Store.dispatch({
        type: reduxActions.BOOK_TRUCK_SINGLE_LOCATION,
        payLoad: item,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContainerCart);
