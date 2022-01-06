import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

class NotAllowed extends React.Component<RouteComponentProps<any>, any> {
  render(): React.ReactNode {
    return <div>You're not allowed to enter this page</div>;
  }
}

export default withRouter(NotAllowed);
