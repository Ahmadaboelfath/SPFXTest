import MaterialRequestionItem from "../ClassModels/MaterialRequesitionItem";
import PurchasingOrder from "../ClassModels/PurchasingOrder";

export default class PurchasingOrderViewModel {
  constructor(
    purchasingOrder?: PurchasingOrder,
    poItems?: MaterialRequestionItem[]
  ) {
    this._purchaseOrder = purchasingOrder
      ? purchasingOrder
      : new PurchasingOrder();

    this._purchaseOrderItems = poItems ? poItems : [];
  }

  private _purchaseOrder: PurchasingOrder;
  public get purchaseOrder(): PurchasingOrder {
    return this._purchaseOrder;
  }
  public set purchaseOrder(v: PurchasingOrder) {
    this._purchaseOrder = v;
  }

  private _purchaseOrderItems: MaterialRequestionItem[];
  public get purchaseOrderItems(): MaterialRequestionItem[] {
    return this._purchaseOrderItems;
  }
  public set purchaseOrderItems(v: MaterialRequestionItem[]) {
    this._purchaseOrderItems = v;
  }
}
