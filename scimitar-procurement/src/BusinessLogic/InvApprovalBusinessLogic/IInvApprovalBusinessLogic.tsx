import InvApproval from "../../Models/ClassModels/InvApproval";

export default interface IInvApprovalBusinessLogic {
  getApprovalById(id: number): Promise<InvApproval>;
  getApprovalByUserEmail(userEmail: string): Promise<InvApproval[]>;

  InStock(id: number, userEmail: string): Promise<InvApproval>;
  OutOfStock(id: number, userEmail: string): Promise<InvApproval>;
  CancelRequest(approval: InvApproval, userEmail: string): Promise<InvApproval>;
}
