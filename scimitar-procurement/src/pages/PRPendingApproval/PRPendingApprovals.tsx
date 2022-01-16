import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ApprovalBusinessLogic from "../../BusinessLogic/InvApprovalBusinessLogic/InvApprovalBusinessLogic";
import IApprovalBusinessLogic from "../../BusinessLogic/InvApprovalBusinessLogic/IInvApprovalBusinessLogic";
import { SecurityContext } from "../../Context/SecurityContext/SecurityProvider";
import { BannerComponent } from "../../CoreComponents/Banner";
import { LoadingBoxComponent } from "../../CoreComponents/LodingBox";
import { TableList } from "./Components/Grid/TableList";
import IPRPendingApprovalsProps from "./IPRPendingApprovalsProps";
import IPRPendingApprovalsState from "./IPRPendingApprovalsState";

class PRPendingApprovals extends React.Component<
  RouteComponentProps<IPRPendingApprovalsProps>,
  IPRPendingApprovalsState
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
            <BannerComponent PageTitle="Inv Approval" />
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

export default withRouter(PRPendingApprovals);
