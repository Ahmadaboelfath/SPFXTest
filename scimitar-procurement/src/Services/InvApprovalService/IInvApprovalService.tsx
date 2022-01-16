import Approval from "../../Models/ClassModels/InvApproval";

export default interface IInvApprovalService {
  getApprovalsByMaterialRequesitionId(
    requisitionId: number
  ): Promise<Approval[]>;
  getApprovalById(id: number): Promise<Approval>;
  updateApprovalStatus(
    id: number,
    status: string,
    userEmail: string
  ): Promise<Approval>;

  getApprovalsForCurrentLoggedInUser(userEmail: string): Promise<Approval[]>;
}
