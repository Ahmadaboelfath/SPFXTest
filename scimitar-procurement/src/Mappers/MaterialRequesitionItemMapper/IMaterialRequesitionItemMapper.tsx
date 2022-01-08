import MaterialRequesition from "../../Models/ClassModels/MaterialRequesition";
import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";

export default interface IMaterialRequesitionItemMapper {
  mapFromSPMaterialRequesitionItemToMaterialRequesitionItem(
    SPMaterialRequisitionItem: any
  ): MaterialRequestionItem;

  mapFromMaterialRequesitionItemToSPMaterialRequesitionItem(
    materialRequisitionItem: MaterialRequestionItem
  ): any;
}
