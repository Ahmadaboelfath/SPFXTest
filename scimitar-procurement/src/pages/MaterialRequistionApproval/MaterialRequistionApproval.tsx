import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import { DefaultButton, IconButton, Modal } from "office-ui-fabric-react";
import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Accordion } from "semantic-ui-react";
import ApprovalBusinessLogic from "../../BusinessLogic/ApprovalBusinessLogic/ApprovalBusinessLogic";
import IApprovalBusinessLogic from "../../BusinessLogic/ApprovalBusinessLogic/IApprovalBusinessLogic";
import IMaterialRequesitionBusinessLogic from "../../BusinessLogic/MaterialRequisitionBusinessLogic/IMaterialRequesitionBusinessLogic";
import MaterialRequesitionBusinessLogic from "../../BusinessLogic/MaterialRequisitionBusinessLogic/MaterialRequesitionBusinessLogic";
import { SecurityContext } from "../../Context/SecurityContext/SecurityProvider";
import { BannerComponent } from "../../CoreComponents/Banner";
import { LoadingBoxComponent } from "../../CoreComponents/LodingBox";
import Approval from "../../Models/ClassModels/Approval";
import MaterialRequesitionFormViewModel from "../../Models/ViewModels/MaterialRequesitionFormViewModel";
import { TableList } from "./Components/Grid/TableList";
import MaterialRequesitionForm from "./Components/MaterialRequestionForm/MaterialRequesitionForm";
import IMaterialRequistionApprovalProps from "./IMaterialRequistionApprovalProps";
import IMaterialRequistionApprovalState from "./IMaterialRequistionApprovalState";

class MaterialRequistionApproval extends React.Component<
  RouteComponentProps<IMaterialRequistionApprovalProps>,
  IMaterialRequistionApprovalState
> {
  private _approvalBusinessLogic: IApprovalBusinessLogic;
  private _materialRequistionBusinessLogic: IMaterialRequesitionBusinessLogic;
  private _approvalId = this.props.match.params["id"];

  constructor(props) {
    super(props);
    this._approvalBusinessLogic = new ApprovalBusinessLogic();
    this._materialRequistionBusinessLogic =
      new MaterialRequesitionBusinessLogic();
    this.state = {
      approvalItem: new Approval(),
      dialogMessage: "",
      dialogTitle: "",
      showConfirmationDialog: false,
      showFinalConfirmationDialog: false,
      showSpinner: true,
      submissionAction: null,
      viewModel: new MaterialRequesitionFormViewModel(),
      showError: false,
    };
  }
  static contextType = SecurityContext;
  componentDidMount(): void {
    this._approvalBusinessLogic
      .getApprovalById(this._approvalId)
      .then((approval) => {
        if (
          approval.status === "Pending" &&
          approval.approver.toLowerCase() ===
            this.context.userProperties["WorkEmail"].toLowerCase()
        ) {
          this._materialRequistionBusinessLogic
            .getMaterialRequisitionById(approval.materialRequesitionId)
            .then((materialRequesitionViewModel) => {
              this.setState((prevState) => {
                const newState = { ...prevState };
                newState.showSpinner = false;
                newState.approvalItem = approval;
                newState.viewModel = materialRequesitionViewModel;
                return newState;
              });
            })
            .catch((e) => {
              console.error(e);

              this.setState((prevState) => {
                const newState = { ...prevState };
                newState.showError = true;
                newState.showSpinner = false;
                return newState;
              });
            });
        } else {
          this.props.history.push("/");
        }
      })
      .catch((e) => {
        console.error(e);
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.showError = true;
          newState.showSpinner = false;
          return newState;
        });
      });
  }

  onDialogDismiss(statePropName: string): any {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState[statePropName] = false;
      return newState;
    });
  }

  renderDialog(): JSX.Element {
    return (
      <Modal
        titleAriaId="Success"
        isOpen={
          this.state.showConfirmationDialog ||
          this.state.showFinalConfirmationDialog
        }
        onDismiss={() => this.onDialogDismiss("showConfrimationDialog")}
        isBlocking={false}
        className="Modal"
      >
        <div className="Modalheader">
          <h3>{this.state.dialogTitle}</h3>
          <IconButton
            iconProps={{ iconName: "Cancel" }}
            ariaLabel="Close popup modal"
            onClick={() => this.onDialogDismiss("showConfrimationDialog")}
          />
        </div>

        <div className="Modalbody">{this.state.dialogMessage}</div>

        <div className="Modalfooter">
          {this.state.showConfirmationDialog ? (
            <div className="buttonBlock">
              <DefaultButton
                // className="saveBtn"
                onClick={() => this.state.submissionAction()}
              >
                Confirm
              </DefaultButton>
              <DefaultButton
                // className="cancelBtn"
                onClick={() => this.onDialogDismiss("showConfrimationDialog")}
              >
                Cancel
              </DefaultButton>
            </div>
          ) : this.state.showFinalConfirmationDialog ? (
            <div className="buttonBlock">
              <DefaultButton
                // className="saveBtn"
                onClick={() => this.state.submissionAction()}
              >
                Confirm
              </DefaultButton>
            </div>
          ) : null}
        </div>
      </Modal>
    );
  }

  showConfirmationDialog(status: string): void {
    if (status.toLowerCase() === "approve") {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.showConfirmationDialog = true;
        newState.dialogTitle = `Approve Request: ${prevState.viewModel.materialRequesition.requestCode}`;
        newState.dialogMessage = `Are you sure you want to approve this request: ${prevState.viewModel.materialRequesition.requestCode}`;
        newState.submissionAction = () => this.onApprove();
        return newState;
      });
    } else {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.showConfirmationDialog = true;
        newState.dialogTitle = `Reject Request: ${prevState.viewModel.materialRequesition.requestCode}`;
        newState.dialogMessage = `Are you sure you want to reject this request: ${prevState.viewModel.materialRequesition.requestCode}`;
        newState.submissionAction = () => this.onReject();
        return newState;
      });
    }
  }

  onApprove(): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.showSpinner = true;
      newState.showConfirmationDialog = false;
      return newState;
    });

    this._approvalBusinessLogic
      .approveRequest(
        this.state.approvalItem.id,
        this.context.userProperties["WorkEmail"]
      )
      .then((approval) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.approvalItem = approval;
          newState.showSpinner = false;
          newState.dialogMessage = "Request Approved Successfully";
          newState.dialogTitle = "Success";
          newState.showFinalConfirmationDialog = true;
          newState.submissionAction = () => this.props.history.push("/");
          return newState;
        });
      })
      .catch((e) => {
        console.error(e);
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.showSpinner = false;
          newState.showFinalConfirmationDialog = true;
          newState.dialogTitle = "Error Ocurred";
          newState.dialogMessage = `An unexpected error ocurred, please try again and if error persist please contact your administrator`;
          newState.submissionAction = () =>
            this.onDialogDismiss("showFinalConfirmationDialog");
          return newState;
        });
      });
  }
  onReject(): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.showSpinner = true;
      newState.showConfirmationDialog = false;
      return newState;
    });
    this._approvalBusinessLogic
      .rejectRequest(
        this.state.approvalItem.id,
        this.context.userProperties["WorkEmail"]
      )
      .then((approval) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.approvalItem = approval;
          newState.showSpinner = false;
          newState.showFinalConfirmationDialog = true;
          newState.dialogMessage = "Request Rejected Successfully";
          newState.dialogTitle = "Success";
          newState.submissionAction = () => this.props.history.push("/");
          return newState;
        });
      })
      .catch((e) => {
        console.error(e);
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.showSpinner = false;
          newState.showFinalConfirmationDialog = true;
          newState.dialogTitle = "Error Ocurred";
          newState.dialogMessage = `An unexpected error ocurred, please try again and if error persist please contact your administrator`;
          newState.submissionAction = () =>
            this.onDialogDismiss("showFinalConfirmationDialog");
          return newState;
        });
      });
  }

  render(): React.ReactNode {
    return (
      <>
        {this.state.showSpinner ? (
          <LoadingBoxComponent />
        ) : this.state.showError ? (
          this.props.history.push("/error")
        ) : (
          <div>
            <BannerComponent
              PageTitle={`Approval: ${this.state.viewModel.materialRequesition.requestCode}`}
            />
            <MDBContainer className="pageContent">
              <Accordion title="Request Details" collapsed={false}>
                <MDBRow>
                  <MDBCol size="12" sm="12" lg="12">
                    <MaterialRequesitionForm
                      disabled={true}
                      errors={{}}
                      onChange={(value: any, controlName: string) =>
                        console.log(value)
                      }
                      onSubmit={() => console.log("Submit")}
                      viewModel={this.state.viewModel.materialRequesition}
                    />
                  </MDBCol>
                </MDBRow>
              </Accordion>
              <Accordion title="Material Requesition Items" collapsed={false}>
                <MDBRow>
                  <MDBCol>
                    <TableList items={this.state.viewModel.materialItems} />
                    {this.state.showConfirmationDialog ||
                    this.state.showFinalConfirmationDialog
                      ? this.renderDialog()
                      : null}
                    <div className="buttonBlock">
                      <DefaultButton
                        // className="cancelBtn"
                        type="submit"
                        onClick={() => this.showConfirmationDialog("Approve")}
                      >
                        Approve
                      </DefaultButton>
                      <DefaultButton
                        // className="cancelBtn"
                        type="submit"
                        onClick={() => this.showConfirmationDialog("Reject")}
                      >
                        Reject
                      </DefaultButton>
                      <DefaultButton
                        // className="cancelBtn"
                        onClick={() => this.props.history.push("/")}
                      >
                        Cancel
                      </DefaultButton>
                    </div>
                  </MDBCol>
                </MDBRow>
              </Accordion>
            </MDBContainer>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(MaterialRequistionApproval);
