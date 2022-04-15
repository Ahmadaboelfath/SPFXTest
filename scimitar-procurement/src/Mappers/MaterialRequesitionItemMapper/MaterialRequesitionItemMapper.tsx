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

    materialRequisitionItem.POId = SPMaterialRequisitionItem.POId;
    materialRequisitionItem.POCode = SPMaterialRequisitionItem.PO
      ? SPMaterialRequisitionItem.PO.Title
      : "";
    materialRequisitionItem.PRID = SPMaterialRequisitionItem.PRId;
    materialRequisitionItem.PRCode = SPMaterialRequisitionItem.PR
      ? SPMaterialRequisitionItem.PR.Title
      : "";
    materialRequisitionItem.status = SPMaterialRequisitionItem.Status;
    materialRequisitionItem.totalPrice = SPMaterialRequisitionItem.TotalPrice;

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
      UnitPrice: materialRequisitionItem.unitPrice,
      PRId: materialRequisitionItem.PRID,
      POId: materialRequisitionItem.POId,
      Status: materialRequisitionItem.status,
      AssigneeId: materialRequisitionItem.assignee[0].id,
    };
  }
}
