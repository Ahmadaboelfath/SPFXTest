import MaterialRequesition from "../../Models/ClassModels/MaterialRequesition";

export default interface IMaterialRequesitionService {
  addRequest(
    materialRequesition: MaterialRequesition
  ): Promise<MaterialRequesition>;

  generateRequestCode(materialRequesitionId: number): Promise<string>;

  getMaterialRequesitionById(id: number): Promise<MaterialRequesition>;
}
