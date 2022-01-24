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
  userRole: string;
  isAdmin: boolean;
  onDelete: (item: any, index: number) => void;
  onItemClick: (item: any, index: number) => void;
}

export const TableList: React.FC<ITableListProps> = (props) => {
  SPComponentLoader.loadCss(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
  );

  function onDeleteHandler(item: any, index: number): void {
    props.onDelete(item, index);
  }
  const generateTableRows = (): any[] => {
    const sortedRows = props.items.sort((a, b) => a.order - b.order);
    const rows = sortedRows.map((item, index) => {
      if (props.userRole === "Warehouse" || props.isAdmin) {
        return {
          order: item.order,
          code: item.code,
          description: item.description,
          unit: item.unit,
          quantity: item.quantity,
          balance: item.balance,
          actions: (
            <div className={styles.tableAction}>
              <span>
                {" "}
                <span onClick={() => props.onItemClick(item, index)}>
                  <Icon iconName="Edit" />
                </span>
              </span>
              <span onClick={() => onDeleteHandler(item, index)}>
                {" "}
                <Icon iconName="Delete" />
              </span>
              {/* <span>
            {" "}
            <Link to={`/registration/view/${item.order}`}>
              <Icon iconName="View" />
            </Link>
          </span> */}
            </div>
          ),
        };
      } else {
        return {
          order: item.order,
          code: item.code,
          description: item.description,
          unit: item.unit,
          balance: item.balance,
          quantity: item.quantity,
        };
      }
    });

    return rows;
  };

  const dataTableList =
    props.isAdmin || props.userRole === "Warehouse"
      ? {
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
            {
              label: "Balance",
              field: "balance",
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
        }
      : {
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
            {
              label: "Balance",
              field: "balance",
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
