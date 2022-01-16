import Approval from "../../Models/ClassModels/InvApproval";

export default interface IPRPendingApprovalsState {
  showSpinner: boolean;
  approvalItems: Approval[];
}
