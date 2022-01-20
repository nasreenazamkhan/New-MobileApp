import * as LoginUserTypes from "../actionTypes/AllActionTypes";
var date = new Date();
var day = "" + date.getDate();
var month = "" + (date.getMonth() + 1);
var hour = "" + date.getHours();
var minute = "" + date.getMinutes();
if (month.length < 2) month = "0" + month;
if (minute.length < 2) minute = "0" + minute;
if (hour.length < 2) hour = "0" + hour;
if (day.length < 2) day = "0" + day;
var displayDate =
  day + "/" + month + "/" + date.getFullYear() + "  " + hour + ":" + minute;
//date.getFullYear() + "-" + month + "-" + day + "  " + hour + ":" + minute;
var samayam =
  //date.getFullYear() + "-" + month + "-" + day + "  " + hour + ":" + minute;
  date.toISOString();
var initialState = [
  {
    refVehicleTypeCode: "",
    dateAndTime: displayDate,
    interval: "",
    samayam: samayam,
  },
];
const Trucks = (state = initialState, action: any) => {
  switch (action.type) {
    case LoginUserTypes.ADD_TRUCK:
      state.concat(action.payLoad);
      return state.concat(action.payLoad);
    case LoginUserTypes.REMOVE_TRUCK:
      let stateCopy = [...state];
      if (stateCopy.length > 1) {
        let removedItem = stateCopy.pop();
        return stateCopy;
      }
    case LoginUserTypes.UPDATE_TRUCK:
      let update = [...state];
      update.push(action.payLoad);
      state = action.payLoad;
      update.pop();
      return update;
    case LoginUserTypes.REMOVE_ALL_TRUCK:
      state = [
        {
          refVehicleTypeCode: "",
          dateAndTime: displayDate,
          interval: "",
          samayam: samayam,
        },
      ];
      return state;
    case LoginUserTypes.UPDATE_SAMAYAM_TRUCK:
      state = [
        {
          refVehicleTypeCode: "",
          dateAndTime: displayDate,
          interval: "",
          samayam: action.payLoad,
        },
      ];
    default:
      return state;
  }
};

export default Trucks;
