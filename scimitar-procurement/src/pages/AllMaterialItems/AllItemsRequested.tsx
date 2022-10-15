import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { SecurityContext } from "../../Context/SecurityContext/SecurityProvider";
import { BannerComponent } from "../../CoreComponents/Banner";
import { LoadingBoxComponent } from "../../CoreComponents/LodingBox";
import IMaterialRequisitionItemService from "../../Services/MaterialRequesitionItem/IMaterialRequisitionItemService";
import MaterialRequisitionItemService from "../../Services/MaterialRequesitionItem/MaterialRequisitionItemService";
import IMyAssignedItemsProps from "./IAllItemsRequestedProps";
import IMyAssignedItemsState from "./IAllItemsRequestedState";
import { TableList } from "./Components/Grid/TableList";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";

class AllItemsRequested extends React.Component<
  RouteComponentProps<IMyAssignedItemsProps>,
  IMyAssignedItemsState
> {
  private readonly _materialRequsitionItemsService: IMaterialRequisitionItemService;

  constructor(props) {
    super(props);
    this._materialRequsitionItemsService = new MaterialRequisitionItemService();
    this.state = {
      items: [],
      showSpinner: true,
    };
  }

  static contextType: React.Context<any> = SecurityContext;
  componentDidMount(): void {
    const userId: number = this.context.userID;

    this._materialRequsitionItemsService
      .getAll()
      .then((items) => {
        console.log(items);
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.items = items;
          newState.showSpinner = false;
          return newState;
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  render(): React.ReactNode {
    return (
      <div>
        {this.state.showSpinner ? (
          <LoadingBoxComponent />
        ) : (
          <>
            <BannerComponent PageTitle="All Items Requested" />
            <MDBContainer>
              <MDBRow>
                <MDBCol>
                  <TableList
                    materialRequsitionItems={this.state.items}
                    onEditClick={(item, index) => this.onEditClick(item, index)}
                    onViewClick={(item, index) => this.onViewClick(item, index)}
                  />
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </>
        )}
      </div>
    );
  }
  onViewClick(item: MaterialRequestionItem, index: any): void {
    this.props.history.push(`/MaterialItem/view/${item.id}`);
  }
  onEditClick(item: MaterialRequestionItem, index: any): void {
    this.props.history.push(`/MaterialItem/edit/${item.id}`);
  }
}

export default withRouter(AllItemsRequested);
