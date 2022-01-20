import * as LoginUserTypes from "../actionTypes/AllActionTypes";

var initialState = {
  user: {
    access_token: "",
    refresh_token: "",
    expires_in_second: 900000,
    created_Time: new Date(),
  },
  status: false,
};

const CheckAccessToken = (state = initialState, action) => {
  switch (action.type) {
    case LoginUserTypes.ADD_ACCESS_TOKEN:
      state = {
        user: {
          access_token: action.data.access_token,
          refresh_token: action.data.refresh_token,
          expires_in_second: 900000,
          created_Time: new Date(),
        },
        status: true,
      };

      return state;

    case LoginUserTypes.REMOVE_ACCESS_TOKEN:
      console.log("accesstoken removed", initialState);

      return initialState;
    default:
      return state;
  }
};

export default CheckAccessToken;
