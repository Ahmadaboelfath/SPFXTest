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
import PurchasingRequest from "../../Models/ClassModels/PurchasingRequest";
import IPurchasingRequestBusinessLogic from "../../BusinessLogic/PurchasingRequestBusinessLogic/IPurchasingRequestBusinessLogic";
import PurchasingRequestBusinessLogic from "../../BusinessLogic/PurchasingRequestBusinessLogic/PurchasingRequestBusinessLogic";
import PurchasingRequestViewModel from "../../Models/ViewModels/PurchasingRequestViewModel";
import UserPicker from "../../Controls/userPicker";
import { IUserLookup } from "../../Models/ClassModels/userModels";

class PRAssigning extends React.Component<
  RouteComponentProps<IPRAssigningProps>,
  IPRAssigningState
> {
  private _purchasingRequestBusinessLogic: IPurchasingRequestBusinessLogic;
  private _PRId = this.props.match.params["id"];

  constructor(props) {
    super(props);
    this._purchasingRequestBusinessLogic = new PurchasingRequestBusinessLogic();
    this.state = {
      purchasingRequest: new PurchasingRequest(),
      dialogMessage: "",
      dialogTitle: "",
      showConfirmationDialog: false,
      showFinalConfirmationDialog: false,
      showSpinner: true,
      submissionAction: null,
      viewModel: new PurchasingRequestViewModel(),
      showError: false,
      userLookup: [],
      assigneePickerErrorMessage: "",
      assigneePickerError: false,
      formIsValid: false,
    };
  }
  static contextType = SecurityContext;
  componentDidMount(): void {
    this._purchasingRequestBusinessLogic
      .getPurchasingRequestDetailsById(this._PRId)
      .then((PR) => {
        const userLookup: IUserLookup = {
          id: PR.purchaseRequest.assignedToId
            ? parseInt(PR.purchaseRequest.assignedToId)
            : null,
          title: PR.purchaseRequest.assignedTo,
        };

        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.showSpinner = false;
          newState.purchasingRequest = PR.purchaseRequest;
          newState.userLookup = userLookup.id ? [userLookup] : [];
          newState.viewModel = PR;
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
  }

  onDialogDismiss(statePropName: string): any {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState[statePropName] = false;
      return newState;
    });
  }

  onAssignedChange(selectedUsers: IUserLookup[]) {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.userLookup = selectedUsers;
      newState.purchasingRequest.assignedTo =
        selectedUsers.length > 0 ? selectedUsers[0].title : "";
      newState.purchasingRequest.assignedToId =
        selectedUsers.length > 0 ? selectedUsers[0].id.toString() : "";
      newState.assigneePickerError = false;
      newState.assigneePickerErrorMessage = "";
      return newState;
    });
  }
  onSubmitAssignee(): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.showSpinner = true;
      return newState;
    });

    this._purchasingRequestBusinessLogic
      .assignUserForPurchasingRequest(null, this.state.purchasingRequest)
      .then((PR) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.showSpinner = false;
          newState.showFinalConfirmationDialog = true;
          newState.dialogTitle = "Assigned Successfully";
          newState.dialogMessage = "User assigned sucessfully";
          newState.submissionAction = () => {
            this.props.history.push("/");
          };
          newState.purchasingRequest = PR;
          return newState;
        });
      })
      .catch((e) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.showSpinner = false;
          newState.showFinalConfirmationDialog = true;
          newState.dialogTitle = "Error Ocuured";
          newState.dialogMessage =
            "An Unexpected error ocurred while assigning the user to the PR please try again";
          newState.submissionAction = () => {
            this.onDialogDismiss("showFinalConfirmationDialog");
          };
          return newState;
        });
      });
  }
  showConfirmationDialog(): void {
    if (this.state.userLookup.length === 0) {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.assigneePickerError = true;
        newState.assigneePickerErrorMessage = "Must choose assignee";
        return newState;
      });
    } else {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.showConfirmationDialog = true;
        newState.assigneePickerError = false;
        newState.assigneePickerErrorMessage = "";
        newState.dialogTitle = `Assign User`;
        newState.dialogMessage = `Are you sure you want to assign ${prevState.userLookup[0].title} to this request`;
        newState.submissionAction = () => this.onSubmitAssignee();
        return newState;
      });
    }
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
              PageTitle={`Assigning Procurement Team Member: ${this.state.viewModel.materialRequisition.requestCode}`}
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
                      viewModel={this.state.viewModel.materialRequisition}
                    />
                  </MDBCol>
                </MDBRow>
              </Accordion>
              <Accordion title="Material Requesition Items" collapsed={false}>
                <MDBRow>
                  <MDBCol>
                    <TableList
                      items={this.state.viewModel.materialRequeisitionItems}
                    />
                  </MDBCol>
                </MDBRow>
              </Accordion>
              <Accordion title="Assigned User" collapsed={false}>
                <MDBRow>
                  <MDBCol>
                    <UserPicker
                      ctrlName="picker"
                      onChange={(selectedUsers) => {
                        this.onAssignedChange(selectedUsers);
                      }}
                      selected={this.state.userLookup}
                      required={true}
                      showError={this.state.assigneePickerError}
                      errorMessage={this.state.assigneePickerErrorMessage}
                      label="Assignee"
                    />
                  </MDBCol>
                </MDBRow>
              </Accordion>
              {this.state.showConfirmationDialog ||
              this.state.showFinalConfirmationDialog
                ? this.renderDialog()
                : null}
              <div className="buttonBlock">
                <DefaultButton
                  // className="cancelBtn"
                  type="submit"
                  onClick={() => this.showConfirmationDialog()}
                >
                  Submit
                </DefaultButton>
                {/* <DefaultButton
                        // className="cancelBtn"
                        type="submit"
                        onClick={() =>
                          this.showConfirmationDialog("outofstock")
                        }
                      >
                        Out-of-stock
                      </DefaultButton> */}
                <DefaultButton
                  // className="cancelBtn"
                  onClick={() => this.props.history.push("/")}
                >
                  Cancel
                </DefaultButton>
              </div>
            </MDBContainer>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(PRAssigning);
