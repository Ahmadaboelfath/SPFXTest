import Approval from "../../Models/ClassModels/Approval";
import IApprovalService from "./IApprovalService";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import IApprovalMapper from "../../Mappers/ApprovalMapper/IApprovalMapper";
import ApprovalMapper from "../../Mappers/ApprovalMapper/ApprovalMapper";
import { IItemUpdateResult } from "@pnp/sp/items";

export default class ApprovalService implements IApprovalService {
  private readonly _listName: string;
  private readonly _mapper: IApprovalMapper;

  constructor() {
    this._listName = "Approvals";
    this._mapper = new ApprovalMapper();
  }
  async getApprovalsForCurrentLoggedInUser(
    userEmail: string
  ): Promise<Approval[]> {
    try {
      const approvalItems = await sp.web.lists
        .getByTitle(this._listName)
        .items.filter(`Title eq '${userEmail}' and Status eq 'Pending'`)
        .expand(
          "MaterialRequisition/Title,MaterialRequisition/PriorityValue,MaterialRequisition/Department,MaterialRequisition/RequesterEmail"
        )
        .select(
          "*,MaterialRequisition/Title,MaterialRequisition/PriorityValue,MaterialRequisition/Department,MaterialRequisition/RequesterEmail"
        )
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
        .items.filter(`MaterialRequisitionId eq ${requisitionId}`)
        .expand(
          "MaterialRequisition/Title,MaterialRequisition/PriorityValue,MaterialRequisition/Department,MaterialRequisition/RequesterEmail"
        )
        .select(
          "*,MaterialRequisition/Title,MaterialRequisition/PriorityValue,MaterialRequisition/Department,MaterialRequisition/RequesterEmail"
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
        "MaterialRequisition/Title,MaterialRequisition/PriorityValue,MaterialRequisition/Department,MaterialRequisition/RequesterEmail"
      )
      .select(
        "*,MaterialRequisition/Title,MaterialRequisition/PriorityValue,MaterialRequisition/Department,MaterialRequisition/RequesterEmail"
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
