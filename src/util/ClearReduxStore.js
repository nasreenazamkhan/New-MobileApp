import Store from "../redux/Store";
import * as LoginUserTypes from "../redux/actionTypes/AllActionTypes";

export default function ClearReduxStore() {
  Store.dispatch({ type: LoginUserTypes.BOOK_TRUCK_CLEAR });
  Store.dispatch({ type: LoginUserTypes.REMOVE_ALL_CONTAINERS });
  Store.dispatch({ type: LoginUserTypes.REMOVE_ALL_TRUCK });
  Store.dispatch({ type: LoginUserTypes.CLEAR_CART });
  Store.dispatch({ type: LoginUserTypes.REMOVE_ALL_DECLARATIONS });
}
