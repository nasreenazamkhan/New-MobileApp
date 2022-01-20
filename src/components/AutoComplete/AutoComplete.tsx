import { IonAlert, IonContent, IonIcon, IonInput, IonItem, IonList, IonPopover, IonSelect, IonSelectOption, IonText } from "@ionic/react";
import { Autocomplete } from "@react-google-maps/api";
import { compassSharp } from "ionicons/icons";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import VariableValues from "../../redux/reducers/VariableValues";
import { fetchContainers, fetchDeclarations } from "../../services/EndPointApi";
import TxtInput from "../txtinput/TxtInput";
import './AutoComplete.scss';

interface AutoCompleteProps {
  value?: any;
  name: string;
  errors: any;
  icon: any;
  onOptionClick: (name: string, valx: string) => any;
  onSuggestionChange: (e: any, value: any) => any;
  onBlur?: any;
  label: string;
  suggestions: any;
  pattern?: string,
  clearInput : any;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  value,
  name,
  errors,
  icon,
  onOptionClick,
  onBlur,
  onSuggestionChange,
  label,
  suggestions,
  pattern,
  clearInput
}) => {

  // const AutoComplete: React.FC<AutoCompleteProps> = forwardRef(
  //   ({
  //     value,
  //     name,
  //     errors,
  //     icon,
  //     onOptionClick,
  //     onBlur,
  //     onSuggestionChange,
  //     label,
  //     suggestions,
  //     pattern,
  //   }, ref) => {
 
  // useImperativeHandle<any,any>(ref, () => ({

  //   clear(){
  //     console.log("useImperativeHandle clearicon click",name);
  //     setInput("")
  //     setShowSuggestions(false);
  //     setFilteredSuggestions([])
  //   }

  // }));


  const clearIcon = {
    name: "close-outline",
    slot: "end",
    class: "slotEnd",
    iconClick: () => {
      clearInput(name);
    },
  };

  const clear = () => {
    clearInput(name);
  }


  const deleteIcon = {
    name: "close-circle-outline",
    slot: "end",
    class: "slotEnd",
    iconClick: () => {

    }
  };

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // const [input, setInput] = useState(value);
  const [input, setInput] = useState(null);
  const [isSuggestionClicked, setISuggestionClicked] = useState(false);
  const [autocompleteIcon, setIcon] = useState(null);
  const [errorMessage, setErrorMessage] = useState(errors);



  useEffect(() => {
    setErrorMessage(errors)
  }, [errors])

  useEffect(() => {
    if(value){
      setIcon(clearIcon)
    }else{
      setIcon(icon)
    }
  }, [icon])

  useEffect(() => {
    console.log('autocomplete useEffect suggestions', suggestions)
    if (suggestions && suggestions.length > 0) {
      let unLinked = [];
      if (suggestions.length == 1 && suggestions[0] == input) {
        console.log("copy paste")
        unLinked = [suggestions[0]];
        setISuggestionClicked(true)
        setIcon(icon)
        setFilteredSuggestions([])
        setShowSuggestions(false)
        onOptionClick(name, suggestions[0])
      } else if (suggestions) {
        unLinked = suggestions.filter(
          (suggestion) =>
            suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
        );
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
        setIcon(clearIcon)
      }
    } else {
      setFilteredSuggestions([])
      // setShowSuggestions(false)
    }
  }, [suggestions])

   useEffect(() => {
    console.log("autocomplete useEffect value changed", value)
    setInput(value)
  }, [value])

  useEffect(() => {
    console.log("autocomplete useEfect input changed", input)
    setISuggestionClicked(false)
    if (!input || input.length == 0) {
      setFilteredSuggestions([])
      setShowSuggestions(false);
      setIcon(icon)
    }
  }, [input])


  useEffect(()=> {
      if(isSuggestionClicked){

      }
  },[isSuggestionClicked])


  const onChange = async (e: any, value: any) => {
    setIcon(clearIcon)
    onSuggestionChange(e, value)
  };


  const onSuggestionClick = (suggestion) => {
    setISuggestionClicked(true);
    setShowSuggestions(false);
    onOptionClick(name, suggestion)
    setIcon(icon)
  };

  return (
    <div className="parent-postion">
      <TxtInput
        name={name}
        value={value}
        label={label}
        errors={errorMessage}
        type="text"
        required={true}
        onChange={onChange}
        datatype="TEXT"
        placeholder={label}
        icon={autocompleteIcon}
        onBlur={(e) => {
          console.log("Autocomplete OnBlur")
        }}
        pattern={pattern ? pattern : ''}
        description=" Format xxx-yyyyyyyy-zz"
        clearInput={false}
        isClickable={true}
        keyDown={(e) => {
          if (e.keyCode == '9') {
            console.log("is sugg clicked", isSuggestionClicked)
            if (!isSuggestionClicked) {
              clear();
            }
            // setISuggestionClicked(false)
          }
        }
        }
      />

      {
        showSuggestions && (
          // <div>

          <IonList className={`suggestion-list`}>
            {
              filteredSuggestions && filteredSuggestions.map((suggestion, index) => (
                <IonItem className={`suggestion`} onClick={() => onSuggestionClick(suggestion)} key={suggestion + index}>{suggestion}</IonItem>
              ))


            }
            {
              (!filteredSuggestions || filteredSuggestions.length === 0) &&
              <IonItem className={`suggestion`}>{"No Suggestions Found"}</IonItem>
            }
          </IonList>

          // </div>
        )
      }


    </div>
  )
    }
// });

export default AutoComplete