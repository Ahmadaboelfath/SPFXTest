import * as React from "react";
import { Icon } from "office-ui-fabric-react";

import { MDBDataTable, MDBTableHead, MDBTableBody } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { Link } from "react-router-dom";

import styles from "../../../../CoreComponents/Componentstyles.module.scss";

import { ViewMode } from "../../../MaterialRequsitionItem/ViewMode";
import PurchasingOrder from "../../../../Models/ClassModels/PurchasingOrder";

export interface ITableListProps {
  purchasingOrders: PurchasingOrder[];
}

export const TableList: React.FC<ITableListProps> = (props) => {
  SPComponentLoader.loadCss(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
  );
  const generateTableRows = (): any[] => {
    const rows = props.purchasingOrders.map((item, index) => {
      return {
        title: (
          <Link to={`/purchasingOrder/view/${item.id}`}>{item.title}</Link>
        ),
        field: item.statusTitle,
        shipTo: item.shipToTitle,
        vendor: item.vendorTitle,
        vendorAttention: item.vendorAttention,
        shipMethod: item.shipMethodTitle,
        status: item.statusTitle,
      };
    });

    return rows;
  };

  const dataTableList = {
    columns: [
      {
        label: "Code",
        field: "title",
        sort: "asc",
        width: 300,
      },
      {
        label: "Ship To",
        field: "shipTo",
        sort: "asc",
        width: 150,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 150,
      },
      {
        label: "Vendor",
        field: "vendor",
        sort: "asc",
        width: 150,
      },
      {
        label: "Vendor Attention",
        field: "vendorAttention",
        sort: "asc",
        width: 150,
      },
      {
        label: "Shipment Method",
        field: "shipMethod",
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
