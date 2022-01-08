import * as React from "react";
import {
  Dropdown as DDL,
  DropdownItemProps,
  DropdownProps,
} from "semantic-ui-react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Popup } from "semantic-ui-react";
import styles from "./Forms.module.scss";

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
  search?: boolean;
  placeholder?: string;
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

  const onChange = (dropDown: DropdownProps, ctrlName: string) => {
    const value = dropDown.value;

    props.handleInputChange(value, ctrlName);
  };

  let mainDevStyle = "field";
  if (props.showError) {
    mainDevStyle = "field error";
  }
  if (props.search) {
    return (
      <div className={mainDevStyle}>
        <label>
          {props.label} {requiredStr} {tooltipView}
        </label>
        <DDL
          name={props.ctrlName}
          onChange={(e, d) => onChange(d, props.ctrlName)}
          options={props.options}
          value={props.value}
          disabled={props.disabled}
          multiple={props.multiple}
          search
          fluid
          selection
          clearable
          placeholder={props.placeholder}
          onClose={() => console.log("close")}
        />

        {props.showError && (
          <div className={styles.validateMsg}>
            <p>
              <Icon iconName="info" />
              {props.errorMessage}
            </p>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className={mainDevStyle}>
        <label>
          {props.label} {requiredStr} {tooltipView}
        </label>
        <DDL
          name={props.ctrlName}
          onChange={(e, d) => onChange(d, props.ctrlName)}
          options={props.options}
          value={props.value}
          disabled={props.disabled}
          multiple={props.multiple}
          fluid
          selection
          clearable
          placeholder={props.placeholder}
        />

        {props.showError && (
          <div className={styles.validateMsg}>
            <p>
              <Icon iconName="info" />
              {props.errorMessage}
            </p>
          </div>
        )}
      </div>
    );
  }
};
