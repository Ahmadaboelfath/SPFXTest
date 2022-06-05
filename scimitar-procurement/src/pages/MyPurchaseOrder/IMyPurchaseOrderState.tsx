import PurchasingOrder from "../../Models/ClassModels/PurchasingOrder";

export default interface IMyPurchaseOrderState {
  showLoader: boolean;
  purchaseOrders: PurchasingOrder[];
}
