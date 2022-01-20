import * as LoginUserTypes from "../actionTypes/AllActionTypes";

const Addresses = (state = [], action) => {
  switch (action.type) {
    case LoginUserTypes.ADD_ADDRESS:
      if (state.length < 1) {
        return (state = action.payLoad);
      } else {
        return [...state, action.payLoad];
      }
    case LoginUserTypes.REMOVE_ADDRESS:
      //console.log(state.filter((i) => i.code !== action.payLoad));
      return state.filter((i) => i.code !== action.payLoad);
    case LoginUserTypes.UPDATE_ADDRESS:
      //console.log(state.filter((i) => i.code !== action.payLoad));
      let update = [...state];
      update.push(action.payLoad);
      state = action.payLoad;
      update.pop();
      return update;

    case LoginUserTypes.CLEAR_ALL_ADDRESS:
      return [];
    default:
      return state;
  }
};

export default Addresses;
