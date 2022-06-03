import ShipTo from "../../Models/ClassModels/ShipTo";
import IShipToService from "./IShipToService";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import IShipToMapper from "../../Mappers/ShipToMapper/IShipToMapper";
import ShipToMapper from "../../Mappers/ShipToMapper/ShipToMapper";

export default class ShipToService implements IShipToService {
  private readonly mapper: IShipToMapper;
  constructor() {
    this.mapper = new ShipToMapper();
  }

  async getAll(): Promise<ShipTo[]> {
    try {
      const items = await sp.web.lists.getByTitle("ShipTo").items.get();
      return items.map((item) => this.mapper.mapFromSPListItemObject(item));
    } catch (e) {
      throw new Error(
        `Following error occurred while retrieving shipTo items : ${e.message}`
      );
    }
  }
  async getById(id: number): Promise<ShipTo> {
    try {
      const item = await sp.web.lists
        .getByTitle("ShipTo")
        .items.getById(id)
        .get();
      return this.mapper.mapFromSPListItemObject(item);
    } catch (e) {
      throw new Error(
        `Following error occurred while retrieving shipTo items : ${e.message}`
      );
    }
  }
}
