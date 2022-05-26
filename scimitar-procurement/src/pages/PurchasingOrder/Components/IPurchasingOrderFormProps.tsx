import { ViewMode } from "../../MaterialRequsitionItem/ViewMode";

export default interface IPurchasingOrderFormProps {
  viewMode: ViewMode;
  data: string;
  onChange: (value, ctrlName) => void;
}
