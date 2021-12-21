import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import NewPurchaseRequestProps from "./NewPurchaseRequestProps";
import NewPurchaseRequestState from "./NewPurchaseRequestState";

class NewPurchaseRequestPage extends React.Component<
  RouteComponentProps<NewPurchaseRequestProps>,
  NewPurchaseRequestState
> {
  render(): React.ReactNode {
    return <div>New Purchase Request</div>;
  }
}

export default withRouter(NewPurchaseRequestPage);
