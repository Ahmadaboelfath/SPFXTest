import PurchasingRequestApproval from "../../Models/ClassModels/PurchasingRequestApproval";

export default interface IPurchasingRequestApprovalMapper {
  mapFromSPPurchaseRequestApprovalToPurchasingRequestApproval(
    SPPurchaseRequestApproval: any
  ): PurchasingRequestApproval;

  mapFromPurchasingRequestApprovalToSPPurchaseRequestApproval(
    PurchasingRequestApproval: PurchasingRequestApproval
  ): any;
}
