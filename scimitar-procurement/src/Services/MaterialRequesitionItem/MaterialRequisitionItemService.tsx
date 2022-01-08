import IMaterialRequesitionItemMapper from "../../Mappers/MaterialRequesitionItemMapper/IMaterialRequesitionItemMapper";
import MaterialRequestionItemMapper from "../../Mappers/MaterialRequesitionItemMapper/MaterialRequesitionItemMapper";
import MaterialRequesitionItem from "../../Models/ClassModels/MaterialRequesitionItem";
import IMaterialRequisitionItemService from "./IMaterialRequisitionItemService";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export default class MaterialRequisitionItemService
  implements IMaterialRequisitionItemService
{
  private readonly _listName: string;
  private readonly _mapper: IMaterialRequesitionItemMapper;

  constructor() {
    this._listName = "MaterialRequisitionItems";
    this._mapper = new MaterialRequestionItemMapper();
  }
  async getMaterialRequesitionItemsByRequesitionId(
    id: number
  ): Promise<MaterialRequesitionItem[]> {
    try {
      const items = await sp.web.lists
        .getByTitle(this._listName)
        .items.filter(`MaterialRequesition eq ${id}`)
        .expand("Material/Code, Material/Title")
        .select("*,Material/Code, Material/Title")
        .get();

      if (items.length > 0) {
        return items.map((item) =>
          this._mapper.mapFromSPMaterialRequesitionItemToMaterialRequesitionItem(
            item
          )
        );
      } else {
        return [];
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async addMaterialRequesitionItem(
    materialRequesitionItem: MaterialRequesitionItem
  ): Promise<MaterialRequesitionItem> {
    const toBeAdded =
      this._mapper.mapFromMaterialRequesitionItemToSPMaterialRequesitionItem(
        materialRequesitionItem
      );
    const addedItem = await sp.web.lists
      .getByTitle(this._listName)
      .items.add(toBeAdded);

    const item = await sp.web.lists
      .getByTitle(this._listName)
      .items.getById(addedItem.data.Id)
      .expand("Material/Code, Material/Title")
      .select("*,Material/Code, Material/Title")
      .get();

    return this._mapper.mapFromSPMaterialRequesitionItemToMaterialRequesitionItem(
      item
    );
  }
}
