import * as React from "react";
import { Icon } from "office-ui-fabric-react";

import { MDBDataTable, MDBTableHead, MDBTableBody } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { Link } from "react-router-dom";

import styles from "../../../../CoreComponents/Componentstyles.module.scss";

export interface ITableListProps {
  activeSites?: any[];
  activeTab?: string;
  registrations: any[];
  onSubmit: (itemId) => void;
  onDelete: (item: any) => void;
}

export const TableList: React.FC<ITableListProps> = (props) => {
  function onDeleteHandler(item: any): void {
    props.onDelete(item);
  }

  const onSubmitHandler = (itemId) => {
    props.onSubmit(itemId);
  };

  SPComponentLoader.loadCss(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
  );
  const generateTableRows = (): any[] => {
    const rows = props.registrations.map((registration) => {
      return {
        requestCode: registration.requestCode,
        title: registration.thirdPartyCompanyName,
        representativeType: registration.representativeType,
        representativeName: registration.representativeName,
        dateOfRecording: registration.dateOfRecording.toDateString(),
        marketReviewDate:
          registration.marketReviewDate &&
          registration.marketReviewDate.getFullYear() > 2020
            ? registration.marketReviewDate.toDateString()
            : "",
        localMarket: registration.localMarket,
        actions: (
          <div className={styles.tableAction}>
            <span>
              {" "}
              <Link to={`/registration/edit/${registration.id}`}>
                <Icon iconName="Edit" />
              </Link>
            </span>
            <span onClick={() => onDeleteHandler(registration)}>
              {" "}
              <Icon iconName="Delete" />
            </span>
            <span>
              {" "}
              <Link to={`/registration/view/${registration.id}`}>
                <Icon iconName="View" />
              </Link>
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
        label: "Request Code",
        field: "requestCode",
        sort: "asc",
        width: 150,
      },
      {
        label: "Third party company name",
        field: "title",
        sort: "asc",
        width: 150,
      },
      {
        label: "Actions",
        field: "actions",
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
