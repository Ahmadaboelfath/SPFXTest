import { DropdownItemProps } from "semantic-ui-react";
import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";
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
}
