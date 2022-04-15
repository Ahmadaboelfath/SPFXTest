import * as React from "react";

export default class ComponentToPrint extends React.Component<any, any> {
  arr = ["Ahmad", "Mohamed", "Mostafa"];

  renderData() {
    return this.arr.map((item) => (
      <tr>
        <td style={{ fontSize: 20 }}>{item}</td>
        <td style={{ fontSize: 20 }}>{item}</td>
        <td style={{ fontSize: 20 }}>{item}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div style={{ marginLeft: 100 }}>
        <table>
          <thead>
            <th>column 1</th>
            <th>column 2</th>
            <th>column 3</th>
          </thead>
          <tbody>{this.renderData()}</tbody>
        </table>
      </div>
    );
  }
}
