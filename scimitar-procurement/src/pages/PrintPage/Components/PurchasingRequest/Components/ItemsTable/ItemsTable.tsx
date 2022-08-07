import * as React from "react";
import IItemsTableProps from "./IItemsTableProps";
import styles from "./ItemsTable.module.scss";

export default class ItemsTable extends React.Component<IItemsTableProps, any> {
  renderItems() {
    return this.props.items.map((item, index) => {
      return (
        <tr>
          <td className={styles.dataCol}>{index + 1}</td>
          <td className={styles.dataCol}>{item.quantity}</td>
          <td className={styles.dataCol}>{item.unit}</td>
          <td className={styles.dataCol}>{item.description}</td>
          <td className={styles.dataCol}>{item.code}</td>
          <td className={styles.dataCol}>{item.balance}</td>
          <td className={styles.dataCol}>{this.props.supplier}</td>
        </tr>
      );
    });
  }

  render(): React.ReactNode {
    return (
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.col}>#</th>
              <th className={styles.col}>Qty</th>
              <th className={styles.col}>Unit</th>
              <th className={styles.ultraWideCol}>Description</th>
              <th className={styles.wideCol}>Item Code</th>
              <th className={styles.col}>Balance</th>
              <th className={styles.wideCol}>Proposed Supplier</th>
            </tr>
          </thead>
          <tbody>{this.renderItems()}</tbody>
        </table>
      </div>
    );
  }
}
