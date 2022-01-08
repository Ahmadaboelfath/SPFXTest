import * as React from "react";
import {
  Dropdown as DDL,
  DropdownItemProps,
  DropdownProps,
} from "semantic-ui-react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Popup } from "semantic-ui-react";
import styles from "./Forms.module.scss";
import Select, { createFilter } from "react-select";

interface IDropdownProps {
  options: DropdownItemProps[];
  value?: any;
  handleInputChange(value, ctrlName);
  ctrlName: string;
  label: string;
  Required: boolean;
  errorMessage?: string;
  showError?: Boolean;
  tooltip?: Boolean;
  tooltipText?: string;
  disabled?: boolean;
  multiple?: boolean;
  placeholder?: string;
  customDDl?: boolean;
  mappedPropNames?: any;
  selected?: any;
}

export const Dropdown: React.FC<IDropdownProps> = (props) => {
  let requiredStr;
  let tooltipView: {};
  if (props.Required) {
    requiredStr = <span className="req">*</span>;
  }

  if (props.tooltip)
    tooltipView = (
      <Popup
        content={props.tooltipText}
        trigger={<Icon iconName="Info" className="tooltip-icon" />}
      />
    );

  const mapValue = () => {
    if (props.selected) {
      return {
        label: props.selected[props.mappedPropNames.labelPropName],
        value: props.selected[props.mappedPropNames.valuePropName],
      };
    } else {
      return {
        label: "",
        value: "",
      };
    }
  };

  const mapOptions = () => {
    if (props.options) {
      return props.options.map((option) => {
        return {
          label: option[props.mappedPropNames.labelPropName],
          value: option[props.mappedPropNames.valuePropName],
        };
      });
    } else {
      return [];
    }
  };

  const onChange = (dropDown: DropdownProps, ctrlName: string) => {
    if (props.customDDl == true) {
      const selectedItem = props.options.filter((option) => {
        return option[props.mappedPropNames.valuePropName] === dropDown.value;
      })[0];

      console.log(dropDown);
      props.handleInputChange(selectedItem, props.ctrlName);
    } else {
      const value = dropDown.value;

      props.handleInputChange(value, ctrlName);
    }

  };

  let mainDevStyle = "field";
  if (props.showError) {
    mainDevStyle = "field error";
  }
    return (
      <div className={mainDevStyle}>
        <label>
          {props.label} {requiredStr} {tooltipView}
        </label>


{props.customDDl == true ?  
          <Select
            isDisabled={props.disabled}
            options={mapOptions()}
            value={mapValue()}
            onChange={(e, d) => onChange(e, props.ctrlName)}
            multiple={props.multiple}
          /> :  


        <Select
                            id={props.ctrlName}
                            options={props.options}
                            onChange={(e, d) => onChange(e, props.ctrlName)}
                            value={props.value}
                            isDisabled={props.disabled}
                            multiple={props.multiple}
                          />



}
        {props.showError && (
            <div className="validateMsg">
            <p>
              <Icon iconName="info" />
              {props.errorMessage}
            </p>
          </div>
        )}
      </div>
    );
};
