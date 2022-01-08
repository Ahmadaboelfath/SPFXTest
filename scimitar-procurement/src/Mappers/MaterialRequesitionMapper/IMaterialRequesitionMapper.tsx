import MaterialRequesition from "../../Models/ClassModels/MaterialRequesition";
import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";
import MaterialRequesitionFormViewModel from "../../Models/ViewModels/MaterialRequesitionFormViewModel";

export default interface IMaterialRequisitionMapper {
  mapFromSPMaterialRequisitionToMaterialRequesition(
    SPMaterialRequisitionItem: any
  ): MaterialRequesition;

  mapFromMaterialRequesitionToSPMaterialRequisition(
    materialRequsitionFormViewModel: MaterialRequesition
  );
}
