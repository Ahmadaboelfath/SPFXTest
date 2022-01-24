import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";

export default interface IMaterialRequisitionItemService {
  addMaterialRequesitionItem(
    materialRequesitionItem: MaterialRequestionItem
  ): Promise<MaterialRequestionItem>;

  getMaterialRequesitionItemsByRequesitionId(
    id: number
  ): Promise<MaterialRequestionItem[]>;

  deleteItem(item: MaterialRequestionItem): Promise<boolean>;

  updateItem(item: MaterialRequestionItem): Promise<MaterialRequestionItem>;
}
