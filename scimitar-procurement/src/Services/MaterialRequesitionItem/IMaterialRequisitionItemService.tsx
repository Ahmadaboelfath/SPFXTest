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
  getMaterialRequisitionItemsByAssignee(
    assigneeId: number
  ): Promise<MaterialRequestionItem[]>;

  getMaterialRequistionById(id: number): Promise<MaterialRequestionItem>;
  getMaterialItemsAssignedThatIsNotInPO(
    assigneeId: number
  ): Promise<MaterialRequestionItem[]>;

  updateItemsPO(itemId: number, POId: number): Promise<MaterialRequestionItem>;

  getMaterialItemsByPO(poId: number): Promise<MaterialRequestionItem[]>;
}
