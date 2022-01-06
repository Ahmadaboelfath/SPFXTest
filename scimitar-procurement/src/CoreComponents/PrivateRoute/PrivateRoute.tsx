import * as React from "react";
import { Redirect, Route } from "react-router";
import { SecurityContext } from "../../Context/SecurityContext/SecurityProvider";
import IPrivateRouteProps from "./IPrivateRouteProps";

export default class PrivateRoute extends React.Component<
  IPrivateRouteProps,
  any
> {
  static contextType = SecurityContext;

  renderRouteOrRedirection() {
    let isAllowed = [];
    this.props.allowedGroups.forEach((allowedGroup) => {
      if (this.context.getGroup(allowedGroup.groupName)) {
        isAllowed = [...isAllowed, allowedGroup];
      }
    });

    if (isAllowed.length > 0 || this.context.isAdmin) {
      return <>{this.props.children}</>;
    } else {
      return <Redirect push to="/AccessDenied" />;
    }
  }

  render(): React.ReactNode {
    return (
      <Route
        path={this.props.path}
        render={() => this.renderRouteOrRedirection()}
      />
    );
  }
}
