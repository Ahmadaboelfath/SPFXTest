import Approval from "../../Models/ClassModels/InvApproval";
import IApprovalService from "./IInvApprovalService";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import IApprovalMapper from "../../Mappers/InvApprovalMapper/IInvApprovalMapper";
import ApprovalMapper from "../../Mappers/InvApprovalMapper/InvApprovalMapper";
import { IItemUpdateResult } from "@pnp/sp/items";

export default class InvApprovalService implements IApprovalService {
  private readonly _listName: string;
  private readonly _mapper: IApprovalMapper;

  constructor() {
    this._listName = "WarehouseApprovals";
    this._mapper = new ApprovalMapper();
  }
  async getApprovalsForCurrentLoggedInUser(
    userEmail: string
  ): Promise<Approval[]> {
    try {
      const approvalItems = await sp.web.lists
        .getByTitle(this._listName)
        .items.top(5000)
        .filter(`substringof('${userEmail}', Title) and Status eq 'Pending'`)
        .expand(
          "MaterialRequisition/Title,MaterialRequisition/PriorityValue,MaterialRequisition/Department,MaterialRequisition/RequesterEmail,MaterialRequisition/RequestType"
        )
        .select(
          "*,MaterialRequisition/Title,MaterialRequisition/PriorityValue,MaterialRequisition/Department,MaterialRequisition/RequesterEmail,MaterialRequisition/RequestType"
        )
        .orderBy("Id", false)
        .get();

      return approvalItems.map((approval) =>
        this._mapper.mapFromSPApprovalToApproval(approval)
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getApprovalsByMaterialRequesitionId(
    requisitionId: number
  ): Promise<Approval[]> {
    try {
      const items = await sp.web.lists
        .getByTitle(this._listName)
        .items.top(5000)
        .filter(`MaterialRequisitionId eq ${requisitionId}`)
        .expand(
          "MaterialRequisition/Title,MaterialRequisition/PriorityValue,MaterialRequisition/Department,MaterialRequisition/RequesterEmail,MaterialRequisition/RequestType"
        )
        .select(
          "*,MaterialRequisition/Title,MaterialRequisition/PriorityValue,MaterialRequisition/Department,MaterialRequisition/RequesterEmail,MaterialRequisition/RequestType"
        )
        .get();

      if (items.length > 0) {
        return items.map((item) => {
          return this._mapper.mapFromSPApprovalToApproval(item);
        });
      } else {
        return [];
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getApprovalById(id: number): Promise<Approval> {
    const approvalItem = await sp.web.lists
      .getByTitle(this._listName)
      .items.getById(id)
      .expand(
        "MaterialRequisition/Title,MaterialRequisition/PriorityValue,MaterialRequisition/Department,MaterialRequisition/RequesterEmail,MaterialRequisition/RequestType"
      )
      .select(
        "*,MaterialRequisition/Title,MaterialRequisition/PriorityValue,MaterialRequisition/Department,MaterialRequisition/RequesterEmail,MaterialRequisition/RequestType"
      )
      .get();

    return this._mapper.mapFromSPApprovalToApproval(approvalItem);
  }

  async updateApprovalStatus(
    id: number,
    status: string,
    userEmail: string
  ): Promise<Approval> {
    const approvalItemUpdate: IItemUpdateResult = await sp.web.lists
      .getByTitle(this._listName)
      .items.getById(id)
      .update({
        Status: status,
        ApprovalDate: new Date(),
        ApprovalActionExecutor: userEmail,
      });

    return await this.getApprovalById(id);
  }
}
