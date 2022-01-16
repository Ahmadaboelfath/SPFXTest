import PurchasingRequestApproval from "../../Models/ClassModels/PurchasingRequestApproval";

export default interface IPRPendingApprovalsState {
  showSpinner: boolean;
  approvalItems: PurchasingRequestApproval[];
}
