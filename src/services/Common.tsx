import { Capacitor } from "@capacitor/core";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { truckNumber } from "../util/Constants";

export const todayDate = moment().format("YYYY-MM-DD hh:mm a");
export const calendarTodayDate = moment().format("DD/MM/YYYY hh:mm ");
export const minDate = moment().format("YYYY-MM-DD");
export const yesterdayDate = moment().subtract(1, "days").format("MM/DD/YYYY");
export const nextYear = moment().add(2, "years").format("YYYY-MM-DD");
export const lastYear = moment().subtract(5, "years").format("YYYY-MM-DD");

export const createArrayOfObjectWithKeyAndValue = (num?) => {
  var array = [];
  var len = num || truckNumber;
  for (var i = 1; i <= len; i++) {
    array.push({
      label: i + "",
      value: i + "",
    });
  }
  return array;
};

export const mmddFormatDate = (date) => {
  return moment(date, "DD/MM/YYYY HH:mm").format("MM/DD/YYYY HH:mm ");
};

export const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD HH:mm");
};

export const minformatDate = (date) => {
  console.log(date);
  return moment(date).format("YYYY-MM-DD");
};

export const formatToCalendarDate = (date) => {
  var test = moment(date, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm ");
  return '"' + test + '"';
};

export const platformDependentOption = () => {
  if (Capacitor.getPlatform() === "android")
    return "zoom=no,footer=no,location=yes";
  else if (Capacitor.getPlatform() === "ios") return "";
};

export const createPaymentObject = (response) => {
  console.log(response);
  var payment: any = {
    totalAmt: response?.grossAmount,
    totalAmount: response?.grossAmount,
    containerCountforToken: response?.containerCountforToken,
    tokenAmount: response?.tokenAmount,
    tokenVat: response?.tokenVatAmount,
    tokenVatAmount: response?.tokenVatAmount,
    totalTokenCharge: response?.totalTokenCharge,
    totalTariff: response?.totalTariff,
    paymentDetails: response?.paymentDetails,
    vatProfileDto: response?.vatProfileDto,
    totalVat: response?.totalVat,
    //requestTruckType: r.requestTruckType,
    paymentType: "INSTANT",
    containerList: response.containerList,
    multiLocAndTime: response.bookTruckDetails.multiLocAndTime
      ? response.bookTruckDetails.multiLocAndTime
      : false,
    date_time: response.bookTruckDetails.date_time,
    truckNumber: response.bookTruckDetails.truckNumber,
    dropInterval: response.bookTruckDetails.dropInterval,
    // fileContent: "",
    // fileName: "",
    // fileType: "application/pdf",
    // importerComments: "comments",
    containerSummary: response.containerSummary,
    grossAmount: response?.grossAmount,
    //containerSummary:
  };
  console.log(payment);
  return payment;
};

export const addPreZero = (number) => {
  if (number < 10) return "0" + number;
  else return number;
};

export const Logout = () => {
  let history = useHistory();
  history.push("/login");
};
