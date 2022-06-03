import ShipTo from "../../Models/ClassModels/ShipTo";
import IShipToMapper from "./IShipToMapper";

export default class ShipToMapper implements IShipToMapper {
  mapFromSPListItemObject(spListItem: any): ShipTo {
    const shipToMapped: ShipTo = new ShipTo();
    shipToMapped.address = spListItem.Address;
    shipToMapped.id = spListItem.Id;
    shipToMapped.attention = spListItem.Attention;
    shipToMapped.title = spListItem.Title;
    shipToMapped.phone = spListItem.Phone;
    shipToMapped.fax = spListItem.Fax;
    shipToMapped.email = spListItem.Email;

    return shipToMapped;
  }
}
