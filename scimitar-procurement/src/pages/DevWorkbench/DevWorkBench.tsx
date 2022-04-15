import * as React from "react";
import IDevWorkBenchProps from "./IDevWorkBenchProps";
import IDevWorkBenchState from "./IDevWorkBenchState";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { Button, ITag } from "office-ui-fabric-react";
import IMaterialService from "../../Services/MaterialService/IMaterialService";
import MaterialService from "../../Services/MaterialService/MaterialService";
import Tag from "../../Controls/TagPicker/Components/Tag/Tag";
import IMaterialTag from "../../Models/InterfaceModels/IMaterialTag";
// import { TableList } from "../../CoreComponents/Grid/TableList";
import Toggle from "../../Controls/Toggle/Toggle";
import TagPicker from "../../Controls/TagPicker/TagPicker";
import IMaterialRequesitionService from "../../Services/MaterialRequesitionService/IMaterialRequesitionService";
import MaterialRequesitionService from "../../Services/MaterialRequesitionService/MaterialRequesitionService";
import MaterialRequesition from "../../Models/ClassModels/MaterialRequesition";
import MaterialRequesitionItem from "../../Models/ClassModels/MaterialRequesitionItem";
import MaterialRequisitionItemService from "../../Services/MaterialRequesitionItem/MaterialRequisitionItemService";
import IApprovalService from "../../Services/InvApprovalService/IInvApprovalService";
import ApprovalService from "../../Services/InvApprovalService/InvApprovalService";
import MyDocument from "./Component/Document";
import * as ReactDOM from "react-dom";
import { PDFViewer } from "@react-pdf/renderer";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./Component/ComponentToPrint";

class DevWorkBench extends React.PureComponent<
  RouteComponentProps<IDevWorkBenchProps>,
  IDevWorkBenchState
> {
  private readonly _materialService: IMaterialService;
  componentRef;
  constructor(props) {
    super(props);
    this._materialService = new MaterialService();
    this.state = {
      serachByCode: true,
    };
    this.componentRef = React.createRef();
  }

  componentDidMount(): void {}
  render(): React.ReactNode {
    return (
      <div>
        <Link to={"/printPO"} target={"_blank"}>
          PrintPO
        </Link>
      </div>
    );
  }

  // App = () => (
  //   <PDFViewer>
  //     <MyDocument />
  //   </PDFViewer>
  // );

  handleCLick(): void {
    // const newWindow = window.open("", "_blank");
    // const div = newWindow.document.createElement("div");
    // div.id = "root";
    // ReactDOM.render(<this.App />, newWindow.document.getElementById("root"));
    // newWindow.open();
    // newWindow.print();
  }
  toggleSearchPicker(): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.serachByCode = !prevState.serachByCode;
      return newState;
    });
  }
  onCodeSearch(
    filter: string,
    selectedItem: ITag[]
  ): ITag[] | PromiseLike<ITag[]> {
    return this._materialService.searchMaterialByCode(filter);
  }

  onDescriptionSearch(
    filter: string,
    selectedItem: ITag[]
  ): ITag[] | PromiseLike<ITag[]> {
    return this._materialService.searchMaterialByDescription(filter);
  }
}

export default withRouter(DevWorkBench);
