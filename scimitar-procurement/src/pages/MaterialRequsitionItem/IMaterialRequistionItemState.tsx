import { DropdownItemProps } from "semantic-ui-react";
import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";

export default interface IMaterialRequistionItemState {
  item: MaterialRequestionItem;
  showSpinner: boolean;
  statusOptions: DropdownItemProps[];
  showDialog: boolean;
  dialogMessage: string;
  dialogTitle: string;
  showFinalConfirmationDialog: boolean;
  currencyOptions: DropdownItemProps[];
  dialogConfirmationAction: () => void;
}
