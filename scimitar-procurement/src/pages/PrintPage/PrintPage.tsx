import { Button } from "office-ui-fabric-react";
import * as React from "react";
import { withRouter } from "react-router";
import ReactToPrint from "react-to-print";
import IPurchaseOrderBusinessLogic from "../../BusinessLogic/PurchaseOrderBusinessLogic/IPurchaseOrderBusinessLogic";
import PurchaseOrderBusinessLogic from "../../BusinessLogic/PurchaseOrderBusinessLogic/PurchaseOrderBusinessLogic";
import IPurchasingRequestBusinessLogic from "../../BusinessLogic/PurchasingRequestBusinessLogic/IPurchasingRequestBusinessLogic";
import PurchasingRequestBusinessModel from "../../BusinessLogic/PurchasingRequestBusinessLogic/PurchasingRequestBusinessLogic";
import { LoadingBoxComponent } from "../../CoreComponents/LodingBox";
import ShipTo from "../../Models/ClassModels/ShipTo";
import Vendor from "../../Models/ClassModels/Vendor";
import { documentType } from "../../Models/InterfaceModels/documentType";
import PurchasingOrderViewModel from "../../Models/ViewModels/PurchasingOrderViewModel";
import PurchasingRequestViewModel from "../../Models/ViewModels/PurchasingRequestViewModel";
import LookupService from "../../Services/LookupServices/LookupService";
import IShipToService from "../../Services/ShipToService/IShipToService";
import ShipToService from "../../Services/ShipToService/ShipToService";
import IVendorService from "../../Services/VendorService/IVendorService";
import VendorService from "../../Services/VendorService/VendorService";
import PurchasingOrderTemplate from "./Components/PurchasingOrder/PurchasingOrderTemplate";
import PurchasingRequestTemplate from "./Components/PurchasingRequest/PurchasingRequestTemplate";
import IPrintPageProps from "./IPrintPageProps";
import IPrintPageState from "./IPrintPageState";

class PrintPage extends React.Component<IPrintPageProps, IPrintPageState> {
  private _componentRef;
  private readonly _purchaseRequisitionBL: IPurchasingRequestBusinessLogic;
  private readonly _purchaseOrderBusinessLogic: IPurchaseOrderBusinessLogic;
  private readonly _lookupsService: LookupService;
  private readonly _shipToService: IShipToService;
  private readonly _vendorService: IVendorService;
  constructor(props) {
    super(props);
    this._componentRef = React.createRef();
    this._purchaseRequisitionBL = new PurchasingRequestBusinessModel();
    this._purchaseOrderBusinessLogic = new PurchaseOrderBusinessLogic();
    this._lookupsService = new LookupService();
    this._shipToService = new ShipToService();
    this._vendorService = new VendorService();
    this.state = {
      purchaseOrderViewModel: new PurchasingOrderViewModel(),
      purchaseRequestViewModel: new PurchasingRequestViewModel(),
      lookups: {},
      showLoader: true,
      shipTo: new ShipTo(),
      vendor: new Vendor(),
    };
  }

  componentDidMount(): void {
    const id = this.props.match.params["id"];
    if (this.props.documentType === documentType.PurchaseRequest) {
      this._purchaseRequisitionBL
        .getPurchasingRequestDetailsById(id)
        .then((vm) => {
          this.setState((prevState) => {
            const newState = { ...prevState };
            newState.purchaseRequestViewModel = vm;
            newState.showLoader = false;
            return newState;
          });
        });
    }
    if (this.props.documentType === documentType.PurchaseOrder) {
      this._purchaseOrderBusinessLogic
        .getPurchaseOrderViewModelById(id)
        .then((vm) => {
          this.loadLookups().then((lookups) => {
            this._shipToService
              .getById(parseInt(vm.purchaseOrder.shipToId))
              .then((shipTo) => {
                this._vendorService
                  .getById(parseInt(vm.purchaseOrder.vendorId))
                  .then((vendor) => {
                    this.setState((prevState) => {
                      const newState = { ...prevState };
                      newState.purchaseOrderViewModel = vm;
                      newState.showLoader = false;
                      newState.lookups = lookups;
                      newState.shipTo = shipTo;
                      newState.vendor = vendor;
                      return newState;
                    });
                  });
              });
          });
        });
    }
  }

  async loadLookups() {
    const lookups = await this._purchaseOrderBusinessLogic.getLookups([
      "ShipTo",
      "ShipMethod",
      "Vendors",
      "Status",
      "Currency",
    ]);
    const lookupValues = {};
    lookups.forEach((lookup) => {
      lookupValues[lookup.listName] = lookup.lookups;
    });
    return lookupValues;
  }

  renderPrintComponent() {
    switch (this.props.documentType) {
      case documentType.MaterialRequisition:
        return <div ref={(el) => (this._componentRef = el)}>MR Printing</div>;
        break;
      case documentType.PurchaseOrder:
        return (
          <PurchasingOrderTemplate
            lookups={this.state.lookups}
            purchaseOrderViewModel={this.state.purchaseOrderViewModel}
            shipTo={this.state.shipTo}
            vendor={this.state.vendor}
            ref={(el) => (this._componentRef = el)}
          />
        );
        break;
      case documentType.PurchaseRequest:
        return (
          <PurchasingRequestTemplate
            ref={(el) => (this._componentRef = el)}
            purchasignRequestViewModel={this.state.purchaseRequestViewModel}
          />
        );
        break;

      default:
        return (
          <div ref={(el) => (this._componentRef = el)}>No Document Chosen</div>
        );
        break;
    }
  }

  render(): React.ReactNode {
    return (
      <>
        {this.state.showLoader === false ? (
          <div>
            <ReactToPrint
              trigger={() => <Button>Print</Button>}
              content={() => this._componentRef}
              documentTitle="PR-22-2021"
            />
            {this.renderPrintComponent()}
          </div>
        ) : (
          <LoadingBoxComponent />
        )}
      </>
    );
  }
}

export default withRouter(PrintPage);
