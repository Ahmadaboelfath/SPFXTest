import MaterialRequesitionItem from "../../Models/ClassModels/MaterialRequesitionItem";
import ShipTo from "../../Models/ClassModels/ShipTo";
import Vendor from "../../Models/ClassModels/Vendor";
import PurchasingOrderViewModel from "../../Models/ViewModels/PurchasingOrderViewModel";
import PurchasingRequestViewModel from "../../Models/ViewModels/PurchasingRequestViewModel";

export default interface IPrintPageState {
  showLoader: boolean;
  purchaseOrderViewModel: PurchasingOrderViewModel;
  purchaseRequestViewModel: PurchasingRequestViewModel;
  lookups?: any;
  shipTo?: ShipTo;
  vendor?: Vendor;
}
