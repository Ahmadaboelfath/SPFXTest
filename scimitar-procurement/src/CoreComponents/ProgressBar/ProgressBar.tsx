import * as React from "react";
import IProgressBarProps from "./IProgressBarProps";
import classes from "./ProgressBar.module.scss";

export default class ProgressBar extends React.Component<
  IProgressBarProps,
  {}
> {
  private containerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
  };

  private fillerStyles = {
    height: "100%",
    width: `${this.props.completedPercentage}%`,
    backgroundColor: "red",
    borderRadius: "inherit",
    textAlign: "right",
  };

  private labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  public render() {
    return (
      <div style={this.containerStyles}>
        <div
          style={{
            height: "100%",
            width: `${this.props.completedPercentage}%`,
            backgroundColor: "red",
            borderRadius: "inherit",
            textAlign: "right",
          }}
        >
          <span
            style={{ padding: 5, color: "white", fontWeight: "bold" }}
          >{`${this.props.completedPercentage}%`}</span>
        </div>
      </div>
    );
  }
}
