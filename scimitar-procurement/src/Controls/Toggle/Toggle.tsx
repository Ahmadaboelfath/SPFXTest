import IToggleProps from "./IToggleProps";
import { Toggle as OfficeUiToggle } from "office-ui-fabric-react";
import * as React from "react";

export default class Toggle extends React.Component<IToggleProps, any> {
  onChange() {
    this.props.onChange(this.props.controlPropName);
  }

  render(): React.ReactNode {
    return (
      <div className="field">
        <label>{this.props.label}</label>
        <OfficeUiToggle
          onChange={() => this.onChange()}
          onText={this.props.activeText}
          offText={this.props.inactiveText}
          disabled={this.props.disabled ? true : false}
        />
      </div>
    );
  }
}
