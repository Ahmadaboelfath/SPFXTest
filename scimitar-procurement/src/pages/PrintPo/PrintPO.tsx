import { Button } from "office-ui-fabric-react";
import * as React from "react";
import { withRouter } from "react-router";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "../DevWorkbench/Component/ComponentToPrint";

class PrintPO extends React.Component<any, any> {
  componentRef;

  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <Button>Print Document</Button>}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={(el) => (this.componentRef = el)} />
      </div>
    );
  }
}

export default withRouter(PrintPO);
