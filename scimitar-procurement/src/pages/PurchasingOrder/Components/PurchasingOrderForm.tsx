import * as React from "react";
import { Textbox } from "../../../Controls/Textbox";
import { ViewMode } from "../../MaterialRequsitionItem/ViewMode";
import IPurchasingOrderFormProps from "./IPurchasingOrderFormProps";
import IPurchasingOrderFormState from "./IPurchasingOrderFormState";

export default class PurchasingOrderForm extends React.Component<
  IPurchasingOrderFormProps,
  IPurchasingOrderFormState
> {
  render(): React.ReactNode {
    // console.log(this.props.viewMode);
    return (
      <div className="ui form">
        <Textbox
          disabled={this.props.viewMode === ViewMode.New}
          Required={true}
          ctrlName="test"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Id"
          value={this.props.data}
        />
        <Textbox
          disabled={this.props.viewMode === ViewMode.View}
          Required={true}
          ctrlName="test"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Id"
          value={this.props.data}
        />
        <Textbox
          disabled={this.props.viewMode === ViewMode.Edit}
          Required={true}
          ctrlName="test"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Id"
          value={this.props.data}
        />
      </div>
    );
  }
}
