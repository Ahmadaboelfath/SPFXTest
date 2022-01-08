import { ITag } from "office-ui-fabric-react";
import IMaterialTag from "../../Models/InterfaceModels/IMaterialTag";
import Material from "../../Models/ClassModels/Material";

export default interface IMaterialService {
  searchMaterialByCode(code: string): Promise<IMaterialTag[]>;
  searchMaterialByDescription(description: string): Promise<IMaterialTag[]>;
  getMaterialById(id: number): Promise<Material>;
}
