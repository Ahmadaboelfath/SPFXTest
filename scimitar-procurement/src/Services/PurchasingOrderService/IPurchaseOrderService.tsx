import PurchasingOrder from "../../Models/ClassModels/PurchasingOrder";

export default interface IPurchaseOrderService {
  getByRequesteor(requestorId: number): Promise<PurchasingOrder[]>;
  getById(id: number): Promise<PurchasingOrder>;
  add(purchaseOrder: PurchasingOrder): Promise<PurchasingOrder>;
  edit(purchaseOrder: PurchasingOrder): Promise<PurchasingOrder>;
  delete(purchaseOrder: PurchasingOrder): Promise<PurchasingOrder>;
}
