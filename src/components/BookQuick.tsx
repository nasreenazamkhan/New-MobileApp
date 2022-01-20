import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonIcon,
  IonLabel,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";

import { useHistory } from "react-router-dom";
import moment from "moment";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import {
  calendarTodayDate,
  createArrayOfObjectWithKeyAndValue,
  createPaymentObject,
  formatDate,
  formatToCalendarDate,
  lastYear,
  minDate,
  minformatDate,
  nextYear,
  todayDate,
} from "../services/Common";
import {
  fetchContainers,
  fetchContainerSummaryPayment,
  fetchDeclarations,
  getAddressApi,
  getContainerTypes,
  getRequestByContainer,
  getRequestByDeclaration,
  getTruckTypeApi,
  reviewSubmit,
} from "../services/EndPointApi";
import { dropIntervals, truckNumber } from "../util/Constants";
import * as utils from "../util/Utilities";
import Calendar from "./calendar/Calendar";
import DrpdownInput from "./dropdownInput/DrpdownInput";
import TxtInput from "./txtinput/TxtInput";
import BorderWithFloatingText from "./InputBorders/BorderWithFloatingText";
import UnderLineOnly from "./InputBorders/UnderLineOnly";
import { add, arrowForwardCircle, arrowForwardOutline } from "ionicons/icons";
import * as reduxActions from "../redux/actions/AllActions";
import Store from "../redux/Store";
import Autocomplete from "./AutoComplete/AutoComplete";
import { connectAdvanced } from "react-redux";
import { fireEvent } from "@testing-library/react";
var containerList = [];
interface bookQuickProps {
  buttonAction: any;
  ref: any;
}

let containerMap = new Map<String,Array<any>>();

var txtInputDeclToAdd = [];
var txtInputContaAdd = [];
var declarationArray = [],
  containerArray = [];
//const PayQuick: React.FC<payQuickProps> = forwardRef(
const BookQuick: React.FC<bookQuickProps> = forwardRef(
  ({ buttonAction }, ref) => {
    let history = useHistory();
    const myref = useRef();

    

    const plusIcon = {
      name: "plusQuick",
      slot: "end",
      class: "slotEnd",
      iconClick: addTextInput,
    };
    const calenderIcon = {
      name: "calendar",
      slot: "start",
      class: "calenderMargin",
    };
    const minusIcon = {
      name: "plus-disabled",
      slot: "end",
      class: "disabledminus",
      //styleProps: { fontSize: "1.6rem", right: "-5px" },
      iconClick: removeTexTInput,
    };

    const plusDisabledIcon = {
      name: "plus-disabled",
      slot: "end",
      class: "disabledminus",
      //styleProps: { fontSize: "1.6rem", right: "-5px" },
      iconClick: ()=>{},
    };
    const blankIcon = {
      name: "",
      slot: "",
      class: "",
      iconClick: () => console.log(),
    };


    const deleteIcon = {
      name: "close-circle-outline",
      slot: "end",
      class: "slotEnd",
      iconClick: (name) => {
        console.log("delete click");
        console.log(name);
        // removeTexTInput(name)
        containerMap.delete(name)
        if(name.includes("declNumber")){
        setDeclarationFields(prevState=>prevState.filter(field=> field['name']!==name))
        }else{
          setContainerFields(prevState=>prevState.filter(field=> field['name']!==name))
        }
      }
    };

    const [txtInputAdd, settxtInputAdd] = useState({
      declNumber: txtInputDeclToAdd,
      containerNumber: txtInputContaAdd,
    });
    const [form, setForm] = useState({
      declNumber: "",
      containerNumber: "",
      truckCount: "",
      dateAndTime: calendarTodayDate,
      minDate: minDate,
      truckType: "",
      droplocation: {
        consigneeContactName: "",
        consigneeContactNumber: "",
        phoneNumber: "",
      },
      contactPerson: "",
      contactNumber: "",
      submitted: false,
      valid: false,
      dropInterval: "",
    });
    var initialIcon = { declNumber: plusIcon, containerNumber: plusIcon };
    const [errors, setErrors] = useState<any>({});
    const [icon, seticon] = useState(initialIcon);

    const [action, setAction] = useState(buttonAction);
    const [timeAddressTruckDataList, settimeAddressTruckDataList] =
      useState<any>({
        address: [],
        listTruck: [],
        disbaleHr: 1,
        dateAndTime: "",
      });

      let defaultDecField = {
        name : "declNumber",
        value : "",
        isParent : true,
        suggestions : [],
        icon : plusIcon,
      }

      let defaultContainerField = {
        name : "containerNumber",
        value : "",
        isParent : true,
        suggestions : [],
        icon : plusIcon,
      }
      

      const [declarationFields, setDeclarationFields] = useState([defaultDecField]);
      const [containerFields, setContainerFields] = useState([defaultContainerField]);

      const [isDeclarationReset,setIsDeclarationReset] = useState(false)
      const [isContainerReset,setIsConainerReset] = useState(false)
      const [suggestions,setSuggestions] = useState([])


    function addTextInput(name, placeholderVal) {
      console.log("addTextInput",name);
      // console.log(name, 12121, placeholderVal);
      var paramToPass = {};
      // if (name === "declNumber") {
      //   txtInputDeclToAdd.push(paramToPass);
      //   setForm((prevState) => ({
      //     ...prevState,
      //     ["declNumber" + txtInputDeclToAdd.length]: "",
      //   }));
      //   seticon({ containerNumber: minusIcon, declNumber: plusIcon });
      // } else {
      //   txtInputContaAdd.push(paramToPass);
      //   setForm((prevState) => ({
      //     ...prevState,
      //     ["containerNumber" + txtInputContaAdd.length]: "",
      //   }));
      //   seticon({ containerNumber: plusIcon, declNumber: minusIcon });
      // }
      // settxtInputAdd({
      //   ...txtInputAdd,
      //   [name]: name === "declNumber" ? txtInputDeclToAdd : txtInputContaAdd,
      // });

      if(name === "declNumber"){
        setDeclarationFields(prevState=>
          [
            ...prevState,
            {
              name: "declNumber" + (new Date().getMilliseconds()),
              value: "",
              isParent: false,
              suggestions : [],
              icon : deleteIcon,
            }
          ]
      )
        console.log(declarationFields)
      }else if(name=="containerNumber"){
        setContainerFields(prevState=>
          [
            ...prevState,
            {
              name: "containerNumber" + (new Date().getMilliseconds()),
              value: "",
              isParent: false,
              suggestions : [],
              icon : deleteIcon,
            }
          ]
      )
      }
    }

    function removeTexTInput(name) {
      settxtInputAdd({
        ...txtInputAdd,
        [name]:
          name === "containerNumber"
            ? txtInputDeclToAdd.splice(0, txtInputDeclToAdd.length)
            : txtInputContaAdd.splice(0, txtInputContaAdd.length),
      });
    }

    useEffect(() => {
      getListAddress();
      getTruck();
    }, []);


    useEffect(() => {
        console.log(form)
    }, [form]);

    useEffect(() => {
      if (buttonAction === "book") {
        //onContinue();
      }
    }, [buttonAction]);

    const getTruck = async () => {
      let res: any = await getContainerTypes();
      {
        if (res?.success) {
          settimeAddressTruckDataList((prevState) => ({
            ...prevState,
            listTruck: res?.data,
          }));
          setTimeout(() => {
            console.log(timeAddressTruckDataList);
          }, 2000);
        } else {
          setErrors({
            ...errors,
            general: res?.data?.message || res?.data?.error,
          });
        }
      }
    };

    const getListAddress = async () => {
      let res: any = await getAddressApi();
      // if (res?.success) {
      var mindateOfDisable = utils.addTimeToDateTime(
        new Date(),
        1 * res?.disableHrs * 60 || 1
      );
      var formattedMindate = mindateOfDisable.toISOString();
      settimeAddressTruckDataList((prevState) => ({
        ...prevState,
        address: res?.addressDtoList,
        disbaleHr: res?.disableHrs,
        dateAndTime: formattedMindate,
      }));
      var newdateTime = moment(new Date(formattedMindate)).format(
        "DD/MM/YYYY H:mm"
      );
      setForm({
        ...form,
        minDate: minformatDate(formattedMindate),
        dateAndTime: newdateTime,
      });
      // }
    };

    var totalTruckNumber = createArrayOfObjectWithKeyAndValue(); //Array.from({ length: truckNumber }, (_, i) => i + 1);

    const handleChange = (e: any, value: any) => {
      console.log(e.target.name)
      console.log(e.target.value)
      console.log(form)
      console.log(form)
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
      setErrors({ ...errors, [e.target.name]: "" });
      if (e.target.name === "declNumber") {
        form.containerNumber = "";
        removeTexTInput("declNumber");
        seticon({ containerNumber: minusIcon, declNumber: plusIcon });
      } else if (e.target.name === "containerNumber") {
        removeTexTInput("containerNumber");
        form.declNumber = "";
        seticon({ declNumber: minusIcon, containerNumber: plusIcon });
      }
      setForm({
        ...form,
        [e.target.name]: value,
      });

      if (e.target.value === "") {
        seticon(initialIcon);
      }
      console.log(form);

      //  }
    };


    const onHandleChange = (e, value) => {
      console.log("BookQuick onHandleChange", value)
      const name = e.target.name;
      console.log("BookQuick onHandleChange", name)
      if (!value) {
        setErrors({ ...errors, [name]: "" });
        updateField(name, "value", "")
        updateField(name, "suggestions", [])
      } else if (value) {
        updateField(name, "value", value)
        if (name.includes('declNumber')) {
          clearContainers(value);
        } else if (name.includes('containerNumber')) {
          clearDeclarations(value);
        }
        
        fetchSuggestions(name, value);
      }
    }

    const updateField = (name, prop, value) => {
      if (name.includes('declNumber')) {
        let index = declarationFields.findIndex(field=> field.name === name);
        let declarationFieldsTemp = [...declarationFields]
        let decField = declarationFieldsTemp[index];
        if(prop=='value'){
            updateIcon(decField)
        }
        decField[prop] = value;
        setDeclarationFields(declarationFieldsTemp)
      } else if (name.includes('containerNumber')) {
        let index = containerFields.findIndex(field=> field.name === name);
        let containerFieldsTemp = [...containerFields]
        let containerField = containerFieldsTemp[index];
        if(prop=='value'){
          updateIcon(containerField)
        }
        containerField[prop] = value
        setContainerFields(containerFieldsTemp)
      }
    }

    const fetchSuggestions = async (name, value) =>{
      if(name.includes("declNumber")){
        let result = await fetchDeclarations(value);
        updateField(name,"suggestions",result.data)
      }else if(name.includes("containerNumber")){
        let result = await fetchContainers(value); 
        updateField(name,"suggestions",result.data)
      }
      
    }

    const updateIcon = (field) => {
        if(field.isParent){
          field['icon'] = plusIcon
        }else{
          field['icon'] = deleteIcon
        }
    }

    const clearInput = (name) =>{
      setErrors({ ...errors, [name]: "" });
      containerMap.delete(name)
      if(name.includes('declNumber')){
        declarationFields.forEach(field=>{
          if(field['name']==name){
            field['value'] = ''
            updateIcon(field)
          }
        })
        setDeclarationFields([...declarationFields])
      }
      else if(name.includes('containerNumber')){
        containerFields.forEach(field=>{
          if(field['name']==name){
            field['value'] = ''
            updateIcon(field)
          }
        })
        setContainerFields([...containerFields])
      }
      
    }

    const isValueExist = (name, value) => {
      let isExists = false;
      if (name.includes("declNumber")) {
        isExists = declarationFields.some(field=>(field.name!=name && field.value===value));
      } else if (name.includes("containerNumber")) {
        isExists = containerFields.some(field=>(field.name!=name && field.value===value));
      }
      return isExists;
    }

    const onDeclarationClick = (name,value) => {
      console.log("onDeclarationClick name",name)
      console.log("onDeclarationClick value",value)
      
      if(isValueExist(name,value)){
        setErrors({ ...errors, [name]: (name==="declNumber") ? 'DeclarationNumber Already Entered' : 'Container Number Already Entered' });
      }else{
        setErrors({ ...errors, [name]: "" });
        fetchContainerList(name,value,name)
      }
      if (name.includes("declNumber")) {
        let index = declarationFields.findIndex(field=>field.name===name);
        let declarationFieldsTemp = [...declarationFields];
        declarationFieldsTemp[index].value=value
        declarationFieldsTemp[index].suggestions=[];
        setDeclarationFields(declarationFieldsTemp)
      } else if (name.includes("containerNumber")) {
        let index = containerFields.findIndex(field=>field.name===name);
        let containerFieldsTemp = [...containerFields];
        containerFieldsTemp[index].value=value
        containerFieldsTemp[index].suggestions=[];
        setContainerFields(containerFieldsTemp)
      }
      
     
  }

  const clearContainers = (value) => {
    console.log("clearContainers")
    setErrors({ ...errors, "containerNumber" : "" });
    containerFields.forEach(field=>{
      containerMap.delete(field.name);
    })
    let defaultContainerFieldTemp = {...defaultContainerField}
    defaultContainerFieldTemp.icon = plusDisabledIcon
    setContainerFields([defaultContainerFieldTemp]);
    
  }


  const clearDeclarations = (value) => {
    console.log("clearDeclarations")
    setErrors({ ...errors, "declNumber" : "" });
    declarationFields.forEach(field=>{
      containerMap.delete(field.name);
    })
    let defaultDecFieldTemp = {...defaultDecField}
    defaultDecFieldTemp.icon=plusDisabledIcon
    setDeclarationFields([defaultDecFieldTemp])
  }

    const handleDateTime = (e, value) => {
      setErrors({
        ...errors,
        dateAndTime: "",
      });
      var formattedMinDate = minformatDate(value);
      var datevalue = moment(new Date(value)).format("DD/MM/YYYY H:mm");
      var tt = formatToCalendarDate(form.dateAndTime);
      console.log(new Date(value), form.dateAndTime, new Date(tt));
      if (new Date(tt) <= new Date(value)) {
        setForm({
          ...form,
          //minDate: formattedMinDate,
          [e.target.name]: datevalue,
        });
      } else {
        //alert("not ok");
        setErrors({
          ...errors,
          dateAndTime: "Please enter a valid date",
        });
      }

      //   }
    };

    const onBlur = async (e) => {
      console.log("onBlur")
      console.log(e.target.name, e.target.value);
      if (e.target.value && e.target.value != "") {
        setErrors({ ...errors, [e.target.name]: "" });
        let response: any;
        // if (e.target.name === "declNumber") {
        if (e.target.name.includes("declNumber")) {
          // if (declarationArray.includes(e.target.value)) {
          //   setErrors({
          //     ...errors,
          //     [e.target.name]: "duplicaed value",
          //   });
          // } else {
          //   declarationArray.push(e.target.value);
          //   response = await getRequestByDeclaration(e.target.value);
          // }
          response = await getRequestByDeclaration(e.target.value);
        } else {
          response = await getRequestByContainer(e.target.value);
        }
        if (response?.success) {
          var respcontainerList = response.data?.data?.dataItems[0]
            ?.containerList || [response.data?.data?.dataItems[0]?.container];

          Array.prototype.push.apply(containerList, respcontainerList);
          console.log(respcontainerList);
          // if (typeof respcontainerList === "object") {
          //   console.log("object");
          //   // containerList.push(respcontainerList); //eeeaaannnaasss
          //   containerList.concat(respcontainerList);
          // } else {
          //   console.log("arrray");
          //   containerList.concat(respcontainerList);
          // }

          console.log(respcontainerList, containerList);
          setErrors({
            ...errors,
            [e.target.name]: response.data?.data?.dataItems[0]?.noOfContainers
              ? response.data.data.dataItems[0].noOfContainers +
                " container selected"
              : "1 Container Selected",
          });
        } else {
          console.log(e.target.placeholder);
          setErrors({
            ...errors,
            [e.target.name]:
              response?.data?.data?.dataItems[0]?.error ||
              "Invalid " + e.target.placeholder,
          });
        }
      }
      //seticon({ declNumber: blankIcon, containerNumber: minusIcon });
      console.log(form)
    };

    const fetchContainerList = async (name,value,placeholder) =>{
      if (value && value != "") {
        setErrors({ ...errors, [name]: "" });
        let response: any;
        // if (name === "declNumber") {
        if (name.includes("declNumber")) {
          response = await getRequestByDeclaration(value);
        } else {
          response = await getRequestByContainer(value);
        }
        if (response?.success) {
          var respcontainerList = response.data?.data?.dataItems[0]
            ?.containerList || [response.data?.data?.dataItems[0]?.container];

          Array.prototype.push.apply(containerList, respcontainerList);
          containerMap.set(name,respcontainerList)
          console.log(respcontainerList);
          console.log(respcontainerList, containerList);
          setErrors({
            ...errors,
            [name]: response.data?.data?.dataItems[0]?.noOfContainers
              ? response.data.data.dataItems[0].noOfContainers +
                " container selected"
              : "1 Container Selected",
          });
        } else {
          console.log(placeholder);
          setErrors({
            ...errors,
            [name]:
              response?.data?.data?.dataItems[0]?.error ||
              "Invalid " + placeholder,
          });
        }
      }

    }

    //
    const validateDetails = async () => {
      //console.log(form, Object.keys(form.droplocation).length);
      setErrors({
        general:
          form.declNumber === "" && form.containerNumber === ""
            ? "one from declaration/container number is mandatory"
            : "",
        truckType:
          form.truckType === "" ? "Truck Type Selection is Mandatory" : "",
        droplocation:
          form.droplocation.consigneeContactName === ""
            ? "Address Selection is Mandatory"
            : "",
        truckCount:
          form.truckCount === "" ? "Truck Selection is Mandatory" : "",
      });
      var outPut = true;
      for (var key in errors) {
        console.log(errors, "key", key);
        //   // if (
        //   //   errors[key] === null &&
        //   //   errors[key] === "" &&
        //   //   (errors[key] === "declNumber" || errors[key] === "")
        //   // )
        //   //   return false;
        if (
          // errors[key] !== null &&
          // errors[key] != "" &&
          errors[key] === "declNumber" ||
          // errors[key] === "" ||
          errors[key] === undefined
        )
          return false;
        //else return;
      }
      return true;
    };

    function createRequestObject(): any {
      let result: any[] = [];
      let vals;
      //if (form.declNumber && form.declNumber != "") {
      console.log(containerMap)
      let containerList = [];
      Array.from(containerMap.values()).forEach(list=>{
        containerList = [...list,...containerList]
      })
      containerList.forEach((element: any) => {
        var test = {
          ...element,
          ...form.droplocation,
          date_time: form.dateAndTime,
        };
        test.containerType = form.truckType;
        test.requestDetailsNumber = null;
        result.push(test);
      });
      let truckTypeArray: any[] = createrequestTruckType(
        form.dropInterval,
        form.dateAndTime,
        form.truckCount,
        form.truckType
      );


      console.log({
        requestTruckType: truckTypeArray ?? [],
        containerList: result,
        multiLocAndTime: false,
        date_time: form.dateAndTime,
        truckNumber: form.truckCount,
      })

      return {
        requestTruckType: truckTypeArray ?? [],
        containerList: result,
        multiLocAndTime: false,
        date_time: form.dateAndTime,
        truckNumber: form.truckCount,
      };
      //  }
    }

    function createrequestTruckType(
      interval: string,
      dateTime: string,
      numberOftruck: string,
      truckType: any
    ): any[] {
      let truckTypes: any[] = [];
      let truckVar: any;
      let nbTruck = Number(numberOftruck);
      let intervalInMilliSeconds: number = utils.convertToMillSeconds(interval);
      let myInterval: number = 0;
      for (let i = 0; i < nbTruck; i++) {
        truckVar = {
          dateAndTime: moment(form.dateAndTime).format("DD/MM/YYYY H:mm"),
          index: i,
          interval: interval,
          vehicleCode: truckType?.value ?? "code",
          vehicleName: truckType?.label ?? "name",
        };
        truckTypes.push(truckVar);
        myInterval = myInterval + intervalInMilliSeconds;
      }

      return truckTypes;
    }
    var bookTruckDetails: any = {};

    useImperativeHandle(ref, () => ({
      async gotoPaymentDiscPage() {
        console.log("clicked");
        var emptyField = await validateDetails();
        bookTruckDetails.multiLocAndTime = false;
        bookTruckDetails.date_time = form.dateAndTime;
        bookTruckDetails.truckNumber = form.truckCount;
        console.log("emptyField", emptyField);
        if (emptyField) {
          let r: any = await createRequestObject();
          console.log(r, form);
          var resp = await fetchContainerSummaryPayment(r);
          if (resp?.success) {
            var response = resp.data?.data?.dataItems[0];
            //response.bookTruckDetails.date_time = "19/10/2021 14:44"; //form.dateAndTime; //r.date_time;
            response.bookTruckDetails = bookTruckDetails;
            var payment = createPaymentObject(response);
            payment.totalContainerTariff = response.totalContainerTariff;
            payment.totalTokenTariff = response.totalTokenTariff;
            console.log(payment);
            history.push("/quickBook/payment", payment);
            // if (
            //   (form.declNumber !== "" || form.containerNumber !== "") &&
            //   Object.keys(form.truckType).length !== 0 &&
            //   //Object.keys(dropLocation).length !== 0 &&
            //   form.droplocation.consigneeContactName !== "" &&
            //   form.truckCount !== ""
            // ) {
            //   let r: any = await createRequestObject();
            //   // props.clickedContinue(r, r?.requestTruckType);
            // }
            //};
          } else {
            setErrors({
              ...errors,
              general: response?.data?.message || response?.data?.error,
            });
          }
        }
      },
    }));
    // const onContinue = async () => {
    // console.log("clicked");
    // var emptyField = await validateDetails();
    // bookTruckDetails.multiLocAndTime = false;
    // bookTruckDetails.date_time = form.dateAndTime;
    // bookTruckDetails.truckNumber = form.truckCount;
    // console.log("emptyField", emptyField);
    // if (emptyField) {
    //   let r: any = await createRequestObject();
    //   console.log(r, form);
    //   var resp = await fetchContainerSummaryPayment(r);
    //   if (resp?.success) {
    //     var response = resp.data?.data?.dataItems[0];
    //     //response.bookTruckDetails.date_time = "19/10/2021 14:44"; //form.dateAndTime; //r.date_time;
    //     response.bookTruckDetails = bookTruckDetails;
    //     var payment = createPaymentObject(response);

    //     console.log(payment);
    //     history.push("/quickBook/payment", payment);
    //     // if (
    //     //   (form.declNumber !== "" || form.containerNumber !== "") &&
    //     //   Object.keys(form.truckType).length !== 0 &&
    //     //   //Object.keys(dropLocation).length !== 0 &&
    //     //   form.droplocation.consigneeContactName !== "" &&
    //     //   form.truckCount !== ""
    //     // ) {
    //     //   let r: any = await createRequestObject();
    //     //   // props.clickedContinue(r, r?.requestTruckType);
    //     // }
    //     //};
    //   } else {
    //     setErrors({
    //       ...errors,
    //       general: response?.data?.message || response?.data?.error,
    //     });
    //   }
    // }
    //  };



    return (
      <IonPage className="BookTruck-Location">
        <IonContent>
          <div className="book-quick">
            <div className="validationMessage ">
              <IonLabel className="" hidden={errors.general === ""}>
                {errors.general}
              </IonLabel>
            </div>
            {/* <TxtInput
              name={"declNumber"}
              value={form.declNumber}
              label="Declaration Number"
              errors={errors.declNumber}
              type="text"
              required={true}
              onChange={handleChange}
              datatype="TEXT"
              placeholder="Declaration Number"
              icon={icon.declNumber}
              onBlur={onBlur}
              pattern="###-########-###"
              description=" Format xxx-yyyyyyyy-zz"
              clearInput={false}
            /> */}
            {/* <Autocomplete
              name={"declNumber"}
              errors={errors.declNumber}
              icon={icon.declNumber}
              onOptionClick={onDeclarationClick}
              onSuggestionChange={onHandleChange}
              label={"Declaration Number"}
              isReset={isDeclarationReset}
              suggestions={suggestions}
              value={""}
            /> */}
            {/* eanas */}
            {/* {txtInputAdd.declNumber.map((item, index) => ( */}
              { declarationFields && declarationFields.map((field, index) =>(
              // <TxtInput
              //   key={index}
              //   name={"declNumber" + (index * 1 + 1)}
              //   value={form["declNumber" + (index * 1 + 1)]}
              //   label="Declaration Number"
              //   errors={errors["declNumber" + (index * 1 + 1)]}
              //   type="text"
              //   //required={true}
              //   onChange={handleChange}
              //   datatype="TEXT"
              //   placeholder={"Declaration Number"}
              //   onBlur={onBlur}
              //   pattern="###-########-###"
              //   description=" Format xxx-yyyyyyyy-zz"
              // />
              <>
              <Autocomplete
              name={field.name}
              errors={errors[field.name]}
              // icon={(field.isParent && field.isIconDisabled) ? plusDisabledIcon : (field.isParent && !field.isIconDisabled) ? plusIcon : deleteIcon}
              icon={field.icon}
              onOptionClick={onDeclarationClick}
              onSuggestionChange={onHandleChange}
              onBlur={onBlur}
              label={"Declaration Number"}
              value={field.value}
              pattern={"###-########-####"}
              suggestions={field.suggestions}
              clearInput={clearInput}
              // ref={field.ref}
            />
            </>
            ))}

            {/* eanas */}
            {/* <TxtInput
              name={"containerNumber"}
              value={form.containerNumber}
              label="Container Number"
              errors={errors.containerNumber}
              type="text"
              required={true}
              onChange={handleChange}
              datatype="TEXT"
              placeholder="Container Number"
              icon={icon.containerNumber}
              onBlur={onBlur}
              clearInput={false}
            /> */}
             {/* <Autocomplete
              name={"containerNumber"}
              errors={errors.containerNumber}
              icon={plusIcon}
              onOptionClick={onDeclarationClick}
              onSuggestionChange={onHandleChange}
              label={"Container Number"}
              suggestions={suggestions}
              value={""}
            /> */}
              { containerFields && containerFields.map((field, index) =>( 
              // <TxtInput
              //   key={index}
              //   name={"containerNumber" + (index * 1 + 1)}
              //   value={form["containerNumber" + (index * 1 + 1)]}
              //   label="Container Number"
              //   errors={errors["containerNumber" + (index * 1 + 1)]}
              //   type="text"
              //   //required={true}
              //   onChange={handleChange}
              //   datatype="TEXT"
              //   placeholder="Container Number"
              //   onBlur={onBlur}
              // />
              <>
              <Autocomplete
              value={field.value}
              name={field.name}
              errors={errors[field.name]}
              // icon={(field.isParent && !field.isIconDisabled) ? plusIcon : (field.isParent && field.isIconDisabled) ? plusDisabledIcon : deleteIcon}
              icon={field.icon}
              onOptionClick={onDeclarationClick}
              onSuggestionChange={onHandleChange}
              onBlur={onBlur}
              label={"Container Number"}
              suggestions={field.suggestions}
              clearInput={clearInput}
              // ref={field.ref}
            />
            </>
            ))}
            <div className="twoItem">
              <div className="eachElement">
                {" "}
                <DrpdownInput
                  name={"truckCount"}
                  value={form.truckCount}
                  label="Truck Count"
                  errors={errors.truckCount}
                  type="text"
                  required={true}
                  onChange={handleChange}
                  datatype="TEXT"
                  placeholder="Enter Count"
                  listValues={totalTruckNumber}
                />
              </div>
              <div className="eachElement">
                <DrpdownInput
                  name={"dropInterval"}
                  value={form.dropInterval}
                  label="Drop Interval"
                  errors={errors.dropInterval}
                  required={true}
                  onChange={handleChange}
                  datatype="TEXT"
                  type="text"
                  placeholder="Select Interval"
                  listValues={dropIntervals}
                />
              </div>
            </div>
            <BorderWithFloatingText
              label={form.minDate}
              content={
                <Calendar
                  name={"dateAndTime"}
                  value={formatToCalendarDate(form.dateAndTime)}
                  label="Date"
                  errors={errors.dateAndTime}
                  type="text"
                  required={true}
                  onChange={handleDateTime}
                  placeholder="text"
                  minDate={form.minDate}
                  //max={form.minDate}
                  icon={calenderIcon}
                  displayFormat="DD-MMM-YYYY HH:mm"
                  className="dropdownInput"
                />
              }
            />
            {errors.dateAndTime && (
              <div className="topMargin">
                <IonText color="danger" className="validation-message">
                  <IonLabel className="ion-padding-start">
                    {errors.dateAndTime}
                  </IonLabel>
                </IonText>
              </div>
            )}
            <DrpdownInput
              name={"truckType"}
              value={form.truckType}
              label="Container Type"
              errors={errors.truckType}
              required={true}
              onChange={handleChange}
              datatype="TEXT"
              type="text"
              placeholder="Select Type"
              listValues={timeAddressTruckDataList.listTruck}
            />

            <DrpdownInput
              name={"droplocation"}
              value={form.droplocation}
              label="Drop Address"
              errors={errors.droplocation}
              type="address"
              required={true}
              onChange={handleChange}
              datatype="TEXT"
              placeholder="Enter Address"
              listValues={timeAddressTruckDataList.address}
            />

            <TxtInput
              name={"contactPerson"}
              value={form.droplocation?.consigneeContactName ?? ""}
              label="Contact Person"
              type="text"
              required={true}
              datatype="TEXT"
              placeholder="Name"
              readonly={true}
              onChange={handleChange}
            />

            <TxtInput
              name={"consigneeContactNumber"}
              value={form.droplocation?.consigneeContactNumber ?? ""}
              label="Mobile Number"
              type="text"
              required={true}
              datatype="TEXT"
              placeholder="Enter Number"
              readonly={true}
              onChange={handleChange}
            />

            <TxtInput
              name={"phoneNumber"}
              value={form.droplocation?.phoneNumber ?? ""}
              label="Phone Number"
              type="text"
              required={true}
              datatype="TEXT"
              placeholder="Enter Number"
              readonly={true}
              onChange={handleChange}
            />
          </div>
          {/* <IonToolbar> */}
          {/* <div className="button-div">
          <div className="button-holder" onClick={() => onContinue()}>
            <IonIcon slot="icon-only" icon={arrowForwardOutline} />
          </div>
        </div> */}

          {/* </IonToolbar> */}
        </IonContent>
        {/* <IonFooter></IonFooter> */}
      </IonPage>
    );
  }
);
export default BookQuick;
