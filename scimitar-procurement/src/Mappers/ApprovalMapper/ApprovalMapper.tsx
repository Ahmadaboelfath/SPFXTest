import Approval from "../../Models/ClassModels/Approval";
import IApprovalMapper from "./IApprovalMapper";

export default class ApprovalMapper implements IApprovalMapper {
  mapFromSPApprovalToApproval(SPApproval: any): Approval {
    const approval: Approval = new Approval(SPApproval.Id);
    approval.status = SPApproval.Status;
    approval.approver = SPApproval.Title;
    approval.approvalDate = SPApproval.ApprovalDate
      ? new Date(SPApproval.ApprovalDate)
      : null;
    approval.approvalActionExecutor = SPApproval.ApprovalActionExecutor;
    approval.materialRequesitionId = SPApproval.MaterialRequisitionId;
    approval.materialRequistionCode = SPApproval.MaterialRequisition.Title;
    approval.priority = SPApproval.MaterialRequisition.PriorityValue;
    approval.department = SPApproval.MaterialRequisition.Department;
    approval.requester = SPApproval.MaterialRequisition.RequesterEmail;

    return approval;
  }
}
