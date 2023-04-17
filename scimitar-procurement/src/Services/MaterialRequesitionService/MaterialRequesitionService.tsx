import MaterialRequesition from "../../Models/ClassModels/MaterialRequesition";
import IMaterialRequesitionService from "./IMaterialRequesitionService";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import IMaterialRequisitionMapper from "../../Mappers/MaterialRequesitionMapper/IMaterialRequesitionMapper";
import MaterialRequisitionMapper from "../../Mappers/MaterialRequesitionMapper/MaterialRequesitionMapper";
import { IItemAddResult } from "@pnp/sp/items";
import ICodingService from "../CodingService/ICodingService";
import CodingService from "../CodingService/CodingService";
import DependencyManager from "../DependencyManger";

export default class MaterialRequesitionService
  implements IMaterialRequesitionService
{
  private readonly _listName: string;
  private readonly _mapper: IMaterialRequisitionMapper;
  private readonly _codingService: ICodingService;

  /**
   *
   */
  constructor() {
    this._listName = "MaterialRequestions";
    this._mapper = new MaterialRequisitionMapper();
    this._codingService = DependencyManager.getInstance().inject(
      CodingService.serviceKey
    );
  }
  async getMaterialRequesitionById(id: number): Promise<MaterialRequesition> {
    const item = await sp.web.lists
      .getByTitle(this._listName)
      .items.getById(id)
      .get();

    return this._mapper.mapFromSPMaterialRequisitionToMaterialRequesition(item);
  }

  async generateRequestCode(materialRequesitionId: number): Promise<string> {
    try {
      const requestCode = await this._codingService.codeMR();
      const item = await sp.web.lists
        .getByTitle(this._listName)
        .items.getById(materialRequesitionId)
        .update({ Title: requestCode });
      return requestCode;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async addRequest(
    materialRequesition: MaterialRequesition,
    requestType: string
  ): Promise<MaterialRequesition> {
    const toBeAdded =
      this._mapper.mapFromMaterialRequesitionToSPMaterialRequisition(
        materialRequesition,
        requestType
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
