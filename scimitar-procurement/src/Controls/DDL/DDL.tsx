import * as React from "react";
import Select, { createFilter } from "react-select";
import { Guid } from "@microsoft/sp-core-library";
import { red } from "@material-ui/core/colors";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Popup } from "semantic-ui-react";
import styles from "../Forms.module.scss";

interface IDDLOption{
  labelPropName: string;
  valuePropName: string;
}


interface IDDLProps{
  options: any[];
  onChange: (selectedValue: any, ctrlName: string)=> void;
  selected: any;
  mappedPropNames: IDDLOption;
  disabled: boolean;
  ctrlName?: string;
  label?: string;
  required?:boolean;
  showError?: boolean;
  errorMessage?: string;
  tooltip?: Boolean;
  tooltipText?: string| JSX.Element;
}


export default class DDL extends React.Component<IDDLProps, any> {
  private controlId: Guid;

  constructor(props) {
    super(props);
    this.controlId = Guid.newGuid();
  }

  

  onChange(selectedOption) {
    const selectedItem = this.props.options.filter((option) => {
      return (
        option[this.props.mappedPropNames.valuePropName] ===
        selectedOption.value
      );
    })[0];

    this.props.onChange(selectedItem, this.props.ctrlName);
  }

  mapValue() {
    if (this.props.selected) {
      return {
        label: this.props.selected[this.props.mappedPropNames.labelPropName],
        value: this.props.selected[this.props.mappedPropNames.valuePropName],
      };
    } else {
      return {
        label: "",
        value: "",
      };
    }
  }

  mapOptions() {
    if (this.props.options) {
      return this.props.options.map((option) => {
        return {
          label: option[this.props.mappedPropNames.labelPropName],
          value: option[this.props.mappedPropNames.valuePropName],
        };
      });
    } else {
      return [];
    }
  }



  render() {

      
  let mainDevStyle = "field";
  if (this.props.showError) {
    mainDevStyle = "field error";
  }
  let requiredStr;
  let tooltipView: {};
  if (this.props.required) {
    requiredStr = <span className="req">*</span>;
  }

  if (this.props.tooltip)
  tooltipView= this.props.tooltipText instanceof String?  <Popup content={this.props.tooltipText} trigger={<Icon iconName='Info' className="tooltip-icon"/>} />:<Popup children={this.props.tooltipText} trigger={<Icon iconName='Info' className="tooltip-icon"/>} />;



    return (
      <div className={mainDevStyle}>
      <label>
        {this.props.label} {requiredStr} {tooltipView}
      </label>
          <Select
            classNamePrefix='filter'
            isDisabled={this.props.disabled}
            options={this.mapOptions()}
            value={this.mapValue()}
            onChange={(selectedOption) => this.onChange(selectedOption)}
            
          />


{this.props.showError && (
            <div className="validateMsg">
            <p>
              <Icon iconName="info" />
              {this.props.errorMessage}
            </p>
          </div>
        )}

      </div>
    );
  }
}
