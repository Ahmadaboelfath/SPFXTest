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
import FileUploader from "../../Controls/FileUploader/FileUploader";
import IFileService from "../../Services/FileService/IFileService";
import FileService from "../../Services/FileService/FileService";
import { Dialog } from "office-ui-fabric-react";
import IFolderService from "../../Services/FolderService/IFolderService";
import FolderService from "../../Services/FolderService/FolderService";
import IPurchaseOrderService from "../../Services/PurchasingOrderService/IPurchaseOrderService";
import PurchaseOrderService from "../../Services/PurchasingOrderService/PurchaseOrderService";
import PurchasingOrder from "../../Models/ClassModels/PurchasingOrder";
import IShipToService from "../../Services/ShipToService/IShipToService";
import ShipToService from "../../Services/ShipToService/ShipToService";
import IVendorService from "../../Services/VendorService/IVendorService";
import VendorService from "../../Services/VendorService/VendorService";

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
      files: [],
      hideDialog: true,
      message: "",
      purchaseOrders: [],
      vendors: [],
      shipTo: [],
    };
  }

  componentDidMount(): void {
    // // sp.web.lists
    // //   .getByTitle("MaterialRequisitionItems")
    // //   .items.getById(this.state.id)
    // //   .get()
    // //   .then((item) => {
    // //     this.setState((prevState) => {
    // //       const newState = { ...prevState };
    // //       newState.subTotal = item["TotalsubTotalCalculated"];
    // //       return newState;
    // //     });
    // //   });

    // const materialRequisitionService: IMaterialRequisitionItemService =
    //   new MaterialRequisitionItemService();

    // materialRequisitionService
    //   .getMaterialItemsAssignedThatIsNotInPO(7)
    //   .then((items) => {
    //     this.setState((prevState) => {
    //       const newState = { ...prevState };
    //       newState.items = items;
    //       return newState;
    //     });
    //   });

    // const fileService: IFileService = new FileService();
    // fileService
    //   .getFileInFolder("PurchasingOrderDocuments", "EGY-21-1")
    //   .then((file) => {
    //     this.setState((prevState) => {
    //       const newState = { ...prevState };
    //       newState.files = [file];
    //       return newState;
    //     });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     this.setState((prevState) => {
    //       const newState = { ...prevState };
    //       newState.message = e.message;
    //       newState.hideDialog = false;
    //       return newState;
    //     });
    //   });

    const purchaseOrderServvice: IPurchaseOrderService =
      new PurchaseOrderService();

    // purchaseOrderServvice
    //   .getByRequesteor(21)
    //   .then((values) => {
    //     this.setState((prevState) => {
    //       const newState = { ...prevState };
    //       newState.purchaseOrders = values;
    //       return newState;
    //     });
    //   })
    //   .catch((e) => {
    //     this.setState((prevState) => {
    //       const newState = { ...prevState };
    //       newState.hideDialog = false;
    //       newState.message = e.message;
    //       return newState;
    //     });
    //   });

    purchaseOrderServvice
      .getById(2)
      .then((values) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.purchaseOrders = [values];
          return newState;
        });
      })
      .catch((e) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.hideDialog = false;
          newState.message = e.message;
          return newState;
        });
      });
  }

  renderShipTo() {
    const shipto = this.state.shipTo;
    if (shipto.length > 0) {
      return shipto.map((item) => {
        return (
          <div>
            <div>{item.title}</div>
            <div>{item.email}</div>
            <div>{item.attention}</div>
            <div>{item.phone}</div>
            <div>{item.fax}</div>
            <div>{item.address}</div>
            <div>{item.id}</div>
          </div>
        );
      });
    } else {
      return <div>No ship To</div>;
    }
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
          {/* <Dropdown
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
          /> */}
          <MDBContainer>
            <MDBRow>
              <MDBCol>
                {/* <Button onClick={() => this.openItemForm()}>Add Item</Button> */}
                <Accordion title="Price" collapsed={false}>
                  <Dialog
                    hidden={this.state.hideDialog}
                    onDismiss={() => this.setState({ hideDialog: true })}
                  >
                    {this.state.message}
                  </Dialog>
                  {/* <Textbox
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
                  /> */}
                  {/* <FileUploader
                    ctrlName="file"
                    onChange={(files, ctrlName) =>
                      this.setState((prevState) => {
                        const newState = { ...prevState };
                        newState.files = files;
                        return newState;
                      })
                    }
                    onClick={(file, ctrlName) =>
                      window.open(file.link, "_blank")
                    }
                    onDelete={(file, ctrlName) => {
                      const fileService: IFileService = new FileService();
                      fileService
                        .delete(
                          "PurchasingOrderDocuments",
                          "EGY-21-1",
                          file.fileName
                        )
                        .then((file) => {
                          const files = this.state.files.filter(
                            (fileobj) => fileobj.fileName !== file.fileName
                          );

                          this.setState((prevState) => {
                            const newState = { ...prevState };
                            newState.files = files;
                            newState.hideDialog = false;
                            newState.message = "File Removed Successfully";
                            return newState;
                          });
                        })
                        .catch((e) => {
                          console.error(e);
                          this.setState((prevState) => {
                            const newState = { ...prevState };
                            newState.hideDialog = false;
                            newState.message =
                              "Error occurred while deleting file";
                            return newState;
                          });
                        });
                    }}
                    value={this.state.files}
                    isValid={true}
                  /> */}
                  {this.renderPOs()}
                </Accordion>
                <Accordion title="ShipTo" collapsed={false}>
                  {this.renderShipTo()}
                </Accordion>
                <Accordion title="Vendors" collapsed={false}>
                  {this.rendervendors()}
                </Accordion>

                {/* <Button onClick={() => this.handleItemClick()}>Click</Button>*/}
                {/* <Button onClick={() => this.delete()}>Delete</Button> */}
                <Button onClick={() => this.addItem()}>Add Item</Button>
                <Button onClick={() => this.updateItem()}>Update Item</Button>
                <Button onClick={() => this.getShipTo()}>Get ShipTo</Button>
                <Button onClick={() => this.getShipToById()}>
                  Get ShipTo By Id
                </Button>

                <Button onClick={() => this.getVendors()}>Get Vendors</Button>
                <Button onClick={() => this.getVendors()}>
                  Get Vendor By Id
                </Button>

                {/*<Button onClick={() => this.createFolderClick()}>
                  Create Folder
                </Button> */}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
  getShipToById(): void {
    const shipService: IShipToService = new ShipToService();
    shipService
      .getById(2)
      .then((shipTo) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.shipTo = [shipTo];
          return newState;
        });
      })
      .catch((e) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.hideDialog = false;
          newState.message = e.message;
          return newState;
        });
      });
  }
  getVendors(): void {
    const vendorService: IVendorService = new VendorService();
    vendorService
      .getAll()
      .then((vendors) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.vendors = vendors;
          return newState;
        });
      })
      .catch((e) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.hideDialog = false;
          newState.message = e.message;
          return newState;
        });
      });
  }

  getVendorsById(): void {
    const vendorService: IVendorService = new VendorService();
    vendorService
      .getById(1)
      .then((vendors) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.vendors = [vendors];
          return newState;
        });
      })
      .catch((e) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.hideDialog = false;
          newState.message = e.message;
          return newState;
        });
      });
  }
  getShipTo(): void {
    const shipService: IShipToService = new ShipToService();
    shipService
      .getAll()
      .then((shipTo) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.shipTo = shipTo;
          return newState;
        });
      })
      .catch((e) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.hideDialog = false;
          newState.message = e.message;
          return newState;
        });
      });
  }
  rendervendors(): React.ReactNode {
    const vendors = this.state.vendors;
    if (vendors.length > 0) {
      return vendors.map((vendor) => {
        return (
          <div>
            <div>{vendor.address}</div>
            <div>{vendor.title}</div>
            <div>{vendor.fax}</div>
            <div>{vendor.id}</div>
            <div>{vendor.phone}</div>
          </div>
        );
      });
    } else {
      return <div>No Vendors Found</div>;
    }
  }
  updateItem(): void {
    const purchaseOrderService: IPurchaseOrderService =
      new PurchaseOrderService();
    const po = new PurchasingOrder();
    po.id = 21;
    po.title = "EGY-21-21";
    purchaseOrderService.edit(po).then((updatedPo) => {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.hideDialog = false;
        newState.message = `item have been Updated successfully`;
        const updatedPos = prevState.purchaseOrders.filter(
          (item) => item.id !== updatedPo.id
        );
        updatedPos.push(updatedPo);
        newState.purchaseOrders = updatedPos;
        return newState;
      });
    });
  }
  addItem(): void {
    const purchaseOrderService: IPurchaseOrderService =
      new PurchaseOrderService();
    const po = new PurchasingOrder();
    po.title = "EGY-21-6";
    purchaseOrderService
      .add(po)
      .then((addedItem) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.hideDialog = false;
          newState.message = `item have been added successfully`;
          newState.purchaseOrders = [...prevState.purchaseOrders, addedItem];
          return newState;
        });
      })
      .catch((e) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.hideDialog = false;
          newState.message = e.message;
          return newState;
        });
      });
  }
  delete(): void {
    const purchaseOrderService: IPurchaseOrderService =
      new PurchaseOrderService();
    const po = new PurchasingOrder();
    po.id = 3;
    purchaseOrderService
      .delete(po)
      .then((deletedItem) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.hideDialog = false;
          newState.message = `item have been deleted successfully`;
          return newState;
        });
      })
      .catch((e) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.hideDialog = false;
          newState.message = e.message;
          return newState;
        });
      });
  }
  renderPOs(): JSX.Element[] {
    if (this.state.purchaseOrders.length === 0) {
      return [<div>No Items Found</div>];
    } else {
      return this.state.purchaseOrders.map((po) => {
        return (
          <div>
            <div>{po.id}</div>
            <div>{po.title}</div>
            <div>{po.subTotal}</div>
            <div>{po.grandTotal}</div>
          </div>
        );
      });
    }
  }
  createFolderClick(): void {
    const folderService: IFolderService = new FolderService();
    folderService
      .create("PurchasingOrderDocuments", "EGY-21-9")
      .then((folderName) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.hideDialog = false;
          newState.message = `Folder with name ${folderName} has been created successfully`;
          return newState;
        });
      })
      .catch((e) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.hideDialog = false;
          newState.message = e.message;
          return newState;
        });
      });
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
    // const fileService: IFileService = new FileService(); //EGY-21-1
    // fileService
    //   .uploadToFolder(
    //     "PurchasingOrderDocuments",
    //     "EGY-21-1",
    //     this.state.files[0]
    //   )
    //   .then((file) => {
    //     console.log(file);
    //     console.log("Success");
    //     this.setState((prevState) => {
    //       const newState = { ...prevState };
    //       newState.files = prevState.files;
    //       newState.hideDialog = false;
    //       return newState;
    //     });
    //   });
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
    return Math.round((number + Number.EPSILON) * 100) / 100;
  }
}

export default withRouter(DevWorkBench);
