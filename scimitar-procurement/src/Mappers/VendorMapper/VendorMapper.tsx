import Vendor from "../../Models/ClassModels/Vendor";
import IVendorMapper from "./IVendorMapper";

export default class VendorMapper implements IVendorMapper {
  mapFromSPListItemObject(spListItem: any): Vendor {
    throw new Error("Method not implemented.");
  }
}
