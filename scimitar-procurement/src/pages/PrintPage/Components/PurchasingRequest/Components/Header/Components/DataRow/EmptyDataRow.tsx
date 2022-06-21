import * as React from "react";
import styles from "./DataRow.module.scss";

export default class EmptyDataRow extends React.Component<any, any> {
  render(): React.ReactNode {
    return (
      <tr className={styles.emptyRow}>
        <td>
          <img
            src={require("../../../../../../../../assets/images/Empty.png")}
            alt="empty"
            className={styles.emptyImage}
          />
        </td>
      </tr>
    );
  }
}
