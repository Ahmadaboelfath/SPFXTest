import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Popup } from "semantic-ui-react";
import styles from "./Forms.module.scss";

interface peoplepickerProps {
  selectedItems(items: any[], controlName);
  context: any;
  label: string;
  showError?: Boolean;
  Required: boolean;
  errorMessage?: string;
  disabled?: boolean;
  tooltip?: Boolean;
  tooltipText?: string;
  defaultSelectedUsers?: Array<string>;
  groupName?: string;
  isMultiple?: boolean;
  ctrlName: string;
  placeholder?: string;
}

export const Peoplepicker: React.FC<peoplepickerProps> = (props) => {
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
      <div
        className={
          "field error" + (props.disabled ? "disabledPeoplePicker" : "")
        }
      >
        <label>
          {props.label}
          {requiredView} {tooltipView}
        </label>

        <PeoplePicker
          context={props.context}
          personSelectionLimit={props.isMultiple ? 15 : 1}
          showtooltip={true}
          required={props.Required}
          onChange={(items) => props.selectedItems(items, props.ctrlName)}
          disabled={props.disabled}
          showHiddenInUI={false}
          principalTypes={[PrincipalType.User]}
          ensureUser={true}
          resolveDelay={1000}
          defaultSelectedUsers={props.defaultSelectedUsers}
          groupName={props.groupName}
          placeholder={props.placeholder}
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
    <div className={"field " + (props.disabled ? "disabledPeoplePicker" : "")}>
      <label>
        {props.label}
        {requiredView} {tooltipView}
      </label>
      <PeoplePicker
        context={props.context}
        personSelectionLimit={props.isMultiple ? 15 : 1}
        showtooltip={true}
        disabled={props.disabled}
        required={props.Required}
        onChange={(items) => props.selectedItems(items, props.ctrlName)}
        showHiddenInUI={false}
        principalTypes={[PrincipalType.User]}
        ensureUser={true}
        resolveDelay={1000}
        defaultSelectedUsers={props.defaultSelectedUsers}
        placeholder={props.placeholder}
      />
    </div>
  );
};
