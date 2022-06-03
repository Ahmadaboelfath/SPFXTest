import { Dropdown, IDropdownOption } from "office-ui-fabric-react";
import * as React from "react";
import { Textbox } from "../../../../Controls/Textbox";
import IMaterialDropdownOption from "../../../../Models/InterfaceModels/IMaterialDropDownOption";
import ItemSubFormProps from "./ItemSubFormProps";

export default class ItemSubForm extends React.Component<
  ItemSubFormProps,
  any
> {
  onChange(option: IDropdownOption, index) {
    const selectedOption: IMaterialDropdownOption =
      option as IMaterialDropdownOption;

    this.props.handleChange(selectedOption.item, selectedOption.key);
  }

  render(): React.ReactNode {
    return (
      <div className="ui form">
        <Dropdown
          options={this.props.options}
          onChange={(event, option, index) => this.onChange(option, index)}
          selectedKey={this.props.selectedKey}
          disabled={this.props.dropdownDisabled}
          label="Item"
        />
        <Textbox
          Required={false}
          ctrlName=""
          handleInputChange={() => null}
          label="PR-Code"
          value={this.props.selectedItem.PRCode}
          disabled={true}
        />

        <Textbox
          Required={false}
          ctrlName=""
          handleInputChange={() => null}
          label="Quantity"
          value={
            this.props.selectedItem.quantity
              ? this.props.selectedItem.quantity.toString()
              : "0"
          }
          disabled={true}
        />
        <Textbox
          Required={false}
          ctrlName=""
          handleInputChange={() => null}
          label="Unit Price"
          value={
            this.props.selectedItem.unitPrice
              ? this.props.selectedItem.unitPrice.toString()
              : "0"
          }
          disabled={true}
        />
      </div>
    );
  }
}
