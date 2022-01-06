import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import NewMaterialRequestionProps from "./NewMaterialRequestionProps";
import NewMaterialRequestionState from "./NewMaterialRequestionState";

class NewMaterialRequestion extends React.Component<
  RouteComponentProps<NewMaterialRequestionProps>,
  NewMaterialRequestionState
> {
  render(): React.ReactNode {
    return <div>New Material Requestion</div>;
  }
}

export default withRouter(NewMaterialRequestion);
