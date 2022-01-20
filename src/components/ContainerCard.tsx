import { IonCard, IonCardContent, IonLabel } from "@ionic/react";
import React from "react";
import Icon from "./Icon";
import "./ContainerCard.scss";
interface stateProps {
  containerItem;
  containerClick?: (item, index) => void;
  index?;
}
interface ownProps {}
type containerCardProps = stateProps & ownProps;

const ContainerCard: React.FC<containerCardProps> = ({
  containerItem,
  containerClick,
  index,
}) => {
  var contanerIconProps = {
    name: "container",
    slot: "",
    class: "zoom12",
    styleProps: { zoom: 2.8 },
  };

  var locationIcon = {
    name: "locationblue-icon",
    slot: "",
    class: "zoom12",
    zoom: 1.8,
  };
  return (
    <IonCard
      className={
        containerItem.selected
          ? "outer-card boxShadow "
          : "outer-card lightShadow"
      }
      onClick={() => containerClick(containerItem, index)}
    >
      <IonCardContent>
        <div className="container-card">
          <div className="twoItems borderBottom">
            <div className="eachItemLeft">
              <div className="container-icon">
                <Icon iconProps={contanerIconProps} />
              </div>
              <div className="decl-info">
                <span className="decl-number">
                  <div className="container-num">
                    {containerItem.container_number}
                  </div>
                </span>
              </div>
              <div className="decl-info">
                <span className="decl-number">
                  <div className="container-num">{containerItem.weight}</div>
                </span>
              </div>
              <div className="location-info">
                <div className="location-icon">
                  <span className="decl-number">
                    <Icon iconProps={locationIcon} />
                  </span>
                </div>
                {/* </div>
              <div className="decl-info"> */}
                <div className="decl-info">
                  <span className="location-label">
                    <div className="container-num">
                      {containerItem.pickupLocation}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="twoItems marginTop">
            <div className="eachItemLeft">
              <div className="decl-info">
                <span className="decl-number">
                  {" "}
                  <IonLabel class="gray-text">Container weight</IonLabel>
                </span>
                <span className="decl-comments">
                  {containerItem.consigneeCode}
                  {/* {item.consigneeDetails} */}
                </span>
              </div>
              <div className="decl-info">
                <span className="decl-number">
                  {" "}
                  <IonLabel class="gray-text">Storage Validity</IonLabel>
                </span>
                <span className="decl-comments">
                  {containerItem.orderValidity}
                  {/* {item.consigneeDetails} */}
                </span>
              </div>
              <div className="decl-info">
                <span className="decl-number">
                  {" "}
                  <IonLabel class="gray-text">Hold Authority</IonLabel>
                </span>
                <span className="decl-comments">
                  {containerItem.consigneeDetails}
                  {/* {item.consigneeDetails} */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};
export default ContainerCard;
