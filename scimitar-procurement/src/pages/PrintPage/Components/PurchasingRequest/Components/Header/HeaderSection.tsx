import * as React from "react";
import IHeaderProps from "./IHeaderProps";
import styles from "./Header.module.scss";
import DataTable from "./Components/DataTable/DataTable";
import DataRow from "./Components/DataRow/DataRow";
import EmptyDataRow from "./Components/DataRow/EmptyDataRow";

export default class Header extends React.Component<IHeaderProps, any> {
  render(): React.ReactNode {
    return (
      <table className={styles.headerContainer}>
        <tbody>
          <tr>
            <td className={styles.tableDetails}>
              {" "}
              <DataTable>
                <DataRow
                  dataRows={{
                    name: "Date",
                    value: new Date().toDateString(),
                  }}
                />
                <DataRow
                  dataRows={{
                    name: "PR NO",
                    value:
                      this.props.purchaseRequestViewModel.purchaseRequest
                        .requestCode,
                  }}
                />
                <DataRow
                  dataRows={{
                    name: "Requested By",
                    value:
                      this.props.purchaseRequestViewModel.materialRequisition
                        .requestedBy,
                  }}
                />
                <DataRow
                  dataRows={{
                    name: "Department",
                    value:
                      this.props.purchaseRequestViewModel.materialRequisition
                        .department,
                  }}
                />
              </DataTable>
            </td>
            <td className={styles.companyDetailsContainer}>
              <img
                src={require("../../../../../../assets/logo.png")}
                alt="Logo"
                className={styles.image}
              />
              <div className={styles.companyName}>
                <p>Scimitar Production Egypt Ltd</p>
                <p>Purchase Requisition</p>
              </div>
            </td>
            <td className={styles.tableDetails}>
              <DataTable>
                <EmptyDataRow />
                <DataRow
                  dataRows={{
                    name: "Priority",
                    value:
                      this.props.purchaseRequestViewModel.materialRequisition
                        .priority,
                  }}
                />
                <DataRow dataRows={{ name: "Est. Cost.", value: "" }} />
                <DataRow
                  dataRows={{
                    name: "Currency",
                    value:
                      this.props.purchaseRequestViewModel.materialRequisition
                        .currency,
                  }}
                />
              </DataTable>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
