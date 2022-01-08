import * as React from "react";
import { Checkbox, ICheckboxProps } from "office-ui-fabric-react/lib/Checkbox";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import styles from "./Forms.module.scss";
import { Popup } from "semantic-ui-react";
interface IVFCheckBoxProps {
  handleInputChange(event, isChecked);
  LabelText: string;
  Required?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  showError?: boolean;
  ctrName: string;
  tooltip?: boolean;
  tooltipText?: string;
  checked?: boolean;
  switchBox?: boolean;
}

export const CheckBox: React.FC<IVFCheckBoxProps> = (props) => {
  if (props.switchBox) {
    return (
      <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input"
          id={props.ctrName}
          checked={props.checked}
          onChange={(e) => props.handleInputChange}
        />
        <label className="custom-control-label" htmlFor={props.ctrName}>
          {props.LabelText}
        </label>
      </div>
    );
  } else {
    return (
      <>
        <Checkbox
          onChange={props.handleInputChange}
          name={props.ctrName}
          label={props.LabelText}
          checked={props.checked}
        />
        {props.showError && (
          <div className={styles.validateMsg}>{props.errorMessage}</div>
        )}
      </>
    );
  }
};
