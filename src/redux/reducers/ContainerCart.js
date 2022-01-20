import * as LoginUserTypes from "../actionTypes/AllActionTypes";

const ContainerCart = (state = [], action) => {
  switch (action.type) {
    case LoginUserTypes.ADD_CONTAINER_CART:
     
       state = state.concat(action.payLoad.containerList);
      var state1=state
      state1.selectedNumber=action.payLoad.selectedNumber;
      return state1;
    case LoginUserTypes.REMOVE_CONTAINER_CART:
      return state.filter(i => i.container_number !== action.payLoad)
    case LoginUserTypes.REMOVE_DECLARATION_CART:
        var state1=  state.filter(function (item) {
          
           return  action.payLoad.containerList.indexOf(item) === -1;
       });
       state1.selectedNumber=action.payLoad.selectedNumber;
      return state1
    case LoginUserTypes.UPDATE_CONTAINER_CART:
        let update = [...state];
        update.map((item, index) => {
          item.container_number==action.payLoad.container_number?
         item=action.payLoad
        :console.log('no')
      })
      update.push(1);
      //state = action.payLoad;
      update.pop();
      
      update.selectedNumber=action.payLoad.selectedNumber;
        return update;
    case LoginUserTypes.REMOVE_ALL_CONTAINERS:
      return state=[]  
    default:
      return state;
  }
};

export default ContainerCart;
