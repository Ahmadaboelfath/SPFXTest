import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import * as React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import IPurchasingRequestApprovalBusinessLogic from "../../BusinessLogic/PurchasingRequestApprovalBusinessLogic/IPurchasingRequestApprovalBusinessLogic";
import PurchasingRequestApprovalBusinessLogic from "../../BusinessLogic/PurchasingRequestApprovalBusinessLogic/PurchasingRequestApprovalBusinessLogic";
import IPurchasingRequestBusinessLogic from "../../BusinessLogic/PurchasingRequestBusinessLogic/IPurchasingRequestBusinessLogic";
import PurchasingRequestBusinessLogic from "../../BusinessLogic/PurchasingRequestBusinessLogic/PurchasingRequestBusinessLogic";
import { SecurityContext } from "../../Context/SecurityContext/SecurityProvider";
import { BannerComponent } from "../../CoreComponents/Banner";
import { LoadingBoxComponent } from "../../CoreComponents/LodingBox";
import { TableList } from "./Components/Grid/TableList";
import IPurchasingRequestsProps from "./IPurchasingRequestsProps";
import IPurchasingRequestsState from "./IPurchasingRequestsState";

class PurchasingRequests extends React.Component<
  RouteComponentProps<IPurchasingRequestsProps>,
  IPurchasingRequestsState
> {
  private readonly _purchaseRequestBusinessLogic: IPurchasingRequestBusinessLogic;

  constructor(props) {
    super(props);
    this._purchaseRequestBusinessLogic = new PurchasingRequestBusinessLogic();
    this.state = {
      showSpinner: true,
      approvalItems: [],
    };
  }

  static contextType = SecurityContext;

  componentDidMount(): void {
    this._purchaseRequestBusinessLogic
      .getAllApprovedOrPendingPurchasingRequests()
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
            <BannerComponent PageTitle="Purchasing requests" />
            <MDBContainer>
              <MDBRow>
                <MDBCol>
                  <TableList
                    purchasingRequestApprovals={this.state.approvalItems}
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

export default withRouter(PurchasingRequests);
