import ShipTo from "../../Models/ClassModels/ShipTo";

export default interface IShipToService {
  getAll(): Promise<ShipTo[]>;
  getById(id: number): Promise<ShipTo>;
}
