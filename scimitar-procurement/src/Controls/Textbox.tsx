import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Popup } from "semantic-ui-react";
import styles from "./Forms.module.scss";

interface textboxProps {
  value: string;
  handleInputChange(value, controlName);
  ctrlName: string;
  label: string;
  showError?: Boolean;
  Required: boolean;
  errorMessage?: string;
  tooltip?: Boolean;
  tooltipText?: string;
  disabled?: boolean;
  showPlaceholder?: boolean;
  placeholder?: string;
}

export const Textbox: React.FC<textboxProps> = (props) => {
  let requiredView: {};
  let tooltipView: {};
  if (props.Required) requiredView = <span className="req">*</span>;

  if (props.tooltip)
    tooltipView = (
      <Popup
        content={props.tooltipText}
        trigger={<Icon iconName="Info" className="tooltip-icon" />}
      />
    );

  if (props.showError)
    return (
      <div className="field error">
        <label>
          {props.label}
          {requiredView}
        </label>
        <input
          name={props.ctrlName}
          type="text"
          value={props.value}
          placeholder={props.placeholder}
          required={props.Required}
          onChange={(event) =>
            props.handleInputChange(event.target.value, props.ctrlName)
          }
          disabled={props.disabled}
        />

        <div className={styles.validateMsg}>
          <p>
            <Icon iconName="info" />
            {props.errorMessage}
          </p>
        </div>
      </div>
    );

  return (
    <div className="field ">
      <label>
        {props.label}
        {requiredView} {tooltipView}
      </label>
      <input
        name={props.ctrlName}
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        required={props.Required}
        onChange={(event) =>
          props.handleInputChange(event.target.value, props.ctrlName)
        }
        disabled={props.disabled}
      />
    </div>
  );
};
