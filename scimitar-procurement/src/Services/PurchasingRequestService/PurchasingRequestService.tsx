import PurchasingRequest from "../../Models/ClassModels/PurchasingRequest";
import IPurchasingRequestService from "./IPurchasingRequestService";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import IPurchasingRequestMapper from "../../Mappers/PurchasingRequestMapper/IPurchasingRequestMapper";
import PurchasingRequestMapper from "../../Mappers/PurchasingRequestMapper/PurchasingRequestMapper";

export default class PurchasingRequestService
  implements IPurchasingRequestService
{
  private readonly _mapper: IPurchasingRequestMapper;
  private readonly _listName: string;

  constructor() {
    this._listName = "PurchasingRequest";
    this._mapper = new PurchasingRequestMapper();
  }
  async getApprovedPurchasingRequests(): Promise<PurchasingRequest[]> {
    try {
      const items = await sp.web.lists
        .getByTitle(this._listName)
        .items.filter("FieldManagerApproval eq 'Approved'")
        .get();

      return items.map((pr) =>
        this._mapper.mapFromSPPurchasingReuqestToPurchasingRequest(pr)
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async updatePurchaseRequest(
    purchasingRequest: PurchasingRequest
  ): Promise<PurchasingRequest> {
    try {
      const mappedSPItem =
        this._mapper.mapFromPurchasingRequestToSPPurchasingReuqest(
          purchasingRequest
        );

      const updated = await sp.web.lists
        .getByTitle(this._listName)
        .items.getById(purchasingRequest.id)
        .update(mappedSPItem);

      return purchasingRequest;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getById(id: number): Promise<PurchasingRequest> {
    try {
      const purchaseRequest = await sp.web.lists
        .getByTitle(this._listName)
        .items.getById(id)
        .expand("AssignedTo/EMail, AssignedTo/Title")
        .select("*,AssignedTo/EMail, AssignedTo/Title")
        .get();

      return this._mapper.mapFromSPPurchasingReuqestToPurchasingRequest(
        purchaseRequest
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
