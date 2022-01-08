import { ITag } from "office-ui-fabric-react";
import IMaterialService from "./IMaterialService";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import IMaterialMapper from "../../Mappers/MaterialMapper/IMaterialMapper";
import MaterialMapper from "../../Mappers/MaterialMapper/MaterialMapper";
import Material from "../../Models/ClassModels/Material";
import IMaterialTag from "../../Models/InterfaceModels/IMaterialTag";

export default class MaterialService implements IMaterialService {
  private _materialMapper: IMaterialMapper;
  private _listName: string;

  constructor(mapper?: IMaterialMapper, listName?: string) {
    this._materialMapper = mapper ? mapper : new MaterialMapper();
    this._listName = listName ? listName : "Material";
  }

  async searchMaterialByCode(code: string): Promise<IMaterialTag[]> {
    try {
      const retrievedData = await sp.web.lists
        .getByTitle(this._listName)
        .items.filter(`substringof('${code}', Code)`)
        .expand("MaterialCategory/Title")
        .select("*,MaterialCategory/Title")
        .top(5000)
        .get();

      if (retrievedData.length > 0) {
        return retrievedData.map((material) =>
          this._materialMapper.mapFromSPMaterialToIMaterialTag(material)
        );
      } else {
        return [];
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async searchMaterialByDescription(
    description: string
  ): Promise<IMaterialTag[]> {
    try {
      const retrievedData = await sp.web.lists
        .getByTitle(this._listName)
        .items.filter(`substringof('${description}', Title)`)
        .expand("MaterialCategory/Title")
        .select("*,MaterialCategory/Title")
        .top(5000)
        .get();

      if (retrievedData.length > 0) {
        return retrievedData.map((material) =>
          this._materialMapper.mapFromSPMaterialToIMaterialTag(material)
        );
      } else {
        return [];
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async getMaterialById(id: number): Promise<Material> {
    try {
      const materialItem = sp.web.lists
        .getByTitle(this._listName)
        .items.getById(id)
        .expand("MaterialCategory/Title")
        .select("*,MaterialCategory/Title")
        .get();

      return this._materialMapper.mapFromSPMaterialToMaterial(materialItem);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
