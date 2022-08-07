import * as React from "react";
import { CheckBox } from "../../../../Controls/checkBox";
import { Datepicker } from "../../../../Controls/datepicker";
import { Dropdown } from "../../../../Controls/dropdown";
import { Textarea } from "../../../../Controls/textarea";
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
          Required={true}
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
        {this.props.disabled ? (
          <Textbox
            Required={true}
            ctrlName="priority"
            handleInputChange={() => null}
            label="priority"
            value={this.props.viewModel.priority}
            disabled={this.props.disabled}
          />
        ) : (
          <Dropdown
            Required={false}
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
        )}
        {this.props.disabled ? (
          <Textbox
            Required={false}
            ctrlName="currency"
            handleInputChange={() => null}
            label="Currency"
            value={this.props.viewModel.currency}
            disabled={this.props.disabled}
          />
        ) : (
          <Dropdown
            Required={false}
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
        )}

        <Textbox
          label="Use For"
          ctrlName="useFor"
          Required={false}
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
        <Datepicker
          label="Needed by"
          ctrlName="leadTime"
          Required={true}
          disabled={this.props.disabled}
          handleDate={(value, controlname) =>
            this.props.onChange(value, controlname)
          }
          selected={this.props.viewModel.leadTime}
          errorMessage={
            this.props.errors && this.props.errors["leadTime"]
              ? this.props.errors["leadTime"]
              : ""
          }
          showError={
            this.props.errors && this.props.errors["leadTime"] ? true : false
          }
        />
        <Textbox
          label="Supplier"
          ctrlName="supplier"
          Required={false}
          disabled={this.props.disabled}
          handleInputChange={(value, controlname) =>
            this.props.onChange(value, controlname)
          }
          value={this.props.viewModel.supplier}
          errorMessage={
            this.props.errors && this.props.errors["supplier"]
              ? this.props.errors["supplier"]
              : ""
          }
          showError={
            this.props.errors && this.props.errors["supplier"] ? true : false
          }
        />
        <Textarea
          label="Contingency Plan"
          ctrlName="contingencyPlan"
          Required={false}
          disabled={this.props.disabled}
          handleInputChange={(value, controlname) =>
            this.props.onChange(value, controlname)
          }
          value={this.props.viewModel.contingencyPlan}
          errorMessage={
            this.props.errors && this.props.errors["contingencyPlan"]
              ? this.props.errors["contingencyPlan"]
              : ""
          }
          showError={
            this.props.errors && this.props.errors["contingencyPlan"]
              ? true
              : false
          }
        />
        <Textarea
          label="Delay Consequences"
          ctrlName="delayConsequences"
          Required={false}
          disabled={this.props.disabled}
          handleInputChange={(value, controlname) =>
            this.props.onChange(value, controlname)
          }
          value={this.props.viewModel.delayConsequences}
          errorMessage={
            this.props.errors && this.props.errors["delayConsequences"]
              ? this.props.errors["delayConsequences"]
              : ""
          }
          showError={
            this.props.errors && this.props.errors["delayConsequences"]
              ? true
              : false
          }
        />
        <CheckBox
          LabelText="Budget"
          ctrName="budget"
          Required={false}
          disabled={this.props.disabled}
          handleInputChange={(value, controlname) =>
            this.props.onChange(value, controlname)
          }
          checked={this.props.viewModel.budget}
          errorMessage={
            this.props.errors && this.props.errors["budget"]
              ? this.props.errors["budget"]
              : ""
          }
          showError={
            this.props.errors && this.props.errors["budget"] ? true : false
          }
        />
        <Dropdown
          Required={false}
          ctrlName="itemStatus"
          disabled={this.props.disabled}
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Items Status"
          options={[
            { text: "Stock", value: "Stock" },
            { text: "Non-Stock", value: "Non-Stock" },
            { text: "Direct Charge", value: "Direct Charge" },
          ]}
          errorMessage={
            this.props.errors && this.props.errors["itemStatus"]
              ? this.props.errors["itemStatus"]
              : ""
          }
          showError={
            this.props.errors && this.props.errors["itemStatus"] ? true : false
          }
          value={this.props.viewModel.itemStatus}
        />
      </div>
    );
  }
}
