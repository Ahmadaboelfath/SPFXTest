import PurchasingRequest from "../../Models/ClassModels/PurchasingRequest";
import MaterialRequesitionFormViewModel from "../../Models/ViewModels/MaterialRequesitionFormViewModel";
import PurchasingRequestViewModel from "../../Models/ViewModels/PurchasingRequestViewModel";
import IPurchasingRequestService from "../../Services/PurchasingRequestService/IPurchasingRequestService";
import PurchasingRequestService from "../../Services/PurchasingRequestService/PurchasingRequestService";
import IMaterialRequesitionBusinessLogic from "../MaterialRequisitionBusinessLogic/IMaterialRequesitionBusinessLogic";
import MaterialRequesitionBusinessLogic from "../MaterialRequisitionBusinessLogic/MaterialRequesitionBusinessLogic";
import IPurchasingRequestBusinessLogic from "./IPurchasingRequestBusinessLogic";

export default class PurchasingRequestBusinessModel
  implements IPurchasingRequestBusinessLogic
{
  private readonly _materialRequisitionBusinessLogic: IMaterialRequesitionBusinessLogic;
  private readonly _purchasingRequestService: IPurchasingRequestService;
  constructor() {
    this._materialRequisitionBusinessLogic =
      new MaterialRequesitionBusinessLogic();

    this._purchasingRequestService = new PurchasingRequestService();
  }
  async getAllApprovedOrPendingPurchasingRequests(): Promise<
    PurchasingRequest[]
  > {
    return await this._purchasingRequestService.getAllApprovedOrPendingPurchasingRequests();
  }
  async cancelPurchasingRequesition(
    purchaseRequest: PurchasingRequest
  ): Promise<PurchasingRequest> {
    purchaseRequest.fieldManagerApproval = "Cancelled";
    return this._purchasingRequestService.updatePurchaseRequest(
      purchaseRequest
    );
  }

  async getAllApprovedPurchasingRequests(): Promise<PurchasingRequest[]> {
    return await this._purchasingRequestService.getApprovedPurchasingRequests();
  }

  async getPurchasingRequestDetailsById(
    id: number
  ): Promise<PurchasingRequestViewModel> {
    try {
      const purchaseRequest: PurchasingRequest =
        await this._purchasingRequestService.getById(id);

      const materialRequisition: MaterialRequesitionFormViewModel =
        await this._materialRequisitionBusinessLogic.getMaterialRequisitionById(
          parseInt(purchaseRequest.materialRequesitionId)
        );

      const viewModel: PurchasingRequestViewModel =
        new PurchasingRequestViewModel();
      viewModel.purchaseRequest = purchaseRequest;
      viewModel.materialRequisition = materialRequisition.materialRequesition;
      viewModel.materialRequeisitionItems = materialRequisition.materialItems;
      return viewModel;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async assignUserForPurchasingRequest(
    id: number,
    purchasingRequest: PurchasingRequest
  ): Promise<PurchasingRequest> {
    return await this._purchasingRequestService.updatePurchaseRequest(
      purchasingRequest
    );
  }
}
