import Approval from "../../Models/ClassModels/Approval";

export default interface IApprovalMapper {
  mapFromSPApprovalToApproval(SPApproval: any): Approval;
}
