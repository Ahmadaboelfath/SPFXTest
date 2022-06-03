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
import { TableList } from "./Components/DataGrid/TableList";
import ItemSubForm from "./Components/ItemSubForm/ItemSubForm";
import ItemSubFormModal from "./Components/ItemSubFormModal/ItemSubFormModal";
import PurchasingOrderForm from "./Components/PurchasingOrderForm/PurchasingOrderForm";
import IPurchasingOrderProps from "./IPurchasingOrderProps";
import IPurchasingOrderState from "./IPurchasingOrderState";

class PurchasingOrder extends React.Component<
  IPurchasingOrderProps,
  IPurchasingOrderState
> {
  private readonly _materialItemBusinessLogic: IMaterialRequistionItemBusinessLogic;

  constructor(props) {
    super(props);
    this._materialItemBusinessLogic = new MaterialRequistionItemBusinessLogic();

    this.state = {
      viewModel: new PurchasingOrderViewModel(),
      showItemSubForm: false,
      showLoader: false,
      itemNotAssignedToPO: [],
      selectedkey: 0,
      selectedItem: new MaterialRequestionItem(),
      itemsDropdownDisabled: true,
    };
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
      viewModel.purchaseOrderItems = [
        ...viewModel.purchaseOrderItems,
        prevState.selectedItem,
      ];
      viewModel.purchaseOrder.subTotal = this.calculateSubTotal(
        viewModel.purchaseOrderItems
      );
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
      viewModel.purchaseOrderItems =
        prevState.viewModel.purchaseOrderItems.filter(
          (item) => item.id !== value.id
        );
      viewModel.purchaseOrder.subTotal = this.calculateSubTotal(
        viewModel.purchaseOrderItems
      );
      newState.viewModel = viewModel;
      newState.itemNotAssignedToPO = [
        ...prevState.itemNotAssignedToPO,
        { item: value, key: value.id, text: value.description },
      ];

      return newState;
    });
  }

  calculateSubTotal(items: MaterialRequestionItem[]): number {
    let sum = 0;
    items.forEach((item) => (sum += item.totalPrice));
    return sum;
  }

  render(): React.ReactNode {
    return (
      <>
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <BannerComponent PageTitle="Purchasing order" />
              <Accordion title="Items Details" collapsed={false}>
                {/* <PurchasingOrderForm
                  viewMode={this.props.viewMode}
                  data={this.state.test}
                  onChange={(value, ctrlName) => this.onChange(value, ctrlName)}
                /> */}
                <Button onClick={() => this.onAddItemClick()}>Add Item</Button>
                <TableList
                  onEditClick={(value, ctrlName) =>
                    this.onMaterialItemGridDelete(value, ctrlName)
                  }
                  onViewClick={(value, ctrlName) => console.log(value)}
                  materialRequsitionItems={
                    this.state.viewModel.purchaseOrderItems
                  }
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
                <Textbox
                  disabled={true}
                  Required={false}
                  ctrlName=""
                  handleInputChange={() => null}
                  label="Sub Total"
                  value={
                    this.state.viewModel.purchaseOrder.subTotal
                      ? this.state.viewModel.purchaseOrder.subTotal.toString()
                      : "0"
                  }
                />
              </Accordion>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
}

export default withRouter(PurchasingOrder);
