export default interface IApprovalBusinessLogic {
  getApprovalById(id: number);
  approveRequest(id: number, status: string, userEmail: string);
  rejectRequest(id: number, status: string, userEmail: string);
}
