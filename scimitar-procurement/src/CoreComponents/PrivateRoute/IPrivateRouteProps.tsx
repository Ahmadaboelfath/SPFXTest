import SPGroup from "../../Models/SPGroup";

export default interface IPrivateRouteProps {
  allowedGroups: SPGroup[];
  path: string;
}
