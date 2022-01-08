import MaterialRequesitionFormViewModel from "../../Models/ViewModels/MaterialRequesitionFormViewModel";

export default interface IMaterialRequesitionBusinessLogic {
  addMaterialRequisition(
    materialRequesitionFormViewModel: MaterialRequesitionFormViewModel
  ): Promise<MaterialRequesitionFormViewModel>;

  getMaterialRequisitionById(
    id: number
  ): Promise<MaterialRequesitionFormViewModel>;
}
