import ApprovalService from "../../Services/ApprovalService/ApprovalService";
import IApprovalService from "../../Services/ApprovalService/IApprovalService";
import IApprovalBusinessLogic from "./IApprovalBusinessLogic";

export default class ApprovalBusinessLogic implements IApprovalBusinessLogic {
  private _approvalService: IApprovalService;

  constructor() {
    this._approvalService = new ApprovalService();
  }

  async getApprovalById(id: number) {
    return await this._approvalService.getApprovalById(id);
  }
  async approveRequest(id: number, userEmail: string) {
    return await this._approvalService.updateApprovalStatus(
      id,
      "Approved",
      userEmail
    );
  }
  async rejectRequest(id: number, userEmail: string) {
    return await this._approvalService.updateApprovalStatus(
      id,
      "Rejected",
      userEmail
    );
  }
}
