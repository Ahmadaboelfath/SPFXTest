import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Accordion } from "../../CoreComponents/accordion";
import { BannerComponent } from "../../CoreComponents/Banner";
import PurchasingOrderForm from "./Components/PurchasingOrderForm";
import IPurchasingOrderProps from "./IPurchasingOrderProps";
import IPurchasingOrderState from "./IPurchasingOrderState";

class PurchasingOrder extends React.Component<
  IPurchasingOrderProps,
  IPurchasingOrderState
> {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
    };
  }
  onChange(value, ctrlName): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.test = value;
      return newState;
    });
  }

  render(): React.ReactNode {
    return (
      <>
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <BannerComponent PageTitle="Purchasing order" />
              <Accordion title="PO Details" collapsed={false}>
                <PurchasingOrderForm
                  viewMode={this.props.viewMode}
                  data={this.state.test}
                  onChange={(value, ctrlName) => this.onChange(value, ctrlName)}
                />
              </Accordion>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
}

export default withRouter(PurchasingOrder);
