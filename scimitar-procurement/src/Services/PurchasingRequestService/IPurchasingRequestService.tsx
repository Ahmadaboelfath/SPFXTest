import PurchasingRequest from "../../Models/ClassModels/PurchasingRequest";

export default interface IPurchasingRequestService {
  getById(id: number): Promise<PurchasingRequest>;
  updatePurchaseRequest(
    purchasingRequest: PurchasingRequest
  ): Promise<PurchasingRequest>;
  getApprovedPurchasingRequests(): Promise<PurchasingRequest[]>;
}