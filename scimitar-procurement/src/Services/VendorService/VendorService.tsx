import Vendor from "../../Models/ClassModels/Vendor";
import IVendorService from "./IVendorService";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import IVendorMapper from "../../Mappers/VendorMapper/IVendorMapper";
import VendorMapper from "../../Mappers/VendorMapper/VendorMapper";

export default class VendorService implements IVendorService {
  private readonly _mapper: IVendorMapper;
  constructor() {
    this._mapper = new VendorMapper();
  }

  async getAll(): Promise<Vendor[]> {
    try {
      const retrievedItems = await sp.web.lists
        .getByTitle("Vendors")
        .items.get();
      return retrievedItems.map((item) =>
        this._mapper.mapFromSPListItemObject(item)
      );
    } catch (e) {
      throw new Error(
        `the following error occurred while retrieving the items: ${e.message}`
      );
    }
  }
  async getById(id: number): Promise<Vendor> {
    try {
      const retrievedItem = await sp.web.lists
        .getByTitle("Vendors")
        .items.getById(id);
      return this._mapper.mapFromSPListItemObject(retrievedItem);
    } catch (e) {
      throw new Error(
        `the following error occurred while retrieving the item: ${e.message}`
      );
    }
  }
}
