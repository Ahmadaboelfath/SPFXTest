import { MDBCol, MDBRow } from "mdbreact";
import * as React from "react";
import TagPicker from "../../../../Controls/TagPicker/TagPicker";
import { Textbox } from "../../../../Controls/Textbox";
import Toggle from "../../../../Controls/Toggle/Toggle";
import UserPicker from "../../../../Controls/userPicker";
import IMaterialItemFormProps from "./IMaterialItemFormProps";

export default class MaterialItemForm extends React.Component<
  IMaterialItemFormProps,
  any
> {
  render(): React.ReactNode {
    return (
      <div className="ui form">
        <MDBRow>
          <MDBCol>
            <Textbox
              Required={false}
              ctrlName="order"
              handleInputChange={() => null}
              label="#"
              value={
                this.props.isInEditForm
                  ? this.props.viewModel.order.toString()
                  : this.props.count.toString()
              }
              disabled={true}
            />
            {/* <Toggle
              activeText="Description"
              inactiveText="Code"
              label="Search Type"
              disabled={false}
              controlPropName=""
              onChange={() => this.props.toggleSearchPicker()}
            /> */}
            <TagPicker
              errorMessage=" "
              label={
                this.props.searchByCode
                  ? "Material Code"
                  : "Material Description"
              }
              multiple={false}
              controlName="materialPicker"
              onChange={(selectedItems, controlName) =>
                this.props.onChange(selectedItems, controlName)
              }
              onResolveSuggestions={(filter, selectedItem) =>
                this.props.onSearch(filter, selectedItem)
              }
              selectedValue={this.props.viewModel.materialTag}
              pickerSuggestionsProps={this.props.tagPickerSuggesstionProps}
              disabled={true}
            />
            <Textbox
              Required={false}
              ctrlName="description"
              handleInputChange={() => null}
              label="Description"
              value={this.props.viewModel.description}
              disabled={true}
            />
            <Textbox
              Required={false}
              ctrlName="unit"
              handleInputChange={(value, controlName) =>
                this.props.onChange(value, controlName)
              }
              label="Unit"
              value={this.props.viewModel.unit}
              disabled={true}
            />
            <Textbox
              Required={false}
              ctrlName="quantity"
              handleInputChange={(value, controlName) =>
                this.props.onChange(value, controlName)
              }
              label="Quantity"
              value={this.props.viewModel.quantity.toString()}
              disabled={false}
            />
            <Textbox
              Required={false}
              ctrlName="balance"
              handleInputChange={(value, controlName) =>
                this.props.onChange(value, controlName)
              }
              label="Balance"
              value={this.props.viewModel.balance.toString()}
              disabled={false}
            />
            {!this.props.singleAssignee && (
              <UserPicker
                ctrlName="assignee"
                onChange={(data, ctrlName) =>
                  this.props.onChange(data, ctrlName)
                }
                selected={this.props.viewModel.assignee}
                label="Assignee"
              />
            )}
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}
