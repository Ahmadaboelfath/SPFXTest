import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";
import IMaterialRequesitionItemMapper from "./IMaterialRequesitionItemMapper";

export default class MaterialRequestionItemMapper
  implements IMaterialRequesitionItemMapper
{
  mapFromSPMaterialRequesitionItemToMaterialRequesitionItem(
    SPMaterialRequisitionItem: any
  ): MaterialRequestionItem {
    const materialRequisitionItem: MaterialRequestionItem =
      new MaterialRequestionItem();
    materialRequisitionItem.code = SPMaterialRequisitionItem.Material.Code;
    materialRequisitionItem.description =
      SPMaterialRequisitionItem.Material.Title;
    materialRequisitionItem.id = SPMaterialRequisitionItem.Id;
    materialRequisitionItem.order = SPMaterialRequisitionItem.ItemOrder;
    materialRequisitionItem.quantity = SPMaterialRequisitionItem.Quantity;
    materialRequisitionItem.unit = SPMaterialRequisitionItem.Material.UnitValue;
    materialRequisitionItem.materialId = SPMaterialRequisitionItem.MaterialId;
    materialRequisitionItem.materialRequisitionId =
      SPMaterialRequisitionItem.MaterialRequesitionId;
    materialRequisitionItem.materialTag = [
      {
        name: SPMaterialRequisitionItem.Material.Title,
        key: SPMaterialRequisitionItem.Material.Code,
        materialId: SPMaterialRequisitionItem.MaterialId,
        unit: SPMaterialRequisitionItem.Material.UnitValue,
      },
    ];
    materialRequisitionItem.balance = SPMaterialRequisitionItem.Balance
      ? SPMaterialRequisitionItem.Balance
      : 0;

    return materialRequisitionItem;
  }
  mapFromMaterialRequesitionItemToSPMaterialRequesitionItem(
    materialRequisitionItem: MaterialRequestionItem
  ) {
    return {
      MaterialId: materialRequisitionItem.materialId,
      Title: materialRequisitionItem.description,
      Quantity: materialRequisitionItem.quantity,
      ItemOrder: materialRequisitionItem.order,
      MaterialRequesitionId: materialRequisitionItem.materialRequisitionId,
      Balance: materialRequisitionItem.balance,
    };
  }
}
