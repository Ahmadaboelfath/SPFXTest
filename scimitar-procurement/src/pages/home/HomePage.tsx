import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import HomePageProps from "./HomePageProps";
import HomePageState from "./HomePageState";

class HomePage extends React.Component<
  RouteComponentProps<HomePageProps>,
  HomePageState
> {
  render(): React.ReactNode {
    return <div>Homepage</div>;
  }
}

export default withRouter(HomePage);
