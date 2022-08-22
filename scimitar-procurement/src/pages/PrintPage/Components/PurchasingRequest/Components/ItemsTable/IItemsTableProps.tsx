import MaterialRequestionItem from "../../../../../../Models/ClassModels/MaterialRequesitionItem";

export default interface IItemsTableProps {
  items: MaterialRequestionItem[];
  supplier?: string;
  isSr?: boolean;
}
