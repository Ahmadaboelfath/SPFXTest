import * as React from "react";
import { Textbox } from "../../../../Controls/Textbox";
import { ViewMode } from "../../../MaterialRequsitionItem/ViewMode";
import IPriceSubFormProps from "./IPriceSubFormProps";

export default class PriceSubForm extends React.Component<
  IPriceSubFormProps,
  any
> {
  render(): React.ReactNode {
    return (
      <div className="ui form">
        <Textbox
          disabled={true}
          Required={false}
          ctrlName=""
          handleInputChange={() => null}
          label="Sub Total"
          value={this.props.priceComponents.subTotal.toString()}
        />
        <Textbox
          disabled={this.props.viewMode === ViewMode.View ? true : false}
          Required={false}
          ctrlName="discountPercentage"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName, true)
          }
          label="Discount Percentage"
          value={this.props.priceComponents.discoutPercentage.toString()}
        />
        <Textbox
          disabled={true}
          Required={false}
          ctrlName=""
          handleInputChange={() => null}
          label="Discount"
          value={this.props.priceComponents.discountAmount.toString()}
        />
        <Textbox
          disabled={this.props.viewMode === ViewMode.View ? true : false}
          Required={false}
          ctrlName="shipAndHandling"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Ship And Handling"
          value={this.props.priceComponents.shipAndHandling.toString()}
        />
        <Textbox
          disabled={this.props.viewMode === ViewMode.View ? true : false}
          Required={false}
          ctrlName="freightCharge"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName, true)
          }
          label="Freight"
          value={this.props.priceComponents.freight.toString()}
        />
        <Textbox
          disabled={true}
          Required={false}
          ctrlName=""
          handleInputChange={() => null}
          label="Grand Total"
          value={this.props.priceComponents.grandTotal.toString()}
        />
      </div>
    );
  }
}
