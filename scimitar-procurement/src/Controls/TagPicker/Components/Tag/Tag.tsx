import * as React from "react";
import ITagProps from "./ITagProps";
import styles from "./TagsStyling.module.scss";

export default class Tag extends React.Component<ITagProps, any> {
  render(): React.ReactNode {
    return (
      <div className={styles.tag}>
        <div>{this.props.tag.name}</div>
        <div>{this.props.tag.key}</div>
      </div>
    );
  }
}
