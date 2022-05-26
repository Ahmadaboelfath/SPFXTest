import PurchasingOrder from "../../Models/ClassModels/PurchasingOrder";
import IPurchaseOrderService from "./IPurchaseOrderService";

export default class PurchasingOrderService implements IPurchaseOrderService {
  getByRequesteor(requestorId: number): Promise<PurchasingOrder[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: number): Promise<PurchasingOrder> {
    throw new Error("Method not implemented.");
  }
  add(purchaseOrder: PurchasingOrder): Promise<PurchasingOrder> {
    throw new Error("Method not implemented.");
  }
  edit(purchaseOrder: PurchasingOrder): Promise<PurchasingOrder> {
    throw new Error("Method not implemented.");
  }
  delete(purchaseOrder: PurchasingOrder): Promise<PurchasingOrder> {
    throw new Error("Method not implemented.");
  }
}
