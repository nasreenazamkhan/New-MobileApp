import {
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonInput,
  IonText,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { setSearchText } from "../../../data/sessions/sessions.actions";
import { TextInputType } from "../../../util/DataTypes";
import { getPatternValue, isValid } from "../../../util/Utilities";

interface SearchCompoProps {
  clearText?: () => void;
  setSegment?: (name) => void;
  selectedSegment?: any;
  searchForResult?: (text, segment?) => void;
  label?: string;
  name: any;
  type: any;
  value?: any;
  onChange?: any;
  required?: any;
  errors?: any;
  pattern?: any;
  datatype?: TextInputType;
  description?: string;
  placeholder: string;
  icon?: any;
  onBlur?: any;
  readonly?: any;
  contactForm?: any;
  max?: number;
  setError?: any;
}
const SearchCompo: React.FC<SearchCompoProps> = ({
  clearText,
  setSegment,
  selectedSegment,
  searchForResult,
  label,
  name,
  type,
  value,
  onChange,
  required,
  errors,
  pattern,
  datatype,
  description,
  placeholder,
  icon,
  onBlur,
  readonly,
  contactForm,
  max,
  setError,
}) => {
  let history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [validation, setvalidation] = useState(false);

  const checkKey = (e) => {
    if (e.key.length > 1) return true;
    setvalidation(!isValid(datatype, e.key));
    if (!isValid(datatype, e.key)) {
      e.preventDefault();
      return false;
    }
  };
  const onInpChange = (e) => {
    let val = e.target.value;

    if (e.target.pattern && selectedSegment === "declaration") {
      console.log(888888);
      val = getPatternValue(val, e.target.pattern, "-");
    }
    setSearchText(val);
    //if (!readonly) onChange(e, val, validate);
  };

  return (
    <div>
      <IonRow className="search-bar-row">
        <IonCol
          size="1"
          className="back-button"
          onClick={() => {
            console.log("eee");
            //backInSearchClick(false);
            history.goBack();
          }}
        >
          <IonButton fill="clear">
            <IonIcon src={arrowBackOutline} className="back-arrow" />
            {/* <IonBackButton defaultHref="/decl" /> */}
          </IonButton>
        </IonCol>
        <IonCol>
          {/* <IonSearchbar
            className="search"
            placeholder={`search with ${selectedSegment} number`}
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            //cancelButtonText="Clear"
            cancelButtonText="Custom Cancel"
            onBlur={() => searchForResult(searchText, selectedSegment)}
          ></IonSearchbar> */}
          <IonInput
            name={name}
            type={type}
            value={searchText}
            spellCheck={false}
            autocapitalize="off"
            //readonly={readonly}
            onKeyDown={checkKey}
            onIonChange={onInpChange}
            clearInput={true}
            required={required}
            autocomplete="off"
            pattern={pattern}
            placeholder={`search with ${selectedSegment} number`}
            className="textInput search"
            onIonBlur={() => searchForResult(searchText, selectedSegment)}
            maxlength={max}
            minlength={max}
            readonly={readonly ? readonly : false}
          >
            {/* {icon && (
            <Icon iconProps={icon} />
            // <IonIcon slot="primary" icon={pulseOutline} />
          )} */}
          </IonInput>
          {validation && description && (
            <IonText color="danger" className="validation-message">
              <IonLabel className="ion-padding-start validation-message">
                {description}
              </IonLabel>
            </IonText>
          )}
        </IonCol>
        <IonCol
          size="1.5"
          className="clear-text"
          onClick={() => {
            clearText();
            setSearchText("");
          }}
        >
          Clear
        </IonCol>
      </IonRow>
      <IonRow className="search-crite">
        <IonCol size="2">
          <IonLabel className="crite-label">Select a Criteria</IonLabel>
        </IonCol>
        <IonCol>
          <IonSegment
            onIonChange={(e) => {
              setSegment(e.detail.value);
              //searchForResult(searchText, e.detail.value);
              setSearchText("");
            }}
            value={selectedSegment}
          >
            <IonSegmentButton value="declaration">
              <IonLabel>Declaration number</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="container" className="second-segment">
              <IonLabel>Container number</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonCol>
      </IonRow>
    </div>
  );
};
export default SearchCompo;
