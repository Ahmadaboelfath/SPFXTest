import * as React from "react";

import "./Componentstyles.scss";

import { Link } from "react-router-dom";
import * as Constants from "../common/constants";
import { Icon } from "office-ui-fabric-react";

interface CardProps {
  disabled?: boolean;
  dataCard: any;
  type?: string;
  smallCard?:boolean;
}

export const CardBoxComponent: React.FC<CardProps> = (props) => {
  console.log(props.dataCard);

  return (
    <>

{props.smallCard == true ? 


<div className="smallCard">

<i className="reqNotop">{props.dataCard.RequestId.RequestNo}</i>
<i className="reqDatetop">  {new Date(props.dataCard.Created).toDateString()}</i>
<ul>
<li>
  <span className="title">Title:</span>
  <span className="detail">{props.dataCard.RequestId.Title}</span>
</li>
<li>
  <span className="title">DNSName</span>
  <span className="detail">{props.dataCard.RequestId.DNSName}</span>
</li>

<li>
  <span className="title">Created By</span>
  <span className="detail">{props.dataCard.RequestId.RequesterEmail}</span>
</li>
</ul>
<Link
  className="cardLnk"
  to={
    props.dataCard.RequestId[Constants.domainChoice].toLowerCase() ===
    "NEW".toLowerCase()
      ? `/apprequest/${props.dataCard.RequestIdId}/${Constants.viewType.Approver}/${props.dataCard.ID}`
      : `/apprequest-subdomain/${props.dataCard.RequestIdId}/${Constants.viewType.Approver}/${props.dataCard.ID}`
  }
>
  <Icon iconName="ChevronRight" />
</Link>
</div>
: 





<ul className="cardBox">
{props.type == "statusCard" ? (
  <>
    {props.dataCard.Status == "Rejected" ? (
      <i
        className="statusCard  statusRejected"
      ></i>
    ) : props.dataCard.Status == "Pending" ? (
      <i
        className="statusCard  statusPending"
      ></i>
    ) : props.dataCard.Status == "Approved" ? (
      <i
        className="statusCard  statusApproved"
      ></i>
    ) : (
      <i
      className="statusCard  waitingApprove"
    ></i>
    )}
  </>
) : (
  <></>
)}

        <div className="requestNo">
          <span>Request Number:</span>
          <span>{props.dataCard.RequestNo}</span>
        </div>

        <div className="requestTitle">
          <span className="title">Request Title:</span>
          <span className="detail">{props.dataCard.Title}</span>
        </div>

        <br />
        <li>
          <span className="title">Domain/Zone</span>
          <span className="detail">{props.dataCard.Domain_x002f_Zone}</span>
        </li>
        <li>
          <span className="title">Region</span>
          <span className="detail">{props.dataCard.DomainLeagalOwnership}</span>
        </li>

        <li>
          <span className="title">Created By</span>
          <span className="detail">{props.dataCard.Author.EMail}</span>
        </li>
        <li>
          <span className="title">Created</span>
          <span className="detail">
            {props.dataCard.FieldValuesAsText.Created}
          </span>
        </li>

        <li>
          <span className="title">Status</span>
          <span className="detail">
            {props.dataCard.Status}
          </span>
        </li>
        
        <Link
          className="cardLnk"
          to={
            props.dataCard[Constants.domainChoice].toLowerCase() ===
            "NEW".toLocaleLowerCase()
              ? `/request/${props.dataCard.ID}/${Constants.viewType.View}`
              : `/request-subdomain/${props.dataCard.ID}/${Constants.viewType.View}`
          }
        >
          <Icon iconName="ChevronRight" />
        </Link>
      </ul>
      }
    </>
  );
};
