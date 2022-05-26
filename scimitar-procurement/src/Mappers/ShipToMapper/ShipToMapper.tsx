import ShipTo from "../../Models/ClassModels/ShipTo";
import IShipToMapper from "./IShipToMapper";

export default class ShipToMapper implements IShipToMapper {
  mapFromSPListItemObject(spListItem: any): ShipTo {
    throw new Error("Method not implemented.");
  }
}
