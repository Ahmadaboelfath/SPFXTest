import Approval from "../../Models/ClassModels/Approval";

export default interface IApprovalBusinessLogic {
  getApprovalById(id: number): Promise<Approval>;
  approveRequest(id: number, userEmail: string): Promise<Approval>;
  rejectRequest(id: number, userEmail: string): Promise<Approval>;
}
