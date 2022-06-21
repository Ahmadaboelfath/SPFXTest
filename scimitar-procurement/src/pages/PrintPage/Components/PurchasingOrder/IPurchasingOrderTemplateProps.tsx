import ShipTo from "../../../../Models/ClassModels/ShipTo";
import Vendor from "../../../../Models/ClassModels/Vendor";
import PurchasingOrderViewModel from "../../../../Models/ViewModels/PurchasingOrderViewModel";

export default interface IPurchasingOrderTemplate {
  purchaseOrderViewModel: PurchasingOrderViewModel;
  lookups: any;
  shipTo: ShipTo;
  vendor: Vendor;
}
