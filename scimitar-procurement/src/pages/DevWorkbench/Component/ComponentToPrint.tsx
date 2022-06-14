import * as React from "react";
import styles from "./style.module.scss";

export default class ComponentToPrint extends React.Component<any, any> {
  arr = ["Ahmad", "Mohamed", "Mostafa"];

  renderData() {
    return this.arr.map((item) => (
      <tr>
        <td className={styles.cell}>{item}</td>
        <td className={styles.cell}>{item}</td>
        <td className={styles.cell}>{item}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.table}>
          <table>
            <thead>
              <th className={styles.cellBold}>column 1</th>
              <th className={styles.cellBold}>column 2</th>
              <th className={styles.cellBold}>column 3</th>
            </thead>
            <tbody>{this.renderData()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
