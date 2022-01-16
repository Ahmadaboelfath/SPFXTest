import Approval from "../../Models/ClassModels/InvApproval";

export default interface InvApprovalsState {
  showSpinner: boolean;
  approvalItems: Approval[];
}
