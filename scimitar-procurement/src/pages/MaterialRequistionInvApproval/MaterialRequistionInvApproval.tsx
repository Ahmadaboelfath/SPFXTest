import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import { DefaultButton, IconButton, Modal } from "office-ui-fabric-react";
import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Accordion } from "../../CoreComponents/accordion/Accordion";
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
import IMaterialRequistionInvApprovalProps from "./IMaterialRequistionInvApprovalProps";
import IMaterialRequistionInvApprovalState from "./IMaterialRequistionInvApprovalState";
import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";
import styles from "../../CoreComponents/Componentstyles.module.scss";
import MaterialItemForm from "./Components/MaterialItemForm/MaterialItemForm";
import IMaterialRequesitionService from "../../Services/MaterialRequesitionService/IMaterialRequesitionService";
import MaterialRequesitionService from "../../Services/MaterialRequesitionService/MaterialRequesitionService";
import MaterialRequisitionItemService from "../../Services/MaterialRequesitionItem/MaterialRequisitionItemService";
import IMaterialRequisitionItemService from "../../Services/MaterialRequesitionItem/IMaterialRequisitionItemService";

class MaterialRequistionApproval extends React.Component<
  RouteComponentProps<IMaterialRequistionInvApprovalProps>,
  IMaterialRequistionInvApprovalState
> {
  private _approvalBusinessLogic: IApprovalBusinessLogic;
  private _materialRequistionBusinessLogic: IMaterialRequesitionBusinessLogic;
  private _approvalId = this.props.match.params["id"];
  private _materialRequisitionItemService: IMaterialRequisitionItemService;

  constructor(props) {
    super(props);
    this._approvalBusinessLogic = new ApprovalBusinessLogic();
    this._materialRequistionBusinessLogic =
      new MaterialRequesitionBusinessLogic();
    this._materialRequisitionItemService = new MaterialRequisitionItemService();
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
      currentUserRole: "",
      isAdmin: false,
      showMaterialItemForm: false,
      currentlyEditingIndex: null,
      currentlyEditingItem: new MaterialRequestionItem(),
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
                newState.currentUserRole = this.context.groups[0].groupName;
                newState.isAdmin = this.context.isAdmin;
                return newState;
              });
            })
            .catch((e) => {
              console.error(e);

              this.setState((prevState) => {
                const newState = { ...prevState };
                newState.showError = true;
                newState.showSpinner = false;
                newState.currentUserRole = this.context.groups[0].groupName;
                newState.isAdmin = this.context.isAdmin;
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
          newState.currentUserRole = this.context.groups[0].groupName;
          newState.isAdmin = this.context.isAdmin;
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
          newState.dialogMessage =
            "The request have been flagged as out of stock successfully";
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
                    <TableList
                      items={this.state.viewModel.materialItems}
                      isAdmin={this.state.isAdmin}
                      userRole={this.state.currentUserRole}
                      onDelete={(item, index) =>
                        this.deleteMaterialItem(item, index)
                      }
                      onItemClick={(item, index) =>
                        this.onItemClick(item, index)
                      }
                    />
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
                        Approved
                      </DefaultButton>
                      <DefaultButton onClick={() => this.onCancelRequest()}>
                        Cancel Request
                      </DefaultButton>
                      <DefaultButton
                        // className="cancelBtn"
                        onClick={() => this.props.history.push("/")}
                      >
                        Back To Home
                      </DefaultButton>
                    </div>
                  </MDBCol>
                </MDBRow>
              </Accordion>
              <Modal
                titleAriaId="AddItems"
                isOpen={this.state.showMaterialItemForm}
                onDismiss={() => this.onDialogDismiss("showMaterialItemForm")}
                isBlocking={false}
                className={styles.Modal}
              >
                <div className={styles.Modalheader}>
                  <h3>Add Material Item</h3>
                  <IconButton
                    iconProps={{ iconName: "Cancel" }}
                    ariaLabel="Close popup modal"
                    onClick={() => this.onDialogDismiss("showMaterialItemForm")}
                  />
                </div>

                <div className={styles.Modalbody}>
                  <MaterialItemForm
                    count={(
                      this.state.viewModel.materialItems.length + 1
                    ).toString()}
                    onSearch={() => null}
                    toggleSearchPicker={() => null}
                    viewModel={this.state.currentlyEditingItem}
                    searchByCode={true}
                    onChange={(value, controlName) =>
                      this.onMaterialItemFormChange(value, controlName)
                    }
                    onSubmit={() => this.onMaterialItemFormSubmit()}
                    isInEditForm={true}
                    tagPickerSuggesstionProps={null}
                  />
                </div>
                <div className="Modalfooter">
                  <div className="buttonBlock">
                    {this.state.currentUserRole === "Procurement" ||
                    this.state.isAdmin ? (
                      <DefaultButton
                        onClick={() => this.onMaterialItemFormSubmit()}
                        // className="saveBtn"
                      >
                        <span>Submit</span>
                      </DefaultButton>
                    ) : null}
                    <DefaultButton
                      onClick={() =>
                        this.onDialogDismiss("showMaterialItemForm")
                      }
                      // className="cancelBtn"
                    >
                      <span>Cancel</span>
                    </DefaultButton>
                  </div>
                </div>
              </Modal>
            </MDBContainer>
          </div>
        )}
      </>
    );
  }
  onCancelRequest(): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.showConfirmationDialog = true;
      newState.dialogMessage = `Are you sure you want to cancel this request?`;
      newState.dialogTitle = "Cancel Request";
      newState.submissionAction = () => this.cancelRequest();
      return newState;
    });
  }

  cancelRequest(): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.showSpinner = true;
      newState.showConfirmationDialog = false;
      return newState;
    });

    this._approvalBusinessLogic
      .CancelRequest(
        this.state.approvalItem,
        this.context.userProperties["WorkEmail"]
      )
      .then((PR) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.showSpinner = false;
          newState.showFinalConfirmationDialog = true;
          newState.dialogMessage =
            "The Purchasing request have been cancelled successfully";
          newState.dialogTitle = "Cancelled successfully";
          newState.submissionAction = () => this.props.history.push("/");
          return newState;
        });
      });
  }

  onMaterialItemFormSubmit(): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.showSpinner = true;
      newState.showMaterialItemForm = false;
      return newState;
    });

    this._materialRequisitionItemService
      .updateItem(this.state.currentlyEditingItem)
      .then((item) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          const newItemsArr = [...prevState.viewModel.materialItems];
          newItemsArr[prevState.currentlyEditingIndex] = item;
          newState.viewModel.materialItems = newItemsArr;
          newState.currentlyEditingItem = new MaterialRequestionItem();
          newState.showSpinner = false;

          return newState;
        });
      });
  }
  onMaterialItemFormChange(value: any, controlName: any): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      const newItem = new MaterialRequestionItem(
        prevState.currentlyEditingItem
      );
      newItem[controlName] = value;
      newState.currentlyEditingItem = newItem;
      return newState;
    });
  }
  onItemClick(item: any, index: number): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.showMaterialItemForm = true;
      newState.currentlyEditingIndex = index;
      newState.currentlyEditingItem = new MaterialRequestionItem(item);
      return newState;
    });
  }
  deleteMaterialItem(item: MaterialRequestionItem, index: number): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.showConfirmationDialog = true;
      newState.dialogTitle = "Delete Item";
      newState.dialogMessage = `Are You sure you want to delete this item ${item.description}? `;
      newState.submissionAction = () => this.deleteItem(item);
      return newState;
    });
  }
  deleteItem(item: MaterialRequestionItem): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.showSpinner = true;
      newState.showConfirmationDialog = false;
      return newState;
    });

    this._materialRequisitionItemService
      .deleteItem(item)
      .then((value) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.showSpinner = false;
          newState.viewModel.materialItems =
            newState.viewModel.materialItems.filter(
              (curItem) => curItem.id !== item.id
            );
          newState.showFinalConfirmationDialog = true;
          newState.dialogMessage = "Item was removed successfully";
          newState.dialogTitle = "Success";
          newState.submissionAction = () =>
            this.onDialogDismiss("showFinalConfirmationDialog");
          return newState;
        });
      })
      .catch((e) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.showSpinner = false;
          newState.showFinalConfirmationDialog = true;
          newState.dialogMessage =
            "An Unexpected error ocuured please try again later";
          newState.dialogTitle = "Error";
          newState.submissionAction = () =>
            this.onDialogDismiss("showFinalConfirmationDialog");
          return newState;
        });
      });
  }
}

export default withRouter(MaterialRequistionApproval);
