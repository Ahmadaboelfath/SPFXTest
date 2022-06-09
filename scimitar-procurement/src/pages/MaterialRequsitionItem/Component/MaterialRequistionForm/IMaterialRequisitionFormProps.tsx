import { DropdownItemProps } from "semantic-ui-react";
import MaterialRequestionItem from "../../../../Models/ClassModels/MaterialRequesitionItem";
import { ViewMode } from "../../ViewMode";

export default interface IMaterialRequisitionFormProps {
  item: MaterialRequestionItem;
  viewMode: ViewMode;
  statusOptions: DropdownItemProps[];
  onChange(value, ctrlName): void;
  currencyOptions: DropdownItemProps[];
}
