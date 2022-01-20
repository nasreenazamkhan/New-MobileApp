import { REGEX_MAP } from "./Constants";
import moment from "moment";
const milliseconds = (h, m, s) => ((h * 60 * 60 + m * 60 + s) * 1000);

var disabledHr;
export const isEmpty = (data: any) => {
  if(data===null){
  data=""}
  return data.trim() === "";
};

export const isValid = (dataType: any, data: any, delimiter?: string) => {
  if (delimiter) {
    data = data.replaceAll(delimiter, "");
  }
  return new RegExp(REGEX_MAP[dataType]).test(data);
};

export const getPatternValue = (data: any, pattern: any, delimiter: any) => {
  if (!data || !pattern || !delimiter) {
    return data;
  }
  var cleaned = data.replaceAll(" ", "").replaceAll(delimiter, "");
  let finalstr = "";
  let ctr = 0;

  for (let i = 0; i < pattern.length && ctr < cleaned.length; i++) {
    if (pattern[i] != delimiter) {
      finalstr = finalstr + cleaned[ctr];
      ctr = ctr + 1;
    } else {
      finalstr = finalstr + delimiter;
    }
  }
  return finalstr;
};

export const stringToColour = function(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

export const validateEmail=(mail) =>{
  return new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i).test(mail);
}

export const validatePhone=(number) =>{
  let regexp =  new RegExp("^\\d{8}$");
  var nameTest = regexp.test(number);
  return nameTest;
}

export const validateMobile=(number,length) =>{
  let regexp =  new RegExp("^\\d{"+length+"}$");
  var nameTest = regexp.test(number);
  return nameTest;
}

export function addTimeToDateTime(date: any, timeToAdd: any) {
  var d2 = new Date(date);
  return new Date(d2.setMinutes(date.getMinutes() + timeToAdd));
  //return updatedDate;
}

export function setDisabledMinHr(disableHr) {
  //testFun(testContent);
  var disabledTime = addTimeToDateTime(new Date(), 1 * disableHr * 60 || 1);
  disabledHr = disabledTime.toISOString();
  return disabledHr;
}

export function getDisabledMinHr() {
  return disabledHr;
}

export const convertToMillSeconds = (interval: string) => {
  let timeParts = interval.split(":");
  let result = milliseconds(timeParts[0], timeParts[1], 0);
  // days
  return result;
}
