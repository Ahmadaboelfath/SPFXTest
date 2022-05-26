import * as React from "react";
import IDevWorkBenchProps from "./IDevWorkBenchProps";
import IDevWorkBenchState from "./IDevWorkBenchState";
import { withRouter, RouteComponentProps } from "react-router-dom";
import IMaterialService from "../../Services/MaterialService/IMaterialService";
import MaterialService from "../../Services/MaterialService/MaterialService";
import MaterialRequisitionItemService from "../../Services/MaterialRequesitionItem/MaterialRequisitionItemService";
import { sp } from "@pnp/sp";
import IMaterialRequisitionItemService from "../../Services/MaterialRequesitionItem/IMaterialRequisitionItemService";
import { Dropdown } from "../../Controls/dropdown";
import { Button, DropdownItemProps } from "semantic-ui-react";
import { MaterialRequesitionItemsDropDown } from "../MaterialRequsitionItem/HelperInterfaces";
import { Textbox } from "../../Controls/Textbox";
import { Accordion } from "../../CoreComponents/accordion";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";

class DevWorkBench extends React.Component<
  RouteComponentProps<IDevWorkBenchProps>,
  IDevWorkBenchState
> {
  private readonly _materialService: IMaterialService;

  constructor(props) {
    super(props);
    this._materialService = new MaterialService();
    this.state = {
      serachByCode: true,
      subTotal: 0,
      id: 1,
      items: [],
      selectedItem: 0,
      discount: "0",
      freightCost: "0",
      totalPrice: 0,
      shipAndHandlingCost: "0",
    };
  }

  componentDidMount(): void {
    // sp.web.lists
    //   .getByTitle("MaterialRequisitionItems")
    //   .items.getById(this.state.id)
    //   .get()
    //   .then((item) => {
    //     this.setState((prevState) => {
    //       const newState = { ...prevState };
    //       newState.subTotal = item["TotalsubTotalCalculated"];
    //       return newState;
    //     });
    //   });

    const materialRequisitionService: IMaterialRequisitionItemService =
      new MaterialRequisitionItemService();

    materialRequisitionService
      .getMaterialItemsAssignedThatIsNotInPO(7)
      .then((items) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.items = items;
          return newState;
        });
      });
  }
  render(): React.ReactNode {
    return (
      <div>
        {/* <Textbox
          Required={false}
          ctrlName={""}
          handleInputChange={(value) => {
            this.setState((prevState) => {
              const newState = { ...prevState };
              newState.id = value;
              return newState;
            });
          }}
          label={" Item Id"}
          value={this.state.id.toLocaleString()}
        />
        <Button onClick={() => this.handleClick()}>Get subTotal</Button> */}

        {/* <h1>{this.state.subTotal}</h1> */}

        {/* {this.renderItems()} */}
        <div className="ui form">
          <Dropdown
            Required={true}
            ctrlName="PR"
            handleInputChange={(value, ctrlName, e) =>
              this.handleChange(value, ctrlName, e)
            }
            label="PRs"
            options={this.renderItems()}
            multiple={false}
            value={this.state.selectedItem}
            returnFullObject={true}
          />
          <MDBContainer>
            <MDBRow>
              <MDBCol>
                <Button onClick={() => this.openItemForm()}>Add Item</Button>
                <Accordion title="Price" collapsed={false}>
                  <Textbox
                    Required={false}
                    ctrlName="subTotal"
                    disabled
                    handleInputChange={(value) => console.log(value)}
                    label="subTotal"
                    value={this.state.subTotal.toString()}
                  />
                  <Textbox
                    Required={false}
                    ctrlName="discount"
                    handleInputChange={(value, ctrlName) =>
                      this.handleInputChange(value, ctrlName)
                    }
                    label="Discount %"
                    value={this.state.discount}
                  />
                  <Textbox
                    Required={false}
                    ctrlName="freightCost"
                    handleInputChange={(value, ctrlName) =>
                      this.handleInputChange(value, ctrlName)
                    }
                    label="Freight Cost"
                    value={this.state.freightCost}
                  />
                  <Textbox
                    Required={false}
                    ctrlName="shipAndHandlingCost"
                    handleInputChange={(value, ctrlName) =>
                      this.handleInputChange(value, ctrlName)
                    }
                    label="S & h"
                    value={this.state.shipAndHandlingCost}
                  />
                  <Textbox
                    Required={false}
                    ctrlName="totalPrice"
                    disabled
                    handleInputChange={(value) => console.log(value)}
                    label="Total Price"
                    value={this.state.totalPrice.toString()}
                  />
                </Accordion>
                <Button onClick={() => this.handleItemClick()}>Click</Button>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
  openItemForm(): void {
    throw new Error("Method not implemented.");
  }
  handleInputChange(value: any, ctrlName: any): any {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState[ctrlName] = value;
      newState.totalPrice = this.calculateTotalPrice(newState);
      return newState;
    });
  }
  handleItemClick(): void {
    const materialRequesitionItemService: IMaterialRequisitionItemService =
      new MaterialRequisitionItemService();

    materialRequesitionItemService
      .updateItemsPO(this.state.selectedItem[0], 1)
      .then((item) => console.log(item));
  }
  handleChange(value: any, ctrlName: any, e): any {
    this.setState((prevState) => {
      if (value.length > 0) {
        console.log(value);
        const newState = { ...prevState };
        newState.subTotal = this.calculatesubTotal(value);
        newState.selectedItem = value;
        newState.totalPrice = this.calculateTotalPrice(newState);
        return newState;
      } else {
        const newState = { ...prevState };
        newState.subTotal = 0;
        newState.selectedItem = value;
        newState.totalPrice = 0;
        newState.discount = "0";
        newState.freightCost = "0";
        newState.shipAndHandlingCost = "0";
        return newState;
      }
    });
  }
  calculateTotalPrice(state: IDevWorkBenchState): number {
    const discountAmount = (parseFloat(state.discount) / 100) * state.subTotal;
    return this.roundNumbers(
      state.subTotal -
        discountAmount +
        parseFloat(state.freightCost) +
        parseFloat(state.shipAndHandlingCost)
    );
  }
  calculatesubTotal(value: number[]): number {
    let totalprice = 0;
    value.forEach((value) => {
      const item = this.getItem(value);
      const itemTotalPrice = item.totalPrice;
      totalprice += itemTotalPrice;
    });

    return this.roundNumbers(totalprice);
  }

  getItem(id: number) {
    return this.state.items.filter((item) => parseInt(item.id) === id)[0];
  }

  renderItems(): MaterialRequesitionItemsDropDown[] {
    return this.state.items.map((item) => ({
      value: item.id,
      text: item.description,
      item: item,
    }));
  }
  handleClick(): void {
    sp.web.lists
      .getByTitle("MaterialRequisitionItems")
      .items.getById(this.state.id)
      .get()
      .then((item) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          const number = parseFloat(item["TotalsubTotalCalculated"]);
          newState.subTotal = this.roundNumbers(number);
          return newState;
        });
      });
  }

  roundNumbers(number): number {
    // var m = Number((Math.abs(number) * 100).toPrecision(15));
    // return (Math.round(m) / 100) * Math.sign(number);

    return Math.round((number + Number.EPSILON) * 100) / 100;
  }
}

export default withRouter(DevWorkBench);
