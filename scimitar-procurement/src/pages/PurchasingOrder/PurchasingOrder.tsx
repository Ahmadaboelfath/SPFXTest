import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";
import IMaterialRequistionItemBusinessLogic from "../../BusinessLogic/MaterialRequistionItemBusinessLogic/IMaterialRequistionItemBusinessLogic";
import MaterialRequistionItemBusinessLogic from "../../BusinessLogic/MaterialRequistionItemBusinessLogic/MaterialRequistionItemBusinessLogic";
import { Textbox } from "../../Controls/Textbox";
import { Accordion } from "../../CoreComponents/accordion";
import { BannerComponent } from "../../CoreComponents/Banner";
import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";
import PurchasingOrderViewModel from "../../Models/ViewModels/PurchasingOrderViewModel";
import { ViewMode } from "../MaterialRequsitionItem/ViewMode";
import { TableList } from "./Components/DataGrid/TableList";
import ItemSubForm from "./Components/ItemSubForm/ItemSubForm";
import ItemSubFormModal from "./Components/ItemSubFormModal/ItemSubFormModal";
import PriceSubForm from "./Components/PriceSubForm/PriceSubForm";
import PurchasingOrderDetailsForm from "./Components/PurchasingOrderForm/PurchasingOrderDetailsForm";
import IPurchasingOrderProps from "./IPurchasingOrderProps";
import IPurchasingOrderState from "./IPurchasingOrderState";
import PurchasingOrder from "../../Models/ClassModels/PurchasingOrder";
import IPurchaseRequestsBusinessLogic from "../../BusinessLogic/PurchaseOrderBusinessLogic/IPurchaseRequestsBusinessLogic";
import PurchaseRequestsBusinessLogic from "../../BusinessLogic/PurchaseOrderBusinessLogic/PurchaseRequestsBusinessLogic";
import FileUploader from "../../Controls/FileUploader/FileUploader";
import IFileInfo from "../../Controls/FileUploader/Interfaces/IFileInfo";
import { DefaultButton, IconButton, Modal } from "office-ui-fabric-react";
import { SecurityContext } from "../../Context/SecurityContext/SecurityProvider";
import { LoadingBoxComponent } from "../../CoreComponents/LodingBox";
class PurchasingOrderPage extends React.Component<
  IPurchasingOrderProps,
  IPurchasingOrderState
> {
  private readonly _materialItemBusinessLogic: IMaterialRequistionItemBusinessLogic;
  private readonly _purchasingRequestBusinessLogic: IPurchaseRequestsBusinessLogic;

  constructor(props) {
    super(props);
    this._materialItemBusinessLogic = new MaterialRequistionItemBusinessLogic();
    this._purchasingRequestBusinessLogic = new PurchaseRequestsBusinessLogic();

    this.state = {
      viewModel: new PurchasingOrderViewModel(),
      showItemSubForm: false,
      showLoader: true,
      itemNotAssignedToPO: [],
      selectedkey: 0,
      selectedItem: new MaterialRequestionItem(),
      itemsDropdownDisabled: true,
      lookups: null,
      disableDropDowns: true,
      dialogMessage: "",
      dialogTitle: "",
      showConfirmationDialog: false,
      showFinalConfirmationDialog: false,
      submissionAction: () => null,
      deletedItems: [],
    };
  }

  static contextType = SecurityContext;

  componentDidMount(): void {
    this.loadLookups().then((lookups) => {
      if (this.props.viewMode !== ViewMode.New) {
        this.loadItem().then((po) => {
          this.setState((prevState) => {
            const newState = { ...prevState };
            newState.showLoader = false;
            newState.lookups = lookups;
            newState.viewModel = po;
            newState.disableDropDowns = false;
            return newState;
          });
        });
      } else {
        this.setState((prevState) => {
          const newState = { ...prevState };
          if (this.props.viewMode === ViewMode.New) {
            newState.viewModel.purchaseOrder.statusId = lookups[
              "Status"
            ].filter((lookup) => lookup.internalName === "New")[0].value;
          }
          newState.disableDropDowns = false;
          newState.lookups = lookups;
          newState.showLoader = false;
          return newState;
        });
      }
    });
  }

  async loadItem() {
    const id = this.props.match.params["id"];
    const POViewModel =
      await this._purchasingRequestBusinessLogic.getPurchaseOrderViewModelById(
        id
      );
    return POViewModel;
  }

  async loadLookups() {
    const lookups = await this._purchasingRequestBusinessLogic.getLookups([
      "ShipTo",
      "ShipMethod",
      "Vendors",
      "Status",
    ]);
    const lookupValues = {};
    lookups.forEach((lookup) => {
      lookupValues[lookup.listName] = lookup.lookups;
    });
    return lookupValues;
  }

  onAddItemClick() {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.showItemSubForm = true;
      newState.selectedItem = new MaterialRequestionItem();
      newState.selectedkey = 0;
      return newState;
    });
    if (this.state.itemNotAssignedToPO.length === 0) {
      this.loadPOs();
    }
  }

  onDismissSubForm() {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.showItemSubForm = false;
      return newState;
    });
  }

  handleitemSubFormChange(item: any, selectedKey: any): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.selectedItem = item;
      newState.selectedkey = selectedKey;

      return newState;
    });
  }

  async loadPOs() {
    try {
      const options =
        await this._materialItemBusinessLogic.getMaterialItemsNoInPOOption(7);
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.itemNotAssignedToPO = options;
        newState.itemsDropdownDisabled = false;
        return newState;
      });
    } catch (e) {
      console.error(e);
    }
  }

  onSubFormSubmit(): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      const viewModel: PurchasingOrderViewModel = new PurchasingOrderViewModel(
        newState.viewModel.purchaseOrder,
        newState.viewModel.purchaseOrderItems
      );
      const purchaseOrder = new PurchasingOrder(
        prevState.viewModel.purchaseOrder
      );

      viewModel.purchaseOrderItems = [
        ...viewModel.purchaseOrderItems,
        prevState.selectedItem,
      ];
      purchaseOrder.subTotal = this.calculateSubTotal(
        viewModel.purchaseOrderItems
      );

      purchaseOrder.grandTotal = this.calculateGrandTotal(purchaseOrder);
      viewModel.purchaseOrder = purchaseOrder;
      newState.viewModel = viewModel;
      newState.itemNotAssignedToPO = prevState.itemNotAssignedToPO.filter(
        (option) => option.key !== prevState.selectedkey
      );

      newState.showItemSubForm = false;
      return newState;
    });
  }

  onMaterialItemGridDelete(value, ctrlName) {
    this.setState((prevState) => {
      const newState = { ...prevState };
      const viewModel: PurchasingOrderViewModel = new PurchasingOrderViewModel(
        newState.viewModel.purchaseOrder,
        newState.viewModel.purchaseOrderItems
      );

      const purchaseOrder = new PurchasingOrder(
        prevState.viewModel.purchaseOrder
      );

      viewModel.purchaseOrderItems =
        prevState.viewModel.purchaseOrderItems.filter(
          (item) => item.id !== value.id
        );
      purchaseOrder.subTotal = this.calculateSubTotal(
        viewModel.purchaseOrderItems
      );
      purchaseOrder.grandTotal = this.calculateGrandTotal(purchaseOrder);
      viewModel.purchaseOrder = purchaseOrder;
      newState.viewModel = viewModel;
      newState.itemNotAssignedToPO = [
        ...prevState.itemNotAssignedToPO,
        { item: value, key: value.id, text: value.description },
      ];
      newState.deletedItems = [...prevState.deletedItems, value];

      return newState;
    });
  }

  calculateSubTotal(items: MaterialRequestionItem[]): number {
    let sum = 0;
    items.forEach((item) => (sum += item.totalPrice));
    return sum;
  }
  onPriceComponentChange(value: any, ctrlName: any): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      const viewModel = new PurchasingOrderViewModel(
        prevState.viewModel.purchaseOrder,
        prevState.viewModel.purchaseOrderItems
      );
      const purchaseOrder = new PurchasingOrder(
        prevState.viewModel.purchaseOrder
      );
      if (value) {
        purchaseOrder[ctrlName] = value;
      } else {
        purchaseOrder[ctrlName] = 0;
      }

      if (ctrlName === "discountPercentage") {
        purchaseOrder.discountAmount =
          (purchaseOrder.subTotal * parseFloat(value)) / 100;
      }
      purchaseOrder.grandTotal = this.calculateGrandTotal(purchaseOrder);

      viewModel.purchaseOrder = purchaseOrder;
      newState.viewModel = viewModel;
      return newState;
    });
  }
  calculateGrandTotal(purchaseOrder: PurchasingOrder): number {
    return this.roundNumbers(
      parseFloat(purchaseOrder.subTotal.toString()) -
        parseFloat(purchaseOrder.discountAmount.toString()) +
        parseFloat(purchaseOrder.freightCharge.toString()) +
        parseFloat(purchaseOrder.shipAndHandling.toString())
    );
  }
  roundNumbers(number): number {
    return Math.round((number + Number.EPSILON) * 100) / 100;
  }
  onItemDetailsChange(value: any, ctrlName: any): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      const viewModel = new PurchasingOrderViewModel(
        prevState.viewModel.purchaseOrder,
        prevState.viewModel.purchaseOrderItems
      );
      const purchaseOrder = new PurchasingOrder(
        prevState.viewModel.purchaseOrder
      );

      purchaseOrder[ctrlName] = value;
      viewModel.purchaseOrder = purchaseOrder;
      newState.viewModel = viewModel;
      return newState;
    });
  }

  onFileUploaderChange(file: IFileInfo[], ctrlName: string): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      const viewModel = new PurchasingOrderViewModel(
        prevState.viewModel.purchaseOrder,
        prevState.viewModel.purchaseOrderItems,
        prevState.viewModel.files
      );
      viewModel.files = file;
      newState.viewModel = viewModel;
      return newState;
    });
  }
  onFileDelete(file: IFileInfo): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      const viewModel = new PurchasingOrderViewModel(
        prevState.viewModel.purchaseOrder,
        prevState.viewModel.purchaseOrderItems,
        prevState.viewModel.files
      );
      viewModel.files = viewModel.files.filter(
        (fileiterator) => fileiterator.identifier !== file.identifier
      );
      newState.viewModel = viewModel;
      return newState;
    });
  }
  onFileItemClick(file: IFileInfo, ctrlName: string) {
    window.open(file.link, "_blank");
  }

  checkApprovedStatus(): boolean {
    const statusSelected = this.state.viewModel.purchaseOrder.statusId;
    const statusLookups = this.state.lookups
      ? this.state.lookups["Status"]
      : [];
    const approveOption = statusLookups.filter(
      (lookup) => lookup.internalName === "Approved"
    );
    if (approveOption.length > 0 && approveOption[0].value == statusSelected) {
      return true;
    } else {
      return false;
    }
  }
  onCancelRequest(): void {
    throw new Error("Method not implemented.");
  }
  showConfirmationDialog(): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      (newState.showConfirmationDialog = true),
        (newState.dialogMessage =
          "Are you sure you want to submit this purchase order?");
      newState.dialogTitle = "Add New PO";
      if (this.props.viewMode === ViewMode.New) {
        newState.submissionAction = () => this.addPO();
      } else {
        newState.submissionAction = () => this.updatePo();
      }
      return newState;
    });
  }
  updatePo(): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.showLoader = true;
      return newState;
    });
    this._purchasingRequestBusinessLogic
      .editPurchaseOrder(this.state.viewModel, this.state.deletedItems)
      .then((viewModel) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.viewModel = viewModel;
          newState.showConfirmationDialog = false;
          newState.showFinalConfirmationDialog = true;
          newState.dialogMessage = "Submitted Successfully";
          newState.dialogTitle = "Success";
          newState.submissionAction = () => this.props.history.push("/");
          newState.showLoader = false;
          return newState;
        });
      })
      .catch((e) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.showConfirmationDialog = false;
          newState.showFinalConfirmationDialog = true;
          newState.dialogMessage = `failed to add PO: ${e.message}`;
          newState.dialogTitle = "Error";
          newState.submissionAction = () =>
            this.onDialogDismiss("showFinalConfirmationDialog");
          return newState;
        });
      });
  }
  addPO(): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.showLoader = true;
      return newState;
    });

    this._purchasingRequestBusinessLogic
      .addPurchaseOrder(this.state.viewModel, this.context.userID)
      .then((viewModel) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.viewModel = viewModel;
          newState.showConfirmationDialog = false;
          newState.showFinalConfirmationDialog = true;
          newState.dialogMessage = "Submitted Successfully";
          newState.dialogTitle = "Success";
          newState.submissionAction = () => this.props.history.push("/");
          newState.showLoader = false;
          return newState;
        });
      })
      .catch((e) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.showConfirmationDialog = false;
          newState.showFinalConfirmationDialog = true;
          newState.dialogMessage = `failed to add PO: ${e.message}`;
          newState.dialogTitle = "Error";
          newState.submissionAction = () =>
            this.onDialogDismiss("showFinalConfirmationDialog");
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

  render(): React.ReactNode {
    return (
      <>
        {this.state.showLoader ? (
          <LoadingBoxComponent />
        ) : (
          <MDBContainer>
            <MDBRow>
              <MDBCol>
                <BannerComponent PageTitle="Purchasing order" />
                <Accordion title="Purchase Order Details" collapsed={false}>
                  <PurchasingOrderDetailsForm
                    viewMode={this.props.viewMode}
                    purchaseOrder={this.state.viewModel.purchaseOrder}
                    onChange={(value, ctrlName) =>
                      this.onItemDetailsChange(value, ctrlName)
                    }
                    lookups={this.state.lookups}
                    disableDropDowns={this.state.disableDropDowns}
                  />
                </Accordion>
                <Accordion title="Items Details" collapsed={false}>
                  {this.props.viewMode !== ViewMode.View ? (
                    <Button onClick={() => this.onAddItemClick()}>
                      Add Item
                    </Button>
                  ) : null}
                  <TableList
                    onEditClick={(value, ctrlName) => null}
                    onViewClick={(value, ctrlName) => console.log(value)}
                    materialRequsitionItems={
                      this.state.viewModel.purchaseOrderItems
                    }
                    onDeleteClick={(value, ctrlName) =>
                      this.onMaterialItemGridDelete(value, ctrlName)
                    }
                    viewMode={this.props.viewMode}
                  />
                  <ItemSubFormModal
                    onCancelAction={() => console.log("canceled")}
                    onDialogDismiss={() => this.onDismissSubForm()}
                    onSubmitAction={() => this.onSubFormSubmit()}
                    show={this.state.showItemSubForm}
                    component={
                      <ItemSubForm
                        selectedKey={this.state.selectedkey}
                        options={this.state.itemNotAssignedToPO}
                        handleChange={(item, selectedKey) =>
                          this.handleitemSubFormChange(item, selectedKey)
                        }
                        selectedItem={this.state.selectedItem}
                        dropdownDisabled={this.state.itemsDropdownDisabled}
                      />
                    }
                  />
                </Accordion>
                <Accordion collapsed={false} title="Price">
                  <PriceSubForm
                    onChange={(value, ctrlName) =>
                      this.onPriceComponentChange(value, ctrlName)
                    }
                    viewMode={this.props.viewMode}
                    priceComponents={{
                      discountAmount:
                        this.state.viewModel.purchaseOrder.discountAmount,
                      discoutPercentage:
                        this.state.viewModel.purchaseOrder.discountPercentage,
                      freight: this.state.viewModel.purchaseOrder.freightCharge,
                      shipAndHandling:
                        this.state.viewModel.purchaseOrder.shipAndHandling,
                      subTotal: this.state.viewModel.purchaseOrder.subTotal,
                      grandTotal: this.state.viewModel.purchaseOrder.grandTotal,
                    }}
                  />
                </Accordion>
                {this.checkApprovedStatus() ? (
                  <Accordion title="PO File" collapsed={false}>
                    <FileUploader
                      ctrlName=""
                      onChange={(file, ctrlName) =>
                        this.onFileUploaderChange(file, ctrlName)
                      }
                      onClick={(file, ctrlName) => {
                        this.onFileItemClick(file, ctrlName);
                      }}
                      onDelete={(file, ctrlName) => this.onFileDelete(file)}
                      value={this.state.viewModel.files}
                      required={false}
                      errorMessage={""}
                      isValid={true}
                    />
                  </Accordion>
                ) : null}
                <div className="buttonBlock">
                  {this.props.viewMode !== ViewMode.View ? (
                    <DefaultButton
                      // className="cancelBtn"
                      type="submit"
                      onClick={() => this.showConfirmationDialog()}
                    >
                      Submit
                    </DefaultButton>
                  ) : (
                    <DefaultButton
                      // className="cancelBtn"
                      type="submit"
                      onClick={() =>
                        this.props.history.push(
                          `/purchasingorder/edit/${this.props.match.params["id"]}`
                        )
                      }
                    >
                      Edit
                    </DefaultButton>
                  )}

                  <DefaultButton
                    // className="cancelBtn"
                    onClick={() => this.props.history.push("/")}
                  >
                    Back To Home
                  </DefaultButton>
                  {this.props.viewMode !== ViewMode.New ? (
                    <DefaultButton onClick={() => this.onCancelRequest()}>
                      Cancel Request
                    </DefaultButton>
                  ) : null}
                </div>
                {this.renderDialog()}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )}
      </>
    );
  }
}

export default withRouter(PurchasingOrderPage);
