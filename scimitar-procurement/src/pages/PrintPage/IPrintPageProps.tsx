import { RouteComponentProps } from "react-router-dom";
import { documentType } from "../../Models/InterfaceModels/documentType";

export default interface IPrintPageProps extends RouteComponentProps {
  documentType: documentType;
}
