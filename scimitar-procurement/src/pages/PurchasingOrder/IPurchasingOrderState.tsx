import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";
import IMaterialDropdownOption from "../../Models/InterfaceModels/IMaterialDropDownOption";
import PurchasingOrderViewModel from "../../Models/ViewModels/PurchasingOrderViewModel";

export default interface IPurchasingOrderState {
  viewModel: PurchasingOrderViewModel;
  showItemSubForm: boolean;
  showLoader: boolean;
  itemNotAssignedToPO: IMaterialDropdownOption[];
  selectedkey: number;
  selectedItem: MaterialRequestionItem;
  itemsDropdownDisabled: boolean;
  lookups: any;
  disableDropDowns: boolean;
  showConfirmationDialog: boolean;
  showFinalConfirmationDialog: boolean;
  dialogMessage: string;
  dialogTitle: string;
  submissionAction: () => void;
  deletedItems: MaterialRequestionItem[];
  revised: boolean;
  errors: any;
}
