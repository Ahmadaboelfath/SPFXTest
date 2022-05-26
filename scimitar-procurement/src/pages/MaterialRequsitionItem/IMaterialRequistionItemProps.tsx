import { RouteComponentProps } from "react-router";
import { ViewMode } from "./ViewMode";

export default interface IMaterialRequistionItemProps
  extends RouteComponentProps {
  viewMode: ViewMode;
}
