import Vendor from "../../Models/ClassModels/Vendor";

export default interface IVendorService {
  getAll(): Promise<Vendor[]>;
  getById(id: number): Promise<Vendor>;
}
