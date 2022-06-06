import * as React from "react";
import IDevWorkBenchProps from "./IDevWorkBenchProps";
import IDevWorkBenchState from "./IDevWorkBenchState";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { BlobProvider, pdf, PDFDownloadLink } from "@react-pdf/renderer";
import InvoicesContainer from "../../pdfTemplates/containers/Invoice";
import generatePdfDocument from "./Component/testDownload";

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

  componentDidMount(): void {
    generatePdfDocument("invoice.pdf");
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <button onClick={() => this.setShow()}>click to show link</button>
        {this.state.show ? <div>File loaded completly</div> : null}
        {/* {this.state.show ? (
          <PDFDownloadLink
            document={<InvoicesContainer />}
            fileName="invoice.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Document loaded"
            }
          </PDFDownloadLink>
        ) : null} */}
      </React.Fragment>
    );
  }
  setShow(): void {
    this.loadTemplate().then((blob) => {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.show = true;
        return newState;
      });
    });
  }

  async loadTemplate() {
    const blob = await pdf(this.template).toBlob();
    return blob;
  }
}

export default withRouter(DevWorkBench);
