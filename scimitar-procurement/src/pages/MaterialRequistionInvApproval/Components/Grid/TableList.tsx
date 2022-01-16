import * as React from "react";
import { Icon } from "office-ui-fabric-react";

import { MDBDataTable, MDBTableHead, MDBTableBody } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { Link } from "react-router-dom";

import styles from "../../../../CoreComponents/Componentstyles.module.scss";
import MaterialRequestionItem from "../../../../Models/ClassModels/MaterialRequesitionItem";

export interface ITableListProps {
  activeSites?: any[];
  activeTab?: string;
  items: MaterialRequestionItem[];
}

export const TableList: React.FC<ITableListProps> = (props) => {
  SPComponentLoader.loadCss(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
  );
  const generateTableRows = (): any[] => {
    const sortedRows = props.items.sort((a, b) => a.order - b.order);
    const rows = sortedRows.map((item, index) => {
      return {
        order: item.order,
        code: item.code,
        description: item.description,
        unit: item.unit,
        quantity: item.quantity,
      };
    });

    return rows;
  };

  const dataTableList = {
    columns: [
      {
        label: "#",
        field: "order",
        sort: "asc",
        width: 150,
      },
      {
        label: "Material Code",
        field: "code",
        sort: "asc",
        width: 150,
      },
      {
        label: "Description",
        field: "description",
        sort: "asc",
        width: 150,
      },
      {
        label: "Unit",
        field: "unit",
        sort: "asc",
        width: 150,
      },
      {
        label: "Quantity",
        field: "quantity",
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
