import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import { DefaultButton, IconButton, Modal } from "office-ui-fabric-react";
import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Accordion } from "semantic-ui-react";
import ApprovalBusinessLogic from "../../BusinessLogic/InvApprovalBusinessLogic/InvApprovalBusinessLogic";
import IApprovalBusinessLogic from "../../BusinessLogic/InvApprovalBusinessLogic/IInvApprovalBusinessLogic";
import IMaterialRequesitionBusinessLogic from "../../BusinessLogic/MaterialRequisitionBusinessLogic/IMaterialRequesitionBusinessLogic";
import MaterialRequesitionBusinessLogic from "../../BusinessLogic/MaterialRequisitionBusinessLogic/MaterialRequesitionBusinessLogic";
import { SecurityContext } from "../../Context/SecurityContext/SecurityProvider";
import { BannerComponent } from "../../CoreComponents/Banner";
import { LoadingBoxComponent } from "../../CoreComponents/LodingBox";
import Approval from "../../Models/ClassModels/InvApproval";
import MaterialRequesitionFormViewModel from "../../Models/ViewModels/MaterialRequesitionFormViewModel";
import { TableList } from "./Components/Grid/TableList";
import MaterialRequesitionForm from "./Components/MaterialRequestionForm/MaterialRequesitionForm";
import IPRAssigningProps from "./IPRAssigningProps";
import IPRAssigningState from "./IPRAssigningState";

class PRAssigning extends React.Component<
  RouteComponentProps<IPRAssigningProps>,
  IPRAssigningState
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
        onDismiss={() => this.onDialogDismiss("showConfirmationDialog")}
        isBlocking={false}
        className="Modal"
      >
        <div className="Modalheader">
          <h3>{this.state.dialogTitle}</h3>
          <IconButton
            iconProps={{ iconName: "Cancel" }}
            ariaLabel="Close popup modal"
            onClick={() => this.onDialogDismiss("showConfirmationDialog")}
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
                onClick={() => this.onDialogDismiss("showConfirmationDialog")}
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
    if (status.toLowerCase() === "instock") {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.showConfirmationDialog = true;
        newState.dialogTitle = `In-Stock Request: ${prevState.viewModel.materialRequesition.requestCode}`;
        newState.dialogMessage = `Are you sure you want to set this MR: ${prevState.viewModel.materialRequesition.requestCode} to be in stock`;
        newState.submissionAction = () => this.onInStock();
        return newState;
      });
    } else {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.showConfirmationDialog = true;
        newState.dialogTitle = `Out of stock Request: ${prevState.viewModel.materialRequesition.requestCode}`;
        newState.dialogMessage = `Are you sure you want to set this MR: ${prevState.viewModel.materialRequesition.requestCode} to be out of stock`;
        newState.submissionAction = () => this.onOutOfStock();
        return newState;
      });
    }
  }

  onInStock(): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.showSpinner = true;
      newState.showConfirmationDialog = false;
      return newState;
    });

    this._approvalBusinessLogic
      .InStock(
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
  onOutOfStock(): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.showSpinner = true;
      newState.showConfirmationDialog = false;
      return newState;
    });
    this._approvalBusinessLogic
      .OutOfStock(
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
              PageTitle={`Inventory approval: ${this.state.viewModel.materialRequesition.requestCode}`}
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
                        onClick={() => this.showConfirmationDialog("instock")}
                      >
                        In-Stock
                      </DefaultButton>
                      <DefaultButton
                        // className="cancelBtn"
                        type="submit"
                        onClick={() =>
                          this.showConfirmationDialog("outofstock")
                        }
                      >
                        Out-of-stock
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

export default withRouter(PRAssigning);
