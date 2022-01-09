import * as React from "react";
import { Datepicker } from "../../../../Controls/datepicker";
import { Dropdown } from "../../../../Controls/dropdown";
import { Textbox } from "../../../../Controls/Textbox";
import { YesNo } from "../../../../Controls/YesNo";
import IMaterialRequestionFormProps from "./IMaterialRequesitionFormProps";

export default class MaterialRequesitionForm extends React.Component<
  IMaterialRequestionFormProps,
  any
> {
  render(): React.ReactNode {
    return (
      <div className="ui form">
        <Datepicker
          ctrlName="requestDate"
          selected={this.props.viewModel.requestDate}
          handleDate={(date) => null}
          disabled={true}
          label="Request Date"
        />

        <Textbox
          label="Department"
          ctrlName="department"
          Required={false}
          disabled={true}
          handleInputChange={() => null}
          value={this.props.viewModel.department}
        />

        <Textbox
          label="Requester"
          ctrlName="requestedBy"
          Required={true}
          disabled={this.props.disabled}
          handleInputChange={(value, controlname) =>
            this.props.onChange(value, controlname)
          }
          value={this.props.viewModel.requestedBy}
          errorMessage={
            this.props.errors && this.props.errors["requestedBy"]
              ? this.props.errors["requestedBy"]
              : ""
          }
          showError={
            this.props.errors && this.props.errors["requestedBy"] ? true : false
          }
        />

        <Dropdown
          Required={true}
          ctrlName="priority"
          disabled={this.props.disabled}
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Priority"
          options={[
            { text: "Standard", value: "Standard" },
            { text: "Urgent", value: "Urgent" },
          ]}
          errorMessage={
            this.props.errors && this.props.errors["priority"]
              ? this.props.errors["priority"]
              : ""
          }
          showError={
            this.props.errors && this.props.errors["priority"] ? true : false
          }
          value={this.props.viewModel.priority}
        />

        <Dropdown
          Required={true}
          ctrlName="currency"
          disabled={this.props.disabled}
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Currency"
          options={[
            { text: "USD", value: "USD" },
            { text: "EGP", value: "EGP" },
          ]}
          errorMessage={
            this.props.errors && this.props.errors["currency"]
              ? this.props.errors["currency"]
              : ""
          }
          showError={
            this.props.errors && this.props.errors["currency"] ? true : false
          }
          value={this.props.viewModel.currency}
        />

        <Textbox
          label="Use For"
          ctrlName="useFor"
          Required={true}
          disabled={this.props.disabled}
          handleInputChange={(value, controlname) =>
            this.props.onChange(value, controlname)
          }
          value={this.props.viewModel.useFor}
          errorMessage={
            this.props.errors && this.props.errors["useFor"]
              ? this.props.errors["useFor"]
              : ""
          }
          showError={
            this.props.errors && this.props.errors["useFor"] ? true : false
          }
        />
      </div>
    );
  }
}
