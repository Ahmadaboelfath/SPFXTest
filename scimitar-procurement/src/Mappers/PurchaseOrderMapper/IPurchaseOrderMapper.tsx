import PurchasingOrder from "../../Models/ClassModels/PurchasingOrder";

export default interface IPurchaseOrderMapper {
  mapFromSPListItemObject(spObject: any): PurchasingOrder;
  mapToSPListItemObject(purchaseOrder: PurchasingOrder): any;
}
