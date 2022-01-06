import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MyRequestProps from "./MyRequestsProps";
import MyRequestState from "./MyRequestsState";

class MyRequests extends React.Component<
  RouteComponentProps<MyRequestProps>,
  MyRequestState
> {
  render(): React.ReactNode {
    return <div>My Requests</div>;
  }
}

export default withRouter(MyRequests);
