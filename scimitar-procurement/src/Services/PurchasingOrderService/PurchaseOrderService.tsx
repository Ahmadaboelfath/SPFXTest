import PurchasingOrder from "../../Models/ClassModels/PurchasingOrder";
import IPurchaseOrderService from "./IPurchaseOrderService";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import IPurchaseOrderMapper from "../../Mappers/PurchaseOrderMapper/IPurchaseOrderMapper";
import PurchaseOrderMapper from "../../Mappers/PurchaseOrderMapper/PurchaseOrderMapper";
import { IItemUpdateResult } from "@pnp/sp/items";

export default class PurchasingOrderService implements IPurchaseOrderService {
  private readonly purchaseOrderMapper: IPurchaseOrderMapper;
  constructor() {
    this.purchaseOrderMapper = new PurchaseOrderMapper();
  }

  async getByStatus(status: string): Promise<PurchasingOrder[]> {
    try {
      const items = await sp.web.lists
        .getByTitle("PurchasingOrder")
        .items.filter(`Status eq ${status}`)
        .expand("Requestor/EMail")
        .select("*,Requestor/EMail")
        .get();

      if (items.length > 0) {
        return items.map((item) =>
          this.purchaseOrderMapper.mapFromSPListItemObject(item)
        );
      } else {
        return [];
      }
    } catch (e) {
      throw new Error(
        `the following error occurred while retrieving your assigned po:${e.message}`
      );
    }
  }

  async getByRequesteor(requestorId: number): Promise<PurchasingOrder[]> {
    try {
      const items = await sp.web.lists
        .getByTitle("PurchasingOrder")
        .items.filter(`RequestorId eq ${requestorId}`)
        .expand(
          "Requestor/EMail,ShipTo/Title,ShipMethod/Title,Vendor/Title,Status/Title"
        )
        .select(
          "*,Requestor/EMail,ShipTo/Title,ShipMethod/Title,Vendor/Title,Status/Title"
        )
        .get();

      if (items.length > 0) {
        return items.map((item) =>
          this.purchaseOrderMapper.mapFromSPListItemObject(item)
        );
      } else {
        return [];
      }
    } catch (e) {
      throw new Error(
        `the following error occurred while retrieving your assigned po:${e.message}`
      );
    }
  }
  async getById(id: number): Promise<PurchasingOrder> {
    try {
      const item = await sp.web.lists
        .getByTitle("PurchasingOrder")
        .items.getById(id)
        .expand("Requestor/EMail")
        .select("*,Requestor/EMail")
        .get();

      return this.purchaseOrderMapper.mapFromSPListItemObject(item);
    } catch (e) {
      throw new Error(
        "Item you're looking for is not found it may have been moved or deleted by someone else"
      );
    }
  }
  async add(purchaseOrder: PurchasingOrder): Promise<PurchasingOrder> {
    try {
      const itemToBeAdded =
        this.purchaseOrderMapper.mapToSPListItemObject(purchaseOrder);
      const addResult = await sp.web.lists
        .getByTitle("PurchasingOrder")
        .items.add(itemToBeAdded);

      return this.purchaseOrderMapper.mapFromSPListItemObject(addResult.data);
    } catch (e) {
      throw new Error(e);
    }
  }
  async edit(purchaseOrder: PurchasingOrder): Promise<PurchasingOrder> {
    try {
      const itemToBeUpdated =
        this.purchaseOrderMapper.mapToSPListItemObject(purchaseOrder);
      const itemUpdated: IItemUpdateResult = await sp.web.lists
        .getByTitle("PurchasingOrder")
        .items.getById(purchaseOrder.id)
        .update(itemToBeUpdated);
      return this.getById(purchaseOrder.id);
    } catch (e) {
      throw new Error(`error occurred while updating the item: ${e.message}`);
    }
  }
  async delete(purchaseOrder: PurchasingOrder): Promise<PurchasingOrder> {
    try {
      const deleted = await sp.web.lists
        .getByTitle("PurchasingOrder")
        .items.getById(purchaseOrder.id)
        .delete();
      return purchaseOrder;
    } catch (e) {
      throw new Error(
        `unexpected error occurred while deleting the item: ${e.message}`
      );
    }
  }
}
