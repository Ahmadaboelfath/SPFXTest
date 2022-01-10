import Approval from "../../Models/ClassModels/Approval";
import MaterialRequesitionFormViewModel from "../../Models/ViewModels/MaterialRequesitionFormViewModel";

export default interface IMaterialRequistionApprovalState {
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
