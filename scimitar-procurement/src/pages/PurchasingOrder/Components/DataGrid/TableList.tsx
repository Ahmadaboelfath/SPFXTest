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
import MaterialRequestionItem from "../../../../Models/ClassModels/MaterialRequesitionItem";

export interface ITableListProps {
  materialRequsitionItems: MaterialRequestionItem[];
  onEditClick(item, index): void;
  onViewClick(item, index): void;
}

export const TableList: React.FC<ITableListProps> = (props) => {
  SPComponentLoader.loadCss(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
  );
  const generateTableRows = (): any[] => {
    const rows = props.materialRequsitionItems.map((item, index) => {
      return {
        title: item.description,
        pr: item.PRCode,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        actions: (
          <div className={styles.tableAction}>
            <span>
              {" "}
              <span onClick={() => props.onEditClick(item, index)}>
                <Icon iconName="Edit" />
              </span>
            </span>
            <span onClick={() => props.onViewClick(item, index)}>
              {" "}
              <Icon iconName="View" />
            </span>
          </div>
        ),
      };
    });

    return rows;
  };

  const dataTableList = {
    columns: [
      {
        label: "description",
        field: "title",
        sort: "asc",
        width: 300,
      },
      {
        label: "PR",
        field: "pr",
        sort: "asc",
        width: 150,
      },
      {
        label: "Quantity",
        field: "quantity",
        sort: "asc",
        width: 150,
      },
      {
        label: "Unit Price",
        field: "unitPrice",
        sort: "asc",
        width: 150,
      },
      {
        label: "Actions",
        field: "actions",
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
