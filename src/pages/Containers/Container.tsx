import {
  IonCard,
  IonCardContent,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ContainerCard from "../../components/ContainerCard";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import Icon from "../../components/Icon";
//import TopMenu from "../../components/TopMenu";
import TopMenu from "../../components/topMenu/TopMenu";
import Store from "../../redux/Store";
import CenterFooterButton from "../CenterFooterButton";
import "./Container.scss";
import * as reduxActions from "../../redux/actionTypes/AllActionTypes";
import { useHistory } from "react-router-dom";
import InformationText from "../../components/Texts/InformationText";
import { chevronDownOutline } from "ionicons/icons";

interface stateProps {
  props;
}

interface ownProps {
  containerList;
  updateContainersInCart: (item) => void;
}
var count = 0;
type containerProps = stateProps & ownProps;
const Container: React.FC<containerProps> = ({
  containerList,
  props,
  updateContainersInCart,
}) => {
  const [currentDecl, setcurrentDecl] = useState<any>();

  const [showChecked, setShowChecked] = useState(false);
  let history = useHistory();

  useEffect(() => {
    containerList.map((item, index) => {
      if (item.currentSelection) {
        setcurrentDecl(item);
      }
    });
  }, []);
  useEffect(() => {}, [containerList]);
  var topMenuItems = [
    {
      name: "",
      src: "filter",
      styleProps: { zoom: 1.3 },
      type: "button",
      slot: "start",
      clickedOnTopMenu: () => console.log("clicked1"),
    },

    {
      name: "Storage Validity",
      src: "filter-down-arrow",
      type: "button",
      slot: "start",
      size: "0.7rem",
      clickedOnTopMenu: () => console.log("clicked4"),
    },
    {
      name: "Pickup Location",
      src: "filter-down-arrow",
      icon: chevronDownOutline,
      slot: "end",
      type: "dropDown",
      list: [
        { label: "T1", value: "T1" },
        { label: "T2", value: "T2" },
        { label: "T3", value: "T3" },
        { label: "Jebal Ali Area", value: "JEA" },
      ],
      clickedOnTopMenu: () => console.log("clicked5"),
    },
  ];

  function updateContainerInCart(containerItem, index, checked?) {
    var selectedNumber;
    console.log(containerItem, index, checked);
    if (checked) {
      if (checked === "checked") {
        currentDecl.containerList.forEach((item: any, index: number) => {
          currentDecl.containerList[index].selected = true;
        });
      } else {
        currentDecl.containerList.forEach((item: any, index: number) => {
          currentDecl.containerList[index].selected = false;
        });
      }
    } else {
      containerItem.selected = !containerItem.selected;
      if (containerItem.selected) {
        setShowChecked(true);
        containerList[index].selectedNumber = containerList[index]
          .selectedNumber
          ? containerList[index].selectedNumber
          : 0;
        containerList[index].selectedNumber =
          containerList[index].selectedNumber + 1;
      } else {
        //setShowChecked(false)
        containerList[index].selectedNumber =
          containerList[index].selectedNumber - 1;
        containerList[index].selected = false;
      }
      containerList.map((item, index) => {
        count = item.selectedNumber;
        if (count === 0) setShowChecked(false);
      });
    }
    updateContainersInCart(containerItem);
  }

  function goToContainerCart() {
    history.push("/containerCart");
  }
  const checkedProps: any = {
    showChecked: showChecked,
    addContainerToCart: updateContainerInCart,
  };
  return (
    <IonPage className="container">
      <Header
        label={currentDecl?.containerList[0]?.boeNumber}
        action="search"
        locationProps={props}
        checkedProps={checkedProps}
        //showAgent={true}
        agentHeader={true}
        searchClick={() => history.push("/openSearch", "container")}
      />

      <IonContent className="container-Content">
        <TopMenu topMenuProps={topMenuItems} />
        {currentDecl?.containerList?.length > 0 && (
          <InformationText
            message={`${currentDecl?.containerList?.length} containers`}
          />
        )}
        <div className="container-list">
          {currentDecl?.containerList?.map((item, index) => {
            return (
              <ContainerCard
                containerItem={item}
                key={index}
                containerClick={updateContainerInCart}
                index={currentDecl?.containerList.index}
              />
            );
          })}
        </div>
        <CenterFooterButton iconType="cart" clickEvent={goToContainerCart} />
      </IonContent>
      <Footer />
    </IonPage>
  );
};

const mapStateToProps = (state: any) => {
  return {
    containerList: state.Cart,
  };
};

const mapDispatchToProps = () => {
  return {
    updateContainersInCart: (item: any) => {
      console.log(item);
      Store.dispatch({
        type: reduxActions.UPDATE_CONTAINER_IN_CART,
        payLoad: item,
      });
    },
    addDeclarationToCart: (item: any) => {
      console.log(item);
      Store.dispatch({
        type: reduxActions.ADD_TO_CART,
        payLoad: item,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
