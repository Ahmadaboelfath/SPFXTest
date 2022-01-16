import PurchasingRequestApproval from "../../Models/ClassModels/PurchasingRequestApproval";
import PurchasingRequestApprovalViewModel from "../../Models/ViewModels/PurchasingRequestApprovalViewModel";
import PurchasingRequestViewModel from "../../Models/ViewModels/PurchasingRequestViewModel";
import IPurchasingRequestApprovalService from "../../Services/PurchasingRequestApprovalService/IPurchasingRequestApprovalService";
import PurchasingRequestApprovalService from "../../Services/PurchasingRequestApprovalService/PurchasingRequestApprovalService";
import IPurchasingRequestBusinessLogic from "../PurchasingRequestBusinessLogic/IPurchasingRequestBusinessLogic";
import PurchasingRequestBusinessLogic from "../PurchasingRequestBusinessLogic/PurchasingRequestBusinessLogic";
import IPurchasingRequestApprovalBusinessLogic from "./IPurchasingRequestApprovalBusinessLogic";

export default class PurchasingRequestApprovalBusinessLogic
  implements IPurchasingRequestApprovalBusinessLogic
{
  private readonly _purchasingRequestApprovalService: IPurchasingRequestApprovalService;
  private readonly _purchasingReuqestBusinessLogic: IPurchasingRequestBusinessLogic;

  constructor() {
    this._purchasingRequestApprovalService =
      new PurchasingRequestApprovalService();
    this._purchasingReuqestBusinessLogic = new PurchasingRequestBusinessLogic();
  }

  async getApprovalsByEmail(
    email: string
  ): Promise<PurchasingRequestApproval[]> {
    try {
      return await this._purchasingRequestApprovalService.getPurchasingApprovalsByEmail(
        email
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async getApprovalDetailsById(
    id: number
  ): Promise<PurchasingRequestApprovalViewModel> {
    const purchaseRequestApproval =
      await this._purchasingRequestApprovalService.getApprovalById(id);

    const purchaseRequestDetails =
      await this._purchasingReuqestBusinessLogic.getPurchasingRequestDetailsById(
        purchaseRequestApproval.purchasingRequestId
      );

    const viewModel = new PurchasingRequestApprovalViewModel();
    viewModel.purchasingApproval = purchaseRequestApproval;
    viewModel.purchasingRequestViewModel = purchaseRequestDetails;
    return viewModel;
  }
  async approveRequest(
    request: PurchasingRequestApproval,
    loggedInUser: string
  ): Promise<PurchasingRequestApproval> {
    const approvedRequest = new PurchasingRequestApproval(null, request);
    approvedRequest.status = "Approved";
    approvedRequest.executioner = loggedInUser;
    approvedRequest.approvalDate = new Date();
    return await this._purchasingRequestApprovalService.updatePurchasingRequestApproval(
      approvedRequest
    );
  }
  async rejectRequest(
    request: PurchasingRequestApproval,
    loggedInUser: string
  ): Promise<PurchasingRequestApproval> {
    const approvedRequest = new PurchasingRequestApproval(null, request);
    approvedRequest.status = "Rejected";
    approvedRequest.executioner = loggedInUser;
    approvedRequest.approvalDate = new Date();
    return await this._purchasingRequestApprovalService.updatePurchasingRequestApproval(
      approvedRequest
    );
  }
}
