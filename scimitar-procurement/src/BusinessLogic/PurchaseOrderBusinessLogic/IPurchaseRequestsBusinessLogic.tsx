import IFileInfo from "../../Controls/FileUploader/Interfaces/IFileInfo";
import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";
import PurchasingOrder from "../../Models/ClassModels/PurchasingOrder";
import PurchasingOrderViewModel from "../../Models/ViewModels/PurchasingOrderViewModel";

export default interface IPurchaseRequestsBusinessLogic {
  getLookups(listNames: string[]): Promise<any[]>;
  addPurchaseOrder(
    purchaseOrder: PurchasingOrderViewModel,
    userId: number
  ): Promise<PurchasingOrderViewModel>;
  editPurchaseOrder(
    purchaseOrder: PurchasingOrderViewModel,
    deletedMaterialItems: MaterialRequestionItem[],
    isRevised?: boolean
  ): Promise<PurchasingOrderViewModel>;
  getPurchaseOrderViewModelById(id: number): Promise<PurchasingOrderViewModel>;
  getPurchasngOrderByRequester(requesterId: number): Promise<PurchasingOrder[]>;
  uploadApprovedPurchaseOrder(
    file: IFileInfo,
    purchaseOrderCode: string
  ): Promise<IFileInfo>;
  cancelPO(
    viewModel: PurchasingOrderViewModel,
    cancelStatusId: number
  ): Promise<PurchasingOrderViewModel>;
}
