import PurchasingRequestApproval from "../../Models/ClassModels/PurchasingRequestApproval";
import PurchasingRequestApprovalViewModel from "../../Models/ViewModels/PurchasingRequestApprovalViewModel";
import PurchasingRequestViewModel from "../../Models/ViewModels/PurchasingRequestViewModel";

export default interface IPurchasingRequestApprovalBusinessLogic {
  getApprovalsByEmail(email: string): Promise<PurchasingRequestApproval[]>;

  getApprovalDetailsById(
    id: number
  ): Promise<PurchasingRequestApprovalViewModel>;

  approveRequest(
    request: PurchasingRequestApproval,
    logeedInUser: string
  ): Promise<PurchasingRequestApproval>;

  rejectRequest(
    request: PurchasingRequestApproval,
    logeedInUser: string
  ): Promise<PurchasingRequestApproval>;
}
