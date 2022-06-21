import * as React from "react";
import IDataRowProps from "./IDataRowProps";
import styles from "./DataRow.module.scss";

export default class DataRow extends React.Component<IDataRowProps, any> {
  render(): React.ReactNode {
    return (
      <tr className={styles.row}>
        <td>{this.props.dataRows.name}</td>
        <td>:</td>
        <td>{this.props.dataRows.value}</td>
      </tr>
    );
  }
}
