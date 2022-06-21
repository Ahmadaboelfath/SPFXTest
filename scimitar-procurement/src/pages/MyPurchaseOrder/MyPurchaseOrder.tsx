import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import * as React from "react";
import { withRouter } from "react-router";
import IPurchaseOrderBusinessLogic from "../../BusinessLogic/PurchaseOrderBusinessLogic/IPurchaseOrderBusinessLogic";
import PurchaseOrderBusinessLogic from "../../BusinessLogic/PurchaseOrderBusinessLogic/PurchaseOrderBusinessLogic";
import { SecurityContext } from "../../Context/SecurityContext/SecurityProvider";
import { BannerComponent } from "../../CoreComponents/Banner";
import { LoadingBoxComponent } from "../../CoreComponents/LodingBox";
import { TableList } from "./Components/DataGrid/TableList";
import { IMyPurchaseOrderProps } from "./IMyPurchaseOrderProps";
import IMyPurchaseOrderState from "./IMyPurchaseOrderState";

class MyPurchaseOrder extends React.Component<
  IMyPurchaseOrderProps,
  IMyPurchaseOrderState
> {
  private readonly _purchasingOrderBusinessLogic: IPurchaseOrderBusinessLogic;

  constructor(props) {
    super(props);
    this._purchasingOrderBusinessLogic = new PurchaseOrderBusinessLogic();
    this.state = {
      purchaseOrders: [],
      showLoader: true,
    };
  }

  static contextType = SecurityContext;

  componentDidMount(): void {
    this._purchasingOrderBusinessLogic
      .getPurchasngOrderByRequester(this.context.userID)
      .then((purchasingOrders) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.showLoader = false;
          newState.purchaseOrders = purchasingOrders;
          return newState;
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  render(): React.ReactNode {
    return (
      <>
        {this.state.showLoader ? (
          <LoadingBoxComponent />
        ) : (
          <>
            <BannerComponent PageTitle="My Purchasing Orders" />
            <MDBContainer>
              <MDBRow>
                <MDBCol>
                  <TableList purchasingOrders={this.state.purchaseOrders} />
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </>
        )}
      </>
    );
  }
}

export default withRouter(MyPurchaseOrder);
