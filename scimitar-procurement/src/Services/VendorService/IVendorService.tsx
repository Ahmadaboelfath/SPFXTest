import Vendor from "../../Models/ClassModels/Vendor";

export default interface IVendorService {
  getAll(): Promise<Vendor[]>;
  getById(): Promise<Vendor>;
}
