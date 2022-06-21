import * as React from "react";
import IDataTableProps from "./IDataTableProps";
import dataTableStyles from "./DataTable.module.scss";

export default class DataTable extends React.Component<IDataTableProps, any> {
  render(): React.ReactNode {
    return (
      <table className={dataTableStyles.table}>
        <tbody>{this.props.children}</tbody>
      </table>
    );
  }
}
