import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ApprovalBusinessLogic from "../../BusinessLogic/ApprovalBusinessLogic/ApprovalBusinessLogic";
import IApprovalBusinessLogic from "../../BusinessLogic/ApprovalBusinessLogic/IApprovalBusinessLogic";
import { SecurityContext } from "../../Context/SecurityContext/SecurityProvider";
import { BannerComponent } from "../../CoreComponents/Banner";
import { LoadingBoxComponent } from "../../CoreComponents/LodingBox";
import { TableList } from "./Components/Grid/TableList";
import IMyApprovalsProps from "./IMyApprovalsProps";
import IMyApprovalsState from "./IMyApprovalsState";

class MyApprovals extends React.Component<
  RouteComponentProps<IMyApprovalsProps>,
  IMyApprovalsState
> {
  private readonly _approvalBusinessLogic: IApprovalBusinessLogic;

  constructor(props) {
    super(props);
    this._approvalBusinessLogic = new ApprovalBusinessLogic();
    this.state = {
      showSpinner: true,
      approvalItems: [],
    };
  }

  static contextType = SecurityContext;

  componentDidMount(): void {
    this._approvalBusinessLogic
      .getApprovalByUserEmail(this.context.userProperties["WorkEmail"])
      .then((approvals) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.approvalItems = approvals;
          newState.showSpinner = false;
          return newState;
        });
      });
  }

  render(): React.ReactNode {
    return (
      <>
        {this.state.showSpinner ? (
          <LoadingBoxComponent />
        ) : (
          <>
            <BannerComponent PageTitle="My Approvals" />
            <MDBContainer>
              <MDBRow>
                <MDBCol>
                  <TableList
                    materialRequesitionsApprovals={this.state.approvalItems}
                  />
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </>
        )}
      </>
    );
  }
}

export default withRouter(MyApprovals);
