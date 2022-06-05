import IFileInfo from "../../Controls/FileUploader/Interfaces/IFileInfo";
import MaterialRequestionItem from "../ClassModels/MaterialRequesitionItem";
import PurchasingOrder from "../ClassModels/PurchasingOrder";

export default class PurchasingOrderViewModel {
  constructor(
    purchasingOrder?: PurchasingOrder,
    poItems?: MaterialRequestionItem[],
    files?: IFileInfo[]
  ) {
    this._purchaseOrder = purchasingOrder
      ? purchasingOrder
      : new PurchasingOrder();

    this._purchaseOrderItems = poItems ? poItems : [];
    this._files = files ? files : [];
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

  private _files: IFileInfo[];
  public get files(): IFileInfo[] {
    return this._files;
  }
  public set files(v: IFileInfo[]) {
    this._files = v;
  }
}
