import * as React from "react";
import IDevWorkBenchProps from "./IDevWorkBenchProps";
import IDevWorkBenchState from "./IDevWorkBenchState";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { BlobProvider, pdf, PDFDownloadLink } from "@react-pdf/renderer";

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";

class DevWorkBench extends React.Component<
  RouteComponentProps<IDevWorkBenchProps>,
  IDevWorkBenchState
> {
  /**
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount(): void {}

  render(): React.ReactNode {
    return <React.Fragment></React.Fragment>;
  }
}

export default withRouter(DevWorkBench);
