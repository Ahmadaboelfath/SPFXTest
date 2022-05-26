import ShipTo from "../../Models/ClassModels/ShipTo";

export default interface IShipToMapper {
  mapFromSPListItemObject(spListItem: any): ShipTo;
}
