import * as LoginUserTypes from "../actionTypes/AllActionTypes";

const initialState = {
  isLoading: false,
  message: "",
};

export default function ApiRequestState(state = initialState, action: any) {
  switch (action.type) {
    case LoginUserTypes.API_REQUEST_STARTED:
      //return { isLoading: true, isSignedIn: false };
      return { isLoading: true, message: "" };
    case LoginUserTypes.API_REQUEST_SUCCESS:
      // return { isLoading: false, isSignedIn: true };
      return { isLoading: false, message: "" };
    case LoginUserTypes.API_REQUEST_FAILURE:
      // return { isLoading: false, isSignedIn: false };
      // return { isLoading: false, message: action.payLoad };
      console.log("API_REQUEST_FAILURE");
      return { isLoading: false, message: action.payLoad };
    default:
      return state;
  }
}
