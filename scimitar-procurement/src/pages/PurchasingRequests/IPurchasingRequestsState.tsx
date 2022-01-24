import PurchasingRequest from "../../Models/ClassModels/PurchasingRequest";
import PurchasingRequestApproval from "../../Models/ClassModels/PurchasingRequestApproval";

export default interface IPurchasingRequestsState {
  showSpinner: boolean;
  approvalItems: PurchasingRequest[];
}
