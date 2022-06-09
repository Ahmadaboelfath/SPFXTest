import IPrice from "../../../../Models/InterfaceModels/IPrice";
import { ViewMode } from "../../../MaterialRequsitionItem/ViewMode";

export default interface IPriceSubFormProps {
  priceComponents: IPrice;
  onChange(value, ctrlName, revised?: boolean): void;
  viewMode: ViewMode;
}
