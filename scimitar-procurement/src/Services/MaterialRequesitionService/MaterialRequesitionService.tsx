import MaterialRequesition from "../../Models/ClassModels/MaterialRequesition";
import IMaterialRequesitionService from "./IMaterialRequesitionService";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import IMaterialRequisitionMapper from "../../Mappers/MaterialRequesitionMapper/IMaterialRequesitionMapper";
import MaterialRequisitionMapper from "../../Mappers/MaterialRequesitionMapper/MaterialRequesitionMapper";
import { IItemAddResult } from "@pnp/sp/items";

export default class MaterialRequesitionService
  implements IMaterialRequesitionService
{
  private readonly _listName: string;
  private readonly _mapper: IMaterialRequisitionMapper;

  /**
   *
   */
  constructor() {
    this._listName = "MaterialRequestions";
    this._mapper = new MaterialRequisitionMapper();
  }
  async getMaterialRequesitionById(id: number): Promise<MaterialRequesition> {
    const item = await sp.web.lists
      .getByTitle(this._listName)
      .items.getById(id)
      .get();

    return this._mapper.mapFromSPMaterialRequisitionToMaterialRequesition(item);
  }

  async generateRequestCode(materialRequesitionId: number): Promise<string> {
    const requestCode = `${materialRequesitionId}/${new Date().getFullYear()}`;
    try {
      const item = await sp.web.lists
        .getByTitle(this._listName)
        .items.getById(materialRequesitionId)
        .update({ Title: requestCode });
    } catch (e) {
      console.error(e);
      throw e;
    }

    return requestCode;
  }

  async addRequest(
    materialRequesition: MaterialRequesition
  ): Promise<MaterialRequesition> {
    const toBeAdded =
      this._mapper.mapFromMaterialRequesitionToSPMaterialRequisition(
        materialRequesition
      );
    const materialRequesitionItem: IItemAddResult = await sp.web.lists
      .getByTitle(this._listName)
      .items.add(toBeAdded);

    const addedItem =
      this._mapper.mapFromSPMaterialRequisitionToMaterialRequesition(
        materialRequesitionItem.data
      );

    return addedItem;
  }
}
