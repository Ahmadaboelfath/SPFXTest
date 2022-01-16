import PurchasingRequest from "../../Models/ClassModels/PurchasingRequest";

export default interface IPRPendingAssigningState {
  showSpinner: boolean;
  purchasingRequests: PurchasingRequest[];
}
