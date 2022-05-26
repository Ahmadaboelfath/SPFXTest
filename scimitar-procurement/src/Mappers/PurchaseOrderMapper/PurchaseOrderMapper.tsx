import PurchasingOrder from "../../Models/ClassModels/PurchasingOrder";
import IPurchaseOrderMapper from "./IPurchaseOrderMapper";

export default class PurchaseOrderMapper implements IPurchaseOrderMapper {
  mapFromSPListItemObject(spObject: any): PurchasingOrder {
    throw new Error("Method not implemented.");
  }
  mapToSPListItemObject(purchaseOrder: PurchasingOrder) {
    throw new Error("Method not implemented.");
  }
}
