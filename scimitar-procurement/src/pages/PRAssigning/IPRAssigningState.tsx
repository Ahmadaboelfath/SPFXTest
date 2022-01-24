import Approval from "../../Models/ClassModels/InvApproval";
import PurchasingRequest from "../../Models/ClassModels/PurchasingRequest";
import MaterialRequesitionFormViewModel from "../../Models/ViewModels/MaterialRequesitionFormViewModel";
import PurchasingRequestViewModel from "../../Models/ViewModels/PurchasingRequestViewModel";
import { IUserLookup } from "../../Models/ClassModels/userModels";
import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";

export default interface IPRAssigningState {
  viewModel: PurchasingRequestViewModel;
  purchasingRequest: PurchasingRequest;
  showSpinner: boolean;
  showConfirmationDialog: boolean;
  showFinalConfirmationDialog: boolean;
  dialogMessage: string;
  dialogTitle: string;
  showError: boolean;
  submissionAction: () => void;
  userLookup: IUserLookup[];
  assigneePickerErrorMessage: string;
  assigneePickerError: boolean;
  formIsValid: boolean;
  currentUserRole: string;
  isAdmin: boolean;
  showMaterialItemForm: boolean;
  currentlyEditingIndex: number;
  currentlyEditingItem: MaterialRequestionItem;
}
