import * as LoginUserTypes from "../actionTypes/AllActionTypes";

const initialState = {
  user: {
    userName: "",
    userType: "",
    selectedAgent:{},
    userdetails: {
      lastLoggedIn: "some date",
    },
  },
  status: false,
};

const CheckUserStatus = (state = initialState, action: any) => {
  switch (action.type) {
    case LoginUserTypes.ADD_USER:
      return {
        user: action.payLoad,
        status: true,
      };
    case LoginUserTypes.UPDATE_USER:
      return {
        user: {
          userName: "",
          userdetails: {
            lastLoggedIn: "some date",
          },
        },
        status: true,
      };
    case LoginUserTypes.ADD_AGENTTYPE:
      state.user.userType = action.payLoad;
      return state;
    case LoginUserTypes.ADD_SELECTED_AGENT:
      state.user.selectedAgent = action.payLoad;
      return state;
    case LoginUserTypes.REMOVE_USER:
      return {
        user: {
          userName: "",
          userdetails: {
            lastLoggedIn: "some date",
          },
        },
        status: false,
      };
    default:
      return state;
  }
};

export default CheckUserStatus;
