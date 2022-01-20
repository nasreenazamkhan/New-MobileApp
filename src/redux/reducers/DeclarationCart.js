import * as LoginUserTypes from "../actionTypes/AllActionTypes";

const DeclarationCart = (state = [], action) => {
  switch (action.type) {
    case LoginUserTypes.ADD_DECLARATION_CART:
      state.concat(action.payLoad);
      return state.concat(action.payLoad);
    case LoginUserTypes.REMOVE_DECLARATION_CART:
      state = state.filter(function (item) {
        return action.payLoad.indexOf(item) === -1;
      });
      return state;
    case LoginUserTypes.REMOVE_ALL_DECLARATIONS:
      console.log("&&&&&&&", state);
      state = [];
      return state;
    default:
      return state;
  }
};

export default DeclarationCart;
