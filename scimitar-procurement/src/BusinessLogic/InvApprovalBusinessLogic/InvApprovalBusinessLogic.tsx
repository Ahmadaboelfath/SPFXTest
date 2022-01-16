import InvApproval from "../../Models/ClassModels/InvApproval";
import ApprovalService from "../../Services/InvApprovalService/InvApprovalService";
import IInvApprovalService from "../../Services/InvApprovalService/IInvApprovalService";
import IInvApprovalBusinessLogic from "./IInvApprovalBusinessLogic";

export default class InvApprovalBusinessLogic
  implements IInvApprovalBusinessLogic
{
  private _approvalService: IInvApprovalService;

  constructor() {
    this._approvalService = new ApprovalService();
  }

  async getApprovalById(id: number): Promise<InvApproval> {
    return await this._approvalService.getApprovalById(id);
  }
  async getApprovalByUserEmail(userEmail: string): Promise<InvApproval[]> {
    return await this._approvalService.getApprovalsForCurrentLoggedInUser(
      userEmail
    );
  }

  async InStock(id: number, userEmail: string): Promise<InvApproval> {
    return await this._approvalService.updateApprovalStatus(
      id,
      "InStock",
      userEmail
    );
  }
  async OutOfStock(id: number, userEmail: string): Promise<InvApproval> {
    return await this._approvalService.updateApprovalStatus(
      id,
      "OutOfStock",
      userEmail
    );
  }
}
