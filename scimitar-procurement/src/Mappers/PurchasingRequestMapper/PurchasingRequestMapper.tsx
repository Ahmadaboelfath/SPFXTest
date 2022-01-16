import PurchasingRequest from "../../Models/ClassModels/PurchasingRequest";
import IPurchasingRequestMapper from "./IPurchasingRequestMapper";

export default class PurchasingRequestMapper
  implements IPurchasingRequestMapper
{
  mapFromSPPurchasingReuqestToPurchasingRequest(
    SPPurchasingRequest: any
  ): PurchasingRequest {
    const purchaseRequest: PurchasingRequest = new PurchasingRequest(
      SPPurchasingRequest.Id
    );

    purchaseRequest.assignedTo = SPPurchasingRequest.AssignedTo
      ? SPPurchasingRequest.AssignedTo.Title
      : "";
    purchaseRequest.fieldManagerApproval =
      SPPurchasingRequest.FieldManagerApproval;
    purchaseRequest.materialRequesitionId =
      SPPurchasingRequest.MaterialRequesitionId;
    purchaseRequest.requestCode = SPPurchasingRequest.Title;
    purchaseRequest.assignedToId = SPPurchasingRequest.AssignedToId;

    return purchaseRequest;
  }
  mapFromPurchasingRequestToSPPurchasingReuqest(
    purchasingRequest: PurchasingRequest
  ): any {
    return {
      AssignedToId: purchasingRequest.assignedToId,
      MaterialRequesitionId: purchasingRequest.materialRequesitionId,
      FieldManagerApproval: purchasingRequest.fieldManagerApproval,
    };
  }
}
