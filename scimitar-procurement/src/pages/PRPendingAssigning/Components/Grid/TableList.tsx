import * as React from "react";
import { Icon } from "office-ui-fabric-react";

import { MDBDataTable, MDBTableHead, MDBTableBody } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { Link } from "react-router-dom";

import styles from "../../../../CoreComponents/Componentstyles.module.scss";
import PurchasingRequest from "../../../../Models/ClassModels/PurchasingRequest";

export interface ITableListProps {
  purchasingRequest: PurchasingRequest[];
}

export const TableList: React.FC<ITableListProps> = (props) => {
  SPComponentLoader.loadCss(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
  );
  const generateTableRows = (): any[] => {
    const rows = props.purchasingRequest.map((pr) => {
      return {
        title: (
          <Link
            to={`PRAssigning/${pr.id}`}
            style={{ textDecoration: "Underline" }}
          >
            {pr.requestCode}
          </Link>
        ),
        assignedTo: pr.assignedTo,
      };
    });

    return rows;
  };

  const dataTableList = {
    columns: [
      {
        label: "Request Code",
        field: "title",
        sort: "asc",
        width: 150,
      },
      {
        label: "Assigned To",
        field: "assignedTo",
        sort: "asc",
        width: 150,
      },
    ],
    rows: generateTableRows(),
  };

  return (
    <MDBDataTable
      btn
      fixed
      noBottomColumns
      striped
      bordered
      hover
      entries={50}
      disableRetreatAfterSorting
      data={dataTableList}
      className={styles.tableStyle}
    />
  );
};
