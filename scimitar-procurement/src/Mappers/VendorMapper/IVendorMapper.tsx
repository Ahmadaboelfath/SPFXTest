import Vendor from "../../Models/ClassModels/Vendor";

export default interface IVendorMapper {
  mapFromSPListItemObject(spListItem: any): Vendor;
}
