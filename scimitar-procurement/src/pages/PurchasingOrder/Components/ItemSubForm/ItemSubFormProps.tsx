import MaterialRequesition from "../../../../Models/ClassModels/MaterialRequesition";
import MaterialRequestionItem from "../../../../Models/ClassModels/MaterialRequesitionItem";
import IMaterialDropdownOption from "../../../../Models/InterfaceModels/IMaterialDropDownOption";

export default interface ItemSubFormProps {
  options: IMaterialDropdownOption[];
  handleChange(item, selectedKey): void;
  selectedKey: number;
  selectedItem: MaterialRequestionItem;
  dropdownDisabled: boolean;
}
