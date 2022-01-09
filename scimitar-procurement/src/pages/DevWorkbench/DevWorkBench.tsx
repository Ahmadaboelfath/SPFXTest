import * as React from "react";
import IDevWorkBenchProps from "./IDevWorkBenchProps";
import IDevWorkBenchState from "./IDevWorkBenchState";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ITag } from "office-ui-fabric-react";
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
import IApprovalService from "../../Services/ApprovalService/IApprovalService";
import ApprovalService from "../../Services/ApprovalService/ApprovalService";

class DevWorkBench extends React.Component<
  RouteComponentProps<IDevWorkBenchProps>,
  IDevWorkBenchState
> {
  private readonly _materialService: IMaterialService;

  constructor(props) {
    super(props);
    this._materialService = new MaterialService();
    this.state = {
      serachByCode: true,
    };
  }

  componentDidMount(): void {
    // const materialRequesition = new MaterialRequesition();
    // materialRequesition.useFor = "Test";
    // materialRequesition.status = "New";
    // materialRequesition.requestedBy = "Ahmad";
    // materialRequesition.priority = "High";
    // materialRequesition.department = "purchasing";
    // materialRequesition.currency = "USD";
    // materialRequesition.requesterEmail = "sharepointadmin@scimitaregypt.com";
    // const materialRequesitionService: IMaterialRequesitionService =
    //   new MaterialRequesitionService();
    // materialRequesitionService
    //   .addRequest(materialRequesition)
    //   .then((materialRequest) => {
    //     console.log(materialRequest);
    //     materialRequesitionService
    //       .generateRequestCode(materialRequest.id)
    //       .then((value) => {
    //         console.log(value);
    //         const mrItem = new MaterialRequesitionItem();
    //         mrItem.materialId = 7;
    //         mrItem.materialRequisitionId = 7;
    //         mrItem.order = 1;
    //         mrItem.quantity = 5;
    //         mrItem.unit = "Pieces";
    //         const itemService = new MaterialRequisitionItemService();
    //         itemService.addMaterialRequesitionItem(mrItem).then((itemvalue) => {
    //           console.log(itemvalue);
    //         });
    //       });
    //   });

    const approvalService: IApprovalService = new ApprovalService();

    approvalService.getApprovalById(1).then((appro) => {
      console.log(appro);
      approvalService.getApprovalsByMaterialRequesitionId(16).then((appr) => {
        console.log(appr);
        approvalService
          .updateApprovalStatus(
            1,
            "Approved",
            "sharepointadmin@scimitaregypt.com"
          )
          .then((a) => {
            console.log(a);
          });
      });
    });
  }
  render(): React.ReactNode {
    return (
      <div className="ui container">
        <div className="ui middle aligned grid">
          <div className="column">
            <h2 className="ui teal header aligned center">
              <div className="content">Material Requestion</div>
            </h2>
            <form className="ui large form">
              <div className="ui stacked segment">
                <Toggle
                  activeText="Description"
                  inactiveText="Code"
                  label="Search Type"
                  disabled={false}
                  controlPropName=""
                  onChange={() => this.toggleSearchPicker()}
                />
                {/* <TagPicker
                  errorMessage=" "
                  label={
                    this.state.serachByCode
                      ? "Material Code"
                      : "Material Description"
                  }
                  multiple={false}
                  controlName=""
                  onChange={(selectedItems) => console.log(selectedItems)}
                  onResolveSuggestions={
                    this.state.serachByCode
                      ? (filter, selectedItem) =>
                          this.onCodeSearch(filter, selectedItem)
                      : (filter, selectedItem) =>
                          this.onDescriptionSearch(filter, selectedItem)
                  }
                /> */}
                {/* <TableList
                  onDelete={() => console.log("Delete")}
                  onSubmit={() => console.log("Submit")}
                  registrations={[]}
                /> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
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
