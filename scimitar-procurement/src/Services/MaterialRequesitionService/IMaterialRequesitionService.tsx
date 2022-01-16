import MaterialRequesition from "../../Models/ClassModels/MaterialRequesition";

export default interface IMaterialRequesitionService {
  addRequest(
    materialRequesition: MaterialRequesition,
    requestType: string
  ): Promise<MaterialRequesition>;

  generateRequestCode(materialRequesitionId: number): Promise<string>;

  getMaterialRequesitionById(id: number): Promise<MaterialRequesition>;
}
