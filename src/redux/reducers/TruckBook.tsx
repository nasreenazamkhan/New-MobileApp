import { calendarTodayDate, todayDate } from "../../services/Common";
import * as LoginUserTypes from "../actionTypes/AllActionTypes";
var initialState = {
  containerList: [],
  multiLocAndTime: false,
  dropDiffTimeDate: false,
  truckNumber: "1",
  date_time: calendarTodayDate,
  dropInterval: 0,
};

const TruckBook = (state = initialState, action) => {
  switch (action.type) {
    case LoginUserTypes.ADD_TO_BOOK_TRUCK:
      var updatedState = { ...state };
      updatedState = action.payLoad;
      return updatedState;
    case LoginUserTypes.BOOK_TRUCK_SINGLE_LOCATION:
      state.containerList = action.payLoad;
      state.multiLocAndTime = false;
      return state;
    case LoginUserTypes.BOOK_TRUCK_UPDATE_ADDRESS:
      var updatedState = { ...state };
      updatedState.containerList.forEach((element, index) => {
        updatedState.containerList[index] = { ...element, ...action.payLoad };
      });
      return updatedState;

    case LoginUserTypes.BOOK_TRUCK_UPDATE_OTHER_DATA:
      var updatedState = { ...state };
      updatedState.containerList.forEach((element, index) => {
        if (element.container_number === action.payLoad.containerNumber) {
          updatedState.containerList[index] = {
            ...element,
            ...action.payLoad.element,
          };
        }
      });
      return updatedState;

    case LoginUserTypes.BOOK_TRUCK_UPDATE_COMMON_DATA:
      var updatedState = { ...state };
      updatedState = {
        ...updatedState,
        ...action.payLoad,
      };
      return updatedState;
    case LoginUserTypes.REMOVE_CONTAINER_TRUCK_BOOK:
      var updatedState = { ...state };
      updatedState.containerList = updatedState.containerList.filter(
        (i) => i.container_number !== action.payLoad
      );
      return updatedState;
    case LoginUserTypes.BOOK_TRUCK_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default TruckBook;
