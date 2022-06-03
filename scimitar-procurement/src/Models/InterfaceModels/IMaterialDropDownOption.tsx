import { IDropdownOption } from "office-ui-fabric-react";
import MaterialRequestionItem from "../ClassModels/MaterialRequesitionItem";

export default interface IMaterialDropdownOption extends IDropdownOption {
  item: MaterialRequestionItem;
}
