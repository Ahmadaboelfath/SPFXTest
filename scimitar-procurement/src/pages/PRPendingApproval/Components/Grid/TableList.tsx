import * as React from "react";
import { Icon } from "office-ui-fabric-react";

import { MDBDataTable, MDBTableHead, MDBTableBody } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { Link } from "react-router-dom";

import styles from "../../../../CoreComponents/Componentstyles.module.scss";
import InvApproval from "../../../../Models/ClassModels/InvApproval";

export interface ITableListProps {
  materialRequesitionsApprovals: InvApproval[];
}

export const TableList: React.FC<ITableListProps> = (props) => {
  SPComponentLoader.loadCss(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
  );
  const generateTableRows = (): any[] => {
    const rows = props.materialRequesitionsApprovals.map((approval) => {
      return {
        title: (
          <Link
            to={`MaterialRequestInvApproval/${approval.id}`}
            style={{ textDecoration: "Underline" }}
          >
            {approval.materialRequistionCode}
          </Link>
        ),
        department: approval.department,
        requester: approval.requester,
        priority: approval.priority,
        requestType: approval.requestType,
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
        label: "Requester",
        field: "requester",
        sort: "asc",
        width: 150,
      },

      {
        label: "Department",
        field: "department",
        sort: "disabled",
        width: 150,
      },
      {
        label: "Request Type",
        field: "requestType",
        sort: "disabled",
        width: 150,
      },
      {
        label: "Priority",
        field: "priority",
        sort: "disabled",
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
