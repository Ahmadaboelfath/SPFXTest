import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ApprovalBusinessLogic from "../../BusinessLogic/InvApprovalBusinessLogic/InvApprovalBusinessLogic";
import IApprovalBusinessLogic from "../../BusinessLogic/InvApprovalBusinessLogic/IInvApprovalBusinessLogic";
import { SecurityContext } from "../../Context/SecurityContext/SecurityProvider";
import { BannerComponent } from "../../CoreComponents/Banner";
import { LoadingBoxComponent } from "../../CoreComponents/LodingBox";
import { TableList } from "./Components/Grid/TableList";
import IInvApprovalsProps from "./InvApprovalsProps";
import IInvApprovalsState from "./InvApprovalsState";

class InvApprovals extends React.Component<
  RouteComponentProps<IInvApprovalsProps>,
  IInvApprovalsState
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
            <BannerComponent PageTitle="Warehouse Approval" />
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

export default withRouter(InvApprovals);
