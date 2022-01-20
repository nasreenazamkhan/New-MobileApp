export const REGEX_MAP = {
  TEXT: "^[A-Za-z0-9 ]+$",
  NUM: "^\\d+$",
  NUM_DEC: "^\\d*\\.\\d+$",
  ALPHA_NUM: "/^[a-zA-Z0-9 ]*$/",
  TEL_NUM: "^\\d+$",
};

export const termsAndConditionUrl =
  "https://dubaitrade.ae/en/lm-terms-conditions";
  export const helpAndSupportUrl ="https://www.dubaitrade.ae/en/help"

  export const sessionTimeoutInSec = 60*30 * 1000;

  export const truckNumber = 5;

  export const dropIntervals = [
    { label: "No Interval", value: "0" },
    { label: "30 Min", value: "30 min" },
    { label: "1 Hr", value: "1 Hr" },
    { label: "2 Hr", value: "2 Hr" },
    { label: "3 Hr", value: "2 Hr" },
    { label: "4 Hr", value: "4 Hr" },
  ];
