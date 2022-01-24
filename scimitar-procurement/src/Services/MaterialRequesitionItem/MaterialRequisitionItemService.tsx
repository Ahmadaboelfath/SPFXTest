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

  private async getById(id: number): Promise<MaterialRequesitionItem> {
    try {
      const item = await sp.web.lists
        .getByTitle(this._listName)
        .items.getById(id)
        .expand("Material/Code, Material/Title, Material/UnitValue")
        .select("*,Material/Code, Material/Title, Material/UnitValue")
        .get();
      return this._mapper.mapFromSPMaterialRequesitionItemToMaterialRequesitionItem(
        item
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteItem(item: MaterialRequesitionItem): Promise<boolean> {
    try {
      const deleteResult = await sp.web.lists
        .getByTitle(this._listName)
        .items.getById(parseInt(item.id))
        .delete();

      return true;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async updateItem(
    item: MaterialRequesitionItem
  ): Promise<MaterialRequesitionItem> {
    const mappedItem =
      this._mapper.mapFromMaterialRequesitionItemToSPMaterialRequesitionItem(
        item
      );
    try {
      const updatedItem = await sp.web.lists
        .getByTitle(this._listName)
        .items.getById(parseInt(item.id))
        .update(mappedItem);
      // const itemAterUpdate = updatedItem.item
      //   .expand("Material/Code, Material/Title, Material/UnitValue")
      //   .select("*,Material/Code, Material/Title, Material/UnitValue")
      //   .get();
      return item;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getMaterialRequesitionItemsByRequesitionId(
    id: number
  ): Promise<MaterialRequesitionItem[]> {
    try {
      const items = await sp.web.lists
        .getByTitle(this._listName)
        .items.filter(`MaterialRequesition eq ${id}`)
        .expand("Material/Code, Material/Title, Material/UnitValue")
        .select("*,Material/Code, Material/Title, Material/UnitValue")
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
      .expand("Material/Code, Material/Title, Material/UnitValue")
      .select("*,Material/Code, Material/Title, Material/UnitValue")
      .get();

    return this._mapper.mapFromSPMaterialRequesitionItemToMaterialRequesitionItem(
      item
    );
  }
}
