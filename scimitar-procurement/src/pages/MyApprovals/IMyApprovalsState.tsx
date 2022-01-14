import Approval from "../../Models/ClassModels/Approval";

export default interface IMyApprovalsState {
  showSpinner: boolean;
  approvalItems: Approval[];
}
