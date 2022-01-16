import PurchasingRequestApproval from "../../Models/ClassModels/PurchasingRequestApproval";
import IPurchasingRequestApprovalService from "./IPurchasingRequestApprovalService";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import IPurchasingRequestApprovalMapper from "../../Mappers/PurchasingRequestApprovalMapper/IPurchasingRequestApprovalMapper";
import PurchasingRequestApprovalMapper from "../../Mappers/PurchasingRequestApprovalMapper/PurchasingRequestApprovalMapper";

export default class PurchasingRequestApprovalService
  implements IPurchasingRequestApprovalService
{
  private readonly _mapper: IPurchasingRequestApprovalMapper;
  private readonly _listName: string;

  constructor() {
    this._mapper = new PurchasingRequestApprovalMapper();
    this._listName = "PurchasingRequestsApprovals";
  }
  async getApprovalById(id: number): Promise<PurchasingRequestApproval> {
    try {
      const item = await sp.web.lists
        .getByTitle(this._listName)
        .items.getById(id)
        .get();

      return this._mapper.mapFromSPPurchaseRequestApprovalToPurchasingRequestApproval(
        item
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getPurchasingApprovalsByEmail(
    email: string
  ): Promise<PurchasingRequestApproval[]> {
    try {
      const approvals = await sp.web.lists
        .getByTitle(this._listName)
        .items.filter(`(Title eq '${email}') and (Status eq 'Pending')`)
        .get();

      return approvals.map((approval) =>
        this._mapper.mapFromSPPurchaseRequestApprovalToPurchasingRequestApproval(
          approval
        )
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async updatePurchasingRequestApproval(
    purchasingRequestApproval: PurchasingRequestApproval
  ): Promise<PurchasingRequestApproval> {
    const mappedSPItem =
      this._mapper.mapFromPurchasingRequestApprovalToSPPurchaseRequestApproval(
        purchasingRequestApproval
      );
    try {
      const updated = await sp.web.lists
        .getByTitle(this._listName)
        .items.getById(purchasingRequestApproval.id)
        .update(mappedSPItem);

      return purchasingRequestApproval;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}