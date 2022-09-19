import { defaultTo } from "lodash";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { BannerComponent } from "../../CoreComponents/Banner";

class Dashboard extends React.Component<RouteComponentProps, any> {
  render(): React.ReactNode {
    return (
      <>
        <BannerComponent PageTitle="Dashboard" />
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <iframe
                style={{
                  marginTop: "2rem",
                }}
                title="Dashboard"
                width="1024"
                height="1060"
                src="https://app.powerbi.com/view?r=eyJrIjoiNzc1MmVkOTMtNDE2My00OTU2LThlYmEtNjA5ZjMyYTMxMWZmIiwidCI6IjIyZGJkMzE4LTgxODQtNDBmZi05MDBhLTYzYmIwODNkMDdhNyJ9&pageName=ReportSection"
                frameBorder={0}
                allowFullScreen={true}
              ></iframe>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
}

export default withRouter(Dashboard);
