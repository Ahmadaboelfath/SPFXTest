import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import { Icon } from "office-ui-fabric-react";
import * as React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { SecurityContext } from "../../Context/SecurityContext/SecurityProvider";
import { LoadingBoxComponent } from "../../CoreComponents/LodingBox";
import IMessageService from "../../Services/MessageService/IMessageService";
import MessageService from "../../Services/MessageService/MessageService";
import WelcomeMessage from "./Component/WelcomeMessage/WelcomeMessage";
import HomePageProps from "./HomePageProps";
import HomePageState from "./HomePageState";
import "../../CoreComponents/ComponentStyles.scss";
import "./styles.scss";

class HomePage extends React.Component<
  RouteComponentProps<HomePageProps>,
  HomePageState
> {
  constructor(props) {
    super(props);
    this.state = {
      welcomeMessage: "",
      Fullheight: 700,
      isAdmin: false,
      currentUserRole: "",
    };
  }
  static contextType = SecurityContext;

  public componentDidMount() {
    document.body.classList.add("homePage");
    // this.setState({ Fullheight: document.getElementsByTagName('body')[0].clientHeight - 267 });
    const messageService: IMessageService = new MessageService();
    messageService.getWelcomeMessageContent().then((message) => {
      const newState = { ...this.state };
      newState.isAdmin = this.context.isAdmin;
      newState.currentUserRole = this.context.groups[0].groupName;
      newState.welcomeMessage = message;
      this.setState(newState);
    });
  }

  public componentWillUnmount() {
    document.body.classList.remove("homePage");
  }

  public render() {
    return (
      <>
        {this.state.welcomeMessage ? (
          <div className="wrapper">
            <MDBContainer className="">
              <MDBRow>
                <MDBCol size="6" sm="12" lg="6" className="center">
                  {this.state.welcomeMessage ? (
                    <WelcomeMessage
                      className="welcomeBox"
                      message={this.state.welcomeMessage}
                      userInfo={this.context.userProperties["FirstName"]}
                      replacedText={[
                        {
                          key: "{firstname}",
                          value: `<h3>Hi<b> ${this.context.userProperties["FirstName"]},</b></h3>`,
                        },
                      ]}
                    />
                  ) : (
                    ""
                  )}
                </MDBCol>

                <MDBCol size="6" sm="12" lg="6" className="center">
                  <div className="ButtonsHome ">
                    <Link to="/NewMaterialRequesition">
                      <span>New Material Requesition</span>
                      <Icon iconName="NewFolder" />
                    </Link>

                    <Link to="/NewServiceRequesition">
                      <span>New Service Requesition</span>
                      <Icon iconName="NewFolder" />
                    </Link>
                    {this.state.currentUserRole === "Warehouse" ||
                    this.state.isAdmin ? (
                      <Link to="/InvApproval">
                        <span>Warehouse Approval</span>
                        <Icon iconName="ComplianceAudit" />
                      </Link>
                    ) : null}
                    {this.state.currentUserRole === "Warehouse" ||
                    this.state.isAdmin ? (
                      <Link to="/PurchasingRequests">
                        <span>Purchasing Requests</span>
                        <Icon iconName="ComplianceAudit" />
                      </Link>
                    ) : null}
                    {this.state.currentUserRole === "Warehouse" ||
                    this.state.isAdmin ||
                    this.state.currentUserRole === "Procurement" ? (
                      <Link to="/ApprovedPR">
                        <span>Approved PR</span>
                        <Icon iconName="ComplianceAudit" />
                      </Link>
                    ) : null}
                    {this.state.currentUserRole === "FieldManager" ||
                    this.state.isAdmin ? (
                      <Link to="/PRPendingApprovals">
                        <span>PR Approval</span>
                        <Icon iconName="ComplianceAudit" />
                      </Link>
                    ) : null}
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        ) : (
          <LoadingBoxComponent />
        )}
      </>
    );
  }
}

export default withRouter(HomePage);
