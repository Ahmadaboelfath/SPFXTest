import MaterialRequesitionFormViewModel from "../../Models/ViewModels/MaterialRequesitionFormViewModel";

export default interface IMaterialRequesitionBusinessLogic {
  addMR(
    materialRequesitionFormViewModel: MaterialRequesitionFormViewModel
  ): Promise<MaterialRequesitionFormViewModel>;

  addSR(
    materialRequesitionFormViewModel: MaterialRequesitionFormViewModel
  ): Promise<MaterialRequesitionFormViewModel>;

  getMaterialRequisitionById(
    id: number
  ): Promise<MaterialRequesitionFormViewModel>;
}
