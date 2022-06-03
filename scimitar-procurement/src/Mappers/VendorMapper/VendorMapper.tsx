import Vendor from "../../Models/ClassModels/Vendor";
import IVendorMapper from "./IVendorMapper";

export default class VendorMapper implements IVendorMapper {
  mapFromSPListItemObject(spListItem: any): Vendor {
    const vendor = new Vendor();
    vendor.id = spListItem.Id;
    vendor.address = spListItem.Address;
    vendor.fax = spListItem.Fax;
    vendor.phone = spListItem.Phone;
    vendor.title = spListItem.Title;

    return vendor;
  }
}
