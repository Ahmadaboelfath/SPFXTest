import { RouteComponentProps } from "react-router-dom";
import { ViewMode } from "../MaterialRequsitionItem/ViewMode";

export default interface IPurchasingOrderProps extends RouteComponentProps {
  viewMode: ViewMode;
}
