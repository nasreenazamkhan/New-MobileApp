import { IonLabel } from "@ionic/react";
import React from "react";
import InformationText from "../../../components/Texts/InformationText";
import "../ContainerCart.scss";

interface SortedListProps {
  containersNum: any;
  arrayList: any;
  content: any;
}
const SortedList: React.FC<SortedListProps> = ({
  containersNum,
  arrayList,
  content,
}) => {
  var isdiff = "test";
  return (
    <div>
      <InformationText message={`${containersNum} containers`} />
      <div className="container-list">
        {arrayList?.map((decla, index) =>
          decla?.containerList.map((item, index) => {
            console.log(isdiff, decla.referenceNumber);
            return (
              <div key={index}>
                {item.selected && (
                  <div key={index}>
                    {/* {isdiff !== decla.referenceNumber && ( */}
                    <>
                      <div
                        className="decla-info"
                        hidden={isdiff === decla.referenceNumber}
                      >
                        <div className="decla-number">
                          <IonLabel>{decla.referenceNumber}</IonLabel>
                        </div>
                        <div className="do-validity">
                          <IonLabel class="validity-text">
                            DO Validity: {decla.referenceNumber}
                          </IonLabel>
                        </div>
                      </div>
                      <div hidden={true}>
                        {(isdiff = decla.referenceNumber)}
                      </div>
                    </>
                    {/* )} */}

                    {content}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default SortedList;
