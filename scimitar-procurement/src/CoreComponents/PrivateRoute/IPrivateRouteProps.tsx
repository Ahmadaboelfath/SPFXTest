import SPGroup from "../../Models/ClassModels/SPGroup";

export default interface IPrivateRouteProps {
  allowedGroups: SPGroup[];
  path: string;
}
