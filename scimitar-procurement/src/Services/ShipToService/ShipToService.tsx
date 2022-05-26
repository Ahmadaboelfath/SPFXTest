import ShipTo from "../../Models/ClassModels/ShipTo";
import IShipToService from "./IShipToService";

export default class ShipToService implements IShipToService {
  getAll(): Promise<ShipTo[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: number): Promise<ShipTo> {
    throw new Error("Method not implemented.");
  }
}
