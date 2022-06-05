import * as React from "react";
import { CheckBox } from "../../../../Controls/checkBox";
import { Dropdown } from "../../../../Controls/dropdown";
import { Textbox } from "../../../../Controls/Textbox";
import { ViewMode } from "../../../MaterialRequsitionItem/ViewMode";
import IPurchasingOrderDetailsFormProps from "./IPurchasingOrderDetailsFormProps";
import IPurchasingOrderDetailsFormState from "./IPurchasingOrderDetailsFormState";
import { DropdownItemProps } from "semantic-ui-react";

export default class PurchasingOrderDetailsForm extends React.Component<
  IPurchasingOrderDetailsFormProps,
  IPurchasingOrderDetailsFormState
> {
  render(): React.ReactNode {
    // console.log(this.props.viewMode);
    return (
      <div className="ui form">
        <Textbox
          disabled={true}
          Required={false}
          ctrlName="title"
          handleInputChange={(value, ctrlName) => null}
          label="Purchase Request Code"
          value={this.props.purchaseOrder.title}
        />
        <Textbox
          disabled={this.props.viewMode === ViewMode.View}
          Required={false}
          ctrlName="incoTerms"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Inco Terms"
          value={this.props.purchaseOrder.incoTerms}
        />
        <Dropdown
          disabled={
            this.props.disableDropDowns || this.props.viewMode === ViewMode.View
          }
          Required={false}
          ctrlName="shipMethodId"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Shipment Method"
          options={this.props.lookups ? this.props.lookups.ShipMethod : []}
          value={this.props.purchaseOrder.shipMethodId}
        />

        <Dropdown
          disabled={
            this.props.disableDropDowns || this.props.viewMode === ViewMode.View
          }
          Required={false}
          ctrlName="vendorId"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Vendor"
          options={this.props.lookups ? this.props.lookups.Vendors : []}
          value={this.props.purchaseOrder.vendorId}
        />
        <Dropdown
          disabled={
            this.props.disableDropDowns || this.props.viewMode === ViewMode.View
          }
          Required={false}
          ctrlName="shipToId"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Ship To"
          options={this.props.lookups ? this.props.lookups.ShipTo : []}
          value={this.props.purchaseOrder.shipToId}
        />
        <Textbox
          disabled={this.props.viewMode === ViewMode.View}
          Required={false}
          ctrlName="requesitioner"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Requesitioner"
          value={this.props.purchaseOrder.requesitioner}
        />
        <Textbox
          disabled={this.props.viewMode === ViewMode.View}
          Required={false}
          ctrlName="deliveryTerms"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Delivery Terms"
          value={this.props.purchaseOrder.deliveryTerms}
        />
        <Textbox
          disabled={this.props.viewMode === ViewMode.View}
          Required={false}
          ctrlName="paymentTerms"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Payment Terms"
          value={this.props.purchaseOrder.paymentTerms}
        />
        <div className="field ">
          <label>Partial Shipment</label>
          <br />
          <CheckBox
            LabelText="Partial Shipment"
            ctrName="partialShipment"
            handleInputChange={(value, ctrlName) =>
              this.props.onChange(value, ctrlName)
            }
            disabled={this.props.viewMode === ViewMode.View}
            checked={this.props.purchaseOrder.partialShipment}
          />
        </div>
        <Textbox
          disabled={this.props.viewMode === ViewMode.View}
          Required={false}
          ctrlName="vendorAttention"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Vendor Attention"
          value={this.props.purchaseOrder.vendorAttention}
        />
        <Textbox
          disabled={this.props.viewMode === ViewMode.View}
          Required={false}
          ctrlName="vendorEmail"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Vendor Email"
          value={this.props.purchaseOrder.vendorEmail}
        />
        <Dropdown
          disabled={
            this.props.disableDropDowns || this.props.viewMode === ViewMode.View
          }
          Required={false}
          ctrlName="statusId"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Status"
          options={this.getStatusOptions()}
          value={this.props.purchaseOrder.statusId}
        />
      </div>
    );
  }
  getStatusOptions(): DropdownItemProps[] {
    if (this.props.lookups && this.props.lookups["Status"]) {
      const statusLookups = this.props.lookups["Status"];
      const purchaseOrderStatus = statusLookups.filter(
        (lookup) =>
          lookup.group === "General" || lookup.group === "PurchaseOrder"
      );
      return purchaseOrderStatus;
    } else {
      return [];
    }
  }
}
