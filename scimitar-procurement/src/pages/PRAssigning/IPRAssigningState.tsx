import Approval from "../../Models/ClassModels/InvApproval";
import MaterialRequesitionFormViewModel from "../../Models/ViewModels/MaterialRequesitionFormViewModel";

export default interface IPRAssigningState {
  viewModel: MaterialRequesitionFormViewModel;
  approvalItem: Approval;
  showSpinner: boolean;
  showConfirmationDialog: boolean;
  showFinalConfirmationDialog: boolean;
  dialogMessage: string;
  dialogTitle: string;
  showError: boolean;
  submissionAction: () => void;
}
