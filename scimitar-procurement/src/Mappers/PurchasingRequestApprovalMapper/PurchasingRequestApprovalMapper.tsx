import PurchasingRequestApproval from "../../Models/ClassModels/PurchasingRequestApproval";
import IPurchasingRequestApprovalMapper from "./IPurchasingRequestApprovalMapper";

export default class PurchasingRequestApprovalMapper
  implements IPurchasingRequestApprovalMapper
{
  mapFromSPPurchaseRequestApprovalToPurchasingRequestApproval(
    SPPurchaseRequestApproval: any
  ): PurchasingRequestApproval {
    const purchaseRequestApproval: PurchasingRequestApproval =
      new PurchasingRequestApproval(SPPurchaseRequestApproval.Id);

    purchaseRequestApproval.approvalDate =
      SPPurchaseRequestApproval.ApprovalDate;
    purchaseRequestApproval.approver = SPPurchaseRequestApproval.Title;
    purchaseRequestApproval.executioner = SPPurchaseRequestApproval.Executioner;
    purchaseRequestApproval.purchasingRequestId =
      SPPurchaseRequestApproval.PurchasingRequestId;
    purchaseRequestApproval.status = SPPurchaseRequestApproval.Status;
    purchaseRequestApproval.requestCode = SPPurchaseRequestApproval.RequestCode;
    purchaseRequestApproval.rejectionReason =
      SPPurchaseRequestApproval.RejectionReason;

    return purchaseRequestApproval;
  }
  mapFromPurchasingRequestApprovalToSPPurchaseRequestApproval(
    PurchasingRequestApproval: PurchasingRequestApproval
  ) {
    return {
      ApprovalDate: PurchasingRequestApproval.approvalDate,
      Title: PurchasingRequestApproval.approver,
      Executioner: PurchasingRequestApproval.executioner,
      PurchasingRequestId: PurchasingRequestApproval.purchasingRequestId,
      Status: PurchasingRequestApproval.status,
      RejectionReason: PurchasingRequestApproval.rejectionReason,
    };
  }
}
