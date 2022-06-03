import { DropdownItemProps } from "semantic-ui-react";
import IFileInfo from "../../Controls/FileUploader/Interfaces/IFileInfo";
import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";
import PurchasingOrder from "../../Models/ClassModels/PurchasingOrder";
import ShipTo from "../../Models/ClassModels/ShipTo";
import Vendor from "../../Models/ClassModels/Vendor";
import { MaterialRequesitionItemsDropDown } from "../MaterialRequsitionItem/HelperInterfaces";

export default interface IDevWorkBenchState {
  serachByCode: boolean;
  subTotal: number;
  id: number;
  items: MaterialRequestionItem[];
  selectedItem: number;
  discount: string;
  freightCost: string;
  totalPrice: number;
  shipAndHandlingCost: string;
  files: IFileInfo[];
  hideDialog: boolean;
  message: string;
  purchaseOrders: PurchasingOrder[];
  shipTo: ShipTo[];
  vendors: Vendor[];
}
