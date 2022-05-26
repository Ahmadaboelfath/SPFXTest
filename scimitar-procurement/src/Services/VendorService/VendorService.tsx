import Vendor from "../../Models/ClassModels/Vendor";
import IVendorService from "./IVendorService";

export default class VendorService implements IVendorService {
  getAll(): Promise<Vendor[]> {
    throw new Error("Method not implemented.");
  }
  getById(): Promise<Vendor> {
    throw new Error("Method not implemented.");
  }
}
