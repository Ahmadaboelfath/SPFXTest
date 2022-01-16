import InvApproval from "../../Models/ClassModels/InvApproval";

export default interface IInvApprovalMapper {
  mapFromSPApprovalToApproval(SPApproval: any): InvApproval;
}
