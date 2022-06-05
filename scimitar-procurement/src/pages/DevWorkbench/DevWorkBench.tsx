import * as React from "react";
import IDevWorkBenchProps from "./IDevWorkBenchProps";
import IDevWorkBenchState from "./IDevWorkBenchState";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import InvoicesContainer from "../../pdfTemplates/containers/Invoice";

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
  template = (<InvoicesContainer />);

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <button onClick={() => this.setShow()}>click to show link</button>
        {this.state.show ? (
          <BlobProvider document={this.template}>
            {({ blob, url, loading, error }) => {
              sp.web
                .getFolderByServerRelativePath(
                  "PurchasingOrderDocuments/EGY-21-33"
                )
                .files.addUsingPath("invoice.pdf", blob, { Overwrite: true })
                .then(() => console.log("done"));

              return <div>There's something going on on the fly</div>;
            }}
          </BlobProvider>
        ) : null}
      </React.Fragment>
    );
  }
  setShow(): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.show = true;
      return newState;
    });
  }
}

export default withRouter(DevWorkBench);
