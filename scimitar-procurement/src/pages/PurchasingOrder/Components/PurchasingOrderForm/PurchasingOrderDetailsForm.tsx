import * as React from "react";
import { CheckBox } from "../../../../Controls/checkBox";
import { Dropdown } from "../../../../Controls/dropdown";
import { Textbox } from "../../../../Controls/Textbox";
import { ViewMode } from "../../../MaterialRequsitionItem/ViewMode";
import IPurchasingOrderDetailsFormProps from "./IPurchasingOrderDetailsFormProps";
import IPurchasingOrderDetailsFormState from "./IPurchasingOrderDetailsFormState";
import { DropdownItemProps } from "semantic-ui-react";
import { Datepicker } from "../../../../Controls/datepicker";
import { Textarea } from "../../../../Controls/textarea";

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
          label="Purchase Order Number"
          value={this.props.purchaseOrder.title}
        />
        <Textbox
          disabled={this.props.viewMode === ViewMode.View}
          Required={true}
          ctrlName="incoTerms"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName, true)
          }
          label="Inco Terms"
          value={this.props.purchaseOrder.incoTerms}
          showError={this.props.errors && this.props.errors["incoTerms"]}
          errorMessage={
            this.props.errors && this.props.errors["incoTerms"]
              ? this.props.errors["incoTerms"]
              : ""
          }
        />
        <Dropdown
          disabled={
            this.props.disableDropDowns || this.props.viewMode === ViewMode.View
          }
          Required={true}
          ctrlName="shipMethodId"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName, true)
          }
          label="Shipment Method"
          options={this.props.lookups ? this.props.lookups.ShipMethod : []}
          value={this.props.purchaseOrder.shipMethodId}
          showError={this.props.errors && this.props.errors["shipMethodId"]}
          errorMessage={
            this.props.errors && this.props.errors["shipMethodId"]
              ? this.props.errors["shipMethodId"]
              : ""
          }
        />

        <Dropdown
          disabled={
            this.props.disableDropDowns || this.props.viewMode === ViewMode.View
          }
          Required={true}
          ctrlName="vendorId"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName, true)
          }
          label="Vendor"
          options={this.props.lookups ? this.props.lookups.Vendors : []}
          value={this.props.purchaseOrder.vendorId}
          showError={this.props.errors && this.props.errors["vendorId"]}
          errorMessage={
            this.props.errors && this.props.errors["vendorId"]
              ? this.props.errors["vendorId"]
              : ""
          }
          search={true}
        />
        <Dropdown
          disabled={
            this.props.disableDropDowns || this.props.viewMode === ViewMode.View
          }
          Required={true}
          ctrlName="shipToId"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName, true)
          }
          label="Bill To / Ship To"
          options={this.props.lookups ? this.props.lookups.ShipTo : []}
          value={this.props.purchaseOrder.shipToId}
          showError={this.props.errors && this.props.errors["shipToId"]}
          errorMessage={
            this.props.errors && this.props.errors["shipToId"]
              ? this.props.errors["shipToId"]
              : ""
          }
        />
        <Textbox
          disabled={this.props.viewMode === ViewMode.View}
          Required={true}
          ctrlName="requesitioner"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName, true)
          }
          label="Requesitioner"
          value={this.props.purchaseOrder.requesitioner}
          showError={this.props.errors && this.props.errors["requesitioner"]}
          errorMessage={
            this.props.errors && this.props.errors["requesitioner"]
              ? this.props.errors["requesitioner"]
              : ""
          }
        />
        <Textbox
          disabled={this.props.viewMode === ViewMode.View}
          Required={true}
          ctrlName="deliveryTerms"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName, true)
          }
          label="Delivery Terms"
          value={this.props.purchaseOrder.deliveryTerms}
          showError={this.props.errors && this.props.errors["deliveryTerms"]}
          errorMessage={
            this.props.errors && this.props.errors["deliveryTerms"]
              ? this.props.errors["deliveryTerms"]
              : ""
          }
        />
        <Textbox
          disabled={this.props.viewMode === ViewMode.View}
          Required={true}
          ctrlName="paymentTerms"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName, true)
          }
          label="Payment Terms"
          value={this.props.purchaseOrder.paymentTerms}
          showError={this.props.errors && this.props.errors["paymentTerms"]}
          errorMessage={
            this.props.errors && this.props.errors["paymentTerms"]
              ? this.props.errors["paymentTerms"]
              : ""
          }
        />
        <div className="field ">
          <label>Partial Shipment</label>
          <br />
          <CheckBox
            LabelText="Partial Shipment"
            ctrName="partialShipment"
            handleInputChange={(value, ctrlName) =>
              this.props.onChange(value, ctrlName, true)
            }
            disabled={this.props.viewMode === ViewMode.View}
            checked={this.props.purchaseOrder.partialShipment}
          />
        </div>
        <Textbox
          disabled={this.props.viewMode === ViewMode.View}
          Required={true}
          ctrlName="vendorAttention"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName, true)
          }
          label="Vendor Attention"
          value={this.props.purchaseOrder.vendorAttention}
          showError={this.props.errors && this.props.errors["vendorAttention"]}
          errorMessage={
            this.props.errors && this.props.errors["vendorAttention"]
              ? this.props.errors["vendorAttention"]
              : ""
          }
        />
        <Textbox
          disabled={this.props.viewMode === ViewMode.View}
          Required={true}
          ctrlName="vendorEmail"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName, true)
          }
          label="Vendor Email"
          value={this.props.purchaseOrder.vendorEmail}
          showError={this.props.errors && this.props.errors["vendorEmail"]}
          errorMessage={
            this.props.errors && this.props.errors["vendorEmail"]
              ? this.props.errors["vendorEmail"]
              : ""
          }
        />
        <Dropdown
          disabled={
            this.props.disableDropDowns || this.props.viewMode === ViewMode.View
          }
          Required={true}
          ctrlName="statusId"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName)
          }
          label="Status"
          options={this.getStatusOptions()}
          value={this.props.purchaseOrder.statusId}
          showError={this.props.errors && this.props.errors["statusId"]}
          errorMessage={
            this.props.errors && this.props.errors["statusId"]
              ? this.props.errors["statusId"]
              : ""
          }
        />
        <Datepicker
          ctrlName="estimatedDelivery"
          handleDate={(date, ctrlName) =>
            this.props.onChange(date, ctrlName, true)
          }
          selected={this.props.purchaseOrder.estimatedDelivery}
          Required={true}
          label="Estimated Delivery Date"
          disabled={
            this.props.disableDropDowns || this.props.viewMode === ViewMode.View
          }
          showError={
            this.props.errors && this.props.errors["estimatedDelivery"]
          }
          errorMessage={
            this.props.errors && this.props.errors["estimatedDelivery"]
              ? this.props.errors["estimatedDelivery"]
              : ""
          }
        />
        <Textarea
          Required={false}
          ctrlName="notes"
          handleInputChange={(value, ctrlName) =>
            this.props.onChange(value, ctrlName, true)
          }
          value={this.props.purchaseOrder.notes}
          disabled={this.props.viewMode === ViewMode.View}
          label="Notes"
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
