import Approval from "../../Models/ClassModels/Approval";

export default interface IApprovalService {
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
