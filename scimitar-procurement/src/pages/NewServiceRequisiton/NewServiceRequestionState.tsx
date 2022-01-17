import { ITag } from "office-ui-fabric-react";
import { DropdownItemProps } from "semantic-ui-react";
import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";
import MaterialRequesitionFormViewModel from "../../Models/ViewModels/MaterialRequesitionFormViewModel";

export default interface NewServiceRequestionState {
  viewModel: MaterialRequesitionFormViewModel;
  subFormModel: MaterialRequestionItem;
  showSubForm: boolean;
  showSpinner: boolean;
  searchByCode: boolean;
  showConfrimationDialog: boolean;
  dialogTitle: string;
  dialogMessage: string;
  showFinalConfirmationDialog: boolean;
  subFormInEditMode: boolean;
  currentlyEditingIndex: number;
  departments: DropdownItemProps[];
  selectedDepartment: DropdownItemProps;
  errors: any;
  formIsValid: boolean;

  dialogConfirmationAction: () => void;
}
