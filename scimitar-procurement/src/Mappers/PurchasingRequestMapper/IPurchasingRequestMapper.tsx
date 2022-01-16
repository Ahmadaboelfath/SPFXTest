import PurchasingRequest from "../../Models/ClassModels/PurchasingRequest";

export default interface IPurchasingRequestMapper {
  mapFromSPPurchasingReuqestToPurchasingRequest(
    SPPurchasingRequest
  ): PurchasingRequest;

  mapFromPurchasingRequestToSPPurchasingReuqest(
    purchasingRequest: PurchasingRequest
  ): any;
}
