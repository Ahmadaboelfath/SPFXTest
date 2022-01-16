import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ApprovalBusinessLogic from "../../BusinessLogic/InvApprovalBusinessLogic/InvApprovalBusinessLogic";
import IApprovalBusinessLogic from "../../BusinessLogic/InvApprovalBusinessLogic/IInvApprovalBusinessLogic";
import { SecurityContext } from "../../Context/SecurityContext/SecurityProvider";
import { BannerComponent } from "../../CoreComponents/Banner";
import { LoadingBoxComponent } from "../../CoreComponents/LodingBox";
import { TableList } from "./Components/Grid/TableList";
import IPRPendingAssigningProps from "./IPRPendingAssigningProps";
import IPRPendingAssigningState from "./IPRPendingAssigningState";
import PurchasingRequestApprovalBusinessLogic from "../../BusinessLogic/PurchasingRequestApprovalBusinessLogic/PurchasingRequestApprovalBusinessLogic";
import IPurchasingRequestBusinessLogic from "../../BusinessLogic/PurchasingRequestBusinessLogic/IPurchasingRequestBusinessLogic";
import PurchasingRequestBusinessLogic from "../../BusinessLogic/PurchasingRequestBusinessLogic/PurchasingRequestBusinessLogic";

class PRPendingAssigning extends React.Component<
  RouteComponentProps<IPRPendingAssigningProps>,
  IPRPendingAssigningState
> {
  private readonly _approvalBusinessLogic: IPurchasingRequestBusinessLogic;

  constructor(props) {
    super(props);
    this._approvalBusinessLogic = new PurchasingRequestBusinessLogic();
    this.state = {
      showSpinner: true,
      purchasingRequests: [],
    };
  }

  static contextType = SecurityContext;

  componentDidMount(): void {
    this._approvalBusinessLogic
      .getAllApprovedPurchasingRequests()
      .then((PRs) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.purchasingRequests = PRs;
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
                    purchasingRequest={this.state.purchasingRequests}
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

export default withRouter(PRPendingAssigning);
