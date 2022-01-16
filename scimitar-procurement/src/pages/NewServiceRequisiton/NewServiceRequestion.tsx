import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import {
  Button,
  DefaultButton,
  IBasePickerSuggestionsProps,
  IconButton,
  ITag,
  Modal,
} from "office-ui-fabric-react";
import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Accordion } from "../../CoreComponents/accordion";
import { BannerComponent } from "../../CoreComponents/Banner";
import { LoadingBoxComponent } from "../../CoreComponents/LodingBox";
import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";
import MaterialRequesitionFormViewModel from "../../Models/ViewModels/MaterialRequesitionFormViewModel";
import IMaterialService from "../../Services/MaterialService/IMaterialService";
import MaterialService from "../../Services/MaterialService/MaterialService";
import { TableList } from "./Components/Grid/TableList";
import MaterialItemForm from "./Components/MaterialItemForm/MaterialItemForm";
import MaterialRequesitionForm from "./Components/MaterialRequestionForm/MaterialRequesitionForm";
import NewServiceRequestionProps from "./NewServiceRequestionProps";
import NewServiceRequestionState from "./NewServiceRequestionState";
import styles from "../../CoreComponents/Componentstyles.module.scss";
import { matrialItemsData } from "./DummyData/DummyMaterialRequisitionItemData";
import IMaterialTag from "../../Models/InterfaceModels/IMaterialTag";
import MaterialRequesition from "../../Models/ClassModels/MaterialRequesition";
import IMaterialRequesitionBusinessLogic from "../../BusinessLogic/MaterialRequisitionBusinessLogic/IMaterialRequesitionBusinessLogic";
import MaterialRequesitionBusinessLogic from "../../BusinessLogic/MaterialRequisitionBusinessLogic/MaterialRequesitionBusinessLogic";
import { SecurityContext } from "../../Context/SecurityContext/SecurityProvider";

class NewServiceRequestion extends React.Component<
  RouteComponentProps<NewServiceRequestionProps>,
  NewServiceRequestionState
> {
  private readonly _materialService: IMaterialService;
  private readonly _materialRequistionBusinessLogic: IMaterialRequesitionBusinessLogic;

  constructor(props) {
    super(props);
    this._materialService = new MaterialService();
    this._materialRequistionBusinessLogic =
      new MaterialRequesitionBusinessLogic();
    this.state = {
      showSubForm: false,
      viewModel: new MaterialRequesitionFormViewModel(),
      showSpinner: true,
      searchByCode: true,
      showConfrimationDialog: false,
      showFinalConfirmationDialog: false,
      dialogConfirmationAction: () => null,
      dialogMessage: "Are you sure you want to submit this request ?",
      dialogTitle: "Submit MR-Request",
      subFormModel: new MaterialRequestionItem(),
      subFormInEditMode: false,
      currentlyEditingIndex: null,
    };
  }
  private tagPickerSuggestionProps: IBasePickerSuggestionsProps = {
    suggestionsHeaderText: "Suggested Material Items",
    // resultsMaximumNumber: 50,
    searchingText: "Searching Materials",
    noResultsFoundText: "No material matching this criteria",
  };
  static contextType = SecurityContext;

  componentDidMount(): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      const newMaterialRequesitionObj = new MaterialRequesition(
        null,
        null,
        prevState.viewModel.materialRequesition
      );
      newMaterialRequesitionObj.requestDate = new Date();
      newMaterialRequesitionObj.department = this.context.userProperties[
        "Department"
      ]
        ? this.context.userProperties["Department"]
        : "Admin";
      newMaterialRequesitionObj.requesterEmail =
        this.context.userProperties["WorkEmail"];

      newState.viewModel.materialRequesition = newMaterialRequesitionObj;
      newState.showSpinner = false;
      return newState;
    });
  }

  onDialogDismiss(statePropName: string): any {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState[statePropName] = false;
      return newState;
    });
  }

  handleOpenFormClick(e): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.showSubForm = true;
      newState.subFormModel = new MaterialRequestionItem();
      newState.subFormModel.order =
        prevState.viewModel.materialItems.length + 1;
      newState.subFormInEditMode = false;
      return newState;
    });
  }

  onDescriptionSearch(
    filter: string,
    selectedItem: ITag[]
  ): ITag[] | PromiseLike<ITag[]> {
    return this._materialService.searchMaterialByDescription(filter);
  }

  onMaterialItemFormChange(value, controlName) {
    if (controlName === "materialPicker") {
      const controlValue = value as IMaterialTag[];

      this.setState((prevState) => {
        const newState = { ...prevState };
        const newSubFormModel = new MaterialRequestionItem(
          prevState.subFormModel
        );
        if (controlValue.length > 0) {
          newSubFormModel.code = controlValue[0].key
            ? controlValue[0].key.toString()
            : "";
          newSubFormModel.description = controlValue[0].name;
          newSubFormModel.materialId = controlValue[0].materialId;
          newState.subFormModel = newSubFormModel;
          newState.subFormModel.materialTag = value;
        } else {
          newSubFormModel.code = "";
          newSubFormModel.description = "";
          newSubFormModel.materialId = 0;
          newState.subFormModel = newSubFormModel;
          newState.subFormModel.materialTag = value;
        }

        return newState;
      });
    } else {
      this.setState((prevState) => {
        const newState = { ...prevState };
        const newSubFormModel = new MaterialRequestionItem(
          prevState.subFormModel
        );
        newSubFormModel[controlName] = value;
        newState.subFormModel = newSubFormModel;

        return newState;
      });
    }
  }

  onMaterialItemFormSubmit(): void {
    if (!this.state.subFormInEditMode) {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.viewModel.materialItems = [
          ...prevState.viewModel.materialItems,
          prevState.subFormModel,
        ];
        newState.showSubForm = false;
        return newState;
      });
    } else {
      this.setState((prevState) => {
        const newState = { ...prevState };
        const materialItems = [...prevState.viewModel.materialItems];
        materialItems[prevState.currentlyEditingIndex] = prevState.subFormModel;
        newState.viewModel.materialItems = materialItems;
        newState.showSubForm = false;
        return newState;
      });
    }
  }
  onGridItemEdit(item, index): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.subFormModel = prevState.viewModel.materialItems.filter(
        (existingitem) => existingitem.order === item.order
      )[0];
      newState.showSubForm = true;
      newState.currentlyEditingIndex = index;
      newState.subFormInEditMode = true;
      return newState;
    });
  }

  onGridItemDelete(item, index): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.viewModel.materialItems = this.resetOrder(
        prevState.viewModel.materialItems.filter(
          (existingitem) => existingitem.order !== item.order
        )
      );
      return newState;
    });
  }

  resetOrder(items: MaterialRequestionItem[]) {
    let orderStart = 0;
    const unorderedItem = [...items];
    unorderedItem.forEach((item) => {
      orderStart++;
      item.order = orderStart;
    });

    return unorderedItem;
  }

  onMaterialFormChange(value, controlName) {
    this.setState((prevState) => {
      const newState = { ...prevState };
      const newMaterialRequesition = new MaterialRequesition(
        this.state.viewModel.materialRequesition.id,
        this.state.viewModel.materialRequesition.requestDate.toString(),
        this.state.viewModel.materialRequesition
      );
      newMaterialRequesition[controlName] = value;
      newState.viewModel.materialRequesition = newMaterialRequesition;
      return newState;
    });
  }

  showConfirmationDialog(): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.showConfrimationDialog = true;
      newState.dialogTitle = "Submitting Service Requeisition";
      newState.dialogMessage =
        "Are you sure you want to submit this Service requesition";
      newState.dialogConfirmationAction = () => this.submitForm();
      return newState;
    });
  }
  submitForm(): void {
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState.showConfrimationDialog = false;
      newState.showSpinner = true;
      return newState;
    });
    this._materialRequistionBusinessLogic
      .addSR(this.state.viewModel)
      .then((value) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.showSpinner = false;
          newState.showFinalConfirmationDialog = true;
          newState.dialogTitle = "Submitted Successfully";
          newState.dialogMessage = `Your request have been submitted successfully and your request code is ${value.materialRequesition.requestCode}`;
          newState.dialogConfirmationAction = () =>
            this.props.history.push("/");
          return newState;
        });
      })
      .catch((e) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.showSpinner = false;
          newState.showFinalConfirmationDialog = true;
          newState.dialogTitle = "Error Ocurred";
          newState.dialogMessage = `An unexpected error ocurred, please try again and if error persist please contact your administrator`;
          newState.dialogConfirmationAction = () =>
            this.onDialogDismiss("showFinalConfirmationDialog");
          return newState;
        });
      });
  }

  renderDialog(): JSX.Element {
    return (
      <Modal
        titleAriaId="Success"
        isOpen={
          this.state.showConfrimationDialog ||
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
          {this.state.showConfrimationDialog ? (
            <div className="buttonBlock">
              <DefaultButton
                // className="saveBtn"
                onClick={() => this.state.dialogConfirmationAction()}
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
                onClick={() => this.state.dialogConfirmationAction()}
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
        ) : (
          <>
            <BannerComponent PageTitle="New Service Requistion" />
            <MDBContainer className="pageContent">
              <Accordion title="Request Details" collapsed={false}>
                <MDBRow>
                  <MDBCol size="12" sm="12" lg="12">
                    <MaterialRequesitionForm
                      disabled={false}
                      errors={{}}
                      onChange={(value: any, controlName: string) =>
                        this.onMaterialFormChange(value, controlName)
                      }
                      onSubmit={() => console.log("Submit")}
                      viewModel={this.state.viewModel.materialRequesition}
                    />
                  </MDBCol>
                </MDBRow>
              </Accordion>
              <Accordion title="Service Requesition Items" collapsed={false}>
                <MDBRow>
                  <MDBCol>
                    <DefaultButton
                      disabled={false}
                      onClick={(e) => this.handleOpenFormClick(e)}
                      // className="saveBtn"
                    >
                      Add Item
                    </DefaultButton>
                    <Modal
                      titleAriaId="AddItems"
                      isOpen={this.state.showSubForm}
                      onDismiss={() => this.onDialogDismiss("showSubForm")}
                      isBlocking={false}
                      className={styles.Modal}
                    >
                      <div className={styles.Modalheader}>
                        <h3>Add Material Item</h3>
                        <IconButton
                          iconProps={{ iconName: "Cancel" }}
                          ariaLabel="Close popup modal"
                          onClick={() => this.onDialogDismiss("showSubForm")}
                        />
                      </div>

                      <div className={styles.Modalbody}>
                        <MaterialItemForm
                          count={(
                            this.state.viewModel.materialItems.length + 1
                          ).toString()}
                          onSearch={(filter, selectedItem) =>
                            this.onDescriptionSearch(filter, selectedItem)
                          }
                          viewModel={this.state.subFormModel}
                          searchByCode={this.state.searchByCode}
                          onChange={(value, controlName) =>
                            this.onMaterialItemFormChange(value, controlName)
                          }
                          onSubmit={() => this.onMaterialItemFormSubmit()}
                          isInEditForm={this.state.subFormInEditMode}
                          tagPickerSuggesstionProps={
                            this.tagPickerSuggestionProps
                          }
                        />
                      </div>
                      <div className="Modalfooter">
                        <div className="buttonBlock">
                          <DefaultButton
                            onClick={() => this.onMaterialItemFormSubmit()}
                            // className="saveBtn"
                          >
                            <span>Submit</span>
                          </DefaultButton>
                          <DefaultButton
                            onClick={() => this.onDialogDismiss("showSubForm")}
                            // className="cancelBtn"
                          >
                            <span>Cancel</span>
                          </DefaultButton>
                        </div>
                      </div>
                    </Modal>

                    <TableList
                      onDelete={(item, index) =>
                        this.onGridItemDelete(item, index)
                      }
                      onItemClick={(item, index) =>
                        this.onGridItemEdit(item, index)
                      }
                      items={this.state.viewModel.materialItems}
                    />
                    {this.state.showConfrimationDialog ||
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
          </>
        )}
      </>
    );
  }
}

export default withRouter(NewServiceRequestion);