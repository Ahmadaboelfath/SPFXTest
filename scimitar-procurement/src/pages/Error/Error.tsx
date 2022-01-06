import * as React from "react";
import IErrorPageProps from "./IErrorProps";
import IErrorPageState from "./IErrorState";
import { RouteComponentProps, withRouter } from "react-router-dom";

class Error extends React.Component<
  RouteComponentProps<IErrorPageProps>,
  IErrorPageState
> {
  render(): React.ReactNode {
    return <h1>404 Not Found</h1>;
  }
}

export default withRouter(Error);
