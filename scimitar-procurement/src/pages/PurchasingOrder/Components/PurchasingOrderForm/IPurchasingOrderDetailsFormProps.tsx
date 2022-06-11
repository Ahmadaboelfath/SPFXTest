import PurchasingOrder from "../../../../Models/ClassModels/PurchasingOrder";
import { ViewMode } from "../../../MaterialRequsitionItem/ViewMode";

export default interface IPurchasingOrderDetailsFormsProps {
  viewMode: ViewMode;
  purchaseOrder: PurchasingOrder;
  onChange: (value, ctrlName, revised?: boolean) => void;
  lookups: any;
  disableDropDowns: boolean;
  errors?: any;
}
