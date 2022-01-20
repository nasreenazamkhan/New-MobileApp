import * as ActionType from "../actionTypes/AllActionTypes";

export const AddAccessToKen = (data) => {
  return {
    type: ActionType.ADD_ACCESS_TOKEN,
    data: {
      access_token: data,
      refresh_token: "00",
    },
  };
};

export const AddAgentType = (data) => {
  return {
    type: ActionType.ADD_AGENTTYPE,
    payLoad: data,
  };
};

export const AddSelectedAgent = (data) => {
  return {
    type: ActionType.ADD_SELECTED_AGENT,
    payLoad: data,
  };
};

export const AddUser = (data) => {
  return {
    type: ActionType.ADD_USER,
    payLoad: data,
  };
};

export const clearAllAddress = () => {
  return {
    type: ActionType.CLEAR_ALL_ADDRESS,
    //payLoad: "",
  };
};

export const addAddress = (data) => {
  return {
    type: ActionType.ADD_ADDRESS,
    payLoad: data,
  };
};

export const updateAddress = (data) => {
  return {
    type: ActionType.UPDATE_ADDRESS,
    payLoad: data,
  };
};

export const deleteAddress = (data) => {
  return {
    type: ActionType.REMOVE_ADDRESS,
    payLoad: data,
  };
};

export const bookTruckUpdateAddress = (data) => {
  return {
    type: ActionType.BOOK_TRUCK_UPDATE_ADDRESS,
    payLoad: data,
  };
};

export const booktruckUpdateOtherData = (data) => {
  return {
    type: ActionType.BOOK_TRUCK_UPDATE_OTHER_DATA,
    payLoad: data,
  };
};

export const addToBookTruck = (data) => {
  return {
    type: ActionType.ADD_TO_BOOK_TRUCK,
    payLoad: data,
  };
};

export const addContainerTypeList = (data) => {
  return {
    type: ActionType.UPDATE_VARIABLE,
    payLoad: { variableName: "containerTypeList", value: data },
  };
};
export const updateDRaftsPopupInHome = (data) => {
  return {
    type: ActionType.UPDATE_VARIABLE,
    payLoad: { variableName: "showDraftInHome", value: data },
  };
};

export const updatePaymentStatus = (data) => {
  return {
    type: ActionType.UPDATE_VARIABLE,
    payLoad: { variableName: "paymentStatus", value: data },
  };
};

export const updateInvoiceHeader = (data) => {
  return {
    type: ActionType.UPDATE_VARIABLE,
    payLoad: { variableName: "invoiceHeader", value: data },
  };
};

export const updateencryptedDraftId = (data) => {
  return {
    type: ActionType.UPDATE_VARIABLE,
    payLoad: { variableName: "encryptedDraftId", value: data },
  };
};
