import { Accordion } from "../../../../CoreComponents/accordion/Accordion";
import * as React from "react";
import { Textbox } from "../../../../Controls/Textbox";
import { ViewMode } from "../../ViewMode";
import IMaterialRequisitionFormProps from "./IMaterialRequisitionFormProps";
import UserPicker from "../../../../Controls/userPicker";
import { Dropdown } from "../../../../Controls/dropdown";

export default class MaterialRequsitionItemForm extends React.Component<
  IMaterialRequisitionFormProps,
  any
> {
  formatTotalPrice() {
    if (this.props.item.totalPrice) {
      return (
        Math.round(this.props.item.totalPrice * 100) / 100
      ).toLocaleString();
    }
  }

  onChange(value, ctrlName) {
    this.props.onChange(value, ctrlName);
  }

  render(): React.ReactNode {
    return (
      <div className="ui form">
        <Accordion title="Item Details" collapsed={false}>
          <Textbox
            disabled={true}
            Required={false}
            ctrlName="description"
            handleInputChange={(value, ctrlName) =>
              console.log(value, ctrlName)
            }
            label="Description"
            value={this.props.item.description}
          />
          <Textbox
            disabled={true}
            Required={false}
            ctrlName="quantity"
            handleInputChange={(value, ctrlName) =>
              console.log(value, ctrlName)
            }
            label="Quantity"
            value={this.props.item.quantity.toLocaleString()}
          />
          <Textbox
            disabled={true}
            Required={false}
            ctrlName="balance"
            handleInputChange={(value, ctrlName) =>
              console.log(value, ctrlName)
            }
            label="Balance"
            value={
              this.props.item.balance
                ? this.props.item.balance.toLocaleString()
                : ""
            }
          />
          <Textbox
            disabled={true}
            Required={false}
            ctrlName="unit"
            handleInputChange={(value, ctrlName) =>
              console.log(value, ctrlName)
            }
            label="Unit"
            value={this.props.item.unit}
          />

          {this.props.viewMode === ViewMode.Edit ? (
            <Dropdown
              Required={false}
              ctrlName="currency"
              handleInputChange={(value, ctrlName) =>
                this.onChange(value, ctrlName)
              }
              label="Currency"
              options={this.props.currencyOptions}
              value={this.props.item.currency}
            />
          ) : (
            <Textbox
              disabled={this.props.viewMode === ViewMode.View ? true : false}
              Required={false}
              ctrlName="currency"
              handleInputChange={(value, ctrlName) =>
                this.onChange(value, ctrlName)
              }
              label="Currency"
              value={this.props.item.currency}
            />
          )}

          <Textbox
            disabled={this.props.viewMode === ViewMode.View ? true : false}
            Required={false}
            ctrlName="unitPrice"
            handleInputChange={(value, ctrlName) =>
              this.onChange(value, ctrlName)
            }
            label="Unit Price"
            value={
              this.props.item.unitPrice
                ? this.props.item.unitPrice.toLocaleString()
                : ""
            }
            isNumber={true}
          />
          <Textbox
            disabled={true}
            Required={false}
            ctrlName="totalPrice"
            handleInputChange={(value, ctrlName) =>
              console.log(value, ctrlName)
            }
            label="Total Price"
            value={this.formatTotalPrice()}
          />
          <Textbox
            disabled={true}
            Required={false}
            ctrlName="prid"
            handleInputChange={(value, ctrlName) =>
              console.log(value, ctrlName)
            }
            label="Purchasing Request Code"
            value={this.props.item.PRCode}
          />
          <Textbox
            disabled={true}
            Required={false}
            ctrlName="po"
            handleInputChange={(value, ctrlName) =>
              console.log(value, ctrlName)
            }
            label="Purchasing Order Code"
            value={this.props.item.POCode}
          />
          {this.props.viewMode === ViewMode.Edit ? (
            <Dropdown
              Required={false}
              ctrlName="status"
              handleInputChange={(value, ctrlName) =>
                this.onChange(value, ctrlName)
              }
              label="Status"
              options={this.props.statusOptions}
              value={this.props.item.status}
            />
          ) : (
            <Textbox
              disabled={this.props.viewMode === ViewMode.View ? true : false}
              Required={false}
              ctrlName="status"
              handleInputChange={(value, ctrlName) =>
                console.log(value, ctrlName)
              }
              label="Status"
              value={this.props.item.status}
            />
          )}

          <UserPicker
            disabled={true}
            ctrlName="assignee"
            single={true}
            label="Assignee"
            selected={this.props.item.assignee}
            onChange={(selected, name) => console.log(selected, name)}
          />
        </Accordion>
      </div>
    );
  }
}
