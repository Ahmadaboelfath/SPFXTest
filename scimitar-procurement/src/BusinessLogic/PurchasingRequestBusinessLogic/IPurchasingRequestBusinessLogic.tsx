import PurchasingRequest from "../../Models/ClassModels/PurchasingRequest";
import PurchasingRequestViewModel from "../../Models/ViewModels/PurchasingRequestViewModel";

export default interface IPurchasingRequestBusinessLogic {
  getPurchasingRequestDetailsById(
    id: number
  ): Promise<PurchasingRequestViewModel>;
  assignUserForPurchasingRequest(
    id: number,
    purchasingRequest: PurchasingRequest
  ): Promise<PurchasingRequest>;

  getAllApprovedPurchasingRequests(): Promise<PurchasingRequest[]>;
  getAllApprovedOrPendingPurchasingRequests(): Promise<PurchasingRequest[]>;

  cancelPurchasingRequesition(
    purchaseRequest: PurchasingRequest
  ): Promise<PurchasingRequest>;

  getAll(): Promise<PurchasingRequest[]>;
}
