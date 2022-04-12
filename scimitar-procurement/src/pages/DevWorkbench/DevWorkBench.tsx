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
import IApprovalService from "../../Services/InvApprovalService/IInvApprovalService";
import ApprovalService from "../../Services/InvApprovalService/InvApprovalService";
import { sp } from "@pnp/sp";
import { Textbox } from "../../Controls/Textbox";
import { Button } from "office-ui-fabric-react";
// import { Button } from "@mui/material";
// import { Textbox } from "../../Controls/Textbox";

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
      price: 0,
      id: 1,
    };
  }

  componentDidMount(): void {
    sp.web.lists
      .getByTitle("MaterialRequisitionItems")
      .items.getById(this.state.id)
      .get()
      .then((item) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.price = item["TotalPriceCalculated"];
          return newState;
        });
      });
  }
  render(): React.ReactNode {
    return (
      <div>
        <Textbox
          Required={false}
          ctrlName={""}
          handleInputChange={(value) => {
            this.setState((prevState) => {
              const newState = { ...prevState };
              newState.id = value;
              return newState;
            });
          }}
          label={" Item Id"}
          value={this.state.id.toLocaleString()}
        />
        <Button onClick={() => this.handleClick()}>Get Price</Button>

        <h1>{this.state.price}</h1>
      </div>
    );
  }
  handleClick(): void {
    sp.web.lists
      .getByTitle("MaterialRequisitionItems")
      .items.getById(this.state.id)
      .get()
      .then((item) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          const number = parseFloat(item["TotalPriceCalculated"]);
          newState.price = Math.round(number * 100) / 100;
          return newState;
        });
      });
  }
}

export default withRouter(DevWorkBench);
