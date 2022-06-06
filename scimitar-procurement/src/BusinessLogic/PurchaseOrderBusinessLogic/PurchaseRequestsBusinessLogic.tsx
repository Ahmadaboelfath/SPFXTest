import { FileSource } from "../../Controls/FileUploader/enums";
import IFileInfo from "../../Controls/FileUploader/Interfaces/IFileInfo";
import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";
import PurchasingOrder from "../../Models/ClassModels/PurchasingOrder";
import PurchasingOrderViewModel from "../../Models/ViewModels/PurchasingOrderViewModel";
import DependencyManager from "../../Services/DependencyManger";
import FileService from "../../Services/FileService/FileService";
import IFileService from "../../Services/FileService/IFileService";
import FolderService from "../../Services/FolderService/FolderService";
import IFolderService from "../../Services/FolderService/IFolderService";
import ILookupService from "../../Services/LookupServices/ILookupService";
import LookupService from "../../Services/LookupServices/LookupService";
import MaterialRequisitionItemService from "../../Services/MaterialRequesitionItem/MaterialRequisitionItemService";
import IPurchaseOrderService from "../../Services/PurchasingOrderService/IPurchaseOrderService";
import PurchaseOrderService from "../../Services/PurchasingOrderService/PurchaseOrderService";
import IPurchaseRequestsBusinessLogic from "./IPurchaseRequestsBusinessLogic";

export default class PurchaseRequestsBusinessLogic
  implements IPurchaseRequestsBusinessLogic
{
  private _lookupServices: ILookupService;
  private _folderService: IFolderService;
  private _purchaseOrderService: IPurchaseOrderService;
  private _fileService: IFileService;
  private _materialItemService: MaterialRequisitionItemService;
  constructor() {
    this._lookupServices = new LookupService();
    this._fileService = DependencyManager.getInstance().inject(
      FileService.serviceKey
    );
    this._folderService = new FolderService();
    this._purchaseOrderService = new PurchaseOrderService();
    this._materialItemService = new MaterialRequisitionItemService();
  }
  async cancelPO(
    viewModel: PurchasingOrderViewModel,
    cancelStatusId: number
  ): Promise<PurchasingOrderViewModel> {
    const purchaseOrder = viewModel.purchaseOrder;
    purchaseOrder.statusId = cancelStatusId;
    const items = viewModel.purchaseOrderItems;
    items.forEach((item) => (item.POId = null));

    try {
      const cancelledPo = await this._purchaseOrderService.edit(purchaseOrder);
      const cancelledItems = await Promise.all(
        items.map((item) => this._materialItemService.updateItem(item))
      );
      return new PurchasingOrderViewModel(
        cancelledPo,
        cancelledItems,
        viewModel.files
      );
    } catch (e) {
      throw new Error(`failed to cancel PO: ${e.message}`);
    }
  }

  async uploadApprovedPurchaseOrder(
    file: IFileInfo,
    purchaseOrderCode: string
  ): Promise<IFileInfo> {
    const approvedPO = await this._fileService.getFileByMetadata(
      "PurchasingOrderDocuments",
      purchaseOrderCode,
      { propName: "ApprovedPO", value: true }
    );

    if (approvedPO.length > 0) {
      const updatedFiles = await Promise.all(
        approvedPO.map((file) =>
          this._fileService.updateMetadata(
            "PurchasingOrderDocuments",
            purchaseOrderCode,
            file.fileName,
            { ApprovedPO: false }
          )
        )
      );
      const addedFile = await this._fileService.uploadToFolder(
        "PurchasingOrderDocuments",
        purchaseOrderCode,
        file,
        (data) => console.log(data)
      );
      const updatedFile = await this._fileService.updateMetadata(
        "PurchasingOrderDocuments",
        purchaseOrderCode,
        addedFile.fileName,
        { ApprovedPO: true }
      );
      return addedFile;
    } else {
      const addedFile = await this._fileService.uploadToFolder(
        "PurchasingOrderDocuments",
        purchaseOrderCode,
        file,
        (data) => console.log(data)
      );
      const updatedFile = await this._fileService.updateMetadata(
        "PurchasingOrderDocuments",
        purchaseOrderCode,
        addedFile.fileName,
        { ApprovedPO: true }
      );
      return addedFile;
    }
  }

  async getLookups(listNames: string[]): Promise<any[]> {
    return this._lookupServices.getOptionsForSemanticDropDown(listNames);
  }
  async addPurchaseOrder(
    purchaseOrder: PurchasingOrderViewModel,
    userId: number
  ): Promise<PurchasingOrderViewModel> {
    purchaseOrder.purchaseOrder.requestorId = userId;

    try {
      const addedPo = await this._purchaseOrderService.add(
        purchaseOrder.purchaseOrder
      );
      const POCode = `EGY-${new Date().getFullYear() - 2000}-${addedPo.id}`;
      addedPo.title = POCode;
      const updatedPo = await this._purchaseOrderService.edit(addedPo);
      const folderCreated = await this._folderService.create(
        "PurchasingOrderDocuments",
        POCode
      );
      const updateMaterialItems = await Promise.all(
        purchaseOrder.purchaseOrderItems.map((item) =>
          this._materialItemService.updateItemsPO(parseInt(item.id), addedPo.id)
        )
      );

      const updatedViewModel = new PurchasingOrderViewModel(
        updatedPo,
        updateMaterialItems,
        purchaseOrder.files
      );

      return updatedViewModel;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async editPurchaseOrder(
    purchaseOrder: PurchasingOrderViewModel,
    deletedItems: MaterialRequestionItem[]
  ): Promise<PurchasingOrderViewModel> {
    const updatedPO = this._purchaseOrderService.edit(
      purchaseOrder.purchaseOrder
    );
    if (deletedItems.length > 0) {
      deletedItems.forEach((item) => (item.POId = null));
      const updatedItems = await Promise.all(
        deletedItems.map((item) => this._materialItemService.updateItem(item))
      );
    }

    const updatedItems = await Promise.all(
      purchaseOrder.purchaseOrderItems.map((item) =>
        this._materialItemService.updateItemsPO(
          parseInt(item.id),
          purchaseOrder.purchaseOrder.id
        )
      )
    );

    if (
      purchaseOrder.files.length > 0 &&
      purchaseOrder.files[0].fileSource === FileSource.Client
    ) {
      const files = await this.uploadApprovedPurchaseOrder(
        purchaseOrder.files[0],
        purchaseOrder.purchaseOrder.title
      );
    } else {
      const deleted = await this._folderService.deletefiles(
        "PurchasingOrderDocuments",
        purchaseOrder.purchaseOrder.title
      );
    }

    return purchaseOrder;
  }
  async getPurchaseOrderViewModelById(
    id: number
  ): Promise<PurchasingOrderViewModel> {
    const purchaseOrder = await this._purchaseOrderService.getById(id);
    const poItems = await this._materialItemService.getMaterialItemsByPO(id);
    const file = await this._fileService.getFileByMetadata(
      "PurchasingOrderDocuments",
      purchaseOrder.title,
      { propName: "ApprovedPO", value: true }
    );

    return new PurchasingOrderViewModel(purchaseOrder, poItems, file);
  }
  async getPurchasngOrderByRequester(
    requesterId: number
  ): Promise<PurchasingOrder[]> {
    try {
      return this._purchaseOrderService.getByRequesteor(requesterId);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
