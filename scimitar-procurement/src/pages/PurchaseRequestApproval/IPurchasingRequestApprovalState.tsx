import Approval from "../../Models/ClassModels/InvApproval";
import PurchasingRequestApproval from "../../Models/ClassModels/PurchasingRequestApproval";
import MaterialRequesitionFormViewModel from "../../Models/ViewModels/MaterialRequesitionFormViewModel";
import PurchasingRequestApprovalViewModel from "../../Models/ViewModels/PurchasingRequestApprovalViewModel";

export default interface IPurchasingRequestApprovalState {
  viewModel: PurchasingRequestApprovalViewModel;
  approvalItem: PurchasingRequestApproval;
  showSpinner: boolean;
  showConfirmationDialog: boolean;
  showFinalConfirmationDialog: boolean;
  dialogMessage: string;
  dialogTitle: string;
  showError: boolean;
  submissionAction: () => void;
}
