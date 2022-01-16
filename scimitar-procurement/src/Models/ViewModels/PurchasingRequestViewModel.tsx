import MaterialRequesition from "../ClassModels/MaterialRequesition";
import MaterialRequesitionItem from "../ClassModels/MaterialRequesitionItem";
import PurchasingRequest from "../ClassModels/PurchasingRequest";

export default class PurchasingRequestViewModel {
  private _purchaseRequest: PurchasingRequest;
  public get purchaseRequest(): PurchasingRequest {
    return this._purchaseRequest;
  }
  public set purchaseRequest(v: PurchasingRequest) {
    this._purchaseRequest = v;
  }

  private _materialRequisition: MaterialRequesition;
  public get materialRequisition(): MaterialRequesition {
    return this._materialRequisition;
  }
  public set materialRequisition(v: MaterialRequesition) {
    this._materialRequisition = v;
  }

  private _materialRequeisitionItems: MaterialRequesitionItem[];
  public get materialRequeisitionItems(): MaterialRequesitionItem[] {
    return this._materialRequeisitionItems;
  }
  public set materialRequeisitionItems(v: MaterialRequesitionItem[]) {
    this._materialRequeisitionItems = v;
  }
}
