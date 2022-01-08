import * as React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Popup } from "semantic-ui-react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import styles from "./Forms.module.scss";
import { consts } from "../shared/consts";

interface IDatePickerProps {
  handleDate(date, ctrlname);
  selected: any;
  label?: string;
  tooltip?: Boolean;
  tooltipText?: string;
  disabled?: boolean;
  ctrlName: string;
  Required?: boolean;
  showError?: boolean;
  errorMessage?: string;
  minDate?: string;
}

export const Datepicker: React.FC<IDatePickerProps> = (props) => {
  let tooltipView: {};
  let requiredStr;
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
  const today = new Date();
  return (
    <div className="field">
      <div
        className={
          props.disabled
            ? "disabledDatePicker"
            : props.showError
            ? "field error"
            : "DatePickerInput"
        }
      >
        {props.label ? (
          <label>
            {props.label}
            {requiredStr}
            {tooltipView}
          </label>
        ) : (
          ""
        )}
        <DatePicker
          name={props.ctrlName}
          selected={props.selected}
          onChange={(d) => props.handleDate(d, props.ctrlName)}
          isClearable="true"
          maxDate={today.setUTCFullYear(today.getUTCFullYear() + 5)}
          minDate={props.minDate ? new Date(props.minDate) : null}
          dateFormat={consts.DateFormat}
          disabled={props.disabled}
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
    </div>
  );
};
