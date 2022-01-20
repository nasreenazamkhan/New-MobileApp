import { Capacitor } from "@capacitor/core";

export const apiBaseUrl = (): string => {
  return "/ptms/mobile/api/secure";
};

let baseHost;
if (Capacitor.getPlatform() !== "web") {
	// baseHost= "http://10.0.2.2:8080";
  //  baseHost = "https://dtdev.dubaitrade.ae";
  baseHost = "https://dtsit.dubaitrade.ae";
 //baseHost="https://eservices.dubaitrade.ae.ae"
//  baseHost = "https://eservicesuat.dubaitrade.ae"
} else {
   //baseHost= "http://localhost:8080";
   //baseHost= 'https://dtdev.dubaitrade.ae'
  baseHost = "https://dtsit.dubaitrade.ae";
  // baseHost = "https://eservicesuat.dubaitrade.ae"
  //baseHost="https://eservices.dubaitrade.ae"
}
const rootUrl = "/ptms/mobile/api/";
export const baseUrl = baseHost + rootUrl + "secure";
export const loginUrl = baseHost + rootUrl + "auth/mobilelogin";
export const loginAgent = baseUrl + "/mobileLoginWithAgentCode"
export const profileUpdate=baseUrl+"/user/updateDetails"
export const confirmDetailUrl = baseUrl + "/user/confirmDetails";
export const fetchConfirmDetails = baseUrl + "/fetchConfirmDetails?userName=";
export const profileDataFetch = baseUrl + "/user/fetchDetails?userName=";
export const declarationUrl =baseUrl+ "/boe/search?";
export const quickBookConatainerUrl =baseUrl+ "/boe/container?ref=";
export const quickBookDeclUrl = baseUrl+"/boe/declaration?ref=";
export const paymentUrl =  baseUrl+"/requestDetails/saveRequestDetails?locale=en";
export const paymentStatus = "/payment/status/";
export const tokenUrl = baseHost + rootUrl + "auth/getToken?locale=en";
export const getAddress = baseUrl +"/address/fetchDetails?locale=en";
export const fetchContainerSummaryPayment = baseUrl+"/boe/fetchContainerSummaryAndPayment?locale=en";
export const allVehicle = baseUrl+"/vehicleType/fetchAll";
export const addAddress = baseUrl + "/address/create";
export const rosoomPaymentStatusCheck = baseUrl + "/payment/status/";
export const deleteAddress = baseUrl + "/address/delete/";
export const updateAddress = baseUrl + "/address/update";
export const allZone = baseUrl + "/zone/fetchAll";
export const downloadReceipt =  baseUrl + "/certificate/paymentReceipt/";
export const downloadTaxInvoice = baseUrl +"/certificate/paymentInvoice/";
export const bookingDetails= baseUrl +"/requestDetails/search?";
export const containerDetails= baseUrl +"/requestDetails/paymentSummary?";
export const reinitializeUrl =  baseUrl + "/reinitializePayment/";
export const contacDetailsUpdateUrl = baseUrl + "/requestContainerDetails/updateRequestContainerDetails";
export const declSmartSearch=baseUrl+"/boe/smartDeclaration?ref="
export const fetchAllNotificationUrl = baseUrl + "/userNotifications";
export const fetchCountsOfUnreadNotificationsUrl = baseUrl + "/userNotifications/counts";
export const fetchRequestStatusCountsUrl = baseUrl + "/requestDetails/count";
export const cancelRequestContainerUrl = baseUrl + "/requestContainerDetails/cancel";
export const fetchContainerTypes=baseUrl+"/boe/fetchContainerTypes"
export const saveAsDraft=baseUrl+"/boe/saveAsDraft?locale=en"
export const fetchDraftCount=baseUrl+"/boe/fetchDraftCount"
export const fetchAllDrafts =baseUrl+"/boe/fetchAllDrafts"
export const deleteDraft =baseUrl+"/boe/deleteDraft"
export const fetchAllPOD= baseUrl+"/requestDetails/search?"
export const fetchDetailOfBookingNum= baseUrl +"/requestDetails/paymentSummary/?locale=en&refNo="
export const fetchAllPod =baseUrl+"/requestContainerDetails/fetchPod?"
export const ratingnFeedback=baseUrl+"/requestContainerDetails/ratingAndFeedback?locale=en"
export const fetchMiscellanious =baseUrl+"/requestDetails/search?statusCode=INVAPPR&option=ALL&"
export const miscellaniousItemDetails=baseUrl+"/requestDetails/paymentSummary/?locale=en&refNo="
export const fetchInvoicesForPayment=baseUrl+"/requestDetails/fetchInvoicesForPayment?locale=en&referenceNumber="
export const payInvoiceRequest= baseUrl+"/requestDetails/makePaymentForInvoice?locale=enpen"
export const approvePOD=baseUrl+"/requestContainerDetails/approvePod?locale=en"
export const fetchDeclarationsUrl = baseUrl+"/boe/fetch/declaration/numbers?declarationNumber=";
export const fetchContainersUrl = baseUrl+"/boe/fetch/container/numbers?containerNumber=";
export const deviceRegisterUrl = baseUrl + "/device";
export const rejectPOD =baseUrl+"/requestContainerDetails/rejectPod?locale=en";

