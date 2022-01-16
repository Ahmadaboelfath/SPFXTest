import PurchasingRequestApproval from "../../Models/ClassModels/PurchasingRequestApproval";

export default interface IPurchasingRequestApprovalService {
  getPurchasingApprovalsByEmail(
    email: string
  ): Promise<PurchasingRequestApproval[]>;

  updatePurchasingRequestApproval(
    purchasingRequestApproval: PurchasingRequestApproval
  ): Promise<PurchasingRequestApproval>;

  getApprovalById(id: number): Promise<PurchasingRequestApproval>;
}
