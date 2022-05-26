import { DropdownItemProps } from "semantic-ui-react";
import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";

export interface IItemPropData {
  propName: string;
  value: any;
}

export interface MaterialRequesitionItemsDropDown extends DropdownItemProps {
  item: MaterialRequestionItem;
}
